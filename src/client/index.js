
import { performAction } from './js/app';
import { countdownTraveldate } from './js/travelcountdown';

import './styles/style.scss';

export {
    performAction
}



window.addEventListener("DOMContentLoaded", (e) => {
	// get reference to the form element
	const form = document.getElementById("app");
	// Add submit event listener on this form ,prevent the default action of the form and then call the function performAction().
	form.addEventListener("submit", function(e){
		e.preventDefault();
	    performAction();
	});
	
});