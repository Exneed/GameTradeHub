"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import {
  Search,
  Filter,
  Download,
  ArrowUpRight,
  ArrowDownLeft,
  History,
  CalendarIcon,
  ChevronDown,
  Eye,
  FileText,
  CreditCard,
  Banknote,
  Wallet,
  ShoppingCart,
  Zap,
  TrendingUp,
} from "lucide-react"
import { format } from "date-fns"
import { tr } from "date-fns/locale"

// Extended mock transaction data
const mockTransactions = [
  {
    id: 1,
    type: "deposit",
    category: "balance",
    amount: 500,
    description: "Bakiye Yükleme - Kredi Kartı",
    status: "completed",
    date: "2024-01-15T14:30:00",
    method: "credit_card",
    reference: "TXN-001234",
    fee: 14.5,
    relatedItem: null,
  },
  {
    id: 2,
    type: "purchase",
    category: "marketplace",
    amount: -250,
    description: "Valorant Immortal Hesap Satın Alma",
    status: "completed",
    date: "2024-01-14T16:45:00",
    method: "balance",
    reference: "PUR-005678",
    fee: 0,
    relatedItem: "Valorant Immortal 3 Hesap",
    seller: "ProGamer123",
  },
  {
    id: 3,
    type: "deposit",
    category: "balance",
    amount: 1000,
    description: "Bakiye Yükleme - Banka Transferi",
    status: "pending",
    date: "2024-01-13T10:15:00",
    method: "bank_transfer",
    reference: "TXN-001235",
    fee: 0,
    relatedItem: null,
  },
  {
    id: 4,
    type: "withdrawal",
    category: "balance",
    amount: -300,
    description: "Bakiye Çekme - Banka Hesabı",
    status: "completed",
    date: "2024-01-12T09:20:00",
    method: "bank_transfer",
    reference: "WTH-002345",
    fee: 0,
    relatedItem: null,
  },
  {
    id: 5,
    type: "earning",
    category: "marketplace",
    amount: 450,
    description: "CS2 Global Elite Hesap Satışı",
    status: "completed",
    date: "2024-01-11T18:30:00",
    method: "balance",
    reference: "SAL-003456",
    fee: 22.5,
    relatedItem: "CS2 Global Elite Hesap",
    buyer: "CSFan",
  },
  {
    id: 6,
    type: "boost_payment",
    category: "boost",
    amount: -180,
    description: "Valorant Silver → Gold Boost Ödemesi",
    status: "completed",
    date: "2024-01-10T12:00:00",
    method: "balance",
    reference: "BST-004567",
    fee: 0,
    relatedItem: "Valorant Rank Boost",
    booster: "ProBooster",
  },
  {
    id: 7,
    type: "boost_earning",
    category: "boost",
    amount: 320,
    description: "LoL Plat → Diamond Boost Tamamlandı",
    status: "completed",
    date: "2024-01-09T20:15:00",
    method: "balance",
    reference: "BST-004568",
    fee: 16.0,
    relatedItem: "League of Legends Boost",
    client: "LoLPlayer",
  },
  {
    id: 8,
    type: "refund",
    category: "marketplace",
    amount: 150,
    description: "Apex Legends Hesap İadesi",
    status: "completed",
    date: "2024-01-08T14:30:00",
    method: "balance",
    reference: "REF-005679",
    fee: 0,
    relatedItem: "Apex Legends Predator Hesap",
  },
]

const transactionTypes = [
  { value: "all", label: "Tüm İşlemler" },
  { value: "deposit", label: "Para Yükleme" },
  { value: "withdrawal", label: "Para Çekme" },
  { value: "purchase", label: "Satın Alma" },
  { value: "earning", label: "Satış Kazancı" },
  { value: "boost_payment", label: "Boost Ödemesi" },
  { value: "boost_earning", label: "Boost Kazancı" },
  { value: "refund", label: "İade" },
]

const transactionStatuses = [
  { value: "all", label: "Tüm Durumlar" },
  { value: "completed", label: "Tamamlandı" },
  { value: "pending", label: "Bekliyor" },
  { value: "failed", label: "Başarısız" },
  { value: "cancelled", label: "İptal Edildi" },
]

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [dateFrom, setDateFrom] = useState<Date>()
  const [dateTo, setDateTo] = useState<Date>()
  const [showFilters, setShowFilters] = useState(false)

  const filteredTransactions = mockTransactions.filter((transaction) => {
    const matchesSearch =
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.reference.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === "all" || transaction.type === selectedType
    const matchesStatus = selectedStatus === "all" || transaction.status === selectedStatus

    const transactionDate = new Date(transaction.date)
    const matchesDateFrom = !dateFrom || transactionDate >= dateFrom
    const matchesDateTo = !dateTo || transactionDate <= dateTo

    return matchesSearch && matchesType && matchesStatus && matchesDateFrom && matchesDateTo
  })

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <ArrowDownLeft className="h-4 w-4 text-green-500" />
      case "withdrawal":
        return <ArrowUpRight className="h-4 w-4 text-red-500" />
      case "purchase":
        return <ShoppingCart className="h-4 w-4 text-blue-500" />
      case "earning":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "boost_payment":
        return <Zap className="h-4 w-4 text-purple-500" />
      case "boost_earning":
        return <Zap className="h-4 w-4 text-green-500" />
      case "refund":
        return <ArrowDownLeft className="h-4 w-4 text-blue-500" />
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
      case "cancelled":
        return <Badge className="bg-gray-500/20 text-gray-500 border-gray-500/30">İptal</Badge>
      default:
        return <Badge variant="outline">Bilinmiyor</Badge>
    }
  }

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "credit_card":
        return <CreditCard className="h-3 w-3" />
      case "bank_transfer":
        return <Banknote className="h-3 w-3" />
      case "balance":
        return <Wallet className="h-3 w-3" />
      default:
        return <FileText className="h-3 w-3" />
    }
  }

  const totalIncome = filteredTransactions
    .filter((t) => t.amount > 0 && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpense = filteredTransactions
    .filter((t) => t.amount < 0 && t.status === "completed")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0)

  const totalFees = filteredTransactions
    .filter((t) => t.status === "completed")
    .reduce((sum, t) => sum + (t.fee || 0), 0)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                <History className="h-8 w-8 text-primary" />
                İşlem Geçmişi
              </h1>
              <p className="text-muted-foreground">Tüm finansal işlemlerinizi detaylı olarak görüntüleyin</p>
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Rapor İndir
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Toplam Gelir</p>
                  <p className="text-2xl font-bold text-green-500">+{totalIncome.toFixed(2)}₺</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Toplam Gider</p>
                  <p className="text-2xl font-bold text-red-500">-{totalExpense.toFixed(2)}₺</p>
                </div>
                <ArrowUpRight className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Net Kar/Zarar</p>
                  <p
                    className={`text-2xl font-bold ${(totalIncome - totalExpense) >= 0 ? "text-green-500" : "text-red-500"}`}
                  >
                    {totalIncome - totalExpense >= 0 ? "+" : ""}
                    {(totalIncome - totalExpense).toFixed(2)}₺
                  </p>
                </div>
                <Wallet className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Toplam Ücret</p>
                  <p className="text-2xl font-bold text-orange-500">-{totalFees.toFixed(2)}₺</p>
                </div>
                <FileText className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-card/50 backdrop-blur border-border/50 mb-8">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="İşlem ara (açıklama, referans)..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {transactionTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {transactionStatuses.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
                    <Filter className="h-4 w-4 mr-2" />
                    Tarih Filtresi
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>

              {/* Date Filters */}
              {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border">
                  <div className="space-y-2">
                    <Label>Başlangıç Tarihi</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateFrom ? format(dateFrom, "dd MMM yyyy", { locale: tr }) : "Tarih seçin"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label>Bitiş Tarihi</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateTo ? format(dateTo, "dd MMM yyyy", { locale: tr }) : "Tarih seçin"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex items-end">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setDateFrom(undefined)
                        setDateTo(undefined)
                        setSelectedType("all")
                        setSelectedStatus("all")
                        setSearchQuery("")
                      }}
                    >
                      Filtreleri Temizle
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-4 flex justify-between items-center">
          <p className="text-muted-foreground">{filteredTransactions.length} işlem bulundu</p>
        </div>

        {/* Transactions List */}
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {filteredTransactions.map((transaction) => (
                <div key={transaction.id} className="p-6 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {getTransactionIcon(transaction.type)}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{transaction.description}</h4>
                          {transaction.relatedItem && (
                            <Badge variant="outline" className="text-xs">
                              {transaction.relatedItem}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            {getMethodIcon(transaction.method)}
                            <span>{transaction.reference}</span>
                          </div>
                          <span>{format(new Date(transaction.date), "dd MMM yyyy HH:mm", { locale: tr })}</span>
                          {transaction.seller && <span>Satıcı: {transaction.seller}</span>}
                          {transaction.buyer && <span>Alıcı: {transaction.buyer}</span>}
                          {transaction.booster && <span>Booster: {transaction.booster}</span>}
                          {transaction.client && <span>Müşteri: {transaction.client}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div
                            className={`font-medium text-lg ${transaction.amount > 0 ? "text-green-500" : "text-red-500"}`}
                          >
                            {transaction.amount > 0 ? "+" : ""}
                            {transaction.amount.toFixed(2)}₺
                          </div>
                          {transaction.fee && transaction.fee > 0 && (
                            <div className="text-xs text-muted-foreground">Ücret: -{transaction.fee.toFixed(2)}₺</div>
                          )}
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          {getStatusBadge(transaction.status)}
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                            <Eye className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Daha Fazla Yükle
          </Button>
        </div>
      </div>
    </div>
  )
}
