try {$('<input type="file" id="uploadPicker" style="visibility: hidden;" accept="image/*"><script src="https://www.juegostrower.tk/Set-Animated-Thumbnail/default.js"></script>').appendTo(document.head);
    document.getElementById('uploadPicker').click();
} catch (e){
    alert("This is not one of your Scratch Projects! This tool doesn't work for other websites. :)");
    console.log(e);
}
