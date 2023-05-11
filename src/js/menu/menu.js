import { hamburgerIcon, menu, main } from '../selectors/selectors.js'

export function menuToggle() {
	hamburgerIcon.addEventListener('click', () => {
		menu.classList.toggle('is-active')
		console.log('diste click')

		main.addEventListener('click', () => {
			menu.classList.remove('is-active')
		})
	})
}
