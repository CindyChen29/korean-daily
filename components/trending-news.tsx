import Link from "next/link"
import { TrendingUp, Clock, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const trendingArticles = [
  {
    id: 1,
    title: "San Francisco Korean Cultural Festival Draws Record Crowds",
    category: "Events",
    views: "2.1K",
    timeAgo: "2 hours ago",
    trending: true,
  },
  {
    id: 2,
    title: "New Korean BBQ Restaurant Opens in Mission District",
    category: "Food",
    views: "1.8K",
    timeAgo: "4 hours ago",
    trending: true,
  },
  {
    id: 3,
    title: "Korean Language Program Expands to More Bay Area Schools",
    category: "Education",
    views: "1.5K",
    timeAgo: "6 hours ago",
    trending: false,
  },
  {
    id: 4,
    title: "Local Korean Artist's Exhibition Opens at SFMOMA",
    category: "Arts",
    views: "1.2K",
    timeAgo: "8 hours ago",
    trending: false,
  },
]

export function TrendingNews() {
  return (
    <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-red-600" />
          <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
        </div>
        <div className="h-px bg-gradient-to-r from-red-200 to-transparent flex-1"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trendingArticles.map((article, index) => (
          <Link
            key={article.id}
            href={`/article/${article.id}`}
            className="group flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className="flex-shrink-0">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  index < 2 ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-600"
                }`}
              >
                {index + 1}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="secondary" className="text-xs">
                  {article.category}
                </Badge>
                {article.trending && (
                  <Badge variant="destructive" className="text-xs">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Hot
                  </Badge>
                )}
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-red-700 transition-colors line-clamp-2">
                {article.title}
              </h3>
              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {article.timeAgo}
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {article.views}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
