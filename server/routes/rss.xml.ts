import { defineEventHandler, setResponseHeader } from 'h3'

export default defineEventHandler(async (event) => {
  const siteUrl = 'https://0xw0tan.dev'
  const siteName = '0xw0tan'
  const siteDescription = 'Personal site and tech blog by 0xw0tan — backend engineering, security, and software craft.'

  // Query blog posts from content collection
  const posts = await queryCollection(event, 'blog')
    .where('draft', '=', false)
    .where('lang', '=', 'en')
    .order('date', 'DESC')
    .limit(20)
    .all()

  const items = posts.map((post: any) => {
    const slug = post.stem?.split('/').pop() || ''
    const pubDate = new Date(post.date).toUTCString()
    return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/blog/${slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${slug}</guid>
      <description><![CDATA[${post.description || ''}]]></description>
      <pubDate>${pubDate}</pubDate>
      ${post.category ? `<category>${post.category}</category>` : ''}
      ${post.tags?.map((t: string) => `<category>${t}</category>`).join('\n      ') || ''}
    </item>`
  }).join('\n')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteName}</title>
    <link>${siteUrl}</link>
    <description>${siteDescription}</description>
    <language>en</language>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`

  setResponseHeader(event, 'content-type', 'application/xml; charset=utf-8')
  setResponseHeader(event, 'cache-control', 'max-age=600, s-maxage=3600')
  return rss
})
