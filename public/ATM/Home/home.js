document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        $('#btnTransfers').click((event) => {
            event.preventDefault();
            
            window.location.href = "/ATM/Transfers/transfers.html";
            // loadScreen("Transfers/transfers.html");
        })
        $('#btnPayments').click((event) => {
            event.preventDefault();
            window.location.href = "/ATM/Payments/payments.html";
            // loadScreen("Payments/payments.html");
            // setTimeout(()=>{
                //     const prueba = document.getElementById('prueba');
                //     prueba.src = "Payments/payments.js";    
                //     console.log(document.getElementById('prueba'));
                // }, 1000
                // )
            })
            $('#btnWithdraws').click((event) => {
                event.preventDefault();
                
                window.location.href = "/ATM/Withdraws/withdraws.html";
            // loadScreen("Withdraws/withdraws.html");
        })
    }, 100);
})
