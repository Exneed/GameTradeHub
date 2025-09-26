"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, MessageSquare, ShoppingCart, TrendingUp, Shield, AlertCircle } from "lucide-react"
import { useState } from "react"

// Mock notifications data
const mockNotifications = {
  all: [
    {
      id: 1,
      type: "boost_request",
      title: "Yeni Boost Talebi",
      message: "Valorant Immortal 2 → Immortal 3 boost talebi aldınız",
      user: "GameMaster99",
      avatar: "/placeholder.svg?height=40&width=40",
      timestamp: "2 dk önce",
      isRead: false,
      priority: "high",
    },
    {
      id: 2,
      type: "message",
      title: "Yeni Mesaj",
      message: "ProGamer123: Hesap bilgilerini gönderdim",
      user: "ProGamer123",
      avatar: "/placeholder.svg?height=40&width=40",
      timestamp: "5 dk önce",
      isRead: false,
      priority: "medium",
    },
    {
      id: 3,
      type: "sale",
      title: "Hesap Satışı Tamamlandı",
      message: "Valorant hesabınız başarıyla satıldı - 2,500₺",
      user: "Sistem",
      avatar: "/placeholder.svg?height=40&width=40",
      timestamp: "1 saat önce",
      isRead: true,
      priority: "high",
    },
    {
      id: 4,
      type: "boost_completed",
      title: "Boost Tamamlandı",
      message: "CS2 Premier boost işleminiz tamamlandı",
      user: "BoostPro",
      avatar: "/placeholder.svg?height=40&width=40",
      timestamp: "3 saat önce",
      isRead: true,
      priority: "medium",
    },
    {
      id: 5,
      type: "verification",
      title: "Kimlik Doğrulama",
      message: "TC kimlik doğrulamanız onaylandı",
      user: "Sistem",
      avatar: "/placeholder.svg?height=40&width=40",
      timestamp: "1 gün önce",
      isRead: true,
      priority: "low",
    },
  ],
}

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "boost_request":
    case "boost_completed":
      return <TrendingUp className="h-5 w-5 text-blue-500" />
    case "message":
      return <MessageSquare className="h-5 w-5 text-green-500" />
    case "sale":
      return <ShoppingCart className="h-5 w-5 text-purple-500" />
    case "verification":
      return <Shield className="h-5 w-5 text-orange-500" />
    default:
      return <Bell className="h-5 w-5 text-gray-500" />
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-500/20 text-red-700 border-red-500/30"
    case "medium":
      return "bg-yellow-500/20 text-yellow-700 border-yellow-500/30"
    case "low":
      return "bg-green-500/20 text-green-700 border-green-500/30"
    default:
      return "bg-gray-500/20 text-gray-700 border-gray-500/30"
  }
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications.all)
  const [activeTab, setActiveTab] = useState("all")

  const unreadCount = notifications.filter((n) => !n.isRead).length

  const markAsRead = (id: number) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
  }

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notification.isRead
    if (activeTab === "boost") return notification.type.includes("boost")
    if (activeTab === "messages") return notification.type === "message"
    return true
  })

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Bildirimler</h1>
              <p className="text-muted-foreground">
                {unreadCount > 0 ? `${unreadCount} okunmamış bildirim` : "Tüm bildirimler okundu"}
              </p>
            </div>
            {unreadCount > 0 && (
              <Button onClick={markAllAsRead} variant="outline">
                Tümünü Okundu İşaretle
              </Button>
            )}
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Tümü
                {unreadCount > 0 && (
                  <Badge className="bg-primary text-primary-foreground text-xs min-w-[20px] h-5">{unreadCount}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="unread" className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Okunmamış
              </TabsTrigger>
              <TabsTrigger value="boost" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Boost
              </TabsTrigger>
              <TabsTrigger value="messages" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Mesajlar
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              {filteredNotifications.length === 0 ? (
                <Card className="bg-card/50 backdrop-blur border-border/50">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Bildirim Yok</h3>
                    <p className="text-muted-foreground text-center">Bu kategoride henüz bildirim bulunmuyor.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-3">
                  {filteredNotifications.map((notification) => (
                    <Card
                      key={notification.id}
                      className={`bg-card/50 backdrop-blur border-border/50 cursor-pointer transition-all hover:bg-accent/50 ${
                        !notification.isRead ? "border-primary/30 bg-primary/5" : ""
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">{getNotificationIcon(notification.type)}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">{notification.title}</h3>
                                {!notification.isRead && <div className="h-2 w-2 bg-primary rounded-full" />}
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge className={getPriorityColor(notification.priority)}>
                                  {notification.priority === "high"
                                    ? "Yüksek"
                                    : notification.priority === "medium"
                                      ? "Orta"
                                      : "Düşük"}
                                </Badge>
                                <span className="text-xs text-muted-foreground whitespace-nowrap">
                                  {notification.timestamp}
                                </span>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{notification.message}</p>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={notification.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="text-xs">{notification.user[0]}</AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-muted-foreground">{notification.user}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
