import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle } from "lucide-react"

// Mock successful payment data
const mockPaymentData = {
  transactionId: "TXN-001235",
  amount: 2625,
  item: {
    title: "Valorant Immortal 3 Hesap - Tüm Ajanlar Açık",
    seller: "ProGamer123",
    image: "/valorant-account.png",
  },
  paymentMethod: "Cüzdan Bakiyesi",
  date: new Date().toISOString(),
}

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="h-20 w-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Ödeme Başarılı!</h1>
            <p className="text-muted-foreground">Satın alma işleminiz başarıyla tamamlandı</p>
          </div>

          <div className="space-y-6">
            {/* Transaction Details */}
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>İşlem Detayları</span>
                  <Badge className="bg-green-500/20 text-green-700 border-green-500/30">Tamamlandı</Badge>
                </CardTitle>
                <CardDescription>İşlem ID: {mockPaymentData.transactionId}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <img
                    src={mockPaymentData.item.image || "/placeholder.svg"}
                    alt={mockPaymentData.item.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{mockPaymentData.item.title}</h3>
                    <p className="text-sm text-muted-foreground">Satıcı: {mockPaymentData.item.seller}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">{mockPaymentData.amount}₺</div>
                    <div className="text-xs text-muted-foreground">{mockPaymentData.paymentMethod}</div>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">İşlem Tarihi:</span>
                    <div className="font-medium">{new Date(mockPaymentData.date).toLocaleString("tr-TR")}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Durum:</span>
                    <div className="font-medium text-green-600">Başarılı</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle>Sonraki Adımlar</CardTitle>
                <CardDescription>Satın alma işleminiz tamamlandı, şimdi ne yapmalısınız?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium">1</span>
                    </div>
                    <div>
                      <div className="font-medium">Satıcıyla İletişime Geçin</div>
                      <p className="text-sm text-muted-foreground">
                        Hesap bilgilerini almak için satıcıyla mesajlaşma sistemimiz üzerinden iletişime geçin.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium">2</span>
                    </div>
                    <div>
                      <div className="font-medium">Hesap Bilgilerini Kontrol Edin</div>
                      <p className="text-sm text-muted-foreground">
                        Teslim aldığınız hesap bilgilerinin açıklamada belirtildiği gibi olduğunu kontrol edin.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium">3</span>
                    </div>
                    <div>
                      <div className="font-medium">Değerlendirme Yapın</div>
                      <p className="text-sm text-muted-foreground">
                        İşlem tamamlandıktan sonra satıcıyı değerlendirmeyi unutmayın.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle>Destek</CardTitle>
                <CardDescription>Herhangi bir sorun yaşıyorsanız bizimle iletişime geçin</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <button className="flex-1 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-lg px-4 py-2 text-sm font-medium transition-colors">
                    Canlı Destek
                  </button>
                  <button className="flex-1 bg-card hover:bg-accent border border-border rounded-lg px-4 py-2 text-sm font-medium transition-colors">
                    Ticket Oluştur
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
