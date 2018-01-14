if (!!!document.getElementById("uploadToast")) {
	$('<div id="uploadToast" style="padding: 5px 10px;background-color: #f9dcb5;color: #a56100;font-weight: 700;margin-top: -8px;margin-bottom: 8px!important;-moz-border-radius: 5px;-webkit-border-radius: 5px;border-radius: 3px;border: 1px solid #fcc57b;text-shadow: 0 1px 0 rgba(255,255,255,0.5);line-height: 25px;"><span id="uploadText">Preparing everything</span><div style="float: right;"><input id="updateSelect" value="Select Another Image" type="hidden" class="button small grey" onclick="document.getElementById(\'uploadPicker\').click();" style="line-height: 0;padding: 8px 10px;"><input onclick="document.getElementById(\'uploadToast\').style.display=\'none\';" style="line-height: 0;padding: 8px 10px;" type="hidden" id="updateClose" class="button small grey" value="Close"></div></div>').appendTo(document.getElementById("content"));
	if (window.location.hostname === "scratch.mit.edu") {
		if (document.getElementById('report-this') === null) {
			$('<input type="file" id="uploadPicker" style="display: none;" accept="image/*">').appendTo(document.body);
			document.getElementById("uploadPicker").addEventListener("change", function () {
				var reader1 = new FileReader();
				reader1.readAsDataURL(document.getElementById('uploadPicker').files[0]);
				reader1.onload = function () {
					var reader = new FileReader();
					reader.onload = function (e) {
						document.getElementById("uploadText").innerHTML = "Starting upload";
						$.ajax({
							type: "POST",
							url: "/internalapi/project/thumbnail/" + Scratch.INIT_DATA.PROJECT.model.id + "/set/",
							data: e.target.result,
							contentType: "",
							processData: false,
							xhr: function () {
								var xhr = $.ajaxSettings.xhr();
								xhr.upload.onprogress = function (e) {
									document.getElementById("uploadText").innerHTML = "Uploading file " + Math.floor(e.loaded / e.total * 100) + "%";
								};
								return xhr;
							},
							success: function () {
								document.getElementById("uploadText").innerHTML = 'The thumbnail was successfully changed.<br><!--<img src="' + reader1.result + '" style="background-color:white;height:120px;width:160px;"><br>-->';
								$("#updateSelect, #updateClose").attr("type","submit");
							},
							error: function () {
								document.getElementById("uploadText").innerHTML = 'Error: try again or try with a smaller image.';
								$("#updateSelect, #updateClose").attr("type","submit");
							}
						});
					};
					reader.readAsArrayBuffer(document.getElementById('uploadPicker').files[0]);
				};
				document.getElementById("uploadText").innerHTML = "Reading your image";
			});
			document.getElementById("uploadPicker").click();
			document.getElementById("uploadText").innerHTML = "Waiting for file";
		} else {
			document.getElementById("uploadText").innerHTML = "This project is not yours! You can only change the thumbnail of one of your projects. :)";
		}
	} else {
		document.getElementById("uploadText").innerHTML = "You can only use this code in Scratch :)";
	}
} else {
	document.getElementById("uploadToast").style.display = "block";
}

// Fix You can only use this in Scratch
