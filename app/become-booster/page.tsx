"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  Zap,
  Upload,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  Camera,
  FileText,
  User,
  Gamepad2,
  Trophy,
  DollarSign,
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

type ApplicationStatus = "not-started" | "in-progress" | "submitted" | "under-review" | "approved" | "rejected"

const games = [
  {
    id: "valorant",
    name: "Valorant",
    ranks: ["Iron", "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Immortal", "Radiant"],
  },
  {
    id: "lol",
    name: "League of Legends",
    ranks: ["Iron", "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Master", "Grandmaster", "Challenger"],
  },
  {
    id: "cs2",
    name: "Counter-Strike 2",
    ranks: ["Silver", "Gold Nova", "Master Guardian", "Legendary Eagle", "Supreme", "Global Elite"],
  },
  {
    id: "apex",
    name: "Apex Legends",
    ranks: ["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Master", "Predator"],
  },
]

export default function BecomeBoosterPage() {
  const [applicationStatus, setApplicationStatus] = useState<ApplicationStatus>("not-started")
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Info
    fullName: "",
    age: "",
    country: "Turkey",
    city: "",
    discordTag: "",

    // Gaming Experience
    primaryGame: "",
    currentRank: "",
    peakRank: "",
    yearsPlaying: "",
    hoursPerWeek: "",

    // Booster Experience
    hasBoostExperience: false,
    previousPlatforms: "",
    completedBoosts: "",
    averageRating: "",

    // Availability
    availableHours: [] as string[],
    timezone: "UTC+3",
    weeklyHours: "",

    // Additional Info
    motivation: "",
    specialSkills: "",
    languages: [] as string[],

    // Documents
    gameplayVideo: null as File | null,
    rankProof: null as File | null,
    idDocument: null as File | null,

    // Terms
    agreeToTerms: false,
    agreeToCommission: false,
  })

  const statusConfig = {
    "not-started": {
      label: "Başlanmadı",
      color: "bg-gray-500",
      icon: Clock,
      description: "Booster başvurunuzu henüz başlatmadınız",
    },
    "in-progress": {
      label: "Devam Ediyor",
      color: "bg-blue-500",
      icon: User,
      description: "Başvuru formunu dolduruyorsunuz",
    },
    submitted: {
      label: "Gönderildi",
      color: "bg-yellow-500",
      icon: Upload,
      description: "Başvurunuz başarıyla gönderildi",
    },
    "under-review": {
      label: "İnceleme Altında",
      color: "bg-blue-600",
      icon: Clock,
      description: "Başvurunuz moderatörler tarafından inceleniyor",
    },
    approved: {
      label: "Onaylandı",
      color: "bg-green-500",
      icon: CheckCircle,
      description: "Tebrikler! Booster olarak kabul edildiniz",
    },
    rejected: {
      label: "Reddedildi",
      color: "bg-red-500",
      icon: XCircle,
      description: "Başvurunuz reddedildi, tekrar başvurabilirsiniz",
    },
  }

  const currentStatus = statusConfig[applicationStatus]
  const Icon = currentStatus.icon

  const getProgressValue = () => {
    switch (applicationStatus) {
      case "not-started":
        return 0
      case "in-progress":
        return (currentStep / 4) * 50
      case "submitted":
        return 60
      case "under-review":
        return 80
      case "approved":
        return 100
      case "rejected":
        return 40
      default:
        return 0
    }
  }

  const handleFileUpload = (type: keyof typeof formData, file: File) => {
    setFormData({ ...formData, [type]: file })
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
      if (applicationStatus === "not-started") {
        setApplicationStatus("in-progress")
      }
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const submitApplication = () => {
    setApplicationStatus("submitted")
    // Simulate review process
    setTimeout(() => {
      setApplicationStatus("under-review")
    }, 2000)
  }

  const FileUploadCard = ({
    title,
    description,
    type,
    icon: IconComponent,
    accept,
    required = false,
  }: {
    title: string
    description: string
    type: keyof typeof formData
    icon: any
    accept: string
    required?: boolean
  }) => (
    <Card className="border-dashed border-2 hover:border-primary/50 transition-colors">
      <CardContent className="p-4">
        <div className="text-center">
          <IconComponent className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          <h4 className="font-medium mb-1">
            {title} {required && <span className="text-red-500">*</span>}
          </h4>
          <p className="text-xs text-muted-foreground mb-3">{description}</p>

          {formData[type] ? (
            <div className="space-y-2">
              <Badge className="bg-green-500 text-white text-xs">
                <CheckCircle className="h-3 w-3 mr-1" />
                Yüklendi
              </Badge>
              <div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const input = document.createElement("input")
                    input.type = "file"
                    input.accept = accept
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0]
                      if (file) handleFileUpload(type, file)
                    }
                    input.click()
                  }}
                >
                  Değiştir
                </Button>
              </div>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const input = document.createElement("input")
                input.type = "file"
                input.accept = accept
                input.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0]
                  if (file) handleFileUpload(type, file)
                }
                input.click()
              }}
            >
              <Upload className="h-3 w-3 mr-1" />
              Yükle
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Booster Ol</h1>
          <p className="text-muted-foreground">Profesyonel boost hizmeti vererek para kazanın</p>
        </div>

        {/* Status Overview */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`h-12 w-12 rounded-full ${currentStatus.color} flex items-center justify-center`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{currentStatus.label}</h2>
                  <p className="text-muted-foreground">{currentStatus.description}</p>
                </div>
              </div>
              <Badge className={`${currentStatus.color} text-white`}>{currentStatus.label}</Badge>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>İlerleme</span>
                <span>{getProgressValue()}%</span>
              </div>
              <Progress value={getProgressValue()} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Application Form */}
        {(applicationStatus === "not-started" || applicationStatus === "in-progress") && (
          <div className="space-y-6">
            {/* Step Indicator */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-4">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {step}
                    </div>
                    {step < 4 && <div className={`w-12 h-0.5 ${step < currentStep ? "bg-primary" : "bg-muted"}`} />}
                  </div>
                ))}
              </div>
            </div>

            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Kişisel Bilgiler
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Ad Soyad *</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="age">Yaş *</Label>
                      <Input
                        id="age"
                        type="number"
                        min="16"
                        max="50"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="country">Ülke</Label>
                      <Select
                        value={formData.country}
                        onValueChange={(value) => setFormData({ ...formData, country: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Turkey">Türkiye</SelectItem>
                          <SelectItem value="Germany">Almanya</SelectItem>
                          <SelectItem value="Netherlands">Hollanda</SelectItem>
                          <SelectItem value="Other">Diğer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">Şehir *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="discordTag">Discord Tag *</Label>
                    <Input
                      id="discordTag"
                      placeholder="örnek: kullanici#1234"
                      value={formData.discordTag}
                      onChange={(e) => setFormData({ ...formData, discordTag: e.target.value })}
                      required
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Gaming Experience */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gamepad2 className="h-5 w-5" />
                    Oyun Deneyimi
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryGame">Ana Oyun *</Label>
                    <Select
                      value={formData.primaryGame}
                      onValueChange={(value) => setFormData({ ...formData, primaryGame: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Oyun seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {games.map((game) => (
                          <SelectItem key={game.id} value={game.id}>
                            {game.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.primaryGame && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentRank">Mevcut Rank *</Label>
                        <Select
                          value={formData.currentRank}
                          onValueChange={(value) => setFormData({ ...formData, currentRank: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Rank seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            {games
                              .find((g) => g.id === formData.primaryGame)
                              ?.ranks.map((rank) => (
                                <SelectItem key={rank} value={rank}>
                                  {rank}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="peakRank">En Yüksek Rank *</Label>
                        <Select
                          value={formData.peakRank}
                          onValueChange={(value) => setFormData({ ...formData, peakRank: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Rank seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            {games
                              .find((g) => g.id === formData.primaryGame)
                              ?.ranks.map((rank) => (
                                <SelectItem key={rank} value={rank}>
                                  {rank}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="yearsPlaying">Kaç Yıldır Oynuyorsunuz? *</Label>
                      <Input
                        id="yearsPlaying"
                        type="number"
                        min="1"
                        max="20"
                        value={formData.yearsPlaying}
                        onChange={(e) => setFormData({ ...formData, yearsPlaying: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hoursPerWeek">Haftalık Oyun Saati *</Label>
                      <Input
                        id="hoursPerWeek"
                        type="number"
                        min="10"
                        max="100"
                        value={formData.hoursPerWeek}
                        onChange={(e) => setFormData({ ...formData, hoursPerWeek: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Booster Experience & Availability */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-5 w-5" />
                      Boost Deneyimi
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="hasBoostExperience"
                        checked={formData.hasBoostExperience}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, hasBoostExperience: checked as boolean })
                        }
                      />
                      <Label htmlFor="hasBoostExperience">Daha önce boost hizmeti verdim</Label>
                    </div>

                    {formData.hasBoostExperience && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="previousPlatforms">Hangi Platformlarda?</Label>
                          <Input
                            id="previousPlatforms"
                            placeholder="örnek: Fiverr, Discord sunucuları, vs."
                            value={formData.previousPlatforms}
                            onChange={(e) => setFormData({ ...formData, previousPlatforms: e.target.value })}
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="completedBoosts">Tamamlanan Boost Sayısı</Label>
                            <Input
                              id="completedBoosts"
                              type="number"
                              min="0"
                              value={formData.completedBoosts}
                              onChange={(e) => setFormData({ ...formData, completedBoosts: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="averageRating">Ortalama Puan (1-5)</Label>
                            <Input
                              id="averageRating"
                              type="number"
                              min="1"
                              max="5"
                              step="0.1"
                              value={formData.averageRating}
                              onChange={(e) => setFormData({ ...formData, averageRating: e.target.value })}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Müsaitlik</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Müsait Olduğunuz Saatler *</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {["Sabah (06-12)", "Öğlen (12-18)", "Akşam (18-24)", "Gece (00-06)"].map((time) => (
                          <div key={time} className="flex items-center space-x-2">
                            <Checkbox
                              id={time}
                              checked={formData.availableHours.includes(time)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setFormData({ ...formData, availableHours: [...formData.availableHours, time] })
                                } else {
                                  setFormData({
                                    ...formData,
                                    availableHours: formData.availableHours.filter((h) => h !== time),
                                  })
                                }
                              }}
                            />
                            <Label htmlFor={time} className="text-sm">
                              {time}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="weeklyHours">Haftalık Boost Saati *</Label>
                      <Select
                        value={formData.weeklyHours}
                        onValueChange={(value) => setFormData({ ...formData, weeklyHours: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Saat aralığı seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10-20">10-20 saat</SelectItem>
                          <SelectItem value="20-30">20-30 saat</SelectItem>
                          <SelectItem value="30-40">30-40 saat</SelectItem>
                          <SelectItem value="40+">40+ saat</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 4: Documents & Final Info */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Belgeler</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FileUploadCard
                        title="Gameplay Video"
                        description="Oyun becerilerinizi gösteren video"
                        type="gameplayVideo"
                        icon={Camera}
                        accept="video/*"
                        required
                      />
                      <FileUploadCard
                        title="Rank Kanıtı"
                        description="Mevcut rankinizi gösteren ekran görüntüsü"
                        type="rankProof"
                        icon={Trophy}
                        accept="image/*"
                        required
                      />
                      <FileUploadCard
                        title="Kimlik Belgesi"
                        description="TC kimlik kartı (ön yüz)"
                        type="idDocument"
                        icon={FileText}
                        accept="image/*"
                        required
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Ek Bilgiler</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="motivation">Neden Booster Olmak İstiyorsunuz? *</Label>
                      <Textarea
                        id="motivation"
                        placeholder="Motivasyonunuzu ve hedeflerinizi açıklayın..."
                        value={formData.motivation}
                        onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                        rows={3}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="specialSkills">Özel Yetenekler</Label>
                      <Textarea
                        id="specialSkills"
                        placeholder="Özel oyun becerileri, stratejiler, vs."
                        value={formData.specialSkills}
                        onChange={(e) => setFormData({ ...formData, specialSkills: e.target.value })}
                        rows={2}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Komisyon Bilgisi
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Alert className="mb-4">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Komisyon Oranı: %10</strong>
                        <br />
                        Tüm boost hizmetlerinden %10 komisyon alınır. Örneğin 100₺'lik bir boost için 90₺ kazanırsınız.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="agreeToCommission"
                          checked={formData.agreeToCommission}
                          onCheckedChange={(checked) =>
                            setFormData({ ...formData, agreeToCommission: checked as boolean })
                          }
                        />
                        <Label htmlFor="agreeToCommission">%10 komisyon oranını kabul ediyorum *</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="agreeToTerms"
                          checked={formData.agreeToTerms}
                          onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
                        />
                        <Label htmlFor="agreeToTerms">
                          <a href="/terms" className="text-primary hover:underline">
                            Kullanım Şartları
                          </a>{" "}
                          ve{" "}
                          <a href="/privacy" className="text-primary hover:underline">
                            Gizlilik Politikası
                          </a>
                          'nı kabul ediyorum *
                        </Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
                Önceki
              </Button>

              {currentStep < 4 ? (
                <Button onClick={nextStep}>Sonraki</Button>
              ) : (
                <Button
                  onClick={submitApplication}
                  disabled={!formData.agreeToTerms || !formData.agreeToCommission}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Başvuruyu Gönder
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Submitted Status */}
        {applicationStatus === "submitted" && (
          <Card>
            <CardContent className="p-8 text-center">
              <Upload className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-4">Başvurunuz Alındı!</h2>
              <p className="text-muted-foreground mb-6">
                Booster başvurunuz başarıyla gönderildi. Moderatörlerimiz en kısa sürede inceleyecektir.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Under Review Status */}
        {applicationStatus === "under-review" && (
          <Card>
            <CardContent className="p-8 text-center">
              <Clock className="h-16 w-16 text-blue-500 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-4">Başvurunuz İnceleniyor</h2>
              <p className="text-muted-foreground mb-6">
                Moderatörlerimiz başvurunuzu ve belgelerinizi inceliyor. Bu işlem 3-5 iş günü sürebilir.
              </p>
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  İnceleme sürecinde ek bilgi gerekirse sizinle iletişime geçilecektir.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )}

        {/* Approved Status */}
        {applicationStatus === "approved" && (
          <Card className="border-green-200 bg-green-50/50">
            <CardContent className="p-8 text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-4 text-green-700">Tebrikler! Booster Oldunuz!</h2>
              <p className="text-muted-foreground mb-6">
                Başvurunuz onaylandı. Artık boost hizmeti verebilir ve para kazanabilirsiniz.
              </p>
              <div className="flex justify-center gap-4">
                <Button asChild>
                  <a href="/booster-dashboard">Booster Paneli</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/boost-services">Hizmet Oluştur</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Rejected Status */}
        {applicationStatus === "rejected" && (
          <Card className="border-red-200 bg-red-50/50">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold mb-4 text-red-700">Başvuru Reddedildi</h2>
                <p className="text-muted-foreground">
                  Maalesef başvurunuz reddedildi. Aşağıdaki nedenleri kontrol ederek tekrar başvurabilirsiniz.
                </p>
              </div>

              <Alert className="mb-6">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Red Nedenleri:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Gameplay videosu yeterli kalitede değil</li>
                    <li>Rank kanıtı geçersiz</li>
                    <li>Deneyim seviyesi yetersiz</li>
                  </ul>
                </AlertDescription>
              </Alert>

              <div className="text-center">
                <Button
                  onClick={() => {
                    setApplicationStatus("not-started")
                    setCurrentStep(1)
                  }}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Tekrar Başvur
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
