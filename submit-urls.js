const { google } = require('googleapis');
const fs = require('fs');

const creds = JSON.parse(fs.readFileSync('./oauth-credentials.json'));
const { client_id, client_secret } = creds.installed;
const tokens = JSON.parse(fs.readFileSync('./oauth-token.json'));

const oauth2Client = new google.auth.OAuth2(client_id, client_secret, 'http://localhost:3000');
oauth2Client.setCredentials(tokens);

const indexing = google.indexing({ version: 'v3', auth: oauth2Client });

const urls = [
'https://blog.becgrowth.com/blog/cold-email-for-business-valuation-firms',
'https://blog.becgrowth.com/blog/cold-email-for-due-diligence-firms',
'https://blog.becgrowth.com/blog/cold-email-for-turnaround-consulting-firms',
'https://blog.becgrowth.com/blog/cold-email-for-bankruptcy-advisory-firms',
'https://blog.becgrowth.com/blog/cold-email-for-litigation-support-firms',
'https://blog.becgrowth.com/blog/cold-email-for-forensic-accounting-firms',
'https://blog.becgrowth.com/blog/cold-email-for-fraud-investigation-firms',
'https://blog.becgrowth.com/blog/cold-email-for-insurance-claims-firms',
'https://blog.becgrowth.com/blog/cold-email-for-actuarial-consulting-firms',
'https://blog.becgrowth.com/blog/b2b-cold-email-agency-pricing-2026',
'https://blog.becgrowth.com/blog/cold-email-agency-vs-doing-it-yourself',
'https://blog.becgrowth.com/blog/how-to-choose-cold-email-agency-2026',
'https://blog.becgrowth.com/blog/best-cold-email-agencies-2026',
'https://blog.becgrowth.com/blog/top-b2b-cold-email-agencies-2026',
'https://blog.becgrowth.com/blog/cold-email-agency-red-flags-to-avoid',
'https://blog.becgrowth.com/blog/what-to-expect-from-cold-email-agency',
'https://blog.becgrowth.com/blog/cold-email-agency-onboarding-process',
'https://blog.becgrowth.com/blog/cold-email-agency-reporting-metrics',
'https://blog.becgrowth.com/blog/cold-email-agency-contract-guide',
'https://blog.becgrowth.com/blog/cold-email-agency-guarantee-guide',
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