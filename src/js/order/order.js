const arrowBotanas = document.querySelector('[data-arrow="botanas"]')
const arrowDesserts = document.querySelector('[data-arrow="desserts"]')
const arrowDrinks = document.querySelector('[data-arrow="drinks"]')

const botanasContainer = document.getElementById('botanas-container')
const dessertsContainer = document.getElementById('desserts-container')
const drinksContainer = document.getElementById('drinks-container')

const productsTableContainer = document.getElementById('products-table')
const totalOrder = document.getElementById('total-order')
const customerPay = document.getElementById('money')
const moneyExchanges = document.getElementById('money-exchanges')

function updatedArrow() {
	if (botanasContainer.classList.contains('desplegable-container-active')) {
		arrowBotanas.style.setProperty('background-image', 'url(/src/assets/icons/arrow-up.svg')
	} else {
		arrowBotanas.style.setProperty('background-image', 'url(/src/assets/icons/arrow-down.svg')
	}

	if (dessertsContainer.classList.contains('desplegable-container-active')) {
		arrowDesserts.style.setProperty('background-image', 'url(/src/assets/icons/arrow-up.svg')
	} else {
		arrowDesserts.style.setProperty('background-image', 'url(/src/assets/icons/arrow-down.svg')
	}

	if (drinksContainer.classList.contains('desplegable-container-active')) {
		arrowDrinks.style.setProperty('background-image', 'url(/src/assets/icons/arrow-up.svg')
	} else {
		arrowDrinks.style.setProperty('background-image', 'url(/src/assets/icons/arrow-down.svg')
	}
}

// const obj = document.getElementById('obj')
// obj.addEventListener('click', () => {
// 	console.log(products)
// })

function showProducts() {
	const products = JSON.parse(localStorage.getItem('products'))
	products.forEach((prod) => {
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
		btnRemove.addEventListener('click', removeProduct)

		btnRemove.classList.add('btn', 'product__btn', 'btn-remove')
		const btnAdd = document.createElement('A')
		btnAdd.classList.add('btn', 'product__btn', 'btn-add')

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
	})
}

let products = []
let totalGlobal

function addProduct(e) {
	e.preventDefault()

	const product = e.target.closest('.product')
	readInfo(product)
	showPriceQuantity()
	createDataTable()
	totalPrice()
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

				if (prod.quantity === 0) {
					products = products.filter((prod) => prod.id !== idProduct)
					document.querySelector(`[id="${prod.id}"]`).textContent = ''
					document.querySelector(`[data-productprice="${prod.id}"]`).textContent = product.dataset.price

					document.querySelector(`[data-productprice="${prod.id}"]`).classList.remove('product-active')
					document.querySelector(`[data-idsymbol="${prod.id}"]`).classList.remove('product-active')

					createDataTable()
					totalPrice()
				}
			}
		}
	})
}

function deleteProductOrder(e) {
	e.preventDefault()

	const idProduct = parseInt(e.target.id)

	products.forEach((prod) => {
		if (prod.id === idProduct) {
			products = products.filter((prod) => prod.id !== idProduct)
			document.querySelector(`[id="${prod.id}"]`).textContent = ''
			document.querySelector(`[data-productprice="${prod.id}"]`).textContent = prod.priceUnit
			document.querySelector(`[data-productprice="${prod.id}"]`).classList.remove('product-active')
			document.querySelector(`[data-idsymbol="${prod.id}"]`).classList.remove('product-active')

			createDataTable()
			totalPrice()
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
		document.querySelector(`[id="${prod.id}"]`).textContent = prod.quantity
		document.querySelector(`[data-productprice="${prod.id}"]`).textContent = prod.price
		document.querySelector(`[data-productprice="${prod.id}"]`).classList.add('product-active')
		document.querySelector(`[data-idsymbol="${prod.id}"]`).classList.add('product-active')
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
		const iconDelete = document.createElement('IMG')

		tdName.textContent = name
		tdQuantity.textContent = quantity
		tdPriceUnit.textContent = `$${priceUnit}`
		tdPrice.textContent = `$${price}`

		iconDelete.setAttribute('src', '/src/assets/icons/delete-forever.svg')
		iconDelete.setAttribute('alt', 'Icono de eliminacion de producto')
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
		moneyExchanges.textContent = moneyEx
	})
}

export function eventsListeners() {
	arrowBotanas.addEventListener('click', () => {
		botanasContainer.classList.toggle('desplegable-container-active')
		updatedArrow()
	})
	arrowDesserts.addEventListener('click', () => {
		dessertsContainer.classList.toggle('desplegable-container-active')
		updatedArrow()
	})
	arrowDrinks.addEventListener('click', () => {
		drinksContainer.classList.toggle('desplegable-container-active')
		updatedArrow()
	})
}

export function showProductsHtml() {
	if (JSON.parse(localStorage.getItem('products'))) {
		showProducts()
		updatedArrow()
	}

	addEventListener('DOMContentLoaded', updatedArrow())
}

/*
puedo tener un objeto que tenga la siguiente estructura

const orden ={
	fecha: '19/05/2023',
	cliente: 'anonimo',
	productos:[
		{
		   name: 'doriesquite',
		   category: 'botanas',
		   quantity_: '2'
		   price: 50,
		   priceUnit: 25,
               id: 456456		
		}
	],
	detalles: 'esquites sin mayones',
	total: 50,
	recibo: 100
	cambio: 50,


	
	
	
}
*/
