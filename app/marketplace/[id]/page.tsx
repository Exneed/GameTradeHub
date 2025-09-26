"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Star,
  Shield,
  Heart,
  Share2,
  Flag,
  GamepadIcon,
  Trophy,
  Crown,
  Zap,
  Clock,
  MessageCircle,
  ShoppingCart,
  CheckCircle,
  AlertTriangle,
  Eye,
} from "lucide-react"
import Link from "next/link"

// Mock account data
const mockAccount = {
  id: 1,
  title: "Valorant Immortal 3 Hesap - Tüm Ajanlar Açık",
  game: "Valorant",
  rank: "Immortal 3",
  level: 156,
  price: 2500,
  originalPrice: 3000,
  seller: {
    name: "ProGamer123",
    rating: 4.9,
    totalSales: 234,
    verified: true,
    memberSince: "2022",
    avatar: "/diverse-user-avatars.png",
  },
  images: ["/valorant-account-screenshot-1.jpg", "/valorant-account-screenshot-2.jpg", "/valorant-account-screenshot-3.jpg"],
  features: [
    "Tüm Ajanlar Açık",
    "Rare Skinler (Dragon, Prime, Elderflame)",
    "Battle Pass Tamamlanmış",
    "Competitive Ready",
    "Email Değiştirilebilir",
    "Güvenli Transfer",
  ],
  stats: {
    wins: 1247,
    kd: 1.34,
    headshot: 23.4,
    playtime: "847 saat",
  },
  description: `
    Mükemmel durumda Valorant hesabı satılık! 

    🎯 Immortal 3 rank ile competitive oyunlara hazır
    🔫 Rare skin koleksiyonu (Dragon Vandal, Prime Phantom, Elderflame Operator)
    ⚡ Tüm ajanlar açık ve mastery seviyeleri yüksek
    🏆 Battle Pass tamamlanmış, exclusive rewards mevcut
    
    Hesap tamamen temiz, ban geçmişi yok. Email değiştirilebilir.
    Güvenli transfer garantisi ile birlikte teslim edilir.
  `,
  views: 234,
  likes: 45,
  timeLeft: "2 gün",
  isHot: true,
  createdAt: "2024-01-15",
}

const reviews = [
  {
    id: 1,
    user: "GamerBoy",
    rating: 5,
    comment: "Mükemmel hesap, açıklandığı gibi. Satıcı çok güvenilir, hızlı teslimat.",
    date: "2024-01-10",
    verified: true,
  },
  {
    id: 2,
    user: "ProPlayer",
    rating: 5,
    comment: "Harika skinler var, hesap temiz. Kesinlikle tavsiye ederim.",
    date: "2024-01-08",
    verified: true,
  },
  {
    id: 3,
    user: "ValorantFan",
    rating: 4,
    comment: "İyi hesap ama biraz pahalı. Ama kalitesi var.",
    date: "2024-01-05",
    verified: false,
  },
]

export default function AccountDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Images */}
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={mockAccount.images[selectedImage] || "/placeholder.svg"}
                    alt={mockAccount.title}
                    className="w-full h-96 object-cover rounded-t-lg"
                  />
                  {mockAccount.isHot && (
                    <Badge className="absolute top-4 left-4 bg-destructive">
                      <Zap className="h-3 w-3 mr-1" />
                      HOT
                    </Badge>
                  )}
                  {mockAccount.originalPrice && (
                    <Badge className="absolute top-4 right-4 bg-accent">
                      %{Math.round(((mockAccount.originalPrice - mockAccount.price) / mockAccount.originalPrice) * 100)}{" "}
                      İndirim
                    </Badge>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex gap-2 overflow-x-auto">
                    {mockAccount.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                          selectedImage === index ? "border-primary" : "border-border"
                        }`}
                      >
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Screenshot ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Details */}
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{mockAccount.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <GamepadIcon className="h-4 w-4" />
                        {mockAccount.game}
                      </div>
                      <div className="flex items-center gap-1">
                        <Trophy className="h-4 w-4" />
                        {mockAccount.rank}
                      </div>
                      <div className="flex items-center gap-1">
                        <Crown className="h-4 w-4" />
                        Level {mockAccount.level}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsLiked(!isLiked)}
                      className={isLiked ? "text-red-500" : ""}
                    >
                      <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Flag className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="description" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="description">Açıklama</TabsTrigger>
                    <TabsTrigger value="features">Özellikler</TabsTrigger>
                    <TabsTrigger value="stats">İstatistikler</TabsTrigger>
                  </TabsList>
                  <TabsContent value="description" className="mt-4">
                    <div className="prose prose-sm max-w-none">
                      <pre className="whitespace-pre-wrap text-sm text-foreground font-sans">
                        {mockAccount.description}
                      </pre>
                    </div>
                  </TabsContent>
                  <TabsContent value="features" className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {mockAccount.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-accent" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="stats" className="mt-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{mockAccount.stats.wins}</div>
                        <div className="text-sm text-muted-foreground">Kazanılan Maç</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{mockAccount.stats.kd}</div>
                        <div className="text-sm text-muted-foreground">K/D Oranı</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{mockAccount.stats.headshot}%</div>
                        <div className="text-sm text-muted-foreground">Headshot</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{mockAccount.stats.playtime}</div>
                        <div className="text-sm text-muted-foreground">Oyun Süresi</div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle>Değerlendirmeler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-border pb-4 last:border-b-0">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{review.user[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{review.user}</span>
                            {review.verified && <Shield className="h-3 w-3 text-accent" />}
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < review.rating ? "text-yellow-500 fill-current" : "text-muted-foreground"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground">{review.date}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price and Purchase */}
            <Card className="bg-card/50 backdrop-blur border-border/50 sticky top-4">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    {mockAccount.originalPrice && (
                      <div className="text-sm text-muted-foreground line-through">{mockAccount.originalPrice}₺</div>
                    )}
                    <div className="text-3xl font-bold text-primary">{mockAccount.price}₺</div>
                  </div>

                  <Alert className="border-accent/50 bg-accent/10">
                    <Shield className="h-4 w-4 text-accent" />
                    <AlertDescription className="text-accent-foreground">
                      Bu hesap TC onaylı satıcı tarafından satılmaktadır.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-2">
                    <Button className="w-full" size="lg">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Hemen Satın Al
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Satıcıyla İletişim
                    </Button>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {mockAccount.views} görüntüleme
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {mockAccount.timeLeft} kaldı
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seller Info */}
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Satıcı Bilgileri</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={mockAccount.seller.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{mockAccount.seller.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{mockAccount.seller.name}</span>
                        {mockAccount.seller.verified && <Shield className="h-4 w-4 text-accent" />}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span className="text-sm">{mockAccount.seller.rating}</span>
                        <span className="text-xs text-muted-foreground">({mockAccount.seller.totalSales} satış)</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Üyelik:</span>
                      <span>{mockAccount.seller.memberSince} yılından beri</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Toplam Satış:</span>
                      <span>{mockAccount.seller.totalSales}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Değerlendirme:</span>
                      <span>{mockAccount.seller.rating}/5.0</span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <Link href={`/seller/${mockAccount.seller.name}`}>Satıcı Profilini Gör</Link>
                  </Button>
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
                  <p>• Sadece TC onaylı satıcılardan alışveriş yapın</p>
                  <p>• Ödemeyi platform üzerinden gerçekleştirin</p>
                  <p>• Hesap bilgilerini teslim almadan önce kontrol edin</p>
                  <p>• Şüpheli durumları hemen bildirin</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
