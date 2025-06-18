"use client"

import { Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, Eye } from "lucide-react"
import { useEffect, useState } from "react"
import { supabase, type Article } from "@/lib/supabase"
import { useSearchParams } from "next/navigation"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [webResults, setWebResults] = useState<any[]>([])
  const [dbResults, setDbResults] = useState<Article[]>([])
  const [loadingWeb, setLoadingWeb] = useState(false)
  const [loadingDb, setLoadingDb] = useState(false)
  const [errorWeb, setErrorWeb] = useState<string | null>(null)
  const [errorDb, setErrorDb] = useState<string | null>(null)

  useEffect(() => {
    if (!query) return
    // Web search
    setLoadingWeb(true)
    setErrorWeb(null)
    fetch(`/api/search?q=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(data => {
        // Bing API: data.webPages.value is the array of results
        setWebResults(data.webPages?.value || [])
        setLoadingWeb(false)
      })
      .catch(err => {
        setErrorWeb("Failed to fetch web search results")
        setLoadingWeb(false)
      })
    // Internal DB search
    setLoadingDb(true)
    setErrorDb(null)
    supabase
      .from("articles")
      .select("*")
      .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
      .order("published_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          setErrorDb("Failed to fetch internal articles")
          setDbResults([])
        } else {
          setDbResults(data || [])
        }
        setLoadingDb(false)
      })
  }, [query])

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto mb-12">
          <form action="/search" className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-red-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative">
              <Input
                name="q"
                defaultValue={query}
                className="pl-6 pr-16 py-8 text-lg rounded-2xl border-2 border-amber-200 bg-white/90 backdrop-blur-sm shadow-xl focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition-all"
                placeholder="Search Bay Area Korean news, events, and updates..."
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl h-12 w-12 bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600 shadow-lg"
              >
                <Search className="h-6 w-6" />
                <span className="sr-only">Search</span>
              </Button>
            </div>
          </form>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {query ? `Search results for "${query}"` : "All Articles"}
              </h1>
              {(loadingWeb || loadingDb) && <p className="text-gray-600 mt-2">Loading...</p>}
              {(errorWeb || errorDb) && <p className="text-red-600 mt-2">{errorWeb || errorDb}</p>}
              {!loadingWeb && !loadingDb && !errorWeb && !errorDb && (
                <p className="text-gray-600 mt-2">{dbResults.length + webResults.length} results found</p>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Latest
              </Button>
              <Button variant="outline" size="sm">
                Most Popular
              </Button>
              <Button variant="outline" size="sm">
                Trending
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Internal DB Results */}
              {dbResults.length > 0 && (
                <>
                  <h2 className="text-xl font-bold text-amber-700 mb-2">Articles from Korean Daily SF</h2>
                  {dbResults.map((article) => (
                    <Link key={article.id} href={`/article/${article.id}`}>
                      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white">
                        <CardContent className="p-0">
                          <div className="flex flex-col sm:flex-row">
                            <div className="relative h-48 sm:h-32 sm:w-48 flex-shrink-0">
                              <Image
                                src={article.image_url || "/placeholder.svg"}
                                alt={article.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <div className="p-6 flex-1">
                              <div className="flex items-center gap-2 mb-3">
                                <Badge variant="outline" className="border-amber-200 text-amber-700">
                                  {article.category}
                                </Badge>
                              </div>
                              <h2 className="text-xl font-bold text-gray-900 group-hover:text-red-700 transition-colors mb-3">
                                {article.title}
                              </h2>
                              <p className="text-gray-600 line-clamp-2 mb-4">{article.excerpt}</p>
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
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </>
              )}
              {/* Web Results */}
              {webResults.length > 0 && (
                <>
                  <h2 className="text-xl font-bold text-blue-700 mb-2">Web Results</h2>
                  {webResults.map((item) => (
                    <a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer">
                      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white">
                        <CardContent className="p-0">
                          <div className="flex flex-col sm:flex-row">
                            {/* Bing API may not have images, so skip Image for now */}
                            <div className="p-6 flex-1">
                              <div className="flex items-center gap-2 mb-3">
                                <Badge variant="outline" className="border-amber-200 text-amber-700">
                                  Web
                                </Badge>
                              </div>
                              <h2 className="text-xl font-bold text-gray-900 group-hover:text-red-700 transition-colors mb-3">
                                {item.name}
                              </h2>
                              <p className="text-gray-600 line-clamp-2 mb-4">{item.snippet}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span>{item.displayUrl}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </a>
                  ))}
                </>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <Card className="p-6 bg-gradient-to-br from-amber-50 to-red-50 border-0">
                <h3 className="font-bold text-gray-900 mb-4">Popular Categories</h3>
                <div className="space-y-2">
                  {["Community", "Events", "Business", "Food", "Arts", "Education"].map((category) => (
                    <Link
                      key={category}
                      href={`/category/${category.toLowerCase()}`}
                      className="block px-3 py-2 rounded-lg hover:bg-white/50 transition-colors text-gray-700 hover:text-red-700"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </Card>

              <Card className="p-6 bg-white border-0 shadow-lg">
                <h3 className="font-bold text-gray-900 mb-4">Newsletter</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Get the latest Korean community news delivered to your inbox.
                </p>
                <form className="space-y-3">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="border-amber-200 focus:border-amber-400"
                  />
                  <Button className="w-full bg-gradient-to-r from-amber-500 to-red-500">Subscribe</Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
