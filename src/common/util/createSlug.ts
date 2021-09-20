import slugify from 'slugify'

export function createSlug(title: string): string {
  return slugify(title, { lower: true })
}
