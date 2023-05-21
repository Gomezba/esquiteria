import { request } from '../order/order.js'

let db

if (location.pathname.endsWith('orders-list.html')) {
	request.onsuccess = (e) => {
		db = e.target.result
		readData()
	}
}

request.onerror = (event) => {
	console.log('Error al abrir la base de datos:', event.target.error)
}

function readData() {
	const ordersContainer = document.getElementById('orders-container')
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
			img.setAttribute('src', '/src/assets/icons/arrow-down.svg')
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
		}
	}
}

function accordeon(e) {
	e.preventDefault()

	e.target.classList.toggle('active')

	const order = e.target.nextElementSibling
	order.classList.toggle('order-active')
}
