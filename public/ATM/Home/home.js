document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        $('#btnTransfers').click((event) => {
            event.preventDefault();
    
            loadScreen("Transfers/transfers.html");
        })
        $('#btnPayments').click((event) => {
            event.preventDefault();
    
            loadScreen("Payments/payments.html");
        })
        $('#btnWithdraws').click((event) => {
            event.preventDefault();
    
            loadScreen("Withdraws/withdraws.html");
        })
    }, 100);
})
