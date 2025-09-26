"use client"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Search,
  Filter,
  Star,
  Shield,
  Eye,
  Heart,
  GamepadIcon,
  Trophy,
  Zap,
  Clock,
  User,
  ChevronDown,
} from "lucide-react"
import Link from "next/link"
import { useFilters } from "@/hooks/use-filters"

// Mock data for accounts
const mockAccounts = [
  {
    id: 1,
    title: "Valorant Immortal 3 Hesap",
    game: "Valorant",
    rank: "Immortal 3",
    level: 156,
    price: 2500,
    originalPrice: 3000,
    seller: "ProGamer123",
    sellerRating: 4.9,
    sellerVerified: true,
    images: ["/valorant-account.png"],
    features: ["Tüm Ajanlar Açık", "Rare Skinler", "Battle Pass Tamamlanmış"],
    views: 234,
    likes: 45,
    timeLeft: "2 gün",
    isHot: true,
  },
  {
    id: 2,
    title: "League of Legends Challenger Hesap",
    game: "League of Legends",
    rank: "Challenger",
    level: 234,
    price: 4500,
    seller: "LoLMaster",
    sellerRating: 4.8,
    sellerVerified: true,
    images: ["/generic-online-account.png"],
    features: ["Tüm Şampiyonlar", "Prestige Skinler", "Honor Level 5"],
    views: 456,
    likes: 89,
    timeLeft: "5 gün",
    isHot: false,
  },
  {
    id: 3,
    title: "CS2 Global Elite Hesap",
    game: "CS2",
    rank: "Global Elite",
    level: 89,
    price: 1800,
    originalPrice: 2200,
    seller: "CSPro",
    sellerRating: 4.7,
    sellerVerified: true,
    images: ["/cs2-account.jpg"],
    features: ["Prime Status", "Rare Knife", "Service Medal"],
    views: 189,
    likes: 32,
    timeLeft: "1 gün",
    isHot: true,
  },
  {
    id: 4,
    title: "Apex Legends Predator Hesap",
    game: "Apex Legends",
    rank: "Predator",
    level: 178,
    price: 3200,
    seller: "ApexKing",
    sellerRating: 4.9,
    sellerVerified: false,
    images: ["/apex-legends-account.jpg"],
    features: ["Tüm Karakterler", "Heirloom Setleri", "Battle Pass"],
    views: 312,
    likes: 67,
    timeLeft: "3 gün",
    isHot: false,
  },
]

const games = ["Tümü", "Valorant", "League of Legends", "CS2", "Apex Legends", "Fortnite", "PUBG"]
const ranks = ["Tümü", "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Immortal", "Radiant", "Challenger"]

export default function MarketplacePage() {
  const {
    filters,
    updateSearchQuery,
    updateGame,
    updateRank,
    updatePriceRange,
    updateSortBy,
    toggleFilters,
    resetFilters,
    filterItems,
    hasActiveFilters,
    options,
  } = useFilters(
    {
      selectedGame: "Tümü",
      selectedRank: "Tümü",
      priceRange: [0, 5000],
      sortBy: "newest",
    },
    {
      games,
      ranks,
      priceMax: 5000,
      enableUrlSync: true,
      debounceMs: 300,
    },
  )

  const filteredAccounts = filterItems(mockAccounts, {
    searchFields: ["title", "game", "seller"],
    gameField: "game",
    rankField: "rank",
    priceField: "price",
  })

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Gaming Hesapları</h1>
          <p className="text-muted-foreground">Güvenilir satıcılardan en iyi gaming hesaplarını keşfedin</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Hesap ara..."
                className="pl-10"
                value={filters.searchQuery}
                onChange={(e) => updateSearchQuery(e.target.value)}
                aria-label="Hesap ara"
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
                  <SelectItem value="price-low">Fiyat (Düşük)</SelectItem>
                  <SelectItem value="price-high">Fiyat (Yüksek)</SelectItem>
                  <SelectItem value="popular">En Popüler</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={toggleFilters}
                aria-expanded={filters.showFilters}
                aria-controls="advanced-filters"
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
            <Card className="bg-card/50 backdrop-blur border-border/50" id="advanced-filters">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="rank-select">Rank</Label>
                    <Select value={filters.selectedRank || "Tümü"} onValueChange={updateRank}>
                      <SelectTrigger id="rank-select">
                        <SelectValue placeholder="Rank seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {ranks.map((rank) => (
                          <SelectItem key={rank} value={rank}>
                            {rank}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price-range">
                      Fiyat Aralığı: {filters.priceRange[0]}₺ - {filters.priceRange[1]}₺
                    </Label>
                    <Slider
                      id="price-range"
                      value={filters.priceRange}
                      onValueChange={updatePriceRange}
                      max={5000}
                      min={0}
                      step={100}
                      className="w-full"
                      aria-label="Fiyat aralığı"
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
            {filteredAccounts.length} hesap bulundu
          </p>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              TC Onaylı Satıcılar
            </Badge>
          </div>
        </div>

        {/* Account Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAccounts.map((account) => (
            <Card
              key={account.id}
              className="bg-card/50 backdrop-blur border-border/50 hover:bg-card/70 transition-all duration-300 group"
            >
              <CardHeader className="p-0">
                <div className="relative">
                  <img
                    src={account.images[0] || "/placeholder.svg"}
                    alt={account.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {account.isHot && (
                    <Badge className="absolute top-2 left-2 bg-destructive">
                      <Zap className="h-3 w-3 mr-1" />
                      HOT
                    </Badge>
                  )}
                  {account.originalPrice && (
                    <Badge className="absolute top-2 right-2 bg-accent">
                      %{Math.round(((account.originalPrice - account.price) / account.originalPrice) * 100)} İndirim
                    </Badge>
                  )}
                  <div className="absolute bottom-2 right-2 flex gap-1">
                    <Button size="sm" variant="secondary" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="secondary" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-sm mb-1 line-clamp-2">{account.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <GamepadIcon className="h-3 w-3" />
                      {account.game}
                      <Separator orientation="vertical" className="h-3" />
                      <Trophy className="h-3 w-3" />
                      {account.rank}
                      <Separator orientation="vertical" className="h-3" />
                      Level {account.level}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {account.features.slice(0, 2).map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {account.features.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{account.features.length - 2}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{account.seller}</span>
                      {account.sellerVerified && <Shield className="h-3 w-3 text-accent" />}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span className="text-xs">{account.sellerRating}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {account.views}
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {account.likes}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {account.timeLeft}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      {account.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through">{account.originalPrice}₺</span>
                      )}
                      <div className="text-lg font-bold text-primary">{account.price}₺</div>
                    </div>
                    <Button size="sm" asChild>
                      <Link href={`/marketplace/${account.id}`}>İncele</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

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
