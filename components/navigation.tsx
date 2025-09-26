"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, User, Wallet, Settings, LogOut, Menu, X, Search, ShoppingCart, Zap, Shield, Plus } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [balance] = useState(1250.5) // Mock balance
  const [notifications] = useState(3) // Mock notifications
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()
        setProfile(profile)
      }
      setIsLoading(false)
    }

    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)

      if (session?.user) {
        const { data: profile } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()
        setProfile(profile)
      } else {
        setProfile(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">GameMarkt</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/marketplace"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Marketplace
            </Link>
            <Link
              href="/boost"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              <Zap className="h-4 w-4" />
              Boost
            </Link>
            <Link
              href="/sell"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Hesap Sat
            </Link>
            <Link
              href="/support"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Destek
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Hesap veya boost ara..."
                className="pl-10 bg-muted/50 border-border"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const query = e.currentTarget.value
                    if (query.trim()) {
                      window.location.href = `/search?q=${encodeURIComponent(query)}`
                    }
                  }
                }}
              />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Balance */}
                <div className="hidden md:flex items-center space-x-2 bg-muted/50 px-3 py-1.5 rounded-lg">
                  <Wallet className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium">{profile?.balance?.toFixed(2) || "0.00"} ₺</span>
                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0 ml-1">
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>

                {/* Notifications */}
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-5 w-5" />
                  {notifications > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-destructive">
                      {notifications}
                    </Badge>
                  )}
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <User className="h-4 w-4" />
                      </div>
                      <span className="hidden md:block text-sm">{profile?.username || user.email}</span>
                      {profile?.tc_verified && <Shield className="h-3 w-3 text-accent" />}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Hesabım</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile">
                        <User className="mr-2 h-4 w-4" />
                        Profil
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Wallet className="mr-2 h-4 w-4" />
                      Bakiye: {profile?.balance?.toFixed(2) || "0.00"} ₺
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/orders">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Siparişlerim
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/tc-verification">
                        <Shield className="mr-2 h-4 w-4" />
                        TC Onay Durumu
                        {!profile?.tc_verified && (
                          <Badge variant="destructive" className="ml-auto text-xs">
                            Bekliyor
                          </Badge>
                        )}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        Ayarlar
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive" onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Çıkış Yap
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                {!isLoading && (
                  <>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/auth/login">Giriş Yap</Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href="/auth/register">Kayıt Ol</Link>
                    </Button>
                  </>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Hesap veya boost ara..."
                  className="pl-10 bg-muted/50 border-border"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const query = e.currentTarget.value
                      if (query.trim()) {
                        window.location.href = `/search?q=${encodeURIComponent(query)}`
                      }
                    }
                  }}
                />
              </div>

              {user && (
                <div className="flex items-center justify-between bg-muted/50 px-3 py-2 rounded-lg">
                  <span className="text-sm text-muted-foreground">Bakiye:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{profile?.balance?.toFixed(2) || "0.00"} ₺</span>
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              )}

              <div className="flex flex-col space-y-2">
                <Link
                  href="/marketplace"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  Marketplace
                </Link>
                <Link
                  href="/boost"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 flex items-center gap-2"
                >
                  <Zap className="h-4 w-4" />
                  Boost
                </Link>
                <Link
                  href="/sell"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  Hesap Sat
                </Link>
                <Link
                  href="/support"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  Destek
                </Link>

                {!user && !isLoading && (
                  <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/auth/login">Giriş Yap</Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href="/auth/register">Kayıt Ol</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
