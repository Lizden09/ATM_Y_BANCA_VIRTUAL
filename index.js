const { SerialPort } = require('serialport');
const express = require('express');
const { Server } = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = new Server(server)

io.on('connection', socket => {
    console.log('A new socket connected');

    socket.on('client:signal', data => {
        const { amount } = data;
        const timeInMinutes = amount * 30; // Cada Q1.00 equivale a 1 minuto
        const timeInMillis = timeInMinutes * 1000; // Convertir minutos a milisegundos

        console.log(`Amount: ${amount}, Time in milliseconds: ${timeInMillis}`);

        port.write(timeInMillis.toString() + '\n', err => {
            if (err) {
                console.error('Error sending signal to ESP32:', err.message);
            } else {
                console.log('Signal sent to ESP32');
            }
        });
    });
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/lector', (req, res) => {
    res.sendFile(__dirname + '/public/Lector_Cards/lector.html');
});

const port = new SerialPort({
    path: 'COM3',
    baudRate: 115200
});

port.on('open', function() {
    console.log('opened Port');
});

port.on('data', function(data) {
    console.log(data);
    io.emit('arduino:data', {
        value: data.toString().trim()
    });
});

port.on('error', function(err) {
    console.log(err.message);
});

server.listen(3000, () => {
    console.log('Server on port ', 3000);
});