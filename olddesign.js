if (!!!document.getElementById("uploadToast")) {
	$('<div id="uploadToast" style="display: block; min-width: 250px; margin-left: -125px; background-color: black; color: #fff; text-align: center; border-radius: 2px; padding: 16px; position: fixed; z-index: 1; left: 50%; top: 50px;">Preparing everything</div>').appendTo(document.body);
	if (window.location.hostname === "scratch.mit.edu") {
		if (document.getElementById('report-this') === null) {
			$('<input type="file" id="uploadPicker" style="display: none;" accept="image/*">').appendTo(document.body);
			document.getElementById("uploadPicker").addEventListener("change", function () {
				var reader1 = new FileReader();
				reader1.readAsDataURL(document.getElementById('uploadPicker').files[0]);
				reader1.onload = function () {
					var reader = new FileReader();
					reader.onload = function (e) {
						document.getElementById("uploadToast").innerHTML = "Starting upload";
						$.ajax({
							type: "POST",
							url: "/internalapi/project/thumbnail/" + Scratch.INIT_DATA.PROJECT.model.id + "/set/",
							data: e.target.result,
							contentType: "",
							processData: false,
							xhr: function () {
								var xhr = $.ajaxSettings.xhr();
								xhr.upload.onprogress = function (e) {
									document.getElementById("uploadToast").innerHTML = "Uploading file " + Math.floor(e.loaded / e.total * 100) + "%";
								};
								return xhr;
							},
							success: function () {
								document.getElementById("uploadToast").innerHTML = 'The thumbnail was successfully changed.<br><img onclick="location.href=\'mystuff\'" title="Click me to show this project in My Stuff" src="' + reader1.result + '" style="background-color:white;height:120px;width:160px;"><br><a onclick="document.getElementById(\'uploadPicker\').click();">Select another image</a><br><a onclick="document.getElementById(\'uploadToast\').style.display=\'none\';">Close</a>';
							},
							error: function () {
								document.getElementById("uploadToast").innerHTML = 'Error: try again or try with a smaller image.<br><a onclick="document.getElementById(\'uploadPicker\').click();">Select another image</a><br><a onclick="document.getElementById(\'uploadToast\').style.display=\'none\';">Close</a>';
							}
						});
					};
					reader.readAsArrayBuffer(document.getElementById('uploadPicker').files[0]);
				};
				document.getElementById("uploadToast").innerHTML = "Reading your image";
			});
			document.getElementById("uploadPicker").click();
			document.getElementById("uploadToast").innerHTML = "Waiting for file";
		} else {
			document.getElementById("uploadToast").innerHTML = "This project is not yours! You can only change the thumbnail of one of your projects. :)";
		}
	} else {
		document.getElementById("uploadToast").innerHTML = "You can only use this code in Scratch :)";
	}
} else {
	document.getElementById("uploadToast").style.display = "block";
}
