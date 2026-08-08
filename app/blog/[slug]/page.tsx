import { createClient } from '@supabase/supabase-js'
import Anthropic from '@anthropic-ai/sdk'

type Props = { params: Promise<{ slug: string }> }

export const runtime = 'edge'
export const maxDuration = 60

export default async function BlogPost({ params }: Props) {
  const { slug } = await params

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || ''
    )

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY!,
    })

    const { data, error: dbError } = await supabase
      .from('blog_posts')
      .select('title, content')
      .eq('slug', slug)
      .single()

    if (dbError && dbError.code !== 'PGRST116') {
      return <div style={{color:'white',padding:'40px'}}>DB Error: {JSON.stringify(dbError)}</div>
    }

    let title = data?.title
    let content = data?.content

    if (!content) {
      const stopWords = ['cold', 'email', 'for', 'the', 'a', 'of', 'to', 'in', 'on', 'vs', 'b2b', 'and', '2026']
      const keywords = slug
        .replace(/-/g, ' ')
        .split(' ')
        .filter((w) => w.length > 2 && !stopWords.includes(w))

      let relatedPosts: { slug: string; title: string }[] = []

      if (keywords.length > 0) {
        const orFilter = keywords.map((k) => `slug.ilike.%${k}%`).join(',')
        const { data: relatedData } = await supabase
          .from('blog_posts')
          .select('slug, title')
          .or(orFilter)
          .neq('slug', slug)
          .limit(25)

        relatedPosts = relatedData || []
      }

      if (relatedPosts.length < 6) {
        const { data: fallbackData } = await supabase
          .from('blog_posts')
          .select('slug, title')
          .neq('slug', slug)
          .limit(15)

        const existingSlugs = new Set(relatedPosts.map((p) => p.slug))
        for (const p of fallbackData || []) {
          if (!existingSlugs.has(p.slug)) relatedPosts.push(p)
        }
      }

      const relatedPostsList = relatedPosts
        .slice(0, 20)
        .map((p) => `- "${p.title}" -> https://blog.becgrowth.com/blog/${p.slug}`)
        .join('\n')

      const linkingInstructions = relatedPosts.length > 0
        ? `
LINKING REQUIREMENTS:
Here is a list of other real, published posts on this blog you can link to:
${relatedPostsList}

- Naturally hyperlink 1-2 relevant phrases within the body of the article to 2 of the most topically relevant posts from that list, using real <a href="URL">anchor text</a> tags. Only link if it fits naturally in a sentence - do not force it.
- At the end of the article (after the last h2 section), add a section titled "Related Guides" with an h2, followed by a ul with 3-5 <li><a href="URL">Post Title</a></li> items, choosing the most relevant posts from the list above.
- Do NOT invent URLs or slugs. Only link to the exact URLs listed above.
`
        : ''

      const response = await anthropic.messages.create({
        model: 'claude-haiku-4-5',
        max_tokens: 3000,
        messages: [
          {
            role: 'user',
            content: `Write a practical, human blog post for the BEC Growth blog about: "${slug.replace(/-/g, ' ')}".

BEC Growth is a B2B cold email agency that helps service businesses and agencies sign 5-20+ clients per month using cold email only. They handle everything - infrastructure, leads, copy, campaigns, reply handling.

VALUE RULES (this is the most important part):
- Give real, specific, usable advice - actual frameworks, actual numbers, actual examples. Someone should be able to take this post and do something with it today, without ever talking to BEC Growth.
- Avoid vague advice like "personalize your emails" or "test different subject lines" with no specifics. Instead: give the actual structure, the actual example line, the actual benchmark number.
- Include at least one concrete example (a sample subject line, a sample opener, a sample number/benchmark) somewhere in the post - not just abstract advice.
- Write like a practitioner sharing what actually works, not a marketer selling a service.

FUNNEL RULES (how this connects to BEC Growth):
- Do NOT mention BEC Growth until the final section.
- The value in the post should be real enough to work standalone. The soft pitch is for people who read all this and think "I get it, but I don't want to build/run/manage this myself."
- In the final section, name the specific gap between "knowing this" and "having it actually running well at scale" - that gap is what BEC Growth closes. Be specific to the topic of this post, not generic.
- Keep the pitch short (2-4 sentences) and undramatic. No hard sell, no urgency language, no "limited time."

STYLE RULES:
- Write like a human, not a marketer. No buzzwords, no corporate speak.
- Use "-" instead of em dashes.
- Start by calling out a real pain point the reader is experiencing.
- Tone: direct, confident, practical. Like advice from someone who has done this 100 times.
- No fluff. No "In today's digital landscape..." openers. Just get to the point.
${linkingInstructions}
Format the response as JSON:
{"title": "...", "content": "..."}

The content must be in clean HTML using h2, h3, p, ul, li, a tags only.
Aim for 900-1100 words.
IMPORTANT: Return ONLY the raw JSON object. No markdown, no backticks, no explanation.`,
          },
        ],
      })

      const text = response.content[0].type === 'text' ? response.content[0].text : ''

      let parsedTitle = ''
      let parsedContent = ''

      try {
        const clean = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
        try {
          const parsed = JSON.parse(clean)
          parsedTitle = parsed.title
          parsedContent = parsed.content
        } catch {
          const titleMatch = clean.match(/"title"\s*:\s*"((?:[^"\\]|\\.)*)"/)
          const contentMatch = clean.match(/"content"\s*:\s*"((?:[^"\\]|\\.)*)"/)
          if (titleMatch && contentMatch) {
            parsedTitle = titleMatch[1].replace(/\\"/g, '"').replace(/\\n/g, '')
            parsedContent = contentMatch[1].replace(/\\"/g, '"').replace(/\\n/g, '')
          } else {
            return <div style={{color:'white',padding:'40px'}}>Parse Error: {text}</div>
          }
        }
      } catch {
        return <div style={{color:'white',padding:'40px'}}>Error processing response</div>
      }

      title = parsedTitle
      content = parsedContent

      await supabase.from('blog_posts').insert({ slug, title, content })
    }

    const metaDescription = `${title} - Practical guide from BEC Growth, the B2B cold email agency helping businesses sign 5-20+ clients per month. No ads, no fluff - just cold email that works.`

    const styles = `
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Inter:wght@300;400;500;600&display=swap');
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { background-color: #0a0a0a; color: #e8e8e8; font-family: Inter, sans-serif; min-height: 100vh; }
      nav { display: flex; align-items: center; justify-content: space-between; padding: 20px 48px; border-bottom: 1px solid #1a1a1a; position: sticky; top: 0; background: rgba(10,10,10,0.95); backdrop-filter: blur(10px); z-index: 100; }
      .nav-logo { font-size: 20px; font-weight: 600; color: #fff; text-decoration: none; letter-spacing: -0.5px; }
      .nav-logo span { color: #c0392b; }
      .nav-links { display: flex; align-items: center; gap: 32px; list-style: none; }
      .nav-links a { color: #999; text-decoration: none; font-size: 14px; }
      .nav-cta { background: #c0392b; color: #fff !important; padding: 10px 20px; border-radius: 100px; font-size: 14px; font-weight: 500; text-decoration: none; }
      .hero { max-width: 800px; margin: 64px auto 0; padding: 0 24px 48px; border-bottom: 1px solid #1a1a1a; }
      .back-link { display: inline-flex; align-items: center; gap: 8px; color: #666; text-decoration: none; font-size: 13px; margin-bottom: 32px; }
      .post-label { display: inline-block; background: rgba(192,57,43,0.15); color: #c0392b; border: 1px solid rgba(192,57,43,0.3); padding: 4px 12px; border-radius: 100px; font-size: 12px; font-weight: 500; text-transform: uppercase; margin-bottom: 24px; }
      .post-title { font-family: 'Playfair Display', serif; font-size: clamp(32px, 5vw, 52px); font-weight: 700; line-height: 1.15; color: #fff; margin-bottom: 24px; }
      .post-meta { display: flex; align-items: center; gap: 16px; color: #555; font-size: 13px; }
      .content-wrapper { max-width: 800px; margin: 0 auto; padding: 48px 24px; }
      .content-wrapper h2 { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; color: #fff; margin: 48px 0 16px; }
      .content-wrapper h3 { font-size: 18px; font-weight: 600; color: #e0e0e0; margin: 32px 0 12px; }
      .content-wrapper p { color: #aaa; font-size: 16px; line-height: 1.8; margin-bottom: 20px; font-weight: 300; }
      .content-wrapper ul, .content-wrapper ol { margin: 16px 0 24px 0; padding-left: 0; list-style: none; }
      .content-wrapper li { color: #aaa; font-size: 16px; line-height: 1.7; margin-bottom: 12px; padding-left: 20px; position: relative; font-weight: 300; }
      .content-wrapper li::before { content: "→"; position: absolute; left: 0; color: #c0392b; font-size: 13px; top: 3px; }
      .content-wrapper strong { color: #e8e8e8; font-weight: 600; }
      .content-wrapper a { color: #c0392b; text-decoration: none; }
      .cta-section { background: linear-gradient(135deg, #1a0a0a 0%, #0f0505 100%); border: 1px solid #2a1010; border-radius: 16px; padding: 48px; margin: 64px 0 0; text-align: center; }
      .cta-title { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 700; color: #fff; margin: 0 0 12px; line-height: 1.2; }
      .cta-desc { color: #666; font-size: 15px; margin-bottom: 32px; }
      .cta-btn { display: inline-flex; align-items: center; gap: 8px; background: #c0392b; color: #fff !important; padding: 14px 28px; border-radius: 100px; font-size: 15px; font-weight: 600; text-decoration: none; border: none; }
      .cta-btn:hover { background: #a93226; }
      footer { border-top: 1px solid #1a1a1a; margin-top: 80px; padding: 32px 48px; display: flex; align-items: center; justify-content: space-between; }
      footer p { color: #444; font-size: 13px; }
      @media (max-width: 640px) { nav { padding: 16px 20px; } .nav-links { display: none; } .hero { margin-top: 40px; } .cta-section { padding: 32px 24px; } footer { flex-direction: column; gap: 16px; padding: 24px 20px; } }
    `

    return (
      <>
        <head>
          <title>{title}</title>
          <meta name="description" content={metaDescription} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={metaDescription} />
          <meta property="og:type" content="article" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={metaDescription} />
        </head>
        <style dangerouslySetInnerHTML={{ __html: styles }} />
        <nav>
          <a href="https://becgrowth.com" className="nav-logo"><span>bec</span>growth</a>
          <ul className="nav-links">
            <li><a href="https://becgrowth.com">Home</a></li>
            <li><a href="https://becgrowth.com/clients">Clients</a></li>
            <li><a href="https://becgrowth.com/about">About Us</a></li>
            <li><a href="https://becgrowth.com/testimonials">Testimonials</a></li>
          </ul>
          <a href="https://calendly.com/becgrowth/priority" className="nav-cta">Book a Call</a>
        </nav>
        <div className="hero">
          <a href="https://blog.becgrowth.com" className="back-link">← Back to Blog</a>
          <div className="post-label">B2B Cold Email</div>
          <h1 className="post-title">{title}</h1>
          <div className="post-meta">
            <span>BEC Growth</span>
            <span>·</span>
            <span>Cold Email and Client Acquisition</span>
          </div>
        </div>
        <div className="content-wrapper">
          <div dangerouslySetInnerHTML={{ __html: content || '' }} />
          <div className="cta-section">
            <p className="cta-title">Ready to Sign Clients On-Demand?</p>
            <p className="cta-desc">BEC Growth builds and manages your entire cold email system from infrastructure to reply handling.</p>
            <a href="https://calendly.com/becgrowth/priority" className="cta-btn">Book a Call →</a>
          </div>
        </div>
        <footer>
          <a href="https://becgrowth.com" className="nav-logo"><span>bec</span>growth</a>
          <p>© 2026 BEC Growth. All rights reserved.</p>
        </footer>
      </>
    )
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    const stack = err instanceof Error ? err.stack : ''
    return (
      <div style={{color:'white',padding:'40px',fontFamily:'monospace'}}>
        <h1 style={{color:'#c0392b',marginBottom:'16px'}}>Error</h1>
        <p style={{marginBottom:'8px'}}>{message}</p>
        <pre style={{color:'#666',fontSize:'12px'}}>{stack}</pre>
      </div>
    )
  }
}