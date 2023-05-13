const formInputProduct = document.querySelectorAll('.form__input-config-product')
const formInputMain = document.querySelectorAll('.form__input-config-main')
const formConfig = document.getElementById('form-config')
const btnSaveConfig = document.getElementById('btn-save-config')
const btnEditConfig = document.querySelectorAll('.btn-edit-config')
const btnCancelConfig = document.querySelectorAll('.btn-cancel-config')
const priceContent = document.getElementById('readPrices')

// Categorys
const botanas = document.getElementById('botanas-category')
const postres = document.getElementById('desserts-category')
const bebidas = document.getElementById('drinks-category')

// new form product
const formProduct = document.getElementById('form-product-new')
const newProductBtn = document.getElementById('new-product')
const cancelProductBtn = document.getElementById('cancel-product')
const body = document.getElementById('body')

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
}

class Ui {
	showAlert(msg, id, formError) {
		const alert = document.createElement('DIV')
		alert.textContent = msg
		const alertExist = document.querySelector('.error')
		if (alertExist) {
			alertExist.remove(alertExist)
		}

		if (formError === 'config') {
			const formInputOptions = document.querySelectorAll('.form__input-options')

			alert.classList.add('error')

			formInputOptions.forEach((input) => {
				if (input.dataset.id == id) {
					input.after(alert)
					setTimeout(() => {
						alert.remove()
					}, 2000)
				}
			})
		}

		if (formError === 'product') {
			alert.classList.add('error-product')
			body.append(alert)
			setTimeout(() => {
				alert.remove()
			}, 2000)
		}
	}
}

const productsInstance = new Product()
const ui = new Ui()

console.log(productsInstance.products)
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

// ---------------------------------------------------------

export function readingObject() {
	priceContent.addEventListener('click', (e) => {
		e.preventDefault()
		if (priceContent.dataset.type === 'loading') {
			location.reload()
			addLocal()
		}

		console.log(productsInstance.products)
	})
}

export function showProducts() {
	productsInstance.products.forEach((product) => {
		const { name, category, price, id } = product
		formInputMain.forEach((input) => {
			if (input.name === name) {
				const btnCancel = input.nextElementSibling.nextElementSibling
				input.dataset.category = category
				input.dataset.name = name
				input.value = price
				input.dataset.id = id
				const formInputOptions = input.closest('.form__input-options')
				formInputOptions.dataset.id = id
				btnCancel.dataset.id = id
			}
		})
	})
}

btnEditConfig.forEach((btn) => {
	btn.addEventListener('click', () => {
		btn.setAttribute('disabled', true)
		const currency = btn.previousElementSibling.previousSibling.previousSibling
		const input = btn.previousElementSibling
		Number(input.value)
		input.removeAttribute('disabled')
		input.focus()
		const cancel = btn.nextElementSibling
		cancel.removeAttribute('disabled')
		currency.classList.add('currency-black')

		input.addEventListener('input', () => {
			const moneyRegex = /^(?!0[0-9])[0-9]*(\.[0-9]+)?$/
			const id = input.dataset.id
			Number(input.value)
			let allInputsValid = true
			if (input.value.trim() === '') {
				ui.showAlert('Campo obligatorio', id, 'config')
				btnSaveConfig.setAttribute('disabled', true)
				allInputsValid = false
			} else if (isNaN(Number(input.value)) || !moneyRegex.test(input.value) || input.value <= 0.99) {
				ui.showAlert('Precio incorrecto', id, 'config')
				btnSaveConfig.setAttribute('disabled', true)
				allInputsValid = false
			}

			if (allInputsValid) {
				btnSaveConfig.removeAttribute('disabled')
			}
		})
	})
})

btnCancelConfig.forEach((btn) => {
	btn.addEventListener('click', () => {
		const currency = btn.previousElementSibling.previousSibling.previousSibling.previousSibling.previousSibling
		const edit = btn.previousElementSibling
		const input = btn.previousElementSibling.previousElementSibling
		const idCancel = btn.dataset.id
		btn.setAttribute('disabled', true)
		edit.removeAttribute('disabled')
		input.setAttribute('disabled', true)
		btnSaveConfig.setAttribute('disabled', true)
		currency.classList.remove('currency-black')
		formInputMain.forEach((input) => {
			if (idCancel === input.dataset.id) {
				const product = (input.value = productsInstance.products.find((product) => product.id == idCancel))
				const { price } = product
				input.value = price
			}
		})
	})
})
// --------------------------------------------

// TODO formulario principal
function validateForm(e) {
	e.preventDefault()

	let validate = true
	let newPrice = []

	formInputMain.forEach((input) => {
		if (input.value.trim() === '') {
			validate = false
			Swal.fire({
				icon: 'error',
				title: '¡Error!',
				text: 'Ha ocurrido un error inesperado.',
				confirmButtonText: 'Aceptar',
			})
		} else {
			const name = input.dataset.name
			const category = input.dataset.category
			const price = Number(input.value)
			const id = Number(input.dataset.id)

			newPrice.push({ name, category, price, id })
			localStorage.setItem('products', JSON.stringify(newPrice))
		}
	})

	if (validate) {
		Swal.fire({
			icon: 'success',
			title: 'Producto actualizado',
			showConfirmButton: false,
			timer: 1500,
		})
		setTimeout(() => {
			location.reload()
		}, 1501)
	}
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
	const productPrice = document.getElementById('product-price').value
	const selectCategory = document.getElementById('select-category').value
	const moneyRegex = /^(?!0[0-9])[0-9]*(\.[0-9]+)?$/

	// 	botanas-category
	// postres-category
	// bebidas-category
	if (productName === '' || productPrice === '') {
		ui.showAlert('Todos los campos son obligatorios', null, 'product')
		return
	}

	if (isNaN(productPrice) || !moneyRegex.test(productPrice) || productPrice <= 0.99) {
		ui.showAlert('Precio incorrecto', null, 'product')
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
