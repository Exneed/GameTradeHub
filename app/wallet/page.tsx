"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import {
  Wallet,
  CreditCard,
  Plus,
  Minus,
  ArrowUpRight,
  ArrowDownLeft,
  Shield,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Download,
  Filter,
} from "lucide-react"

// Mock wallet data
const mockWalletData = {
  balance: 1250.75,
  pendingBalance: 150.0,
  totalEarnings: 3450.25,
  totalSpent: 2199.5,
}

// Mock transaction history
const mockTransactions = [
  {
    id: 1,
    type: "deposit",
    amount: 500,
    description: "Bakiye Yükleme - Kredi Kartı",
    status: "completed",
    date: "2024-01-15T10:30:00Z",
    reference: "TXN-001234",
    method: "Kredi Kartı",
  },
  {
    id: 2,
    type: "purchase",
    amount: -250,
    description: "Valorant Hesap Satın Alma",
    status: "completed",
    date: "2024-01-14T15:45:00Z",
    reference: "TXN-001233",
    method: "Cüzdan Bakiyesi",
  },
  {
    id: 3,
    type: "earning",
    amount: 180,
    description: "Boost Hizmeti Ödemesi",
    status: "pending",
    date: "2024-01-13T09:20:00Z",
    reference: "TXN-001232",
    method: "Boost Komisyonu",
  },
  {
    id: 4,
    type: "withdrawal",
    amount: -300,
    description: "Banka Hesabına Çekim",
    status: "processing",
    date: "2024-01-12T14:15:00Z",
    reference: "TXN-001231",
    method: "Banka Transferi",
  },
  {
    id: 5,
    type: "deposit",
    amount: 200,
    description: "Bakiye Yükleme - Havale/EFT",
    status: "completed",
    date: "2024-01-11T11:00:00Z",
    reference: "TXN-001230",
    method: "Havale/EFT",
  },
]

const paymentMethods = [
  { id: "credit-card", name: "Kredi Kartı", fee: "0%", icon: CreditCard },
  { id: "bank-transfer", name: "Havale/EFT", fee: "0%", icon: ArrowUpRight },
  { id: "mobile-payment", name: "Mobil Ödeme", fee: "2%", icon: Plus },
]

export default function WalletPage() {
  const [depositAmount, setDepositAmount] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("")
  const [transactionFilter, setTransactionFilter] = useState("all")
  const [showDepositForm, setShowDepositForm] = useState(false)
  const [showWithdrawForm, setShowWithdrawForm] = useState(false)

  const getTransactionIcon = (type: string, status: string) => {
    if (status === "pending") return <Clock className="h-4 w-4 text-yellow-500" />
    if (status === "processing") return <Clock className="h-4 w-4 text-blue-500" />
    if (status === "failed") return <XCircle className="h-4 w-4 text-destructive" />

    switch (type) {
      case "deposit":
        return <ArrowDownLeft className="h-4 w-4 text-green-500" />
      case "withdrawal":
        return <ArrowUpRight className="h-4 w-4 text-red-500" />
      case "purchase":
        return <Minus className="h-4 w-4 text-red-500" />
      case "earning":
        return <Plus className="h-4 w-4 text-green-500" />
      default:
        return <CheckCircle className="h-4 w-4 text-accent" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500/20 text-green-700 border-green-500/30">Tamamlandı</Badge>
      case "pending":
        return <Badge className="bg-yellow-500/20 text-yellow-700 border-yellow-500/30">Beklemede</Badge>
      case "processing":
        return <Badge className="bg-blue-500/20 text-blue-700 border-blue-500/30">İşleniyor</Badge>
      case "failed":
        return <Badge className="bg-red-500/20 text-red-700 border-red-500/30">Başarısız</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const filteredTransactions = mockTransactions.filter((transaction) => {
    if (transactionFilter === "all") return true
    return transaction.type === transactionFilter
  })

  const handleDeposit = () => {
    // Handle deposit logic
    console.log("Deposit:", { amount: depositAmount, method: selectedPaymentMethod })
    setShowDepositForm(false)
    setDepositAmount("")
    setSelectedPaymentMethod("")
  }

  const handleWithdraw = () => {
    // Handle withdrawal logic
    console.log("Withdraw:", withdrawAmount)
    setShowWithdrawForm(false)
    setWithdrawAmount("")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Wallet className="h-8 w-8 text-primary" />
            Cüzdan
          </h1>
          <p className="text-muted-foreground">Bakiyenizi yönetin ve işlem geçmişinizi görüntüleyin</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Wallet Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Balance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <CardHeader className="pb-3">
                  <CardDescription className="text-primary/80">Mevcut Bakiye</CardDescription>
                  <CardTitle className="text-3xl text-primary">{mockWalletData.balance.toFixed(2)} ₺</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    Bekleyen: {mockWalletData.pendingBalance.toFixed(2)} ₺
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
                <CardHeader className="pb-3">
                  <CardDescription className="text-accent/80">Toplam Kazanç</CardDescription>
                  <CardTitle className="text-3xl text-accent">{mockWalletData.totalEarnings.toFixed(2)} ₺</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ArrowDownLeft className="h-4 w-4" />
                    Toplam Harcama: {mockWalletData.totalSpent.toFixed(2)} ₺
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                size="lg"
                className="h-16 text-lg"
                onClick={() => setShowDepositForm(true)}
                disabled={showDepositForm}
              >
                <Plus className="h-5 w-5 mr-2" />
                Bakiye Yükle
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-16 text-lg bg-transparent"
                onClick={() => setShowWithdrawForm(true)}
                disabled={showWithdrawForm}
              >
                <ArrowUpRight className="h-5 w-5 mr-2" />
                Para Çek
              </Button>
            </div>

            {/* Deposit Form */}
            {showDepositForm && (
              <Card className="border-primary/50 bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Bakiye Yükleme
                  </CardTitle>
                  <CardDescription>Cüzdanınıza para yükleyin</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="depositAmount">Yüklenecek Tutar (₺)</Label>
                    <Input
                      id="depositAmount"
                      type="number"
                      placeholder="100"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Ödeme Yöntemi</Label>
                    <div className="grid grid-cols-1 gap-3">
                      {paymentMethods.map((method) => (
                        <Card
                          key={method.id}
                          className={`cursor-pointer transition-all ${
                            selectedPaymentMethod === method.id ? "border-primary bg-primary/5" : "border-border"
                          }`}
                          onClick={() => setSelectedPaymentMethod(method.id)}
                        >
                          <CardContent className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <method.icon className="h-5 w-5" />
                              <span className="font-medium">{method.name}</span>
                            </div>
                            <Badge variant="outline">Komisyon: {method.fee}</Badge>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <Alert className="border-accent/50 bg-accent/10">
                    <Shield className="h-4 w-4 text-accent" />
                    <AlertDescription className="text-accent-foreground">
                      Tüm ödemeler SSL ile şifrelenir ve güvenli bir şekilde işlenir.
                    </AlertDescription>
                  </Alert>

                  <div className="flex gap-2">
                    <Button onClick={handleDeposit} disabled={!depositAmount || !selectedPaymentMethod}>
                      Ödemeyi Tamamla
                    </Button>
                    <Button variant="outline" onClick={() => setShowDepositForm(false)}>
                      İptal
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Withdraw Form */}
            {showWithdrawForm && (
              <Card className="border-destructive/50 bg-destructive/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ArrowUpRight className="h-5 w-5" />
                    Para Çekme
                  </CardTitle>
                  <CardDescription>Bakiyenizi banka hesabınıza çekin</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="withdrawAmount">Çekilecek Tutar (₺)</Label>
                    <Input
                      id="withdrawAmount"
                      type="number"
                      placeholder="100"
                      max={mockWalletData.balance}
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">Maksimum: {mockWalletData.balance.toFixed(2)} ₺</p>
                  </div>

                  <Alert className="border-yellow-500/50 bg-yellow-500/10">
                    <Clock className="h-4 w-4 text-yellow-600" />
                    <AlertDescription className="text-yellow-800">
                      Para çekme işlemleri 1-3 iş günü içinde hesabınıza geçer. Minimum çekim tutarı 50₺'dir.
                    </AlertDescription>
                  </Alert>

                  <div className="flex gap-2">
                    <Button
                      onClick={handleWithdraw}
                      disabled={!withdrawAmount || Number.parseFloat(withdrawAmount) < 50}
                      variant="destructive"
                    >
                      Çekimi Onayla
                    </Button>
                    <Button variant="outline" onClick={() => setShowWithdrawForm(false)}>
                      İptal
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Transaction History */}
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>İşlem Geçmişi</CardTitle>
                  <div className="flex items-center gap-2">
                    <Select value={transactionFilter} onValueChange={setTransactionFilter}>
                      <SelectTrigger className="w-40">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tümü</SelectItem>
                        <SelectItem value="deposit">Yükleme</SelectItem>
                        <SelectItem value="withdrawal">Çekim</SelectItem>
                        <SelectItem value="purchase">Alışveriş</SelectItem>
                        <SelectItem value="earning">Kazanç</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Dışa Aktar
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredTransactions.map((transaction, index) => (
                    <div key={transaction.id}>
                      <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center">
                            {getTransactionIcon(transaction.type, transaction.status)}
                          </div>
                          <div>
                            <div className="font-medium">{transaction.description}</div>
                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                              <span>{new Date(transaction.date).toLocaleDateString("tr-TR")}</span>
                              <span>•</span>
                              <span>{transaction.method}</span>
                              <span>•</span>
                              <span>{transaction.reference}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className={`text-lg font-semibold ${
                              transaction.amount > 0 ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {transaction.amount > 0 ? "+" : ""}
                            {transaction.amount.toFixed(2)} ₺
                          </div>
                          {getStatusBadge(transaction.status)}
                        </div>
                      </div>
                      {index < filteredTransactions.length - 1 && <Separator className="my-2" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Bu Ay</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Toplam Yükleme</span>
                    <span className="font-medium text-green-600">+700₺</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Toplam Harcama</span>
                    <span className="font-medium text-red-600">-250₺</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Net Kazanç</span>
                    <span className="font-medium text-accent">+180₺</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Net Değişim</span>
                    <span className="font-bold text-primary">+630₺</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Kayıtlı Kartlar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <div className="font-medium">**** **** **** 1234</div>
                      <div className="text-xs text-muted-foreground">Visa • Son kullanma: 12/26</div>
                    </div>
                    <Badge variant="secondary">Varsayılan</Badge>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Plus className="h-4 w-4 mr-2" />
                    Yeni Kart Ekle
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Security Info */}
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-accent" />
                  Güvenlik
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>SSL Şifreleme Aktif</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>2FA Koruması</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>PCI DSS Uyumlu</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Fraud Koruması</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Yardım</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Eye className="h-4 w-4 mr-2" />
                    İşlem Detayları
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Fatura İndir
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Shield className="h-4 w-4 mr-2" />
                    Güvenlik Ayarları
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
