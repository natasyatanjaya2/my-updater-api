const { Client, LocalAuth, List } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
    console.log("✅ Scan QR WhatsApp...");
});

client.on('ready', () => {
    console.log("✅ Bot siap dan terhubung");
});

client.on('message', async msg => {
    console.log("📥 Pesan masuk:", msg.body);
    await client.sendMessage(msg.from, "Bot menerima pesanmu: " + msg.body);

    if (msg.body.toLowerCase() === 'menu') {
        const list = new List(
            "Silakan pilih menu:",
            "Pilih Menu",
            [
                {
                    title: "Layanan",
                    rows: [
                        { id: "lihat_produk", title: "📦 Lihat Produk" },
                        { id: "kontak_admin", title: "📞 Kontak Admin" },
                        { id: "keluar", title: "❌ Keluar" }
                    ]
                }
            ],
            "📋 Menu Utama"
        );

        await client.sendMessage(msg.from, list);
    }
});

client.initialize();