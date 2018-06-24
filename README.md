
# Blockstack & ShapeShift Signature Bounty Universal Wallet

## Getting Started in dev mode.
```
git clone https://github.com/BCNetio/BlockStackWallet
npm install
npm run start
```

## Production build

```
git clone https://github.com/BCNetio/BlockStackWallet
npm install
npm run production
cd public/
mv * /your/public/server/folder
```

## Remember you have to add API keys and Ethereum like nodes.

```
app/Providers/config.js - apiKeys and config.exchangeApiKeys
app/AppConfig.js - config.nodes 
```

## Manifest file
```
{
  "name": "Dappy Wallet",
  "start_url": "https://app.bcnet.io",
  "description": "Dappy Wallet is a non-custodial universal wallet",
  "icons": [
    {
      "src": "https://app.bcnet.io/dappy_logo.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

## Nginx example 
```
server {
	listen 443 ssl;
	server_name app.bcnet.io;
    ssl_certificate /etc/crypto/app.bcnet.io/fullchain.pem;
    ssl_certificate_key /etc/crypto/app.bcnet.io/privkey.pem;

    location / {
        root /cdn/dappy/;
        try_files $uri /index.html;
        add_header Access-Control-Allow-Origin *;
	}
}
server {
    if ($host = app.bcnet.io) {
        return 301 https://$host$request_uri;
    }
	listen 80;
	listen [::]:80;
	server_name app.bcnet.io;
    return 404;
}
```