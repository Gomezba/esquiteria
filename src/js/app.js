import { menuToggle } from './menu/menu.js'
import { labelColor, newProduct, validateConfig, readingObject, showHtmlProducts } from './config/config.js'

window.addEventListener('DOMContentLoaded', () => {
	menuToggle()
	if (window.location.pathname.endsWith('/configuration.html')) {
		readingObject()
		validateConfig()
		labelColor()
		newProduct()
		showHtmlProducts()
	}
})
