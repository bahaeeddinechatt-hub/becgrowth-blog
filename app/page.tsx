export const runtime = 'edge'

export default function Home() {
  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Inter:wght@300;400;500;600;700&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background-color: #0a0a0a; color: #e8e8e8; font-family: 'Inter', sans-serif; min-height: 100vh; }
    nav { display: flex; align-items: center; justify-content: space-between; padding: 20px 48px; }
    .nav-logo { font-size: 20px; font-weight: 400; color: #fff; text-decoration: none; letter-spacing: -0.5px; }
    .nav-logo strong { font-weight: 700; }
    .nav-links { display: flex; align-items: center; gap: 32px; list-style: none; }
    .nav-links a { color: #888; text-decoration: none; font-size: 14px; font-weight: 400; transition: color 0.2s; }
    .nav-links a:hover { color: #fff; }
    .nav-links a.active { color: #c0392b; }
    .nav-cta { background: #c0392b; color: #fff; padding: 10px 22px; border-radius: 100px; font-size: 14px; font-weight: 500; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; }
    .nav-cta:hover { background: #a93226; }
    .back-link { display: inline-flex; align-items: center; gap: 8px; color: #555; text-decoration: none; font-size: 13px; padding: 32px 48px 0; transition: color 0.2s; }
    .back-link:hover { color: #888; }
    .hero { text-align: center; padding: 52px 24px 52px; }
    .hero-label { font-size: 11px; font-weight: 600; color: #c0392b; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 20px; }
    .hero-title { font-size: clamp(32px, 4vw, 52px); font-weight: 700; color: #fff; line-height: 1.1; margin-bottom: 16px; letter-spacing: -1px; }
    .hero-title em { font-family: 'Playfair Display', serif; font-style: italic; color: #c0392b; font-weight: 700; }
    .hero-desc { color: #555; font-size: 15px; line-height: 1.6; max-width: 520px; margin: 0 auto; }
    .posts { max-width: 620px; margin: 0 auto; padding: 0 24px 80px; display: flex; flex-direction: column; gap: 12px; }
    .post-card { background: #111; border: 1px solid #1e1e1e; border-radius: 12px; padding: 28px 32px; text-decoration: none; display: block; transition: border-color 0.2s, background 0.2s; }
    .post-card:hover { border-color: #2a2a2a; background: #131313; }
    .post-card-label { font-size: 11px; font-weight: 600; color: #c0392b; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 14px; }
    .post-card-title { font-size: 19px; font-weight: 600; color: #fff; line-height: 1.4; margin-bottom: 10px; }
    .post-card-desc { color: #555; font-size: 14px; line-height: 1.65; margin-bottom: 20px; font-weight: 400; }
    .post-card-meta { display: flex; align-items: center; justify-content: space-between; }
    .post-card-info { display: flex; align-items: center; gap: 16px; color: #444; font-size: 13px; flex-wrap: wrap; }
    .post-card-info .author { color: #555; }
    .post-card-info .dot { color: #333; }
    .post-card-read { color: #c0392b; font-size: 13px; text-decoration: none; display: inline-flex; align-items: center; gap: 3px; font-weight: 500; white-space: nowrap; }
    .post-card-read:hover { color: #e74c3c; }
    footer { border-top: 1px solid #141414; padding: 56px 48px 40px; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
    .footer-left .footer-logo { font-size: 18px; font-weight: 400; color: #fff; text-decoration: none; margin-bottom: 16px; display: block; letter-spacing: -0.5px; }
    .footer-left .footer-logo strong { font-weight: 700; }
    .footer-left p { color: #444; font-size: 13px; line-height: 1.7; max-width: 340px; }
    .footer-right { text-align: right; }
    .footer-right h4 { font-size: 11px; font-weight: 700; color: #fff; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px; }
    .footer-right ul { list-style: none; display: flex; flex-direction: column; gap: 12px; }
    .footer-right ul li a { color: #444; font-size: 14px; text-decoration: none; transition: color 0.2s; }
    .footer-right ul li a:hover { color: #fff; }
    .footer-social { display: flex; justify-content: center; gap: 20px; padding: 28px 48px; border-top: 1px solid #141414; }
    .footer-social a { color: #444; text-decoration: none; font-size: 13px; font-weight: 500; transition: color 0.2s; display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; border: 1px solid #1e1e1e; border-radius: 50%; }
    .footer-social a:hover { color: #fff; border-color: #333; }
    .footer-bottom { border-top: 1px solid #141414; padding: 20px 48px; display: flex; align-items: center; justify-content: space-between; }
    .footer-bottom p { color: #333; font-size: 12px; }
    .footer-bottom-links { display: flex; gap: 24px; }
    .footer-bottom-links a { color: #333; font-size: 12px; text-decoration: none; transition: color 0.2s; }
    .footer-bottom-links a:hover { color: #666; }
    @media (max-width: 768px) { nav { padding: 16px 20px; } .nav-links { display: none; } .back-link { padding: 24px 20px 0; } .posts { padding: 0 16px 60px; } footer { grid-template-columns: 1fr; padding: 40px 20px 32px; } .footer-right { text-align: left; } .footer-bottom { flex-direction: column; gap: 12px; padding: 20px; text-align: center; } .footer-bottom-links { flex-wrap: wrap; justify-content: center; } }
  `

  const posts = [
    {
      slug: 'cold-email-process-that-gets-results-2026',
      label: 'COLD EMAIL',
      title: "The Only Cold Email Process That Will Get You Results in 2026 - and It's 0 Tactics or Secret Hacks",
      desc: 'Everyone is chasing the next subject line trick, AI personalization tool, or inbox hack. The truth is simpler, harder, and the only thing that actually works in 2026.',
      author: 'Badr Chatt',
      date: 'July 12, 2026',
      read: '7 min read',
    },
    {
      slug: 'how-to-write-cold-emails-that-get-replies',
      label: 'COPYWRITING',
      title: 'How to Write Cold Emails That Actually Get Replies',
      desc: 'The exact framework we use to hit 3–13% reply rates consistently across every campaign we run.',
      author: 'Badr Chatt',
      date: 'July 5, 2026',
      read: '6 min read',
    },
    {
      slug: 'cold-email-deliverability-complete-guide',
      label: 'DELIVERABILITY',
      title: 'Cold Email Deliverability: The Complete Guide',
      desc: 'SPF, DKIM, DMARC, domain warming — everything you need to land in the primary inbox every time.',
      author: 'Badr Chatt',
      date: 'June 28, 2026',
      read: '9 min read',
    },
    {
      slug: 'how-to-book-20-meetings-a-month-cold-email',
      label: 'RESULTS',
      title: 'How to Book 20+ Qualified Meetings a Month With Cold Email',
      desc: 'The outbound system behind $9.5M in revenue generated for our clients — broken down step by step.',
      author: 'Badr Chatt',
      date: 'June 20, 2026',
      read: '8 min read',
    },
    {
      slug: 'cold-email-vs-linkedin-outreach-2026',
      label: 'STRATEGY',
      title: 'Cold Email vs LinkedIn Outreach: Which Wins in 2026?',
      desc: 'A data-driven breakdown of which channel delivers better ROI for B2B lead generation and client acquisition.',
      author: 'Badr Chatt',
      date: 'June 14, 2026',
      read: '5 min read',
    },
    {
      slug: 'b2b-cold-email-lead-generation-guide',
      label: 'LEAD GEN',
      title: 'How to Find and Qualify Leads for Cold Email Campaigns',
      desc: 'The exact tools, filters, and criteria we use to build hyper-targeted lead lists for every campaign we run.',
      author: 'Badr Chatt',
      date: 'June 7, 2026',
      read: '7 min read',
    },
  ]

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <nav>
        <a href="https://becgrowth.com" className="nav-logo"><strong>bec</strong>growth</a>
        <ul className="nav-links">
          <li><a href="https://becgrowth.com">Home</a></li>
          <li><a href="https://becgrowth.com/clients">Clients</a></li>
          <li><a href="https://becgrowth.com/about">About Us</a></li>
          <li><a href="/" className="active">Blog</a></li>
          <li><a href="https://becgrowth.com/testimonials">Testimonials</a></li>
        </ul>
        <a href="https://calendly.com/becgrowth/priority" className="nav-cta">Book a Call ↗</a>
      </nav>

      <a href="https://becgrowth.com" className="back-link">← Back to Home</a>

      <div className="hero">
        <div className="hero-label">Blog</div>
        <h1 className="hero-title">Insights from <em>BEC Growth</em></h1>
        <p className="hero-desc">Playbooks, teardowns, and lessons from building outbound systems for 30+ B2B companies.</p>
      </div>

      <div className="posts">
        {posts.map(post => (
          <a key={post.slug} href={`/blog/${post.slug}`} className="post-card">
            <div className="post-card-label">{post.label}</div>
            <div className="post-card-title">{post.title}</div>
            <div className="post-card-desc">{post.desc}</div>
            <div className="post-card-meta">
              <div className="post-card-info">
                <span className="author">{post.author}</span>
                <span className="dot">·</span>
                <span>{post.date}</span>
                <span className="dot">·</span>
                <span>{post.read}</span>
              </div>
              <span className="post-card-read">Read ↗</span>
            </div>
          </a>
        ))}
      </div>

      <footer>
        <div className="footer-left">
          <a href="https://becgrowth.com" className="footer-logo"><strong>bec</strong>growth</a>
          <p>BEC Growth is a B2B cold email and client acquisition agency that builds and manages outbound systems for service-based & product companies looking to generate consistent pipeline and add $30,000–100,000+ in revenue in 90 days.</p>
        </div>
        <div className="footer-right">
          <h4>Menu</h4>
          <ul>
            <li><a href="https://becgrowth.com">Home</a></li>
            <li><a href="https://becgrowth.com/clients">Clients</a></li>
            <li><a href="https://becgrowth.com/about">About Us</a></li>
            <li><a href="https://becgrowth.com/testimonials">Testimonials</a></li>
            <li><a href="/">Blog</a></li>
            <li><a href="https://calendly.com/becgrowth/priority">Book a Call</a></li>
          </ul>
        </div>
      </footer>

      <div className="footer-social">
        <a href="https://linkedin.com/company/bec-growth" target="_blank" rel="noopener noreferrer">in</a>
        <a href="https://instagram.com/becgrowth" target="_blank" rel="noopener noreferrer">ig</a>
      </div>

      <div className="footer-bottom">
        <p>© 2026 BEC Growth LLC. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="https://becgrowth.com/clients">Clients</a>
          <a href="https://becgrowth.com/about">About Us</a>
          <a href="https://becgrowth.com/testimonials">Testimonials</a>
          <a href="/">Blog</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms & Conditions</a>
        </div>
      </div>
    </>
  )
}