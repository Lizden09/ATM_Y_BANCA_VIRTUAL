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

    fetch(''),{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    }
})