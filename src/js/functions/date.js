// export const fecha = new Date()
// export const dia = fecha.getDate()
// export const mes = obtenerNombreMes(fecha.getMonth())
// export const anio = fecha.getFullYear()
// export const horas = fecha.getHours()
// export const minutos = fecha.getMinutes()

// export function obtenerNombreMes(numeroMes) {
// 	const meses = [
// 		'enero',
// 		'febrero',
// 		'marzo',
// 		'abril',
// 		'mayo',
// 		'junio',
// 		'julio',
// 		'agosto',
// 		'septiembre',
// 		'octubre',
// 		'noviembre',
// 		'diciembre',
// 	]

// 	return meses[numeroMes]
// }

export function obtenerFechaActual() {
	const fecha = new Date()
	const dia = fecha.getDate()
	const mes = obtenerNombreMes(fecha.getMonth())
	const anio = fecha.getFullYear()
	const horas = fecha.getHours()
	const minutos = fecha.getMinutes()

	return { dia, mes, anio, horas, minutos }
}

function obtenerNombreMes(numeroMes) {
	const meses = [
		'enero',
		'febrero',
		'marzo',
		'abril',
		'mayo',
		'junio',
		'julio',
		'agosto',
		'septiembre',
		'octubre',
		'noviembre',
		'diciembre',
	]

	return meses[numeroMes]
}
