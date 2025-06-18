"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, Eye } from "lucide-react"
import { supabase, type Article } from "@/lib/supabase"

// Fallback data in case database is not set up
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
]

export function FeaturedArticles() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [usingFallback, setUsingFallback] = useState(false)

  useEffect(() => {
    fetchFeaturedArticles()
  }, [])

  const fetchFeaturedArticles = async () => {
    try {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .limit(3)

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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
            <div className="bg-gray-200 h-4 rounded mb-2"></div>
            <div className="bg-gray-200 h-4 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    )
  }

  const [mainArticle, ...sideArticles] = articles

  return (
    <div className="space-y-6">
      {usingFallback && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <p className="text-amber-800 text-sm">
            <strong>Demo Mode:</strong> Showing sample articles. Create the database table in Supabase to see real
            content.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Featured Article */}
        {mainArticle && (
          <div className="lg:col-span-2">
            <Link href={`/article/${mainArticle.id}`}>
              <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 bg-white">
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={mainArticle.image_url || "/placeholder.svg?height=400&width=600"}
                    alt={mainArticle.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-red-600 hover:bg-red-700">Featured</Badge>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary" className="bg-white/20 text-white border-0">
                        {mainArticle.category}
                      </Badge>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-3 leading-tight">{mainArticle.title}</h2>
                    <p className="text-gray-200 mb-4 line-clamp-2">{mainArticle.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-300">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {mainArticle.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(mainArticle.published_at || mainArticle.created_at).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {mainArticle.views}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        )}

        {/* Side Articles */}
        <div className="space-y-6">
          {sideArticles.map((article) => (
            <Link key={article.id} href={`/article/${article.id}`}>
              <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-0 bg-white">
                <CardContent className="p-0">
                  <div className="flex gap-4">
                    <div className="relative w-32 h-24 flex-shrink-0">
                      <Image
                        src={article.image_url || "/placeholder.svg?height=100&width=150"}
                        alt={article.title}
                        fill
                        className="object-cover rounded-l-lg group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs border-amber-200 text-amber-700">
                          {article.category}
                        </Badge>
                      </div>
                      <h3 className="font-bold text-gray-900 group-hover:text-red-700 transition-colors line-clamp-2 mb-2">
                        {article.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>{new Date(article.published_at || article.created_at).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{article.views} views</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
