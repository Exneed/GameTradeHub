"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, Wallet, Shield, Lock, CheckCircle, AlertTriangle, ArrowLeft, Calendar, User } from "lucide-react"

// Mock checkout data
const mockCheckoutData = {
  item: {
    type: "account", // or "boost"
    title: "Valorant Immortal 3 Hesap - Tüm Ajanlar Açık",
    price: 2500,
    seller: "ProGamer123",
    image: "/valorant-account.png",
  },
  fees: {
    service: 125, // 5% service fee
    payment: 0, // payment processing fee
  },
  userBalance: 1250.75,
}

const paymentMethods = [
  {
    id: "wallet",
    name: "Cüzdan Bakiyesi",
    description: "Mevcut bakiye: 1,250.75₺",
    icon: Wallet,
    available: true,
  },
  {
    id: "credit-card",
    name: "Kredi Kartı",
    description: "Visa, Mastercard, American Express",
    icon: CreditCard,
    available: true,
  },
  {
    id: "bank-transfer",
    name: "Havale/EFT",
    description: "Banka transferi ile ödeme",
    icon: ArrowLeft,
    available: true,
  },
]

export default function CheckoutPage() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("wallet")
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  })
  const [billingAddress, setBillingAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
  })
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const totalAmount = mockCheckoutData.item.price + mockCheckoutData.fees.service + mockCheckoutData.fees.payment
  const canPayWithWallet = mockCheckoutData.userBalance >= totalAmount

  const handlePayment = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsProcessing(false)
    // Redirect to success page
    window.location.href = "/payment/success"
  }

  const renderPaymentForm = () => {
    switch (selectedPaymentMethod) {
      case "wallet":
        return (
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Wallet className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-medium">Cüzdan Bakiyesi</h3>
                  <p className="text-sm text-muted-foreground">Mevcut bakiye: {mockCheckoutData.userBalance}₺</p>
                </div>
              </div>
              {!canPayWithWallet && (
                <Alert className="border-destructive/50 bg-destructive/10">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                  <AlertDescription className="text-destructive">
                    Yetersiz bakiye. Eksik tutar: {(totalAmount - mockCheckoutData.userBalance).toFixed(2)}₺
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        )

      case "credit-card":
        return (
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Kart Numarası</Label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    className="pl-10"
                    value={cardData.number}
                    onChange={(e) => setCardData((prev) => ({ ...prev, number: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Son Kullanma</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      className="pl-10"
                      value={cardData.expiry}
                      onChange={(e) => setCardData((prev) => ({ ...prev, expiry: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="cvv"
                      placeholder="123"
                      className="pl-10"
                      maxLength={4}
                      value={cardData.cvv}
                      onChange={(e) => setCardData((prev) => ({ ...prev, cvv: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardName">Kart Üzerindeki İsim</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="cardName"
                    placeholder="JOHN DOE"
                    className="pl-10"
                    value={cardData.name}
                    onChange={(e) => setCardData((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Fatura Adresi</h4>
                <div className="space-y-2">
                  <Label htmlFor="address">Adres</Label>
                  <Input
                    id="address"
                    placeholder="Tam adresinizi girin"
                    value={billingAddress.address}
                    onChange={(e) => setBillingAddress((prev) => ({ ...prev, address: e.target.value }))}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Şehir</Label>
                    <Select
                      value={billingAddress.city}
                      onValueChange={(value) => setBillingAddress((prev) => ({ ...prev, city: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Şehir seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="istanbul">İstanbul</SelectItem>
                        <SelectItem value="ankara">Ankara</SelectItem>
                        <SelectItem value="izmir">İzmir</SelectItem>
                        <SelectItem value="bursa">Bursa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Posta Kodu</Label>
                    <Input
                      id="postalCode"
                      placeholder="34000"
                      value={billingAddress.postalCode}
                      onChange={(e) => setBillingAddress((prev) => ({ ...prev, postalCode: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case "bank-transfer":
        return (
          <Card>
            <CardContent className="p-6">
              <Alert className="border-blue-500/50 bg-blue-500/10">
                <AlertTriangle className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  Havale/EFT ile ödeme seçtiniz. Ödeme onayı 1-2 saat içinde kontrol edilecektir.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Geri Dön
            </Button>
            <h1 className="text-3xl font-bold mb-2">Ödeme</h1>
            <p className="text-muted-foreground">Satın alma işleminizi güvenli bir şekilde tamamlayın</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Payment Methods */}
              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardHeader>
                  <CardTitle>Ödeme Yöntemi</CardTitle>
                  <CardDescription>Ödeme yapmak için bir yöntem seçin</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <Card
                        key={method.id}
                        className={`cursor-pointer transition-all ${
                          selectedPaymentMethod === method.id ? "border-primary bg-primary/5" : "border-border"
                        } ${!method.available ? "opacity-50 cursor-not-allowed" : ""}`}
                        onClick={() => method.available && setSelectedPaymentMethod(method.id)}
                      >
                        <CardContent className="p-4 flex items-center gap-3">
                          <method.icon className="h-5 w-5" />
                          <div className="flex-1">
                            <div className="font-medium">{method.name}</div>
                            <div className="text-sm text-muted-foreground">{method.description}</div>
                          </div>
                          {selectedPaymentMethod === method.id && <CheckCircle className="h-5 w-5 text-primary" />}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Payment Form */}
              {renderPaymentForm()}

              {/* Terms and Conditions */}
              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="agreeTerms"
                      checked={agreeTerms}
                      onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                    />
                    <Label htmlFor="agreeTerms" className="text-sm leading-5">
                      Satın alma şartlarını, gizlilik politikasını ve iade koşullarını okudum ve kabul ediyorum. Dijital
                      ürün satın aldığımı ve iade hakkımın bulunmadığını anlıyorum.
                    </Label>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Button */}
              <Button
                size="lg"
                className="w-full text-lg h-14"
                onClick={handlePayment}
                disabled={
                  isProcessing ||
                  !agreeTerms ||
                  (selectedPaymentMethod === "wallet" && !canPayWithWallet) ||
                  (selectedPaymentMethod === "credit-card" &&
                    (!cardData.number || !cardData.expiry || !cardData.cvv || !cardData.name))
                }
              >
                {isProcessing ? (
                  "Ödeme İşleniyor..."
                ) : (
                  <>
                    <Lock className="h-5 w-5 mr-2" />
                    {totalAmount.toFixed(2)}₺ Öde
                  </>
                )}
              </Button>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card className="bg-card/50 backdrop-blur border-border/50 sticky top-4">
                <CardHeader>
                  <CardTitle>Sipariş Özeti</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3">
                    <img
                      src={mockCheckoutData.item.image || "/placeholder.svg"}
                      alt={mockCheckoutData.item.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-sm line-clamp-2">{mockCheckoutData.item.title}</h3>
                      <p className="text-xs text-muted-foreground">Satıcı: {mockCheckoutData.item.seller}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Ürün Fiyatı</span>
                      <span className="text-sm">{mockCheckoutData.item.price.toFixed(2)}₺</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Hizmet Bedeli (%5)</span>
                      <span className="text-sm text-muted-foreground">{mockCheckoutData.fees.service.toFixed(2)}₺</span>
                    </div>
                    {mockCheckoutData.fees.payment > 0 && (
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Ödeme İşlem Bedeli</span>
                        <span className="text-sm text-muted-foreground">
                          {mockCheckoutData.fees.payment.toFixed(2)}₺
                        </span>
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="flex justify-between font-semibold">
                    <span>Toplam</span>
                    <span className="text-primary">{totalAmount.toFixed(2)}₺</span>
                  </div>

                  <Alert className="border-accent/50 bg-accent/10">
                    <Shield className="h-4 w-4 text-accent" />
                    <AlertDescription className="text-accent-foreground text-xs">
                      Ödemeniz SSL ile şifrelenir. Alıcı koruması kapsamında güvenli alışveriş yapın.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              {/* Security Features */}
              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="h-5 w-5 text-accent" />
                    Güvenlik Özellikleri
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>256-bit SSL Şifreleme</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>PCI DSS Uyumlu</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Fraud Koruması</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Alıcı Güvencesi</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
