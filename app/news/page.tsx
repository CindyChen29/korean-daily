"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, Eye } from "lucide-react"
import { supabase, type Article } from "@/lib/supabase"

// Fallback data
const fallbackArticles = [
  {
    id: 1,
    title: "New Korean Cultural Center Opens in San Francisco",
    content: "<p>The Korean Cultural Center of San Francisco officially opened yesterday...</p>",
    excerpt: "The center will offer language classes, cultural events, and community gatherings.",
    category: "Community",
    tags: ["culture", "community", "education"],
    author: "Sarah Kim",
    status: "published" as const,
    featured: true,
    image_url: "/placeholder.svg?height=400&width=600",
    seo_title: null,
    seo_description: null,
    views: 1245,
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    published_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    title: "Korean Food Festival Returns to Union Square",
    content: "<p>The annual Korean Food Festival is back this weekend...</p>",
    excerpt: "Annual celebration of Korean cuisine features 30+ vendors and traditional performances.",
    category: "Food",
    tags: ["food", "festival", "culture"],
    author: "Jennifer Lee",
    status: "published" as const,
    featured: false,
    image_url: "/placeholder.svg?height=400&width=600",
    seo_title: null,
    seo_description: null,
    views: 2156,
    created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    published_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    title: "Korean Tech Startup Raises $10M in Series A Funding",
    content: "<p>A Korean-founded startup based in San Francisco has successfully raised $10 million...</p>",
    excerpt: "Local Korean-founded startup secures major funding round.",
    category: "Business",
    tags: ["business", "technology", "startup"],
    author: "Michael Park",
    status: "published" as const,
    featured: false,
    image_url: "/placeholder.svg?height=400&width=600",
    seo_title: null,
    seo_description: null,
    views: 987,
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    published_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 4,
    title: "Korean Language Program Expands to Bay Area Schools",
    content: "<p>The San Francisco Unified School District announced the expansion...</p>",
    excerpt: "SFUSD expands Korean language education to meet growing community demand.",
    category: "Education",
    tags: ["education", "language", "schools"],
    author: "David Kim",
    status: "published" as const,
    featured: false,
    image_url: "/placeholder.svg?height=400&width=600",
    seo_title: null,
    seo_description: null,
    views: 834,
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    published_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 5,
    title: "Local Korean Artist Exhibition Opens at SFMOMA",
    content: "<p>Contemporary Korean artist Min Jung Kim's solo exhibition...</p>",
    excerpt: "SFMOMA showcases Korean American artist's exploration of cultural identity.",
    category: "Arts",
    tags: ["arts", "culture", "exhibition"],
    author: "Lisa Park",
    status: "published" as const,
    featured: false,
    image_url: "/placeholder.svg?height=400&width=600",
    seo_title: null,
    seo_description: null,
    views: 567,
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    published_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

export default function NewsPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [usingFallback, setUsingFallback] = useState(false)

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("status", "published")
        .order("published_at", { ascending: false })

      if (error) {
        console.log("Database error, using fallback data:", error.message)
        setArticles(fallbackArticles)
        setUsingFallback(true)
      } else {
        setArticles(data || fallbackArticles)
        setUsingFallback(data?.length === 0)
      }
    } catch (error) {
      console.log("Connection error, using fallback data:", error)
      setArticles(fallbackArticles)
      setUsingFallback(true)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 border-l-4 border-amber-500 pl-4">
              뉴스 / Latest News
            </h1>
            <p className="text-gray-600 text-lg">
              Stay informed with the latest news from the Korean community in San Francisco Bay Area
            </p>
          </div>

          {usingFallback && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
              <p className="text-amber-800 text-sm">
                <strong>Demo Mode:</strong> Showing sample articles. Create the database table in Supabase to see real
                content.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link key={article.id} href={`/article/${article.id}`}>
                <Card className="group h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white">
                  <div className="relative h-48 w-full">
                    <Image
                      src={article.image_url || "/placeholder.svg?height=200&width=300"}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-white/90 text-gray-800">
                        {article.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-red-700 transition-colors mb-3 line-clamp-2">
                      {article.title}
                    </h2>
                    <p className="text-gray-600 line-clamp-3 mb-4">{article.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {article.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(article.published_at || article.created_at).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {article.views}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
