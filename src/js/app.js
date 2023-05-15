import { menuToggle } from './menu/menu.js'
import { newProduct, validateConfig, readingObject, showHtmlProducts } from './config/config.js'

addEventListener('DOMContentLoaded', () => {
	menuToggle()
	if (location.pathname.endsWith('/configuration.html')) {
		readingObject()
		validateConfig()
		newProduct()
		showHtmlProducts()
	}
})
