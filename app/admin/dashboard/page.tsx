"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Edit, Plus, Trash2, TrendingUp, Users, FileText, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { supabase, type Article } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"

export default function AdminDashboardPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const { toast } = useToast()

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase.from("articles").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setArticles(data || [])
    } catch (error) {
      console.error("Error fetching articles:", error)
      toast({
        title: "Error",
        description: "Failed to fetch articles",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "All" || article.category === categoryFilter
    const matchesStatus = statusFilter === "All" || article.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        const { error } = await supabase.from("articles").delete().eq("id", id)

        if (error) throw error

        setArticles(articles.filter((article) => article.id !== id))
        toast({
          title: "Success",
          description: "Article deleted successfully",
        })
      } catch (error) {
        console.error("Error deleting article:", error)
        toast({
          title: "Error",
          description: "Failed to delete article",
          variant: "destructive",
        })
      }
    }
  }

  const totalViews = articles.reduce((sum, article) => sum + article.views, 0)
  const publishedArticles = articles.filter((a) => a.status === "published").length

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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your Korean Daily SF content and community</p>
          </div>
          <Button asChild className="bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600">
            <Link href="/admin/articles/new">
              <Plus className="mr-2 h-4 w-4" /> Create Article
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-blue-700">Total Articles</CardTitle>
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900">{articles.length}</div>
              <p className="text-xs text-blue-600 mt-1">{publishedArticles} published</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0 shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-green-700">Total Views</CardTitle>
                <Eye className="h-5 w-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-900">{totalViews.toLocaleString()}</div>
              <p className="text-xs text-green-600 mt-1">All time</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-0 shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-purple-700">Categories</CardTitle>
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-900">{new Set(articles.map((a) => a.category)).size}</div>
              <p className="text-xs text-purple-600 mt-1">Active categories</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-0 shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-amber-700">Avg. Views</CardTitle>
                <Users className="h-5 w-5 text-amber-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-900">
                {articles.length > 0 ? Math.round(totalViews / articles.length) : 0}
              </div>
              <p className="text-xs text-amber-600 mt-1">Per article</p>
            </CardContent>
          </Card>
        </div>

        {/* Content Management */}
        <Card className="shadow-xl border-0 bg-white">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">Content Management</CardTitle>
            <CardDescription className="text-gray-600">
              Manage all your articles, events, and community content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-gray-300 focus:border-amber-400 focus:ring-amber-100"
                />
              </div>
              <div className="flex gap-4">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px] border-gray-300">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Categories</SelectItem>
                    <SelectItem value="Community">Community</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="Food">Food</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Arts">Arts</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px] border-gray-300">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Statuses</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="font-semibold text-gray-900">Title</TableHead>
                    <TableHead className="font-semibold text-gray-900">Category</TableHead>
                    <TableHead className="font-semibold text-gray-900">Status</TableHead>
                    <TableHead className="font-semibold text-gray-900">Views</TableHead>
                    <TableHead className="font-semibold text-gray-900">Date</TableHead>
                    <TableHead className="text-right font-semibold text-gray-900">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredArticles.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        No articles found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredArticles.map((article) => (
                      <TableRow key={article.id} className="hover:bg-gray-50 transition-colors">
                        <TableCell className="font-medium text-gray-900 max-w-xs">
                          <div className="truncate">{article.title}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-amber-200 text-amber-700">
                            {article.category}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              article.status === "published"
                                ? "default"
                                : article.status === "draft"
                                  ? "outline"
                                  : "secondary"
                            }
                            className={
                              article.status === "published"
                                ? "bg-green-100 text-green-800 border-green-200"
                                : article.status === "draft"
                                  ? "bg-gray-100 text-gray-800 border-gray-200"
                                  : "bg-blue-100 text-blue-800 border-blue-200"
                            }
                          >
                            {article.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-600">{article.views.toLocaleString()}</TableCell>
                        <TableCell className="text-gray-600">
                          {new Date(article.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" asChild className="hover:bg-blue-50">
                              <Link href={`/admin/articles/${article.id}`}>
                                <Edit className="h-4 w-4 text-blue-600" />
                                <span className="sr-only">Edit</span>
                              </Link>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(article.id)}
                              className="hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4 text-red-600" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
