import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function HeroSection() {
  return (
    <div className="relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-100/50 to-red-100/50 rounded-3xl"></div>
      <div
        className="absolute inset-0 opacity-5 rounded-3xl"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23f59e0b' fillOpacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      ></div>

      <div className="relative flex flex-col items-center justify-center space-y-8 py-20 md:py-32 px-8">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            <span className="bg-gradient-to-r from-amber-600 to-red-600 bg-clip-text text-transparent">
              Korean Daily
            </span>
            <br />
            <span className="text-gray-800">San Francisco</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl leading-relaxed">
            샌프란시스코 베이 지역 한인 커뮤니티를 위한 <br className="hidden md:block" />
            <span className="font-semibold text-red-700">AI 기반 뉴스 포털</span>
          </p>
          <p className="text-lg text-gray-600 max-w-2xl">
            Your trusted source for Bay Area Korean news, events, and community updates
          </p>
        </div>

        <div className="w-full max-w-3xl">
          <form action="/search" className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-red-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative">
              <Input
                name="q"
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

        <div className="flex flex-wrap gap-3 justify-center">
          {["Breaking News", "Community Events", "Business", "Culture", "Food"].map((tag) => (
            <button
              key={tag}
              className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 hover:bg-white hover:shadow-md transition-all border border-gray-200"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
