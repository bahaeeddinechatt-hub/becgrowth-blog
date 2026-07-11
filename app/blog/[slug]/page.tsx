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

  // Check Supabase first
  const { data } = await supabase
    .from('blog_posts')
    .select('title, content')
    .eq('slug', slug)
    .single()

  let title = data?.title
  let content = data?.content

  // If not in Supabase, generate with Claude
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

    // Save to Supabase
    await supabase.from('blog_posts').insert({ slug, title, content })
  }

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content || '' }} />
    </div>
  )
}