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
