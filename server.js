require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN;
const PORT = process.env.PORT;

app.use(
	cors({
		origin: ALLOWED_ORIGIN,
		methods: ['GET', 'POST', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	})
);

app.use(
	'/api',
	createProxyMiddleware({
		target: 'https://api.infomaniak.com',
		changeOrigin: true,
		pathRewrite: {
			'^/api': '',
		},
	})
);

app.listen(PORT, () => {
	console.log(`Proxy-Server läuft auf Port ${PORT}`);
	console.log(`Erlaubte Origin: ${ALLOWED_ORIGIN}`);
});
