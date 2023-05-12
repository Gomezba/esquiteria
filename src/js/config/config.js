const formInput = document.querySelectorAll('.form__input-config')
const formConfig = document.getElementById('form-config')
const btnSaveConfig = document.getElementById('btn-save-config')
const btnEditConfig = document.querySelectorAll('.btn-edit-config')

const body = document.querySelector('.body')

// Categorys
const botanas = document.getElementById('botanas-category')
const postres = document.getElementById('desserts-category')
const bebidas = document.getElementById('drinks-category')

// new form product
const formProduct = document.getElementById('form-product-new')
const newProductBtn = document.getElementById('new-product')
const cancelProductBtn = document.getElementById('cancel-product')

export function labelColor() {
	formInput.forEach((input) => {
		let label
		input.addEventListener('focus', () => {
			label = input.parentElement.previousElementSibling
			label.classList.add('label-active')
		})

		input.addEventListener('blur', () => {
			label.classList.remove('label-active')
		})
	})
}

class Product {
	constructor() {
		this.products = JSON.parse(localStorage.getItem('products')) ?? []
	}

	addProduct() {}

	editProduct(prod) {
		const { id, price } = prod
		this.products = this.products.map((product) => (product.id === id ? (product.price = price) : product))
	}
}

class Ui {
	showAlert(msg) {
		const alert = document.createElement('DIV')
		alert.textContent = msg
		alert.classList.add('error')

		body.append(alert)
		setTimeout(() => {
			alert.remove()
		}, 2000)
	}
}

const productsInstance = new Product()
const ui = new Ui()

console.log(productsInstance)
const products = [
	{
		name: 'esquite',
		category: 'botanas',
		price: 25,
		id: Date.now(),
	},
	{
		name: 'doriesquite',
		category: 'botanas',
		price: 45,
		id: Date.now(),
	},
	{
		name: 'doriloco',
		category: 'botanas',
		price: 35,
		id: Date.now(),
	},
	{
		name: 'tostiloco',
		category: 'botanas',
		price: 35,
		id: Date.now(),
	},
	{
		name: 'fresas',
		category: 'postre',
		price: 45,
		id: Date.now(),
	},
	{
		name: 'gelatina',
		category: 'postre',
		price: 45,
		id: Date.now(),
	},
	{
		name: 'ensalada',
		category: 'postre',
		price: 45,
		id: Date.now(),
	},
	{
		name: 'boing',
		category: 'bebidas',
		price: 35,
		id: Date.now(),
	},
	{
		name: 'aguaFrescaLitro',
		category: 'bebidas',
		price: 25,
		id: Date.now(),
	},
	{
		name: 'aguaFrescaMedio',
		category: 'bebidas',
		price: 15,
		id: Date.now(),
	},
	{
		name: 'cocaCola',
		category: 'bebidas',
		price: 22,
		id: Date.now(),
	},
	{
		name: 'aguaNaturalMedio',
		category: 'bebidas',
		price: 10,
		id: Date.now(),
	},
	{
		name: 'piñada',
		category: 'bebidas',
		price: 35,
		id: Date.now(),
	},
	{
		name: 'naranjada',
		category: 'bebidas',
		price: 35,
		id: Date.now(),
	},
	{
		name: 'limonada',
		category: 'bebidas',
		price: 35,
		id: Date.now(),
	},
]
function addLocal() {
	localStorage.setItem('products', JSON.stringify(products))
}
addLocal()

export function showProducts() {
	const info = productsInstance.products.reduce((acc, { name, price }) => {
		acc[name] = price

		return acc
	}, {})

	console.log(info)

	formInput.forEach((input) => {
		const name = input.getAttribute('name')
		const price = info[name]

		if (price) {
			input.value = price
			input.dataset.id = info.id
		}
	})
}

function validateProduct(e) {
	e.preventDefault()
	const productName = document.getElementById('product-name').value.trim()
	const productPrice = Number(document.getElementById('product-price').value.trim())
	const selectCategory = document.getElementById('select-category')

	// 	botanas-category
	// postres-category
	// bebidas-category
	if (productName === '' || productPrice === '') {
		ui.showAlert('Todos los campos son obligatorios')
		return
	}

	if (isNaN(productPrice) || productPrice <= 0) {
		ui.showAlert('Ingresa una cantidad correcta')
		return
	}

	formProduct.reset()

	Swal.fire({
		icon: 'success',
		title: '¡Producto agregado!',
		showConfirmButton: false,
		timer: 1500,
	})
	formProduct.classList.remove('is-active')
}

export function newProduct() {
	function warning() {
		Swal.fire({
			title: 'Advertencia!',
			html:
				'Al momento de agregar un nuevo producto se eliminaran las ordenes registradas así como el historial de ventas, <strong style="color:#d1831d">ASEGURATE DE IMPRIMIR LA INFORMACIÓN ANTES DE AGREGAR UN NUEVO PRODUCTO.</strong>',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Sí, continuar',
			cancelButtonText: 'Cancelar',
		}).then((result) => {
			if (result.isConfirmed) {
				formProduct.classList.add('is-active')
			}
		})
	}

	formProduct.addEventListener('submit', validateProduct)

	cancelProductBtn.addEventListener('click', () => {
		formProduct.classList.remove('is-active')
	})

	newProductBtn.addEventListener('click', warning)
}

function validateForm(e) {
	e.preventDefault()

	formInput.forEach((prod) => {
		if (prod.value === '' || prod.value <= 0 || isNaN(prod)) {
			ui.showAlert('Precio incorrecto')

			return
		}

		productsInstance.editProduct()

		Swal.fire({
			icon: 'success',
			title: '¡Producto actualizado!',
			showConfirmButton: false,
			timer: 1500,
		})
	})
}

export function validateConfig() {
	formConfig.addEventListener('submit', validateForm)
}
