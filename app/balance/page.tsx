"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Wallet,
  Plus,
  Minus,
  CreditCard,
  Banknote,
  Shield,
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  History,
  AlertCircle,
  TrendingUp,
  Eye,
  EyeOff,
} from "lucide-react"

// Mock transaction data
const mockTransactions = [
  {
    id: 1,
    type: "deposit",
    amount: 500,
    description: "Bakiye Yükleme - Kredi Kartı",
    status: "completed",
    date: "2024-01-15 14:30",
    method: "credit_card",
    reference: "TXN-001234",
  },
  {
    id: 2,
    type: "purchase",
    amount: -250,
    description: "Valorant Immortal Hesap Satın Alma",
    status: "completed",
    date: "2024-01-14 16:45",
    method: "balance",
    reference: "PUR-005678",
  },
  {
    id: 3,
    type: "deposit",
    amount: 1000,
    description: "Bakiye Yükleme - Banka Transferi",
    status: "pending",
    date: "2024-01-13 10:15",
    method: "bank_transfer",
    reference: "TXN-001235",
  },
  {
    id: 4,
    type: "withdrawal",
    amount: -300,
    description: "Bakiye Çekme - Banka Hesabı",
    status: "completed",
    date: "2024-01-12 09:20",
    method: "bank_transfer",
    reference: "WTH-002345",
  },
  {
    id: 5,
    type: "earning",
    amount: 450,
    description: "CS2 Hesap Satışı Kazancı",
    status: "completed",
    date: "2024-01-11 18:30",
    method: "balance",
    reference: "SAL-003456",
  },
]

const paymentMethods = [
  { id: "credit_card", name: "Kredi Kartı", icon: CreditCard, fee: "2.9%" },
  { id: "bank_transfer", name: "Banka Transferi", icon: Banknote, fee: "Ücretsiz" },
]

export default function BalancePage() {
  const [balance, setBalance] = useState(1250.75)
  const [showBalance, setShowBalance] = useState(true)
  const [depositAmount, setDepositAmount] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("credit_card")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleDeposit = async () => {
    if (!depositAmount || Number.parseFloat(depositAmount) <= 0) return

    setIsProcessing(true)
    // Simulate API call
    setTimeout(() => {
      setBalance((prev) => prev + Number.parseFloat(depositAmount))
      setDepositAmount("")
      setIsProcessing(false)
    }, 2000)
  }

  const handleWithdraw = async () => {
    if (!withdrawAmount || Number.parseFloat(withdrawAmount) <= 0 || Number.parseFloat(withdrawAmount) > balance) return

    setIsProcessing(true)
    // Simulate API call
    setTimeout(() => {
      setBalance((prev) => prev - Number.parseFloat(withdrawAmount))
      setWithdrawAmount("")
      setIsProcessing(false)
    }, 2000)
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <ArrowDownLeft className="h-4 w-4 text-green-500" />
      case "withdrawal":
        return <ArrowUpRight className="h-4 w-4 text-red-500" />
      case "purchase":
        return <ArrowUpRight className="h-4 w-4 text-blue-500" />
      case "earning":
        return <ArrowDownLeft className="h-4 w-4 text-green-500" />
      default:
        return <History className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Tamamlandı</Badge>
      case "pending":
        return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">Bekliyor</Badge>
      case "failed":
        return <Badge className="bg-red-500/20 text-red-500 border-red-500/30">Başarısız</Badge>
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
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Wallet className="h-8 w-8 text-primary" />
            Bakiye Yönetimi
          </h1>
          <p className="text-muted-foreground">Bakiyenizi yönetin, para yükleyin ve çekin</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Balance Overview */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-gradient-to-br from-primary/20 to-accent/20 border-primary/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Wallet className="h-5 w-5 text-primary" />
                    <span className="font-medium">Mevcut Bakiye</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowBalance(!showBalance)}
                    className="h-8 w-8 p-0"
                  >
                    {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <div className="text-3xl font-bold text-primary mb-2">
                  {showBalance ? `${balance.toFixed(2)} ₺` : "••••••"}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <TrendingUp className="h-3 w-3" />
                  <span>Son 30 günde +15.2%</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-500">+2,450₺</div>
                  <div className="text-sm text-muted-foreground">Bu Ay Gelir</div>
                </CardContent>
              </Card>
              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-500">-1,200₺</div>
                  <div className="text-sm text-muted-foreground">Bu Ay Gider</div>
                </CardContent>
              </Card>
            </div>

            {/* Security Notice */}
            <Alert className="border-accent/50 bg-accent/10">
              <Shield className="h-4 w-4 text-accent" />
              <AlertDescription className="text-accent-foreground">
                Tüm işlemleriniz SSL şifreleme ile korunmaktadır. Bakiyeniz güvende.
              </AlertDescription>
            </Alert>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="deposit" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="deposit">Para Yükle</TabsTrigger>
                <TabsTrigger value="withdraw">Para Çek</TabsTrigger>
                <TabsTrigger value="history">İşlem Geçmişi</TabsTrigger>
              </TabsList>

              {/* Deposit Tab */}
              <TabsContent value="deposit" className="space-y-6">
                <Card className="bg-card/50 backdrop-blur border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plus className="h-5 w-5 text-green-500" />
                      Bakiye Yükle
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="deposit-amount">Yüklenecek Miktar</Label>
                      <div className="relative">
                        <Input
                          id="deposit-amount"
                          type="number"
                          placeholder="0.00"
                          value={depositAmount}
                          onChange={(e) => setDepositAmount(e.target.value)}
                          className="pr-8"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                          ₺
                        </span>
                      </div>
                      <div className="flex gap-2 mt-2">
                        {[100, 250, 500, 1000].map((amount) => (
                          <Button
                            key={amount}
                            variant="outline"
                            size="sm"
                            onClick={() => setDepositAmount(amount.toString())}
                          >
                            {amount}₺
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Ödeme Yöntemi</Label>
                      <Select value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {paymentMethods.map((method) => (
                            <SelectItem key={method.id} value={method.id}>
                              <div className="flex items-center gap-2">
                                <method.icon className="h-4 w-4" />
                                <span>{method.name}</span>
                                <Badge variant="outline" className="ml-auto">
                                  {method.fee}
                                </Badge>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {depositAmount && (
                      <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Yüklenecek Miktar:</span>
                          <span>{Number.parseFloat(depositAmount).toFixed(2)}₺</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>İşlem Ücreti:</span>
                          <span>
                            {selectedPaymentMethod === "credit_card"
                              ? `${(Number.parseFloat(depositAmount) * 0.029).toFixed(2)}₺`
                              : "0.00₺"}
                          </span>
                        </div>
                        <div className="flex justify-between font-medium border-t pt-2">
                          <span>Toplam:</span>
                          <span>
                            {selectedPaymentMethod === "credit_card"
                              ? (Number.parseFloat(depositAmount) * 1.029).toFixed(2)
                              : Number.parseFloat(depositAmount).toFixed(2)}
                            ₺
                          </span>
                        </div>
                      </div>
                    )}

                    <Button
                      onClick={handleDeposit}
                      disabled={!depositAmount || Number.parseFloat(depositAmount) <= 0 || isProcessing}
                      className="w-full"
                      size="lg"
                    >
                      {isProcessing ? (
                        <>
                          <Clock className="h-4 w-4 mr-2 animate-spin" />
                          İşleniyor...
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4 mr-2" />
                          Bakiye Yükle
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Withdraw Tab */}
              <TabsContent value="withdraw" className="space-y-6">
                <Card className="bg-card/50 backdrop-blur border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Minus className="h-5 w-5 text-red-500" />
                      Bakiye Çek
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Alert className="border-yellow-500/50 bg-yellow-500/10">
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                      <AlertDescription>
                        Para çekme işlemleri 1-3 iş günü içinde hesabınıza geçer. Minimum çekim tutarı 50₺'dir.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-2">
                      <Label htmlFor="withdraw-amount">Çekilecek Miktar</Label>
                      <div className="relative">
                        <Input
                          id="withdraw-amount"
                          type="number"
                          placeholder="0.00"
                          value={withdrawAmount}
                          onChange={(e) => setWithdrawAmount(e.target.value)}
                          className="pr-8"
                          max={balance}
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                          ₺
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Minimum: 50₺</span>
                        <span>Maksimum: {balance.toFixed(2)}₺</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Çekim Yöntemi</Label>
                      <Select defaultValue="bank_transfer">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bank_transfer">
                            <div className="flex items-center gap-2">
                              <Banknote className="h-4 w-4" />
                              <span>Banka Hesabı</span>
                              <Badge variant="outline" className="ml-auto">
                                Ücretsiz
                              </Badge>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {withdrawAmount && Number.parseFloat(withdrawAmount) >= 50 && (
                      <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Çekilecek Miktar:</span>
                          <span>{Number.parseFloat(withdrawAmount).toFixed(2)}₺</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>İşlem Ücreti:</span>
                          <span>0.00₺</span>
                        </div>
                        <div className="flex justify-between font-medium border-t pt-2">
                          <span>Hesabınıza Geçecek:</span>
                          <span>{Number.parseFloat(withdrawAmount).toFixed(2)}₺</span>
                        </div>
                      </div>
                    )}

                    <Button
                      onClick={handleWithdraw}
                      disabled={
                        !withdrawAmount ||
                        Number.parseFloat(withdrawAmount) < 50 ||
                        Number.parseFloat(withdrawAmount) > balance ||
                        isProcessing
                      }
                      className="w-full"
                      size="lg"
                      variant="destructive"
                    >
                      {isProcessing ? (
                        <>
                          <Clock className="h-4 w-4 mr-2 animate-spin" />
                          İşleniyor...
                        </>
                      ) : (
                        <>
                          <Minus className="h-4 w-4 mr-2" />
                          Para Çek
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Transaction History Tab */}
              <TabsContent value="history" className="space-y-6">
                <Card className="bg-card/50 backdrop-blur border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <History className="h-5 w-5" />
                      İşlem Geçmişi
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockTransactions.map((transaction) => (
                        <div
                          key={transaction.id}
                          className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            {getTransactionIcon(transaction.type)}
                            <div>
                              <div className="font-medium text-sm">{transaction.description}</div>
                              <div className="text-xs text-muted-foreground">
                                {transaction.date} • {transaction.reference}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div
                              className={`font-medium ${transaction.amount > 0 ? "text-green-500" : "text-red-500"}`}
                            >
                              {transaction.amount > 0 ? "+" : ""}
                              {transaction.amount.toFixed(2)}₺
                            </div>
                            <div className="flex items-center gap-2">{getStatusBadge(transaction.status)}</div>
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
