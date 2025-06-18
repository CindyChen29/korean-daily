import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Users, Globe, Award } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-amber-600 to-red-600 bg-clip-text text-transparent">
                About Korean Daily
              </span>
              <br />
              <span className="text-gray-800">San Francisco</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              샌프란시스코 베이 지역 한인 커뮤니티를 위한 신뢰할 수 있는 뉴스 소스
            </p>
          </div>

          {/* Mission Section */}
          <div className="mb-16">
            <Card className="bg-gradient-to-br from-amber-50 to-red-50 border-0 shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Mission</h2>
                <p className="text-lg text-gray-700 leading-relaxed text-center mb-6">
                  Korean Daily San Francisco is dedicated to serving the Korean community in the San Francisco Bay Area
                  by providing timely, accurate, and relevant news coverage. We bridge the gap between Korean and
                  American cultures, fostering understanding and connection within our diverse community.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed text-center">
                  우리는 샌프란시스코 베이 지역의 한인 커뮤니티에 시의적절하고 정확하며 관련성 높은 뉴스를 제공하여
                  한국과 미국 문화 간의 가교 역할을 하고, 다양한 커뮤니티 내에서 이해와 연결을 촉진합니다.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center bg-white border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">10K+</h3>
                <p className="text-gray-600">Monthly Readers</p>
              </CardContent>
            </Card>

            <Card className="text-center bg-white border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">5</h3>
                <p className="text-gray-600">Years Serving</p>
              </CardContent>
            </Card>

            <Card className="text-center bg-white border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">500+</h3>
                <p className="text-gray-600">Articles Published</p>
              </CardContent>
            </Card>
          </div>

          {/* What We Cover */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center border-l-4 border-amber-500 pl-4 inline-block">
              What We Cover
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Community News", icon: "🏘️" },
                { name: "Business", icon: "💼" },
                { name: "Culture & Arts", icon: "🎨" },
                { name: "Food & Dining", icon: "🍜" },
                { name: "Education", icon: "📚" },
                { name: "Health", icon: "🏥" },
                { name: "Technology", icon: "💻" },
                { name: "Immigration", icon: "🛂" },
              ].map((category) => (
                <Card
                  key={category.name}
                  className="text-center p-4 hover:shadow-lg transition-shadow bg-white border-0"
                >
                  <CardContent className="p-4">
                    <div className="text-3xl mb-2">{category.icon}</div>
                    <p className="font-medium text-gray-800">{category.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-16">
            <Card className="bg-white border-0 shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Contact Us</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="h-8 w-8 text-amber-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Address</h3>
                    <p className="text-gray-600">
                      123 Geary Street
                      <br />
                      San Francisco, CA 94108
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Phone className="h-8 w-8 text-red-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Phone</h3>
                    <p className="text-gray-600">(415) 123-4567</p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mail className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Email</h3>
                    <p className="text-gray-600">info@koreandailysf.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Team Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Team</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Our dedicated team of journalists, editors, and community liaisons work tirelessly to bring you the most
              important stories affecting the Korean community in the Bay Area. We are committed to maintaining the
              highest standards of journalism while serving our community with integrity and respect.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
