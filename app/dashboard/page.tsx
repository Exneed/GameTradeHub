"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { BalanceWidget } from "@/components/balance-widget"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  ShoppingCart,
  Zap,
  Star,
  Shield,
  TrendingUp,
  Clock,
  Eye,
  Heart,
  MessageCircle,
  Settings,
  Bell,
  Trophy,
  Activity,
} from "lucide-react"
import Link from "next/link"

// Mock user data
const mockUser = {
  name: "Ahmet Yılmaz",
  email: "ahmet@example.com",
  avatar: "/diverse-user-avatars.png",
  memberSince: "2022",
  tcVerified: true,
  rating: 4.8,
  totalTransactions: 47,
  level: "Gold",
  levelProgress: 75,
}

// Mock dashboard data
const mockStats = {
  totalPurchases: 12,
  totalSales: 8,
  activeListings: 3,
  completedBoosts: 5,
  totalEarnings: 2450,
  totalSpent: 1800,
  monthlyGrowth: 15.2,
}

const mockRecentActivity = [
  {
    id: 1,
    type: "purchase",
    title: "Valorant Immortal Hesap Satın Aldı",
    amount: -250,
    date: "2 saat önce",
    status: "completed",
  },
  {
    id: 2,
    type: "sale",
    title: "CS2 Global Elite Hesap Sattı",
    amount: 450,
    date: "1 gün önce",
    status: "completed",
  },
  {
    id: 3,
    type: "boost",
    title: "LoL Plat → Diamond Boost Tamamlandı",
    amount: 300,
    date: "3 gün önce",
    status: "completed",
  },
  {
    id: 4,
    type: "deposit",
    title: "Bakiye Yükledi",
    amount: 500,
    date: "5 gün önce",
    status: "completed",
  },
]

const mockActiveOrders = [
  {
    id: 1,
    type: "purchase",
    title: "Apex Legends Predator Hesap",
    seller: "ApexKing",
    amount: 320,
    status: "processing",
    progress: 60,
    estimatedCompletion: "2 gün",
  },
  {
    id: 2,
    type: "boost",
    title: "Valorant Silver → Gold Boost",
    booster: "ProBooster",
    amount: 180,
    status: "in_progress",
    progress: 40,
    estimatedCompletion: "3 gün",
  },
]

const mockListings = [
  {
    id: 1,
    title: "League of Legends Diamond Hesap",
    price: 800,
    views: 156,
    likes: 23,
    status: "active",
    createdAt: "3 gün önce",
  },
  {
    id: 2,
    title: "CS2 Supreme Hesap",
    price: 450,
    views: 89,
    likes: 12,
    status: "sold",
    createdAt: "1 hafta önce",
  },
  {
    id: 3,
    title: "Valorant Ascendant Hesap",
    price: 600,
    views: 234,
    likes: 34,
    status: "active",
    createdAt: "5 gün önce",
  },
]

export default function DashboardPage() {
  const [balance] = useState(1250.75)

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "purchase":
        return <ShoppingCart className="h-4 w-4 text-blue-500" />
      case "sale":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "boost":
        return <Zap className="h-4 w-4 text-purple-500" />
      case "deposit":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Tamamlandı</Badge>
      case "processing":
        return <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30">İşleniyor</Badge>
      case "in_progress":
        return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">Devam Ediyor</Badge>
      case "active":
        return <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Aktif</Badge>
      case "sold":
        return <Badge className="bg-gray-500/20 text-gray-500 border-gray-500/30">Satıldı</Badge>
      default:
        return <Badge variant="outline">Bilinmiyor</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Hoş Geldin, {mockUser.name}!</h1>
              <p className="text-muted-foreground">Hesap durumunu ve aktivitelerini buradan takip edebilirsin</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Ayarlar
                </Link>
              </Button>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Bildirimler
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* User Profile Card */}
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={mockUser.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-lg">{mockUser.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <h3 className="font-semibold">{mockUser.name}</h3>
                      {mockUser.tcVerified && <Shield className="h-4 w-4 text-accent" />}
                    </div>
                    <p className="text-sm text-muted-foreground">{mockUser.email}</p>
                  </div>
                  <div className="w-full space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Seviye: {mockUser.level}</span>
                      <span>{mockUser.levelProgress}%</span>
                    </div>
                    <Progress value={mockUser.levelProgress} className="h-2" />
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span>{mockUser.rating}</span>
                    </div>
                    <div className="text-muted-foreground">{mockUser.totalTransactions} işlem</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Balance Widget */}
            <BalanceWidget balance={balance} monthlyChange={mockStats.monthlyGrowth} />

            {/* Quick Stats */}
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Hızlı İstatistikler</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Toplam Alım:</span>
                  <span className="font-medium">{mockStats.totalPurchases}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Toplam Satış:</span>
                  <span className="font-medium">{mockStats.totalSales}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Aktif İlan:</span>
                  <span className="font-medium">{mockStats.activeListings}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Boost Tamamlandı:</span>
                  <span className="font-medium">{mockStats.completedBoosts}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
                <TabsTrigger value="orders">Siparişlerim</TabsTrigger>
                <TabsTrigger value="listings">İlanlarım</TabsTrigger>
                <TabsTrigger value="activity">Aktivite</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-card/50 backdrop-blur border-border/50">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Bu Ay Kazanç</p>
                          <p className="text-2xl font-bold text-green-500">+{mockStats.totalEarnings}₺</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-green-500" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-card/50 backdrop-blur border-border/50">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Bu Ay Harcama</p>
                          <p className="text-2xl font-bold text-blue-500">-{mockStats.totalSpent}₺</p>
                        </div>
                        <ShoppingCart className="h-8 w-8 text-blue-500" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-card/50 backdrop-blur border-border/50">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Net Kar</p>
                          <p className="text-2xl font-bold text-primary">
                            +{mockStats.totalEarnings - mockStats.totalSpent}₺
                          </p>
                        </div>
                        <Trophy className="h-8 w-8 text-primary" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Active Orders */}
                <Card className="bg-card/50 backdrop-blur border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Devam Eden İşlemler
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockActiveOrders.map((order) => (
                        <div key={order.id} className="p-4 rounded-lg bg-muted/30">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h4 className="font-medium">{order.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                {order.type === "purchase" ? `Satıcı: ${order.seller}` : `Booster: ${order.booster}`}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">{order.amount}₺</div>
                              {getStatusBadge(order.status)}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>İlerleme</span>
                              <span>{order.progress}%</span>
                            </div>
                            <Progress value={order.progress} className="h-2" />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>Tahmini tamamlanma: {order.estimatedCompletion}</span>
                              <Button size="sm" variant="outline" className="h-6 text-xs bg-transparent">
                                Detaylar
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="bg-card/50 backdrop-blur border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Son Aktiviteler
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockRecentActivity.slice(0, 4).map((activity) => (
                        <div key={activity.id} className="flex items-center gap-3">
                          {getActivityIcon(activity.type)}
                          <div className="flex-1">
                            <p className="text-sm font-medium">{activity.title}</p>
                            <p className="text-xs text-muted-foreground">{activity.date}</p>
                          </div>
                          <div className="text-right">
                            <div
                              className={`font-medium text-sm ${activity.amount > 0 ? "text-green-500" : "text-red-500"}`}
                            >
                              {activity.amount > 0 ? "+" : ""}
                              {activity.amount}₺
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4 bg-transparent" asChild>
                      <Link href="/dashboard?tab=activity">Tüm Aktiviteleri Gör</Link>
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Orders Tab */}
              <TabsContent value="orders" className="space-y-6">
                <Card className="bg-card/50 backdrop-blur border-border/50">
                  <CardHeader>
                    <CardTitle>Siparişlerim</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockActiveOrders.map((order) => (
                        <div key={order.id} className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h4 className="font-medium">{order.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                {order.type === "purchase" ? `Satıcı: ${order.seller}` : `Booster: ${order.booster}`}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">{order.amount}₺</div>
                              {getStatusBadge(order.status)}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>İlerleme</span>
                              <span>{order.progress}%</span>
                            </div>
                            <Progress value={order.progress} className="h-2" />
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-muted-foreground">
                                Tahmini tamamlanma: {order.estimatedCompletion}
                              </span>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  <MessageCircle className="h-3 w-3 mr-1" />
                                  Mesaj
                                </Button>
                                <Button size="sm" variant="outline">
                                  Detaylar
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Listings Tab */}
              <TabsContent value="listings" className="space-y-6">
                <Card className="bg-card/50 backdrop-blur border-border/50">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>İlanlarım</CardTitle>
                      <Button asChild>
                        <Link href="/sell">Yeni İlan Ekle</Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockListings.map((listing) => (
                        <div
                          key={listing.id}
                          className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium mb-1">{listing.title}</h4>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Eye className="h-3 w-3" />
                                  {listing.views}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Heart className="h-3 w-3" />
                                  {listing.likes}
                                </div>
                                <span>{listing.createdAt}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium text-lg">{listing.price}₺</div>
                              {getStatusBadge(listing.status)}
                            </div>
                          </div>
                          <div className="flex justify-end gap-2 mt-3">
                            <Button size="sm" variant="outline">
                              Düzenle
                            </Button>
                            <Button size="sm" variant="outline">
                              İstatistikler
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Activity Tab */}
              <TabsContent value="activity" className="space-y-6">
                <Card className="bg-card/50 backdrop-blur border-border/50">
                  <CardHeader>
                    <CardTitle>Tüm Aktiviteler</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockRecentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                          {getActivityIcon(activity.type)}
                          <div className="flex-1">
                            <p className="text-sm font-medium">{activity.title}</p>
                            <p className="text-xs text-muted-foreground">{activity.date}</p>
                          </div>
                          <div className="text-right">
                            <div
                              className={`font-medium text-sm ${activity.amount > 0 ? "text-green-500" : "text-red-500"}`}
                            >
                              {activity.amount > 0 ? "+" : ""}
                              {activity.amount}₺
                            </div>
                            {getStatusBadge(activity.status)}
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4 bg-transparent">
                      Daha Fazla Yükle
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
