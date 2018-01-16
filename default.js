if (!document.getElementById("uploadToast")) {
		if ((!document.getElementById('report-this')) && location.href.startsWith("https://scratch.mit.edu/projects/")) {
			$('<div id="uploadToast" style="padding: 5px 10px;background-color: #f9dcb5;color: #a56100;font-weight: 700;margin-top: -8px;margin-bottom: 8px!important;border-radius: 3px;border: 1px solid #fcc57b;text-shadow: 0 1px 0 rgba(255,255,255,0.5);line-height: 25px;"><span id="uploadText">Preparing everything</span><div style="float: right;"><input id="updateSelect" value="Select Another Image" type="hidden" class="button small grey" onclick="document.getElementById(\'uploadPicker\').click();" style="line-height: 0;padding: 8px 10px;"><input onclick="document.getElementById(\'uploadToast\').style.display=\'none\';" style="line-height: 0;padding: 8px 10px;" type="hidden" id="updateClose" class="button small grey" value="Close"></div></div>').prependTo(document.getElementById("content"));
			if (!!document.getElementById("share-bar"))$("#uploadToast").css("margin-bottom", "16px");
			$('<input type="file" id="uploadPicker" style="display: none;" accept="image/*">').appendTo(document.body);
			document.getElementById("uploadPicker").addEventListener("click", function () {
				$("#uploadToast").css({"backgroundColor": "#f9dcb5","color": "#a56100","borderColor": "#fcc57b"});
				$("#updateSelect").attr("type", "submit");
				$("#updateClose").attr("type", "hidden");
				document.getElementById("uploadText").innerHTML = "Waiting for file";
				document.getElementById("uploadToast").style.display = "block";
			});
			document.getElementById("uploadPicker").addEventListener("change", function () {
				$("#updateSelect, #updateClose").attr("type", "hidden");
				var reader1 = new FileReader();
				reader1.readAsDataURL(document.getElementById('uploadPicker').files[0]);
				reader1.onload = function () {
					var reader = new FileReader();
					reader.onload = function (e) {
						document.getElementById("uploadText").innerHTML = "Starting upload";
						$("#uploadPicker").val("");
						$.ajax({
							type: "POST",
							url: "/internalapi/project/thumbnail/" + Scratch.INIT_DATA.PROJECT.model.id + "/set/",
							data: e.target.result,
							contentType: "",
							processData: false,
							xhr: function () {
								var xhr = $.ajaxSettings.xhr();
								xhr.upload.onprogress = function (e) {
								document.getElementById("uploadText").innerHTML = "Uploading image " + Math.floor(e.loaded / e.total * 100) + "%";
								};
								return xhr;
							},
							success: function () {
								$("#uploadToast").css({"backgroundColor": "#dff0d8","color": "#468847","borderColor": "#d6e9c6"});
								document.getElementById("uploadText").innerHTML = '<img src="' + reader1.result + '" style="width: 35px;height: 26px;vertical-align: bottom;background-color: white;"><span style="font-size: 15px;"> The thumbnail was successfully changed.</span>';
								$("#updateSelect, #updateClose").attr("type", "submit");
							},
							error: function () {
								$("#uploadToast").css({"backgroundColor": "#fba7a7","color": "#882626","borderColor": "#ff7a7a"});
								document.getElementById("uploadText").innerHTML = 'Error: try again or try with a smaller image.';
								$("#updateSelect, #updateClose").attr("type", "submit");
							}
						});
					};
					reader.readAsArrayBuffer(document.getElementById('uploadPicker').files[0]);
				};
				document.getElementById("uploadText").innerHTML = "Reading your image";
			});
			document.getElementById("uploadPicker").click();
		} else {
			alert("This is not one of your Scratch Projects! This tool doesn't work for other websites. :)");
		}
} else if ((!document.getElementById('report-this')) && location.href.startsWith("https://scratch.mit.edu/projects/")) {
	document.getElementById("uploadPicker").click();
}
