document.addEventListener('DOMContentLoaded', () => {
    let card_number = localStorage.getItem('cardNumber');
    console.log(card_number);
    fetch('https://atmsystemapibank.onrender.com/atm/get_account_card', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ card_number })
        }).then(res => res.json())
        .then(res => {
            console.log(res)
            $('#account').val(res.account.account_number)
        })

        $('#payService').click((event) => {
            event.preventDefault();
            const payServiceRequest = {
                account_number: $('#account').val(),
                service_type_id: parseInt($('#serviceSelected').val()),
                amount: parseFloat($('#amount').val()),
                reference: $('#reference').val()
            }
            console.log(payServiceRequest)
            fetch('https://atmsystemapibank.onrender.com/atm/pay_service', {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payServiceRequest)
                }).then(res => res.json())
                .then(res => {
                    console.log(res);
                    if(res.statusCode == 200){
                        const popup = document.getElementById('popup-confirmation');
                        popup.style.visibility = "visible";
                    }
                })
        })

        $('#accept').click((event) => {
            event.preventDefault();
            const popup = document.getElementById('popup-confirmation');
            popup.style.visibility = "hidden";
            $('#serviceSelected').val('');
            $('#amount').val('');
            $('#reference').val('');
        })

})

const back = document.getElementById("back"); 
console.log("back");
back.addEventListener('click', ()=>{
    window.location.href = "../atm.html";
})