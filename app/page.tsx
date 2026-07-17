export const runtime = 'edge'

export default function Home() {
  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Inter:wght@300;400;500;600&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background-color: #0a0a0a; color: #e8e8e8; font-family: Inter, sans-serif; min-height: 100vh; }
    nav { display: flex; align-items: center; justify-content: space-between; padding: 20px 48px; border-bottom: 1px solid #1a1a1a; position: sticky; top: 0; background: rgba(10,10,10,0.95); backdrop-filter: blur(10px); z-index: 100; }
    .nav-logo { font-size: 20px; font-weight: 600; color: #fff; text-decoration: none; letter-spacing: -0.5px; }
    .nav-logo span { color: #c0392b; }
    .nav-links { display: flex; align-items: center; gap: 32px; list-style: none; }
    .nav-links a { color: #999; text-decoration: none; font-size: 14px; }
    .nav-cta { background: #c0392b; color: #fff; padding: 10px 20px; border-radius: 100px; font-size: 14px; font-weight: 500; text-decoration: none; }
    .hero { max-width: 900px; margin: 80px auto 0; padding: 0 24px 64px; text-align: center; }
    .hero-label { display: inline-block; background: rgba(192,57,43,0.15); color: #c0392b; border: 1px solid rgba(192,57,43,0.3); padding: 4px 12px; border-radius: 100px; font-size: 12px; font-weight: 500; text-transform: uppercase; margin-bottom: 24px; letter-spacing: 1px; }
    .hero-title { font-family: 'Playfair Display', serif; font-size: clamp(36px, 5vw, 64px); font-weight: 700; color: #fff; line-height: 1.1; margin-bottom: 20px; }
    .hero-title em { color: #c0392b; font-style: italic; }
    .hero-desc { color: #666; font-size: 17px; line-height: 1.7; max-width: 560px; margin: 0 auto 40px; font-weight: 300; }
    .search-bar { display: flex; align-items: center; gap: 12px; max-width: 480px; margin: 0 auto; background: #111; border: 1px solid #222; border-radius: 100px; padding: 6px 6px 6px 20px; }
    .search-bar input { flex: 1; background: none; border: none; outline: none; color: #e8e8e8; font-size: 14px; font-family: Inter, sans-serif; }
    .search-bar input::placeholder { color: #444; }
    .search-bar button { background: #c0392b; color: #fff; border: none; padding: 10px 20px; border-radius: 100px; font-size: 13px; font-weight: 500; cursor: pointer; font-family: Inter, sans-serif; }
    .topics { max-width: 900px; margin: 80px auto 0; padding: 0 24px; }
    .section-label { font-size: 12px; font-weight: 500; color: #444; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 24px; }
    .topics-grid { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 80px; }
    .topic-pill { background: #111; border: 1px solid #1e1e1e; color: #777; padding: 8px 16px; border-radius: 100px; font-size: 13px; text-decoration: none; transition: all 0.2s; }
    .topic-pill:hover { border-color: #c0392b; color: #c0392b; }
    .posts { max-width: 900px; margin: 0 auto; padding: 0 24px 80px; }
    .posts-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1px; background: #1a1a1a; border: 1px solid #1a1a1a; border-radius: 16px; overflow: hidden; }
    .post-card { background: #0a0a0a; padding: 32px; text-decoration: none; display: block; transition: background 0.2s; }
    .post-card:hover { background: #0f0f0f; }
    .post-card-label { font-size: 11px; font-weight: 500; color: #c0392b; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; }
    .post-card-title { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: #fff; line-height: 1.3; margin-bottom: 12px; }
    .post-card-desc { color: #555; font-size: 13px; line-height: 1.6; font-weight: 300; }
    .post-card-arrow { color: #c0392b; font-size: 18px; margin-top: 20px; display: block; }
    .cta-section { background: linear-gradient(135deg, #1a0a0a 0%, #0f0505 100%); border: 1px solid #2a1010; border-radius: 16px; padding: 64px 48px; margin: 0 24px 80px; text-align: center; max-width: 852px; margin-left: auto; margin-right: auto; }
    .cta-title { font-family: 'Playfair Display', serif; font-size: 36px; font-weight: 700; color: #fff; margin-bottom: 12px; }
    .cta-desc { color: #666; font-size: 15px; margin-bottom: 32px; }
    .cta-btn { display: inline-flex; align-items: center; gap: 8px; background: #c0392b; color: #fff; padding: 14px 28px; border-radius: 100px; font-size: 15px; font-weight: 500; text-decoration: none; }
    footer { border-top: 1px solid #1a1a1a; padding: 32px 48px; display: flex; align-items: center; justify-content: space-between; }
    footer p { color: #444; font-size: 13px; }
    @media (max-width: 640px) { nav { padding: 16px 20px; } .nav-links { display: none; } .hero { margin-top: 48px; } .cta-section { padding: 40px 24px; } footer { flex-direction: column; gap: 16px; padding: 24px 20px; } }
  `

  const featuredPosts = [
    { slug: 'cold-email-strategy-for-b2b-agencies', label: 'Strategy', title: 'Cold Email Strategy for B2B Agencies in 2026', desc: 'How to build a predictable pipeline using cold email only — no ads, no content, just outbound.' },
    { slug: 'how-to-write-cold-emails-that-get-replies', label: 'Copywriting', title: 'How to Write Cold Emails That Actually Get Replies', desc: 'The exact framework we use to hit 3–13% reply rates consistently across every campaign.' },
    { slug: 'cold-email-deliverability-guide', label: 'Deliverability', title: 'Cold Email Deliverability: The Complete Guide', desc: 'SPF, DKIM, DMARC, domain warming — everything you need to land in the primary inbox.' },
    { slug: 'how-to-book-20-meetings-a-month-with-cold-email', label: 'Results', title: 'How to Book 20+ Meetings a Month With Cold Email', desc: 'The outbound system behind $9.5M in revenue generated for our clients.' },
    { slug: 'cold-email-vs-linkedin-outreach', label: 'Comparison', title: 'Cold Email vs LinkedIn Outreach: Which Wins in 2026?', desc: 'A data-driven breakdown of which channel delivers better ROI for B2B lead generation.' },
    { slug: 'how-to-find-leads-for-cold-email', label: 'Lead Gen', title: 'How to Find Leads for Cold Email Campaigns', desc: 'The exact tools and filters we use to build hyper-targeted lead lists for every campaign.' },
  ]

  const topics = [
    'Cold Email', 'Client Acquisition', 'Lead Generation', 'Email Deliverability',
    'B2B Sales', 'Agency Growth', 'Cold Email Copywriting', 'Outbound Strategy',
    'Email Infrastructure', 'Reply Rates', 'Meeting Booking', 'SDR vs Agency',
  ]

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <nav>
        <a href="https://becgrowth.com" className="nav-logo">
          <span>bec</span>growth
        </a>
        <ul className="nav-links">
          <li><a href="https://becgrowth.com">Home</a></li>
          <li><a href="https://becgrowth.com/clients">Clients</a></li>
          <li><a href="https://becgrowth.com/about">About Us</a></li>
          <li><a href="https://becgrowth.com/testimonials">Testimonials</a></li>
        </ul>
        <a href="https://becgrowth.com/#book" className="nav-cta">Book a Call</a>
      </nav>

      <div className="hero">
        <div className="hero-label">BEC Growth Blog</div>
        <h1 className="hero-title">Cold Email Insights That <em>Actually</em> Close Deals</h1>
        <p className="hero-desc">Strategies, frameworks, and case studies from the agency that generated $9.5M for clients using cold email only.</p>
        <div className="search-bar">
          <input type="text" placeholder="Search articles..." />
          <button>Search</button>
        </div>
      </div>

      <div className="topics">
        <p className="section-label">Browse by topic</p>
        <div className="topics-grid">
          {topics.map(topic => (
            <a key={topic} href={`/blog/${topic.toLowerCase().replace(/ /g, '-')}`} className="topic-pill">{topic}</a>
          ))}
        </div>
      </div>

      <div className="posts">
        <p className="section-label">Featured articles</p>
        <div className="posts-grid">
          {featuredPosts.map(post => (
            <a key={post.slug} href={`/blog/${post.slug}`} className="post-card">
              <div className="post-card-label">{post.label}</div>
              <div className="post-card-title">{post.title}</div>
              <div className="post-card-desc">{post.desc}</div>
              <span className="post-card-arrow">→</span>
            </a>
          ))}
        </div>
      </div>

      <div className="cta-section">
        <p className="cta-title">Ready to Sign Clients On-Demand?</p>
        <p className="cta-desc">BEC Growth builds and manages your entire cold email system from infrastructure to reply handling.</p>
        <a href="https://becgrowth.com/#book" className="cta-btn">Book a Call →</a>
      </div>

      <footer>
        <a href="https://becgrowth.com" className="nav-logo"><span>bec</span>growth</a>
        <p>© 2026 BEC Growth. All rights reserved.</p>
      </footer>
    </>
  )
}