import { menuToggle } from './menu/menu.js'
import { newProduct, validateConfig, readingObject, showHtmlProducts } from './config/config.js'
import {
	eventsListeners,
	showProductsHtml,
	customerPaymentInput,
	createOrder,
	listenDetailsCustomer,
} from './order/order.js'

import {} from './list-orders/list-orders.js'
import {} from './sold-products/sold-products.js'

if ('serviceWorker' in navigator) {
	navigator.serviceWorker
		.register('../../../sw.js')
		.then((registrado) => console.log('Se instalo correctamente', registrado))
		.catch((error) => alert('Falló la instalación', error))
} else {
	alert('Service Workers no soportados')
}

addEventListener('DOMContentLoaded', () => {
	menuToggle()
	if (location.pathname.endsWith('/configuration.html')) {
		readingObject()
		validateConfig()
		newProduct()
		showHtmlProducts()
	}

	if (location.pathname.endsWith('/order.html')) {
		showProductsHtml()
		eventsListeners()
		customerPaymentInput()
		createOrder()
		listenDetailsCustomer()
	}
})
