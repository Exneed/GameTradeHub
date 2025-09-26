"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Eye, MessageSquare, Share2 } from "lucide-react"
import Link from "next/link"

export default function SellSuccessPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardHeader className="text-center">
              <div className="h-16 w-16 rounded-2xl bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <CardTitle className="text-2xl text-green-500">İlanınız Başarıyla Oluşturuldu!</CardTitle>
              <CardDescription>İlanınız inceleme sürecine alındı ve onaylandıktan sonra yayınlanacak</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">İlan Durumu:</span>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    İnceleme Bekliyor
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Tahmini Onay Süresi:</span>
                  <span className="text-sm text-muted-foreground">2-24 saat</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">İlan ID:</span>
                  <span className="text-sm font-mono">#GL{Math.floor(Math.random() * 100000)}</span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Sırada Ne Var?</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Eye className="h-3 w-3 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">İnceleme Süreci</p>
                      <p className="text-xs text-muted-foreground">
                        Uzmanlarımız ilanınızı inceleyecek ve uygunluğunu kontrol edecek
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="h-3 w-3 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Yayınlanma</p>
                      <p className="text-xs text-muted-foreground">
                        Onaylandıktan sonra ilanınız marketplace'te görünür olacak
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MessageSquare className="h-3 w-3 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Alıcı İletişimi</p>
                      <p className="text-xs text-muted-foreground">
                        İlgilenen alıcılardan mesaj almaya başlayacaksınız
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                <h4 className="font-medium text-accent mb-2">💡 Satış İpuçları</h4>
                <ul className="text-sm text-accent-foreground space-y-1">
                  <li>• Mesajlara hızlı yanıt verin</li>
                  <li>• Hesap bilgilerini güvenli bir şekilde paylaşın</li>
                  <li>• Ödeme alındıktan sonra hesap bilgilerini teslim edin</li>
                  <li>• Alıcı ile saygılı iletişim kurun</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild className="flex-1">
                  <Link href="/profile/listings">İlanlarımı Görüntüle</Link>
                </Button>
                <Button variant="outline" asChild className="flex-1 bg-transparent">
                  <Link href="/sell">Yeni İlan Oluştur</Link>
                </Button>
              </div>

              <div className="text-center">
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <Share2 className="h-4 w-4 mr-2" />
                  İlanı Paylaş
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
