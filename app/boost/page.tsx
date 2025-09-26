"use client"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, Star, Shield, Zap, Clock, Trophy, Target, TrendingUp, ChevronDown, Plus } from "lucide-react"
import Link from "next/link"
import { useFilters } from "@/hooks/use-filters"

// Mock data for boost requests
const mockBoostRequests = [
  {
    id: 1,
    title: "Valorant Silver 2 → Gold 1 Boost",
    game: "Valorant",
    currentRank: "Silver 2",
    targetRank: "Gold 1",
    budget: 450,
    deadline: "3 gün",
    client: "GameLover23",
    clientRating: 4.8,
    description: "Hızlı ve güvenli boost arıyorum. Duo queue tercih ederim.",
    requirements: ["Duo Queue", "Türkçe İletişim", "Akşam Saatleri"],
    offers: 12,
    status: "active",
    createdAt: "2024-01-15",
    isUrgent: true,
  },
  {
    id: 2,
    title: "League of Legends Plat 4 → Diamond 4",
    game: "League of Legends",
    currentRank: "Platinum 4",
    targetRank: "Diamond 4",
    budget: 800,
    deadline: "1 hafta",
    client: "LoLPlayer",
    clientRating: 4.9,
    description: "Sezon sonu için diamond'a çıkmam gerekiyor. Deneyimli booster arıyorum.",
    requirements: ["Solo Queue", "Gece Saatleri", "Hızlı Tamamlama"],
    offers: 8,
    status: "active",
    createdAt: "2024-01-14",
    isUrgent: false,
  },
  {
    id: 3,
    title: "CS2 MG1 → LE Rank Boost",
    game: "CS2",
    currentRank: "Master Guardian I",
    targetRank: "Legendary Eagle",
    budget: 600,
    deadline: "5 gün",
    client: "CSFan",
    clientRating: 4.7,
    description: "Competitive maçlarda boost istiyorum. Güvenilir booster tercih ederim.",
    requirements: ["Competitive", "Mikrofon Kullanımı", "Sabır"],
    offers: 15,
    status: "active",
    createdAt: "2024-01-13",
    isUrgent: true,
  },
]

// Mock data for top boosters
const topBoosters = [
  {
    id: 1,
    name: "ProBooster",
    avatar: "/diverse-user-avatars.png",
    rating: 4.9,
    completedJobs: 156,
    specialties: ["Valorant", "CS2"],
    currentRank: "Radiant",
    responseTime: "< 1 saat",
    successRate: 98,
    isOnline: true,
    verified: true,
  },
  {
    id: 2,
    name: "RankMaster",
    avatar: "/diverse-user-avatars.png",
    rating: 4.8,
    completedJobs: 203,
    specialties: ["League of Legends"],
    currentRank: "Challenger",
    responseTime: "< 2 saat",
    successRate: 96,
    isOnline: false,
    verified: true,
  },
  {
    id: 3,
    name: "BoostKing",
    avatar: "/diverse-user-avatars.png",
    rating: 4.9,
    completedJobs: 89,
    specialties: ["Valorant", "Apex Legends"],
    currentRank: "Immortal 3",
    responseTime: "< 30 dk",
    successRate: 99,
    isOnline: true,
    verified: true,
  },
]

const games = ["Tümü", "Valorant", "League of Legends", "CS2", "Apex Legends"]

export default function BoostPage() {
  const {
    filters,
    updateSearchQuery,
    updateGame,
    updateBudgetRange,
    updateSortBy,
    toggleFilters,
    resetFilters,
    filterItems,
    hasActiveFilters,
  } = useFilters(
    {
      selectedGame: "Tümü",
      budgetRange: [0, 1000],
      sortBy: "newest",
    },
    {
      games,
      budgetMax: 1000,
      sortOptions: [
        { value: "newest", label: "En Yeni" },
        { value: "budget-high", label: "Bütçe (Yüksek)" },
        { value: "budget-low", label: "Bütçe (Düşük)" },
        { value: "deadline", label: "Son Tarih" },
      ],
      enableUrlSync: true,
      debounceMs: 300,
    },
  )

  const filteredRequests = filterItems(mockBoostRequests, {
    searchFields: ["title", "game", "client"],
    gameField: "game",
    budgetField: "budget",
    dateField: "createdAt",
  })

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                <Zap className="h-8 w-8 text-primary" />
                Boost Marketplace
              </h1>
              <p className="text-muted-foreground">Profesyonel boosterlardan rank yükseltme hizmeti alın</p>
            </div>
            <Button asChild>
              <Link href="/boost/create">
                <Plus className="h-4 w-4 mr-2" />
                Boost İlanı Ver
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Filters */}
            <div className="space-y-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Boost ilanı ara..."
                    className="pl-10"
                    value={filters.searchQuery}
                    onChange={(e) => updateSearchQuery(e.target.value)}
                    aria-label="Boost ilanı ara"
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={filters.selectedGame} onValueChange={updateGame}>
                    <SelectTrigger className="w-40" aria-label="Oyun seç">
                      <SelectValue placeholder="Oyun" />
                    </SelectTrigger>
                    <SelectContent>
                      {games.map((game) => (
                        <SelectItem key={game} value={game}>
                          {game}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={filters.sortBy} onValueChange={updateSortBy}>
                    <SelectTrigger className="w-40" aria-label="Sıralama seç">
                      <SelectValue placeholder="Sırala" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">En Yeni</SelectItem>
                      <SelectItem value="budget-high">Bütçe (Yüksek)</SelectItem>
                      <SelectItem value="budget-low">Bütçe (Düşük)</SelectItem>
                      <SelectItem value="deadline">Son Tarih</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    onClick={toggleFilters}
                    aria-expanded={filters.showFilters}
                    aria-controls="boost-filters"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filtreler
                    {hasActiveFilters && <div className="ml-1 h-2 w-2 bg-primary rounded-full" />}
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>

              {/* Advanced Filters */}
              {filters.showFilters && (
                <Card className="bg-card/50 backdrop-blur border-border/50" id="boost-filters">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="budget-range">
                          Bütçe Aralığı: {filters.budgetRange![0]}₺ - {filters.budgetRange![1]}₺
                        </Label>
                        <Slider
                          id="budget-range"
                          value={filters.budgetRange!}
                          onValueChange={updateBudgetRange}
                          max={1000}
                          min={0}
                          step={50}
                          className="w-full"
                          aria-label="Bütçe aralığı"
                        />
                      </div>
                      <div className="flex items-end">
                        <Button variant="outline" onClick={resetFilters} disabled={!hasActiveFilters}>
                          Filtreleri Temizle
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Results */}
            <div className="mb-4 flex justify-between items-center">
              <p className="text-muted-foreground" role="status" aria-live="polite">
                {filteredRequests.length} boost ilanı bulundu
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  Güvenli Ödeme
                </Badge>
              </div>
            </div>

            {/* Boost Requests */}
            <div className="space-y-4">
              {filteredRequests.map((request) => (
                <Card
                  key={request.id}
                  className="bg-card/50 backdrop-blur border-border/50 hover:bg-card/70 transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="flex-1 space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-lg font-semibold">{request.title}</h3>
                              {request.isUrgent && (
                                <Badge className="bg-destructive">
                                  <Zap className="h-3 w-3 mr-1" />
                                  ACİL
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Trophy className="h-4 w-4" />
                                {request.currentRank} → {request.targetRank}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {request.deadline}
                              </div>
                              <div className="flex items-center gap-1">
                                <Target className="h-4 w-4" />
                                {request.offers} teklif
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary">{request.budget}₺</div>
                            <div className="text-sm text-muted-foreground">Bütçe</div>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground">{request.description}</p>

                        <div className="flex flex-wrap gap-2">
                          {request.requirements.map((req, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {req}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs">{request.client[0]}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-muted-foreground">{request.client}</span>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              <span className="text-xs">{request.clientRating}</span>
                            </div>
                          </div>
                          <Button size="sm" asChild>
                            <Link href={`/boost/${request.id}`}>Teklif Ver</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Boosters */}
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  En İyi Boosterlar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topBoosters.map((booster) => (
                    <div key={booster.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={booster.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{booster.name[0]}</AvatarFallback>
                        </Avatar>
                        {booster.isOnline && (
                          <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1 mb-1">
                          <span className="font-medium text-sm truncate">{booster.name}</span>
                          {booster.verified && <Shield className="h-3 w-3 text-accent flex-shrink-0" />}
                        </div>
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span className="text-xs">{booster.rating}</span>
                          <span className="text-xs text-muted-foreground">({booster.completedJobs})</span>
                        </div>
                        <div className="text-xs text-muted-foreground">{booster.specialties.join(", ")}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  Tüm Boosterları Gör
                </Button>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Platform İstatistikleri</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Aktif İlanlar</span>
                    <span className="font-medium">247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Kayıtlı Boosterlar</span>
                    <span className="font-medium">1,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Tamamlanan Boost</span>
                    <span className="font-medium">15,678</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Ortalama Puan</span>
                    <span className="font-medium">4.8/5.0</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How it Works */}
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Nasıl Çalışır?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium">1</span>
                    </div>
                    <p className="text-muted-foreground">Boost ilanı oluşturun ve bütçenizi belirleyin</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium">2</span>
                    </div>
                    <p className="text-muted-foreground">Boosterlardan teklifler alın ve en uygununu seçin</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium">3</span>
                    </div>
                    <p className="text-muted-foreground">Güvenli ödeme yapın ve boost sürecini takip edin</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium">4</span>
                    </div>
                    <p className="text-muted-foreground">Hedef ranka ulaştığınızda ödeme boostera aktarılır</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
