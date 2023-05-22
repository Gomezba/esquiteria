export const fecha = new Date()
export const dia = fecha.getDate()
export const mes = obtenerNombreMes(fecha.getMonth())
export const anio = fecha.getFullYear()
export const horas = fecha.getHours()
export const minutos = fecha.getMinutes()

export function obtenerNombreMes(numeroMes) {
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
