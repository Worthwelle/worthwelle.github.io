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
        }
    });
}

function unphonetify() {
    var input = document.getElementById('phonetified').value.replace(/(\r\n|\n|\r)/gm,'%0A');
    var alpha = document.getElementById('alphabet').value;
    getData('api/unphonetify/'+alpha+'/'+input, function() {
        if (this.readyState == 4 && this.status == 200) {
            var json = JSON.parse(this.responseText);
            document.getElementById('unphonetified').value = json.output;
        }
    });
}

function getAlphabets() {
    getData("api/list", function() {
        if (this.readyState == 4 && this.status == 200) {
            var sel = document.getElementById("alphabet");
            var json = JSON.parse(this.responseText);
            Object.keys(json).forEach(function (item) {
                if( Array.isArray(json[item]) ) {
                    json[item].forEach(function (label) {
                        opt = document.createElement("option");
                        opt.appendChild( document.createTextNode( label) );
                        opt.value = item;
                        if( label == "NATO Phonetic Alphabet" ) opt.selected = true;
                        sel.appendChild(opt);
                    });
                } else {
                    opt = document.createElement("option");
                    opt.appendChild( document.createTextNode( json[item]) );
                    opt.value = item;
                    if( item == "NATO" ) opt.selected = true;
                    sel.appendChild(opt);
                }
            });
            sortSelect(sel);
        }
    });
}

function getAlphabetInfo() {
    var alpha = document.getElementById('alphabet');
    var title = document.getElementById("alphabetLabel");
    var modal = document.getElementById("alphabetDescription");
    title.innerText = "Alphabet Details";
    modal.innerText = "Loading...";
    getData("api/info/"+alpha.value, function() {
        if (this.readyState == 4 && this.status == 200) {
            var json = JSON.parse(this.responseText);
            modal.innerHTML = '';
            
            if( Array.isArray(json.title) ) {
                var titles = document.createElement("ul");
                var aka = document.createElement("p");
                json.title.forEach(function (label) {
                    if( label != alpha.options[alpha.selectedIndex].text ) {
                        var li = document.createElement("li");
                        li.innerHTML = label;
                        titles.appendChild(li);
                    }
                    else {
                        title.innerText = label;
                    }
                });
                var akaLabel = document.createElement("b");
                akaLabel.appendChild( document.createTextNode("Also known as:") );
                aka.appendChild(akaLabel);
                
                aka.appendChild( titles );
                modal.appendChild(aka);
            } else {
                title.innerText = json.title;
            }
            
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

// https://stackoverflow.com/a/278509/9882907
function sortSelect(selElem) {
    var dflt = selElem.options[ selElem.selectedIndex ].value
    var tmpAry = new Array();
    for (var i=0;i<selElem.options.length;i++) {
        tmpAry[i] = new Array();
        tmpAry[i][0] = selElem.options[i].text;
        tmpAry[i][1] = selElem.options[i].value;
    }
    tmpAry.sort();
    while (selElem.options.length > 0) {
        selElem.options[0] = null;
    }
    for (var i=0;i<tmpAry.length;i++) {
        var op = new Option(tmpAry[i][0], tmpAry[i][1]);
        if( tmpAry[i][1] == dflt ) op.selected = true;
        selElem.options[i] = op;
    }
    return;
}
// https://stackoverflow.com/a/52809105/9882907
function initializeLocationChangeEvent() {
	/* These are the modifications: */
	history.pushState = ( f => function pushState(){
		var ret = f.apply(this, arguments);
		window.dispatchEvent(new Event('pushstate'));
		window.dispatchEvent(new Event('locationchange'));
		return ret;
	})(history.pushState);

	history.replaceState = ( f => function replaceState(){
		var ret = f.apply(this, arguments);
		window.dispatchEvent(new Event('replacestate'));
		window.dispatchEvent(new Event('locationchange'));
		return ret;
	})(history.replaceState);

	window.addEventListener('popstate',()=>{
		window.dispatchEvent(new Event('locationchange'))
	});
}

function getTranslationFromURL() {
	var url = location.hash.slice(1);
	var parts = url.split("&");
	var variables = [];
	parts.forEach(function(value) {
		if( value.indexOf('=') == -1 ) {
			variables[value] = true;
		} else {
			var valParts = value.split('=');
			if( valParts[1] == "true" ) valParts[1] = true;
			if( valParts[1] == "false" ) valParts[1] = false;
			if( valParts[0] == "alphabet" ) valParts[1] = valParts[1].toUpperCase();
			variables[valParts[0]] = valParts[1];
		}
	});
	Object.keys(variables).forEach(function(key, index) {
	  console.log(key+": "+this[key]);
	}, variables);
	
	document.getElementById('alphabet').value = variables["alphabet"];
	if (typeof variables["ph"] !== 'undefined') {
		document.getElementById('unphonetified').value = variables["ph"].replace(/(\r\n|\n|\r)/gm,'%0A');
		phonetify();
	} else if (typeof variables["uph"] !== 'undefined') {
		document.getElementById('phonetified').value = variables["uph"].replace(/(\r\n|\n|\r)/gm,'%0A');
		unphonetify();
	}
}

initializeLocationChangeEvent();
window.addEventListener('locationchange', getTranslationFromURL)
