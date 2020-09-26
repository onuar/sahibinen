$(document).ready(function () {
	chrome.extension.onRequest.addListener(function (request, sender, responseCallback) {
		if (request.action === "getInfo") {
			let infos = $('.classifiedInfo li span');

			let neighborhood = $('.classifiedInfo h2 a')[2].innerText;
			let price = $('.classifiedInfo h3')[0].innerText;

			let face = '';
			$($('.classifiedDescription ul:eq(0) .selected')).each(function () {
				face += this.innerText;
			});

			let floor = infos[7].innerText + ' / ' + infos[8].innerText;
			let room = infos[5].innerText;
			let area = infos[4].innerText + ' / ' + infos[3].innerText;
			let age = infos[6].innerText;
			let from = infos[17].innerText;
			let link = location.href;
			responseCallback({
				neighborhood: neighborhood,
				price: price,
				face: face,
				floor: floor,
				room: room,
				area: area,
				age: age,
				from: from,
				link: link
			});
		} else {
			alert("not implemented");
		}
	});
});
