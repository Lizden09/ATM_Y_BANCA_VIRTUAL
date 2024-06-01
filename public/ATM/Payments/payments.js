document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        console.log(document.getElementById('payService'));
        $('#payService').click((event) => {
            event.preventDefault();
            console.log('a');
        })
    }, 1000);

})

const back = document.getElementById("back"); 
console.log("back");
back.addEventListener('click', ()=>{
    window.location.href = "../atm.html";
})