import { menuToggle } from './menu/menu.js'
import { labelColor, newProduct, showProducts, validateConfig } from './config/config.js'

window.addEventListener('DOMContentLoaded', () => {
	menuToggle()
	if (window.location.pathname.endsWith('/configuration.html')) {
		showProducts()
		validateConfig()
		labelColor()
		newProduct()
	}
})
