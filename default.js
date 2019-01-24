try {
	if(new RegExp("https://scratch.mit.edu/projects/[0-9]+(|/)$").test(window.location.href)&&!document.getElementsByClassName("button action-button report-button").length){
		if(!document.getElementById("juegostrower-animthumb-banner")){
			document.getElementById("navigation").innerHTML+='<div id="juegostrower-animthumb-banner" class="banner-outer" style="background-color: rgb(110, 135, 170);color: lightcyan;"><div class="flex-row inner banner-inner"><img id="juegostrower-animthumb-image" src="https://cdn2.scratch.mit.edu/get_image/project/' + location.href.replace(/\D/g,'').substring(0,10) + '_80x60.png?'+new Date().getTime()+'" style="width: 80px;height: 60px;vertical-align: bottom;background-color: white;"><span class="banner-text"><a href="/users/JuegOStrower" style="color: inherit;text-decoration: underline;">@JuegOStrower</a> Custom Thumbnail:<br><span id="juegostrower-animthumb-status" style="font-size: 25px;">Pick your image or animated gif!</span></span><button id="juegostrower-animthumb-upload" class="button banner-button"><span>Choose Image</span></button><button id="juegostrower-animthumb-close" class="button banner-button"><span>Close this</span></button></div></div>';
			document.getElementById("view").style["margin-top"]="114px";
			document.getElementById("juegostrower-animthumb-upload").addEventListener("click", function () {
				document.getElementById("juegostrower-animthumb-picker").click();
			});
			document.getElementById("juegostrower-animthumb-close").addEventListener("click", function () {
				document.getElementById("juegostrower-animthumb-banner").parentElement.removeChild(document.getElementById("juegostrower-animthumb-banner"));
				document.getElementById("view").style["margin-top"]="50px";
				document.getElementById("juegostrower-animthumb-picker").value = "";
			});
			document.getElementById("juegostrower-animthumb-picker").addEventListener("change", function () {
				if(document.getElementById("juegostrower-animthumb-picker").files[0]&&document.getElementById("juegostrower-animthumb-banner")){
					document.getElementById("juegostrower-animthumb-banner").style.color="lightcyan";
					document.getElementById("juegostrower-animthumb-status").innerText="Preparing upload...";
					document.getElementById("juegostrower-animthumb-image").src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAA8CAIAAAB+RarbAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGuSURBVGhD7ZPrjcMwDIMzUGfpKF2ki3SPLHaW5QdpJwFcBIcDT98vS5ZJMWi3/Z8RgdWJwOpEYHUisDoRWJ0IrE4EVicCq3NX4M/rsW2P16eUd/F+dtV7LErgY7EFiwh8Dxj4HiIwwl2rrLAlHHgwCeRG4/kubadLzK4kj4HJ4nIZAy0cH1gM3B8WyVrwKF2VsmVO1dkVlaMfWdRLmkULvuqGy4H7cq5brnE0n3GOJgem3fAhLXBeGOgwuFG5GphywP3xsXHUc1B1/izYIQ18lrnQ+ZXANJcg0zyB+DRoVL4LnJ/VYlAtgceP4rDq5IEdkB0cMufXoHGwxHeB87lDkjUwqRWG3jwC6+BlPtOXgclRBYenhzQ8FyeB7QgOTA3sO6EG6Ru5AR8sP6jzNO2TTYpLeuamrFKr0W+2aA4JahRZoI32wAYPol6iSNY9EjBA2xgkhRdl1kkXNjgKOalr1Xpgk0RLfMmBL5k8/igHe0JLMLD/uGDRvHhtKAZO8H8Tf98LgTWIwOpEYHUisDoRWJ0IrE4EVicCqxOB1YnA6kRgdSKwOhFYnQiszb7/AJCST4INmfNfAAAAAElFTkSuQmCC";
					document.getElementById("juegostrower-animthumb-upload").style.display="none";
					var reader = new FileReader();
					reader.onload = function (e) {
						document.getElementById("juegostrower-animthumb-status").innerText = "Starting upload...";
						var juegostroweranimthumbxhttp = new XMLHttpRequest();
						juegostroweranimthumbxhttp.open("POST", "/internalapi/project/thumbnail/" + location.href.replace(/\D/g,'').substring(0,10) + "/set/", true);
						juegostroweranimthumbxhttp.setRequestHeader("X-CSRFToken", (decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent("scratchcsrftoken").replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null), false);
						juegostroweranimthumbxhttp.onreadystatechange = function() {
							if (this.readyState == 4) {
								document.getElementById("juegostrower-animthumb-upload").style.display="";
								document.getElementById("juegostrower-animthumb-upload").innerText="Choose Another Image";
								document.getElementById("juegostrower-animthumb-image").src = "https://cdn2.scratch.mit.edu/get_image/project/" + location.href.replace(/\D/g,'').substring(0,10) + "_80x60.png?"+new Date().getTime();
								if (this.status == 200){
									document.getElementById("juegostrower-animthumb-banner").style.color="lawngreen";
									document.getElementById("juegostrower-animthumb-status").innerText = 'Success! The thumbnail was changed.';
								} else {
									document.getElementById("juegostrower-animthumb-banner").style.color="red";
									document.getElementById("juegostrower-animthumb-status").innerText = 'Error! Your image probably was too big for Scratch, try with a smaller image.';
								}
							}
						};
						juegostroweranimthumbxhttp.upload.onprogress = function (e) {
							document.getElementById("juegostrower-animthumb-status").innerText = "Uploading image " + Math.floor(e.loaded / e.total * 100) + "%";
						};
						juegostroweranimthumbxhttp.send(e.target.result);
					}
					reader.readAsArrayBuffer(document.getElementById('juegostrower-animthumb-picker').files[0]);
				}
			});
			if(document.getElementById("juegostrower-animthumb-picker"))if(document.getElementById("juegostrower-animthumb-picker").files[0])document.getElementById("juegostrower-animthumb-picker").dispatchEvent(new CustomEvent("change"));
			document.getElementById("juegostrower-animthumb-upload").click();
		}
	} else {
		alert("You have to go to one of your Scratch projects to use this. Then, click this again. If you think this is an error, comment on the @JuegOStrower (the developer, aka me) profile.");
	}
} catch(e){
	alert("Animated Thumbnail found an unxpected error changing the thumbnail. Please comment on the @JuegOStrower (the developer, aka me) profile to help to fix the problem.");
}
