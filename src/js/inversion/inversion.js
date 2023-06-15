import { showAlert } from '../order/order.js'

const formExpense = document.getElementById('form-expense')
const expenseList = document.getElementById('expense-list')
const expenseTotalHtml = document.getElementById('expense-total')
const btnExpense = document.getElementById('btn-expense')
const btnCancel = document.getElementById('btn-cancel')

export class Expense {
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
		clean()

		const fragment = document.createDocumentFragment()
		expense.forEach((exp) => {
			const { expense, quantity, id } = exp
			const trExpense = document.createElement('TR')
			const expenseHtml = document.createElement('TD')
			const quantityHtml = document.createElement('TD')
			const optionsHtml = document.createElement('TD')
			const iconDelete = document.createElement('A')
			const iconUpdate = document.createElement('A')
			const iconUpdateImg = document.createElement('SVG')
			const iconDeleteImg = document.createElement('SVG')

			trExpense.dataset.idexpense = id
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
			trExpense.append(expenseHtml, quantityHtml, optionsHtml)
			fragment.append(trExpense)
		})
		expenseList.append(fragment)
	}

	showExpenseTotal() {
		const { expenseTotal } = expenseUser
		expenseTotalHtml.textContent = `${expenseTotal}`
	}

	deleteExpense() {
		const { expense } = expenseUser
		this.showExpense(expense)
		this.showExpenseTotal()
		addLocal()
	}
}

function clean() {
	while (expenseList.firstChild) {
		expenseList.removeChild(expenseList.firstChild)
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
}

eventListener()

addEventListener('DOMContentLoaded', () => {
	const { expense } = expenseUser
	if (expense.length) {
		const total = expense.reduce((total, element) => total + element.quantity, 0)
		expenseTotalHtml.textContent = `${total}`
		ui.showExpense(expense)
	}
})
