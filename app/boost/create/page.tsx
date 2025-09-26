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
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { tr } from "date-fns/locale"
import { CalendarIcon, Shield, Zap, Target, Clock, DollarSign, FileText, X } from "lucide-react"

const games = ["Valorant", "League of Legends", "CS2", "Apex Legends", "Overwatch 2"]
const valorantRanks = ["Iron", "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Immortal", "Radiant"]
const lolRanks = ["Iron", "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Master", "Grandmaster", "Challenger"]

export default function CreateBoostPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    game: "",
    title: "",
    currentRank: "",
    targetRank: "",
    budget: "",
    deadline: null as Date | null,
    description: "",
    requirements: [] as string[],
    boostType: "",
    priority: false,
    agreeTerms: false,
  })
  const [newRequirement, setNewRequirement] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string | boolean | Date | null | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addRequirement = () => {
    if (newRequirement.trim() && formData.requirements.length < 5) {
      setFormData((prev) => ({
        ...prev,
        requirements: [...prev.requirements, newRequirement.trim()],
      }))
      setNewRequirement("")
    }
  }

  const removeRequirement = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    // Redirect to success page
    window.location.href = "/boost/success"
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

  const calculateEstimatedPrice = () => {
    if (!formData.currentRank || !formData.targetRank || !formData.game) return null

    const ranks = getRanks()
    const currentIndex = ranks.indexOf(formData.currentRank)
    const targetIndex = ranks.indexOf(formData.targetRank)

    if (currentIndex === -1 || targetIndex === -1 || targetIndex <= currentIndex) return null

    const rankDifference = targetIndex - currentIndex
    const basePrice = formData.game === "League of Legends" ? 100 : 80
    const estimated = rankDifference * basePrice

    return estimated
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="h-16 w-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
          <Target className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Boost Detayları</h3>
        <p className="text-muted-foreground">Hangi oyun ve ranklar için boost istiyorsunuz?</p>
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
            placeholder="Örn: Valorant Silver 2 → Gold 1 Boost"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="currentRank">Mevcut Rank *</Label>
            <Select value={formData.currentRank} onValueChange={(value) => handleInputChange("currentRank", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Mevcut rank" />
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
            <Label htmlFor="targetRank">Hedef Rank *</Label>
            <Select value={formData.targetRank} onValueChange={(value) => handleInputChange("targetRank", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Hedef rank" />
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
        </div>

        <div className="space-y-2">
          <Label>Boost Türü *</Label>
          <div className="grid grid-cols-2 gap-4">
            <Card
              className={`cursor-pointer transition-all ${
                formData.boostType === "duo" ? "border-primary bg-primary/5" : "border-border"
              }`}
              onClick={() => handleInputChange("boostType", "duo")}
            >
              <CardContent className="p-4 text-center">
                <h4 className="font-medium mb-1">Duo Queue</h4>
                <p className="text-xs text-muted-foreground">Booster ile birlikte oynayın</p>
              </CardContent>
            </Card>
            <Card
              className={`cursor-pointer transition-all ${
                formData.boostType === "solo" ? "border-primary bg-primary/5" : "border-border"
              }`}
              onClick={() => handleInputChange("boostType", "solo")}
            >
              <CardContent className="p-4 text-center">
                <h4 className="font-medium mb-1">Solo Queue</h4>
                <p className="text-xs text-muted-foreground">Hesabınızda oynasın</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {calculateEstimatedPrice() && (
          <Alert className="border-accent/50 bg-accent/10">
            <DollarSign className="h-4 w-4 text-accent" />
            <AlertDescription className="text-accent-foreground">
              Tahmini fiyat: {calculateEstimatedPrice()}₺ - {Math.round(calculateEstimatedPrice()! * 1.5)}₺
            </AlertDescription>
          </Alert>
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
        <h3 className="text-xl font-semibold mb-2">Açıklama ve Gereksinimler</h3>
        <p className="text-muted-foreground">Boost isteğinizin detaylarını belirtin</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="description">Açıklama *</Label>
          <Textarea
            id="description"
            placeholder="Boost isteğinizin detaylarını açıklayın..."
            rows={4}
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Özel Gereksinimler</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Gereksinim ekle (örn: Türkçe İletişim)"
              value={newRequirement}
              onChange={(e) => setNewRequirement(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addRequirement()}
            />
            <Button type="button" onClick={addRequirement} disabled={formData.requirements.length >= 5}>
              Ekle
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.requirements.map((req, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {req}
                <button onClick={() => removeRequirement(index)} className="ml-1 hover:text-destructive">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">En fazla 5 gereksinim ekleyebilirsiniz</p>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="priority"
            checked={formData.priority}
            onCheckedChange={(checked) => handleInputChange("priority", checked as boolean)}
          />
          <Label htmlFor="priority" className="text-sm">
            Öncelikli boost (+%20 ücret, daha hızlı tamamlanma)
          </Label>
        </div>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="h-16 w-16 rounded-2xl bg-chart-4/20 flex items-center justify-center mx-auto mb-4">
          <Clock className="h-8 w-8 text-chart-4" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Bütçe ve Zaman</h3>
        <p className="text-muted-foreground">Bütçenizi ve son teslim tarihini belirleyin</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="budget">Bütçe (₺) *</Label>
          <Input
            id="budget"
            type="number"
            placeholder="500"
            value={formData.budget}
            onChange={(e) => handleInputChange("budget", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">Platform komisyonu: %10 (başarılı tamamlama sonrası)</p>
        </div>

        <div className="space-y-2">
          <Label>Son Teslim Tarihi *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.deadline ? format(formData.deadline, "PPP", { locale: tr }) : "Tarih seçin"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.deadline || undefined}
                onSelect={(date) => handleInputChange("deadline", date || null)}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <Alert className="border-chart-4/50 bg-chart-4/10">
          <Shield className="h-4 w-4 text-chart-4" />
          <AlertDescription className="text-chart-4-foreground">
            Ödemeniz güvenli bir şekilde emanette tutulur ve boost tamamlandığında boostera aktarılır.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="h-16 w-16 rounded-2xl bg-chart-5/20 flex items-center justify-center mx-auto mb-4">
          <Zap className="h-8 w-8 text-chart-5" />
        </div>
        <h3 className="text-xl font-semibold mb-2">İlan Özeti</h3>
        <p className="text-muted-foreground">Bilgilerinizi kontrol edin ve ilanınızı yayınlayın</p>
      </div>

      <div className="space-y-4">
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Oyun:</span>
                <span className="font-medium">{formData.game}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Rank:</span>
                <span className="font-medium">
                  {formData.currentRank} → {formData.targetRank}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Boost Türü:</span>
                <span className="font-medium">{formData.boostType === "duo" ? "Duo Queue" : "Solo Queue"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Bütçe:</span>
                <span className="font-medium">{formData.budget}₺</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Son Tarih:</span>
                <span className="font-medium">
                  {formData.deadline ? format(formData.deadline, "dd/MM/yyyy") : "Belirtilmedi"}
                </span>
              </div>
              {formData.priority && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Öncelik:</span>
                  <Badge className="bg-destructive">Öncelikli</Badge>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="agreeTerms"
            checked={formData.agreeTerms}
            onCheckedChange={(checked) => handleInputChange("agreeTerms", checked as boolean)}
          />
          <Label htmlFor="agreeTerms" className="text-sm leading-5">
            Boost hizmet şartlarını ve ödeme koşullarını kabul ediyorum. İlanım onaylandıktan sonra boosterlar
            tarafından görülebilir olacaktır.
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
              <CardTitle className="text-2xl">Boost İlanı Oluştur</CardTitle>
              <CardDescription>Profesyonel boosterlardan teklif alın</CardDescription>
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
                  <Target className="h-3 w-3" />
                  Detaylar
                </Badge>
                <Badge variant={currentStep >= 2 ? "default" : "secondary"} className="flex items-center gap-1">
                  <FileText className="h-3 w-3" />
                  Açıklama
                </Badge>
                <Badge variant={currentStep >= 3 ? "default" : "secondary"} className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Bütçe
                </Badge>
                <Badge variant={currentStep >= 4 ? "default" : "secondary"} className="flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  Özet
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
