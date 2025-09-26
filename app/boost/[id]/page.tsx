"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Star, Shield, Clock, Target, Zap, MessageCircle, Send, Trophy, CheckCircle, AlertTriangle } from "lucide-react"

// Mock boost request data
const mockBoostRequest = {
  id: 1,
  title: "Valorant Silver 2 → Gold 1 Boost",
  game: "Valorant",
  currentRank: "Silver 2",
  targetRank: "Gold 1",
  budget: 450,
  deadline: "3 gün",
  client: {
    name: "GameLover23",
    rating: 4.8,
    totalOrders: 12,
    memberSince: "2023",
    avatar: "/diverse-user-avatars.png",
  },
  description: `Hızlı ve güvenli boost arıyorum. Duo queue tercih ederim.
  
Önemli notlar:
- Akşam saatleri (19:00-24:00) oynayabilirim
- Türkçe iletişim kurabilecek booster arıyorum
- Hesabımda ban geçmişi yok, temiz hesap
- Mümkünse 3 gün içinde tamamlanmasını istiyorum`,
  requirements: ["Duo Queue", "Türkçe İletişim", "Akşam Saatleri"],
  boostType: "duo",
  priority: true,
  offers: 12,
  status: "active",
  createdAt: "2024-01-15",
}

// Mock offers from boosters
const mockOffers = [
  {
    id: 1,
    booster: {
      name: "ProBooster",
      rating: 4.9,
      completedJobs: 156,
      currentRank: "Radiant",
      avatar: "/diverse-user-avatars.png",
      verified: true,
      responseTime: "< 1 saat",
      successRate: 98,
    },
    price: 420,
    estimatedTime: "2-3 gün",
    message:
      "Merhaba! Valorant'ta 3+ yıl deneyimim var. Duo queue ile hızlı ve güvenli boost sağlayabilirim. Akşam saatleri uygun.",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    booster: {
      name: "RankMaster",
      rating: 4.8,
      completedJobs: 203,
      currentRank: "Immortal 3",
      avatar: "/diverse-user-avatars.png",
      verified: true,
      responseTime: "< 2 saat",
      successRate: 96,
    },
    price: 400,
    estimatedTime: "2-4 gün",
    message:
      "Selam! Silver-Gold arası boost konusunda çok deneyimliyim. Türkçe iletişim sıkıntı değil, akşam saatleri aktifim.",
    createdAt: "2024-01-15",
  },
  {
    id: 3,
    booster: {
      name: "BoostKing",
      rating: 4.9,
      completedJobs: 89,
      currentRank: "Immortal 2",
      avatar: "/diverse-user-avatars.png",
      verified: true,
      responseTime: "< 30 dk",
      successRate: 99,
      isOnline: true,
    },
    price: 450,
    estimatedTime: "1-2 gün",
    message: "Hızlı boost garantisi! Duo queue ile 1-2 gün içinde Gold 1'e çıkarabilirim. %100 güvenli.",
    createdAt: "2024-01-15",
  },
]

export default function BoostDetailPage() {
  const [selectedOffer, setSelectedOffer] = useState<number | null>(null)
  const [newOfferPrice, setNewOfferPrice] = useState("")
  const [newOfferMessage, setNewOfferMessage] = useState("")
  const [showOfferForm, setShowOfferForm] = useState(false)

  const handleAcceptOffer = (offerId: number) => {
    // Handle offer acceptance
    console.log("Accepting offer:", offerId)
  }

  const handleSubmitOffer = () => {
    // Handle new offer submission
    console.log("Submitting offer:", { price: newOfferPrice, message: newOfferMessage })
    setShowOfferForm(false)
    setNewOfferPrice("")
    setNewOfferMessage("")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Boost Request Details */}
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{mockBoostRequest.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Trophy className="h-4 w-4" />
                        {mockBoostRequest.currentRank} → {mockBoostRequest.targetRank}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {mockBoostRequest.deadline}
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="h-4 w-4" />
                        {mockBoostRequest.offers} teklif
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{mockBoostRequest.budget}₺</div>
                    <div className="text-sm text-muted-foreground">Bütçe</div>
                    {mockBoostRequest.priority && (
                      <Badge className="bg-destructive mt-1">
                        <Zap className="h-3 w-3 mr-1" />
                        Öncelikli
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Açıklama</h4>
                    <div className="prose prose-sm max-w-none">
                      <pre className="whitespace-pre-wrap text-sm text-muted-foreground font-sans">
                        {mockBoostRequest.description}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Gereksinimler</h4>
                    <div className="flex flex-wrap gap-2">
                      {mockBoostRequest.requirements.map((req, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                      <Badge variant="outline" className="text-xs">
                        {mockBoostRequest.boostType === "duo" ? "Duo Queue" : "Solo Queue"}
                      </Badge>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={mockBoostRequest.client.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{mockBoostRequest.client.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{mockBoostRequest.client.name}</span>
                        <Shield className="h-4 w-4 text-accent" />
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span>{mockBoostRequest.client.rating}</span>
                        <span>({mockBoostRequest.client.totalOrders} sipariş)</span>
                        <span>• {mockBoostRequest.client.memberSince} yılından beri üye</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Offers */}
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Booster Teklifleri ({mockOffers.length})</span>
                  <Button onClick={() => setShowOfferForm(!showOfferForm)}>
                    <Send className="h-4 w-4 mr-2" />
                    Teklif Ver
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* New Offer Form */}
                  {showOfferForm && (
                    <Card className="border-primary/50 bg-primary/5">
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="offerPrice">Teklif Fiyatı (₺)</Label>
                              <Input
                                id="offerPrice"
                                type="number"
                                placeholder="400"
                                value={newOfferPrice}
                                onChange={(e) => setNewOfferPrice(e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Tahmini Süre</Label>
                              <Input placeholder="2-3 gün" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="offerMessage">Mesajınız</Label>
                            <Textarea
                              id="offerMessage"
                              placeholder="Deneyiminizi ve boost planınızı açıklayın..."
                              rows={3}
                              value={newOfferMessage}
                              onChange={(e) => setNewOfferMessage(e.target.value)}
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button onClick={handleSubmitOffer}>Teklif Gönder</Button>
                            <Button variant="outline" onClick={() => setShowOfferForm(false)}>
                              İptal
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Existing Offers */}
                  {mockOffers.map((offer) => (
                    <Card
                      key={offer.id}
                      className={`transition-all ${
                        selectedOffer === offer.id ? "border-primary bg-primary/5" : "border-border"
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="relative">
                            <Avatar>
                              <AvatarImage src={offer.booster.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{offer.booster.name[0]}</AvatarFallback>
                            </Avatar>
                            {offer.booster.isOnline && (
                              <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
                            )}
                          </div>

                          <div className="flex-1 space-y-3">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium">{offer.booster.name}</span>
                                  {offer.booster.verified && <Shield className="h-4 w-4 text-accent" />}
                                  <Badge variant="outline" className="text-xs">
                                    {offer.booster.currentRank}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                    {offer.booster.rating} ({offer.booster.completedJobs} iş)
                                  </div>
                                  <span>Başarı: %{offer.booster.successRate}</span>
                                  <span>Yanıt: {offer.booster.responseTime}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-xl font-bold text-primary">{offer.price}₺</div>
                                <div className="text-xs text-muted-foreground">{offer.estimatedTime}</div>
                              </div>
                            </div>

                            <p className="text-sm text-muted-foreground">{offer.message}</p>

                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">
                                {new Date(offer.createdAt).toLocaleDateString("tr-TR")}
                              </span>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setSelectedOffer(offer.id)}
                                  className="bg-transparent"
                                >
                                  <MessageCircle className="h-4 w-4 mr-1" />
                                  Mesaj
                                </Button>
                                <Button size="sm" onClick={() => handleAcceptOffer(offer.id)}>
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Kabul Et
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Hızlı İşlemler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Müşteriyle İletişim
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Target className="h-4 w-4 mr-2" />
                    Benzer İlanları Gör
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Boost Info */}
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">İlan Detayları</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Oyun:</span>
                    <span>{mockBoostRequest.game}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Boost Türü:</span>
                    <span>{mockBoostRequest.boostType === "duo" ? "Duo Queue" : "Solo Queue"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Durum:</span>
                    <Badge variant="secondary">Aktif</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Oluşturulma:</span>
                    <span>{new Date(mockBoostRequest.createdAt).toLocaleDateString("tr-TR")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Teklif Sayısı:</span>
                    <span>{mockBoostRequest.offers}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Safety Tips */}
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  Güvenlik İpuçları
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Sadece doğrulanmış boosterlarla çalışın</p>
                  <p>• Ödemeyi platform üzerinden yapın</p>
                  <p>• Hesap bilgilerinizi güvenli paylaşın</p>
                  <p>• Boost sürecini takip edin</p>
                  <p>• Şüpheli durumları bildirin</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
