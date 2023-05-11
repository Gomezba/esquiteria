const formInput = document.querySelectorAll('.form__input-config')
const formConfig = document.getElementById('form-config')
const inputEsquite = Number(document.getElementById('esq'))
const inputDoriesquite = Number(document.getElementById('de'))
const inputDoriloco = Number(document.getElementById('dl'))
const inputTostiloco = Number(document.getElementById('tl'))
const inputFresas = Number(document.getElementById('fe'))
const inputGelatina = Number(document.getElementById('ge'))
const inputEnsalada = Number(document.getElementById('en'))
const inputBoing = Number(document.getElementById('boing'))
const inputAguaLitro = Number(document.getElementById('afl'))
const inputAguaNatural = Number(document.getElementById('anat'))
const inputPiñada = Number(document.getElementById('pi'))
const inputNaranjada = Number(document.getElementById('na'))
const inputLimonada = Number(document.getElementById('li'))

const formProduct = document.getElementById('form-product-new')
const newProductBtn = document.getElementById('new-product')
const addProductBtn = document.getElementById('add-product')
const cancelProductBtn = document.getElementById('cancel-product')

export function labelColor() {
	formInput.forEach((input) => {
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
				// acción a realizar si se confirma el modal
				formProduct.classList.add('is-active')
			} else if (result.dismiss === Swal.DismissReason.cancel) {
				// acción a realizar si se cancela el modal
			}
		})
	}

	addProductBtn.addEventListener('click', () => {
		Swal.fire({
			icon: 'success',
			title: '¡Producto agregado!',
			showConfirmButton: false,
			timer: 1500,
		})
		formProduct.classList.remove('is-active')
	})
	cancelProductBtn.addEventListener('click', () => {
		formProduct.classList.remove('is-active')
	})

	newProductBtn.addEventListener('click', warning)
}

function validateConfig() {
	function validateForm() {
		// if(){
		// }
	}

	function configFunction() {
		formConfig.addEventListener('submit', validateForm)
	}
}
