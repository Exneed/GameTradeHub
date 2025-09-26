"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Zap,
  Star,
  Clock,
  DollarSign,
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Target,
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"

const games = ["Valorant", "League of Legends", "CS2", "Apex Legends", "Fortnite"]
const valorantRanks = ["Iron", "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Immortal", "Radiant"]
const lolRanks = ["Iron", "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Master", "Grandmaster", "Challenger"]

export default function BoosterDashboard() {
  const [user, setUser] = useState<any>(null)
  const [boosterApplication, setBoosterApplication] = useState<any>(null)
  const [boostRequests, setBoostRequests] = useState<any[]>([])
  const [activeBoosts, setActiveBoosts] = useState<any[]>([])
  const [completedBoosts, setCompletedBoosts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showApplicationForm, setShowApplicationForm] = useState(false)

  const [applicationData, setApplicationData] = useState({
    games: [] as string[],
    experienceYears: "",
    highestRanks: {} as Record<string, string>,
    portfolioLinks: [] as string[],
    hourlyRate: "",
    description: "",
  })

  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        // Fetch booster application
        const { data: application } = await supabase
          .from("booster_applications")
          .select("*")
          .eq("user_id", user.id)
          .single()

        setBoosterApplication(application)

        // Fetch boost requests
        const { data: requests } = await supabase
          .from("boost_requests")
          .select("*")
          .eq("status", "open")
          .order("created_at", { ascending: false })

        setBoostRequests(requests || [])

        // Fetch active boosts
        const { data: active } = await supabase
          .from("boost_requests")
          .select("*")
          .eq("booster_id", user.id)
          .eq("status", "in_progress")

        setActiveBoosts(active || [])

        // Fetch completed boosts
        const { data: completed } = await supabase
          .from("boost_requests")
          .select("*")
          .eq("booster_id", user.id)
          .eq("status", "completed")

        setCompletedBoosts(completed || [])
      }

      setIsLoading(false)
    }

    fetchData()
  }, [])

  const handleApplicationSubmit = async () => {
    if (!user) return

    setIsLoading(true)

    const { error } = await supabase.from("booster_applications").insert({
      user_id: user.id,
      games: applicationData.games,
      experience_years: Number.parseInt(applicationData.experienceYears),
      highest_ranks: applicationData.highestRanks,
      portfolio_links: applicationData.portfolioLinks.filter((link) => link.trim()),
      hourly_rate: Number.parseFloat(applicationData.hourlyRate),
      status: "pending",
    })

    if (error) {
      console.error("Error submitting application:", error)
      alert("Başvuru gönderilirken bir hata oluştu")
    } else {
      setShowApplicationForm(false)
      // Refresh data
      window.location.reload()
    }

    setIsLoading(false)
  }

  const acceptBoostRequest = async (requestId: string) => {
    const { error } = await supabase
      .from("boost_requests")
      .update({
        status: "in_progress",
        booster_id: user?.id,
      })
      .eq("id", requestId)

    if (!error) {
      // Refresh data
      window.location.reload()
    }
  }

  const completeBoost = async (requestId: string) => {
    const { error } = await supabase.from("boost_requests").update({ status: "completed" }).eq("id", requestId)

    if (!error) {
      // Refresh data
      window.location.reload()
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Yükleniyor...</div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="text-center py-8">
              <p>Booster paneline erişmek için giriş yapmalısınız.</p>
              <Button asChild className="mt-4">
                <a href="/auth/login">Giriş Yap</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // If no application exists, show application form
  if (!boosterApplication && !showApplicationForm) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader className="text-center">
                <div className="h-16 w-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Booster Ol</CardTitle>
                <CardDescription>GameMarkt'ta booster olarak para kazanmaya başlayın</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center mx-auto mb-2">
                      <DollarSign className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="font-semibold">Para Kazanın</h3>
                    <p className="text-sm text-muted-foreground">Saatlik 50-200₺ arası kazanç</p>
                  </div>
                  <div className="text-center">
                    <div className="h-12 w-12 rounded-lg bg-chart-4/20 flex items-center justify-center mx-auto mb-2">
                      <Clock className="h-6 w-6 text-chart-4" />
                    </div>
                    <h3 className="font-semibold">Esnek Çalışma</h3>
                    <p className="text-sm text-muted-foreground">İstediğiniz saatlerde çalışın</p>
                  </div>
                  <div className="text-center">
                    <div className="h-12 w-12 rounded-lg bg-chart-5/20 flex items-center justify-center mx-auto mb-2">
                      <Star className="h-6 w-6 text-chart-5" />
                    </div>
                    <h3 className="font-semibold">Güvenli Ödeme</h3>
                    <p className="text-sm text-muted-foreground">Garantili ve hızlı ödemeler</p>
                  </div>
                </div>

                <Alert className="border-accent/50 bg-accent/10">
                  <AlertCircle className="h-4 w-4 text-accent" />
                  <AlertDescription className="text-accent-foreground">
                    Booster başvurunuz incelendikten sonra onaylanacak ve boost taleplerini görmeye başlayacaksınız.
                  </AlertDescription>
                </Alert>

                <Button onClick={() => setShowApplicationForm(true)} className="w-full">
                  Booster Başvurusu Yap
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Show application form
  if (showApplicationForm) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle>Booster Başvuru Formu</CardTitle>
                <CardDescription>Bilgilerinizi doldurun ve booster olmak için başvurun</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Hangi oyunlarda boost verebilirsiniz? *</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {games.map((game) => (
                      <label key={game} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={applicationData.games.includes(game)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setApplicationData((prev) => ({
                                ...prev,
                                games: [...prev.games, game],
                              }))
                            } else {
                              setApplicationData((prev) => ({
                                ...prev,
                                games: prev.games.filter((g) => g !== game),
                              }))
                            }
                          }}
                        />
                        <span className="text-sm">{game}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Kaç yıldır gaming deneyiminiz var? *</Label>
                  <Input
                    id="experience"
                    type="number"
                    placeholder="5"
                    value={applicationData.experienceYears}
                    onChange={(e) => setApplicationData((prev) => ({ ...prev, experienceYears: e.target.value }))}
                  />
                </div>

                {applicationData.games.map((game) => (
                  <div key={game} className="space-y-2">
                    <Label>{game} - En yüksek rank'iniz *</Label>
                    <Select
                      value={applicationData.highestRanks[game] || ""}
                      onValueChange={(value) =>
                        setApplicationData((prev) => ({
                          ...prev,
                          highestRanks: { ...prev.highestRanks, [game]: value },
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Rank seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {(game === "Valorant" ? valorantRanks : lolRanks).map((rank) => (
                          <SelectItem key={rank} value={rank}>
                            {rank}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}

                <div className="space-y-2">
                  <Label htmlFor="hourlyRate">Saatlik ücret beklentiniz (₺) *</Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    placeholder="100"
                    value={applicationData.hourlyRate}
                    onChange={(e) => setApplicationData((prev) => ({ ...prev, hourlyRate: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Portfolyo linkleri (opsiyonel)</Label>
                  {[0, 1, 2].map((index) => (
                    <Input
                      key={index}
                      placeholder="https://example.com/profile"
                      value={applicationData.portfolioLinks[index] || ""}
                      onChange={(e) => {
                        const newLinks = [...applicationData.portfolioLinks]
                        newLinks[index] = e.target.value
                        setApplicationData((prev) => ({ ...prev, portfolioLinks: newLinks }))
                      }}
                    />
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button onClick={() => setShowApplicationForm(false)} variant="outline" className="flex-1">
                    İptal
                  </Button>
                  <Button onClick={handleApplicationSubmit} disabled={isLoading} className="flex-1">
                    {isLoading ? "Gönderiliyor..." : "Başvuru Gönder"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Show pending application status
  if (boosterApplication?.status === "pending") {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader className="text-center">
                <div className="h-16 w-16 rounded-2xl bg-yellow-500/20 flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-yellow-500" />
                </div>
                <CardTitle className="text-2xl">Başvurunuz İnceleniyor</CardTitle>
                <CardDescription>Booster başvurunuz uzmanlarımız tarafından inceleniyor</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert className="border-yellow-500/50 bg-yellow-500/10">
                  <Clock className="h-4 w-4 text-yellow-500" />
                  <AlertDescription className="text-yellow-600">
                    Başvurunuz 24-48 saat içinde değerlendirilecek ve size e-posta ile bilgi verilecektir.
                  </AlertDescription>
                </Alert>

                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <h3 className="font-semibold">Başvuru Detayları:</h3>
                  <p className="text-sm">
                    <strong>Oyunlar:</strong> {boosterApplication.games.join(", ")}
                  </p>
                  <p className="text-sm">
                    <strong>Deneyim:</strong> {boosterApplication.experience_years} yıl
                  </p>
                  <p className="text-sm">
                    <strong>Saatlik Ücret:</strong> {boosterApplication.hourly_rate}₺
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Show rejected application
  if (boosterApplication?.status === "rejected") {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader className="text-center">
                <div className="h-16 w-16 rounded-2xl bg-destructive/20 flex items-center justify-center mx-auto mb-4">
                  <XCircle className="h-8 w-8 text-destructive" />
                </div>
                <CardTitle className="text-2xl">Başvurunuz Reddedildi</CardTitle>
                <CardDescription>Maalesef booster başvurunuz kabul edilmedi</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert className="border-destructive/50 bg-destructive/10">
                  <XCircle className="h-4 w-4 text-destructive" />
                  <AlertDescription className="text-destructive">
                    Başvurunuz değerlendirildi ancak şu anda kriterleri karşılamadığı tespit edildi. 3 ay sonra tekrar
                    başvurabilirsiniz.
                  </AlertDescription>
                </Alert>

                <Button onClick={() => setShowApplicationForm(true)} variant="outline" className="w-full">
                  Yeni Başvuru Yap
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Main booster dashboard for approved boosters
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Booster Paneli</h1>
          <p className="text-muted-foreground">Boost taleplerini yönetin ve kazancınızı takip edin</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Aktif Boostlar</p>
                  <p className="text-2xl font-bold">{activeBoosts.length}</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tamamlanan</p>
                  <p className="text-2xl font-bold">{completedBoosts.length}</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Bu Ay Kazanç</p>
                  <p className="text-2xl font-bold">₺{(completedBoosts.length * 150).toFixed(0)}</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Değerlendirme</p>
                  <p className="text-2xl font-bold">4.8</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                  <Star className="h-6 w-6 text-yellow-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList>
            <TabsTrigger value="requests">Yeni Talepler ({boostRequests.length})</TabsTrigger>
            <TabsTrigger value="active">Aktif Boostlar ({activeBoosts.length})</TabsTrigger>
            <TabsTrigger value="completed">Tamamlanan ({completedBoosts.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="space-y-4">
            {boostRequests.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Şu anda yeni boost talebi bulunmuyor.</p>
                </CardContent>
              </Card>
            ) : (
              boostRequests.map((request) => (
                <Card key={request.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{request.game} Boost</h3>
                        <p className="text-muted-foreground">
                          {request.current_rank} → {request.target_rank}
                        </p>
                      </div>
                      <Badge variant="secondary">₺{request.budget}</Badge>
                    </div>

                    {request.description && <p className="text-sm text-muted-foreground mb-4">{request.description}</p>}

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        {new Date(request.created_at).toLocaleDateString("tr-TR")}
                      </span>
                      <Button onClick={() => acceptBoostRequest(request.id)}>Talebi Kabul Et</Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            {activeBoosts.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Aktif boost bulunmuyor.</p>
                </CardContent>
              </Card>
            ) : (
              activeBoosts.map((boost) => (
                <Card key={boost.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{boost.game} Boost</h3>
                        <p className="text-muted-foreground">
                          {boost.current_rank} → {boost.target_rank}
                        </p>
                      </div>
                      <Badge className="bg-primary">Devam Ediyor</Badge>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Başlangıç: {new Date(boost.created_at).toLocaleDateString("tr-TR")}
                      </span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Mesaj Gönder
                        </Button>
                        <Button onClick={() => completeBoost(boost.id)} size="sm">
                          Tamamlandı
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedBoosts.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Henüz tamamlanmış boost bulunmuyor.</p>
                </CardContent>
              </Card>
            ) : (
              completedBoosts.map((boost) => (
                <Card key={boost.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{boost.game} Boost</h3>
                        <p className="text-muted-foreground">
                          {boost.current_rank} → {boost.target_rank}
                        </p>
                      </div>
                      <Badge variant="secondary" className="bg-green-500/20 text-green-700">
                        Tamamlandı
                      </Badge>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Tamamlanma: {new Date(boost.updated_at).toLocaleDateString("tr-TR")}
                      </span>
                      <span className="font-semibold text-green-600">₺{boost.budget}</span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
