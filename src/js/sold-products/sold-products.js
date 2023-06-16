import { obtenerFechaActual } from '../functions/date.js'

if (location.pathname.endsWith('/products-sold.html')) {
	const btnPdf = document.getElementById('pdf')
	const tbody = document.getElementById('tbody')
	const btnGuardarGanancia = document.getElementById('guardar-ganancia')
	const btnDel = document.getElementById('orders-deleted')
	const ventaProd = document.getElementById('tbody')

	function loadTableData() {
		const request = indexedDB.open('customerOrders', 1)

		request.onsuccess = (event) => {
			const db = event.target.result
			const transaction = db.transaction(['orders'], 'readonly')
			const objectStore = transaction.objectStore('orders')
			const getAllRequest = objectStore.getAll()

			getAllRequest.onsuccess = (event) => {
				const data = event.target.result

				const resultados = {}
				let precioGlobal = 0

				data.forEach((orden) => {
					if (orden.products && Array.isArray(orden.products)) {
						const productos = orden.products

						productos.forEach((producto) => {
							const nombre = producto.name
							const cantidad = producto.quantity
							const precio = producto.priceUnit

							if (!resultados[nombre]) {
								resultados[nombre] = {
									cantidad: 0,
									precioTotal: 0,
									precioUnitario: precio, // Agregar la propiedad para el precio unitario
								}
							}

							resultados[nombre].cantidad += cantidad
							resultados[nombre].precioTotal += cantidad * precio
						})
					}
				})

				const productosOrdenados = Object.entries(resultados).sort(([nombreA], [nombreB]) => {
					return nombreA.localeCompare(nombreB)
				})

				tbody.innerHTML = ''

				productosOrdenados.forEach(([nombre, { cantidad, precioTotal, precioUnitario }]) => {
					const row = document.createElement('tr')

					const productoCell = document.createElement('td')
					productoCell.textContent = nombre
					row.appendChild(productoCell)

					const precioUnitarioCell = document.createElement('td')
					precioUnitarioCell.textContent = `$${precioUnitario}`
					row.appendChild(precioUnitarioCell)

					const cantidadCell = document.createElement('td')
					cantidadCell.textContent = cantidad
					row.appendChild(cantidadCell)

					const precioCell = document.createElement('td')
					precioCell.textContent = `$${precioTotal}`
					row.appendChild(precioCell)

					tbody.appendChild(row)

					precioGlobal += precioTotal
				})

				const totalSpan = document.getElementById('total')

				totalSpan.textContent = `${precioGlobal}`
				showSubtotal()
				disabledBtn()
			}

			request.onerror = (event) => {
				Swal.fire({
					icon: 'error',
					title: '¡Error!',
					text: `Ha ocurrido un error inesperado con la base de datos ${event.error}`,
					confirmButtonText: 'Aceptar',
				})
			}
		}
	}

	const egresosObjetos = JSON.parse(localStorage.getItem('egresos')) ?? []

	function showEgresos() {
		if (egresosObjetos) {
			const fragment = document.createDocumentFragment()
			let totalEgresos = 0

			egresosObjetos.forEach((egreso) => {
				const { name, cantidad } = egreso
				const tr = document.createElement('TR')
				const tdName = document.createElement('TD')
				tdName.textContent = name
				const tdCantidad = document.createElement('TD')
				tdCantidad.textContent = `$${cantidad}`

				tr.append(tdName, tdCantidad)
				fragment.append(tr)

				totalEgresos += parseFloat(cantidad) // Sumar al total acumulado
			})

			const totalEgresosElement = document.getElementById('total-egresos')

			totalEgresosElement.textContent = `${totalEgresos}`
			const egresosContainer = document.getElementById('egresos-container-total')

			egresosContainer.textContent = ''
			egresosContainer.append(fragment)
			showSubtotal()
		}
	}

	btnPdf.addEventListener('click', generatePDF)

	function generatePDF() {
		const doc = new jsPDF()

		const tableData1 = []
		const table1 = document.getElementById('table-products')
		const rows1 = table1.querySelectorAll('tbody tr')
		const caption1 = (table1.querySelector('caption').textContent = 'Lista de venta de productos')

		rows1.forEach((row) => {
			const rowData = []
			const cells = row.querySelectorAll('td')

			cells.forEach((cell) => {
				rowData.push(cell.textContent)
			})

			tableData1.push(rowData)
		})

		const tableData2 = []
		const table2 = document.getElementById('table-egresos')
		const rows2 = table2.querySelectorAll('tbody tr')
		const caption2 = (table2.querySelector('caption').textContent = 'Lista de egresos')

		rows2.forEach((row) => {
			const rowData = []
			const cells = row.querySelectorAll('td')

			cells.forEach((cell) => {
				rowData.push(cell.textContent)
			})

			tableData2.push(rowData)
		})

		const styles = {
			fontSize: 24,
		}

		const fechaActual = obtenerFechaActual()
		const fechaDescarga = `${fechaActual.dia} de ${fechaActual.mes} del ${fechaActual.anio}`

		doc.setFontSize(24)
		doc.text('REPORTE DE VENTAS', 15, 20)
		doc.setFontSize(24)
		doc.text(fechaDescarga, 117, 20)

		doc.setFontSize(24)
		doc.text(caption1, 50, 38)

		doc.autoTable({
			head: [['PRODUCTO', 'PU', 'CAN', '             SUBTOTAL']],
			body: tableData1,
			startY: 40,
			columnStyles: {
				3: { halign: 'right' },
			},
			styles,
		})

		const precioGlobalSpan = document.getElementById('total')
		const precioGlobalProductos = precioGlobalSpan.textContent

		const totalRow1 = [['Total productos', '', '', `$${precioGlobalProductos}`]]
		doc.autoTable({
			body: totalRow1,
			startY: doc.lastAutoTable.finalY,
			showHead: 'never',
			columnStyles: { 3: { halign: 'right', cellWidth: 'auto' } },
			styles: { fontSize: 24, fontStyle: 'bold' },
		})

		doc.setFontSize(24)
		doc.text(caption2, 70, doc.lastAutoTable.finalY + 15)

		doc.autoTable({
			head: [['EGRESO', '                                       CANTIDAD']],
			body: tableData2,
			startY: doc.lastAutoTable.finalY + 17,
			columnStyles: {
				1: { halign: 'right' }, // Ajustar el índice de la columna según los datos en tableData2
			},
			styles,
		})

		const precioGlobalSpanEgresos = document.getElementById('total-egresos')
		const precioGlobalEgresos = precioGlobalSpanEgresos.textContent

		const totalRow2 = [['Total egresos', `$${precioGlobalEgresos}`]]
		doc.autoTable({
			body: totalRow2,
			startY: doc.lastAutoTable.finalY,
			showHead: 'never',
			columnStyles: { 1: { halign: 'right', cellWidth: 'auto' } },
			styles: { fontSize: 24, fontStyle: 'bold' },
		})

		const precioInversion = `$${parseFloat(precioGlobalProductos).toLocaleString(undefined, {
			minimumFractionDigits: 2,
		})}`

		const subGanancias = `$${parseFloat(precioGlobalEgresos).toLocaleString(undefined, {
			minimumFractionDigits: 2,
		})}`

		const gananciaFinal = parseFloat(precioGlobalProductos - parseFloat(precioGlobalEgresos))
		const gananciaTexto = `$${gananciaFinal.toLocaleString(undefined, {
			minimumFractionDigits: 2,
		})}`

		const nombreArchivo = `Venta-${fechaActual.dia}-${fechaActual.mes}-${fechaActual.anio}.pdf`

		const tableData = [
			['Concepto', 'Monto'],
			['Total Productos', precioInversion],
			['Total Egresos', subGanancias],
			[
				{ content: 'VENTA NETA', styles: { fontStyle: 'bold' } },
				{ content: gananciaTexto, styles: { fontStyle: 'bold' } },
			],
		]
		const startY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 30 : 20

		// Agregar título de la tabla
		const title = 'Monto Ventas y Egresos'
		const titleFontSize = 25
		const titleHeight = 10
		const titleWidth = (doc.getStringUnitWidth(title) * titleFontSize) / doc.internal.scaleFactor

		doc.setFontSize(titleFontSize)
		doc.setFont('helvetica', 'bold') // Establecer el estilo de fuente en negritas
		doc.text(title, (doc.internal.pageSize.width - titleWidth) / 2, startY - titleHeight)

		const table = doc.autoTable({
			head: tableData.slice(0, 1),
			body: tableData.slice(1),
			startY: startY,
			theme: 'striped',
			styles: { fontSize: 24 },
			columnStyles: {
				0: { cellWidth: 'auto' },
				1: { cellWidth: 'wrap' },
			},
			headStyles: { fillColor: [41, 128, 186] }, // Cambiar el color del encabezado a azul (RGB: 0, 123, 255)
		})

		doc.save(nombreArchivo)
	}

	function showSubtotal() {
		const totalProductos = Number(document.getElementById('total').textContent)
		const totalEgresos = Number(document.getElementById('total-egresos').textContent)
		document.getElementById('sb-prod').textContent = `${totalProductos.toLocaleString(undefined, {
			minimumFractionDigits: 2,
		})}`
		document.getElementById('sb-eg').textContent = `${totalEgresos.toLocaleString(undefined, {
			minimumFractionDigits: 2,
		})}`

		const totalGananciaGlobal = totalProductos - totalEgresos

		document.getElementById('total-ganancia').textContent = totalGananciaGlobal
	}

	btnGuardarGanancia.addEventListener('click', (e) => {
		e.preventDefault()

		const totalProductos = Number(document.getElementById('total').textContent)
		const totalEgresos = Number(document.getElementById('total-egresos').textContent)

		if (totalProductos === 0 && totalEgresos === 0) {
			Swal.fire({
				title: 'Error',
				text: 'No hay ventas existentes para registrar',
				icon: 'error',
				confirmButtonText: 'Aceptar',
			})
			return
		}
		const totalGanancia = document.getElementById('total-ganancia').textContent
		const fechaActual = obtenerFechaActual()
		const fecha = `${fechaActual.dia} de ${fechaActual.mes} del ${fechaActual.anio}`

		const ganancia = {
			id: Date.now(),
			date: fecha,
			total: totalGanancia,
		}

		const ganancias = JSON.parse(localStorage.getItem('ganancias')) ?? []
		localStorage.setItem('ganancias', JSON.stringify([...ganancias, ganancia]))
		Swal.fire({
			icon: 'success',
			title: '¡Venta Guardada!',
			showConfirmButton: false,
			timer: 1500,
		})

		setTimeout(() => {
			window.location.href = '../../views/ganancias/ganancias.html'
		}, 1501)
	})

	btnDel.addEventListener('click', function () {
		Swal.fire({
			title: 'Advertencia!',
			html:
				'Por favor, tenga en cuenta que al eliminar las órdenes, <strong style="color:#C62828">se borrarán los registros de ventas totales, así como los egresos acumulados</strong>. Le recomendamos que descargue y guarde el informe de ventas antes de proceder con la eliminación.',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Entiendo, deseo continuar',
			cancelButtonText: 'Cancelar',
		}).then((result) => {
			if (result.isConfirmed) {
				document.getElementById('passwordModal').style.display = 'block'

				const closeBtn = document.getElementsByClassName('close')[0]
				addEventListener('click', function (event) {
					if (event.target === modal) {
						modal.style.display = 'none'
					}
				})
				const modal = document.getElementById('passwordModal')

				closeBtn.addEventListener('click', function () {
					modal.style.display = 'none'
				})

				// Obtener la contraseña ingresada al hacer clic en el botón de enviar
				document.getElementById('submitBtn').addEventListener('click', function () {
					const input = document.getElementById('passwordInput')
					const password = document.getElementById('passwordInput').value
					if (password === 'tatis') {
						Swal.fire({
							icon: 'success',
							title: '¡La venta ha sido eliminada!',
							showConfirmButton: false,
							timer: 1500,
						})

						localStorage.removeItem('egresos')

						modal.style.display = 'none'

						const respuesta = indexedDB.deleteDatabase('customerOrders')

						setTimeout(() => {
							location.reload()
						}, 1510)

						respuesta.onerror = (event) => {
							alert('Error al eliminar la base de datos:', event.target.error)
						}
					} else {
						const alert = document.createElement('P')
						alert.classList.add('error-modal')
						alert.textContent = 'Contraseña incorrecta'
						input.after(alert)
						setTimeout(() => {
							alert.remove()
						}, 2000)
					}
				})
			}
		})
	})

	function disabledBtn() {
		if (ventaProd.textContent === '') {
			btnDel.setAttribute('disabled', true)
		}

		if (ventaProd.textContent !== '') {
			btnDel.removeAttribute('disabled')
		}
	}

	document.addEventListener('DOMContentLoaded', () => {
		loadTableData()
		showEgresos()
	})
}
