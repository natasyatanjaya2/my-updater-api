const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const express = require('express');
const qrcode = require('qrcode');
const fs = require('fs');
const mysql = require('mysql2/promise');
const { generateWAMessageFromContent } = require('@whiskeysockets/baileys');

let isConnected = false;
const userStates = {};
let db;

const start = async () => {
    const { state, saveCreds } = await useMultiFileAuthState('./auth');
    const sock = makeWASocket({ auth: state });

    const open = (...args) => import('open').then(m => m.default(...args));

    sock.ev.on("connection.update", async ({ connection, lastDisconnect, qr }) => {
        if (qr) {
            const qrImage = await qrcode.toDataURL(qr);
            fs.writeFileSync('./qr.html', `
                <html><head><title>Scan QR WhatsApp</title></head>
                <body><h2>Scan QR:</h2><img src="${qrImage}" /></body></html>`);
            open('http://localhost:3000/qr');
        }

        if (connection === "open") {
            console.log("✅ Bot terhubung ke WhatsApp");
            isConnected = true;
        } else if (connection === "close") {
            console.log("❌ Bot terputus");
            if (lastDisconnect?.error?.output?.statusCode !== 401) start();
        }
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0];
        if (!msg.message || msg.key.fromMe) return;

        const sender = msg.key.remoteJid;
        const isiPesan = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
        const pesan = isiPesan.toLowerCase().replace(/[^\w\s]/gi, '');
        const kataPesan = pesan.split(/\s+/);

});

db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'program_toko'
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/qr', (req, res) => {
    if (fs.existsSync('./qr.html')) {
        res.sendFile(__dirname + '/qr.html');
    } else {
        res.send('QR belum tersedia');
    }
});

app.get('/status', (req, res) => {
    res.json({ login: isConnected });
});

app.listen(3000, () => console.log('✅ Server aktif di http://localhost:3000'));
};

start();