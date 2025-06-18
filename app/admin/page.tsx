"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Shield, Lock } from "lucide-react"

export default function AdminLoginPage() {
  const [passcode, setPasscode] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (passcode === "admin123") {
      router.push("/admin/dashboard")
    } else {
      setError("Invalid passcode. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-red-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Admin Portal</CardTitle>
            <p className="text-gray-600">Enter your passcode to access the admin dashboard</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="passcode" className="text-gray-700 font-medium">
                  Admin Passcode
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="passcode"
                    type="password"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Enter admin passcode"
                    className="pl-10 py-3 border-gray-300 focus:border-amber-400 focus:ring-amber-100"
                    required
                  />
                </div>
                {error && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                    {error}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600 text-white font-medium"
              >
                Access Dashboard
              </Button>
            </form>

            <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-sm text-amber-800 font-medium mb-1">Demo Access</p>
              <p className="text-sm text-amber-700">
                Passcode: <code className="font-mono bg-amber-100 px-2 py-1 rounded">admin123</code>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
