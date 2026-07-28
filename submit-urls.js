const { google } = require('googleapis');
const fs = require('fs');

const creds = JSON.parse(fs.readFileSync('./oauth-credentials.json'));
const { client_id, client_secret } = creds.installed;
const tokens = JSON.parse(fs.readFileSync('./oauth-token.json'));

const oauth2Client = new google.auth.OAuth2(client_id, client_secret, 'http://localhost:3000');
oauth2Client.setCredentials(tokens);

const indexing = google.indexing({ version: 'v3', auth: oauth2Client });

const urls = [
'https://blog.becgrowth.com/blog/cold-email-hyperise-guide-2026',
'https://blog.becgrowth.com/blog/cold-email-vidyard-guide-2026',
'https://blog.becgrowth.com/blog/cold-email-sendspark-guide-2026',
'https://blog.becgrowth.com/blog/cold-email-gan-ai-guide-2026',
'https://blog.becgrowth.com/blog/cold-email-pitch-ai-guide-2026',
'https://blog.becgrowth.com/blog/cold-email-amplemarket-guide',
'https://blog.becgrowth.com/blog/cold-email-apollo-io-guide-2026',
'https://blog.becgrowth.com/blog/cold-email-zoominfo-guide-2026',
'https://blog.becgrowth.com/blog/cold-email-lusha-guide-2026',
'https://blog.becgrowth.com/blog/cold-email-clearbit-guide-2026',
'https://blog.becgrowth.com/blog/cold-email-bombora-guide-2026',
'https://blog.becgrowth.com/blog/cold-email-6sense-guide-2026',
'https://blog.becgrowth.com/blog/cold-email-demandbase-guide-2026',
'https://blog.becgrowth.com/blog/cold-email-g2-intent-guide-2026',
'https://blog.becgrowth.com/blog/cold-email-linkedin-sales-nav-guide',
'https://blog.becgrowth.com/blog/cold-email-phantombuster-guide',
'https://blog.becgrowth.com/blog/cold-email-evaboot-guide-2026',
'https://blog.becgrowth.com/blog/cold-email-walaxy-guide-2026',
'https://blog.becgrowth.com/blog/cold-email-expandi-guide-2026',
'https://blog.becgrowth.com/blog/cold-email-dripify-guide-2026',
'https://blog.becgrowth.com/blog/cold-email-octopus-crm-guide',
'https://blog.becgrowth.com/blog/cold-email-skylead-guide-2026',
'https://blog.becgrowth.com/blog/cold-email-meet-alfred-guide',
'https://blog.becgrowth.com/blog/cold-email-linked-helper-guide',
'https://blog.becgrowth.com/blog/cold-email-zopto-guide-2026',
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