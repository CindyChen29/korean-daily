import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://thienkhgnvdcjsqfzxgu.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRoaWVua2hnbnZkY2pzcWZ6eGd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyMDYzNTksImV4cCI6MjA2NTc4MjM1OX0.WlhgFGRYgveqVj55HxUo6jruUbFIIbk4wshew_P3OSQ"

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
