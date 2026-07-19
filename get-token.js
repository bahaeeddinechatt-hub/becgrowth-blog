const { google } = require('googleapis');
const fs = require('fs');
const http = require('http');
const url = require('url');

const creds = JSON.parse(fs.readFileSync('./oauth-credentials.json'));
const { client_id, client_secret } = creds.installed;

const oauth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  'http://localhost:3000'
);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://www.googleapis.com/auth/indexing'],
});

console.log('\nOpen this URL in your browser:\n');
console.log(authUrl);
console.log('\nWaiting for auth...\n');

const server = http.createServer(async (req, res) => {
  const code = url.parse(req.url, true).query.code;
  if (code) {
    const { tokens } = await oauth2Client.getToken(code);
    fs.writeFileSync('./oauth-token.json', JSON.stringify(tokens, null, 2));
    res.end('Done! You can close this tab.');
    console.log('Token saved to oauth-token.json');
    server.close();
  }
});

server.listen(3000);