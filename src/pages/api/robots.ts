import type { NextApiRequest, NextApiResponse } from 'next'

const productionRobotsContent = `# *
User-agent: *
Allow: /

# Host
Host: https://podkrepi.bg

# Sitemaps
Sitemap: https://podkrepi.bg/sitemap.xml
`

const devRobotsContent = `User-agent: *
Disallow: /
`

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (process.env.APP_ENV === 'production') {
    res.status(200).send(productionRobotsContent)
  } else {
    res.status(200).send(devRobotsContent)
  }
}
