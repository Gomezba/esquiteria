import { dia, mes, anio, horas, minutos, fecha } from '../functions/date.js'
import { ConectorEscposAndroid } from '../tickets/ConectorEscposAndroid.js'

const arrowBotanas = document.querySelector('[data-arrow="botanas"]')
const arrowDesserts = document.querySelector('[data-arrow="desserts"]')
const arrowDrinks = document.querySelector('[data-arrow="drinks"]')
const arrowOthers = document.querySelector('[data-arrow="others"]')
const arrowCustomized = document.querySelector('[data-arrow="customized"]')

const botanasContainer = document.getElementById('botanas-container')
const dessertsContainer = document.getElementById('desserts-container')
const drinksContainer = document.getElementById('drinks-container')
const othersContainer = document.getElementById('others-container')
const customizedContainer = document.getElementById('customized-container')

const productsTableContainer = document.getElementById('products-table')
const totalOrder = document.getElementById('total-order')
const customerPay = document.getElementById('money')
const moneyExchanges = document.getElementById('money-exchanges')

const body = document.getElementById('body')

const orderDetails = document.getElementById('details')
const customerInput = document.getElementById('customer-name')
const btnConfirm = document.getElementById('confirm')
const btnCancel = document.getElementById('cancel')

const modal = document.getElementById('modal')
const sinTicketBtn = document.getElementById('sinTicketBtn')
const conTicketBtn = document.getElementById('conTicketBtn')
const cancelarBtn = document.getElementById('cancelarBtn')

const formCustomized = document.getElementById('form-customized')
const btnCalc = document.getElementById('btn-calc')
const addCustomized = document.getElementById('add-customized')
const cancelCustomized = document.getElementById('cancel-customized')
const customizedTotal = document.getElementById('customized-total')

const ticketModal = document.getElementById('ticketModal')
const imprimirTicketBtn = document.getElementById('imprimirTicketBtn')
const cancelarImpresionBtn = document.getElementById('cancelarImpresionBtn')
const licenciaa = document.getElementById('licencia')
const impresora = document.getElementById('macInput')

const productsStorage = JSON.parse(localStorage.getItem('products'))

function showProducts() {
	productsStorage.forEach((prod) => {
		const fragment = document.createDocumentFragment()
		const { name, category, price, id } = prod
		const product = document.createElement('DIV')
		product.classList.add('product')
		product.dataset.name = name
		product.dataset.id = id
		product.dataset.price = price
		product.dataset.quantity = 1
		const productTitle = document.createElement('P')
		productTitle.classList.add('product__title')
		productTitle.textContent = name

		const productOptions = document.createElement('DIV')
		productOptions.classList.add('product__options')
		const productContainBtn = document.createElement('DIV')
		productContainBtn.classList.add('product__contain-btn')
		const btnRemove = document.createElement('A')
		btnRemove.classList.add('btn', 'product__btn', 'btn-remove')
		btnRemove.textContent = '-'
		btnRemove.addEventListener('click', removeProduct)

		const btnAdd = document.createElement('A')
		btnAdd.classList.add('btn', 'product__btn', 'btn-add')
		btnAdd.textContent = '+'

		btnAdd.addEventListener('click', addProduct)

		const productContainerQuantity = document.createElement('DIV')
		productContainerQuantity.classList.add('product__container-quantity')
		const productQuantity = document.createElement('SPAN')
		productQuantity.classList.add('product__quantity')
		productQuantity.setAttribute('id', id)

		const div = document.createElement('DIV')
		const productSymbol = document.createElement('SPAN')
		productSymbol.dataset.idsymbol = id
		productSymbol.classList.add('product__symbol')
		productSymbol.textContent = '$'
		const productPrice = document.createElement('SPAN')
		productPrice.classList.add('product__price')
		productPrice.dataset.productprice = id
		productPrice.textContent = price

		product.append(productTitle)
		productContainBtn.append(btnRemove, btnAdd)
		productOptions.append(productContainBtn)
		productContainerQuantity.append(productQuantity)
		div.append(productSymbol, productPrice)
		productContainerQuantity.append(div)
		productOptions.append(productContainerQuantity)
		product.append(productOptions)
		fragment.append(product)

		if (botanasContainer.dataset.category === category) {
			botanasContainer.append(fragment)
		}

		if (dessertsContainer.dataset.category === category) {
			dessertsContainer.append(fragment)
		}

		if (drinksContainer.dataset.category === category) {
			drinksContainer.append(fragment)
		}

		if (othersContainer.dataset.category === category) {
			othersContainer.append(fragment)
		}
	})
}

let products = []
let totalGlobal

const order = {
	date: '',
	customer: 'Anonimo',
	products: '',
	adicionalInfo: 'Sin detalles',
	total: '',
	receivedBill: '',
	moneyChange: '',
}

function resetOrder() {
	order.date = ''
	order.customer = 'Anonimo'
	order.products = ''
	order.adicionalInfo = 'Sin detalles'
	order.total = ''
	order.receivedBill = ''
	order.moneyChange = ''
}

function addProduct(e) {
	e.preventDefault()

	const product = e.target.closest('.product')
	readInfo(product)
	showPriceQuantity()
	createDataTable()
	totalPrice()
	disabledReceived()
	customerPay.value = ''
	moneyExchanges.textContent = ''
	disabledConfirmMoneyExchanges()
}

function readInfo(product) {
	const productInfo = {
		name: product.dataset.name,
		quantity: parseInt(product.dataset.quantity),
		price: Number(product.dataset.price),
		priceUnit: Number(product.dataset.price),
		id: parseInt(product.dataset.id),
	}

	const existingProduct = products.some((prod) => prod.id === productInfo.id)

	if (existingProduct) {
		const productos = products.map((prod) => {
			if (prod.id === productInfo.id) {
				prod.quantity++
				const priceUnit = productInfo.priceUnit
				const priceTotal = priceUnit * prod.quantity
				prod.price = priceTotal
				return prod
			} else {
				document.querySelector
				return prod
			}
		})
		products = [...productos]
	} else {
		products = [...products, productInfo]
	}
}

function removeProduct(e) {
	e.preventDefault()
	const product = e.target.closest('.product')
	const idProduct = parseInt(product.dataset.id)
	customerPay.value = ''
	moneyExchanges.textContent = ''

	products.forEach((prod) => {
		if (prod.id === idProduct) {
			if (product.quantity !== 0) {
				prod.quantity--
				const priceProduct = prod.price
				const priceUnit = prod.priceUnit
				prod.price = priceProduct - priceUnit
				showPriceQuantity()
				createDataTable()
				totalPrice()
				disabledReceived()
				disabledConfirmMoneyExchanges()

				if (prod.quantity === 0) {
					products = products.filter((prod) => prod.id !== idProduct)
					document.querySelector(`[id="${prod.id}"]`).textContent = ''
					document.querySelector(`[data-productprice="${prod.id}"]`).textContent = product.dataset.price

					document.querySelector(`[data-productprice="${prod.id}"]`).classList.remove('product-active')
					document.querySelector(`[data-idsymbol="${prod.id}"]`).classList.remove('product-active')

					createDataTable()
					totalPrice()
					disabledReceived()
					disabledConfirmMoneyExchanges()
				}
			}
		}
	})
}

function deleteProductOrder(e) {
	e.preventDefault()
	const nameProd =
		e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling
			.textContent

	Swal.fire({
		title: '¿Deseas eliminar este producto de la orden?',
		html: `<strong>${nameProd}</strong>`,
		icon: 'warning',
		showCancelButton: true,
		confirmButtonText: 'Quitar producto',
		cancelButtonText: 'Cancelar',
	}).then((result) => {
		if (result.isConfirmed) {
			const idProduct = parseInt(e.target.id)

			products.forEach((prod) => {
				if (prod.id === idProduct) {
					products = products.filter((prod) => prod.id !== idProduct)
					const element = document.querySelector(`[id="${prod.id}"]`)
					const priceElement = document.querySelector(`[data-productprice="${prod.id}"]`)
					const idSymbolElement = document.querySelector(`[data-idsymbol="${prod.id}"]`)

					if (!element || !priceElement || !idSymbolElement) {
						// Omitir el elemento nulo y continuar con la siguiente iteración
						createDataTable()
						totalPrice()
						disabledReceived()
						customerPay.value = ''
						moneyExchanges.textContent = ''
						disabledConfirmMoneyExchanges()
						return
					}

					element.textContent = ''
					priceElement.textContent = prod.priceUnit
					priceElement.classList.remove('product-active')
					idSymbolElement.classList.remove('product-active')

					createDataTable()
					totalPrice()
					disabledReceived()
					customerPay.value = ''
					moneyExchanges.textContent = ''
					disabledConfirmMoneyExchanges()
				}
			})
		}
	})
}

function totalPrice() {
	const total = products.reduce((total, prodPrice) => total + prodPrice.price, 0)
	totalOrder.textContent = total
	totalGlobal = total
}

function showPriceQuantity() {
	products.forEach((prod) => {
		const quantityElement = document.querySelector(`[id="${prod.id}"]`)
		const priceElement = document.querySelector(`[data-productprice="${prod.id}"]`)
		const idSymbolElement = document.querySelector(`[data-idsymbol="${prod.id}"]`)
		//Validación para cuando se agrega prod personalizado
		if (quantityElement && priceElement && idSymbolElement) {
			quantityElement.textContent = prod.quantity
			priceElement.textContent = prod.price
			priceElement.classList.add('product-active')
			idSymbolElement.classList.add('product-active')
		}
	})
}

function createDataTable() {
	const fragment = document.createDocumentFragment()
	products.forEach((prod) => {
		const { name, quantity, price, id, priceUnit } = prod
		const tr = document.createElement('TR')
		const tdName = document.createElement('TD')
		const tdQuantity = document.createElement('TD')
		const tdPrice = document.createElement('TD')
		const tdPriceUnit = document.createElement('TD')
		const tdOptions = document.createElement('TD')
		const iconDelete = document.createElement('DIV')

		tdName.textContent = name
		tdQuantity.textContent = quantity
		tdPriceUnit.textContent = `$${priceUnit}`
		tdPrice.textContent = `$${price}`

		iconDelete.classList.add('delete-prod')
		iconDelete.setAttribute('title', 'Elimina el producto de la orden')
		iconDelete.setAttribute('id', id)

		iconDelete.addEventListener('click', deleteProductOrder)
		tdOptions.append(iconDelete)
		tr.append(tdName, tdPriceUnit, tdQuantity, tdPrice, tdOptions)
		fragment.append(tr)
	})
	productsTableContainer.textContent = ''
	productsTableContainer.append(fragment)
}

export function customerPaymentInput() {
	customerPay.addEventListener('blur', (e) => {
		e.preventDefault()

		const customerPayment = Number(e.target.value)
		const moneyEx = customerPayment - totalGlobal

		if (customerPayment < totalGlobal) {
			showAlert('El pago no puede ser menor a la venta.', 'error-received')
			btnConfirm.set
			order.receivedBill = ''
			order.moneyChange = ''
			moneyExchanges.textContent = ''
		} else {
			moneyExchanges.textContent = moneyEx
			order.receivedBill = customerPayment
			order.moneyChange = moneyEx
			disabledConfirm()
		}

		if (e.target.value === '') {
			btnConfirm.setAttribute('disabled', true)
		}
	})

	customerPay.addEventListener('input', (e) => {
		e.preventDefault()
		btnConfirm.setAttribute('disabled', true)
		moneyExchanges.textContent = ''
	})
}

export function eventsListeners() {
	arrowBotanas.addEventListener('click', (e) => {
		e.target.classList.toggle('active')
		botanasContainer.classList.toggle('desplegable-container-active')
	})
	arrowDesserts.addEventListener('click', (e) => {
		e.target.classList.toggle('active')
		dessertsContainer.classList.toggle('desplegable-container-active')
	})
	arrowDrinks.addEventListener('click', (e) => {
		e.target.classList.toggle('active')
		drinksContainer.classList.toggle('desplegable-container-active')
	})
	arrowOthers.addEventListener('click', (e) => {
		e.target.classList.toggle('active')
		othersContainer.classList.toggle('desplegable-container-active')
	})
	arrowCustomized.addEventListener('click', (e) => {
		e.target.classList.toggle('active')
		customizedContainer.classList.toggle('desplegable-container-active')
	})
}

export function showProductsHtml() {
	if (JSON.parse(localStorage.getItem('products'))) {
		showProducts()
	}
}

//TODO Created indexed Db

const indexedDB = window.indexedDB

export const request = indexedDB.open('customerOrders', 1)

let db
request.onsuccess = () => {
	db = request.result
}

request.onupgradeneeded = () => {
	db = request.result

	const objectStore = db.createObjectStore('orders', {
		autoIncrement: true,
	})

	// Definir los índices
	objectStore.createIndex('date', 'date', { unique: false })
	objectStore.createIndex('customer', 'customer', { unique: false })
}

request.onerror = (err) => {
	showAlert(`Ocurrio un error en la base de datos ${err}`, 'error-fixed')
}

function addOrder(order) {
	const transaction = db.transaction(['orders'], 'readwrite')
	const objectStore = transaction.objectStore('orders')
	const request = objectStore.add(order)

	request.onsuccess = () => {
		showAlert('Orden completada con éxito', 'exit')
		volverNormalidad()
		closeModal()
	}
}

//TODO -----------------------------------------

export function listenDetailsCustomer() {
	customerInput.addEventListener('input', (e) => {
		e.preventDefault()
		const nombreCliente = e.target.value.trim()

		if (nombreCliente === '') {
			order.customer = 'Anonimo'
		} else {
			order.customer = nombreCliente
		}
	})

	orderDetails.addEventListener('input', (e) => {
		e.preventDefault()

		const details = e.target.value.trim()
		if (details === '') {
			order.adicionalInfo = 'Sin detalles'
		} else {
			order.adicionalInfo = details
		}
	})
}

function disabledConfirm() {
	if (order.receivedBill === '') {
		btnConfirm.setAttribute('disabled', true)
	}

	if (order.receivedBill !== '') {
		btnConfirm.removeAttribute('disabled')
	}
}

function disabledConfirmMoneyExchanges() {
	if (moneyExchanges.textContent === '') {
		btnConfirm.setAttribute('disabled', true)
	}

	if (moneyExchanges.textContent !== '') {
		btnConfirm.removeAttribute('disabled')
	}
}

function disabledReceived() {
	if (products) {
		customerPay.removeAttribute('disabled')
	}

	if (products.length === 0) {
		customerPay.setAttribute('disabled', true)
	}
}

function showAlert(msg, type) {
	const alert = document.createElement('DIV')
	alert.textContent = msg
	if (type === 'error-fixed') {
		body.append(alert)
		alert.classList.add('error-product')
		setTimeout(() => {
			alert.remove()
		}, 5000)
	}

	if (type === 'error-customized') {
		alert.classList.add('error-product')
		customizedContainer.prepend(alert)
		setTimeout(() => {
			alert.remove()
		}, 1300)
	}

	if (type === 'exit-customized') {
		alert.classList.add('order-exit')
		customizedContainer.prepend(alert)
		setTimeout(() => {
			alert.remove()
		}, 1300)
	}

	if (type === 'error-received') {
		alert.classList.add('error')
		customerPay.closest('.received-bill-container').after(alert)
		setTimeout(() => {
			alert.remove()
		}, 3000)
	}

	if (type === 'exit') {
		alert.classList
		alert.classList.add('order-exit')
		body.append(alert)
		setTimeout(() => {
			alert.remove()
		}, 1300)
	}
}

function volverNormalidad() {
	resetOrder()
	products = []
	productsTableContainer.textContent = ''
	orderDetails.value = ''
	customerInput.value = ''
	totalOrder.textContent = '0'
	customerPay.value = ''
	moneyExchanges.textContent = ''
	disabledReceived()
	disabledConfirm()
	disabledConfirmMoneyExchanges()
	productsStorage.forEach((prod) => {
		document.querySelector(`[id="${prod.id}"]`).textContent = ''
		document.querySelector(`[data-productprice="${prod.id}"]`).textContent = prod.price
		document.querySelector(`[data-productprice="${prod.id}"]`).classList.remove('product-active')
		document.querySelector(`[data-idsymbol="${prod.id}"]`).classList.remove('product-active')
	})
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	})
}

function closeModal() {
	modal.style.display = 'none'
	ticketModal.style.display = 'none'
	macInput.value = ''
}

// const obj = document.getElementById('obj')
// obj.addEventListener('click', () => {
// 	console.log(products)
// 	console.log(order)
// })

const URLPlugin = 'http://localhost:8000'
if (location.pathname.endsWith('/order.html')) {
	sinTicketBtn.addEventListener('click', function () {
		// Acciones para orden sin ticket
		fecha
		order.date = `${dia} de ${mes} de ${anio} ${horas}:${minutos}`
		order.products = products
		order.total = totalGlobal
		order.id = Date.now()
		addOrder(order)
	})

	cancelarBtn.addEventListener('click', function () {
		closeModal()
	})

	conTicketBtn.addEventListener('click', function () {
		// Acciones para orden con ticket
		ticketModal.style.display = 'block'
		modal.style.display = 'none'
	})

	imprimirTicketBtn.addEventListener('click', function () {
		const direccionMacDeLaImpresora = impresora.value
		const licencia = licenciaa.value
		if (!direccionMacDeLaImpresora) {
			return alert('Por favor escribe la MAC de la impresora')
		}

		fecha
		order.date = `${dia} de ${mes} de ${anio} ${horas}:${minutos}`
		order.products = products
		order.total = totalGlobal
		imprimirTicket(direccionMacDeLaImpresora, licencia)
		addOrder(order)
		closeModal()
	})

	cancelarImpresionBtn.addEventListener('click', function () {
		closeModal()
	})

	// formm customzied

	btnCalc.addEventListener('click', (e) => {
		e.preventDefault()
		const productNameInput = document.getElementById('product-name')
		const productName = productNameInput.value.trim()
		const prodPriceInput = document.getElementById('product-price')
		const productPrice = Number(prodPriceInput.value)
		const quantProduct = document.getElementById('quant-prod')
		const quantityValue = parseInt(quantProduct.value)

		const moneyRegex = /^(?!0[0-9])[0-9]*(\.[0-9]+)?$/

		if (productName === '' || productPrice == '') {
			showAlert('Ambos campos son obligatorios', 'error-customized')
			return
		}
		if (isNaN(productPrice) || !moneyRegex.test(productPrice) || productPrice <= 0.99) {
			showAlert('Precio incorrecto', 'error-customized')
			return
		}

		quantProduct.addEventListener('change', () => {
			addCustomized.setAttribute('disabled', 'true')
			customizedTotal.textContent = ''
		})

		prodPriceInput.addEventListener('input', () => {
			addCustomized.setAttribute('disabled', 'true')
			customizedTotal.textContent = ''
		})

		productNameInput.addEventListener('input', () => {
			addCustomized.setAttribute('disabled', 'true')
		})

		const total = productPrice * quantityValue
		customizedTotal.textContent = total
		addCustomized.removeAttribute('disabled')

		productsStorage.forEach((prod) => {
			if (prod.name === productName) {
				showAlert('Nombre de producto existente en el sistema', 'error-customized')
				addCustomized.setAttribute('disabled', 'true')
			}
		})
	})

	formCustomized.addEventListener('submit', (e) => {
		e.preventDefault()

		const productName = formCustomized.querySelector('#product-name').value
		const productPrice = formCustomized.querySelector('#product-price').value
		const total = formCustomized.querySelector('#customized-total').textContent
		const quantityValue = formCustomized.querySelector('#quant-prod').value

		const productCustomized = {
			name: productName,
			quantity: parseInt(quantityValue),
			price: Number(total),
			priceUnit: Number(productPrice),
			id: Date.now(),
		}

		products.push(productCustomized)
		createDataTable()
		totalPrice()
		customizedTotal.textContent = ''
		formCustomized.reset()
		showAlert('Producto agregado', 'exit-customized')
		addCustomized.setAttribute('disabled', 'true')
		customerPay.removeAttribute('disabled')
		customerPay.value = ''
		moneyExchanges.textContent = ''
		btnConfirm.setAttribute('disabled', 'true')
	})

	cancelCustomized.addEventListener('click', (e) => {
		e.preventDefault()
		addCustomized.setAttribute('disabled', 'true')
		customizedTotal.textContent = ''
		formCustomized.reset()
	})
}

const imprimirTicket = async (macImpresora, licencia) => {
	const conector = new ConectorEscposAndroid(licencia, URLPlugin)

	conector
		.Iniciar()
		.EstablecerEnfatizado(true)
		.EstablecerTamañoFuente(2, 2)
		.EstablecerAlineacion(ConectorEscposAndroid.ALINEACION_CENTRO)
		.EscribirTexto('LA ESQUITERIA\n')
		.EstablecerTamañoFuente(1, 1)
		.EstablecerEnfatizado(false)

	conector.EscribirTexto(order.date + '\n').Feed(1)

	if (order.customer !== 'Anonimo') {
		conector.EscribirTexto('Cliente: ' + order.customer.toUpperCase() + '\n').Feed(1)
	}

	const maxNombreLength = order.products.reduce((max, producto) => {
		return producto.name.length > max ? producto.name.length : max
	}, 0)

	const maxPuLength = order.products.reduce((max, producto) => {
		return producto.priceUnit.toString().length > max ? producto.priceUnit.toString().length : max
	}, 0)

	const maxCanLength = order.products.reduce((max, producto) => {
		return producto.quantity.toString().length > max ? producto.quantity.toString().length : max
	}, 0)

	const maxPtLength = order.products.reduce((max, producto) => {
		return producto.price.toString().length > max ? producto.price.toString().length : max
	}, 0)

	const encabezado =
		'PROD'.padEnd(maxNombreLength, ' ') +
		'  P.U'.padEnd(maxPuLength, ' ') +
		'  CAN'.padEnd(maxCanLength, ' ') +
		' TOTAL ACUM'.padEnd(maxPtLength, ' ')
	conector.EstablecerAlineacion(ConectorEscposAndroid.ALINEACION_IZQUIERDA).EscribirTexto(encabezado + '\n')

	order.products.forEach((producto) => {
		const nombreProducto = producto.name.padEnd(maxNombreLength, ' ')
		const pu = producto.priceUnit.toString().padEnd(maxPuLength, ' ')
		const can = producto.quantity.toString().padEnd(maxCanLength, ' ')
		const pt = producto.price.toString().padEnd(maxPtLength, ' ')
		const lineaProducto = `${nombreProducto}  $${pu}   ${can}   $${pt}`
		conector.EscribirTexto(lineaProducto + '\n')
	})

	const formattedTotal = order.total.toLocaleString(undefined, {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})

	const formattedReceived = order.receivedBill.toLocaleString(undefined, {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})

	const formattedMoneyChange = order.moneyChange.toLocaleString(undefined, {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})

	conector
		.Feed(1)
		.EstablecerAlineacion(ConectorEscposAndroid.ALINEACION_DERECHA)
		.EscribirTexto('Total: ' + `$${formattedTotal}` + '\n')
		.EscribirTexto('P.R: ' + `$${formattedReceived}` + '\n')
		.EscribirTexto('Cambio: ' + `$${formattedMoneyChange}` + '\n')
		.Feed(1)

	if (order.adicionalInfo !== 'Sin detalles') {
		conector
			.EstablecerAlineacion(ConectorEscposAndroid.ALINEACION_CENTRO)
			.EscribirTexto('Detalles de la orden:' + '\n')
			.EstablecerAlineacion(ConectorEscposAndroid.ALINEACION_IZQUIERDA)
			.EscribirTexto(order.adicionalInfo)
	}

	conector
		.Feed(1)
		.EstablecerAlineacion(ConectorEscposAndroid.ALINEACION_CENTRO)
		.EscribirTexto('Gracias por su preferencia!')
		.Feed(2)
		.Corte(1)
		.Pulso(48, 60, 120)

	try {
		const respuesta = await conector.imprimirEn(macImpresora)
		if (respuesta === true) {
			showAlert('Ticket exitoso', 'exit')
		} else {
			alert('Error: ' + respuesta)
		}
	} catch (e) {
		alert('Error imprimiendo: ' + e.message)
	}
}

function validateOrder(e) {
	e.preventDefault()
	if (products) {
		modal.style.display = 'block'
		impresora.value = '66:32:ED:C8:E2:59' //Se asigna la mac al input al terminar el ticket para otra venta
	}
}

export function createOrder() {
	btnConfirm.addEventListener('click', validateOrder)

	btnCancel.addEventListener('click', () => {
		if (!products.length) {
			showAlert('"No hay ninguna orden disponible para cancelar en este momento."', 'error-fixed')
			return
		}

		Swal.fire({
			title: '"Para eliminar la orden, por favor confirma tu elección."',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Eliminar orden',
			cancelButtonText: 'Cancelar',
		}).then((result) => {
			if (result.isConfirmed) {
				volverNormalidad()
				showAlert('La orden ha sido eliminada exitosamente.', 'exit')
			}
		})
	})
}
