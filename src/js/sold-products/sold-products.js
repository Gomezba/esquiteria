import { obtenerFechaActual } from '../functions/date.js'

if (location.pathname.endsWith('/products-sold.html')) {
	const btnPdf = document.getElementById('pdf')
	const tbody = document.getElementById('tbody')

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
				const tr = document.createElement('tr')
				const tdName = document.createElement('td')
				tdName.textContent = name
				const tdCantidad = document.createElement('td')
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
		}
	}

	btnPdf.addEventListener('click', generatePDF)

	function generatePDF() {
		const doc = new jsPDF()

		const tableData1 = []
		const table1 = document.getElementById('table-products')
		const rows1 = table1.querySelectorAll('tbody tr')

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

		doc.autoTable({
			head: [['PRODUCTO', 'PU', 'CAN', 'SUBTOTAL']],
			body: tableData1,
			startY: 30,
			columnStyles: {
				3: { halign: 'right' },
			},
			styles,
		})

		const precioGlobalSpan = document.getElementById('total')
		const precioGlobalProductos = precioGlobalSpan.textContent.trim().replace(',', '')

		const totalRow1 = [
			['Total productos', '', '', `$${precioGlobalProductos.toLocaleString(undefined, { minimumFractionDigits: 2 })}`],
		]
		doc.autoTable({
			body: totalRow1,
			startY: doc.lastAutoTable.finalY + 10,
			showHead: 'never',
			columnStyles: { 3: { halign: 'right', cellWidth: 'auto' } },
			styles,
		})

		doc.autoTable({
			head: [['EGRESO', 'CANTIDAD']],
			body: tableData2,
			startY: doc.lastAutoTable.finalY + 10,
			columnStyles: {
				3: { halign: 'right' }, // Ajustar el índice de la columna según los datos en tableData2
			},
			styles,
		})

		const precioGlobalSpanEgresos = document.getElementById('total-egresos')
		const precioGlobalEgresos = precioGlobalSpanEgresos.textContent.trim().replace(',', '')

		const totalRow2 = [
			['Total egresos', `$${precioGlobalEgresos.toLocaleString(undefined, { minimumFractionDigits: 2 })}`],
		]
		doc.autoTable({
			body: totalRow2,
			startY: doc.lastAutoTable.finalY + 10,
			showHead: 'never',
			columnStyles: { 1: { halign: 'right', cellWidth: 'auto' } },
			styles,
		})

		const gananciaFinal = precioGlobalProductos - precioGlobalEgresos

		const gananciaRow = [
			['GANANCIA', '', '', `$${gananciaFinal.toLocaleString(undefined, { minimumFractionDigits: 2 })}`],
		]
		// const gananciaRow = [['Ganancia', '', '', `$${gananciaFinal.toFixed(2)}`]]
		doc.autoTable({
			body: gananciaRow,
			startY: doc.lastAutoTable.finalY + 10,
			showHead: 'never',
			columnStyles: { 3: { halign: 'right', cellWidth: 'auto' } },
			styles: { fontSize: 44 },
		})
		const nombreArchivo = `Venta-${fechaActual.dia}-${fechaActual.mes}-${fechaActual.anio}.pdf`

		doc.save(nombreArchivo)
	}

	document.addEventListener('DOMContentLoaded', () => {
		loadTableData()
		showEgresos()
	})
}
