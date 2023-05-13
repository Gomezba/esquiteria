import { menuToggle } from './menu/menu.js'
import { labelColor, newProduct, showProducts, validateConfig, readingObject } from './config/config.js'

window.addEventListener('DOMContentLoaded', () => {
	menuToggle()
	if (window.location.pathname.endsWith('/configuration.html')) {
		readingObject()
		showProducts()
		validateConfig()
		labelColor()
		newProduct()
	}
})
