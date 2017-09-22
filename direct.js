document.getElementsByClassName("viewer")[0].innerHTML+='<input type="file" id="autothumb" style="//display: none;">';
document.getElementById("autothumb").addEventListener("change", function(){
    if (window.location.hostname === "scratch.mit.edu"){
        if (document.getElementById('report-this') === null){
            var reader = new FileReader();
            reader.onload = (function(e){
                $.ajax({
                    type: "POST",
                    url: "/internalapi/project/thumbnail/" + Scratch.INIT_DATA.PROJECT.model.id + "/set/",
                    data: e.target.result,
                    contentType: "",
                    processData: false,
                    success: function(msg) {
                        location.reload();
                    }
                });
            });
            reader.readAsArrayBuffer(document.getElementById('autothumb').files[0]);
        } else {
            alert("This isn't one of your projects! You can only set a new title for your projects.");
        }
    } else {
        alert("Please use this in a scratch project!");
    }
});
document.getElementById("autothumb").addEventListener("load", function(){
    document.getElementById("autothumb").click();
});
