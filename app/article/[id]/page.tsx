"use client"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase, type Article } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { User, Calendar, Eye, Clock } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchArticle = async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("id", id)
        .single();
      setArticle(data);
      setLoading(false);
    };
    fetchArticle();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!article) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Article not found</h1>
        <p className="text-gray-600 mt-2">The article you're looking for doesn't exist.</p>
        <Button asChild className="mt-4">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-gradient-to-r from-amber-500 to-red-500 text-white">{article.category}</Badge>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-500">{article.status}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">{article.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>By {article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={article.published_at || article.created_at}>
                  {new Date(article.published_at || article.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>{article.views} views</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{/* Optionally calculate read time */}</span>
              </div>
            </div>
          </div>
          {/* Hero Image */}
          <div className="relative w-full h-[500px] mb-8 rounded-2xl overflow-hidden shadow-2xl">
            <Image src={article.image_url || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
          </div>
          {/* Article Content */}
          <div className="lg:col-span-3 lg:order-2 order-1">
            <article
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-red-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:text-gray-700 prose-li:text-gray-700"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
            {/* Tags */}
            {article.tags && Array.isArray(article.tags) && (
              <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-200">
                <span className="text-sm font-medium text-gray-600 mr-2">Tags:</span>
                {article.tags.map((tag: string) => (
                  <Link key={tag} href={`/tag/${tag}`}>
                    <Badge variant="outline" className="hover:bg-amber-50 hover:border-amber-300 transition-colors">
                      #{tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


