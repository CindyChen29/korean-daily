"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"

export default function NewArticlePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [article, setArticle] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "",
    tags: "",
    author: "",
    status: "draft" as "draft" | "published" | "scheduled",
    featured: false,
    image_url: "",
    seo_title: "",
    seo_description: "",
  })
  const [imageFile, setImageFile] = useState<File | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setArticle((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setArticle((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    if (!article.title || !article.content || !article.category || !article.author) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    let imageUrl = null

    try {
      // 1. Upload image if selected
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop()
        const fileName = `${Date.now()}.${fileExt}`
        const filePath = `${fileName}`
        // Upload the file
        const { error: uploadError } = await supabase.storage
          .from('article-images')
          .upload(filePath, imageFile, { cacheControl: '3600', upsert: false })

        if (uploadError) {
          console.error('Supabase upload error:', uploadError.message, uploadError)
          throw uploadError
        }

        // Get the public URL
        const { data: publicUrlData } = supabase.storage
          .from('article-images')
          .getPublicUrl(filePath)

        imageUrl = publicUrlData.publicUrl
      }

      // 2. Save article with imageUrl
      const tagsArray = article.tags ? article.tags.split(",").map((tag) => tag.trim()) : []

      const { error: insertError } = await supabase
        .from("articles")
        .insert([
          {
            ...article,
            tags: tagsArray,
            image_url: imageUrl,
            published_at: article.status === "published" ? new Date().toISOString() : null,
          },
        ])

      if (insertError) {
        console.error('Supabase insert error:', insertError.message, insertError)
        throw insertError
      }

      toast({
        title: "Success",
        description: "Article created successfully!",
      })

      router.push("/admin/dashboard")
    } catch (error) {
      console.error("Error creating article:", error)
      toast({
        title: "Error",
        description: `Failed to create article: ${(error as any).message || error}`,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Create New Article</h1>
            <p className="text-gray-600">Create engaging content for the Korean Daily SF community</p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handleSave}
              disabled={loading}
              className="bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600"
            >
              <Save className="mr-2 h-4 w-4" />
              {loading ? "Saving..." : "Save Article"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Article Content</CardTitle>
                <CardDescription className="text-gray-600">Write and format your article content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-gray-700 font-medium">
                    Title *
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={article.title}
                    onChange={handleChange}
                    placeholder="Enter a compelling article title"
                    className="border-gray-300 focus:border-amber-400 focus:ring-amber-100"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt" className="text-gray-700 font-medium">
                    Excerpt
                  </Label>
                  <Textarea
                    id="excerpt"
                    name="excerpt"
                    value={article.excerpt}
                    onChange={handleChange}
                    placeholder="Brief summary that will appear in article previews"
                    rows={3}
                    className="border-gray-300 focus:border-amber-400 focus:ring-amber-100"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content" className="text-gray-700 font-medium">
                    Content *
                  </Label>
                  <Textarea
                    id="content"
                    name="content"
                    value={article.content}
                    onChange={handleChange}
                    placeholder="Write your article content here using HTML formatting..."
                    className="min-h-[400px] border-gray-300 focus:border-amber-400 focus:ring-amber-100"
                    required
                  />
                  <p className="text-sm text-gray-500">
                    You can use HTML tags for formatting (p, h2, h3, strong, em, ul, li, etc.)
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Publishing Settings</CardTitle>
                <CardDescription className="text-gray-600">
                  Configure how your article will be published
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="author" className="text-gray-700 font-medium">
                    Author *
                  </Label>
                  <Input
                    id="author"
                    name="author"
                    value={article.author}
                    onChange={handleChange}
                    placeholder="Author name"
                    className="border-gray-300 focus:border-amber-400 focus:ring-amber-100"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status" className="text-gray-700 font-medium">
                    Status
                  </Label>
                  <Select value={article.status} onValueChange={(value) => handleSelectChange("status", value)}>
                    <SelectTrigger id="status" className="border-gray-300">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="text-gray-700 font-medium">
                    Category *
                  </Label>
                  <Select value={article.category} onValueChange={(value) => handleSelectChange("category", value)}>
                    <SelectTrigger id="category" className="border-gray-300">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Community">Community</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="Food">Food</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Arts">Arts</SelectItem>
                      <SelectItem value="Technology">Technology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags" className="text-gray-700 font-medium">
                    Tags
                  </Label>
                  <Input
                    id="tags"
                    name="tags"
                    value={article.tags}
                    onChange={handleChange}
                    placeholder="Enter tags separated by commas"
                    className="border-gray-300 focus:border-amber-400 focus:ring-amber-100"
                  />
                  <p className="text-xs text-gray-500">Use relevant tags to help readers find your content</p>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={article.featured}
                    onCheckedChange={(checked) => setArticle((prev) => ({ ...prev, featured: !!checked }))}
                  />
                  <Label htmlFor="featured" className="text-gray-700 font-medium">
                    Featured Article
                  </Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image" className="text-gray-700 font-medium">
                    Article Image
                  </Label>
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={e => setImageFile(e.target.files?.[0] || null)}
                    className="border-gray-300 focus:border-amber-400 focus:ring-amber-100"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">SEO Optimization</CardTitle>
                <CardDescription className="text-gray-600">Optimize your article for search engines</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="seo_title" className="text-gray-700 font-medium">
                    SEO Title
                  </Label>
                  <Input
                    id="seo_title"
                    name="seo_title"
                    value={article.seo_title}
                    onChange={handleChange}
                    placeholder="SEO optimized title (60 characters max)"
                    className="border-gray-300 focus:border-amber-400 focus:ring-amber-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seo_description" className="text-gray-700 font-medium">
                    Meta Description
                  </Label>
                  <Textarea
                    id="seo_description"
                    name="seo_description"
                    value={article.seo_description}
                    onChange={handleChange}
                    placeholder="Brief description for search results (160 characters max)"
                    rows={3}
                    className="border-gray-300 focus:border-amber-400 focus:ring-amber-100"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
