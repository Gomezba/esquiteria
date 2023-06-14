import { obtenerFechaActual } from '../functions/date.js'
import { showAlert } from '../order/order.js'

const formExpense = document.getElementById('form-expense')
const expenseList = document.getElementById('expense-list')
const expenseTotalHtml = document.getElementById('expense-total')
const btnExpense = document.getElementById('btn-expense')
const btnCancel = document.getElementById('btn-cancel')
const botonDescargar = document.getElementById('descargar-pdf')
const btnDeletedGananciasGastos = document.getElementById('delete-ganancias-gastos')

const totalGananciasSpan = document.getElementById('total-ganancias-globales')
const containerGanancias = document.getElementById('ganancias-container-total')

class Expense {
	constructor() {
		this.expenseTotal
		this.expense = JSON.parse(localStorage.getItem('exp')) ?? []
	}

	addExpense(expenseObj) {
		this.expense = [...this.expense, expenseObj]
		this.calcExpense()

		// console.log(this.expense)
	}

	calcExpense() {
		this.expenseTotal = this.expense.reduce((total, element) => total + element.quantity, 0)
	}

	deleteExpense(id) {
		this.expense = this.expense.filter((exp) => exp.id != id)
		this.calcExpense()
	}

	updateExpense(expUpdate) {
		this.expense = this.expense.map((exp) => (exp.id === Number(expUpdate.id) ? expUpdate : exp))
		this.calcExpense()
	}
}

class Ui {
	showExpense(expense) {
		const fragment = document.createDocumentFragment()
		expense.forEach((exp) => {
			const { expense, quantity, id } = exp
			const tdExpense = document.createElement('TR')
			const expenseHtml = document.createElement('TD')
			const quantityHtml = document.createElement('TD')
			const optionsHtml = document.createElement('TD')
			const iconDelete = document.createElement('A')
			const iconUpdate = document.createElement('A')
			const iconUpdateImg = document.createElement('SVG')
			const iconDeleteImg = document.createElement('SVG')

			tdExpense.dataset.idexpense = id
			expenseHtml.textContent = expense
			quantityHtml.textContent = `$${quantity}`

			iconUpdate.setAttribute('href', '#')
			iconUpdate.setAttribute('title', 'Modificar gasto')

			iconUpdateImg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path fill="#ffd500c2" d="M180 876h44l443-443-44-44-443 443v44Zm614-486L666 262l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248 936H120V808l504-504 128 128Zm-107-21-22-22 44 44-22-22Z"/></svg>`

			iconUpdate.append(iconUpdateImg)
			iconUpdate.onclick = () => {
				btnExpense.dataset.btntype = 'update'
				btnExpense.dataset.id = id
				updateExpense(exp)
				btnCancel.removeAttribute('hidden')
			}

			iconDelete.setAttribute('href', '#')
			iconDelete.setAttribute('title', 'Eliminar gasto')

			iconDeleteImg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path fill="#d1831d" d="M261 936q-24.75 0-42.375-17.625T201 876V306h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438V306ZM367 790h60V391h-60v399Zm166 0h60V391h-60v399ZM261 306v570-570Z"/></svg>`

			iconDelete.append(iconDeleteImg)
			iconDelete.addEventListener('click', (e) => {
				e.preventDefault()

				if (btnExpense.dataset.btntype === 'update') {
					showAlert('No se puede eliminar mientras se edita', 'error-fixed')
					return
				}

				Swal.fire({
					title: '¿Estás seguro de eliminar el gasto?',
					icon: 'warning',
					showCancelButton: true,
					confirmButtonText: 'Eliminar',
					cancelButtonText: 'Cancelar',
				}).then((result) => {
					if (result.isConfirmed) {
						expenseUser.deleteExpense(id)
						ui.deleteExpense()
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
			optionsHtml.append(iconUpdate, iconDelete)
			tdExpense.append(expenseHtml, quantityHtml, optionsHtml)
			fragment.append(tdExpense)
		})
		expenseList.textContent = ''
		expenseList.append(fragment)
	}

	showExpenseTotal() {
		const { expenseTotal } = expenseUser
		expenseTotalHtml.textContent = `${expenseTotal}`
		showSubtotal()
	}

	deleteExpense() {
		const { expense } = expenseUser
		this.showExpense(expense)
		this.showExpenseTotal()
		addLocal()
	}
}

const ui = new Ui()
const expenseUser = new Expense()

const validateForm = (e) => {
	e.preventDefault()
	const inputExpense = document.getElementById('expense').value.trim()
	const inputQuantity = Number(document.getElementById('quantity').value.trim())
	const moneyRegex = /^(?!0[0-9])[0-9]*(\.[0-9]+)?$/

	if (inputExpense === '' || inputQuantity === '') {
		showAlert('Ambos campos son obligatorios', 'error-fixed')
		return
	}

	if (isNaN(inputQuantity) || !moneyRegex.test(inputQuantity) || inputQuantity <= 0.99) {
		showAlert('Precio incorrecto', 'error-fixed')
		return
	}

	const expenseObj = {
		expense: inputExpense,
		quantity: inputQuantity,
		id: Date.now(),
	}

	if (btnExpense.dataset.btntype === 'add') {
		expenseUser.addExpense(expenseObj)
		Swal.fire({
			icon: 'success',
			title: '¡Gasto agregado!',
			showConfirmButton: false,
			timer: 700,
		})
		addLocal()
	} else {
		const inputExpense = document.getElementById('expense').value.trim()
		const inputQuantity = Number(document.getElementById('quantity').value.trim())
		const moneyRegex = /^(?!0[0-9])[0-9]*(\.[0-9]+)?$/

		if (inputExpense === '' || inputQuantity === '') {
			showAlert('Ambos campos son obligatorios', 'error-fixed')
			return
		}

		if (isNaN(inputQuantity) || !moneyRegex.test(inputQuantity) || inputQuantity <= 0.99) {
			showAlert('Precio incorrecto', 'error-fixed')
			return
		}

		expenseObj.id = Number(btnExpense.dataset.id)
		expenseUser.updateExpense(expenseObj)
		btnExpense.dataset.btntype = 'add'
		btnExpense.textContent = 'Agregar'
		Swal.fire({
			icon: 'success',
			title: '¡Gasto editado!',
			showConfirmButton: false,
			timer: 700,
		})
		btnCancel.setAttribute('hidden', true)
		addLocal()
	}
	const { expense } = expenseUser

	ui.showExpenseTotal()
	ui.showExpense(expense)
	formExpense.reset()
}

const updateExpense = (expense) => {
	const { expense: expenseValue, quantity } = expense

	btnCancel.addEventListener('click', editionCancel)

	const expenseInput = document.getElementById('expense')
	const quantityInput = document.getElementById('quantity')

	expenseInput.value = expenseValue
	quantityInput.value = quantity
	btnExpense.textContent = 'Guardar'
}

const editionCancel = () => {
	btnCancel.setAttribute('hidden', true)
	btnExpense.dataset.btntype = 'add'
	btnExpense.textContent = 'Agregar'
	formExpense.reset()
}

const addLocal = () => {
	const { expense } = expenseUser
	localStorage.setItem('exp', JSON.stringify(expense))
}

const eventListener = () => {
	formExpense.addEventListener('submit', validateForm)

	botonDescargar.addEventListener('click', generatePDF)
}

eventListener()

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

	const precioInversion = `Total Inversión: $${parseFloat(precioGlobalInversion).toLocaleString(undefined, {
		minimumFractionDigits: 2,
	})}`
	doc.setFontSize(30)
	doc.text(precioInversion, 40, doc.lastAutoTable.finalY + 20, { align: 'right' })

	const subGanancias = `Total Ganancias: $${parseFloat(precioGlobalGanancias).toLocaleString(undefined, {
		minimumFractionDigits: 2,
	})}`
	doc.setFontSize(30)
	doc.text(subGanancias, 40, doc.lastAutoTable.finalY + 35, { align: 'right' })

	const gananciaFinal = parseFloat(precioGlobalGanancias - parseFloat(precioGlobalInversion))
	const gananciaTexto = `GANANCIA NETA: $${gananciaFinal.toLocaleString(undefined, {
		minimumFractionDigits: 2,
	})}`
	doc.setFontSize(38)
	doc.text(gananciaTexto, 20, doc.lastAutoTable.finalY + 55, { align: 'right' })

	const nombreArchivo = `GANANCIAS-${fechaActual.dia}-${fechaActual.mes}-${fechaActual.anio}.pdf`
	doc.save(nombreArchivo)
}

let gananciasObj = JSON.parse(localStorage.getItem('ganancias')) ?? []

function showGanancias() {
	if (gananciasObj) {
		clean()

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

function showSubtotal() {
	const totalGastos = Number(document.getElementById('expense-total').textContent)
	const totalGanancias = Number(document.getElementById('total-ganancias-globales').textContent)
	document.getElementById('sb-inversion').textContent = `${totalGastos.toLocaleString(undefined, {
		minimumFractionDigits: 2,
	})}`
	document.getElementById('sb-ganancias').textContent = `${totalGanancias.toLocaleString(undefined, {
		minimumFractionDigits: 2,
	})}`

	const totalGananciaGlobal = totalGanancias - totalGastos

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

function clean() {
	while (containerGanancias.firstChild) {
		containerGanancias.removeChild(containerGanancias.firstChild)
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const { expense } = expenseUser
	if (expense.length) {
		const total = expense.reduce((total, element) => total + element.quantity, 0)
		expenseTotalHtml.textContent = `${total}`
		ui.showExpense(expense)
	}

	if (gananciasObj.length) {
		showGanancias()
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
			showAlert('Debe haber una inversion y ganancias registradas, para poder eliminar', 'error-fixed')
		}
	})
})
