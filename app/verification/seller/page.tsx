"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, CreditCard, Upload, CheckCircle } from "lucide-react"
import { Navigation } from "@/components/navigation"

export default function SellerVerificationPage() {
  const [formData, setFormData] = useState({
    tcNumber: "",
    frontIdImage: null as File | null,
    backIdImage: null as File | null,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleFileChange = (field: string, file: File | null) => {
    setFormData((prev) => ({ ...prev, [field]: file }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.tcNumber.trim()) newErrors.tcNumber = "TC Kimlik No zorunludur"
    else if (!/^[0-9]{11}$/.test(formData.tcNumber)) newErrors.tcNumber = "TC Kimlik No 11 haneli olmalıdır"
    if (!formData.frontIdImage) newErrors.frontIdImage = "Kimlik ön yüzü fotoğrafı zorunludur"
    if (!formData.backIdImage) newErrors.backIdImage = "Kimlik arka yüzü fotoğrafı zorunludur"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader className="text-center">
                <div className="h-16 w-16 rounded-2xl bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <CardTitle className="text-2xl text-green-500">Başvuru Gönderildi!</CardTitle>
                <CardDescription>
                  Onaylı satıcı başvurunuz incelemeye alındı. 24-48 saat içinde sonuçlandırılacaktır.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/dashboard">
                  <Button className="w-full">Hesabıma Dön</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardHeader className="text-center">
              <div className="h-16 w-16 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-accent" />
              </div>
              <CardTitle className="text-2xl">Onaylı Satıcı Ol</CardTitle>
              <CardDescription>TC kimlik doğrulaması ile güvenilir satıcı statüsü kazanın</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert className="border-accent/50 bg-accent/10">
                <Shield className="h-4 w-4 text-accent" />
                <AlertDescription className="text-accent-foreground">
                  Onaylı satıcı olduktan sonra hesap satışlarınız öncelikli olarak gösterilir ve daha yüksek fiyatlara
                  satış yapabilirsiniz.
                </AlertDescription>
              </Alert>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tcNumber">TC Kimlik No *</Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="tcNumber"
                      placeholder="12345678901"
                      className="pl-10"
                      maxLength={11}
                      value={formData.tcNumber}
                      onChange={(e) => handleInputChange("tcNumber", e.target.value.replace(/\D/g, ""))}
                    />
                  </div>
                  {errors.tcNumber && <p className="text-sm text-destructive">{errors.tcNumber}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="frontIdImage">Kimlik Ön Yüzü *</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <Input
                      id="frontIdImage"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileChange("frontIdImage", e.target.files?.[0] || null)}
                    />
                    <Label htmlFor="frontIdImage" className="cursor-pointer">
                      <span className="text-sm text-muted-foreground">
                        {formData.frontIdImage ? formData.frontIdImage.name : "Dosya seçin veya sürükleyin"}
                      </span>
                    </Label>
                  </div>
                  {errors.frontIdImage && <p className="text-sm text-destructive">{errors.frontIdImage}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="backIdImage">Kimlik Arka Yüzü *</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <Input
                      id="backIdImage"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileChange("backIdImage", e.target.files?.[0] || null)}
                    />
                    <Label htmlFor="backIdImage" className="cursor-pointer">
                      <span className="text-sm text-muted-foreground">
                        {formData.backIdImage ? formData.backIdImage.name : "Dosya seçin veya sürükleyin"}
                      </span>
                    </Label>
                  </div>
                  {errors.backIdImage && <p className="text-sm text-destructive">{errors.backIdImage}</p>}
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Başvuru Gönderiliyor..." : "Başvuru Gönder"}
                </Button>
              </form>

              <div className="text-center">
                <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-primary">
                  Daha sonra başvur
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
