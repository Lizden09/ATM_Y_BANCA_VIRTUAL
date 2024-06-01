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
        document.getElementById("contenido").innerHTML = content;
    });
}