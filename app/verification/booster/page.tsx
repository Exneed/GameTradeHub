"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Star, Upload, CheckCircle, Gamepad2 } from "lucide-react"
import { Navigation } from "@/components/navigation"

export default function BoosterVerificationPage() {
  const [formData, setFormData] = useState({
    games: [] as string[],
    experience: "",
    description: "",
    portfolioImages: [] as File[],
    discordTag: "",
    availableHours: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const gameOptions = [
    "Valorant",
    "League of Legends",
    "CS2",
    "Apex Legends",
    "Overwatch 2",
    "Rocket League",
    "Fortnite",
    "PUBG",
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleGameToggle = (game: string) => {
    setFormData((prev) => ({
      ...prev,
      games: prev.games.includes(game) ? prev.games.filter((g) => g !== game) : [...prev.games, game],
    }))
    if (errors.games) {
      setErrors((prev) => ({ ...prev, games: "" }))
    }
  }

  const handleFileChange = (files: FileList | null) => {
    if (files) {
      setFormData((prev) => ({ ...prev, portfolioImages: Array.from(files) }))
      if (errors.portfolioImages) {
        setErrors((prev) => ({ ...prev, portfolioImages: "" }))
      }
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (formData.games.length === 0) newErrors.games = "En az bir oyun seçmelisiniz"
    if (!formData.experience) newErrors.experience = "Deneyim seviyesi seçmelisiniz"
    if (!formData.description.trim()) newErrors.description = "Açıklama alanı zorunludur"
    if (formData.description.length < 50) newErrors.description = "Açıklama en az 50 karakter olmalıdır"
    if (!formData.discordTag.trim()) newErrors.discordTag = "Discord tag zorunludur"
    if (!formData.availableHours) newErrors.availableHours = "Müsaitlik durumu seçmelisiniz"

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
                  Booster başvurunuz incelemeye alındı. 24-48 saat içinde sonuçlandırılacaktır.
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
        <div className="max-w-2xl mx-auto">
          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardHeader className="text-center">
              <div className="h-16 w-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Booster Ol</CardTitle>
              <CardDescription>Oyun boost hizmetleri vererek para kazanın</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert className="border-primary/50 bg-primary/10">
                <Star className="h-4 w-4 text-primary" />
                <AlertDescription className="text-primary-foreground">
                  Booster olduktan sonra boost taleplerini görebilir ve teklif verebilirsiniz. Başarılı boost
                  işlemlerinden komisyon kazanırsınız.
                </AlertDescription>
              </Alert>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <Label>Hangi oyunlarda boost verebilirsiniz? *</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {gameOptions.map((game) => (
                      <div
                        key={game}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          formData.games.includes(game)
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => handleGameToggle(game)}
                      >
                        <div className="flex items-center space-x-2">
                          <Gamepad2 className="h-4 w-4" />
                          <span className="text-sm font-medium">{game}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {errors.games && <p className="text-sm text-destructive">{errors.games}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Deneyim Seviyeniz *</Label>
                  <Select value={formData.experience} onValueChange={(value) => handleInputChange("experience", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Deneyim seviyenizi seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Başlangıç (0-1 yıl)</SelectItem>
                      <SelectItem value="intermediate">Orta (1-3 yıl)</SelectItem>
                      <SelectItem value="advanced">İleri (3-5 yıl)</SelectItem>
                      <SelectItem value="expert">Uzman (5+ yıl)</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.experience && <p className="text-sm text-destructive">{errors.experience}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Kendinizi Tanıtın *</Label>
                  <Textarea
                    id="description"
                    placeholder="Hangi oyunlarda ne kadar deneyiminiz var? Hangi ranklara çıkabilirsiniz? Özel yetenekleriniz neler? (En az 50 karakter)"
                    className="min-h-[120px]"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                  />
                  <div className="text-xs text-muted-foreground text-right">
                    {formData.description.length}/50 minimum
                  </div>
                  {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="discordTag">Discord Tag *</Label>
                  <Input
                    id="discordTag"
                    placeholder="kullaniciadi#1234"
                    value={formData.discordTag}
                    onChange={(e) => handleInputChange("discordTag", e.target.value)}
                  />
                  {errors.discordTag && <p className="text-sm text-destructive">{errors.discordTag}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="availableHours">Günlük Müsaitlik *</Label>
                  <Select
                    value={formData.availableHours}
                    onValueChange={(value) => handleInputChange("availableHours", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Günde kaç saat müsaitsiniz?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-3">1-3 saat</SelectItem>
                      <SelectItem value="3-6">3-6 saat</SelectItem>
                      <SelectItem value="6-10">6-10 saat</SelectItem>
                      <SelectItem value="10+">10+ saat</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.availableHours && <p className="text-sm text-destructive">{errors.availableHours}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="portfolioImages">Portföy Görselleri (Opsiyonel)</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <Input
                      id="portfolioImages"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => handleFileChange(e.target.files)}
                    />
                    <Label htmlFor="portfolioImages" className="cursor-pointer">
                      <span className="text-sm text-muted-foreground">
                        {formData.portfolioImages.length > 0
                          ? `${formData.portfolioImages.length} dosya seçildi`
                          : "Rank ekran görüntüleri, başarı görselleri vb. yükleyin"}
                      </span>
                    </Label>
                  </div>
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
