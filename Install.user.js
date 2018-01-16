// ==UserScript==
// @name         Set animated thumbnail
// @namespace    https://juegostrower.tk/
// @version      2.4
// @description  Set an animated Thumbnail in your Scratch Projects!
// @author       JuegOStrower
// @include      https://scratch.mit.edu/projects/*
// @exclude      https://scratch.mit.edu/projects/*/*/
// @grant        none
// ==/UserScript==

//THIS SCRIPT WAS DEVELOPED BY @JUEGOSTROWER AND IT IS UNDER THE MIT LICENCE. IF YOU ARE GOING TO COPY IT YOU MUST GIVE CREDIT, THIS IS NOT COPYLEFT (AS SCRATCH)
if (!document.getElementById('report-this')) {
    $('<div onclick="var jupload=document.createElement(\'script\');jupload.src=\'https://www.juegostrower.tk/Set-Animated-Thumbnail/default.js\'; document.getElementsByTagName(\'head\')[0].appendChild(jupload);" class="action tooltip bottom" id="update-thumbnail"><span class="hovertext"><span class="arrow"></span>Set an animated Thumbnail!</span><span id="uploadButton">Upload thumbnail</span></div>').appendTo($("#stats"));
}
