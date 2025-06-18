"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/components/language-provider"

export function Footer() {
  const { language } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-6">
            <Image
              src="/logo.png"
              alt="Korean Daily San Francisco"
              width={200}
              height={80}
              className="h-16 w-auto brightness-0 invert"
            />
            <p className="text-gray-300 leading-relaxed">
              {language === "en"
                ? "San Francisco Bay Area's premier Korean community news portal, powered by AI technology."
                : "샌프란시스코 베이 지역 최고의 한인 커뮤니티 뉴스 포털, AI 기술로 구동됩니다."}
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://facebook.com"
                className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://instagram.com"
                className="p-2 bg-gray-800 rounded-lg hover:bg-pink-600 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="https://twitter.com"
                className="p-2 bg-gray-800 rounded-lg hover:bg-blue-400 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="https://youtube.com"
                className="p-2 bg-gray-800 rounded-lg hover:bg-red-600 transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-amber-400">{language === "en" ? "Quick Links" : "빠른 링크"}</h3>
            <ul className="space-y-3">
              {[
                { en: "Latest News", kr: "최신 뉴스", href: "/news" },
                { en: "About Us", kr: "회사 소개", href: "/about" },
                { en: "Contact Us", kr: "연락처", href: "/contact" },
                { en: "Privacy Policy", kr: "개인정보처리방침", href: "/privacy" },
                { en: "Terms of Service", kr: "이용약관", href: "/terms" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-amber-400 transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-amber-400 rounded-full"></span>
                    {language === "en" ? item.en : item.kr}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-amber-400">{language === "en" ? "Contact Us" : "연락처"}</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-amber-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">
                    123 Geary Street
                    <br />
                    San Francisco, CA 94108
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-amber-400 flex-shrink-0" />
                <p className="text-gray-300">(415) 123-4567</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-amber-400 flex-shrink-0" />
                <p className="text-gray-300">info@koreandailysf.com</p>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-amber-400">{language === "en" ? "Stay Updated" : "소식 받기"}</h3>
            <p className="text-gray-300">
              {language === "en"
                ? "Get the latest Korean community news delivered to your inbox."
                : "최신 한인 커뮤니티 소식을 이메일로 받아보세요."}
            </p>
            <form className="space-y-3">
              <Input
                type="email"
                placeholder={language === "en" ? "Enter your email" : "이메일 주소 입력"}
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-amber-400"
              />
              <Button className="w-full bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600">
                {language === "en" ? "Subscribe" : "구독하기"}
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} Korean Daily San Francisco.{" "}
              {language === "en" ? "All rights reserved." : "모든 권리 보유."}
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-amber-400 transition-colors">
                {language === "en" ? "Privacy Policy" : "개인정보처리방침"}
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-amber-400 transition-colors">
                {language === "en" ? "Terms of Service" : "이용약관"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
