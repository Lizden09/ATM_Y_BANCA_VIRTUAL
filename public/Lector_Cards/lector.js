let card_number;
let service_type_id;

$('#service1').click(() => {
    console.log('service1');
    service_type_id = 1;
    $('#cardService1').css('display', 'none');
    $('#cardService2').css('display', 'none');
    $('#cardLector').css('display', 'flex');
    const socket = io();
    socket.on('arduino:data', data => {
        let imgScanCard = document.getElementById('imgScanCard');
        let loaderAnimation = document.getElementById('loaderAnimation');
        let cardContainer = document.getElementById('cardContainer');

        imgScanCard.style.display = "none";
        cardContainer.style.display = "none";
        loaderAnimation.style.display = "flex";
        // $('#PIN').val('');
        // $('#PIN').prop('disabled', true);
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
                // $('#PIN').prop('disabled', false).focus();
                $('#iniciarPIN').prop('disabled', false);
                $('#pinMessage').text('Ingrese un monto.')
            }else{
                imgScanCard.style.display = "inline";
                $('#pinMessage').text('Tarjeta no encontrada. Intente de nuevo')
            }
        });
    });
});

$('#iniciarServicio').click( event => {
    event.preventDefault();
    let amount = $('#Monto').val();

    let consumeServiceRequest = {
        card_number: card_number,
        service_type_id: service_type_id,
        amount: parseFloat(amount)
    }

    console.log(consumeServiceRequest)

    fetch('https://atmsystemapibank.onrender.com/atm/consume_service', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(consumeServiceRequest)
    }).then(res => res.json())
    .then(res => {
        console.log(res);
        if(res.statusCode == 200){
            const socket = io();
            const amount = parseFloat(consumeServiceRequest.amount);
            console.log(amount);
            if (isNaN(amount) || amount <= 0) {
                console.error('Please enter a valid amount.');
                return;
            }
            socket.emit('client:signal', { amount });
            $('#title').text("Consumo realizado exitosamente.")

            let imgScanCard = document.getElementById('imgScanCard');
            let loaderAnimation = document.getElementById('loaderAnimation');
            let cardContainer = document.getElementById('cardContainer');
            let pinMessage = document.getElementById('pinMessage');
            let Monto = document.getElementById('Monto');
            let iniciarServicio = document.getElementById('iniciarServicio');
            let check = document.getElementById('check');

            imgScanCard.style.display = "none";
            cardContainer.style.display = "none";
            loaderAnimation.style.display = "none";
            pinMessage.style.display = "none";
            Monto.style.display = "none";
            iniciarServicio.style.display = "none";
            check.style.display = "flex";

            // setTimeout(() => {
            //     location.reload();
            // }, 5000);
        }
    })
});

$('#service2').click(() => {
    console.log('service2');
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