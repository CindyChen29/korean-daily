import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Article = {
  id: number
  title: string
  content: string
  excerpt: string | null
  category: string
  tags: string[] | null
  author: string
  status: "draft" | "published" | "scheduled"
  featured: boolean
  image_url: string | null
  seo_title: string | null
  seo_description: string | null
  views: number
  created_at: string
  updated_at: string
  published_at: string | null
}
