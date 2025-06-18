import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FeaturedArticles } from "@/components/featured-articles"
import { LanguageToggle } from "@/components/language-toggle"
import HeroSection from "@/components/hero-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-end mb-4">
          <LanguageToggle />
        </div>

        <HeroSection />

        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 border-l-4 border-amber-500 pl-4">
              주요 뉴스 / Featured Stories
            </h2>
            <Link href="/news" className="text-red-700 hover:text-red-800 font-medium">
              View All →
            </Link>
          </div>
          <FeaturedArticles />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          <div className="group p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-amber-500">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-amber-200 transition-colors">
              <span className="text-2xl">📰</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Latest News</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Stay updated with the latest Korean community news and developments in the Bay Area
            </p>
            <Button asChild variant="outline" className="w-full border-amber-500 text-amber-700 hover:bg-amber-50">
              <Link href="/news">Browse News</Link>
            </Button>
          </div>

          <div className="group p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-red-500">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-200 transition-colors">
              <span className="text-2xl">ℹ️</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">About Us</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Learn more about Korean Daily San Francisco and our mission to serve the Korean community
            </p>
            <Button asChild variant="outline" className="w-full border-red-500 text-red-700 hover:bg-red-50">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
