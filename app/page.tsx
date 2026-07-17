export const runtime = 'edge'

export default function Home() {
  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Inter:wght@300;400;500;600&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background-color: #0a0a0a; color: #e8e8e8; font-family: Inter, sans-serif; min-height: 100vh; }
    nav { display: flex; align-items: center; justify-content: space-between; padding: 20px 48px; }
    .nav-logo { font-size: 20px; font-weight: 400; color: #fff; text-decoration: none; }
    .nav-logo strong { font-weight: 700; }
    .nav-links { display: flex; align-items: center; gap: 32px; list-style: none; }
    .nav-links a { color: #999; text-decoration: none; font-size: 14px; transition: color 0.2s; }
    .nav-links a:hover { color: #fff; }
    .nav-links a.active { color: #c0392b; }
    .nav-cta { background: #c0392b; color: #fff; padding: 10px 20px; border-radius: 100px; font-size: 14px; font-weight: 500; text-decoration: none; display: flex; align-items: center; gap: 6px; }
    .back-link { display: inline-flex; align-items: center; gap: 8px; color: #666; text-decoration: none; font-size: 13px; padding: 40px 48px 0; }
    .back-link:hover { color: #999; }
    .hero { text-align: center; padding: 48px 24px 56px; }
    .hero-label { font-size: 11px; font-weight: 600; color: #c0392b; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 20px; }
    .hero-title { font-size: clamp(32px, 4vw, 48px); font-weight: 700; color: #fff; line-height: 1.15; margin-bottom: 16px; }
    .hero-title em { font-family: 'Playfair Display', serif; font-style: italic; color: #c0392b; }
    .hero-desc { color: #666; font-size: 15px; line-height: 1.6; }
    .posts { max-width: 560px; margin: 0 auto; padding: 0 24px 80px; display: flex; flex-direction: column; gap: 16px; }
    .post-card { background: #111; border: 1px solid #1e1e1e; border-radius: 12px; padding: 32px; text-decoration: none; display: block; transition: border-color 0.2s; }
    .post-card:hover { border-color: #333; }
    .post-card-label { font-size: 11px; font-weight: 600; color: #c0392b; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 16px; }
    .post-card-title { font-size: 20px; font-weight: 700; color: #fff; line-height: 1.35; margin-bottom: 12px; }
    .post-card-desc { color: #666; font-size: 14px; line-height: 1.6; margin-bottom: 20px; font-weight: 300; }
    .post-card-meta { display: flex; align-items: center; justify-content: space-between; }
    .post-card-info { display: flex; align-items: center; gap: 16px; color: #444; font-size: 13px; }
    .post-card-info span { display: flex; align-items: center; gap: 5px; }
    .post-card-read { color: #c0392b; font-size: 13px; text-decoration: none; display: flex; align-items: center; gap: 4px; }
    .post-card-read:hover { color: #e74c3c; }
    footer { border-top: 1px solid #141414; padding: 48px; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
    .footer-left .footer-logo { font-size: 18px; font-weight: 400; color: #fff; text-decoration: none; margin-bottom: 16px; display: block; }
    .footer-left .footer-logo strong { font-weight: 700; }
    .footer-left p { color: #444; font-size: 13px; line-height: 1.7; max-width: 320px; }
    .footer-right { text-align: right; }
    .footer-right h4 { font-size: 12px; font-weight: 700; color: #fff; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px; }
    .footer-right ul { list-style: none; display: flex; flex-direction: column; gap: 12px; }
    .footer-right ul a { color: #444; font-size: 14px; text-decoration: none; }
    .footer-right ul a:hover { color: #fff; }
    .footer-bottom { border-top: 1px solid #141414; padding: 24px 48px; display: flex; align-items: center; justify-content: space-between; }
    .footer-bottom p { color: #333; font-size: 12px; }
    .footer-bottom-links { display: flex; gap: 24px; }
    .footer-bottom-links a { color: #333; font-size: 12px; text-decoration: none; }
    .footer-bottom-links a:hover { color: #666; }
    .social-links { display: flex; justify-content: center; gap: 20px; padding: 0 0 32px; border-top: 1px solid #141414; padding-top: 32px; }
    .social-links a { color: #444; text-decoration: none; font-size: 20px; }
    .social-links a:hover { color: #fff; }
    @media (max-width: 640px) { nav { padding: 16px 20px; } .nav-links { display: none; } .back-link { padding: 24px 20px 0; } footer { grid-template-columns: 1fr; padding: 32px 20px; } .footer-right { text-align: left; } .footer-bottom { flex-direction: column; gap: 12px; padding: 20px; } }
  `

  const posts = [
    {
      slug: 'cold-email-strategy-b2b-agencies-2026',
      label: 'COLD EMAIL',
      title: 'The Only Cold Email Process That Will Get You Results in 2026 - and It\'s 0 Tactics or Secret Hacks',
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
      slug: 'cold-email-deliverability-guide',
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
          <li><a href="https://becgrowth.com/blog" className="active">Blog</a></li>
          <li><a href="https://becgrowth.com/testimonials">Testimonials</a></li>
        </ul>
        <a href="https://becgrowth.com/#book" className="nav-cta">Book a Call ↗</a>
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
                <span>{post.author}</span>
                <span>📅 {post.date}</span>
                <span>🕐 {post.read}</span>
              </div>
              <a href={`/blog/${post.slug}`} className="post-card-read">Read ↗</a>
            </div>
          </a>
        ))}
      </div>

      <footer>
        <div className="footer-left">
          <a href="https://becgrowth.com" className="footer-logo"><strong>bec</strong>growth</a>
          <p>BEC Growth is a B2B cold email and client acquisition agency that builds and manages outbound systems for service-based & product companies looking to generate consistent pipeline and add $30,000-100,000+ in revenue in 90 days.</p>
        </div>
        <div className="footer-right">
          <h4>Menu</h4>
          <ul>
            <li><a href="https://becgrowth.com">Home</a></li>
            <li><a href="https://becgrowth.com/clients">Clients</a></li>
            <li><a href="https://becgrowth.com/about">About Us</a></li>
            <li><a href="https://becgrowth.com/testimonials">Testimonials</a></li>
            <li><a href="/">Blog</a></li>
            <li><a href="https://becgrowth.com/#book">Book a Call</a></li>
          </ul>
        </div>
      </footer>

      <div className="social-links">
        <a href="https://linkedin.com/company/bec-growth" target="_blank" rel="noopener noreferrer">in</a>
        <a href="https://instagram.com/becgrowth" target="_blank" rel="noopener noreferrer">ig</a>
      </div>

      <div className="footer-bottom">
        <p>© 2026 BEC Growth LLC. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="/clients">Clients</a>
          <a href="/about">About Us</a>
          <a href="/testimonials">Testimonials</a>
          <a href="/">Blog</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms & Conditions</a>
        </div>
      </div>
    </>
  )
}