import { obtenerFechaActual } from '../functions/date.js'
import { showAlert } from '../order/order.js'

const expenseList = document.getElementById('expense-list')
const expenseTotalHtml = document.getElementById('expense-total')

const botonDescargar = document.getElementById('descargar-pdf')
const btnDeletedGananciasGastos = document.getElementById('delete-ganancias-gastos')

const totalGananciasSpan = document.getElementById('total-ganancias-globales')
const containerGanancias = document.getElementById('ganancias-container-total')

const empleadosList = document.getElementById('empleados-list')
const pagoTotalHtml = document.getElementById('pago-total')

botonDescargar.addEventListener('click', generatePDF)

// function generatePDF() {
// 	const doc = new jsPDF()

// 	const tableData1 = []
// 	const table1 = document.getElementById('table-inversion')
// 	const rows1 = table1.querySelectorAll('tbody tr')
// 	const caption1 = table1.querySelector('caption').textContent

// 	rows1.forEach((row) => {
// 		const rowData = []
// 		const cells = row.querySelectorAll('td')

// 		cells.forEach((cell) => {
// 			rowData.push(cell.textContent)
// 		})

// 		tableData1.push(rowData)
// 	})

// 	const tableData2 = []
// 	const table2 = document.getElementById('table-ganancias')
// 	const rows2 = table2.querySelectorAll('tbody tr')
// 	const caption2 = table2.querySelector('caption').textContent

// 	rows2.forEach((row) => {
// 		const rowData = []
// 		const cells = row.querySelectorAll('td')

// 		cells.forEach((cell) => {
// 			rowData.push(cell.textContent)
// 		})

// 		tableData2.push(rowData)
// 	})

// 	const tableData3 = []
// 	const table3 = document.getElementById('table-empleados')
// 	const rows3 = table3.querySelectorAll('tbody tr')
// 	const caption3 = table3.querySelector('caption').textContent

// 	rows3.forEach((row) => {
// 		const rowData = []
// 		const cells = row.querySelectorAll('td')

// 		cells.forEach((cell) => {
// 			rowData.push(cell.textContent)
// 		})

// 		tableData3.push(rowData)
// 	})

// 	const styles = {
// 		fontSize: 24,
// 	}

// 	const fechaActual = obtenerFechaActual()
// 	const fechaDescarga = `${fechaActual.dia} de ${fechaActual.mes} del ${fechaActual.anio}`

// 	doc.setFontSize(24)
// 	doc.text('GANANCIAS GLOBALES', 15, 20)
// 	doc.setFontSize(24)
// 	doc.text(fechaDescarga, 15, 30)

// 	// Agregar caption arriba de la primera tabla y alinear a la izquierda
// 	doc.setFontSize(24)
// 	doc.text(caption1, -40, 38)

// 	doc.autoTable({
// 		head: [['GASTO DE INVERSIÓN', '                   PRECIO']],
// 		body: tableData1,
// 		startY: 50, // Incrementar el valor para dejar espacio debajo del caption
// 		columnStyles: {
// 			1: { halign: 'right' },
// 		},
// 		styles,
// 	})

// 	const precioGlobalSpan = document.getElementById('expense-total')
// 	const precioGlobalInversion = precioGlobalSpan.textContent

// 	const totalRow1 = [['Total inversión:', '', '', `$${precioGlobalInversion}`]]
// 	doc.autoTable({
// 		body: totalRow1,
// 		startY: doc.lastAutoTable.finalY + 10,
// 		showHead: 'never',
// 		columnStyles: {
// 			3: { halign: 'right' },
// 		},
// 		styles,
// 	})

// 	doc.setFontSize(24)
// 	doc.text(caption2, -10, doc.lastAutoTable.finalY + 18)

// 	doc.autoTable({
// 		head: [['DÍA DE GANANCIA', '                     GANANCIA']],
// 		body: tableData2,
// 		startY: doc.lastAutoTable.finalY + 30, // Incrementar el valor para dejar espacio debajo del caption
// 		columnStyles: {
// 			1: { halign: 'right' },
// 		},
// 		styles,
// 	})

// 	const precioGlobalSpanGanancias = document.getElementById('total-ganancias-globales')
// 	const precioGlobalGanancias = precioGlobalSpanGanancias.textContent

// 	const totalRow2 = [['Total ganancias:', '', '', `$${precioGlobalGanancias}`]]
// 	doc.autoTable({
// 		body: totalRow2,
// 		startY: doc.lastAutoTable.finalY + 10,
// 		showHead: 'never',
// 		columnStyles: {
// 			3: { halign: 'right' },
// 		},
// 		styles,
// 	})

// 	//
// 	// Agregar caption arriba de la primera tabla y alinear a la izquierda
// 	doc.setFontSize(24)
// 	doc.text(caption3, -40, 38)

// 	doc.autoTable({
// 		head: [['FECHA PAGO', 'EMPLEADO', '                   PAGO']],
// 		body: tableData3,
// 		startY: 50, // Incrementar el valor para dejar espacio debajo del caption
// 		columnStyles: {
// 			1: { halign: 'right' },
// 		},
// 		styles,
// 	})

// 	const precioGlobalSpanPagos = document.getElementById('pago-total')
// 	const precioGlobalPagos = precioGlobalSpanPagos.textContent

// 	const totalRow3 = [['Total pagos de empleados:', '', '', `$${precioGlobalPagos}`]]
// 	doc.autoTable({
// 		body: totalRow3,
// 		startY: doc.lastAutoTable.finalY + 10,
// 		showHead: 'never',
// 		columnStyles: {
// 			3: { halign: 'right' },
// 		},
// 		styles,
// 	})

// 	const subGanancias = `Total Ganancias: $${parseFloat(precioGlobalGanancias).toLocaleString(undefined, {
// 		minimumFractionDigits: 2,
// 	})}`
// 	doc.setFontSize(30)
// 	doc.text(subGanancias, 40, doc.lastAutoTable.finalY + 35, { align: 'right' })

// 	const precioInversion = `Total Inversión: $${parseFloat(precioGlobalInversion).toLocaleString(undefined, {
// 		minimumFractionDigits: 2,
// 	})}`
// 	doc.setFontSize(30)
// 	doc.text(precioInversion, 40, doc.lastAutoTable.finalY + 20, { align: 'right' })

// 	const precioEmpleados = `Pago Empleados: $${parseFloat(precioGlobalPagos).toLocaleString(undefined, {
// 		minimumFractionDigits: 2,
// 	})}`
// 	doc.setFontSize(30)
// 	doc.text(precioEmpleados, 40, doc.lastAutoTable.finalY + 20, { align: 'right' })

// 	const gananciaFinal = parseFloat(precioGlobalGanancias - parseFloat(precioGlobalInversion))
// 	const gananciaTexto = `GANANCIA NETA: $${gananciaFinal.toLocaleString(undefined, {
// 		minimumFractionDigits: 2,
// 	})}`
// 	doc.setFontSize(38)
// 	doc.text(gananciaTexto, 20, doc.lastAutoTable.finalY + 55, { align: 'right' })

// 	const nombreArchivo = `GANANCIAS-${fechaActual.dia}-${fechaActual.mes}-${fechaActual.anio}.pdf`
// 	doc.save(nombreArchivo)
// }

function generatePDF() {
	const doc = new jsPDF()

	const tableData1 = []
	const table1 = document.getElementById('table-inversion')
	const rows1 = table1.querySelectorAll('tbody tr')
	const caption1 = table1.querySelector('caption').textContent

	rows1.forEach((row) => {
		const rowData = []
		const cells = row.querySelectorAll('td')

		cells.forEach((cell) => {
			rowData.push(cell.textContent)
		})

		tableData1.push(rowData)
	})

	const tableData2 = []
	const table2 = document.getElementById('table-ganancias')
	const rows2 = table2.querySelectorAll('tbody tr')
	const caption2 = table2.querySelector('caption').textContent

	rows2.forEach((row) => {
		const rowData = []
		const cells = row.querySelectorAll('td')

		cells.forEach((cell) => {
			rowData.push(cell.textContent)
		})

		tableData2.push(rowData)
	})

	const tableData3 = []
	const table3 = document.getElementById('table-empleados')
	const rows3 = table3.querySelectorAll('tbody tr')
	const caption3 = table3.querySelector('caption').textContent

	rows3.forEach((row) => {
		const rowData = []
		const cells = row.querySelectorAll('td')

		cells.forEach((cell) => {
			rowData.push(cell.textContent)
		})

		tableData3.push(rowData)
	})

	const styles = {
		fontSize: 24,
	}

	const fechaActual = obtenerFechaActual()
	const fechaDescarga = `${fechaActual.dia} de ${fechaActual.mes} del ${fechaActual.anio}`

	doc.setFontSize(24)
	doc.text('GANANCIAS GLOBALES', 15, 20)
	doc.setFontSize(24)
	doc.text(fechaDescarga, 15, 30)

	// Agregar caption arriba de la primera tabla y alinear a la izquierda
	doc.setFontSize(24)
	doc.text(caption1, -40, 38)

	doc.autoTable({
		head: [['GASTO DE INVERSIÓN', '                   PRECIO']],
		body: tableData1,
		startY: 50, // Incrementar el valor para dejar espacio debajo del caption
		columnStyles: {
			1: { halign: 'right' },
		},
		styles,
	})

	const precioGlobalSpan = document.getElementById('expense-total')
	const precioGlobalInversion = precioGlobalSpan.textContent

	const totalRow1 = [['Total inversión:', '', '', `$${precioGlobalInversion}`]]
	doc.autoTable({
		body: totalRow1,
		startY: doc.lastAutoTable.finalY + 10,
		showHead: 'never',
		columnStyles: {
			3: { halign: 'right' },
		},
		styles,
	})

	doc.setFontSize(24)
	doc.text(caption2, -10, doc.lastAutoTable.finalY + 18)

	doc.autoTable({
		head: [['DÍA DE GANANCIA', '                     GANANCIA']],
		body: tableData2,
		startY: doc.lastAutoTable.finalY + 30, // Incrementar el valor para dejar espacio debajo del caption
		columnStyles: {
			1: { halign: 'right' },
		},
		styles,
	})

	const precioGlobalSpanGanancias = document.getElementById('total-ganancias-globales')
	const precioGlobalGanancias = precioGlobalSpanGanancias.textContent

	const totalRow2 = [['Total ganancias:', '', '', `$${precioGlobalGanancias}`]]
	doc.autoTable({
		body: totalRow2,
		startY: doc.lastAutoTable.finalY + 10,
		showHead: 'never',
		columnStyles: {
			3: { halign: 'right' },
		},
		styles,
	})

	// Agregar caption arriba de la tercera tabla y alinear a la izquierda
	doc.setFontSize(24)
	doc.text(caption3, -40, doc.lastAutoTable.finalY + 18)

	doc.autoTable({
		head: [['FECHA PAGO', 'EMPLEADO', '          PAGO']],
		body: tableData3,
		startY: doc.lastAutoTable.finalY + 30, // Incrementar el valor para dejar espacio debajo del caption
		columnStyles: {
			1: { halign: 'right' },
		},
		styles,
	})

	const precioGlobalSpanPagos = document.getElementById('pago-total')
	const precioGlobalPagos = precioGlobalSpanPagos.textContent

	const totalRow3 = [['Total pagos de empleados:', '', '', `$${precioGlobalPagos}`]]
	doc.autoTable({
		body: totalRow3,
		startY: doc.lastAutoTable.finalY + 10,
		showHead: 'never',
		columnStyles: {
			3: { halign: 'right' },
		},
		styles,
	})

	const subGanancias = `Total Ganancias: $${parseFloat(precioGlobalGanancias).toLocaleString(undefined, {
		minimumFractionDigits: 2,
	})}`
	doc.setFontSize(30)
	doc.text(subGanancias, 40, doc.lastAutoTable.finalY + 45, { align: 'right' })

	const precioInversion = `Total Inversión: $${parseFloat(precioGlobalInversion).toLocaleString(undefined, {
		minimumFractionDigits: 2,
	})}`
	doc.setFontSize(30)
	doc.text(precioInversion, 40, doc.lastAutoTable.finalY + 80, { align: 'right' })

	const precioEmpleados = `Pago Empleados: $${parseFloat(precioGlobalPagos).toLocaleString(undefined, {
		minimumFractionDigits: 2,
	})}`
	doc.setFontSize(30)
	doc.text(precioEmpleados, 40, doc.lastAutoTable.finalY + 115, { align: 'right' })

	const gananciaFinal =
		parseFloat(precioGlobalGanancias) - (parseFloat(precioGlobalInversion) + parseFloat(precioGlobalPagos))
	const gananciaTexto = `GANANCIA NETA: $${gananciaFinal.toLocaleString(undefined, {
		minimumFractionDigits: 2,
	})}`
	doc.setFontSize(38)
	doc.text(gananciaTexto, 20, doc.lastAutoTable.finalY + 155, { align: 'right' })

	const nombreArchivo = `GANANCIAS-${fechaActual.dia}-${fechaActual.mes}-${fechaActual.anio}.pdf`
	doc.save(nombreArchivo)
}

let gananciasObj = JSON.parse(localStorage.getItem('ganancias')) ?? []
let expenseObj = JSON.parse(localStorage.getItem('exp')) ?? []
let pagosObj = JSON.parse(localStorage.getItem('empleados')) ?? []

function showExpense() {
	if (expenseObj) {
		clean(expenseList)
		const fragment = document.createDocumentFragment()
		let totalExpenses = 0

		expenseObj.forEach((exp) => {
			const { expense, quantity, id } = exp
			const tdExpense = document.createElement('TR')
			const expenseHtml = document.createElement('TD')
			const quantityHtml = document.createElement('TD')
			const optionsHtml = document.createElement('TD')
			const iconDelete = document.createElement('A')
			const iconDeleteImg = document.createElement('SVG')

			tdExpense.dataset.idexpense = id
			expenseHtml.textContent = expense
			quantityHtml.textContent = `$${quantity}`

			iconDelete.setAttribute('href', '#')
			iconDelete.setAttribute('title', 'Eliminar gasto')

			iconDeleteImg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path fill="#d1831d" d="M261 936q-24.75 0-42.375-17.625T201 876V306h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438V306ZM367 790h60V391h-60v399Zm166 0h60V391h-60v399ZM261 306v570-570Z"/></svg>`

			iconDelete.append(iconDeleteImg)
			iconDelete.addEventListener('click', (e) => {
				e.preventDefault()
				Swal.fire({
					title: '¿Estás seguro de eliminar el gasto?',
					icon: 'warning',
					showCancelButton: true,
					confirmButtonText: 'Eliminar',
					cancelButtonText: 'Cancelar',
				}).then((result) => {
					if (result.isConfirmed) {
						deleteExpense(id)
						showSubtotal()
						Swal.fire({
							icon: 'success',
							title: '¡Gasto eliminado!',
							showConfirmButton: false,
							timer: 700,
						})
					}
				})
			})

			optionsHtml.classList.add('table-expense__options')
			optionsHtml.append(iconDelete)
			tdExpense.append(expenseHtml, quantityHtml, optionsHtml)
			fragment.append(tdExpense)

			totalExpenses += parseFloat(quantity) // Sumar al total acumulado
		})

		expenseTotalHtml.textContent = `${totalExpenses}`

		expenseList.append(fragment)
		showSubtotal()
	}
}

function showGanancias() {
	if (gananciasObj) {
		clean(containerGanancias)

		const fragment = document.createDocumentFragment()
		let totalGanancias = 0

		gananciasObj.forEach((ganancia) => {
			const { id, date, total } = ganancia
			const tr = document.createElement('TR')
			const tdDate = document.createElement('TD')
			tdDate.textContent = date
			const tdCantidad = document.createElement('TD')
			tdCantidad.textContent = `$${total}`
			const tdOpc = document.createElement('TD')
			const iconDelete = document.createElement('A')
			const iconDeleteImg = document.createElement('SVG')

			iconDelete.setAttribute('href', '#')
			iconDelete.setAttribute('title', 'Eliminar ganancia')

			iconDeleteImg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path fill="#d1831d" d="M261 936q-24.75 0-42.375-17.625T201 876V306h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438V306ZM367 790h60V391h-60v399Zm166 0h60V391h-60v399ZM261 306v570-570Z"/></svg>`

			iconDelete.append(iconDeleteImg)
			iconDeleteImg.addEventListener('click', (e) => {
				e.preventDefault()
				Swal.fire({
					title: `¿Estás seguro de eliminar la ganancia del día ${date}?`,
					icon: 'warning',
					showCancelButton: true,
					confirmButtonText: 'Eliminar',
					cancelButtonText: 'Cancelar',
				}).then((result) => {
					if (result.isConfirmed) {
						deleteGanancias(id)
						Swal.fire({
							icon: 'success',
							title: '¡Ganancia eliminada!',
							showConfirmButton: false,
							timer: 700,
						})
					}
				})
			})
			tdOpc.append(iconDelete)
			tr.append(tdDate, tdCantidad, tdOpc)
			fragment.append(tr)

			totalGanancias += parseFloat(total) // Sumar al total acumulado
		})

		totalGananciasSpan.textContent = `${totalGanancias}`

		containerGanancias.append(fragment)
		showSubtotal()
	}
}

function showPagos() {
	if (pagosObj) {
		clean(empleadosList)
		const fragment = document.createDocumentFragment()
		let totalPagos = 0
		pagosObj.forEach((emp) => {
			const { date, empleado, quantity, id } = emp
			const trEmpleado = document.createElement('TR')
			const tdDate = document.createElement('TD')
			const empleadoHtml = document.createElement('TD')
			const quantityHtml = document.createElement('TD')
			const optionsHtml = document.createElement('TD')
			const iconDelete = document.createElement('A')
			const iconDeleteImg = document.createElement('SVG')
			trEmpleado.dataset.idempleado = id

			tdDate.textContent = date

			empleadoHtml.textContent = empleado
			quantityHtml.textContent = `$${quantity}`

			iconDelete.setAttribute('href', '#')
			iconDelete.setAttribute('title', 'Eliminar gasto')

			iconDeleteImg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path fill="#d1831d" d="M261 936q-24.75 0-42.375-17.625T201 876V306h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438V306ZM367 790h60V391h-60v399Zm166 0h60V391h-60v399ZM261 306v570-570Z"/></svg>`

			iconDelete.append(iconDeleteImg)
			iconDelete.addEventListener('click', (e) => {
				e.preventDefault()

				Swal.fire({
					title: `¿Estás seguro de eliminar el pago del empleado ${empleado}?`,
					icon: 'warning',
					showCancelButton: true,
					confirmButtonText: 'Eliminar',
					cancelButtonText: 'Cancelar',
				}).then((result) => {
					if (result.isConfirmed) {
						deletePagos(id)
						Swal.fire({
							icon: 'success',
							title: '¡Pago eliminado!',
							showConfirmButton: false,
							timer: 700,
						})
					}
				})
			})

			optionsHtml.classList.add('table-expense__options')
			trEmpleado.append(tdDate, empleadoHtml, quantityHtml, optionsHtml)
			optionsHtml.append(iconDelete)
			fragment.append(trEmpleado)

			totalPagos += parseFloat(quantity) // Sumar al total acumulado
		})

		pagoTotalHtml.textContent = `${totalPagos}`

		empleadosList.append(fragment)
		showSubtotal()
	}
}

function showSubtotal() {
	const totalGastos = Number(document.getElementById('expense-total').textContent)
	const totalGanancias = Number(document.getElementById('total-ganancias-globales').textContent)
	const totalPagos = Number(document.getElementById('pago-total').textContent)

	document.getElementById('sb-inversion').textContent = `${totalGastos.toLocaleString(undefined, {
		minimumFractionDigits: 2,
	})}`
	document.getElementById('sb-ganancias').textContent = `${totalGanancias.toLocaleString(undefined, {
		minimumFractionDigits: 2,
	})}`

	document.getElementById('sb-empleados').textContent = `${totalPagos.toLocaleString(undefined, {
		minimumFractionDigits: 2,
	})}`

	const totalGananciaGlobal = totalGanancias - (totalGastos + totalPagos)
	document.getElementById('total-ganancias').textContent = `${totalGananciaGlobal.toLocaleString(undefined, {
		minimumFractionDigits: 2,
	})}`
}

function deleteGanancias(id) {
	const deletedGan = gananciasObj.filter((gan) => gan.id !== id)
	localStorage.setItem('ganancias', JSON.stringify(deletedGan))

	const updatedGanancias = JSON.parse(localStorage.getItem('ganancias'))
	gananciasObj = updatedGanancias

	showGanancias()
}

function deleteExpense(id) {
	const deletedExp = expenseObj.filter((exp) => exp.id !== id)
	localStorage.setItem('exp', JSON.stringify(deletedExp))

	const updateExpense = JSON.parse(localStorage.getItem('exp'))
	expenseObj = updateExpense
	showExpense()
}

function deletePagos(id) {
	const deletedPag = pagosObj.filter((pag) => pag.id !== id)
	localStorage.setItem('empleados', JSON.stringify(deletedPag))

	const updatePagos = JSON.parse(localStorage.getItem('empleados'))
	pagosObj = updatePagos
	showPagos()
}

function clean(container) {
	while (container.firstChild) {
		container.removeChild(container.firstChild)
	}
}

document.addEventListener('DOMContentLoaded', () => {
	if (gananciasObj.length) {
		showGanancias()
	}

	if (expenseObj.length) {
		showExpense()
	}

	if (pagosObj.length) {
		showPagos()
	}

	showSubtotal()

	btnDeletedGananciasGastos.addEventListener('click', (e) => {
		e.preventDefault()
		if (Number(expenseTotalHtml.textContent) > 0 && Number(totalGananciasSpan.textContent) > 0) {
			Swal.fire({
				title: `¿Estás seguro de eliminar la inversión y las ganancias?`,
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Eliminar',
				cancelButtonText: 'Cancelar',
			}).then((result) => {
				if (result.isConfirmed) {
					localStorage.removeItem('ganancias')
					localStorage.removeItem('exp')
					localStorage.removeItem('empleados')

					Swal.fire({
						icon: 'success',
						title: '¡Datos eliminados!',
						showConfirmButton: false,
						timer: 700,
					})

					setTimeout(() => {
						location.reload()
					}, 705)
				}
			})
		} else {
			showAlert(
				'No se pueden eliminar los registros. Debe haber inversiones, ganancias y pagos de empleados registrados.',
				'error-fixed'
			)
		}
	})
})
