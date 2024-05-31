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
      .then(res => {
        if(res.statusCode == 200){
            window.location.href = '../virtual_banking/banking_home/banking_home.html';
        }
        console.log(res)
      })
})

// popup rfid
let openPopUp = document.getElementById('openPopup');
let Popup = document.getElementById('popup');
let buttonIniciarPIN = document.getElementById('iniciarPIN');
let closeBTN = document.getElementById('closeButton');

// abrir popup
openPopUp.addEventListener('click', (event)=>{
    event.preventDefault();
    Popup.style.visibility = "visible"; 
});
   
// cerrar popup
closeBTN.onclick = function(){
    Popup.style.visibility = "hidden";
}

//BOTON INICIAR POPUP
buttonIniciarPIN.addEventListener('click', (event)=>{
    event.preventDefault();
});

//REQUEST PARA BOTON SIGNUP
$(document).ready(function() {
    $('#SignUp').click(function(event) {
        event.preventDefault();
        
        let username = $('input[name="usernameReg"]').val();
        let password = $('input[name="passwordReg"]').val();
        let email = $('input[name="emailReg"]').val();
        let id = $('input[name="idReg"]').val();
        
        let signUpRequest = {
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

    $('#closeButtonAddCustomer').click( event => {
        event.preventDefault();
        let PopupAddCustomer = document.getElementById('PopupAddCustomer');
        PopupAddCustomer.style.visibility = "hidden"; 
    });
});