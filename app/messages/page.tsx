"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Send, MoreVertical, Shield, Star } from "lucide-react"
import { useState } from "react"

// Mock conversations data
const mockConversations = [
  {
    id: 1,
    user: {
      name: "ProGamer123",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: true,
      rating: 4.9,
      status: "online",
    },
    lastMessage: "Hesap bilgilerini gönderdim, kontrol edebilir misin?",
    timestamp: "2 dk önce",
    unread: 2,
    type: "account_sale",
  },
  {
    id: 2,
    user: {
      name: "BoostMaster",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: true,
      rating: 4.8,
      status: "online",
    },
    lastMessage: "Boost işlemi için hazırım, ne zaman başlayalım?",
    timestamp: "5 dk önce",
    unread: 0,
    type: "boost_service",
  },
  {
    id: 3,
    user: {
      name: "GameSeller",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: false,
      rating: 4.2,
      status: "offline",
    },
    lastMessage: "Fiyat konusunda anlaşabilir miyiz?",
    timestamp: "1 saat önce",
    unread: 1,
    type: "account_sale",
  },
]

// Mock messages for active conversation
const mockMessages = [
  {
    id: 1,
    sender: "ProGamer123",
    content: "Merhaba! Valorant hesabı hakkında bilgi almak istiyorum.",
    timestamp: "14:30",
    isOwn: false,
  },
  {
    id: 2,
    sender: "Sen",
    content: "Tabii ki! Hangi detayları öğrenmek istiyorsunız?",
    timestamp: "14:32",
    isOwn: true,
  },
  {
    id: 3,
    sender: "ProGamer123",
    content: "Hesapta hangi skinler var ve rank geçmişi nasıl?",
    timestamp: "14:33",
    isOwn: false,
  },
  {
    id: 4,
    sender: "Sen",
    content:
      "Hesapta 15+ premium skin var, Reaver ve Prime koleksiyonları dahil. Rank geçmişi çok stabil, son 3 act Immortal 3.",
    timestamp: "14:35",
    isOwn: true,
  },
  {
    id: 5,
    sender: "ProGamer123",
    content: "Hesap bilgilerini gönderdim, kontrol edebilir misin?",
    timestamp: "14:38",
    isOwn: false,
  },
]

export default function MessagesPage() {
  const [activeConversation, setActiveConversation] = useState(mockConversations[0])
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredConversations = mockConversations.filter((conv) =>
    conv.user.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Here you would send the message to your backend
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <Card className="h-full bg-card/50 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle>Mesajlar</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Konuşma ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => setActiveConversation(conversation)}
                      className={`p-4 cursor-pointer transition-colors hover:bg-accent/50 ${
                        activeConversation.id === conversation.id ? "bg-accent/50" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={conversation.user.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{conversation.user.name[0]}</AvatarFallback>
                          </Avatar>
                          {conversation.user.status === "online" && (
                            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium truncate">{conversation.user.name}</span>
                            {conversation.user.isVerified && <Shield className="h-3 w-3 text-blue-500" />}
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              <span className="text-xs text-muted-foreground">{conversation.user.rating}</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground truncate mb-1">{conversation.lastMessage}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {conversation.type === "account_sale" ? "Hesap" : "Boost"}
                              </Badge>
                              {conversation.unread > 0 && (
                                <Badge className="bg-primary text-primary-foreground text-xs min-w-[20px] h-5 flex items-center justify-center">
                                  {conversation.unread}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            <Card className="h-full bg-card/50 backdrop-blur border-border/50 flex flex-col">
              {/* Chat Header */}
              <CardHeader className="flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={activeConversation.user.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{activeConversation.user.name[0]}</AvatarFallback>
                      </Avatar>
                      {activeConversation.user.status === "online" && (
                        <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{activeConversation.user.name}</span>
                        {activeConversation.user.isVerified && <Shield className="h-4 w-4 text-blue-500" />}
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm text-muted-foreground">{activeConversation.user.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {activeConversation.user.status === "online" ? "Çevrimiçi" : "Çevrimdışı"}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <Separator />

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {mockMessages.map((message) => (
                    <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[70%] rounded-lg px-4 py-2 ${
                          message.isOwn ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.isOwn ? "text-primary-foreground/70" : "text-muted-foreground"
                          }`}
                        >
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>

              <Separator />

              {/* Message Input */}
              <div className="p-4 flex-shrink-0">
                <div className="flex gap-2">
                  <Input
                    placeholder="Mesajınızı yazın..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Güvenliğiniz için kişisel bilgilerinizi paylaşmayın
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
