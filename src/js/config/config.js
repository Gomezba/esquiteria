import { formInput } from '../selectors/selectors.js'

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
