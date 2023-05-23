import { request } from '../order/order.js'
const ordersContainer = document.getElementById('orders-container')

const btnDel = document.getElementById('orders-deleted')

function disabledBtn() {
	if (ordersContainer.textContent === '') {
		btnDel.setAttribute('disabled', true)
	}

	if (ordersContainer.textContent !== '') {
		btnDel.removeAttribute('disabled')
	}
}

let db

if (location.pathname.endsWith('orders-list.html')) {
	request.onsuccess = (e) => {
		db = e.target.result
		readData()
		disabledBtn()
	}

	btnDel.addEventListener('click', function () {
		Swal.fire({
			title: 'Advertencia!',
			html:
				'Por favor, tenga en cuenta que al eliminar las órdenes, <strong style="color:#C62828">se borrarán los registros de ventas totales</strong>. Le recomendamos que descargue y guarde el informe de ventas antes de proceder con la eliminación',
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
					if (password === 'tatis97') {
						Swal.fire({
							icon: 'success',
							title: '¡Las órdenes han sido borradas del sistema!',
							showConfirmButton: false,
							timer: 1500,
						})

						modal.style.display = 'none'

						const request = indexedDB.deleteDatabase('customerOrders')
						setTimeout(() => {
							location.reload()
						}, 1510)

						request.onerror = (event) => {
							console.log('Error al eliminar la base de datos:', event.target.error)
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

	// Cerrar el modal al hacer clic en el botón de cerrar o fuera del modal
}

request.onerror = (event) => {
	Swal.fire({
		icon: 'error',
		title: '¡Error!',
		text: `Ha ocurrido un error inesperado ${event.target.error}`,
		confirmButtonText: 'Aceptar',
	})
}

function readData() {
	const transaction = db.transaction(['orders'], 'readonly')
	const objectStore = transaction.objectStore('orders')
	const request = objectStore.openCursor()
	const fragment = document.createDocumentFragment()

	request.onsuccess = (e) => {
		const cursor = e.target.result
		if (cursor) {
			const wrapperOrder = document.createElement('SECTION')
			const arrowIcon = document.createElement('A')
			const img = document.createElement('IMG')
			const order = document.createElement('DIV')
			const date = document.createElement('P')
			const customerLabel = document.createElement('P')
			const customer = document.createElement('P')
			const table = document.createElement('TABLE')
			const thead = document.createElement('THEAD')
			const tbody = document.createElement('TBODY')
			const tfoot = document.createElement('TFOOT')
			const infoTitle = document.createElement('P')
			const infoDescription = document.createElement('DIV')
			const payCustomer = document.createElement('P')
			const moneyExchanges = document.createElement('P')

			wrapperOrder.classList.add('wrapper-order')
			arrowIcon.classList.add('arrow-down')
			arrowIcon.addEventListener('click', accordeon)
			img.setAttribute('src', '../../assets/icons/arrow-down.svg')
			img.setAttribute('alt', 'arrow down')
			order.classList.add('order')
			date.classList.add('order__date')

			date.textContent = cursor.value.date

			customerLabel.classList.add('order__customer-label')
			customerLabel.textContent = 'Cliente:'
			customer.classList.add('order__customer')
			customer.textContent = cursor.value.customer

			cursor.value.products.forEach((prod) => {
				const tr = document.createElement('TR')
				const tdProd = document.createElement('TD')
				const tdQuant = document.createElement('TD')
				const tdPt = document.createElement('TD')

				tdProd.textContent = prod.name
				tdQuant.textContent = prod.quantity
				tdPt.textContent = prod.price

				tr.append(tdProd, tdQuant, tdPt)
				tbody.append(tr)
			})

			const tdTfoot = document.createElement('TD')
			tdTfoot.setAttribute('colspan', '3')
			tdTfoot.textContent = `Total: $${cursor.value.total}`

			infoTitle.classList.add('order__info-title')
			infoTitle.textContent = 'Información adicional'
			infoDescription.classList.add('order__info-description')
			infoDescription.textContent = cursor.value.adicionalInfo

			payCustomer.textContent = `Pago del cliente: $${cursor.value.receivedBill}`
			moneyExchanges.textContent = `Cambio: $${cursor.value.moneyChange}`

			arrowIcon.append(img)
			thead.innerHTML = `
          <tr>
            <th>PROD</th>
            <th>CAN</th>
            <th>PT</th>
          </tr>
        `
			tfoot.append(tdTfoot)
			table.append(thead, tbody, tfoot)
			order.append(date, customerLabel, customer, table, infoTitle, infoDescription, payCustomer, moneyExchanges)
			wrapperOrder.append(arrowIcon, order)
			fragment.append(wrapperOrder)

			cursor.continue() // Avanzar al siguiente registro
		} else {
			ordersContainer.textContent = ''
			ordersContainer.append(fragment)
			disabledBtn()
		}
	}
}

function accordeon(e) {
	e.preventDefault()

	e.target.classList.toggle('active')

	const order = e.target.nextElementSibling
	order.classList.toggle('order-active')
}
