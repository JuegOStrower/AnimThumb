if (!document.getElementById("uploadToast")) {
		if (window.location.origin === "https://scratch.mit.edu" && (!document.getElementById('report-this')) && location.href.startsWith("https://scratch.mit.edu/projects/")) {
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
								document.getElementById("uploadText").innerHTML = '<img src="' + reader1.result + '" style="width: 35px;height: 26px;vertical-align: bottom;"><span style="font-size: 15px;"> The thumbnail was successfully changed.</span>';
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
} else if (window.location.origin === "https://scratch.mit.edu" && (!document.getElementById('report-this')) && location.href.startsWith("https://scratch.mit.edu/projects/")) {
	document.getElementById("updateSelect").click();
}


//BUGS OF THE WORLD_LANGUAGES CODE (Wrote in Spanish)
//Si se inserta en otra página da un error a la consola sin dar mensaje al usuario, no distingue entre la home page y otra páginas. El menaje que debería aparecer, escrito en la linea 46 nunca es mostrado, ya que la comparación para ver si un proyecto es "tuyo" da Reference Error y se aborta. Para este tipo, de comparación de debería usar un Try&Catch (o primero fijarse si la url es la de un proyecto). Además, este metodo no es compatible con Scratch 3.
//Se producen errores si se vuelve a importar el script, ya que vuelve a crear "snackbar", pero no "uploadthumbnail". Al nuevo snackbar, no se le aplica nada ya que todo se aplica de vuelta al viejo (y el nuevo queda en blanco). Esto podría causar problemas en el futuro (varios elementos con el id "snackbar") y en el momento que se enlentezca con 5 ediciones al dom, que consumen mucha memoria.
//No coincide con las lineas de diseño de Scratch. Agrega "un extraño cuadro negro" al dom para mostrar simples opciones. Este otro código agrega la misma información como un banner del verdadero Scratch (similar al de "Proyecto no compartido") y usa colores para demostar el estado. En este caso, se usan unas lineas adicionales para hacer coincidir los diseños.
//Soporte para si se sube el mísmo archivo, si esta la pantalla de Succefully changed.
//Tiene Drag&Drop, algo innecario que puede inducir a errores. Además, no hay ninguna animación (como la de Google Fotos) que lo haga claro.
//Lleno de funciones innecesarias, como error, que se llama en solo dos ocasiones y da resultados distintos. Además, en error() en un caso se incluyen datos al llamarla y en otro no, lo que la hace aún más innesesaria. También, aún peor es "Snackbarccs", que solo se la llama una vez y no incluye datos, más innecesario imposible. La función queda declarada para el resto de Scratch. La única función justificable es upload().