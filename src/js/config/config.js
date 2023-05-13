const formInputProduct = document.querySelectorAll('.form__input-config-product')
const formInputMain = document.querySelectorAll('.form__input-config-main')
const formConfig = document.getElementById('form-config')
const btnSaveConfig = document.getElementById('btn-save-config')
const btnEditConfig = document.querySelectorAll('.btn-edit-config')
const btnCancelConfig = document.querySelectorAll('.btn-cancel-config')

const body = document.querySelector('.body')

// Categorys
const botanas = document.getElementById('botanas-category')
const postres = document.getElementById('desserts-category')
const bebidas = document.getElementById('drinks-category')

// new form product
const formProduct = document.getElementById('form-product-new')
const newProductBtn = document.getElementById('new-product')
const cancelProductBtn = document.getElementById('cancel-product')

// Input focus y label
export function labelColor() {
	formInputMain.forEach((input) => {
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

	editProduct(id, price) {
		// const { id, price } = prod
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
		id: 11,
	},
	{
		name: 'doriesquite',
		category: 'botanas',
		price: 45,
		id: 22,
	},
	{
		name: 'doriloco',
		category: 'botanas',
		price: 35,
		id: 33,
	},
	{
		name: 'tostiloco',
		category: 'botanas',
		price: 35,
		id: 44,
	},
	{
		name: 'fresas',
		category: 'postre',
		price: 45,
		id: 55,
	},
	{
		name: 'gelatina',
		category: 'postre',
		price: 45,
		id: 66,
	},
	{
		name: 'ensalada',
		category: 'postre',
		price: 45,
		id: 77,
	},
	{
		name: 'boing',
		category: 'bebidas',
		price: 35,
		id: 88,
	},
	{
		name: 'aguaFrescaLitro',
		category: 'bebidas',
		price: 25,
		id: 99,
	},
	{
		name: 'aguaFrescaMedio',
		category: 'bebidas',
		price: 15,
		id: 10,
	},
	{
		name: 'cocaCola',
		category: 'bebidas',
		price: 22,
		id: 1111,
	},
	{
		name: 'aguaNaturalMedio',
		category: 'bebidas',
		price: 10,
		id: 1212,
	},
	{
		name: 'piñada',
		category: 'bebidas',
		price: 35,
		id: 1313,
	},
	{
		name: 'naranjada',
		category: 'bebidas',
		price: 35,
		id: 1414,
	},
	{
		name: 'limonada',
		category: 'bebidas',
		price: 35,
		id: 1515,
	},
]
function addLocal() {
	localStorage.setItem('products', JSON.stringify(products))
}
// addLocal()

// ---------------------------------------------------------
// Funcionalidad de desabilitar
function btnSaveConfigDisabled() {
	const input = Array.from(formInputMain).find((inp) => !inp.hasAttribute('disabled'))

	if (input) {
		btnSaveConfig.removeAttribute('disabled')
	} else {
		btnSaveConfig.setAttribute('disabled', true)
	}
}
export function showProducts() {
	productsInstance.products.forEach((product) => {
		const { name, price, id } = product
		formInputMain.forEach((input) => {
			if (input.name === name) {
				input.value = price
				input.dataset.id = id
			}
		})
	})
}

btnEditConfig.forEach((btn) => {
	btn.addEventListener('click', () => {
		btn.setAttribute('disabled', true)
		const input = btn.previousElementSibling
		input.removeAttribute('disabled')
		input.focus()
		const cancel = btn.nextElementSibling
		cancel.removeAttribute('disabled')
		btnSaveConfigDisabled()
	})
})

btnCancelConfig.forEach((btn) => {
	btn.addEventListener('click', () => {
		const edit = btn.previousElementSibling
		const input = btn.previousElementSibling.previousElementSibling
		btn.setAttribute('disabled', true)
		edit.removeAttribute('disabled')
		input.setAttribute('disabled', true)
		btnSaveConfigDisabled()
	})
})
// --------------------------------------------

// TODO formulario principal
function validateForm(e) {
	e.preventDefault()

	let allInputsValid = true
	const moneyRegex = /^(?!0[0-9])[0-9]*(\.[0-9]+)?$/

	formInputMain.forEach((input) => {
		Number(input.value)
		if (input.value.trim() === '') {
			allInputsValid = false
			// alert(`El valor '${input.value}' en '${input.id}' no es válido.`)
			ui.showAlert('Todos los campos son obligatorios')
			return
		}

		if (isNaN(Number(input.value)) || !moneyRegex.test(input.value) || input.value <= 0.99) {
			allInputsValid = false
			ui.showAlert('Precio incorrecto')
			return
		}

		if (allInputsValid) {
			formInputMain.forEach((inp) => {
				inp.addEventListener('input', (e) => {
					const idProd = e.target.dataset.id
					const priceProd = e.target.value

					console.log(idProd)
					console.log(priceProd)

					productsInstance.editProduct(idProd, priceProd)
				})
			})
			// const idProd = e.target.dataset.id
			// const priceProd = e.target.value

			// console.log(idProd)
			// console.log(priceProd)

			// console.log(e.target)

			// productsInstance.editProduct(productId, productToUpdate)

			// Swal.fire({
			// 	icon: 'success',
			// 	title: 'Producto actualizado',
			// 	showConfirmButton: false,
			// 	timer: 1500,
			// })
			// setTimeout(() => {
			// 	location.reload()
			// }, 1501)
		}
	})
}

export function validateConfig() {
	formConfig.addEventListener('submit', validateForm)
}

//TODO Formulario de nuevos productos

function labelColorProduct() {
	formInputProduct.forEach((input) => {
		let label
		input.addEventListener('focus', () => {
			label = input.previousElementSibling
			label.classList.add('label-active')
		})

		input.addEventListener('blur', () => {
			label.classList.remove('label-active')
		})
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
		ui.showAlert('Precio incorrecto')
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
				'Al momento de agregar un nuevo producto se eliminaran las ordenes registradas así como el historial de ventas, <strong style="color:#d1831d">ASEGURATE DE IMPRIMIR LA INFORMACIÓN ANTES DE AGREGAR UN PRODUCTO NUEVO.</strong>',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Sí, continuar',
			cancelButtonText: 'Cancelar',
		}).then((result) => {
			if (result.isConfirmed) {
				formProduct.classList.add('is-active')
				labelColorProduct()
			}
		})
	}

	formProduct.addEventListener('submit', validateProduct)

	cancelProductBtn.addEventListener('click', () => {
		formProduct.classList.remove('is-active')
	})

	newProductBtn.addEventListener('click', warning)
}
