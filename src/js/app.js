import { menuToggle } from './menu/menu.js'
import { newProduct, validateConfig, readingObject, showHtmlProducts } from './config/config.js'
import { eventsListeners, showProductsHtml, customerPaymentInput } from './order/order.js'

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
	}
})
