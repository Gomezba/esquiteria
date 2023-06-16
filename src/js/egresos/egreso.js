import { showAlert, cleanContainer } from '../order/order.js'

const formEgresos = document.getElementById('form-egresos')
const egresosContainer = document.getElementById('egresos-container')
const btnAddEgreso = document.getElementById('add-egreso')
const btnEditCancel = document.getElementById('cancel-egreso-edit')

const egreso = document.getElementById('egreso')
const egresoCant = document.getElementById('egreso-cant')

let egresosObjetos = JSON.parse(localStorage.getItem('egresos')) ?? []

btnEditCancel.addEventListener('click', (e) => {
	e.preventDefault()
	btnAddEgreso.dataset.type = 'add'
	btnAddEgreso.textContent = 'Agregar'
	btnAddEgreso.dataset.id = ''
	formEgresos.reset()
})

function addLocalEgresos(objeto) {
	egresosObjetos.push(objeto)
	localStorage.setItem('egresos', JSON.stringify(egresosObjetos))
}

btnAddEgreso.addEventListener('click', (e) => {
	e.preventDefault()

	const egr = egreso.value.trim()
	const cant = egresoCant.value

	if (btnAddEgreso.dataset.type === 'add') {
		const egresoObj = {
			name: '',
			cantidad: '',
		}

		const moneyRegex = /^(?!0[0-9])[0-9]*(\.[0-9]+)?$/

		if (egr === '' || cant === '') {
			showAlert('Todos los campos son obligatorios', 'error-fixed')
			return
		}

		if (isNaN(cant) || !moneyRegex.test(cant) || cant <= 0.99) {
			showAlert('Precio incorrecto', 'error-fixed')
			return
		}

		egresoObj.name = egr
		egresoObj.cantidad = Number(cant)
		egresoObj.id = Date.now()

		addLocalEgresos(egresoObj)
		showEgresos()
		formEgresos.reset()

		Swal.fire({
			icon: 'success',
			title: '¡Egreso agregado!',
			showConfirmButton: false,
			timer: 700,
		})
	}

	if (btnAddEgreso.dataset.type === 'edit') {
		const moneyRegex = /^(?!0[0-9])[0-9]*(\.[0-9]+)?$/

		if (egr === '' || cant === '') {
			showAlert('Todos los campos son obligatorios', 'error-fixed')
			return
		}

		if (isNaN(cant) || !moneyRegex.test(cant) || cant <= 0.99) {
			showAlert('Precio incorrecto', 'error-fixed')
			return
		}

		editEgreso(egr, cant)
		btnAddEgreso.dataset.type = 'add'
		btnAddEgreso.textContent = 'Agregar'
		btnAddEgreso.dataset.id = ''
		formEgresos.reset()
	}
})

function showEgresos() {
	if (egresosObjetos) {
		cleanContainer(egresosContainer)

		const fragment = document.createDocumentFragment()
		egresosObjetos.forEach((egreso) => {
			const { name, cantidad, id } = egreso
			const tr = document.createElement('TR')
			const tdName = document.createElement('TD')
			tdName.textContent = name
			const tdCantidad = document.createElement('TD')
			tdCantidad.textContent = `$${cantidad}`
			const tdOpt = document.createElement('TD')
			tdOpt.classList.add('opt-egreso')
			const div = document.createElement('DIV')
			const btnEdit = document.createElement('BUTTON')
			btnEdit.type = 'button'
			btnEdit.classList.add('editar-egreso')
			btnEdit.textContent = 'Editar'

			btnEdit.addEventListener('click', (e) => {
				e.preventDefault()

				const data = {
					name,
					cantidad,
					id,
				}

				fillInputs(data)
			})

			const btnDel = document.createElement('BUTTON')
			btnDel.type = 'button'
			btnDel.classList.add('eliminar-egreso')
			btnDel.textContent = 'Eliminar'

			btnDel.addEventListener('click', (e) => {
				e.preventDefault()
				const passwordModal = document.getElementById('passwordModal')
				const passwordInput = passwordModal.querySelector('.passwordInput')
				const submitBtn = passwordModal.querySelector('.submitBtn')

				passwordModal.style.display = 'block'

				// Función para cerrar el modal al hacer clic en la "X"
				const closeBtn = passwordModal.querySelector('.close')
				closeBtn.addEventListener('click', () => {
					passwordModal.style.display = 'none'
					passwordInput.value = ''
				})

				submitBtn.addEventListener('click', () => {
					const password = passwordInput.value

					if (password === 'tatis') {
						passwordModal.style.display = 'none'
						deletedEgreso(id) // Llamar a la función deletedEgreso() con el ID del egreso
						Swal.fire({
							icon: 'success',
							title: '¡Egreso eliminado!',
							showConfirmButton: false,
							timer: 700,
						})
						setTimeout(() => {
							passwordInput.value = ''
						}, 200)
					} else {
						const alert = document.createElement('P')
						alert.classList.add('error-modal')
						alert.textContent = 'Contraseña incorrecta'
						passwordInput.after(alert)
						setTimeout(() => {
							alert.remove()
						}, 2000)
					}
				})
			})

			div.append(btnEdit, btnDel)
			tdOpt.append(div)
			tr.append(tdName, tdCantidad, tdOpt)
			fragment.append(tr)
		})

		egresosContainer.append(fragment)
	}
}

function fillInputs({ name, cantidad, id }) {
	btnAddEgreso.dataset.type = 'edit'
	btnAddEgreso.textContent = 'Editar'
	btnAddEgreso.dataset.id = id
	egreso.value = name
	egresoCant.value = Number(cantidad)
}

function editEgreso(nameEgreso, cantidadEgreso) {
	const idEgreso = parseInt(btnAddEgreso.dataset.id)

	const egresoEncontrado = egresosObjetos.find((egr) => egr.id === idEgreso)

	if (egresoEncontrado) {
		egresoEncontrado.name = nameEgreso
		egresoEncontrado.cantidad = cantidadEgreso
	}

	// Actualizar el local storage con los nuevos valores
	localStorage.setItem('egresos', JSON.stringify(egresosObjetos))

	showEgresos()

	Swal.fire({
		icon: 'success',
		title: '¡Egreso modificado!',
		showConfirmButton: false,
		timer: 700,
	})
}

function deletedEgreso(id) {
	const deletedEgr = egresosObjetos.filter((egr) => egr.id !== id)
	localStorage.setItem('egresos', JSON.stringify(deletedEgr))

	egresosObjetos = JSON.parse(localStorage.getItem('egresos')) ?? []

	btnAddEgreso.dataset.type = 'add'
	btnAddEgreso.textContent = 'Agregar'
	btnAddEgreso.dataset.id = ''
	formEgresos.reset()
	showEgresos()
}

addEventListener('DOMContentLoaded', () => {
	showEgresos()
})
