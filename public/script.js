// animacion inicio
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// datos form login
const loginData = document.getElementById('SignIn');
loginData.addEventListener('click', event =>{
    event.preventDefault();

    const formEl = document.querySelector('.form-login');
    const formData = new FormData(formEl);
    const username = formData.get('username');
    const password = formData.get('password');
    console.log(username);
    const loginRequest = {
        user_name: username,
        password: password
    }
    console.log(loginRequest);

    fetch('https://atmsystemapibank.onrender.com/auth/login', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginRequest)
    }).then(res => res.json())
      .then(data => console.log(data))
})

// popup rfid
let openPopUp = document.getElementById('openPopup');
let Popup = document.getElementById('popup');
let buttonIniciarPIN = document.getElementById('iniciarPIN');
let close = document.getElementById('closeButton');

// abrir popup
openPopUp.addEventListener('click', (event)=>{
    event.preventDefault();
    Popup.style.visibility = "visible";
    const socket = io();
    socket.on('arduino:data', data => {
        let imgScanCard = document.getElementById('imgScanCard');
        let loaderAnimation = document.getElementById('loaderAnimation');
        let cardContainer = document.getElementById('cardContainer');

        imgScanCard.style.display = "none";
        cardContainer.style.display = "none";
        loaderAnimation.style.display = "flex";
        $('#PIN').val('');
        $('#PIN').prop('disabled', true);
        $('#iniciarPIN').prop('disabled', true);

        console.log(data);
        let verifyCardRequest = {
            card_number: data.value
        }
        fetch('https://atmsystemapibank.onrender.com/atm/verify_card', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(verifyCardRequest)
        }).then(res => res.json())
        .then(res => {
            console.log(res);
            loaderAnimation.style.display = "none";
            if(res.statusCode == 200){
                card_number = res.data.card_number;
                const obfuscatedCardNumber = obfuscateCardNumber(res.data.card_number);
                const formattedDate = moment(res.data.expiration_date).format('DD/MM/YY');
                cardContainer.style.display = "flex";
                $('#CardNumber').text(obfuscatedCardNumber);
                $('#CardName').text(res.data.user_name);
                $('#CardExpiration').text(formattedDate);
                $('#PIN').prop('disabled', false).focus();
                $('#iniciarPIN').prop('disabled', false);
            }else{
                imgScanCard.style.display = "inline";
            }
        });
    });
});
   
// cerrar popup
close.onclick = function(){
    Popup.style.visibility = "hidden";
}

//BOTON INICIAR POPUP
buttonIniciarPIN.addEventListener('click', (event)=>{
    event.preventDefault();
});

let card_number;

$(document).ready(function() {
    let signUpRequest;
    //REQUEST PARA BOTON SIGNUP
    $('#SignUp').click(function(event) {
        event.preventDefault();
        
        let username = $('input[name="usernameReg"]').val();
        let password = $('input[name="passwordReg"]').val();
        let email = $('input[name="emailReg"]').val();
        let id = $('input[name="idReg"]').val();
        
        signUpRequest = {
            user_name: username,
            password: password,
            email: email,
            identification: id
        }

        console.log(signUpRequest);
        fetch('https://atmsystemapibank.onrender.com/user/add_user', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(signUpRequest)
        }).then(res => res.json())
        .then(res => {
            if(res.data.requestCustomerData){   //SI NO SE TIENE UN CLIENTE REGISTRADO CON ESE DPI
                let PopupAddCustomer = document.getElementById('PopupAddCustomer');
                PopupAddCustomer.style.visibility = "visible"; 
            }
        })
    });
    //BOTON CERRAR POPUP
    $('#closeButtonAddCustomer').click( event => {
        event.preventDefault();
        let PopupAddCustomer = document.getElementById('PopupAddCustomer');
        PopupAddCustomer.style.visibility = "hidden";
    });

    $('#BtnAddCustomer').click( event => {
        event.preventDefault();
        let addCustomerArray = $('#addCustomerForm').serializeArray();
        console.log(addCustomerArray)
        
        let customerDataJSON = {};
        addCustomerArray.map(data => {
            customerDataJSON[data.name] = data.value;
        });

        signUpRequest = {...signUpRequest, ...customerDataJSON};

        console.log(signUpRequest);
        fetch('https://atmsystemapibank.onrender.com/user/add_user/new_customer', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(signUpRequest)
        }).then(res => res.json())
        .then(res => {
            console.log(res)
        })
    });

    $('#iniciarPIN').click( event => {
        event.preventDefault();
        let pin = $('#PIN').val();
        let validatePinRequest = {
            card_number: card_number,
            pin: pin
        }
        console.log(validatePinRequest);
        fetch('https://atmsystemapibank.onrender.com/atm/verify_pin', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(validatePinRequest)
        }).then(res => res.json())
        .then(res => {
            console.log(res);
        })
    });
});

function obfuscateCardNumber(cardNumber) {
    const parts = cardNumber.toString().split(' ');
    console.log(parts.length)
    if (parts.length !== 4) {
        console.error('Formato de número de tarjeta inválido');
    }
    parts[1] = '***';
    parts[2] = '***';
    return parts.join(' ');
}