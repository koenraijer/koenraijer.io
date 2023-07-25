export const prerender = true

export async function GET({ fetch, setHeaders }) {
    // Fetch posts from your API
    const response = await fetch(`/api/posts`)
    const posts = await response.json()
  
    setHeaders({
        'Cache-Control': `max-age=0, s-max-age=600`,
        'Content-Type': 'application/xml'
    })

    // Define the base properties of your RSS feed
    const name = "Koen Raijer's personal website"
    const website = "https://www.koenraijer.io"
    const websiteDescription = `${name}'s blog`
  
    // Generate the RSS feed
    const rss = `
      <rss version="2.0">
        <channel>
          <title>${name}</title>
          <link>${website}</link>
          <description>${websiteDescription}</description>
          ${posts.map(post => `
            <item>
              <title>${post.title}</title>
              <link>${website}/${post.slug}</link>
              <description>${post.description}</description>
              <pubDate>${new Date(post.date).toUTCString()}</pubDate>
              <guid>${website}/${post.slug}</guid>
            </item>
          `).join('')}
        </channel>
      </rss>
    `
  
    // Return the RSS feed
    return new Response(rss);
  }
  