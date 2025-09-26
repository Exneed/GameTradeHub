import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Zap, Users, Star, TrendingUp, GamepadIcon, Target } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      <div className="absolute inset-0 bg-[url('/gaming-pattern.jpg')] opacity-5" />

      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Badge className="mb-6 bg-primary/20 text-primary border-primary/30">
            Türkiye'nin En Güvenilir Gaming Marketplace'i
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Gaming Hesapları ve
            <span className="text-primary"> Boost Hizmetleri</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            Güvenli alışveriş, profesyonel boost hizmetleri ve TC onaylı kullanıcılar ile gaming deneyiminizi bir üst
            seviyeye taşıyın.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/marketplace">
                <GamepadIcon className="mr-2 h-5 w-5" />
                Hesap Satın Al
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent" asChild>
              <Link href="/boost">
                <Zap className="mr-2 h-5 w-5" />
                Boost Hizmeti Al
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-bold mb-1">50K+</div>
              <div className="text-sm text-muted-foreground">Aktif Kullanıcı</div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-3">
                <Shield className="h-6 w-6 text-accent" />
              </div>
              <div className="text-2xl font-bold mb-1">99.9%</div>
              <div className="text-sm text-muted-foreground">Güvenlik Oranı</div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 rounded-full bg-chart-4/20 flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-chart-4" />
              </div>
              <div className="text-2xl font-bold mb-1">100K+</div>
              <div className="text-sm text-muted-foreground">Tamamlanan İşlem</div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 rounded-full bg-chart-5/20 flex items-center justify-center mx-auto mb-3">
                <Star className="h-6 w-6 text-chart-5" />
              </div>
              <div className="text-2xl font-bold mb-1">4.9/5</div>
              <div className="text-sm text-muted-foreground">Kullanıcı Puanı</div>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-card/50 backdrop-blur border-border/50 hover:bg-card/70 transition-colors">
            <CardContent className="p-8">
              <div className="h-16 w-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">TC Onaylı Güvenlik</h3>
              <p className="text-muted-foreground">
                Tüm kullanıcılarımız TC kimlik onayından geçer. %100 güvenli alışveriş garantisi.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-border/50 hover:bg-card/70 transition-colors">
            <CardContent className="p-8">
              <div className="h-16 w-16 rounded-2xl bg-accent/20 flex items-center justify-center mb-6">
                <Zap className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Profesyonel Boost</h3>
              <p className="text-muted-foreground">
                Deneyimli boosterlar ile hızlı ve güvenli rank yükseltme hizmetleri.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-border/50 hover:bg-card/70 transition-colors">
            <CardContent className="p-8">
              <div className="h-16 w-16 rounded-2xl bg-chart-4/20 flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-chart-4" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Anında İşlem</h3>
              <p className="text-muted-foreground">Otomatik sistem ile anında hesap teslimi ve boost başlatma.</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="p-8">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Booster Olmak İster Misiniz?</h2>
                <p className="text-muted-foreground mb-6">
                  Profesyonel boost hizmeti vererek para kazanın. TC kimlik belgesi ve oyun deneyimi gereklidir.
                </p>
                <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                  <Link href="/become-booster">
                    <Zap className="mr-2 h-5 w-5" />
                    Booster Ol
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
