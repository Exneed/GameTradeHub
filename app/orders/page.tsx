"use client"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Package, Clock, CheckCircle, XCircle, MessageCircle, Eye, Calendar, Gamepad2, Zap } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFilters } from "@/hooks/use-filters"

// Mock data for orders
const mockOrders = [
  {
    id: "ORD-001",
    type: "account",
    game: "Valorant",
    title: "Immortal 3 Hesap - Full Skin",
    price: 850.0,
    status: "completed",
    date: "2024-01-15",
    seller: "ProGamer123",
    image: "/valorant-agents.png",
  },
  {
    id: "ORD-002",
    type: "boost",
    game: "League of Legends",
    title: "Gold'dan Platinum'a Boost",
    price: 250.0,
    status: "in-progress",
    date: "2024-01-20",
    seller: "BoostMaster",
    image: "/league-of-legends.jpg",
  },
  {
    id: "ORD-003",
    type: "account",
    game: "CS2",
    title: "Global Elite Hesap",
    price: 1200.0,
    status: "pending",
    date: "2024-01-22",
    seller: "CSProSeller",
    image: "/counter-strike.jpg",
  },
  {
    id: "ORD-004",
    type: "boost",
    game: "Valorant",
    title: "Diamond'dan Immortal'a",
    price: 400.0,
    status: "cancelled",
    date: "2024-01-18",
    seller: "ValorantPro",
    image: "/valorant-boost.jpg",
  },
]

const statusConfig = {
  pending: { label: "Bekliyor", color: "bg-yellow-500", icon: Clock },
  "in-progress": { label: "Devam Ediyor", color: "bg-blue-500", icon: Package },
  completed: { label: "Tamamlandı", color: "bg-green-500", icon: CheckCircle },
  cancelled: { label: "İptal Edildi", color: "bg-red-500", icon: XCircle },
}

export default function OrdersPage() {
  const { filters, updateSearchQuery, updateStatusFilter, updateTypeFilter, filterItems, hasActiveFilters } =
    useFilters(
      {
        statusFilter: "all",
        typeFilter: "all",
      },
      {
        debounceMs: 300,
      },
    )

  const filteredOrders = filterItems(mockOrders, {
    searchFields: ["title", "game"],
    statusField: "status",
    typeField: "type",
  })

  const getStatusBadge = (status: string) => {
    const config = statusConfig[status as keyof typeof statusConfig]
    const Icon = config.icon

    return (
      <Badge className={`${config.color} text-white flex items-center gap-1`}>
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Siparişlerim</h1>
          <p className="text-muted-foreground">Tüm hesap alımları ve boost hizmetlerinizi takip edin</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Sipariş ara..."
                    value={filters.searchQuery}
                    onChange={(e) => updateSearchQuery(e.target.value)}
                    className="pl-10"
                    aria-label="Sipariş ara"
                  />
                </div>
              </div>

              <Select value={filters.statusFilter || "all"} onValueChange={updateStatusFilter}>
                <SelectTrigger className="w-full md:w-48" aria-label="Durum filtrele">
                  <SelectValue placeholder="Durum Filtrele" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Durumlar</SelectItem>
                  <SelectItem value="pending">Bekliyor</SelectItem>
                  <SelectItem value="in-progress">Devam Ediyor</SelectItem>
                  <SelectItem value="completed">Tamamlandı</SelectItem>
                  <SelectItem value="cancelled">İptal Edildi</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.typeFilter || "all"} onValueChange={updateTypeFilter}>
                <SelectTrigger className="w-full md:w-48" aria-label="Tür filtrele">
                  <SelectValue placeholder="Tür Filtrele" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Türler</SelectItem>
                  <SelectItem value="account">Hesap Alımı</SelectItem>
                  <SelectItem value="boost">Boost Hizmeti</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Sipariş Bulunamadı</h3>
                <p className="text-muted-foreground">Arama kriterlerinize uygun sipariş bulunmuyor.</p>
              </CardContent>
            </Card>
          ) : (
            <div role="list" aria-label="Siparişler">
              {filteredOrders.map((order) => (
                <Card key={order.id} className="hover:shadow-md transition-shadow" role="listitem">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      {/* Order Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={order.image || "/placeholder.svg"}
                          alt={order.game}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      </div>

                      {/* Order Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              {order.type === "account" ? (
                                <Gamepad2 className="h-4 w-4 text-primary" />
                              ) : (
                                <Zap className="h-4 w-4 text-accent" />
                              )}
                              <span className="text-sm text-muted-foreground">
                                {order.type === "account" ? "Hesap Alımı" : "Boost Hizmeti"}
                              </span>
                            </div>
                            <h3 className="font-semibold text-lg">{order.title}</h3>
                            <p className="text-sm text-muted-foreground">{order.game}</p>
                          </div>
                          {getStatusBadge(order.status)}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(order.date).toLocaleDateString("tr-TR")}
                            </div>
                            <span>Satıcı: {order.seller}</span>
                            <span>#{order.id}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold">{order.price.toFixed(2)} ₺</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2 md:flex-row md:items-center">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Detaylar
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Mesaj
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Order Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{mockOrders.length}</div>
              <div className="text-sm text-muted-foreground">Toplam Sipariş</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-500">
                {mockOrders.filter((o) => o.status === "completed").length}
              </div>
              <div className="text-sm text-muted-foreground">Tamamlanan</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-500">
                {mockOrders.filter((o) => o.status === "in-progress").length}
              </div>
              <div className="text-sm text-muted-foreground">Devam Eden</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-500">
                {mockOrders.filter((o) => o.status === "pending").length}
              </div>
              <div className="text-sm text-muted-foreground">Bekleyen</div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
