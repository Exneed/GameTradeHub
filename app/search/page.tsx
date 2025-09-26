"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, Gamepad2, Zap, Star, Eye, MessageCircle, Heart, SortAsc } from "lucide-react"
import { useFilters } from "@/hooks/use-filters"

// Mock search results
const mockResults = [
  {
    id: "1",
    type: "account",
    game: "Valorant",
    title: "Immortal 3 Hesap - Full Skin Collection",
    price: 850.0,
    seller: "ProGamer123",
    rating: 4.9,
    reviews: 156,
    image: "/valorant-agents.png",
    rank: "Immortal 3",
    features: ["Full Skins", "Battle Pass", "Verified"],
    commission: 85.0, // 10% commission
  },
  {
    id: "2",
    type: "boost",
    game: "League of Legends",
    title: "Gold'dan Platinum'a Hızlı Boost",
    price: 250.0,
    seller: "BoostMaster",
    rating: 4.8,
    reviews: 89,
    image: "/league-of-legends.jpg",
    rank: "Gold → Platinum",
    features: ["Hızlı", "Güvenli", "7/24"],
    commission: 25.0,
  },
  {
    id: "3",
    type: "account",
    game: "CS2",
    title: "Global Elite Hesap - Prime",
    price: 1200.0,
    seller: "CSProSeller",
    rating: 5.0,
    reviews: 234,
    image: "/counter-strike.jpg",
    rank: "Global Elite",
    features: ["Prime", "Low Hours", "Clean"],
    commission: 120.0,
  },
  {
    id: "4",
    type: "boost",
    game: "Valorant",
    title: "Diamond'dan Immortal'a Boost",
    price: 400.0,
    seller: "ValorantPro",
    rating: 4.7,
    reviews: 67,
    image: "/valorant-boost.jpg",
    rank: "Diamond → Immortal",
    features: ["Duo Queue", "Stream", "Garanti"],
    commission: 40.0,
  },
  {
    id: "5",
    type: "account",
    game: "Apex Legends",
    title: "Master Tier Hesap",
    price: 600.0,
    seller: "ApexLegend",
    rating: 4.6,
    reviews: 45,
    image: "/apex-legends.jpg",
    rank: "Master",
    features: ["Heirloom", "All Legends", "Badges"],
    commission: 60.0,
  },
]

export default function SearchPage() {
  const {
    filters,
    updateSearchQuery,
    updateGame,
    updateSortBy,
    updateTypeFilter,
    updatePriceRange,
    updateMinRating,
    toggleFilters,
    resetFilters,
    filterItems,
    hasActiveFilters,
  } = useFilters(
    {
      typeFilter: "all",
      selectedGame: "all",
      priceRange: [0, 2000],
      minRating: 0,
      sortBy: "relevance",
    },
    {
      games: ["all", "Valorant", "League of Legends", "CS2", "Apex Legends"],
      priceMax: 2000,
      enableUrlSync: true,
      debounceMs: 300,
    },
  )

  const filteredResults = filterItems(mockResults, {
    searchFields: ["title", "game", "seller"],
    gameField: "game",
    typeField: "type",
    priceField: "price",
    ratingField: "rating",
  })

  const ResultCard = ({ item }: { item: (typeof mockResults)[0] }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex gap-4">
          {/* Image */}
          <div className="flex-shrink-0">
            <img src={item.image || "/placeholder.svg"} alt={item.game} className="w-20 h-20 rounded-lg object-cover" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {item.type === "account" ? (
                    <Gamepad2 className="h-4 w-4 text-primary" />
                  ) : (
                    <Zap className="h-4 w-4 text-accent" />
                  )}
                  <Badge variant="outline" className="text-xs">
                    {item.game}
                  </Badge>
                  <Badge className="text-xs">{item.type === "account" ? "Hesap" : "Boost"}</Badge>
                </div>
                <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{item.rank}</p>

                {/* Features */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {item.features.map((feature) => (
                    <Badge key={feature} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>

                {/* Seller & Rating */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Satıcı: {item.seller}</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{item.rating}</span>
                    <span>({item.reviews})</span>
                  </div>
                </div>
              </div>

              {/* Price & Commission */}
              <div className="text-right">
                <div className="text-2xl font-bold mb-1">{item.price.toFixed(2)} ₺</div>
                <div className="text-xs text-muted-foreground">Komisyon: {item.commission.toFixed(2)} ₺</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 mt-4">
              <Button size="sm">
                <Eye className="h-4 w-4 mr-2" />
                İncele
              </Button>
              <Button variant="outline" size="sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                Mesaj
              </Button>
              <Button variant="ghost" size="sm">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Arama Sonuçları</h1>

          {/* Search Bar */}
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Hesap veya boost ara..."
                value={filters.searchQuery}
                onChange={(e) => updateSearchQuery(e.target.value)}
                className="pl-10"
                aria-label="Arama"
              />
            </div>
            <Button
              variant="outline"
              onClick={toggleFilters}
              className="flex items-center gap-2 bg-transparent"
              aria-expanded={filters.showFilters}
              aria-controls="search-filters"
            >
              <Filter className="h-4 w-4" />
              Filtreler
              {hasActiveFilters && <div className="ml-1 h-2 w-2 bg-primary rounded-full" />}
            </Button>
          </div>

          {/* Results Info */}
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground" role="status" aria-live="polite">
              {filteredResults.length} sonuç bulundu
              {filters.debouncedSearchQuery && ` "${filters.debouncedSearchQuery}" için`}
            </p>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <SortAsc className="h-4 w-4 text-muted-foreground" />
              <Select value={filters.sortBy} onValueChange={updateSortBy}>
                <SelectTrigger className="w-48" aria-label="Sıralama">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">İlgili</SelectItem>
                  <SelectItem value="price-low">Fiyat (Düşük)</SelectItem>
                  <SelectItem value="price-high">Fiyat (Yüksek)</SelectItem>
                  <SelectItem value="rating">Puan</SelectItem>
                  <SelectItem value="reviews">Yorum Sayısı</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {filters.showFilters && (
            <div className="w-80 space-y-6" id="search-filters">
              <Card>
                <CardContent className="p-6 space-y-6">
                  <h3 className="font-semibold">Filtreler</h3>

                  {/* Type Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="type-filter">
                      Tür
                    </label>
                    <Select value={filters.typeFilter || "all"} onValueChange={updateTypeFilter}>
                      <SelectTrigger id="type-filter">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tümü</SelectItem>
                        <SelectItem value="account">Hesap</SelectItem>
                        <SelectItem value="boost">Boost</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Game Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="game-filter">
                      Oyun
                    </label>
                    <Select value={filters.selectedGame} onValueChange={updateGame}>
                      <SelectTrigger id="game-filter">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tüm Oyunlar</SelectItem>
                        <SelectItem value="Valorant">Valorant</SelectItem>
                        <SelectItem value="League of Legends">League of Legends</SelectItem>
                        <SelectItem value="CS2">Counter-Strike 2</SelectItem>
                        <SelectItem value="Apex Legends">Apex Legends</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Range */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="price-range">
                      Fiyat Aralığı: {filters.priceRange[0]}₺ - {filters.priceRange[1]}₺
                    </label>
                    <Slider
                      id="price-range"
                      value={filters.priceRange}
                      onValueChange={updatePriceRange}
                      max={2000}
                      min={0}
                      step={50}
                      className="w-full"
                      aria-label="Fiyat aralığı"
                    />
                  </div>

                  {/* Rating Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="rating-filter">
                      Minimum Puan
                    </label>
                    <Select
                      value={(filters.minRating || 0).toString()}
                      onValueChange={(value) => updateMinRating(Number.parseFloat(value))}
                    >
                      <SelectTrigger id="rating-filter">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Tümü</SelectItem>
                        <SelectItem value="4">4+ Yıldız</SelectItem>
                        <SelectItem value="4.5">4.5+ Yıldız</SelectItem>
                        <SelectItem value="4.8">4.8+ Yıldız</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Clear Filters */}
                  <Button
                    variant="outline"
                    onClick={resetFilters}
                    className="w-full bg-transparent"
                    disabled={!hasActiveFilters}
                  >
                    Filtreleri Temizle
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Komisyon Bilgisi</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• Tüm işlemlerden %10 komisyon alınır</p>
                    <p>• Komisyon otomatik olarak hesaplanır</p>
                    <p>• Satıcılar net kazancı görür</p>
                    <p>• Güvenli ödeme garantisi</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Results */}
          <div className="flex-1">
            {filteredResults.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Sonuç Bulunamadı</h3>
                  <p className="text-muted-foreground">Arama kriterlerinizi değiştirerek tekrar deneyin.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredResults.map((item) => (
                  <ResultCard key={item.id} item={item} />
                ))}
              </div>
            )}

            {/* Load More */}
            {filteredResults.length > 0 && (
              <div className="text-center mt-8">
                <Button variant="outline">Daha Fazla Göster</Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
