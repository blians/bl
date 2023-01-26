function loadHtml(id, filename){
    console.log(`div id: ${id}, file name: ${filename}`);
    let xhttp;
    let element = document.getElementById(id);
    let file = filename;

    if (file){
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4){
                if(this.status == 200){element.innerHTML = `<iframe style="position: fixed; height: 100%; width: 100%;" src="${filename}" frameborder="0"></iframe>`;}
                if(this.status == 404){element.innerHTML = "<h1>PAge not</h1>";}
            }
        }
        xhttp.open("GET", `${file}`, true);
        xhttp.send();
        return;
    }
}