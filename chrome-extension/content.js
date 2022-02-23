$(document).ready(function () {
	chrome.extension.onRequest.addListener(function (request, sender, responseCallback) {
		if (request.action !== "getInfo") {
			alert("not implemented yet. maybe never.");
		}
		if (location.host === "www.sahibinden.com") {
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
			let from = infos[19].innerText;
			let link = location.href;
			let ownership = infos[18].innerText;

			responseCallback({
				neighborhood: neighborhood,
				price: price,
				face: face,
				floor: floor,
				room: room,
				area: area,
				age: age,
				from: from,
				link: link,
				ownership: ownership
			});
		} else if (location.host === "www.hurriyetemlak.com") {
			let neighborhood = $('.det-title-bottom .short-info-list li')[2].innerText + " Mh.";
			let price = $('.det-title-upper .right p')[0].innerText;

			let infos = $('.adv-info-list li');

			let face = '';
			$(infos[19]).find('div span').each(function () {
				face += this.innerText;
			});
			face = face.replace(',', '').replace(' ', '');

			let floor = infos[6].innerText.split('\n')[1].replace('. Kat', '') + " / " + infos[9].innerText.split('\n')[1].replace(' Katlı', '');
			let room = infos[4].innerText.split('\n')[1];

			let areaInfos = infos[5].innerText.split('\n')[1].split('/');
			let area = areaInfos[1].replace(' m2', '') + " / " + areaInfos[0].replace(' m2', '');

			let age = infos[7].innerText.split('\n')[1];
			let from = "N/A";
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
		}
	});
});
