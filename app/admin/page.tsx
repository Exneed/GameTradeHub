"use client"

import type React from "react"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { LogOut } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import {
  Users,
  ShoppingCart,
  TrendingUp,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  DollarSign,
  Activity,
} from "lucide-react"

// Mock admin data
const mockStats = {
  totalUsers: 15420,
  pendingVerifications: 23,
  activeListings: 1247,
  pendingBoosts: 45,
  totalRevenue: 125000,
  monthlyGrowth: 12.5,
}

const mockPendingVerifications = [
  {
    id: 1,
    user: {
      name: "GameMaster99",
      email: "gamemaster@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
      joinDate: "2024-01-15",
    },
    documents: {
      idCard: "/placeholder.svg?height=200&width=300",
      selfie: "/placeholder.svg?height=200&width=200",
    },
    status: "pending",
    submittedAt: "2024-01-20T10:30:00Z",
  },
  {
    id: 2,
    user: {
      name: "ProBooster",
      email: "probooster@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
      joinDate: "2024-01-18",
    },
    documents: {
      idCard: "/placeholder.svg?height=200&width=300",
      selfie: "/placeholder.svg?height=200&width=200",
    },
    status: "pending",
    submittedAt: "2024-01-21T14:15:00Z",
  },
]

const mockPendingAccounts = [
  {
    id: 1,
    title: "Valorant Radiant Hesap - Tüm Ajanlar",
    seller: "ProGamer123",
    price: 3500,
    game: "Valorant",
    rank: "Radiant",
    images: ["/valorant-account.png"],
    submittedAt: "2024-01-20T09:00:00Z",
    status: "pending",
  },
  {
    id: 2,
    title: "CS2 Global Elite - Prime Hesap",
    seller: "CSMaster",
    price: 2800,
    game: "CS2",
    rank: "Global Elite",
    images: ["/cs2-account.jpg"],
    submittedAt: "2024-01-21T11:30:00Z",
    status: "pending",
  },
]

const mockPendingBoosts = [
  {
    id: 1,
    title: "Valorant Immortal 2 → Radiant",
    client: "GameSeeker",
    booster: "BoostMaster",
    price: 1200,
    game: "Valorant",
    currentRank: "Immortal 2",
    targetRank: "Radiant",
    status: "pending",
    createdAt: "2024-01-21T16:00:00Z",
  },
]

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [adminLoginForm, setAdminLoginForm] = useState({ username: "", password: "" })
  const [loginError, setLoginError] = useState("")
  const router = useRouter()

  useEffect(() => {
    const checkAdminAuth = () => {
      const adminToken = localStorage.getItem("admin_token")
      const adminExpiry = localStorage.getItem("admin_expiry")

      if (adminToken && adminExpiry) {
        const now = new Date().getTime()
        if (now < Number.parseInt(adminExpiry)) {
          setIsAdminAuthenticated(true)
        } else {
          localStorage.removeItem("admin_token")
          localStorage.removeItem("admin_expiry")
        }
      }
      setIsLoading(false)
    }

    checkAdminAuth()
  }, [])

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError("")

    if (adminLoginForm.username === "admin" && adminLoginForm.password === "admin123") {
      const expiryTime = new Date().getTime() + 24 * 60 * 60 * 1000
      localStorage.setItem("admin_token", "admin_authenticated")
      localStorage.setItem("admin_expiry", expiryTime.toString())
      setIsAdminAuthenticated(true)
    } else {
      setLoginError("Geçersiz admin bilgileri")
    }
  }

  const handleAdminLogout = () => {
    localStorage.removeItem("admin_token")
    localStorage.removeItem("admin_expiry")
    setIsAdminAuthenticated(false)
    setAdminLoginForm({ username: "", password: "" })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader className="text-center">
                <div className="h-16 w-16 rounded-2xl bg-red-500/20 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-red-500" />
                </div>
                <CardTitle className="text-2xl">Admin Girişi</CardTitle>
                <CardDescription>Admin paneline erişim için giriş yapın</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {loginError && (
                  <Alert className="border-destructive/50 bg-destructive/10">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    <AlertDescription className="text-destructive">{loginError}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-username">Admin Kullanıcı Adı</Label>
                    <Input
                      id="admin-username"
                      type="text"
                      placeholder="Admin kullanıcı adı"
                      value={adminLoginForm.username}
                      onChange={(e) => setAdminLoginForm((prev) => ({ ...prev, username: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Admin Şifresi</Label>
                    <Input
                      id="admin-password"
                      type="password"
                      placeholder="Admin şifresi"
                      value={adminLoginForm.password}
                      onChange={(e) => setAdminLoginForm((prev) => ({ ...prev, password: e.target.value }))}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                    Admin Girişi
                  </Button>
                </form>

                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Demo için: admin / admin123</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  const handleApproveVerification = (id: number) => {
    console.log("Approving verification:", id)
    // Here you would call your API to approve the verification
  }

  const handleRejectVerification = (id: number) => {
    console.log("Rejecting verification:", id)
    // Here you would call your API to reject the verification
  }

  const handleApproveAccount = (id: number) => {
    console.log("Approving account:", id)
    // Here you would call your API to approve the account listing
  }

  const handleRejectAccount = (id: number) => {
    console.log("Rejecting account:", id)
    // Here you would call your API to reject the account listing
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
            <p className="text-muted-foreground">Platform yönetimi ve onay süreçleri</p>
          </div>
          <Button
            variant="outline"
            onClick={handleAdminLogout}
            className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Admin Çıkışı
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Genel Bakış
            </TabsTrigger>
            <TabsTrigger value="verifications" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              TC Onayları
              {mockPendingVerifications.length > 0 && (
                <Badge className="bg-red-500 text-white text-xs">{mockPendingVerifications.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="accounts" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Hesap Onayları
              {mockPendingAccounts.length > 0 && (
                <Badge className="bg-yellow-500 text-white text-xs">{mockPendingAccounts.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="boosts" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Boost Onayları
              {mockPendingBoosts.length > 0 && (
                <Badge className="bg-blue-500 text-white text-xs">{mockPendingBoosts.length}</Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Toplam Kullanıcı</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.totalUsers.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+{mockStats.monthlyGrowth}% bu ay</p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Bekleyen Onaylar</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.pendingVerifications}</div>
                  <p className="text-xs text-muted-foreground">TC kimlik doğrulama</p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Aktif İlanlar</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.activeListings.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Hesap + Boost ilanları</p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Bekleyen Boostlar</CardTitle>
                  <TrendingUp className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.pendingBoosts}</div>
                  <p className="text-xs text-muted-foreground">Onay bekleyen boost talepleri</p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Toplam Gelir</CardTitle>
                  <DollarSign className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.totalRevenue.toLocaleString()}₺</div>
                  <p className="text-xs text-muted-foreground">Komisyon gelirleri</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="verifications" className="space-y-6">
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle>Bekleyen TC Kimlik Doğrulamaları</CardTitle>
                <CardDescription>Kullanıcıların kimlik doğrulama taleplerini inceleyin ve onaylayın</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockPendingVerifications.map((verification) => (
                    <div key={verification.id} className="border border-border/50 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={verification.user.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{verification.user.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{verification.user.name}</h3>
                            <p className="text-sm text-muted-foreground">{verification.user.email}</p>
                            <p className="text-xs text-muted-foreground">
                              Üyelik: {new Date(verification.user.joinDate).toLocaleDateString("tr-TR")}
                            </p>
                          </div>
                        </div>
                        <Badge className="bg-yellow-500/20 text-yellow-700 border-yellow-500/30">Bekliyor</Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Kimlik Belgesi</h4>
                          <img
                            src={verification.documents.idCard || "/placeholder.svg?height=200&width=300"}
                            alt="Kimlik Belgesi"
                            className="w-full h-32 object-cover rounded-lg border border-border/50"
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2">Selfie</h4>
                          <img
                            src={verification.documents.selfie || "/placeholder.svg?height=200&width=200"}
                            alt="Selfie"
                            className="w-full h-32 object-cover rounded-lg border border-border/50"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                          Gönderilme: {new Date(verification.submittedAt).toLocaleString("tr-TR")}
                        </p>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRejectVerification(verification.id)}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reddet
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleApproveVerification(verification.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Onayla
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="accounts" className="space-y-6">
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle>Bekleyen Hesap İlanları</CardTitle>
                <CardDescription>Satışa çıkarılmak istenen hesapları inceleyin ve onaylayın</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockPendingAccounts.map((account) => (
                    <div key={account.id} className="border border-border/50 rounded-lg p-4">
                      <div className="flex items-start gap-4 mb-4">
                        <img
                          src={account.images[0] || "/placeholder.svg?height=100&width=100"}
                          alt={account.title}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-medium">{account.title}</h3>
                              <p className="text-sm text-muted-foreground">Satıcı: {account.seller}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-primary">{account.price}₺</div>
                              <Badge className="bg-yellow-500/20 text-yellow-700 border-yellow-500/30">Bekliyor</Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Oyun: {account.game}</span>
                            <span>Rank: {account.rank}</span>
                            <span>Gönderilme: {new Date(account.submittedAt).toLocaleString("tr-TR")}</span>
                          </div>
                        </div>
                      </div>

                      <Separator className="my-4" />

                      <div className="flex items-center justify-between">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Detayları Görüntüle
                        </Button>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRejectAccount(account.id)}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reddet
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleApproveAccount(account.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Onayla
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="boosts" className="space-y-6">
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle>Bekleyen Boost Talepleri</CardTitle>
                <CardDescription>Boost taleplerini inceleyin ve onaylayın</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockPendingBoosts.map((boost) => (
                    <div key={boost.id} className="border border-border/50 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-medium">{boost.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            Müşteri: {boost.client} → Booster: {boost.booster}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span>Oyun: {boost.game}</span>
                            <span>
                              {boost.currentRank} → {boost.targetRank}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary">{boost.price}₺</div>
                          <Badge className="bg-blue-500/20 text-blue-700 border-blue-500/30">Bekliyor</Badge>
                        </div>
                      </div>

                      <Separator className="my-4" />

                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                          Oluşturulma: {new Date(boost.createdAt).toLocaleString("tr-TR")}
                        </p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Detayları Görüntüle
                          </Button>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Onayla
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
