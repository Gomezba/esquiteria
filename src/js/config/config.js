const formInputProduct = document.querySelectorAll('.form__input-config-product')

const formConfig = document.getElementById('form-config')
const btnSaveConfig = document.getElementById('btn-save-config')
const priceContent = document.getElementById('readPrices')

// Categorys
const botanasContainer = document.getElementById('botanas-category')
const postresContainer = document.getElementById('desserts-category')
const bebidasContainer = document.getElementById('drinks-category')
const otrosContainer = document.getElementById('others-category')

// new form product
const formProduct = document.getElementById('form-product-new')
const newProductBtn = document.getElementById('new-product')
const cancelProductBtn = document.getElementById('cancel-product')
const body = document.getElementById('body')

const warning = document.getElementById('warning')

if (location.pathname.endsWith('/configuration.html')) {
	warning.addEventListener('click', () => {
		Swal.fire({
			icon: false,
			title: false,
			html:
				'<div style="text-align: justify;">' +
				'<p>Si ya tienes ventas registradas y deseas cambiar el precio de un producto, asegurate de descargar el <strong>PDF</strong> del total de las ventas y eliminar las ventas registradas, para que no haya discrepancias en la venta total de cada producto.</p>' +
				'<p>Al editar un precio se aplica únicamente al producto en cuestión y no afecta retrospectivamente a las ventas ya registradas. Por lo tanto, aunque el precio haya cambiado, el total de ventas del día permanecerá inalterado, lo que puede dar lugar a discrepancias en las cifras.</p>' +
				'</div>',
			showConfirmButton: false,
			allowOutsideClick: false,
			allowEscapeKey: false,
			footer: '<button class="btn btn-primary"id="cerrar">Cerrar</button>',
		}).then((result) => {
			if (
				result.isConfirmed ||
				result.dismiss === Swal.DismissReason.backdrop ||
				result.dismiss === Swal.DismissReason.esc
			) {
				Swal.close() // Cierra la alerta al hacer clic en el botón "Cerrar" o en cualquier área externa
			}
		})

		// Cerrar la alerta al hacer clic en el botón "Cerrar"
		document.getElementById('cerrar').addEventListener('click', () => {
			Swal.close()
		})
	})
}

const categoryHtml = Object.freeze({
	botanas: 'botanas',
	postres: 'postres',
	bebidas: 'bebidas',
	otros: 'otros',
})

// Input focus y label
function labelColor() {
	const formInputMain = document.querySelectorAll('.form__input-config-main')

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

class Product {
	constructor() {
		this.products = JSON.parse(localStorage.getItem('products')) ?? []
	}

	deletedProductObj(id) {
		this.products = this.products.filter((prod) => prod.id != id)
		console.log('estoy dentro')
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

	showProductsHtml() {
		const fragment = document.createDocumentFragment()
		productsInstance.products.forEach((prod) => {
			const { name, category, price, id } = prod

			const formField = document.createElement('DIV')
			const label = document.createElement('LABEL')
			const formInputOptions = document.createElement('DIV')
			const currency = document.createElement('SPAN')
			const input = document.createElement('INPUT')
			const btnEdit = document.createElement('BUTTON')
			const btnCancel = document.createElement('BUTTON')
			const btnDelete = document.createElement('BUTTON')

			formField.classList.add('form__field')
			label.classList.add('label')
			label.textContent = name
			formInputOptions.classList.add('form__input-options')
			formInputOptions.dataset.id = id
			currency.classList.add('currency')
			currency.textContent = '$'
			input.classList.add('form__input-config', 'form__input-config-main')
			input.setAttribute('type', 'number')
			input.setAttribute('step', '0.01')
			input.setAttribute('name', name)
			input.setAttribute('disabled', true)
			input.setAttribute('title', 'Input de precio')
			input.dataset.name = name
			input.dataset.category = category
			input.dataset.id = id
			input.value = price
			btnEdit.classList.add('btn', 'btn-edit', 'btn-edit-config')
			btnEdit.setAttribute('type', 'button')
			btnEdit.setAttribute('title', 'Editar')
			btnEdit.innerHTML = '<img src="../../assets/icons/edit.svg" alt="Boton editar" />'
			btnCancel.classList.add('btn', 'btn-cancel', 'btn-cancel-config')
			btnCancel.setAttribute('type', 'button')
			btnCancel.setAttribute('title', 'Cancelar edición')
			btnCancel.setAttribute('disabled', 'true')
			btnCancel.dataset.id = id
			btnCancel.innerHTML = '<img src="../../assets/icons/cancel.svg" alt="Boton cancelar" />'
			btnDelete.classList.add('btn', 'btn-deleted', 'btn-deleted-config')
			btnDelete.setAttribute('type', 'button')
			btnDelete.setAttribute('title', 'Eliminar producto')
			btnDelete.innerHTML = '<img src="../../assets/icons/delete.svg" alt="Boton eliminar" />'

			btnDelete.addEventListener('click', (e) => {
				e.preventDefault()
				deletedProduct(prod)
			})

			formInputOptions.append(currency, input, btnEdit, btnCancel, btnDelete)
			formField.append(label, formInputOptions)
			fragment.append(formField)

			if (category === categoryHtml.botanas) {
				botanasContainer.append(fragment)
			}

			if (category === categoryHtml.postres) {
				postresContainer.append(fragment)
			}

			if (category === categoryHtml.bebidas) {
				bebidasContainer.append(fragment)
			}

			if (category === categoryHtml.otros) {
				otrosContainer.append(fragment)
			}
		})
	}
}

const productsInstance = new Product()
const ui = new Ui()

const products = [
	{
		name: 'Esquite ch',
		category: 'botanas',
		price: 25,
		id: 11,
	},
	{
		name: 'Esquite 1/2',
		category: 'botanas',
		price: 45,
		id: 111,
	},
	{
		name: 'Doriesquite',
		category: 'botanas',
		price: 45,
		id: 22,
	},
	{
		name: 'Doriloco',
		category: 'botanas',
		price: 35,
		id: 33,
	},
	{
		name: 'Tostiloco',
		category: 'botanas',
		price: 35,
		id: 44,
	},
	{
		name: 'Fres.C.C',
		category: 'postres',
		price: 45,
		id: 55,
	},
	{
		name: 'Fres.C.C 1/2',
		category: 'postres',
		price: 35,
		id: 6622,
	},
	{
		name: 'Gel.C.D',
		category: 'postres',
		price: 45,
		id: 66,
	},
	{
		name: 'Gel.C.D 1/2',
		category: 'postres',
		price: 35,
		id: 6695,
	},
	{
		name: 'Ens.D.M',
		category: 'postres',
		price: 45,
		id: 77,
	},
	{
		name: 'Ens.D.M 1/2',
		category: 'postres',
		price: 35,
		id: 7798,
	},
	{
		name: 'Gomiboing',
		category: 'bebidas',
		price: 35,
		id: 88,
	},
	{
		name: 'Jugo Boing',
		category: 'bebidas',
		price: 15,
		id: 8877,
	},
	{
		name: 'Agua F.1L',
		category: 'bebidas',
		price: 25,
		id: 99,
	},
	{
		name: 'Agua F.1/2',
		category: 'bebidas',
		price: 15,
		id: 10,
	},
	{
		name: 'Coca cola',
		category: 'bebidas',
		price: 22,
		id: 1111,
	},
	{
		name: 'Coca mini',
		category: 'bebidas',
		price: 15,
		id: 1112,
	},
	{
		name: 'A.Nat 500ml',
		category: 'bebidas',
		price: 10,
		id: 1212,
	},
	{
		name: 'A.Nat 1L',
		category: 'bebidas',
		price: 15,
		id: 1280,
	},
	{
		name: 'Pinada',
		category: 'bebidas',
		price: 35,
		id: 1313,
	},
	{
		name: 'Naranjada',
		category: 'bebidas',
		price: 35,
		id: 1414,
	},
	{
		name: 'Limonada',
		category: 'bebidas',
		price: 35,
		id: 1515,
	},
	{
		name: 'Bolsa papas',
		category: 'otros',
		price: 20,
		id: 1615,
	},
	{
		name: 'Gomitas',
		category: 'otros',
		price: 15,
		id: 1616,
	},
	{
		name: 'Cuch/Ten',
		category: 'otros',
		price: 2,
		id: 1697,
	},
	{
		name: 'Vaso',
		category: 'otros',
		price: 3,
		id: 1698,
	},
]
function addLocal() {
	localStorage.setItem('products', JSON.stringify(products))
}

// ---------------------------------------------------------

function deletedProduct(prod) {
	const { name, price, id } = prod
	Swal.fire({
		title: '¿Deseas eliminar el producto?',
		html: `<strong>${name}</strong>: $${price}`,
		icon: 'warning',
		showCancelButton: true,
		confirmButtonText: 'Eliminar',
		cancelButtonText: 'Cancelar',
	}).then((result) => {
		if (result.isConfirmed) {
			const existingProducts = JSON.parse(localStorage.getItem('products')) ?? []
			const newProducts = existingProducts.filter((prod) => prod.id !== id)
			localStorage.setItem('products', JSON.stringify(newProducts))
			Swal.fire({
				icon: 'success',
				title: '¡Producto eliminado!',
				showConfirmButton: false,
				timer: 1500,
			})
			setTimeout(() => {
				location.reload()
			}, 1510)
		}
	})
}

export function readingObject() {
	priceContent.addEventListener('click', (e) => {
		e.preventDefault()

		Swal.fire({
			title: 'Advertencia!',
			html:
				'"Ten en cuenta que al cargar los productos establecidos en el sistema, se <strong style="color:#C62828">eliminarán todos los productos agregados manualmente, así como cualquier edición realizada en ellos</strong>."',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Entiendo, deseo continuar',
			cancelButtonText: 'Cancelar',
		}).then((result) => {
			if (result.isConfirmed) {
				location.reload()
				addLocal()
			}
		})
	})
}

export function eventUpdate() {
	const btnEditConfig = document.querySelectorAll('.btn-edit-config')

	btnEditConfig.forEach((btn) => {
		btn.addEventListener('click', () => {
			btn.setAttribute('disabled', true)
			const currency = btn.previousElementSibling.previousSibling
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
}

export function eventCancel() {
	const formInputMain = document.querySelectorAll('.form__input-config-main')
	const btnCancelConfig = document.querySelectorAll('.btn-cancel-config')

	btnCancelConfig.forEach((btn) => {
		btn.addEventListener('click', () => {
			const currency = btn.previousElementSibling.previousSibling.previousSibling
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
}

// --------------------------------------------

// TODO formulario principal
function validateForm(e) {
	e.preventDefault()

	const formInputMain = document.querySelectorAll('.form__input-config-main')

	let validate = true
	let newPrice = []

	formInputMain.forEach((input) => {
		if (input.value.trim() === '') {
			validate = false
			Swal.fire({
				icon: 'error',
				title: '¡Error!',
				text: 'Ha ocurrido un error inesperado, favor de revisar la cantidad.',
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
export function newProduct() {
	formProduct.addEventListener('submit', validateProduct)

	cancelProductBtn.addEventListener('click', () => {
		formProduct.classList.remove('is-active')
	})

	newProductBtn.addEventListener('click', () => {
		formProduct.classList.add('is-active')
	})
}

function validateProduct(e) {
	const newProducto = {
		name: '',
		category: '',
		price: '',
	}

	e.preventDefault()
	const productName = document.getElementById('product-name').value.trim()
	const productPrice = document.getElementById('product-price').value
	const selectCategory = document.getElementById('select-category').value
	const moneyRegex = /^(?!0[0-9])[0-9]*(\.[0-9]+)?$/

	if (productName === '' || productPrice === '') {
		ui.showAlert('Todos los campos son obligatorios', null, 'product')
		return
	}

	if (isNaN(productPrice) || !moneyRegex.test(productPrice) || productPrice <= 0.99) {
		ui.showAlert('Precio incorrecto', null, 'product')
		return
	}

	newProducto.name = productName
	newProducto.category = selectCategory
	newProducto.price = productPrice
	newProducto.id = Date.now()

	const existingProducts = JSON.parse(localStorage.getItem('products')) ?? []
	existingProducts.push(newProducto)
	localStorage.setItem('products', JSON.stringify(existingProducts))

	formProduct.reset()

	Swal.fire({
		icon: 'success',
		title: '¡Producto agregado!',
		showConfirmButton: false,
		timer: 1500,
	})
	formProduct.classList.remove('is-active')

	setTimeout(() => {
		location.reload()
	}, 1510)
}

addEventListener('DOMContentLoaded', () => {
	setTimeout(() => {
		labelColor()
		eventUpdate()
		eventCancel()
	}, 2000)
})

export function showHtmlProducts() {
	if (productsInstance.products) {
		ui.showProductsHtml()
	}
}
