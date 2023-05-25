import { request } from '../order/order.js'
import { ConectorEscposAndroid } from '../tickets/ConectorEscposAndroid.js'
const ordersContainer = document.getElementById('orders-container')
const body = document.getElementById('bodyTicket')

const btnDel = document.getElementById('orders-deleted')

const URLPlugin = 'http://localhost:8000'

function disabledBtn() {
	if (ordersContainer.textContent === '') {
		btnDel.setAttribute('disabled', true)
	}

	if (ordersContainer.textContent !== '') {
		btnDel.removeAttribute('disabled')
	}
}

let db

if (location.pathname.endsWith('orders-list.html')) {
	request.onsuccess = (e) => {
		db = e.target.result
		readData()
		disabledBtn()
	}

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
							console.log('Error al eliminar la base de datos:', event.target.error)
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

	request.onerror = (event) => {
		Swal.fire({
			icon: 'error',
			title: '¡Error!',
			text: `Ha ocurrido un error inesperado ${event.target.error}`,
			confirmButtonText: 'Aceptar',
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
				arrowIcon.classList.add('arrow-down')
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
					imprimirTicket(direccionMacDeLaImpresora, licencia, orderData)
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

	const imprimirTicket = async (macImpresora, licencia, order) => {
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
				alertExit('Ticket exitoso')
			} else {
				alert('Error: ' + respuesta)
			}
		} catch (e) {
			alert('Error imprimiendo: ' + e.message)
		}
	}

	function alertExit(msg) {
		const alert = document.createElement('DIV')
		alert.classList.add('order-exit')
		alert.textContent = msg
		body.append(alert)
		setTimeout(() => {
			alert.remove()
		}, 1300)
	}

	function accordeon(e) {
		e.preventDefault()

		e.target.classList.toggle('active')

		const order = e.target.nextElementSibling
		order.classList.toggle('order-active')
	}
}
