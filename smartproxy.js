const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');

const app = express();

// Configurare load balancing către serverele backend
const server1 = 'http://localhost:8080';
const server2 = 'http://localhost:5209';

const servers = [server1, server2];
let currentServerIndex = 0;

app.use('/api', (req, res, next) => {
    // Alegerea serverului în funcție de un algoritm de load balancing (de exemplu, round-robin)
    const selectedServer = servers[currentServerIndex];
    currentServerIndex = (currentServerIndex + 1) % servers.length;

    // Proxificarea cererilor către serverul ales
    createProxyMiddleware({
        target: selectedServer,
        changeOrigin: true,
    })(req, res, next);
});

const PORT = 8888;
app.listen(PORT, () => {
    console.log(`Serverul de proxy ascultă pe portul ${PORT}`);
});
