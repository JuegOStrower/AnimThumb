document.getElementById("stats").innerHTML += '<div class="action tooltip bottom" id="update-thumbnail"><span class="hovertext"><span class="arrow"></span>Set an animated Thumbnail! By @JuegOStrower</span><a onclick="document.getElementById(' + "'newthumb'" + ').click()"><span class="dropdown-toggle text black" data-control="open-thumbnail-change" style="color:#322f31">Upload thumbnail<input type="file" id="newthumb" onchange="upload()" style="display: none;"><span class="caret"></span></span></a></div>';
function upload(){
var reader = new FileReader();
reader.onload = (function(e){
$.ajax({
            type: "POST",
            url: "/internalapi/project/thumbnail/" + Scratch.INIT_DATA.PROJECT.model.id + "/set/",
            data: e.target.result,
            contentType: "",
            processData: false,
            success: function(msg) {
            	location.reload;
            }
        });
});
reader.readAsArrayBuffer(document.getElementById('input').files[0]);
}
