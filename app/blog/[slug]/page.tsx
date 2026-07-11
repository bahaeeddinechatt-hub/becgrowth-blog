import { createClient } from '@supabase/supabase-js'
import Anthropic from '@anthropic-ai/sdk'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

type Props = { params: Promise<{ slug: string }> }

export const runtime = 'edge'

export default async function BlogPost({ params }: Props) {
  const { slug } = await params

  const { data } = await supabase
    .from('blog_posts')
    .select('title, content')
    .eq('slug', slug)
    .single()

  let title = data?.title
  let content = data?.content

  if (!content) {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: `Write a detailed, helpful blog post for a B2B cold email agency blog about: "${slug.replace(/-/g, ' ')}".

Format the response as JSON with this structure:
{"title": "...", "content": "..."}

The content should be in HTML format with proper h2, h3, p, ul, li tags.
Make it 800-1200 words, practical, and valuable for business owners looking to grow through cold email.
Only return the JSON, nothing else.`,
        },
      ],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    const parsed = JSON.parse(text)
    title = parsed.title
    content = parsed.content

    await supabase.from('blog_posts').insert({ slug, title, content })
  }

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Inter:wght@300;400;500;600&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background-color: #0a0a0a; color: #e8e8e8; font-family: 'Inter', sans-serif; min-height: 100vh; }
    nav { display: flex; align-items: center; justify-content: space-between; padding: 20px 48px; border-bottom: 1px solid #1a1a1a; position: sticky; top: 0; background: rgba(10,10,10,0.95); backdrop-filter: blur(10px); z-index: 100; }
    .nav-logo { font-family: 'Inter', sans-serif; font-size: 20px; font-weight: 600; color: #fff; text-decoration: none; letter-spacing: -0.5px; }
    .nav-logo span { color: #c0392b; }
    .nav-links { display: flex; align-items: center; gap: 32px; list-style: none; }
    .nav-links a { color: #999; text-decoration: none; font-size: 14px; transition: color 0.2s; }
    .nav-links a:hover { color: #fff; }
    .nav-cta { background: #c0392b; color: #fff; padding: 10px 20px; border-radius: 100px; font-size: 14px; font-weight: 500; text-decoration: none; display: flex; align-items: center; gap: 6px; }
    .nav-cta:hover { background: #a93226; }
    .hero { max-width: 800px; margin: 64px auto 0; padding: 0 24px 48px; border-bottom: 1px solid #1a1a1a; }
    .back-link { display: inline-flex; align-items: center; gap: 8px; color: #666; text-decoration: none; font-size: 13px; margin-bottom: 32px; transition: color 0.2s; }
    .back-link:hover { color: #c0392b; }
    .post-label { display: inline-block; background: rgba(192,57,43,0.15); color: #c0392b; border: 1px solid rgba(192,57,43,0.3); padding: 4px 12px; border-radius: 100px; font-size: 12px; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 24px; }
    .post-title { font-family: 'Playfair Display', serif; font-size: clamp(32px, 5vw, 52px); font-weight: 700; line-height: 1.15; color: #fff; margin-bottom: 24px; letter-spacing: -0.5px; }
    .post-meta { display: flex; align-items: center; gap: 16px; color: #555; font-size: 13px; }
    .post-meta span { color: #333; }
    .content-wrapper { max-width: 800px; margin: 0 auto; padding: 48px 24px; }
    .content-wrapper h2 { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; color: #fff; margin: 48px 0 16px; line-height: 1.3; }
    .content-wrapper h3 { font-size: 18px; font-weight: 600; color: #e0e0e0; margin: 32px 0 12px; }
    .content-wrapper p { color: #aaa; font-size: 16px; line-height: 1.8; margin-bottom: 20px; font-weight: 300; }
    .content-wrapper ul, .content-wrapper ol { margin: 16px 0 24px 0; padding-left: 0; list-style: none; }
    .content-wrapper li { color: #aaa; font-size: 16px; line-height: 1.7; margin-bottom: 12px; padding-left: 20px; position: relative; font-weight: 300; }
    .content-wrapper li::before { content: 'arrow'; position: absolute; left: 0; color: #c0392b; font-size: 13px; top: 3px; }
    .content-wrapper strong { color: #e8e8e8; font-weight: 600; }
    .content-wrapper a { color: #c0392b; text-decoration: none; }
    .cta-section { background: linear-gradient(135deg, #1a0a0a 0%, #0f0505 100%); border: 1px solid #2a1010; border-radius: 16px; padding: 48px; margin: 64px 0 0; text-align: center; }
    .cta-title { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 700; color: #fff; margin: 0 0 12px; line-height: 1.2; }
    .cta-desc { color: #666; font-size: 15px; margin-bottom: 32px; }
    .cta-btn { display: inline-flex; align-items: center; gap: 8px; background: #c0392b; color: #fff; padding: 14px 28px; border-radius: 100px; font-size: 15px; font-weight: 500; text-decoration: none; }
    .cta-btn:hover { background: #a93226; }
    footer { border-top: 1px solid #1a1a1a; margin-top: 80px; padding: 32px 48px; display: flex; align-items: center; justify-content: space-between; }
    footer p { color: #444; font-size: 13px; }
    @media (max-width: 640px) { nav { padding: 16px 20px; } .nav-links { display: none; } .hero { margin-top: 40px; } .cta-section { padding: 32px 24px; } footer { flex-direction: column; gap: 16px; padding: 24px 20px; } }
  `

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
        <a href="https://becgrowth.com/#book" className="nav-cta">Book a Call ↗</a>
      </nav>

      <div className="hero">
        <a href="https://blog.becgrowth.com" className="back-link">← Back to Blog</a>
        <div className="post-label">B2B Cold Email</div>
        <h1 className="post-title">{title}</h1>
        <div className="post-meta">
          <span>BEC Growth</span>
          •
          <span>Cold Email &amp; Client Acquisition</span>
        </div>
      </div>

      <div className="content-wrapper">
        <div dangerouslySetInnerHTML={{ __html: content || '' }} />
        <div className="cta-section">
          <p className="cta-title">Ready to Sign Clients On-Demand?</p>
          <p className="cta-desc">BEC Growth builds and manages your entire cold email system — from infrastructure to reply handling.</p>
          <a href="https://becgrowth.com/#book" className="cta-btn">Book a Call ↗</a>
        </div>
      </div>

      <footer>
        <a href="https://becgrowth.com" className="nav-logo"><span>bec</span>growth</a>
        <p>© 2026 BEC Growth. All rights reserved.</p>
      </footer>
    </>
  )
}