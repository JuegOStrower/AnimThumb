// ==UserScript==
// @name         Set animated thumbnail | @JuegOStrower
// @namespace    https://juegostrower.github.io
// @version      4.0
// @description  Set an animated Thumbnail in your Scratch Projects!
// @author       JuegOStrower
// @include      https://scratch.mit.edu/projects/*
// @exclude      https://scratch.mit.edu/projects/*/*/
// @grant        none
// @icon         https://juegostrower.github.io/favicon.png
// @icon64       https://juegostrower.github.io/favicon.png
// @supportURL   https://github.com/JuegOStrower/AnimThumb/issues
// ==/UserScript==

//THIS SCRIPT WAS DEVELOPED BY @JUEGOSTROWER AND IT IS UNDER THE MIT LICENCE. IF YOU ARE GOING TO COPY IT YOU MUST GIVE CREDIT, THIS IS NOT COPYLEFT (AS SCRATCH)
try {
	var juegostrowerAnimthumbCheck = setInterval(function() {
		if (document.getElementsByClassName("flex-row action-buttons")[0]) {
			document.getElementsByClassName("flex-row action-buttons")[0].innerHTML+='<button id="juegostrower-animthumb" class="button action-button" title="By @JuegOStrower">Animated Thumbnail</button>';
			document.getElementById("juegostrower-animthumb").addEventListener("click", juegostrowerAnimthumbStart);
			clearInterval(juegostrowerAnimthumbCheck);
		}
	}, 100);
} catch(e) {
	alert("Animated Thumbnail found an unxpected error adding the button. Please comment on the @JuegOStrower (the developer, aka me) profile to help to fix the problem.");
	console.log(e);
}
function juegostrowerAnimthumbStart(){
    try {
        if(!document.getElementById("juegostrower-animthumb-picker")){
            var juegostrowerAnimthumbUpload=document.createElement("input");
            juegostrowerAnimthumbUpload.id="juegostrower-animthumb-picker";
            juegostrowerAnimthumbUpload.type="file";
            juegostrowerAnimthumbUpload.accept="image/*";
            juegostrowerAnimthumbUpload.style="visibility: hidden; position: absolute; top: 0; left: -5000px;";
            document.getElementsByTagName("head")[0].appendChild(juegostrowerAnimthumbUpload);
        }
        if(!document.getElementById("juegostrower-animthumb-banner")){
            var juegostrowerAnimthumbScript=document.createElement("script");
            juegostrowerAnimthumbScript.src="https://juegostrower.github.io/AnimThumb/default.js";
            document.getElementsByTagName("head")[0].appendChild(juegostrowerAnimthumbScript);
        }
        try {
            if(document.getElementById("juegostrower-animthumb-upload").style.display!=="none")document.getElementById("juegostrower-animthumb-picker").click();
        } catch(e) {
            document.getElementById("juegostrower-animthumb-picker").click();
        }
    } catch(e){
        alert("Animated Thumbnail found an unxpected error importing the script. Please comment on the @JuegOStrower (the developer, aka me) profile to help to fix the problem.");
        console.log(e);
    }
}
