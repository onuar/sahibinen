$(document).ready(function () {

	// alert(location.href);

	chrome.tabs.getSelected(null, function (tab) {
		chrome.tabs.sendRequest(tab.id, { action: "getInfo" },
			function (response) {
				$("#neighborhood").val(response.neighborhood);
				$("#price").val(response.price);
				$("#face").val(response.face);
				$("#floor").val(response.floor);
				$("#room").val(response.room);
				$("#area").val(response.area);
				$("#age").val(response.age);
				$("#from").val(response.from);
				$("#link").val(response.link);
			});
	});

	$("#send").click(function () {
		const path = `http://localhost:3012/${encodeURIComponent($('#neighborhood').val())}`;
		const request = {
			"price": $('#price').val(),
			"face": $('#face').val(),
			"floor": $('#floor').val(),
			"room": $('#room').val(),
			"area": $('#area').val(),
			"age": $('#age').val(),
			"from": $('#from').val(),
			"link": $('#link').val()
		};

		$.ajax({
			data: request,
			type: "POST",
			url: path,
			contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
			timeout: 10000,
			dataType: "json",
			success: function (data, status) {
				alert(status);
			},
			error: function (xhr, status, errorMessage) {
				alert(`${status} - ${errorMessage}`);
			}
		});
	});
});
