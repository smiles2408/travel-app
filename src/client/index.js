
import { performAction } from './js/app'

import './styles/style.scss'

export {
    performAction
}



window.addEventListener("DOMContentLoaded", (e) => {
	// get reference to the form element
	const form = document.getElementById("form");
	// Add submit event listener on this form
	form.addEventListener("submit", handleSubmit);
});