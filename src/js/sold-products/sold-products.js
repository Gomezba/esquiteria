import { dia, mes, anio, fecha } from '../functions/date.js'

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

				productosOrdenados.forEach(([nombre, { cantidad, precioTotal }]) => {
					const row = document.createElement('tr')

					const productoCell = document.createElement('td')
					productoCell.textContent = nombre
					row.appendChild(productoCell)

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

				const formattedTotal = precioGlobal.toLocaleString(undefined, {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2,
				})
				totalSpan.textContent = `$${formattedTotal}`
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

	btnPdf.addEventListener('click', generatePDF)

	function generatePDF() {
		const doc = new jsPDF()

		const tableData = []
		const table = document.querySelector('table')
		const rows = table.querySelectorAll('tbody tr')

		rows.forEach((row) => {
			const rowData = []
			const cells = row.querySelectorAll('td')

			cells.forEach((cell) => {
				rowData.push(cell.textContent)
			})

			tableData.push(rowData)
		})

		// Configurar el tamaño de fuente en 18px
		const styles = {
			fontSize: 24,
		}

		doc.setFontSize(24)
		doc.text('REPORTE DE VENTAS', 15, 20) // Agregar título

		fecha

		const fechaDescarga = `${dia} de ${mes} del ${anio}` // Obtener la fecha actual

		doc.setFontSize(24)
		doc.text(fechaDescarga, 117, 20) // Agregar fecha

		doc.autoTable({
			head: [['PRODUCTO', 'CAN', 'PRECIO TOTAL']],
			body: tableData,
			startY: 30,
			columnStyles: {
				2: { halign: 'right' }, // Ajustar el ancho de la columna
			},
			// margin: { top: 20 },
			styles: styles, // Aplicar estilos de fuente
		})

		// Obtener el precio global del elemento span
		const precioGlobalSpan = document.getElementById('total')
		const precioGlobal = precioGlobalSpan.textContent

		// Agregar fila con el precio global
		const totalRow = [['Total', '', precioGlobal]]
		doc.autoTable({
			body: totalRow,
			startY: doc.lastAutoTable.finalY + 10,
			showHead: 'never',
			columnStyles: { 2: { halign: 'right', cellWidth: 'auto' } },
			styles: styles,
		})

		// Generar el nombre del archivo con la fecha
		const nombreArchivo = `Venta-${dia}-${mes}-${anio}.pdf`

		doc.save(nombreArchivo)
	}

	document.addEventListener('DOMContentLoaded', loadTableData)
}
