import { menuToggle } from './menu/menu.js'
import { newProduct, validateConfig, readingObject, showHtmlProducts } from './config/config.js'
import {
	eventsListeners,
	showProductsHtml,
	customerPaymentInput,
	createOrder,
	listenDetailsCustomer,
} from './order/order.js'

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
		window.addEventListener('beforeunload', function (event) {
			// Mostrar una alerta al intentar recargar la página
			event.preventDefault()
			event.returnValue = '¿Estás seguro de que deseas recargar la página?'
		})

		showProductsHtml()
		eventsListeners()
		customerPaymentInput()
		createOrder()
		listenDetailsCustomer()
	}
})

const menuItems = document.querySelectorAll('#menu .menu__link')

function updateLinkNames(mq) {
	if (mq.matches) {
		// Pantalla entre 420px y 950px de ancho
		menuItems[0].textContent = 'T.Orden'
		menuItems[1].textContent = 'V.D.Día'
		menuItems[2].textContent = 'G.D.Inversión'
		menuItems[3].textContent = 'P.Empleados'
		menuItems[4].textContent = 'Ganancias'
	} else {
		// Pantalla fuera del rango definido
		menuItems[0].textContent = 'Tomar orden'
		menuItems[1].textContent = 'Venta del día'
		menuItems[2].textContent = 'Gastos de inversión'
		menuItems[3].textContent = 'Pago de empleados'
		menuItems[4].textContent = 'Ganancias'
	}
}

const mediaQuery = window.matchMedia('(min-width: 420px) and (max-width: 950px)')
updateLinkNames(mediaQuery) // Actualizar los nombres de los enlaces inicialmente según el ancho de la pantalla

mediaQuery.addEventListener('change', updateLinkNames) // Escuchar cambios en el ancho de la pantalla
