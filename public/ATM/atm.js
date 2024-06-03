$(document).ready(() => {
    loadScreen("Home/home.html");
    console.log(localStorage.getItem('authToken'))
    fetch('https://atmsystemapibank.onrender.com/atm/get_user_data', {
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('authToken')}`
        }
    }).then(res => res.json())
    .then(res => {
        console.log(res);
        if(res.statusCode == 200){
            localStorage.setItem('cardNumber', res.data.account[0].cards[0].card_number);
            $('#userNameHeader').text(res.data.user_name);
            $('#cardNumberHeader').text(res.data.account[0].cards[0].card_number);
        }
    });
});

function loadContent(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(xhr.responseText);
        }
    };
    xhr.send();
}

function loadScreen(path) {
    loadContent(path, function (content) {
        var container = document.getElementById("contenido");
        container.innerHTML = content;
        executeScripts(container);
    });
}

function executeScripts(container) {
    var scripts = container.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; i++) {
        var script = scripts[i];
        var newScript = document.createElement("script");
        if (script.src) {
            newScript.src = script.src;
        } else {
            newScript.textContent = script.textContent;
        }
        document.head.appendChild(newScript);
        document.head.removeChild(newScript); // Eliminar el script para evitar duplicados
    }
}
