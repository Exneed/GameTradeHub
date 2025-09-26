"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  User,
  Shield,
  Bell,
  Wallet,
  Lock,
  Mail,
  Phone,
  Eye,
  EyeOff,
  Save,
  AlertTriangle,
  CreditCard,
  Smartphone,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function SettingsPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Mock user data
  const [userSettings, setUserSettings] = useState({
    firstName: "Ahmet",
    lastName: "Yılmaz",
    email: "ahmet@example.com",
    phone: "+90 555 123 4567",
    tcNumber: "12345678901",
    bio: "Profesyonel gamer ve boost uzmanı",
    notifications: {
      email: true,
      sms: true,
      push: true,
      marketing: false,
    },
    privacy: {
      showProfile: true,
      showStats: true,
      allowMessages: true,
    },
    twoFactor: false,
    tcVerified: true,
  })

  const handleSave = (section: string) => {
    // Mock save functionality
    console.log(`Saving ${section} settings...`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Ayarlar</h1>
          <p className="text-muted-foreground">Hesap bilgilerinizi ve tercihlerinizi yönetin</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
            <TabsTrigger value="profile">Profil</TabsTrigger>
            <TabsTrigger value="security">Güvenlik</TabsTrigger>
            <TabsTrigger value="notifications">Bildirimler</TabsTrigger>
            <TabsTrigger value="privacy">Gizlilik</TabsTrigger>
            <TabsTrigger value="payment">Ödeme</TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profil Bilgileri
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Ad</Label>
                    <Input
                      id="firstName"
                      value={userSettings.firstName}
                      onChange={(e) => setUserSettings({ ...userSettings, firstName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Soyad</Label>
                    <Input
                      id="lastName"
                      value={userSettings.lastName}
                      onChange={(e) => setUserSettings({ ...userSettings, lastName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-posta</Label>
                  <div className="flex gap-2">
                    <Input
                      id="email"
                      type="email"
                      value={userSettings.email}
                      onChange={(e) => setUserSettings({ ...userSettings, email: e.target.value })}
                    />
                    <Button variant="outline">
                      <Mail className="h-4 w-4 mr-2" />
                      Doğrula
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <div className="flex gap-2">
                    <Input
                      id="phone"
                      value={userSettings.phone}
                      onChange={(e) => setUserSettings({ ...userSettings, phone: e.target.value })}
                    />
                    <Button variant="outline">
                      <Phone className="h-4 w-4 mr-2" />
                      Doğrula
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tcNumber">TC Kimlik No</Label>
                  <div className="flex gap-2">
                    <Input id="tcNumber" value={userSettings.tcNumber} disabled className="bg-muted" />
                    {userSettings.tcVerified ? (
                      <Badge className="bg-green-500 text-white">
                        <Shield className="h-3 w-3 mr-1" />
                        Onaylı
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Bekliyor
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Biyografi</Label>
                  <Textarea
                    id="bio"
                    placeholder="Kendinizi tanıtın..."
                    value={userSettings.bio}
                    onChange={(e) => setUserSettings({ ...userSettings, bio: e.target.value })}
                    rows={3}
                  />
                </div>

                <Button onClick={() => handleSave("profile")}>
                  <Save className="h-4 w-4 mr-2" />
                  Profil Bilgilerini Kaydet
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Şifre Değiştir
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Mevcut Şifre</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showCurrentPassword ? "text" : "password"}
                        placeholder="Mevcut şifrenizi girin"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Yeni Şifre</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Yeni şifrenizi girin"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Yeni Şifre Tekrar</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Yeni şifrenizi tekrar girin"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <Button onClick={() => handleSave("password")}>
                    <Save className="h-4 w-4 mr-2" />
                    Şifreyi Güncelle
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    İki Faktörlü Doğrulama
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">2FA Güvenlik</p>
                      <p className="text-sm text-muted-foreground">Hesabınızı ekstra güvenlik katmanı ile koruyun</p>
                    </div>
                    <Switch
                      checked={userSettings.twoFactor}
                      onCheckedChange={(checked) => setUserSettings({ ...userSettings, twoFactor: checked })}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Bildirim Tercihleri
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">E-posta Bildirimleri</p>
                      <p className="text-sm text-muted-foreground">Sipariş ve hesap güncellemeleri</p>
                    </div>
                    <Switch
                      checked={userSettings.notifications.email}
                      onCheckedChange={(checked) =>
                        setUserSettings({
                          ...userSettings,
                          notifications: { ...userSettings.notifications, email: checked },
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">SMS Bildirimleri</p>
                      <p className="text-sm text-muted-foreground">Önemli güvenlik bildirimleri</p>
                    </div>
                    <Switch
                      checked={userSettings.notifications.sms}
                      onCheckedChange={(checked) =>
                        setUserSettings({
                          ...userSettings,
                          notifications: { ...userSettings.notifications, sms: checked },
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Push Bildirimleri</p>
                      <p className="text-sm text-muted-foreground">Anlık mesaj ve güncellemeler</p>
                    </div>
                    <Switch
                      checked={userSettings.notifications.push}
                      onCheckedChange={(checked) =>
                        setUserSettings({
                          ...userSettings,
                          notifications: { ...userSettings.notifications, push: checked },
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Pazarlama E-postaları</p>
                      <p className="text-sm text-muted-foreground">Kampanya ve fırsat bildirimleri</p>
                    </div>
                    <Switch
                      checked={userSettings.notifications.marketing}
                      onCheckedChange={(checked) =>
                        setUserSettings({
                          ...userSettings,
                          notifications: { ...userSettings.notifications, marketing: checked },
                        })
                      }
                    />
                  </div>
                </div>

                <Button onClick={() => handleSave("notifications")}>
                  <Save className="h-4 w-4 mr-2" />
                  Bildirim Ayarlarını Kaydet
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Settings */}
          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Gizlilik Ayarları
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Profil Görünürlüğü</p>
                      <p className="text-sm text-muted-foreground">Profilinizi diğer kullanıcılara göster</p>
                    </div>
                    <Switch
                      checked={userSettings.privacy.showProfile}
                      onCheckedChange={(checked) =>
                        setUserSettings({
                          ...userSettings,
                          privacy: { ...userSettings.privacy, showProfile: checked },
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">İstatistik Paylaşımı</p>
                      <p className="text-sm text-muted-foreground">Başarı istatistiklerinizi göster</p>
                    </div>
                    <Switch
                      checked={userSettings.privacy.showStats}
                      onCheckedChange={(checked) =>
                        setUserSettings({
                          ...userSettings,
                          privacy: { ...userSettings.privacy, showStats: checked },
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Mesaj Alma</p>
                      <p className="text-sm text-muted-foreground">Diğer kullanıcılardan mesaj al</p>
                    </div>
                    <Switch
                      checked={userSettings.privacy.allowMessages}
                      onCheckedChange={(checked) =>
                        setUserSettings({
                          ...userSettings,
                          privacy: { ...userSettings.privacy, allowMessages: checked },
                        })
                      }
                    />
                  </div>
                </div>

                <Button onClick={() => handleSave("privacy")}>
                  <Save className="h-4 w-4 mr-2" />
                  Gizlilik Ayarlarını Kaydet
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Settings */}
          <TabsContent value="payment">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="h-5 w-5" />
                    Ödeme Yöntemleri
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-8 w-8 text-primary" />
                        <div>
                          <p className="font-medium">**** **** **** 1234</p>
                          <p className="text-sm text-muted-foreground">Visa • Son kullanma: 12/26</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Düzenle
                      </Button>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full bg-transparent">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Yeni Kart Ekle
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5" />
                    Mobil Ödeme
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Papara</p>
                        <p className="text-sm text-muted-foreground">Hızlı ve güvenli ödeme</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Bağla
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">İninal</p>
                        <p className="text-sm text-muted-foreground">Prepaid kart ile ödeme</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Bağla
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
