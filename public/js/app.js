import { teamsList } from './teamsList.js';
import { generateTableBody } from './generateTeamList.js';

// Document ready function
document.addEventListener('DOMContentLoaded', function (event) {
	generateTableBody(teamsList);
	$(function () {
		$('[data-bs-toggle="popover"]').popover();
	})

	var alertPlaceholder = document.getElementById('liveAlertPlaceholder');
	var alertTrigger = document.getElementById('liveAlertBtn');

	function alert(message, type) {
		var wrapper = document.createElement('div')
		wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

		if (alertPlaceholder.hasChildNodes()) {
			alertPlaceholder.removeChild(alertPlaceholder.firstChild);
			alertPlaceholder.appendChild(wrapper);
		}
		else {
			alertPlaceholder.appendChild(wrapper);
		}
	}

	$('.delete-team').on('click', function () {
		$('#exampleModal').modal('show');
		let teamName = $(this).data('name');
		if (alertTrigger) {
			alertTrigger.addEventListener('click', function (e) {
				alert(`You just deleted the team: ${teamName}`, 'success');
			})
		}
	})

})