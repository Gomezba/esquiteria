import { hamburgerIcon, menu, main } from '../selectors/selectors.js'

export function menuToggle() {
	hamburgerIcon.addEventListener('click', () => {
		menu.classList.toggle('is-active')

		main.addEventListener('click', () => {
			menu.classList.remove('is-active')
		})
	})
}
