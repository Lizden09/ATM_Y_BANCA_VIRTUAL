$(document).ready(() => {
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
    })
});