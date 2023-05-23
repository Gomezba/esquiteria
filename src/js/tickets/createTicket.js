if (location.pathname.endsWith('/order.html')) {
	document.addEventListener('DOMContentLoaded', async () => {
		// const URLPlugin = 'http://localhost:8000' // Si el plugin no está en local, coloca la IP. Por ejemplo 192.168.1.76:8000
		// const $btnImprimir = document.querySelector('#imprimirTicketBtn'),
		// 	$licencia = document.querySelector('#licencia'),
		// 	$impresora = document.querySelector('#impresora')
		// $btnImprimir.addEventListener('click', () => {
		// 	const direccionMacDeLaImpresora = $impresora.value
		// 	const licencia = $licencia.value
		// 	if (!direccionMacDeLaImpresora) {
		// 		return alert('Por favor escribe la MAC de la impresora')
		// 	}
		// 	demostrarCapacidades(direccionMacDeLaImpresora, licencia)
		// })
		// const demostrarCapacidades = async (macImpresora, licencia) => {
		// 	const conector = new ConectorEscposAndroid(licencia, URLPlugin)
		// 	conector
		// 		.Iniciar()
		// 		.EstablecerAlineacion(ConectorEscposAndroid.ALINEACION_CENTRO)
		// 		.DescargarImagenDeInternetEImprimir('http://assets.stickpng.com/thumbs/587e32259686194a55adab73.png', 0, 216)
		// 		.Iniciar() // En mi impresora debo invocar a "Iniciar" después de imprimir una imagen
		// 		.EstablecerAlineacion(ConectorEscposAndroid.ALINEACION_CENTRO)
		// 		.Feed(1)
		// 		.EscribirTexto("Parzibyte's blog\n")
		// 		.EscribirTexto('Blog de un programador\n')
		// 		.EscribirTexto('Teléfono: 123456798\n')
		// 		.EscribirTexto('Fecha y hora: ' + new Intl.DateTimeFormat('es-MX').format(new Date()))
		// 		.Feed(1)
		// 		.EstablecerAlineacion(ConectorEscposAndroid.ALINEACION_IZQUIERDA)
		// 		.EscribirTexto('____________________\n')
		// 		.EscribirTexto('Venta de plugin para impresoras térmicas Bluetooth con Android (1 mes)\n')
		// 		.EstablecerAlineacion(ConectorEscposAndroid.ALINEACION_DERECHA)
		// 		.EscribirTexto('$7.00\n')
		// 		.EscribirTexto('____________________\n')
		// 		.EscribirTexto('TOTAL: $7.00\n')
		// 		.EscribirTexto('____________________\n')
		// 		.EstablecerAlineacion(ConectorEscposAndroid.ALINEACION_CENTRO)
		// 		.EstablecerEnfatizado(true)
		// 		.EstablecerTamañoFuente(1, 1)
		// 		.EscribirTexto('¡Gracias por su compra!\n')
		// 		.Feed(1)
		// 		.ImprimirCodigoDeBarras('qr', 'https://parzibyte.me/blog', ConectorEscposAndroid.TAMAÑO_IMAGEN_NORMAL, 160, 160)
		// 		.Iniciar()
		// 		.EstablecerAlineacion(ConectorEscposAndroid.ALINEACION_CENTRO)
		// 		.Feed(1)
		// 		.ImprimirCodigoDeBarras('code128', 'parzibyte.me', ConectorEscposAndroid.TAMAÑO_IMAGEN_NORMAL, 320, 50)
		// 		.Iniciar()
		// 		.EstablecerAlineacion(ConectorEscposAndroid.ALINEACION_CENTRO)
		// 		.Feed(1)
		// 		.EstablecerTamañoFuente(1, 1)
		// 		.EscribirTexto('parzibyte.me\n')
		// 		.Feed(2)
		// 		.Corte(1)
		// 		.Pulso(48, 60, 120)
		// 	try {
		// 		const respuesta = await conector.imprimirEn(macImpresora)
		// 		if (respuesta === true) {
		// 			alert('Impreso correctamente')
		// 		} else {
		// 			alert('Error: ' + respuesta)
		// 		}
		// 	} catch (e) {
		// 		alert('Error imprimiendo: ' + e.message)
		// 	}
		// }
		// const URLPlugin = 'http://localhost:8000' // Si el plugin no está en local, coloca la IP. Por ejemplo 192.168.1.76:8000
		// const $btnImprimir = document.querySelector('#imprimirTicketBtn'),
		// 	$licencia = document.querySelector('#licencia'),
		// 	$impresora = document.querySelector('#impresora')
		// $btnImprimir.addEventListener('click', () => {
		// 	const direccionMacDeLaImpresora = $impresora.value
		// 	const licencia = $licencia.value
		// 	if (!direccionMacDeLaImpresora) {
		// 		return alert('Por favor escribe la MAC de la impresora')
		// 	}
		// 	imprimirTicket(direccionMacDeLaImpresora, licencia)
		// })
		// const imprimirTicket = async (macImpresora, licencia) => {
		// 	const conector = new ConectorEscposAndroid(licencia, URLPlugin)
		// 	conector
		// 		.Iniciar()
		// 		.EstablecerAlineacion(ConectorEscposAndroid.ALINEACION_CENTRO)
		// 		// .DescargarImagenDeInternetEImprimir('http://assets.stickpng.com/thumbs/587e32259686194a55adab73.png', 0, 216)
		// 		.Iniciar() // En mi impresora debo invocar a "Iniciar" después de imprimir una imagen
		// 		.EstablecerAlineacion(ConectorEscposAndroid.ALINEACION_CENTRO)
		// 		.Feed(1)
		// 		.EstablecerAlineacion(ConectorEscposAndroid.ALINEACION_IZQUIERDA)
		// 		.EscribirTexto('Fecha: ' + order.date + '\n')
		// 		.EscribirTexto('Cliente: ' + order.customer + '\n')
		// 	// .Feed(1)
		// 	// .EstablecerAlineacion(ConectorEscposAndroid.ALINEACION_CENTRO)
		// 	// .EscribirTexto('Detalles del pedido:\n')
		// 	order.productos.forEach((producto) => {
		// 		conector
		// 			.EstablecerAlineacion(ConectorEscposAndroid.ALINEACION_IZQUIERDA)
		// 			.EscribirTexto('Nombre: ' + producto.name + '\n')
		// 			.EscribirTexto('Precio unitario: ' + producto.priceUnit + '\n')
		// 			.EscribirTexto('Cantidad: ' + producto.quantity + '\n')
		// 			.EscribirTexto('Precio: ' + producto.price + '\n')
		// 			.Feed(1)
		// 	})
		// 	conector
		// 		// .EstablecerAlineacion(ConectorEscposAndroid.ALINEACION_CENTRO)
		// 		// .EscribirTexto('Detalles: ' + ticketData.detalles + '\n')
		// 		// .Feed(1)
		// 		.EstablecerAlineacion(ConectorEscposAndroid.ALINEACION_IZQUIERDA)
		// 		// .EscribirTexto('Total: ' + order.total + '\n')
		// 		.EscribirTexto('Total: ' + order.total + '\n')
		// 		.EscribirTexto('Recibo: ' + order.receivedBill + '\n')
		// 		.EscribirTexto('Cambio: ' + order.moneyChange + '\n')
		// 		.Feed(2)
		// 		.Corte(1)
		// 		.Pulso(48, 60, 120)
		// 	try {
		// 		const respuesta = await conector.imprimirEn(macImpresora)
		// 		if (respuesta === true) {
		// 			alert('Impreso correctamente')
		// 		} else {
		// 			alert('Error: ' + respuesta)
		// 		}
		// 	} catch (e) {
		// 		alert('Error imprimiendo: ' + e.message)
		// 	}
		// }
	})
}
