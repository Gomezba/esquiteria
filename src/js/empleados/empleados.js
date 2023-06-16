import { showAlert } from '../order/order.js'
import { obtenerFechaActual } from '../functions/date.js'

const formEmpleado = document.getElementById('form-empleados')
const empleadosList = document.getElementById('empleados-list')
const pagoTotalHtml = document.getElementById('pago-total')
const btnExpense = document.getElementById('btn-pago')
const btnCancel = document.getElementById('btn-cancel')

export class Empleado {
	constructor() {
		this.empleadoTotal
		this.empleado = JSON.parse(localStorage.getItem('empleados')) ?? []
	}

	addEmpleado(empleadoObj) {
		this.empleado = [...this.empleado, empleadoObj]
		this.calcEmpleado()

		// console.log(this.empleado)
	}

	calcEmpleado() {
		this.empleadoTotal = this.empleado.reduce((total, element) => total + element.quantity, 0)
	}

	deleteEmpleado(id) {
		this.empleado = this.empleado.filter((emp) => emp.id != id)
		this.calcEmpleado()
	}

	updateEmpleado(empUpdate) {
		this.empleado = this.empleado.map((emp) => (emp.id === Number(empUpdate.id) ? empUpdate : emp))
		this.calcEmpleado()
	}
}

class Ui {
	showEmpleado(empleado) {
		clean()

		const fragment = document.createDocumentFragment()
		empleado.forEach((emp) => {
			const { date, empleado, quantity, id } = emp
			const trEmpleado = document.createElement('TR')
			const tdDate = document.createElement('TD')
			const empleadoHtml = document.createElement('TD')
			const quantityHtml = document.createElement('TD')
			const optionsHtml = document.createElement('TD')
			const iconDelete = document.createElement('A')
			const iconUpdate = document.createElement('A')
			const iconUpdateImg = document.createElement('SVG')
			const iconDeleteImg = document.createElement('SVG')
			trEmpleado.dataset.idempleado = id

			tdDate.textContent = date

			empleadoHtml.textContent = empleado
			quantityHtml.textContent = `$${quantity}`

			iconUpdate.setAttribute('href', '#')
			iconUpdate.setAttribute('title', 'Modificar información empleado')

			iconUpdateImg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path fill="#ffd500c2" d="M180 876h44l443-443-44-44-443 443v44Zm614-486L666 262l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248 936H120V808l504-504 128 128Zm-107-21-22-22 44 44-22-22Z"/></svg>`

			iconUpdate.append(iconUpdateImg)
			iconUpdate.onclick = () => {
				btnExpense.dataset.btntype = 'update'
				btnExpense.dataset.id = id
				updateEmpleado(emp)
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
					title: `¿Estás seguro de eliminar el pago del empleado ${empleado}?`,
					icon: 'warning',
					showCancelButton: true,
					confirmButtonText: 'Eliminar',
					cancelButtonText: 'Cancelar',
				}).then((result) => {
					if (result.isConfirmed) {
						empleadoUser.deleteEmpleado(id)
						ui.deleteEmpleado()
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
			optionsHtml.append(iconUpdate, iconDelete)
			fragment.append(trEmpleado)
		})
		empleadosList.append(fragment)
	}

	showEmpleadoTotal() {
		const { empleadoTotal } = empleadoUser
		pagoTotalHtml.textContent = `${empleadoTotal}`
	}

	deleteEmpleado() {
		const { empleado } = empleadoUser
		this.showEmpleado(empleado)
		this.showEmpleadoTotal()
		addLocal()
	}
}

function clean() {
	while (empleadosList.firstChild) {
		empleadosList.removeChild(empleadosList.firstChild)
	}
}

const ui = new Ui()
const empleadoUser = new Empleado()

const validateForm = (e) => {
	e.preventDefault()
	const inputEmpleado = document.getElementById('empleado').value.trim()
	const inputQuantity = Number(document.getElementById('quantity').value.trim())
	const moneyRegex = /^(?!0[0-9])[0-9]*(\.[0-9]+)?$/

	if (inputEmpleado === '' || inputQuantity === '') {
		showAlert('Ambos campos son obligatorios', 'error-fixed')
		return
	}

	if (isNaN(inputQuantity) || !moneyRegex.test(inputQuantity) || inputQuantity <= 0.99) {
		showAlert('Pago incorrecto', 'error-fixed')
		return
	}

	const fechaActual = obtenerFechaActual()
	const fechaPago = `${fechaActual.dia} de ${fechaActual.mes} del ${fechaActual.anio}`

	const empleadoObj = {
		date: fechaPago,
		empleado: inputEmpleado,
		quantity: inputQuantity,
		id: Date.now(),
	}

	if (btnExpense.dataset.btntype === 'add') {
		empleadoUser.addEmpleado(empleadoObj)
		Swal.fire({
			icon: 'success',
			title: '¡Pago agregado!',
			showConfirmButton: false,
			timer: 700,
		})
		addLocal()
	} else {
		const inputEmpleado = document.getElementById('empleado').value.trim()
		const inputQuantity = Number(document.getElementById('quantity').value.trim())
		const moneyRegex = /^(?!0[0-9])[0-9]*(\.[0-9]+)?$/

		if (inputEmpleado === '' || inputQuantity === '') {
			showAlert('Ambos campos son obligatorios', 'error-fixed')
			return
		}

		if (isNaN(inputQuantity) || !moneyRegex.test(inputQuantity) || inputQuantity <= 0.99) {
			showAlert('Pago incorrecto', 'error-fixed')
			return
		}

		empleadoObj.id = Number(btnExpense.dataset.id)
		empleadoUser.updateEmpleado(empleadoObj)
		btnExpense.dataset.btntype = 'add'
		btnExpense.textContent = 'Agregar'
		Swal.fire({
			icon: 'success',
			title: '¡Información de empleado editada!',
			showConfirmButton: false,
			timer: 700,
		})
		btnCancel.setAttribute('hidden', true)
		addLocal()
	}
	const { empleado } = empleadoUser

	ui.showEmpleadoTotal()
	ui.showEmpleado(empleado)
	formEmpleado.reset()
}

const updateEmpleado = (empleado) => {
	const { empleado: empleadoValue, quantity } = empleado

	btnCancel.addEventListener('click', editionCancel)

	const empleadoInput = document.getElementById('empleado')
	const quantityInput = document.getElementById('quantity')

	empleadoInput.value = empleadoValue
	quantityInput.value = quantity
	btnExpense.textContent = 'Guardar'
}

const editionCancel = () => {
	btnCancel.setAttribute('hidden', true)
	btnExpense.dataset.btntype = 'add'
	btnExpense.textContent = 'Agregar'
	formEmpleado.reset()
}

const addLocal = () => {
	const { empleado } = empleadoUser
	localStorage.setItem('empleados', JSON.stringify(empleado))
}

const eventListener = () => {
	formEmpleado.addEventListener('submit', validateForm)
}

eventListener()

addEventListener('DOMContentLoaded', () => {
	const { empleado } = empleadoUser
	if (empleado.length) {
		const total = empleado.reduce((total, element) => total + element.quantity, 0)
		pagoTotalHtml.textContent = `${total}`
		ui.showEmpleado(empleado)
	}
})
