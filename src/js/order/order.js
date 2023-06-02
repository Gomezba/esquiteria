import { obtenerFechaActual } from '../functions/date.js'
import { ConectorEscposAndroid } from '../tickets/ConectorEscposAndroid.js'

const arrowBotanas = document.querySelector('[data-arrow="botanas"]')
const arrowDesserts = document.querySelector('[data-arrow="desserts"]')
const arrowDrinks = document.querySelector('[data-arrow="drinks"]')
const arrowOthers = document.querySelector('[data-arrow="others"]')
const arrowCustomized = document.querySelector('[data-arrow="customized"]')
const arrowSpecification = document.querySelector('[data-arrow="specification"]')

const botanasContainer = document.getElementById('botanas-container')
const dessertsContainer = document.getElementById('desserts-container')
const drinksContainer = document.getElementById('drinks-container')
const othersContainer = document.getElementById('others-container')
const customizedContainer = document.getElementById('customized-container')
const specificationContainer = document.getElementById('specification-container')

const esquitesContainer = document.getElementById('specification-esquites')
const esquitesMedContainer = document.getElementById('specification-esquites-med')
const doriesquiteContainer = document.getElementById('specification-doriesquite')
const dorilocoContainer = document.getElementById('specification-doriloco')
const tostilocoContainer = document.getElementById('specification-tostiloco')
const fresasContainer = document.getElementById('specification-fresas')
const fresasMedContainer = document.getElementById('specification-fresas-med')
const gelatinaContainer = document.getElementById('specification-gelatina')
const gelatinaMedContainer = document.getElementById('specification-gelatina-med')
const manzanaContainer = document.getElementById('specification-manzana')
const manzanaMedContainer = document.getElementById('specification-manzana-med')
const gomiboingContainer = document.getElementById('specification-gomiboing')
const aguaFrescaContainer = document.getElementById('specification-agua-fresca')
const aguaFrescaMedContainer = document.getElementById('specification-agua-fresca-med')

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

const tomarPedido = document.getElementById('tomar-pedido')
const btnShowOrder = document.getElementById('show-order-list')
const btnRegresar = document.getElementById('regresar')
const btnDel = document.getElementById('orders-deleted')
const sectionOder = document.getElementById('section-order')
const ordersContainer = document.getElementById('orders-container')

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
		btnRemove.setAttribute('id', name)
		btnRemove.textContent = '-'
		btnRemove.addEventListener('click', removeProduct)
		if (btnRemove.id === 'Esquite ch') {
			btnRemove.addEventListener('click', removeUltimateFormEsquites)
		}
		if (btnRemove.id === 'Esquite 1/2') {
			btnRemove.addEventListener('click', removeUltimateFormEsquitesMed)
		}
		if (btnRemove.id === 'Doriesquite') {
			btnRemove.addEventListener('click', removeUltimateFormDoriesquite)
		}
		if (btnRemove.id === 'Doriloco') {
			btnRemove.addEventListener('click', removeUltimateFormDoriloco)
		}
		if (btnRemove.id === 'Tostiloco') {
			btnRemove.addEventListener('click', removeUltimateFormTostiloco)
		}
		if (btnRemove.id === 'Fresas C.C') {
			btnRemove.addEventListener('click', removeUltimateFormFresas)
		}
		if (btnRemove.id === 'Fresas C.C 1/2') {
			btnRemove.addEventListener('click', removeUltimateFormFresasMed)
		}
		if (btnRemove.id === 'Gelatina C.D') {
			btnRemove.addEventListener('click', removeUltimateFormGelatina)
		}
		if (btnRemove.id === 'Gelatina C.D 1/2') {
			btnRemove.addEventListener('click', removeUltimateFormGelatinaMed)
		}
		if (btnRemove.id === 'Ensalada D.M') {
			btnRemove.addEventListener('click', removeUltimateFormEnsalada)
		}
		if (btnRemove.id === 'Ensalada D.M 1/2') {
			btnRemove.addEventListener('click', removeUltimateFormEnsaladaMed)
		}
		if (btnRemove.id === 'Gomiboing') {
			btnRemove.addEventListener('click', removeUltimateFormGomiboing)
		}
		if (btnRemove.id === 'Agua F.1L') {
			btnRemove.addEventListener('click', removeUltimateAguaFresca)
		}
		if (btnRemove.id === 'Agua F.1/2') {
			btnRemove.addEventListener('click', removeUltimateAguaFrescaMed)
		}

		const btnAdd = document.createElement('A')
		btnAdd.classList.add('btn', 'product__btn', 'btn-add')
		btnAdd.textContent = '+'
		btnAdd.setAttribute('id', name)

		btnAdd.addEventListener('click', addProduct)

		if (btnAdd.id === 'Esquite ch') {
			btnAdd.addEventListener('click', genFormEsquite)
		}
		if (btnAdd.id === 'Esquite 1/2') {
			btnAdd.addEventListener('click', genFormEsquiteMed)
		}
		if (btnAdd.id === 'Doriesquite') {
			btnAdd.addEventListener('click', genFormDoriesquite)
		}
		if (btnAdd.id === 'Doriloco') {
			btnAdd.addEventListener('click', genFormDoriloco)
		}
		if (btnAdd.id === 'Tostiloco') {
			btnAdd.addEventListener('click', genFormTostiloco)
		}
		if (btnAdd.id === 'Fresas C.C') {
			btnAdd.addEventListener('click', genFormFresas)
		}
		if (btnAdd.id === 'Fresas C.C 1/2') {
			btnAdd.addEventListener('click', genFormFresasMed)
		}
		if (btnAdd.id === 'Gelatina C.D') {
			btnAdd.addEventListener('click', genFormGelatina)
		}
		if (btnAdd.id === 'Gelatina C.D 1/2') {
			btnAdd.addEventListener('click', genFormGelatinaMed)
		}

		if (btnAdd.id === 'Ensalada D.M') {
			btnAdd.addEventListener('click', genFormEnsalada)
		}
		if (btnAdd.id === 'Ensalada D.M 1/2') {
			btnAdd.addEventListener('click', genFormEnsaladaMed)
		}
		if (btnAdd.id === 'Gomiboing') {
			btnAdd.addEventListener('click', genFormGomiboing)
		}
		if (btnRemove.id === 'Agua F.1L') {
			btnAdd.addEventListener('click', genFormAguaFresca)
		}
		if (btnRemove.id === 'Agua F.1/2') {
			btnAdd.addEventListener('click', genFormAguaFrescaMed)
		}

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

// TODO REMUEVE FORMULARIO DEL CONTENEDOR ESQUITES
function removeUltimateFormEsquites() {
	const sections = esquitesContainer.getElementsByClassName('section-sp')

	if (sections.length > 0) {
		let lastSection = sections[sections.length - 1]
		lastSection.remove()
	}
}
function removeUltimateFormEsquitesMed() {
	const sections = esquitesMedContainer.getElementsByClassName('section-sp|')

	if (sections.length > 0) {
		let lastSection = sections[sections.length - 1]
		lastSection.remove()
	}
}
function removeUltimateFormDoriesquite() {
	const sections = doriesquiteContainer.getElementsByClassName('section-sp')

	if (sections.length > 0) {
		let lastSection = sections[sections.length - 1]
		lastSection.remove()
	}
}
function removeUltimateFormDoriloco() {
	const sections = dorilocoContainer.getElementsByClassName('section-sp')

	if (sections.length > 0) {
		let lastSection = sections[sections.length - 1]
		lastSection.remove()
	}
}
function removeUltimateFormTostiloco() {
	const sections = tostilocoContainer.getElementsByClassName('section-sp')

	if (sections.length > 0) {
		let lastSection = sections[sections.length - 1]
		lastSection.remove()
	}
}
function removeUltimateFormFresas() {
	const sections = fresasContainer.getElementsByClassName('section-sp')

	if (sections.length > 0) {
		let lastSection = sections[sections.length - 1]
		lastSection.remove()
	}
}
function removeUltimateFormFresasMed() {
	const sections = fresasMedContainer.getElementsByClassName('section-sp')

	if (sections.length > 0) {
		let lastSection = sections[sections.length - 1]
		lastSection.remove()
	}
}
function removeUltimateFormGelatina() {
	const sections = gelatinaContainer.getElementsByClassName('section-sp')

	if (sections.length > 0) {
		let lastSection = sections[sections.length - 1]
		lastSection.remove()
	}
}
function removeUltimateFormGelatinaMed() {
	const sections = gelatinaMedContainer.getElementsByClassName('section-sp')

	if (sections.length > 0) {
		let lastSection = sections[sections.length - 1]
		lastSection.remove()
	}
}
function removeUltimateFormEnsalada() {
	const sections = manzanaContainer.getElementsByClassName('section-sp')

	if (sections.length > 0) {
		let lastSection = sections[sections.length - 1]
		lastSection.remove()
	}
}
function removeUltimateFormEnsaladaMed() {
	const sections = manzanaMedContainer.getElementsByClassName('section-sp')

	if (sections.length > 0) {
		let lastSection = sections[sections.length - 1]
		lastSection.remove()
	}
}
function removeUltimateFormGomiboing() {
	const sections = gomiboingContainer.getElementsByClassName('section-sp')

	if (sections.length > 0) {
		let lastSection = sections[sections.length - 1]
		lastSection.remove()
	}
}
function removeUltimateAguaFresca() {
	const sections = aguaFrescaContainer.getElementsByClassName('section-sp')

	if (sections.length > 0) {
		let lastSection = sections[sections.length - 1]
		lastSection.remove()
	}
}
function removeUltimateAguaFrescaMed() {
	const sections = aguaFrescaMedContainer.getElementsByClassName('section-sp')

	if (sections.length > 0) {
		let lastSection = sections[sections.length - 1]
		lastSection.remove()
	}
}

let detalles = []

// TODO AÑADIR DETALLES AL TEXTAREA
function addDetailsArea() {
	const newContent = detalles.map((det) => det.detalle).join('\n')
	orderDetails.value = newContent
	order.adicionalInfo = orderDetails.value
}

// TODO ENVIAR FORMULMARIO DETALLES

function enviarFormulario(e, form, nameProd) {
	e.preventDefault()

	// Obtener el identificador único del formulario
	const formId = form.getAttribute('data-form-id')

	// Verificar si no se ha seleccionado la primera opción en algún select
	const selects = Array.from(form.querySelectorAll('select'))
	const isAnyOptionSelected = selects.some((select) => select.value !== select.querySelector('option').value)

	// Construir la oración de acuerdo al resultado
	let sentence = `1 ${nameProd} con todo`

	if (isAnyOptionSelected) {
		sentence = `1 ${nameProd}, `

		const selectedValues = selects
			.filter((select) => select.value !== select.querySelector('option').value)
			.map((select) => select.value)

		if (selectedValues.length > 0) {
			sentence += ' ' + selectedValues.join(', ')
		}
	}

	// Buscar el detalle correspondiente al formulario en el array global
	const detalleIndex = detalles.findIndex((detalle) => detalle.id === formId)

	// Si se encontró el detalle, actualizarlo; de lo contrario, crear un nuevo objeto de detalle
	if (detalleIndex !== -1) {
		detalles[detalleIndex].detalle = sentence
	} else {
		// Crear el objeto de detalle
		const detalle = {
			id: formId,
			detalle: sentence,
			name: nameProd,
		}

		// Agregar el objeto de detalle al array global
		detalles.push(detalle)
	}

	// Obtener referencia al textarea dentro del formulario actual
	const orderDetails = form.querySelector('.prev-detalle')

	// Actualizar el valor del textarea con el detalle correspondiente
	orderDetails.textContent = sentence

	// Llamar a la función para actualizar el área de detalles
	addDetailsArea()
}

// TODO GENERA EL FORMULARIO DE PRODUCTOS

function genFormEsquite() {
	const section = document.createElement('section')
	section.classList.add('section-sp')

	const html = `
	
	<h3 class='prod-l'></h3>
	<a class="arrow-down-sp"> <img src="../../assets/icons/arrow-down.svg" alt="arrow down" /></a>
    <form class="specification__prod" data-form-id="${Date.now()}">
      <div class="specification__select">
        <p class="specification__prod-name">Esquite ch</p>
        <select>
          <option value="normal" selected>Normal</option>
          <option value="mas caldo que grano">Mas caldo que grano</option>
          <option value="mas grano que caldo">Mas grano que caldo</option>
        </select>
      </div>
      <div class="specification__container">
        <div>
          <label>Mayonesa</label>
          <select>
            <option value="mayonesa" selected>Mayonesa</option>
            <option value="s/mayonesa">Sin mayonesa</option>
            <option value="p/mayonesa">Poca mayonesa</option>
            <option value="m/mayonesa">Mucha mayonesa</option>
            <option value="solo con mayonesa">Solo mayonesa</option>
          </select>
        </div>

        <div>
          <label class="specification__label">Queso</label>
          <select>
            <option value="queso" selected>Queso</option>
            <option value="s/queso">Sin queso</option>
            <option value="p/queso">Poco queso</option>
            <option value="m/queso">Mucho queso</option>
            <option value="solo con queso">Solo queso</option>
          </select>
        </div>
        <div>
          <label class="specification__label">Chile</label>
          <select>
            <option value="chile" selected>Chile</option>
            <option value="s/chile">Sin chile</option>
            <option value="p/chile">Poco chile</option>
            <option value="m/chile">Mucho chile</option>
            <option value="solo con chile">Solo chile</option>
          </select>
        </div>

        <div>
          <label class="specification__label">Limón</label>
          <select>
            <option value="limon" selected>Limón</option>
            <option value="s/limon">Sin limón</option>
            <option value="p/limon">Poco limón</option>
            <option value="m/limon">Mucho limón</option>
            <option value="solo con limon">Solo limón</option>
          </select>
        </div>
	
		<div>
			<p class="prev-label">Previsualización de detalle</p>
			<div class="prev-detalle"></div>
		</div>
      </div>
      <div class="specification__buttons">
        <button type="button" class="btn btn-primary">Agregar detalle</button>
        <button type="button" class="btn btn-cancel" disabled>Eliminar producto</button>
      </div>
    </form>
	
  `

	section.innerHTML = html

	const form = section.querySelector('form')
	const arrow = section.querySelector('.arrow-down-sp')
	arrow.addEventListener('click', (e) => {
		e.preventDefault()
		arrow.classList.toggle('active')
		form.classList.toggle('active')
	})

	esquitesContainer.appendChild(section)
	updateCountsProd(esquitesContainer, 'Esquite ch')
}

function genFormEsquiteMed() {
	const section = document.createElement('section')
	section.classList.add('section-sp')

	const html = `	
	<h3 class='prod-l'></h3>
	<a class="arrow-down-sp"> <img src="../../assets/icons/arrow-down.svg" alt="arrow down" /></a>
    <form class="specification__prod" data-form-id="${Date.now()}">
      <div class="specification__select">
        <p class="specification__prod-name">Esquite 1/2</p>
        <select>
          <option value="normal" selected>Normal</option>
          <option value="mas caldo que grano">Mas caldo que grano</option>
          <option value="mas grano que caldo">Mas grano que caldo</option>
        </select>
      </div>
      <div class="specification__container">
        <div>
          <label>Mayonesa</label>
          <select>
            <option value="mayonesa" selected>Mayonesa</option>
            <option value="s/mayonesa">Sin mayonesa</option>
            <option value="p/mayonesa">Poca mayonesa</option>
            <option value="m/mayonesa">Mucha mayonesa</option>
            <option value="solo con mayonesa">Solo mayonesa</option>
          </select>
        </div>

        <div>
          <label class="specification__label">Queso</label>
          <select>
            <option value="queso" selected>Queso</option>
            <option value="s/queso">Sin queso</option>
            <option value="p/queso">Poco queso</option>
            <option value="m/queso">Mucho queso</option>
            <option value="solo con queso">Solo queso</option>
          </select>
        </div>
		<div>
		<label class="specification__label">Chile</label>
		<select>
		  <option value="chile" selected>Chile</option>
		  <option value="s/chile">Sin chile</option>
		  <option value="p/chile">Poco chile</option>
		  <option value="m/chile">Mucho chile</option>
		  <option value="solo con chile">Solo chile</option>
		</select>
	  </div>

        <div>
		<label class="specification__label">Limón</label>
		<select>
		  <option value="limon" selected>Limón</option>
		  <option value="s/limon">Sin limón</option>
		  <option value="p/limon">Poco limón</option>
		  <option value="solo con limon">Mucho limón</option>
		</select>
        </div>

		<div>
			<p class="prev-label">Previsualización de detalle</p>
			<div class="prev-detalle"></div>
		</div>

      </div>
      <div class="specification__buttons">
        <button type="button" class="btn btn-primary">Agregar detalle</button>
        <button type="button" class="btn btn-cancel" disabled>Eliminar producto</button>
      </div>
    </form>
  `

	section.innerHTML = html

	const form = section.querySelector('form')
	const arrow = section.querySelector('.arrow-down-sp')
	arrow.addEventListener('click', (e) => {
		e.preventDefault()
		arrow.classList.toggle('active')
		form.classList.toggle('active')
	})

	esquitesMedContainer.appendChild(section)
	updateCountsProd(esquitesMedContainer, 'Esquite 1/2')
}

function genFormDoriesquite() {
	const section = document.createElement('section')
	section.classList.add('section-sp')

	const html = `	
	<h3 class='prod-l'></h3>
	<a class="arrow-down-sp"> <img src="../../assets/icons/arrow-down.svg" alt="arrow down" /></a>
	<form class="specification__prod" data-form-id="${Date.now()}">
	<div class="specification__select">
		<p class="specification__prod-name">Doriesquite</p>
		<select>
			<option value="" disabled>Seleccionar</option>
			<option value="nacho" selected>Nacho</option>
			<option value="flaming">Flaming</option>
			<option value="incognita">Incognita</option>
			<option value="sabritas crujientes moradas">Sabritas C. Moradas</option>
			<option value="chetos flaming">Chetos flaming</option>
			<option value="tostito">Tostito</option>
			<option value="chetos naranja">Chetos naranja</option>
			<option value="sabritas flaming">Sabritas.F</option>
			<option value="crujitos">Crujitos</option>
			<option value="rancheritos">Rancheritos</option>
			<option value="pizzerolas">Pizzerolas</option>
			<option value="dinamita">Dinamita</option>
			<option value="fritos">Fritos</option>
			<option value="rufles">Rufles</option>
			<option value="sabritas clasicas">Sabritas clásicas</option>
			<option value="sabritas adobadas">Sabritas.A</option>
			<option value="colmillos">Colmillo</option>
			<option value="takis fuego">Takis fuego</option>
			<option value="takis guacamole">Takis guacamole</option>
			<option value="takis amarillos">Takis salsa brava</option>
		</select>

		<select>
			<option value="normal" selected>Normal</option>
			<option value="mas caldo que grano">Mas caldo que grano</option>
			<option value="mas grano que caldo">Mas grano que caldo</option>
		</select>
	</div>

	<div class="specification__container">
		<div>
			<label>Mayonesa</label>
			<select>
			<option value="mayonesa" selected>Mayonesa</option>
			<option value="s/mayonesa">Sin mayonesa</option>
			<option value="p/mayonesa">Poca mayonesa</option>
			<option value="m/mayonesa">Mucha mayonesa</option>
			<option value="solo con mayonesa">Solo mayonesa</option>
			</select>
		</div>

		<div>
			<label class="specification__label">Queso polvo</label>
		<select>
			<option value="queso" selected>Queso polvo</option>
			<option value="s/queso polvo">Sin queso polvo</option>
			<option value="p/queso polvo">Poco queso polvo</option>
			<option value="m/queso polvo">Mucho queso polvo</option>
			<option value="solo con queso polvo">Solo queso polvo</option>
		</select>
		</div>
		<div>
			<label class="specification__label">Queso amarillo</label>
			<select>
				<option value="queso" selected>Queso amarillo</option>
				<option value="s/queso amarillo">Sin queso amarillo</option>
				<option value="p/queso amarillo">Poco queso amarillo</option>
				<option value="m/queso amarillo">Mucho queso amarillo</option>
				<option value="solo queso amarillo">Solo queso amarillo</option>
			</select>
		</div>
		<div>
			<label class="specification__label"> Chile </label>
			<select>
				<option value="chile" selected>Chile</option>
				<option value="s/chile">Sin chile</option>
				<option value="p/chile">Poco chile</option>
				<option value="m/chile">Mucho chile</option>
				<option value="solo con chile">Solo chile</option>
			</select>
		</div>

		<div>
			<label class="specification__label"> Limón </label>
			<select>
				<option value="limon" selected>Limón</option>
				<option value="s/limon">Sin limón</option>
				<option value="p/limon">Poco limón</option>
				<option value="m/limon">Mucho limón</option>
				<option value="solo con limon">Solo limón</option>
			</select>
		</div>

		<div>
			<p class="prev-label">Previsualización de detalle</p>
			<div class="prev-detalle"></div>
		</div>
	</div>
	<div class="specification__buttons">
		<button type="button" class="btn btn-primary">Agregar detalle</button>
		<button type="button" class="btn btn-cancel" disabled>Eliminar producto</button>
	</div>
</form>
  `
	section.innerHTML = html

	const form = section.querySelector('form')
	const arrow = section.querySelector('.arrow-down-sp')
	arrow.addEventListener('click', (e) => {
		e.preventDefault()
		arrow.classList.toggle('active')
		form.classList.toggle('active')
	})

	doriesquiteContainer.appendChild(section)
	updateCountsProd(doriesquiteContainer, 'Doriesquite')
}

function genFormDoriloco() {
	const section = document.createElement('section')
	section.classList.add('section-sp')

	const html = `	
	<h3 class='prod-l'></h3>
	<a class="arrow-down-sp"> <img src="../../assets/icons/arrow-down.svg" alt="arrow down" /></a>
	<form class="specification__prod" data-form-id="${Date.now()}">
					<div class="specification__select">
						<p class="specification__prod-name">Doriloco</p>
						<select>
						<option value="" disabled>Seleccionar</option>
						<option value="nacho" selected>Nacho</option>
						<option value="flaming">Flaming</option>
						<option value="incognita">Incognita</option>
						<option value="sabritas crujientes moradas">Sabritas C. Moradas</option>
						<option value="chetos flaming">Chetos flaming</option>
						<option value="tostito">Tostito</option>
						<option value="chetos naranja">Chetos naranja</option>
						<option value="sabritas flaming">Sabritas.F</option>
						<option value="crujitos">Crujitos</option>
						<option value="rancheritos">Rancheritos</option>
						<option value="pizzerolas">Pizzerolas</option>
						<option value="dinamita">Dinamita</option>
						<option value="fritos">Fritos</option>
						<option value="rufles">Rufles</option>
						<option value="sabritas clasicas">Sabritas clásicas</option>
						<option value="sabritas adobadas">Sabritas.A</option>
						<option value="colmillos">Colmillo</option>
						<option value="takis fuego">Takis fuego</option>
						<option value="takis guacamole">Takis guacamole</option>
						<option value="takis amarillos">Takis salsa brava</option>
						</select>
					</div>

					<div class="specification__container">
						<div>
							<label class="specification__label"> Jicama </label>
							<select>
								<option value="jicama" selected>Jicama</option>
								<option value="s/jicama">Sin jicama</option>
								<option value="p/jicama">Poca jicama</option>
								<option value="m/jicama">Mucha jicama</option>
								<option value="solo con jicama">Solo jicama</option>
							</select>
						</div>
						<div>
							<label class="specification__label"> Pepino </label>
							<select>
								<option value="pepino" selected> Pepino</option>
								<option value="s/pepino">Sin pepino</option>
								<option value="p/pepino">Poco pepino</option>
								<option value="m/pepino">Mucho pepino</option>
								<option value="solo con pepino">Solo pepino</option>
							</select>
						</div>
						<div>
							<label class="specification__label"> Zanahoria </label>
							<select>
								<option value="zanahoria" selected>Zanahoria</option>
								<option value="s/zanahoria">Sin zanahoria</option>
								<option value="p/zanahoria">Poca zanahoria</option>
								<option value="m/zanahoria">Mucha zanahoria</option>
								<option value="solo con zanahoria">Solo zanahoria</option>
							</select>
						</div>
						<div>
							<label class="specification__label"> Cacahuates </label>
							<select>
								<option value="cacahuates" selected>Cacahuates</option>
								<option value="s/cacahuates">Sin cacahuates</option>
								<option value="p/cacahuates">Pocos cacahuates</option>
								<option value="m/cacahuates">Muchos cacahuates</option>
								<option value="solo con cacahuates">Solo cacahuates</option>
							</select>
						</div>
						<div>
							<label class="specification__label"> Gomitas </label>
							<select>
								<option value="gomitas" selected>Gomitas</option>
								<option value="s/gomitas">Sin gomitas</option>
								<option value="p/gomitas">Pocas gomitas</option>
								<option value="m/gomitas">Muchas gomitas</option>
								<option value="solo con gomitas">Solo gomitas</option>
							</select>
						</div>
						<div>
							<label class="specification__label"> Chamoy </label>
							<select>
								<option value="chamoy" selected>Chamoy</option>
								<option value="s/chamoy">Sin chamoy</option>
								<option value="p/chamoy">Poco chamoy</option>
								<option value="m/chamoy">Mucho chamoy</option>
								<option value="solo con chamoy">Solo chamoy</option>
							</select>
						</div>
						<div>
							<label class="specification__label"> Miguelito </label>
							<select>
								<option value="miguelito" selected>Miguelito</option>
								<option value="s/miguelito">Sin miguelito</option>
								<option value="p/miguelito">Poco miguelito</option>
								<option value="m/miguelito">Mucho miguelito</option>
								<option value="solo con miguelito">Solo miguelito</option>
							</select>
						</div>
						<div>
							<label class="specification__label"> Salsa </label>
							<select>
								<option value="salsa" selected>Salsa</option>
								<option value="s/salsa">Sin salsa</option>
								<option value="p/salsa">Poca salsa</option>
								<option value="m/salsa">Mucha salsa</option>
								<option value="solo con salsa">Solo salsa</option>
							</select>
						</div>
						<div>
							<label class="specification__label"> Limón </label>
							<select>
								<option value="limon" selected>Limón</option>
								<option value="s/limon">Sin limón</option>
								<option value="p/limon">Poco limón</option>
								<option value="m/limon">Mucho limón</option>
								<option value="solo con limon">Solo limón</option>
							</select>
						</div>

						<div>
							<label class="specification__label"> Banderilla </label>
							<select>
								<option value="banderilla" selected>Banderilla</option>
								<option value="s/banderilla">Sin banderilla</option>
								<option value="solo con banderilla">Con pura banderilla</option>
							</select>
						</div>

						<div>
							<p class="prev-label">Previsualización de detalle</p>
							<div class="prev-detalle"></div>
						</div>

					</div>
					<div class="specification__buttons">
						<button type="button" class="btn btn-primary">Agregar detalle</button>
						<button type="button" class="btn btn-cancel" disabled>Eliminar producto</button>
					</div>
				</form>

  `
	section.innerHTML = html

	const form = section.querySelector('form')
	const arrow = section.querySelector('.arrow-down-sp')
	arrow.addEventListener('click', (e) => {
		e.preventDefault()
		arrow.classList.toggle('active')
		form.classList.toggle('active')
	})

	dorilocoContainer.appendChild(section)
	updateCountsProd(dorilocoContainer, 'Doriloco')
}

function genFormTostiloco() {
	const section = document.createElement('section')
	section.classList.add('section-sp')

	const html = `	
	<h3 class='prod-l'></h3>
	<a class="arrow-down-sp"> <img src="../../assets/icons/arrow-down.svg" alt="arrow down" /></a>
	<form class="specification__prod" data-form-id="${Date.now()}">
					<p class="specification__prod-name">Tostiloco</p>
					<div class="specification__container">
						<div>
							<label class="specification__label"> Jicama </label>
							<select>
								<option value="jicama" selected>Jicama</option>
								<option value="s/jicama">Sin jicama</option>
								<option value="p/jicama">Poca jicama</option>
								<option value="m/jicama">Mucha jicama</option>
								<option value="solo con jicama">Solo jicama</option>
							</select>
						</div>
						<div>
							<label class="specification__label"> Pepino </label>
							<select>
								<option value="pepino" selected> Pepino</option>
								<option value="s/pepino">Sin pepino</option>
								<option value="p/pepino">Poco pepino</option>
								<option value="m/pepino">Mucho pepino</option>
								<option value="solo con pepino">Solo pepino</option>
							</select>
						</div>
						<div>
							<label class="specification__label"> Zanahoria </label>
							<select>
								<option value="zanahoria" selected>Zanahoria</option>
								<option value="s/zanahoria">Sin zanahoria</option>
								<option value="p/zanahoria">Poca zanahoria</option>
								<option value="m/zanahoria">Mucha zanahoria</option>
								<option value="solo con zanahoria">Solo zanahoria</option>
							</select>
						</div>
						<div>
							<label class="specification__label"> Cacahuates </label>
							<select>
								<option value="cacahuates" selected>Cacahuates</option>
								<option value="s/cacahuates">Sin cacahuates</option>
								<option value="p/cacahuates">Pocos cacahuates</option>
								<option value="m/cacahuates">Muchos cacahuates</option>
								<option value="solo con cacahuates">Solo cacahuates</option>
							</select>
						</div>
						<div>
							<label class="specification__label"> Gomitas </label>
							<select>
								<option value="gomitas" selected>Gomitas</option>
								<option value="s/gomitas">Sin gomitas</option>
								<option value="p/gomitas">Pocas gomitas</option>
								<option value="m/gomitas">Muchas gomitas</option>
								<option value="solo con gomitas">Solo gomitas</option>
							</select>
						</div>
						<div>
							<label class="specification__label"> Chamoy </label>
							<select>
								<option value="chamoy" selected>Chamoy</option>
								<option value="s/chamoy">Sin chamoy</option>
								<option value="p/chamoy">Poco chamoy</option>
								<option value="m/chamoy">Mucho chamoy</option>
								<option value="solo con chamoy">Solo chamoy</option>
							</select>
						</div>
						<div>
							<label class="specification__label"> Miguelito </label>
							<select>
								<option value="miguelito" selected>Miguelito</option>
								<option value="s/miguelito">Sin miguelito</option>
								<option value="p/miguelito">Poco miguelito</option>
								<option value="m/miguelito">Mucho miguelito</option>
								<option value="solo con miguelito">Solo miguelito</option>
							</select>
						</div>
						<div>
							<label class="specification__label"> Salsa </label>
							<select>
								<option value="salsa" selected>Salsa</option>
								<option value="s/salsa">Sin salsa</option>
								<option value="p/salsa">Poca salsa</option>
								<option value="m/salsa">Mucha salsa</option>
								<option value="solo con salsa">Solo salsa</option>
							</select>
						</div>
						<div>
							<label class="specification__label"> Limón </label>
							<select>
								<option value="limon" selected>Limón</option>
								<option value="s/limon">Sin limón</option>
								<option value="p/limon">Poco limón</option>
								<option value="m/limon">Mucho limón</option>
								<option value="solo con limon">Solo limón</option>
							</select>
						</div>
						<div>
							<label class="specification__label"> Banderilla </label>
							<select>
								<option value="banderilla" selected>Banderilla</option>
								<option value="s/banderilla">Sin banderilla</option>
								<option value="solo con banderilla">Con pura banderilla</option>
							</select>
						</div>

						<div>
							<p class="prev-label">Previsualización de detalle</p>
							<div class="prev-detalle"></div>
						</div>

					</div>
					<div class="specification__buttons">
						<button type="button" class="btn btn-primary">Agregar detalle</button>
						<button type="button" class="btn btn-cancel" disabled>Eliminar producto</button>
					</div>
				</form>
  `
	section.innerHTML = html

	const form = section.querySelector('form')
	const arrow = section.querySelector('.arrow-down-sp')
	arrow.addEventListener('click', (e) => {
		e.preventDefault()
		arrow.classList.toggle('active')
		form.classList.toggle('active')
	})

	tostilocoContainer.appendChild(section)
	updateCountsProd(tostilocoContainer, 'Tostiloco')
}

function genFormFresas() {
	const section = document.createElement('section')
	section.classList.add('section-sp')

	const html = `	
	<h3 class='prod-l'></h3>
	<a class="arrow-down-sp"> <img src="../../assets/icons/arrow-down.svg" alt="arrow down" /></a>
	<form class="specification__prod" data-form-id="${Date.now()}">
	<p class="specification__prod-name">Fresas C.C</p>
	<div class="specification__container">
		<div>
			<label class="specification__label"> Chantilly</label>
			<select>
				<option value="chantilly" selected>Chantilly</option>
				<option value="s/chantilly">Sin chantilly</option>
				<option value="p/chantilly">Poco chantilly</option>
				<option value="m/chantilly">Mucho chantilly</option>
				<option value="solo con chantilly">Solo chantilly</option>
			</select>
		</div>
		<div>
			<label class="specification__label"> Chocolate liquido </label>
			<select>
				<option value="chocolate" selected>Chocolate</option>
				<option value="s/chocolate liq">Sin chocolate</option>
				<option value="p/chocolate liq">Poco chocolate</option>
				<option value="m/chocolate liq">Mucho chocolate</option>
				<option value="solo con chocolate liquido">Solo chocolate liquido</option>
			</select>
		</div>
		<div>
			<label class="specification__label"> Galleta </label>
			<select>
				<option value="galleta" selected>Galleta</option>
				<option value="s/galleta">Sin galleta</option>
				<option value="g/extra">Galleta extra</option>
				<option value="solo con galleta">Solo con galleta</option>
			</select>
		</div>
		<div>
			<label class="specification__label"> Choc. Vaquita </label>
			<select>
				<option value="chocolate vaquita" selected>Choc-vaquita</option>
				<option value="s/choc.vaq">Sin chocolate vaquita</option>
				<option value="choc-vaq-extra">Choc vaq-extra</option>
				<option value="solo con chocolate vaquita">Solo choc-vaquita</option>
			</select>
		</div>
		<div>
			<label class="specification__label"> Chochitos </label>
			<select>
				<option value="chochitos" selected>Chochitos</option>
				<option value="s/chochitos">Sin chochitos</option>
				<option value="p/chochitos">Pocos chochitos</option>
				<option value="m/chochitos">Muchos chochitos</option>
				<option value="solo con chochitos">Solo chochitos</option>
			</select>
		</div>
		<div>
			<label class="specification__label"> Lechera </label>
			<select>
				<option value="sin lechera" selected>Sin lechera</option>
				<option value="c/lechera">Con lechera</option>
				<option value="p/lechera">Poca lechera</option>
				<option value="m/lechera">Mucha lechera</option>
				<option value="solo con lechera">Solo lechera</option>
			</select>
		</div>	

		<div>
			<p class="prev-label">Previsualización de detalle</p>
			<div class="prev-detalle"></div>
		</div>
	</div>
	<div class="specification__buttons">
		<button type="button" class="btn btn-primary">Agregar detalle</button>
		<button type="button" class="btn btn-cancel" disabled>Eliminar producto</button>
	</div>
</form>
  `

	section.innerHTML = html

	const form = section.querySelector('form')
	const arrow = section.querySelector('.arrow-down-sp')
	arrow.addEventListener('click', (e) => {
		e.preventDefault()
		arrow.classList.toggle('active')
		form.classList.toggle('active')
	})

	fresasContainer.appendChild(section)
	updateCountsProd(fresasContainer, 'Fresas C.C')
}

function genFormFresasMed() {
	const section = document.createElement('section')
	section.classList.add('section-sp')

	const html = `	
	<h3 class='prod-l'></h3>
	<a class="arrow-down-sp"> <img src="../../assets/icons/arrow-down.svg" alt="arrow down" /></a>
	<form class="specification__prod" data-form-id="${Date.now()}">
	<p class="specification__prod-name">Fresas C.C 1/2</p>
	<div class="specification__container">
		<div>
			<label class="specification__label"> Chantilly</label>
			<select>
				<option value="chantilly" selected>Chantilly</option>
				<option value="s/chantilly">Sin chantilly</option>
				<option value="p/chantilly">Poco chantilly</option>
				<option value="m/chantilly">Mucho chantilly</option>
				<option value="solo con chantilly">Solo chantilly</option>
			</select>
		</div>
		<div>
			<label class="specification__label"> Chocolate liquido </label>
			<select>
				<option value="chocolate" selected>Chocolate</option>
				<option value="s/chocolate liq">Sin chocolate</option>
				<option value="p/chocolate liq">Poco chocolate</option>
				<option value="m/chocolate liq">Mucho chocolate</option>
				<option value="solo con chocolate liquido">Solo chocolate liquido</option>
			</select>
		</div>
		<div>
			<label class="specification__label"> Galleta </label>
			<select>
				<option value="galleta" selected>Galleta</option>
				<option value="s/galleta">Sin galleta</option>
				<option value="g/extra">Galleta extra</option>
				<option value="solo con galleta">Solo con galleta</option>
			</select>
		</div>
		<div>
			<label class="specification__label"> Choc. Vaquita </label>
			<select>
				<option value="chocolate vaquita" selected>Choc-vaquita</option>
				<option value="s/choc.vaq">Sin chocolate vaquita</option>
				<option value="choc-vaq-extra">Choc vaq-extra</option>
				<option value="solo con chocolate vaquita">Solo choc-vaquita</option>
			</select>
		</div>
		<div>
			<label class="specification__label"> Chochitos </label>
			<select>
				<option value="chochitos" selected>Chochitos</option>
				<option value="s/chochitos">Sin chochitos</option>
				<option value="p/chochitos">Pocos chochitos</option>
				<option value="m/chochitos">Muchos chochitos</option>
				<option value="solo con chochitos">Solo chochitos</option>
			</select>
		</div>
		<div>
			<label class="specification__label"> Lechera </label>
			<select>
				<option value="sin lechera" selected>Sin lechera</option>
				<option value="c/lechera">Con lechera</option>
				<option value="p/lechera">Poca lechera</option>
				<option value="m/lechera">Mucha lechera</option>
				<option value="solo con lechera">Solo lechera</option>
			</select>
		</div>		

		<div>
			<p class="prev-label">Previsualización de detalle</p>
			<div class="prev-detalle"></div>
		</div>
	</div>
	<div class="specification__buttons">
		<button type="button" class="btn btn-primary">Agregar detalle</button>
		<button type="button" class="btn btn-cancel" disabled>Eliminar producto</button>
	</div>
</form>
  `
	section.innerHTML = html

	const form = section.querySelector('form')
	const arrow = section.querySelector('.arrow-down-sp')
	arrow.addEventListener('click', (e) => {
		e.preventDefault()
		arrow.classList.toggle('active')
		form.classList.toggle('active')
	})

	fresasMedContainer.appendChild(section)
	updateCountsProd(fresasMedContainer, 'Fresas C.C 1/2')
}

function genFormGelatina() {
	const section = document.createElement('section')
	section.classList.add('section-sp')

	const html = `	
	<h3 class='prod-l'></h3>
	<a class="arrow-down-sp"> <img src="../../assets/icons/arrow-down.svg" alt="arrow down" /></a>
	<form class="specification__prod" data-form-id="${Date.now()}">
	<p class="specification__prod-name">Gelatina C.D</p>
	<div class="specification__container">
		<div>
			<label class="specification__label"> Chantilly</label>
			<select>
				<option value="chantilly" selected>Chantilly</option>
				<option value="s/chantilly">Sin chantilly</option>
				<option value="p/chantilly">Poco chantilly</option>
				<option value="m/chantilly">Mucho chantilly</option>
				<option value="solo con chantilly">Solo chantilly</option>
			</select>
		</div>
		<div>
			<label class="specification__label"> Chocolate liquido </label>
			<select>
				<option value="chocolate" selected>Chocolate</option>
				<option value="s/chocolate liq">Sin chocolate</option>
				<option value="p/chocolate liq">Poco chocolate</option>
				<option value="m/chocolate liq">Mucho chocolate</option>
				<option value="solo con chocolate liquido">Solo chocolate liquido</option>
			</select>
		</div>
		<div>
			<label class="specification__label"> Galleta </label>
			<select>
				<option value="galleta" selected>Galleta</option>
				<option value="s/galleta">Sin galleta</option>
				<option value="g/extra">Galleta extra</option>
				<option value="solo con galleta">Solo con galleta</option>
			</select>
		</div>
		<div>
			<label class="specification__label"> Choc. Vaquita </label>
			<select>
				<option value="chocolate vaquita" selected>Choc-vaquita</option>
				<option value="s/choc.vaq">Sin chocolate vaquita</option>
				<option value="choc-vaq-extra">Choc vaq-extra</option>
				<option value="solo con chocolate vaquita">Solo choc-vaquita</option>
			</select>
		</div>
		<div>
			<label class="specification__label"> Chochitos </label>
			<select>
				<option value="chochitos" selected>Chochitos</option>
				<option value="s/chochitos">Sin chochitos</option>
				<option value="p/chochitos">Pocos chochitos</option>
				<option value="m/chochitos">Muchos chochitos</option>
				<option value="solo con chochitos">Solo chochitos</option>
			</select>
		</div>
		<div>
			<label class="specification__label"> Lechera </label>
			<select>
				<option value="sin lechera" selected>Sin lechera</option>
				<option value="c/lechera">Con lechera</option>
				<option value="p/lechera">Poca lechera</option>
				<option value="m/lechera">Mucha lechera</option>
				<option value="solo con lechera">Solo lechera</option>
			</select>
		</div>
		

		<div>
			<p class="prev-label">Previsualización de detalle</p>
			<div class="prev-detalle"></div>
		</div>
	</div>
	<div class="specification__buttons">
		<button type="button" class="btn btn-primary">Agregar detalle</button>
		<button type="button" class="btn btn-cancel" disabled>Eliminar producto</button>
	</div>
</form>
  `
	section.innerHTML = html

	const form = section.querySelector('form')
	const arrow = section.querySelector('.arrow-down-sp')
	arrow.addEventListener('click', (e) => {
		e.preventDefault()
		arrow.classList.toggle('active')
		form.classList.toggle('active')
	})

	gelatinaContainer.appendChild(section)
	updateCountsProd(gelatinaContainer, 'Gelatina C.D')
}

function genFormGelatinaMed() {
	const section = document.createElement('section')
	section.classList.add('section-sp')

	const html = `	
	<h3 class='prod-l'></h3>
	<a class="arrow-down-sp"> <img src="../../assets/icons/arrow-down.svg" alt="arrow down" /></a>
	<form class="specification__prod" data-form-id="${Date.now()}">
	<p class="specification__prod-name">Gelatina C.D 1/2</p>
	<div class="specification__container">
		<div>
			<label class="specification__label"> Chantilly</label>
			<select>
				<option value="chantilly" selected>Chantilly</option>
				<option value="s/chantilly">Sin chantilly</option>
				<option value="p/chantilly">Poco chantilly</option>
				<option value="m/chantilly">Mucho chantilly</option>
				<option value="solo con chantilly">Solo chantilly</option>
			</select>
		</div>
		<div>
			<label class="specification__label"> Chocolate liquido </label>
			<select>
				<option value="chocolate" selected>Chocolate</option>
				<option value="s/chocolate liq">Sin chocolate</option>
				<option value="p/chocolate liq">Poco chocolate</option>
				<option value="m/chocolate liq">Mucho chocolate</option>
				<option value="solo con chocolate liquido">Solo chocolate liquido</option>
			</select>
		</div>
		<div>
			<label class="specification__label"> Galleta </label>
			<select>
				<option value="galleta" selected>Galleta</option>
				<option value="s/galleta">Sin galleta</option>
				<option value="g/extra">Galleta extra</option>
				<option value="solo con galleta">Solo con galleta</option>
			</select>
		</div>
		<div>
			<label class="specification__label"> Choc. Vaquita </label>
			<select>
				<option value="chocolate vaquita" selected>Choc-vaquita</option>
				<option value="s/choc.vaq">Sin chocolate vaquita</option>
				<option value="choc-vaq-extra">Choc vaq-extra</option>
				<option value="solo con chocolate vaquita">Solo choc-vaquita</option>
			</select>
		</div>
		<div>
			<label class="specification__label"> Chochitos </label>
			<select>
				<option value="chochitos" selected>Chochitos</option>
				<option value="s/chochitos">Sin chochitos</option>
				<option value="p/chochitos">Pocos chochitos</option>
				<option value="m/chochitos">Muchos chochitos</option>
				<option value="solo con chochitos">Solo chochitos</option>
			</select>
		</div>
		<div>
			<label class="specification__label"> Lechera </label>
			<select>
				<option value="sin lechera" selected>Sin lechera</option>
				<option value="c/lechera">Con lechera</option>
				<option value="p/lechera">Poca lechera</option>
				<option value="m/lechera">Mucha lechera</option>
				<option value="solo con lechera">Solo lechera</option>
			</select>
		</div>		

		<div>
			<p class="prev-label">Previsualización de detalle</p>
			<div class="prev-detalle"></div>
		</div>
	</div>
	<div class="specification__buttons">
		<button type="button" class="btn btn-primary">Agregar detalle</button>
		<button type="button" class="btn btn-cancel" disabled>Eliminar producto</button>
	</div>
</form>
  `
	section.innerHTML = html

	const form = section.querySelector('form')
	const arrow = section.querySelector('.arrow-down-sp')
	arrow.addEventListener('click', (e) => {
		e.preventDefault()
		arrow.classList.toggle('active')
		form.classList.toggle('active')
	})

	gelatinaMedContainer.appendChild(section)
	updateCountsProd(gelatinaMedContainer, 'Gelatina C.D 1/2')
}

function genFormEnsalada() {
	const section = document.createElement('section')
	section.classList.add('section-sp')

	const html = `	
	<h3 class='prod-l'></h3>
	<a class="arrow-down-sp"> <img src="../../assets/icons/arrow-down.svg" alt="arrow down" /></a>
	<form class="specification__prod" data-form-id="${Date.now()}">
	<p class="specification__prod-name">Ensalada D.M</p>
	<div class="specification__container">
		<div>
			<label class="specification__label"> Chantilly</label>
			<select>
				<option value="chantilly" selected>Chantilly</option>
				<option value="s/chantilly">Sin chantilly</option>
				<option value="p/chantilly">Poco chantilly</option>
				<option value="m/chantilly">Mucho chantilly</option>
				<option value="solo con chantilly">Solo chantilly</option>
			</select>
		</div>
		<div>
			<label class="specification__label"> Chocolate liquido </label>
			<select>
				<option value="chocolate" selected>Chocolate</option>
				<option value="s/chocolate liq">Sin chocolate</option>
				<option value="p/chocolate liq">Poco chocolate</option>
				<option value="m/chocolate liq">Mucho chocolate</option>
				<option value="solo con chocolate liquido">Solo chocolate liquido</option>
			</select>
		</div>
		<div>
			<label class="specification__label"> Galleta </label>
			<select>
				<option value="galleta" selected>Galleta</option>
				<option value="s/galleta">Sin galleta</option>
				<option value="g/extra">Galleta extra</option>
				<option value="solo con galleta">Solo con galleta</option>
			</select>
		</div>
		<div>
			<label class="specification__label"> Choc. Vaquita </label>
			<select>
				<option value="chocolate vaquita" selected>Choc-vaquita</option>
				<option value="s/choc.vaq">Sin chocolate vaquita</option>
				<option value="choc-vaq-extra">Choc vaq-extra</option>
				<option value="solo con chocolate vaquita">Solo choc-vaquita</option>
			</select>
		</div>
		<div>
			<label class="specification__label"> Chochitos </label>
			<select>
				<option value="chochitos" selected>Chochitos</option>
				<option value="s/chochitos">Sin chochitos</option>
				<option value="p/chochitos">Pocos chochitos</option>
				<option value="m/chochitos">Muchos chochitos</option>
				<option value="solo con chochitos">Solo chochitos</option>
			</select>
		</div>
		<div>
			<label class="specification__label"> Nuez </label>
			<select>
				<option value="nuez" selected>Nuez</option>
				<option value="s/nuez">Sin nuez</option>
				<option value="p/nuez">Poca nuez</option>
				<option value="m/nuez">Mucha nuez</option>
				<option value="solo con nuez">Solo nuez</option>
			</select>
		</div>	
		<div>
			<label class="specification__label"> Lechera </label>
			<select>
				<option value="sin lechera" selected>Sin lechera</option>
				<option value="c/lechera">Con lechera</option>
				<option value="p/lechera">Poca lechera</option>
				<option value="m/lechera">Mucha lechera</option>
				<option value="solo con lechera">Solo lechera</option>
			</select>
		</div>		

		<div>
			<p class="prev-label">Previsualización de detalle</p>
			<div class="prev-detalle"></div>
		</div>
	</div>
	<div class="specification__buttons">
		<button type="button" class="btn btn-primary">Agregar detalle</button>
		<button type="button" class="btn btn-cancel" disabled>Eliminar producto</button>
	</div>
</form>
  `
	section.innerHTML = html

	const form = section.querySelector('form')
	const arrow = section.querySelector('.arrow-down-sp')
	arrow.addEventListener('click', (e) => {
		e.preventDefault()
		arrow.classList.toggle('active')
		form.classList.toggle('active')
	})

	manzanaContainer.appendChild(section)
	updateCountsProd(manzanaContainer, 'Ensalada D.M')
}

function genFormEnsaladaMed() {
	const section = document.createElement('section')
	section.classList.add('section-sp')

	const html = `	
	<h3 class='prod-l'></h3>
	<a class="arrow-down-sp"> <img src="../../assets/icons/arrow-down.svg" alt="arrow down" /></a>
	<form class="specification__prod" data-form-id="${Date.now()}">
	<p class="specification__prod-name">Ensalada D.M 1/2</p>
	<div class="specification__container">
		<div>
			<label class="specification__label"> Chantilly</label>
			<select>
				<option value="chantilly" selected>Chantilly</option>
				<option value="s/chantilly">Sin chantilly</option>
				<option value="p/chantilly">Poco chantilly</option>
				<option value="m/chantilly">Mucho chantilly</option>
				<option value="solo con chantilly">Solo chantilly</option>
			</select>
		</div>
		<div>
			<label class="specification__label"> Chocolate liquido </label>
			<select>
				<option value="chocolate" selected>Chocolate</option>
				<option value="s/chocolate liq">Sin chocolate</option>
				<option value="p/chocolate liq">Poco chocolate</option>
				<option value="m/chocolate liq">Mucho chocolate</option>
				<option value="solo con chocolate liquido">Solo chocolate liquido</option>
			</select>
		</div>
		<div>
			<label class="specification__label"> Galleta </label>
			<select>
				<option value="galleta" selected>Galleta</option>
				<option value="s/galleta">Sin galleta</option>
				<option value="g/extra">Galleta extra</option>
				<option value="solo con galleta">Solo con galleta</option>
			</select>
		</div>
		<div>
			<label class="specification__label"> Choc. Vaquita </label>
			<select>
				<option value="chocolate vaquita" selected>Choc-vaquita</option>
				<option value="s/choc.vaq">Sin chocolate vaquita</option>
				<option value="choc-vaq-extra">Choc vaq-extra</option>
				<option value="solo con chocolate vaquita">Solo choc-vaquita</option>
			</select>
		</div>
		<div>
			<label class="specification__label"> Chochitos </label>
			<select>
				<option value="chochitos" selected>Chochitos</option>
				<option value="s/chochitos">Sin chochitos</option>
				<option value="p/chochitos">Pocos chochitos</option>
				<option value="m/chochitos">Muchos chochitos</option>
				<option value="solo con chochitos">Solo chochitos</option>
			</select>
		</div>
		<div>
			<label class="specification__label"> Nuez </label>
			<select>
				<option value="nuez" selected>Nuez</option>
				<option value="s/nuez">Sin nuez</option>
				<option value="p/nuez">Poca nuez</option>
				<option value="m/nuez">Mucha nuez</option>
				<option value="solo con nuez">Solo nuez</option>
			</select>
		</div>	
		<div>
			<label class="specification__label"> Lechera </label>
			<select>
				<option value="sin lechera" selected>Sin lechera</option>
				<option value="c/lechera">Con lechera</option>
				<option value="p/lechera">Poca lechera</option>
				<option value="m/lechera">Mucha lechera</option>
				<option value="solo con lechera">Solo lechera</option>
			</select>
		</div>
		

		<div>
			<p class="prev-label">Previsualización de detalle</p>
			<div class="prev-detalle"></div>
		</div>
	</div>
	<div class="specification__buttons">
		<button type="button" class="btn btn-primary">Agregar detalle</button>
		<button type="button" class="btn btn-cancel" disabled>Eliminar producto</button>
	</div>
</form>
  `
	section.innerHTML = html

	const form = section.querySelector('form')
	const arrow = section.querySelector('.arrow-down-sp')
	arrow.addEventListener('click', (e) => {
		e.preventDefault()
		arrow.classList.toggle('active')
		form.classList.toggle('active')
	})

	manzanaMedContainer.appendChild(section)
	updateCountsProd(manzanaMedContainer, 'Ensalada D.M 1/2')
}

function genFormGomiboing() {
	const section = document.createElement('section')
	section.classList.add('section-sp')

	const html = `	
	<h3 class='prod-l'></h3>
	<a class="arrow-down-sp"> <img src="../../assets/icons/arrow-down.svg" alt="arrow down" /></a>
	<form class="specification__prod" data-form-id="${Date.now()}">
				<div class="specification__select">
					<p class="specification__prod-name">Gomiboing</p>
					<select>
						<option value="" disabled>Seleccionar</option>
						<option value="mango" selected>Mango</option>
						<option value="uva">Uva</option>
						<option value="guayaba">Guayaba</option>
						<option value="fresa">Fresa</option>
						<option value="naranja">Naranja</option>
						<option value="manzana">Manzana</option>
					</select>
				</div>
				<div class="specification__container">
					<div>
						<label class="specification__label"> Escarchado </label>
						<select>
							<option value="escarchado" selected>Escarchado</option>
							<option value="s/escarchar">Sin escarchar</option>
							<option value="solo escarchado">Solo escarchado</option>
						</select>
					</div>
					<div>
						<label class="specification__label"> Gomitas </label>
						<select>
							<option value="gomitas" selected>Gomitas</option>
							<option value="s/gomitas">Sin gomitas</option>
							<option value="poquitas gomitas">Pocas gomitas</option>
							<option value="solo con gomitas">Solo gomitas</option>
						</select>
					</div>
					<div>
						<label class="specification__label"> Skwinkles </label>
						<select>
							<option value="skwinkles" selected>Skwinkles</option>
							<option value="s/skwinkles">Sin skwinkles</option>
							<option value="pocos skwinkles">Pocos skwinkles</option>
							<option value="solo con skwinkles">Solo skwinkles</option>
						</select>
					</div>
					<div>
						<label class="specification__label"> Miguelito </label>
						<select>
							<option value="miguelito" selected>Miguelito</option>
							<option value="s/miguelito">Sin miguelito</option>
							<option value="p/miguelito">Poco miguelito</option>
							<option value="m/miguelito">Mucho miguelito</option>
							<option value="solo con miguelito">Solo miguelito</option>
						</select>
					</div>
					<div>
						<label class="specification__label"> Chamoy </label>
						<select>
							<option value="chamoy" selected>Chamoy</option>
							<option value="s/chamoy">Sin chamoy</option>
							<option value="p/chamoy">Poco chamoy</option>
							<option value="m/chamoy">Mucho chamoy</option>
							<option value="solo con chamoy">Solo chamoy</option>
						</select>
					</div>
					<div>
						<label class="specification__label"> Salsa </label>
						<select>
							<option value="salsa" selected>Salsa</option>
							<option value="s/salsa">Sin salsa</option>
							<option value="p/salsa">Poca salsa</option>
							<option value="m/salsa">Mucha salsa</option>
							<option value="solo con salsa">Solo salsa</option>
						</select>
					</div>
					<div>
						<label class="specification__label"> Limón </label>
						<select>
							<option value="limon" selected>Limón</option>
							<option value="s/limon">Sin limón</option>
							<option value="p/limon">Poco limón</option>
							<option value="m/limon">Mucho limón</option>
							<option value="solo con limon">Solo limón</option>
						</select>
					</div>
					<div>
						<label class="specification__label"> Banderilla </label>
						<select>
							<option value="banderilla" selected>Banderilla</option>
							<option value="s/banderilla">Sin banderilla</option>
							<option value="solo con banderilla">Solo banderilla</option>
						</select>
					</div>

					<div>
						<p class="prev-label">Previsualización de detalle</p>
						<div class="prev-detalle"></div>
					</div>
				</div>
				<div class="specification__buttons">
					<button type="button" class="btn btn-primary">Agregar detalle</button>
					<button type="button" class="btn btn-cancel" disabled>Eliminar producto</button>
				</div>
			</form>
  `
	section.innerHTML = html

	const form = section.querySelector('form')
	const arrow = section.querySelector('.arrow-down-sp')
	arrow.addEventListener('click', (e) => {
		e.preventDefault()
		arrow.classList.toggle('active')
		form.classList.toggle('active')
	})

	gomiboingContainer.appendChild(section)
	updateCountsProd(gomiboingContainer, 'Gomiboing')
}

function genFormAguaFresca() {
	const section = document.createElement('section')
	section.classList.add('section-sp')

	const html = `	
	<h3 class='prod-l'></h3>
	<a class="arrow-down-sp"> <img src="../../assets/icons/arrow-down.svg" alt="arrow down" /></a>
	<form class="specification__prod" data-form-id="${Date.now()}">
				<div class="specification__select">
					<p class="specification__prod-name">Agua fresca 1L</p>
					<select>
						<option value="" disabled>Seleccionar</option>
						<option value="naranja" selected >Naranja</option>
						<option value="fresa">Fresa</option>
						<option value="horchata">Horchata</option>
						<option value="pepino con limon">Pepino con limón</option>
					</select>
				</div>
				<div class="specification__container">
					<div>
						<label class="specification__label"> Hielo </label>
						<select>
							<option value="hielo" selected>Hielo</option>
							<option value="s/hielo">Sin hielo</option>
							<option value="p/hielo">Poco hielo</option>
							<option value="m/hielo">Mucho hielo</option>
						</select>
					</div>				
					
					<div>
						<p class="prev-label">Previsualización de detalle</p>
						<div class="prev-detalle"></div>
					</div>
				</div>
				<div class="specification__buttons">
					<button type="button" class="btn btn-primary">Agregar detalle</button>
					<button type="button" class="btn btn-cancel" disabled>Eliminar producto</button>
				</div>
			</form>
  `
	section.innerHTML = html

	const form = section.querySelector('form')
	const arrow = section.querySelector('.arrow-down-sp')
	arrow.addEventListener('click', (e) => {
		e.preventDefault()
		arrow.classList.toggle('active')
		form.classList.toggle('active')
	})

	aguaFrescaContainer.appendChild(section)
	updateCountsProd(aguaFrescaContainer, 'Agua F.1L')
}

function genFormAguaFrescaMed() {
	const section = document.createElement('section')
	section.classList.add('section-sp')

	const html = `	
	<h3 class='prod-l'></h3>
	<a class="arrow-down-sp"> <img src="../../assets/icons/arrow-down.svg" alt="arrow down" /></a>
	<form class="specification__prod" data-form-id="${Date.now()}">
				<div class="specification__select">
					<p class="specification__prod-name">Agua fresca 1/2 L</p>
					<select>
						<option value="" disabled>Seleccionar</option>
						<option value="naranja" selected >Naranja</option>
						<option value="fresa">Fresa</option>
						<option value="horchata">Horchata</option>
						<option value="pepino con limon">Pepino con limón</option>
					</select>
				</div>
				<div class="specification__container">
					<div>
						<label class="specification__label"> Hielo </label>
						<select>
							<option value="hielo" selected>Hielo</option>
							<option value="s/hielo">Sin hielo</option>
							<option value="p/hielo">Poco hielo</option>
							<option value="m/hielo">Mucho hielo</option>
						</select>
					</div>				
					
					<div>
						<p class="prev-label">Previsualización de detalle</p>
						<div class="prev-detalle"></div>
					</div>
				</div>
				<div class="specification__buttons">
					<button type="button" class="btn btn-primary">Agregar detalle</button>
					<button type="button" class="btn btn-cancel" disabled>Eliminar producto</button>
				</div>
			</form>
  `
	section.innerHTML = html

	const form = section.querySelector('form')
	const arrow = section.querySelector('.arrow-down-sp')
	arrow.addEventListener('click', (e) => {
		e.preventDefault()
		arrow.classList.toggle('active')
		form.classList.toggle('active')
	})

	aguaFrescaMedContainer.appendChild(section)
	updateCountsProd(aguaFrescaMedContainer, 'Agua F.1/2')
}

// TODO ESCUCHADOR DE CONTENEDOR DE DETALLES
if (location.pathname.endsWith('/order.html')) {
	// Asignar el controlador de eventos al contenedor
	esquitesContainer.addEventListener('click', function (event) {
		if (event.target.classList.contains('btn-primary')) {
			const product = document.querySelector('.product[data-name="Esquite ch"]')
			const productName = product.dataset.name
			const btnDelete = event.target.nextElementSibling
			btnDelete.removeAttribute('disabled')
			const form = event.target.closest('form')
			enviarFormulario(event, form, productName)
			showAlert('Detalle agregado', 'exit')
		}

		if (event.target.classList.contains('btn-cancel')) {
			Swal.fire({
				title: '¿Estás seguro de eliminar el producto?',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Eliminar',
				cancelButtonText: 'Cancelar',
			}).then((result) => {
				if (result.isConfirmed) {
					const product = document.querySelector('.product[data-name="Esquite ch"]')
					const idProduct = parseInt(product.dataset.id)
					removeDetails(product, idProduct)
					const section = event.target.closest('.section-sp')
					const form = event.target.closest('form')
					const formId = form.dataset.formId
					section.remove()
					removeDetailsById(formId, 'Esquite ch')
					showAlert('Producto eliminado', 'exit')
				}
			})
		}
	})

	esquitesMedContainer.addEventListener('click', function (event) {
		if (event.target.classList.contains('btn-primary')) {
			const product = document.querySelector('.product[data-name="Esquite 1/2"]')
			const productName = product.dataset.name
			const btnDelete = event.target.nextElementSibling
			btnDelete.removeAttribute('disabled')
			const form = event.target.closest('form')
			enviarFormulario(event, form, productName)
			showAlert('Detalle agregado', 'exit')
		}

		if (event.target.classList.contains('btn-cancel')) {
			Swal.fire({
				title: '¿Estás seguro de eliminar el producto?',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Eliminar',
				cancelButtonText: 'Cancelar',
			}).then((result) => {
				if (result.isConfirmed) {
					const product = document.querySelector('.product[data-name="Esquite 1/2"]')
					const idProduct = parseInt(product.dataset.id)
					removeDetails(product, idProduct)
					const section = event.target.closest('.section-sp')
					const form = event.target.closest('form')
					const formId = form.dataset.formId
					section.remove()
					removeDetailsById(formId, 'Esquite 1/2')
					showAlert('Producto eliminado', 'exit')
				}
			})
		}
	})

	doriesquiteContainer.addEventListener('click', function (event) {
		if (event.target.classList.contains('btn-primary')) {
			const product = document.querySelector('.product[data-name="Doriesquite"]')
			const productName = product.dataset.name
			const btnDelete = event.target.nextElementSibling
			btnDelete.removeAttribute('disabled')
			const form = event.target.closest('form')
			enviarFormulario(event, form, productName)
			showAlert('Detalle agregado', 'exit')
		}

		if (event.target.classList.contains('btn-cancel')) {
			Swal.fire({
				title: '¿Estás seguro de eliminar el producto?',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Eliminar',
				cancelButtonText: 'Cancelar',
			}).then((result) => {
				if (result.isConfirmed) {
					const product = document.querySelector('.product[data-name="Doriesquite"]')
					const idProduct = parseInt(product.dataset.id)
					removeDetails(product, idProduct)
					const section = event.target.closest('.section-sp')
					const form = event.target.closest('form')
					const formId = form.dataset.formId
					section.remove()
					removeDetailsById(formId, 'Doriesquite')
					showAlert('Producto eliminado', 'exit')
				}
			})
		}
	})

	dorilocoContainer.addEventListener('click', function (event) {
		if (event.target.classList.contains('btn-primary')) {
			const product = document.querySelector('.product[data-name="Doriloco"]')
			const productName = product.dataset.name
			const btnDelete = event.target.nextElementSibling
			btnDelete.removeAttribute('disabled')
			const form = event.target.closest('form')
			enviarFormulario(event, form, productName)
			showAlert('Detalle agregado', 'exit')
		}

		if (event.target.classList.contains('btn-cancel')) {
			Swal.fire({
				title: '¿Estás seguro de eliminar el producto?',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Eliminar',
				cancelButtonText: 'Cancelar',
			}).then((result) => {
				if (result.isConfirmed) {
					const product = document.querySelector('.product[data-name="Doriloco"]')
					const idProduct = parseInt(product.dataset.id)
					removeDetails(product, idProduct)
					const section = event.target.closest('.section-sp')
					const form = event.target.closest('form')
					const formId = form.dataset.formId
					section.remove()
					removeDetailsById(formId, 'Doriloco')
					showAlert('Producto eliminado', 'exit')
				}
			})
		}
	})

	tostilocoContainer.addEventListener('click', function (event) {
		if (event.target.classList.contains('btn-primary')) {
			const product = document.querySelector('.product[data-name="Tostiloco"]')
			const productName = product.dataset.name
			const btnDelete = event.target.nextElementSibling
			btnDelete.removeAttribute('disabled')
			const form = event.target.closest('form')
			enviarFormulario(event, form, productName)
			showAlert('Detalle agregado', 'exit')
		}

		if (event.target.classList.contains('btn-cancel')) {
			Swal.fire({
				title: '¿Estás seguro de eliminar el producto?',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Eliminar',
				cancelButtonText: 'Cancelar',
			}).then((result) => {
				if (result.isConfirmed) {
					const product = document.querySelector('.product[data-name="Tostiloco"]')
					const idProduct = parseInt(product.dataset.id)
					removeDetails(product, idProduct)
					const section = event.target.closest('.section-sp')
					const form = event.target.closest('form')
					const formId = form.dataset.formId
					section.remove()
					removeDetailsById(formId, 'Tostiloco')
					showAlert('Producto eliminado', 'exit')
				}
			})
		}
	})

	fresasContainer.addEventListener('click', function (event) {
		if (event.target.classList.contains('btn-primary')) {
			const product = document.querySelector('.product[data-name="Fresas C.C"]')
			const productName = product.dataset.name
			const btnDelete = event.target.nextElementSibling
			btnDelete.removeAttribute('disabled')
			const form = event.target.closest('form')
			enviarFormulario(event, form, productName)
			showAlert('Detalle agregado', 'exit')
		}

		if (event.target.classList.contains('btn-cancel')) {
			Swal.fire({
				title: '¿Estás seguro de eliminar el producto?',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Eliminar',
				cancelButtonText: 'Cancelar',
			}).then((result) => {
				if (result.isConfirmed) {
					const product = document.querySelector('.product[data-name="Fresas C.C"]')
					const idProduct = parseInt(product.dataset.id)
					removeDetails(product, idProduct)
					const section = event.target.closest('.section-sp')
					const form = event.target.closest('form')
					const formId = form.dataset.formId
					section.remove()
					removeDetailsById(formId, 'Fresas C.C')
					showAlert('Producto eliminado', 'exit')
				}
			})
		}
	})

	fresasMedContainer.addEventListener('click', function (event) {
		if (event.target.classList.contains('btn-primary')) {
			const product = document.querySelector('.product[data-name="Fresas C.C 1/2"]')
			const productName = product.dataset.name
			const btnDelete = event.target.nextElementSibling
			btnDelete.removeAttribute('disabled')
			const form = event.target.closest('form')
			enviarFormulario(event, form, productName)
			showAlert('Detalle agregado', 'exit')
		}

		if (event.target.classList.contains('btn-cancel')) {
			Swal.fire({
				title: '¿Estás seguro de eliminar el producto?',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Eliminar',
				cancelButtonText: 'Cancelar',
			}).then((result) => {
				if (result.isConfirmed) {
					const product = document.querySelector('.product[data-name="Fresas C.C 1/2"]')
					const idProduct = parseInt(product.dataset.id)
					removeDetails(product, idProduct)
					const section = event.target.closest('.section-sp')
					const form = event.target.closest('form')
					const formId = form.dataset.formId
					section.remove()
					removeDetailsById(formId, 'Fresas C.C 1/2')
					showAlert('Producto eliminado', 'exit')
				}
			})
		}
	})

	gelatinaContainer.addEventListener('click', function (event) {
		if (event.target.classList.contains('btn-primary')) {
			const product = document.querySelector('.product[data-name="Gelatina C.D"]')
			const productName = product.dataset.name
			const btnDelete = event.target.nextElementSibling
			btnDelete.removeAttribute('disabled')
			const form = event.target.closest('form')
			enviarFormulario(event, form, productName)
			showAlert('Detalle agregado', 'exit')
		}

		if (event.target.classList.contains('btn-cancel')) {
			Swal.fire({
				title: '¿Estás seguro de eliminar el producto?',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Eliminar',
				cancelButtonText: 'Cancelar',
			}).then((result) => {
				if (result.isConfirmed) {
					const product = document.querySelector('.product[data-name="Gelatina C.D"]')
					const idProduct = parseInt(product.dataset.id)
					removeDetails(product, idProduct)
					const section = event.target.closest('.section-sp')
					const form = event.target.closest('form')
					const formId = form.dataset.formId
					section.remove()
					removeDetailsById(formId, 'Gelatina C.D')
					showAlert('Producto eliminado', 'exit')
				}
			})
		}
	})

	gelatinaMedContainer.addEventListener('click', function (event) {
		if (event.target.classList.contains('btn-primary')) {
			const product = document.querySelector('.product[data-name="Gelatina C.D 1/2"]')
			const productName = product.dataset.name
			const btnDelete = event.target.nextElementSibling
			btnDelete.removeAttribute('disabled')
			const form = event.target.closest('form')
			enviarFormulario(event, form, productName)
			showAlert('Detalle agregado', 'exit')
		}

		if (event.target.classList.contains('btn-cancel')) {
			Swal.fire({
				title: '¿Estás seguro de eliminar el producto?',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Eliminar',
				cancelButtonText: 'Cancelar',
			}).then((result) => {
				if (result.isConfirmed) {
					const product = document.querySelector('.product[data-name="Gelatina C.D 1/2"]')
					const idProduct = parseInt(product.dataset.id)
					removeDetails(product, idProduct)
					const section = event.target.closest('.section-sp')
					const form = event.target.closest('form')
					const formId = form.dataset.formId
					section.remove()
					removeDetailsById(formId, 'Gelatina C.D 1/2')
					showAlert('Producto eliminado', 'exit')
				}
			})
		}
	})

	manzanaContainer.addEventListener('click', function (event) {
		if (event.target.classList.contains('btn-primary')) {
			const product = document.querySelector('.product[data-name="Ensalada D.M"]')
			const productName = product.dataset.name
			const btnDelete = event.target.nextElementSibling
			btnDelete.removeAttribute('disabled')
			const form = event.target.closest('form')
			enviarFormulario(event, form, productName)
			showAlert('Detalle agregado', 'exit')
		}

		if (event.target.classList.contains('btn-cancel')) {
			Swal.fire({
				title: '¿Estás seguro de eliminar el producto?',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Eliminar',
				cancelButtonText: 'Cancelar',
			}).then((result) => {
				if (result.isConfirmed) {
					const product = document.querySelector('.product[data-name="Ensalada D.M"]')
					const idProduct = parseInt(product.dataset.id)
					removeDetails(product, idProduct)
					const section = event.target.closest('.section-sp')
					const form = event.target.closest('form')
					const formId = form.dataset.formId
					section.remove()
					removeDetailsById(formId, 'Ensalada D.M')
					showAlert('Producto eliminado', 'exit')
				}
			})
		}
	})

	manzanaMedContainer.addEventListener('click', function (event) {
		if (event.target.classList.contains('btn-primary')) {
			const product = document.querySelector('.product[data-name="Ensalada D.M 1/2"]')
			const productName = product.dataset.name
			const btnDelete = event.target.nextElementSibling
			btnDelete.removeAttribute('disabled')
			const form = event.target.closest('form')
			enviarFormulario(event, form, productName)
			showAlert('Detalle agregado', 'exit')
		}

		if (event.target.classList.contains('btn-cancel')) {
			Swal.fire({
				title: '¿Estás seguro de eliminar el producto?',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Eliminar',
				cancelButtonText: 'Cancelar',
			}).then((result) => {
				if (result.isConfirmed) {
					const product = document.querySelector('.product[data-name="Ensalada D.M 1/2"]')
					const idProduct = parseInt(product.dataset.id)
					removeDetails(product, idProduct)
					const section = event.target.closest('.section-sp')
					const form = event.target.closest('form')
					const formId = form.dataset.formId
					section.remove()
					removeDetailsById(formId, 'Ensalada D.M 1/2')
					showAlert('Producto eliminado', 'exit')
				}
			})
		}
	})

	gomiboingContainer.addEventListener('click', function (event) {
		if (event.target.classList.contains('btn-primary')) {
			const product = document.querySelector('.product[data-name="Gomiboing"]')
			const productName = product.dataset.name
			const btnDelete = event.target.nextElementSibling
			btnDelete.removeAttribute('disabled')
			const form = event.target.closest('form')
			enviarFormulario(event, form, productName)
			showAlert('Detalle agregado', 'exit')
		}

		if (event.target.classList.contains('btn-cancel')) {
			Swal.fire({
				title: '¿Estás seguro de eliminar el producto?',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Eliminar',
				cancelButtonText: 'Cancelar',
			}).then((result) => {
				if (result.isConfirmed) {
					const product = document.querySelector('.product[data-name="Gomiboing"]')
					const idProduct = parseInt(product.dataset.id)
					removeDetails(product, idProduct)
					const section = event.target.closest('.section-sp')
					const form = event.target.closest('form')
					const formId = form.dataset.formId
					section.remove()
					removeDetailsById(formId, 'Gomiboing')
					showAlert('Producto eliminado', 'exit')
				}
			})
		}
	})

	aguaFrescaContainer.addEventListener('click', function (event) {
		if (event.target.classList.contains('btn-primary')) {
			const product = document.querySelector('.product[data-name="Agua F.1L"]')
			const productName = product.dataset.name
			const btnDelete = event.target.nextElementSibling
			btnDelete.removeAttribute('disabled')
			const form = event.target.closest('form')
			enviarFormulario(event, form, productName)
			showAlert('Detalle agregado', 'exit')
		}

		if (event.target.classList.contains('btn-cancel')) {
			Swal.fire({
				title: '¿Estás seguro de eliminar el producto?',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Eliminar',
				cancelButtonText: 'Cancelar',
			}).then((result) => {
				if (result.isConfirmed) {
					const product = document.querySelector('.product[data-name="Agua F.1L"]')
					const idProduct = parseInt(product.dataset.id)
					removeDetails(product, idProduct)
					const section = event.target.closest('.section-sp')
					const form = event.target.closest('form')
					const formId = form.dataset.formId
					section.remove()
					removeDetailsById(formId, 'Agua F.1L')
					showAlert('Producto eliminado', 'exit')
				}
			})
		}
	})

	aguaFrescaMedContainer.addEventListener('click', function (event) {
		if (event.target.classList.contains('btn-primary')) {
			const product = document.querySelector('.product[data-name="Agua F.1/2"]')
			const productName = product.dataset.name
			const btnDelete = event.target.nextElementSibling
			btnDelete.removeAttribute('disabled')
			const form = event.target.closest('form')
			enviarFormulario(event, form, productName)
			showAlert('Detalle agregado', 'exit')
		}

		if (event.target.classList.contains('btn-cancel')) {
			Swal.fire({
				title: '¿Estás seguro de eliminar el producto?',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Eliminar',
				cancelButtonText: 'Cancelar',
			}).then((result) => {
				if (result.isConfirmed) {
					const product = document.querySelector('.product[data-name="Agua F.1/2"]')
					const idProduct = parseInt(product.dataset.id)
					removeDetails(product, idProduct)
					const section = event.target.closest('.section-sp')
					const form = event.target.closest('form')
					const formId = form.dataset.formId
					section.remove()
					removeDetailsById(formId, 'Agua F.1/2')
					showAlert('Producto eliminado', 'exit')
				}
			})
		}
	})
}
function removeDetailsById(id, prod) {
	const index = detalles.findIndex((det) => det.id === id)
	if (index !== -1) {
		detalles.splice(index, 1)
		if (prod === 'Esquite ch') {
			updateCountsProd(esquitesContainer, prod)
		}
		if (prod === 'Esquite 1/2') {
			updateCountsProd(esquitesMedContainer, prod)
		}
		if (prod === 'Doriesquite') {
			updateCountsProd(doriesquiteContainer, prod)
		}
		if (prod === 'Doriloco') {
			updateCountsProd(dorilocoContainer, prod)
		}
		if (prod === 'Tostiloco') {
			updateCountsProd(tostilocoContainer, prod)
		}
		if (prod === 'Fresas C.C') {
			updateCountsProd(fresasContainer, prod)
		}
		if (prod === 'Fresas C.C 1/2') {
			updateCountsProd(fresasMedContainer, prod)
		}
		if (prod === 'Gelatina C.D') {
			updateCountsProd(gelatinaContainer, prod)
		}
		if (prod === 'Gelatina C.D 1/2') {
			updateCountsProd(gelatinaMedContainer, prod)
		}
		if (prod === 'Ensalada D.M') {
			updateCountsProd(manzanaContainer, prod)
		}
		if (prod === 'Ensalada D.M 1/2') {
			updateCountsProd(manzanaMedContainer, prod)
		}
		if (prod === 'Gomiboing') {
			updateCountsProd(gomiboingContainer, prod)
		}
		if (prod === 'Agua F.1L') {
			updateCountsProd(aguaFrescaContainer, prod)
		}
		if (prod === 'Agua F.1/2') {
			updateCountsProd(aguaFrescaMedContainer, prod)
		}
		addDetailsArea()
	}
}

function updateCountsProd(container, nameProd) {
	const forms = Array.from(container.getElementsByClassName('specification__prod'))

	forms.forEach((form, index) => {
		const prodName = form.querySelector('.specification__prod-name')
		prodName.textContent = `${index + 1} ${nameProd}`
		const prodLabel = form.parentElement.querySelector('.prod-l')
		prodLabel.textContent = prodName.textContent
	})
}

// TODO FUNCION PARA REMOVER LOS PRODUCTOS DESDE DETALLES
function removeDetails(product, idProduct) {
	resetCustomerPayMoneyChange()

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

// TODO FUNCION PARA VOLVER A LA NORMALIDAD DE DETALLES
function resetDetallesContainer() {
	detalles = []
	orderDetails.textContent = ''
	esquitesContainer.textContent = ''
	esquitesMedContainer.textContent = ''
	doriesquiteContainer.textContent = ''
	dorilocoContainer.textContent = ''
	tostilocoContainer.textContent = ''
	fresasContainer.textContent = ''
	fresasMedContainer.textContent = ''
	gelatinaContainer.textContent = ''
	gelatinaMedContainer.textContent = ''
	manzanaContainer.textContent = ''
	manzanaMedContainer.textContent = ''
	gomiboingContainer.textContent = ''
	aguaFrescaContainer.textContent = ''
	aguaFrescaMedContainer.textContent = ''
}

function addProduct(e) {
	e.preventDefault()

	const product = e.target.closest('.product')
	readInfo(product)
	showPriceQuantity()
	createDataTable()
	totalPrice()
	disabledReceived()
	resetCustomerPayMoneyChange()
	disabledConfirmMoneyExchanges()
}

function resetCustomerPayMoneyChange() {
	customerPay.value = ''
	moneyExchanges.textContent = ''
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
	resetCustomerPayMoneyChange()

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
					if (prod.name === 'Esquite ch') {
						detalles = detalles.filter((det) => det.name !== 'Esquite ch')
						addDetailsArea()
						esquitesContainer.textContent = ''
					}
					if (prod.name === 'Esquite 1/2') {
						detalles = detalles.filter((det) => det.name !== 'Esquite 1/2')
						addDetailsArea()
						esquitesMedContainer.textContent = ''
					}
					if (prod.name === 'Doriesquite') {
						detalles = detalles.filter((det) => det.name !== 'Doriesquite')
						addDetailsArea()
						doriesquiteContainer.textContent = ''
					}
					if (prod.name === 'Doriloco') {
						detalles = detalles.filter((det) => det.name !== 'Doriloco')
						addDetailsArea()
						dorilocoContainer.textContent = ''
					}
					if (prod.name === 'Tostiloco') {
						detalles = detalles.filter((det) => det.name !== 'Tostiloco')
						addDetailsArea()
						tostilocoContainer.textContent = ''
					}
					if (prod.name === 'Fresas C.C') {
						detalles = detalles.filter((det) => det.name !== 'Fresas C.C')
						addDetailsArea()
						fresasContainer.textContent = ''
					}
					if (prod.name === 'Fresas C.C 1/2') {
						detalles = detalles.filter((det) => det.name !== 'Fresas C.C 1/2')
						addDetailsArea()
						fresasMedContainer.textContent = ''
					}
					if (prod.name === 'Gelatina C.D') {
						detalles = detalles.filter((det) => det.name !== 'Gelatina C.D')
						addDetailsArea()
						gelatinaContainer.textContent = ''
					}
					if (prod.name === 'Gelatina C.D 1/2') {
						detalles = detalles.filter((det) => det.name !== 'Gelatina C.D 1/2')
						addDetailsArea()
						gelatinaMedContainer.textContent = ''
					}
					if (prod.name === 'Ensalada D.M') {
						detalles = detalles.filter((det) => det.name !== 'Ensalada D.M')
						addDetailsArea()
						manzanaContainer.textContent = ''
					}
					if (prod.name === 'Ensalada D.M  1/2') {
						detalles = detalles.filter((det) => det.name !== 'Ensalada D.M 1/2')
						addDetailsArea()
						manzanaMedContainer.textContent = ''
					}
					if (prod.name === 'Gomiboing') {
						detalles = detalles.filter((det) => det.name !== 'Gomiboing')
						addDetailsArea()
						gomiboingContainer.textContent = ''
					}
					if (prod.name === 'Agua F.1L') {
						detalles = detalles.filter((det) => det.name !== 'Agua F.1L')
						addDetailsArea()
						aguaFrescaContainer.textContent = ''
					}
					if (prod.name === 'Agua F.1/2') {
						detalles = detalles.filter((det) => det.name !== 'Agua F.1/2')
						addDetailsArea()
						aguaFrescaMedContainer.textContent = ''
					}
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
	arrowSpecification.addEventListener('click', (e) => {
		e.target.classList.toggle('active')
		specificationContainer.classList.toggle('desplegable-container-active')
	})
}

export function showProductsHtml() {
	if (JSON.parse(localStorage.getItem('products'))) {
		showProducts()
	}
}

//TODO Created indexed Db
let db

if (location.pathname.endsWith('/order.html')) {
	const indexedDB = window.indexedDB

	const request = indexedDB.open('customerOrders', 1)

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
}

function addOrder(order) {
	const transaction = db.transaction(['orders'], 'readwrite')
	const objectStore = transaction.objectStore('orders')
	const request = objectStore.add(order)

	request.onsuccess = () => {
		showAlert('Orden completada con éxito', 'exit')
		volverNormalidad()
		resetDetallesContainer()
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
	resetCustomerPayMoneyChange()
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

const URLPlugin = 'http://localhost:8000'
if (location.pathname.endsWith('/order.html')) {
	sinTicketBtn.addEventListener('click', function () {
		const fechaActual = obtenerFechaActual()
		order.date = `${fechaActual.dia} de ${fechaActual.mes} de ${fechaActual.anio} ${fechaActual.horas}:${fechaActual.minutos}`
		order.products = products
		order.total = totalGlobal
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

		const fechaActual = obtenerFechaActual()
		order.date = `${fechaActual.dia} de ${fechaActual.mes} de ${fechaActual.anio} ${fechaActual.horas}:${fechaActual.minutos}`
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
		' SUBTOTAL'.padEnd(maxPtLength, ' ')
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
			title: 'Para eliminar la orden, por favor confirma tu elección.',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Eliminar orden',
			cancelButtonText: 'Cancelar',
		}).then((result) => {
			if (result.isConfirmed) {
				volverNormalidad()
				resetDetallesContainer()
				showAlert('La orden ha sido eliminada exitosamente.', 'exit')
			}
		})
	})
}

// TODO LIST ORDERS

if (location.pathname.endsWith('/order.html')) {
	btnShowOrder.addEventListener('click', (e) => {
		e.preventDefault()
		sectionOder.classList.add('order-visible')
		tomarPedido.classList.add('pedido-desabilitado')
		readData()
		disabledBtn()
	})

	btnRegresar.addEventListener('click', (e) => {
		e.preventDefault()
		sectionOder.classList.remove('order-visible')
		tomarPedido.classList.remove('pedido-desabilitado')
	})

	btnDel.addEventListener('click', function () {
		Swal.fire({
			title: 'Advertencia!',
			html:
				'Por favor, tenga en cuenta que al eliminar las órdenes, <strong style="color:#C62828">se borrarán los registros de ventas totales</strong>. Le recomendamos que descargue y guarde el informe de ventas antes de proceder con la eliminación',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Entiendo, deseo continuar',
			cancelButtonText: 'Cancelar',
		}).then((result) => {
			if (result.isConfirmed) {
				document.getElementById('passwordModal').style.display = 'block'

				const closeBtn = document.getElementsByClassName('close')[0]
				addEventListener('click', function (event) {
					if (event.target === modal) {
						modal.style.display = 'none'
					}
				})
				const modal = document.getElementById('passwordModal')

				closeBtn.addEventListener('click', function () {
					modal.style.display = 'none'
				})

				// Obtener la contraseña ingresada al hacer clic en el botón de enviar
				document.getElementById('submitBtn').addEventListener('click', function () {
					const input = document.getElementById('passwordInput')
					const password = document.getElementById('passwordInput').value
					if (password === 'tatis') {
						Swal.fire({
							icon: 'success',
							title: '¡Las órdenes han sido borradas del sistema!',
							showConfirmButton: false,
							timer: 1500,
						})

						modal.style.display = 'none'

						const request = indexedDB.deleteDatabase('customerOrders')
						setTimeout(() => {
							location.reload()
						}, 1510)

						request.onerror = (event) => {
							alert('Error al eliminar la base de datos:', event.target.error)
						}
					} else {
						const alert = document.createElement('P')
						alert.classList.add('error-modal')
						alert.textContent = 'Contraseña incorrecta'
						input.after(alert)
						setTimeout(() => {
							alert.remove()
						}, 2000)
					}
				})
			}
		})
	})
}

function readData() {
	const transaction = db.transaction(['orders'], 'readonly')
	const objectStore = transaction.objectStore('orders')
	const request = objectStore.openCursor()
	const fragment = document.createDocumentFragment()

	request.onsuccess = (e) => {
		const cursor = e.target.result
		if (cursor) {
			const wrapperOrder = document.createElement('SECTION')
			const arrowIcon = document.createElement('A')
			const img = document.createElement('IMG')
			const order = document.createElement('DIV')
			const date = document.createElement('P')
			const customerLabel = document.createElement('P')
			const customer = document.createElement('P')
			const table = document.createElement('TABLE')
			const thead = document.createElement('THEAD')
			const tbody = document.createElement('TBODY')
			const tfoot = document.createElement('TFOOT')
			const infoTitle = document.createElement('P')
			const infoDescription = document.createElement('DIV')
			const payCustomer = document.createElement('P')
			const moneyExchanges = document.createElement('P')

			wrapperOrder.classList.add('wrapper-order')
			wrapperOrder.dataset.customer = cursor.value.customer
			arrowIcon.classList.add('arrow-down-order')
			arrowIcon.addEventListener('click', accordeon)
			img.setAttribute('src', '../../assets/icons/arrow-down.svg')
			img.setAttribute('alt', 'arrow down')
			order.classList.add('order')
			date.classList.add('order__date')

			date.textContent = cursor.value.date

			customerLabel.classList.add('order__customer-label')
			customerLabel.textContent = 'Cliente:'
			customer.classList.add('order__customer')
			customer.textContent = cursor.value.customer

			let productos = []
			cursor.value.products.forEach((prod) => {
				productos.push(prod)
				const tr = document.createElement('TR')
				const tdProd = document.createElement('TD')
				const tdPu = document.createElement('TD')
				const tdQuant = document.createElement('TD')
				const tdPt = document.createElement('TD')

				tdProd.textContent = prod.name
				tdPu.textContent = `$${prod.priceUnit}`
				tdQuant.textContent = prod.quantity
				tdPt.textContent = `$${prod.price}`

				tr.append(tdProd, tdPu, tdQuant, tdPt)
				tbody.append(tr)
			})

			const tdTfoot = document.createElement('TD')
			tdTfoot.setAttribute('colspan', '4')
			tdTfoot.textContent = `Total: $${cursor.value.total}`

			infoTitle.classList.add('order__info-title')
			infoTitle.textContent = 'Información adicional'
			infoDescription.classList.add('order__info-description')
			infoDescription.textContent = cursor.value.adicionalInfo

			payCustomer.textContent = `Pago del cliente: $${cursor.value.receivedBill}`
			moneyExchanges.textContent = `Cambio: $${cursor.value.moneyChange}`

			arrowIcon.append(img)
			thead.innerHTML = `
		  <tr>
			<th>PROD</th>
			<th>PU</th>
			<th>CAN</th>
			<th>PT</th>
		  </tr>
				  `
			const btnTicket = document.createElement('DIV')
			btnTicket.classList.add('btn', 'btn-primary', 'ticket-order')
			btnTicket.textContent = 'Ticket'

			const ticketModal = document.createElement('DIV')
			ticketModal.classList.add('modal')
			const modalContent = document.createElement('DIV')
			modalContent.classList.add('modal-content', 'modal-content-ticket')

			const h2 = document.createElement('H2')
			h2.textContent = 'Imprimir ticket'
			const label = document.createElement('LABEL')
			label.textContent = 'Dirección MAC:'
			const inputMac = document.createElement('INPUT')
			inputMac.setAttribute('type', 'text')
			inputMac.dataset.idLicencia = ''
			inputMac.classList.add('input-mac')
			inputMac.setAttribute('placeholder', 'Ejemplo: 00:11:22:33:44:55')
			inputMac.setAttribute('value', '66:32:ED:C8:E2:59')
			inputMac.setAttribute('disabled', 'true')
			const div = document.createElement('DIV')
			div.classList.add('control')
			div.setAttribute('hidden', 'true')
			const inputLicencia = document.createElement('INPUT')
			inputLicencia.dataset.idLicencia = ''
			inputLicencia.classList.add('input')
			inputLicencia.setAttribute('placeholder', 'Licencia si es que cuentas con ella')
			div.append(inputLicencia)
			const printTicket = document.createElement('BUTTON')
			printTicket.classList.add('btn', 'btn-primary', 'print-ticket-btn')
			printTicket.textContent = 'Imprimir ticket'
			const cancelTicket = document.createElement('BUTTON')
			cancelTicket.classList.add('btn', 'btn-danger', 'print-cancel-btn')
			cancelTicket.textContent = 'Cancelar'

			modalContent.append(h2, label, inputMac, div, printTicket, cancelTicket)
			ticketModal.append(modalContent)

			tfoot.append(tdTfoot)
			table.append(thead, tbody, tfoot)
			order.append(
				date,
				customerLabel,
				customer,
				table,
				infoTitle,
				infoDescription,
				payCustomer,
				moneyExchanges,
				btnTicket,
				ticketModal
			)

			btnTicket.addEventListener('click', () => {
				ticketModal.style.display = 'block'
			})

			const orderData = {
				date: cursor.value.date,
				customer: cursor.value.customer,
				products: productos,
				adicionalInfo: cursor.value.adicionalInfo,
				total: cursor.value.total,
				receivedBill: cursor.value.receivedBill,
				moneyChange: cursor.value.moneyChange,
			}

			printTicket.addEventListener('click', () => {
				const direccionMacDeLaImpresora = inputMac.value
				const licencia = inputLicencia.value
				ticketModal.style.display = 'none'
				imprimirTicketOrder(direccionMacDeLaImpresora, licencia, orderData)
			})
			cancelTicket.addEventListener('click', () => {
				ticketModal.style.display = 'none'
			})

			wrapperOrder.append(arrowIcon, order)
			fragment.append(wrapperOrder)

			cursor.continue() // Avanzar al siguiente registro
		} else {
			ordersContainer.textContent = ''
			ordersContainer.append(fragment)
			disabledBtn()
		}
	}
}

function disabledBtn() {
	if (ordersContainer.textContent === '') {
		btnDel.setAttribute('disabled', true)
	}

	if (ordersContainer.textContent !== '') {
		btnDel.removeAttribute('disabled')
	}
}

const imprimirTicketOrder = async (macImpresora, licencia, order) => {
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
		' SUBTOTAL'.padEnd(maxPtLength, ' ')
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

function accordeon(e) {
	e.preventDefault()

	const element = e.target
	const isActive = element.classList.contains('active')
	const offset = -240

	const order = element.nextElementSibling
	order.classList.toggle('order-active')

	const isMobile = window.matchMedia('(max-width: 959px)').matches

	if (!isActive && isMobile) {
		order.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		})

		const elementOffset = window.pageYOffset - offset
		window.scrollTo({
			top: elementOffset,
			behavior: 'smooth',
		})
	}

	element.classList.toggle('active')
}
