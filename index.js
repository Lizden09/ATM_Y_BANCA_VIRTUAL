const { SerialPort } = require('serialport');
const express = require('express');
const { Server } = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = new Server(server)

io.on('connection', socket => {
    console.log('A new socket connected');
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
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