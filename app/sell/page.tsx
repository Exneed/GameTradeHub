"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, X, Shield, DollarSign, GamepadIcon, Camera, FileText } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

const games = ["Valorant", "League of Legends", "CS2", "Apex Legends", "Fortnite", "PUBG", "Overwatch 2"]
const valorantRanks = ["Iron", "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Immortal", "Radiant"]
const lolRanks = ["Iron", "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Master", "Grandmaster", "Challenger"]

const gameSpecificQuestions = {
  Valorant: [
    { key: "skins_count", label: "Kaç skin var?", type: "number", required: true },
    { key: "phone_verified", label: "Telefon doğrulaması var mı?", type: "boolean", required: true },
    { key: "email_access", label: "E-posta erişimi verilecek mi?", type: "boolean", required: true },
    { key: "active_ban", label: "Aktif ban var mı?", type: "boolean", required: true },
    { key: "original_owner", label: "İlk sahibi misiniz?", type: "boolean", required: true },
    { key: "server", label: "Sunucu", type: "select", options: ["TR", "EU", "NA", "ASIA"], required: true },
    { key: "name_change", label: "İsim değiştirme hakkı var mı?", type: "boolean", required: false },
    { key: "battlepass_level", label: "Battle Pass seviyesi", type: "number", required: false },
  ],
  "League of Legends": [
    { key: "champions_count", label: "Kaç şampiyon var?", type: "number", required: true },
    { key: "skins_count", label: "Kaç skin var?", type: "number", required: true },
    { key: "phone_verified", label: "Telefon doğrulaması var mı?", type: "boolean", required: true },
    { key: "email_access", label: "E-posta erişimi verilecek mi?", type: "boolean", required: true },
    { key: "active_ban", label: "Aktif ban var mı?", type: "boolean", required: true },
    { key: "original_owner", label: "İlk sahibi misiniz?", type: "boolean", required: true },
    { key: "server", label: "Sunucu", type: "select", options: ["TR", "EUW", "EUNE", "NA"], required: true },
    { key: "blue_essence", label: "Blue Essence miktarı", type: "number", required: false },
    { key: "rp_amount", label: "RP miktarı", type: "number", required: false },
  ],
  CS2: [
    { key: "prime_status", label: "Prime durumu var mı?", type: "boolean", required: true },
    {
      key: "trust_factor",
      label: "Trust Factor durumu",
      type: "select",
      options: ["Yüksek", "Orta", "Düşük"],
      required: true,
    },
    { key: "phone_verified", label: "Telefon doğrulaması var mı?", type: "boolean", required: true },
    { key: "email_access", label: "E-posta erişimi verilecek mi?", type: "boolean", required: true },
    { key: "active_ban", label: "Aktif ban var mı?", type: "boolean", required: true },
    { key: "original_owner", label: "İlk sahibi misiniz?", type: "boolean", required: true },
    { key: "inventory_value", label: "Envanter değeri ($)", type: "number", required: false },
    { key: "service_medal", label: "Service Medal var mı?", type: "boolean", required: false },
  ],
}

export default function SellPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    game: "",
    title: "",
    rank: "",
    level: "",
    price: "",
    originalPrice: "",
    description: "",
    features: [] as string[],
    images: [] as File[],
    agreeTerms: false,
    gameSpecificData: {} as Record<string, any>, // Added game-specific data storage
  })
  const [newFeature, setNewFeature] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const supabase = createClient()

  const handleInputChange = (field: string, value: string | boolean | string[] | Record<string, any>) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleGameSpecificChange = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      gameSpecificData: { ...prev.gameSpecificData, [key]: value },
    }))
  }

  const handleImageUpload = (files: FileList | null) => {
    if (files) {
      const newImages = Array.from(files).slice(0, 5 - formData.images.length)
      setFormData((prev) => ({ ...prev, images: [...prev.images, ...newImages] }))
    }
  }

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const addFeature = () => {
    if (newFeature.trim() && formData.features.length < 10) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }))
      setNewFeature("")
    }
  }

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async () => {
    setIsLoading(true)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        window.location.href = "/auth/login"
        return
      }

      // Upload images to storage (simplified for demo)
      const imageUrls: string[] = []

      // Create listing in database
      const { error } = await supabase.from("listings").insert({
        user_id: user.id,
        game: formData.game,
        title: formData.title,
        description: formData.description,
        price: Number.parseFloat(formData.price),
        original_price: formData.originalPrice ? Number.parseFloat(formData.originalPrice) : null,
        rank: formData.rank,
        level: Number.parseInt(formData.level),
        features: formData.features,
        images: imageUrls,
        game_specific_data: formData.gameSpecificData,
        status: "pending",
      })

      if (error) {
        console.error("Error creating listing:", error)
        alert("İlan oluşturulurken bir hata oluştu")
      } else {
        window.location.href = "/sell/success"
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Bir hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  const getStepProgress = () => (currentStep / 4) * 100

  const getRanks = () => {
    switch (formData.game) {
      case "Valorant":
        return valorantRanks
      case "League of Legends":
        return lolRanks
      default:
        return valorantRanks
    }
  }

  const getGameSpecificQuestions = () => {
    return gameSpecificQuestions[formData.game as keyof typeof gameSpecificQuestions] || []
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="h-16 w-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
          <GamepadIcon className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Hesap Bilgileri</h3>
        <p className="text-muted-foreground">Satmak istediğiniz hesabın temel bilgilerini girin</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="game">Oyun *</Label>
          <Select value={formData.game} onValueChange={(value) => handleInputChange("game", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Oyun seçin" />
            </SelectTrigger>
            <SelectContent>
              {games.map((game) => (
                <SelectItem key={game} value={game}>
                  {game}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">İlan Başlığı *</Label>
          <Input
            id="title"
            placeholder="Örn: Valorant Immortal 3 Hesap - Tüm Ajanlar Açık"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="rank">Rank *</Label>
            <Select value={formData.rank} onValueChange={(value) => handleInputChange("rank", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Rank seçin" />
              </SelectTrigger>
              <SelectContent>
                {getRanks().map((rank) => (
                  <SelectItem key={rank} value={rank}>
                    {rank}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="level">Level *</Label>
            <Input
              id="level"
              type="number"
              placeholder="156"
              value={formData.level}
              onChange={(e) => handleInputChange("level", e.target.value)}
            />
          </div>
        </div>

        {formData.game && getGameSpecificQuestions().length > 0 && (
          <div className="space-y-4 border-t pt-4">
            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
              {formData.game} Özel Bilgiler
            </h4>
            {getGameSpecificQuestions().map((question) => (
              <div key={question.key} className="space-y-2">
                <Label htmlFor={question.key}>
                  {question.label} {question.required && "*"}
                </Label>
                {question.type === "boolean" ? (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={question.key}
                      checked={formData.gameSpecificData[question.key] || false}
                      onCheckedChange={(checked) => handleGameSpecificChange(question.key, checked)}
                    />
                    <Label htmlFor={question.key} className="text-sm">
                      Evet
                    </Label>
                  </div>
                ) : question.type === "select" ? (
                  <Select
                    value={formData.gameSpecificData[question.key] || ""}
                    onValueChange={(value) => handleGameSpecificChange(question.key, value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {question.options?.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id={question.key}
                    type={question.type}
                    placeholder={question.type === "number" ? "0" : ""}
                    value={formData.gameSpecificData[question.key] || ""}
                    onChange={(e) =>
                      handleGameSpecificChange(
                        question.key,
                        question.type === "number" ? Number.parseInt(e.target.value) || 0 : e.target.value,
                      )
                    }
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="h-16 w-16 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-4">
          <FileText className="h-8 w-8 text-accent" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Açıklama ve Özellikler</h3>
        <p className="text-muted-foreground">Hesabınızın detaylarını ve özelliklerini ekleyin</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="description">Açıklama *</Label>
          <Textarea
            id="description"
            placeholder="Hesabınızın detaylı açıklamasını yazın..."
            rows={6}
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Özellikler</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Özellik ekle (örn: Tüm Ajanlar Açık)"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addFeature()}
            />
            <Button type="button" onClick={addFeature} disabled={formData.features.length >= 10}>
              Ekle
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.features.map((feature, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {feature}
                <button onClick={() => removeFeature(index)} className="ml-1 hover:text-destructive">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">En fazla 10 özellik ekleyebilirsiniz</p>
        </div>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="h-16 w-16 rounded-2xl bg-chart-4/20 flex items-center justify-center mx-auto mb-4">
          <Camera className="h-8 w-8 text-chart-4" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Fotoğraflar</h3>
        <p className="text-muted-foreground">Hesabınızın ekran görüntülerini yükleyin</p>
      </div>

      <div className="space-y-4">
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            id="image-upload"
            onChange={(e) => handleImageUpload(e.target.files)}
          />
          <label htmlFor="image-upload" className="cursor-pointer">
            <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Fotoğraf yüklemek için tıklayın veya sürükleyin
              <br />
              En fazla 5 fotoğraf yükleyebilirsiniz
            </p>
          </label>
        </div>

        {formData.images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {formData.images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(image) || "/placeholder.svg"}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/80"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        <Alert className="border-chart-4/50 bg-chart-4/10">
          <Camera className="h-4 w-4 text-chart-4" />
          <AlertDescription className="text-chart-4-foreground">
            Kaliteli ve net fotoğraflar hesabınızın daha hızlı satılmasını sağlar.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="h-16 w-16 rounded-2xl bg-chart-5/20 flex items-center justify-center mx-auto mb-4">
          <DollarSign className="h-8 w-8 text-chart-5" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Fiyat ve Onay</h3>
        <p className="text-muted-foreground">Fiyatınızı belirleyin ve ilanınızı yayınlayın</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">Satış Fiyatı (₺) *</Label>
            <Input
              id="price"
              type="number"
              placeholder="2500"
              value={formData.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="originalPrice">Orijinal Fiyat (₺)</Label>
            <Input
              id="originalPrice"
              type="number"
              placeholder="3000"
              value={formData.originalPrice}
              onChange={(e) => handleInputChange("originalPrice", e.target.value)}
            />
            <p className="text-xs text-muted-foreground">İndirim göstermek için (opsiyonel)</p>
          </div>
        </div>

        <Alert className="border-accent/50 bg-accent/10">
          <Shield className="h-4 w-4 text-accent" />
          <AlertDescription className="text-accent-foreground">
            Satış komisyonu: %5 (Başarılı satış sonrası tahsil edilir)
          </AlertDescription>
        </Alert>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="agreeTerms"
            checked={formData.agreeTerms}
            onCheckedChange={(checked) => handleInputChange("agreeTerms", checked as boolean)}
          />
          <Label htmlFor="agreeTerms" className="text-sm leading-5">
            Satış şartlarını ve komisyon oranlarını kabul ediyorum. İlanım onaylandıktan sonra yayınlanacaktır.
          </Label>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Hesap Sat</CardTitle>
              <CardDescription>Gaming hesabınızı güvenli bir şekilde satın</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Adım {currentStep}/4</span>
                  <span>{Math.round(getStepProgress())}%</span>
                </div>
                <Progress value={getStepProgress()} className="h-2" />
              </div>

              <div className="flex justify-center space-x-4">
                <Badge variant={currentStep >= 1 ? "default" : "secondary"} className="flex items-center gap-1">
                  <GamepadIcon className="h-3 w-3" />
                  Bilgiler
                </Badge>
                <Badge variant={currentStep >= 2 ? "default" : "secondary"} className="flex items-center gap-1">
                  <FileText className="h-3 w-3" />
                  Açıklama
                </Badge>
                <Badge variant={currentStep >= 3 ? "default" : "secondary"} className="flex items-center gap-1">
                  <Camera className="h-3 w-3" />
                  Fotoğraflar
                </Badge>
                <Badge variant={currentStep >= 4 ? "default" : "secondary"} className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />
                  Fiyat
                </Badge>
              </div>

              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                >
                  Geri
                </Button>
                {currentStep < 4 ? (
                  <Button onClick={() => setCurrentStep(currentStep + 1)}>İleri</Button>
                ) : (
                  <Button onClick={handleSubmit} disabled={isLoading || !formData.agreeTerms}>
                    {isLoading ? "İlan Oluşturuluyor..." : "İlanı Yayınla"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
