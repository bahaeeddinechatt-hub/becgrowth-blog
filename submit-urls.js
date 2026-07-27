const { google } = require('googleapis');
const fs = require('fs');

const creds = JSON.parse(fs.readFileSync('./oauth-credentials.json'));
const { client_id, client_secret } = creds.installed;
const tokens = JSON.parse(fs.readFileSync('./oauth-token.json'));

const oauth2Client = new google.auth.OAuth2(client_id, client_secret, 'http://localhost:3000');
oauth2Client.setCredentials(tokens);

const indexing = google.indexing({ version: 'v3', auth: oauth2Client });

const urls = [
'https://blog.becgrowth.com/blog/cold-email-agency-unique-selling-point',
'https://blog.becgrowth.com/blog/cold-email-agency-competitive-advantage',
'https://blog.becgrowth.com/blog/cold-email-agency-market-fit-guide',
'https://blog.becgrowth.com/blog/cold-email-agency-ideal-client-guide',
'https://blog.becgrowth.com/blog/cold-email-agency-target-market-guide',
'https://blog.becgrowth.com/blog/cold-email-agency-vertical-guide',
'https://blog.becgrowth.com/blog/cold-email-agency-horizontal-guide',
'https://blog.becgrowth.com/blog/cold-email-agency-geographic-guide',
'https://blog.becgrowth.com/blog/cold-email-agency-industry-guide',
];

async function submitUrls() {
  let success = 0, failed = 0;
  console.log(`\nSubmitting ${urls.length} URLs...\n`);
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    try {
      await indexing.urlNotifications.publish({
        requestBody: { url, type: 'URL_UPDATED' },
      });
      success++;
      console.log(`✓ [${i+1}/${urls.length}] ${url}`);
    } catch (err) {
      failed++;
      console.log(`✕ [${i+1}/${urls.length}] ${url} - ${err.response?.data?.error?.message || err.message}`);
    }
    await new Promise(r => setTimeout(r, 300));
  }
  console.log(`\nDone! Success: ${success}, Failed: ${failed}`);
}

submitUrls().catch(console.error);