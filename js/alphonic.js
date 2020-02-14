var siteBase = "https://api.worthwelle.com/alphonic/";

function getData(url, func) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = func;
    xhttp.open("GET", siteBase+url, true);
    xhttp.send();
}

function phonetify() {
    var input = document.getElementById('unphonetified').value.replace(/(\r\n|\n|\r)/gm,'%0A');
    var alpha = document.getElementById('alphabet').value;
    getData('api/phonetify/'+alpha+'/'+input, function() {
        if (this.readyState == 4 && this.status == 200) {
            var json = JSON.parse(this.responseText);
            document.getElementById("phonetified").value = json.output;
            unphonetify();
        }
    });
}

function unphonetify() {
    var input = document.getElementById('phonetified').value.replace(/(\r\n|\n|\r)/gm,'%0A');
    var alpha = document.getElementById('alphabet').value;
    getData('api/unphonetify/'+alpha+'/'+input, function() {
        if (this.readyState == 4 && this.status == 200) {
            var json = JSON.parse(this.responseText);
            document.getElementById('unphonetified').innerHTML = json.output;
        }
    });
}

function getAlphabets() {
    getData("api/list", function() {
        if (this.readyState == 4 && this.status == 200) {
            var sel = document.getElementById("alphabet");
            var json = JSON.parse(this.responseText);
            Object.keys(json).forEach(function (item) {
                opt = document.createElement("option");
                opt.appendChild( document.createTextNode( json[item]) );
                opt.value = item;
                if( item == "NATO" ) opt.selected = true;
                sel.appendChild(opt);
            });
        }
    });
}

function getAlphabetInfo() {
    var alpha = document.getElementById('alphabet').value;
    document.getElementById("alphabetLabel").innerText = "Alphabet Details";
    document.getElementById("alphabetDescription").innerText = "Loading...";
    getData("api/info/"+alpha, function() {
        if (this.readyState == 4 && this.status == 200) {
            var json = JSON.parse(this.responseText);
            
            var title = document.getElementById("alphabetLabel");
            title.innerText = json.title;
            
            var modal = document.getElementById("alphabetDescription");
            modal.innerHTML = '';
            descr = document.createElement("p");
            descr.appendChild( document.createTextNode(json.description) );
            modal.appendChild(descr);
            sourc = document.createElement("p");
            var source = null;
            try {
                new URL(json.source);
                source = document.createElement("a");
                source.href = json.source;
                source.innerText = json.source;
            } catch (_) {
                source = document.createTextNode(json.source);
            }
            sourc.appendChild(source);
            modal.appendChild(sourc);
        }
    });
}
