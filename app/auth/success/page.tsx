"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Shield, Star } from "lucide-react"
import { Navigation } from "@/components/navigation"

export default function SuccessPage() {
  const [showOptions, setShowOptions] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowOptions(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardHeader className="text-center">
              <div className="h-16 w-16 rounded-2xl bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <CardTitle className="text-2xl text-green-500">Hesap Oluşturuldu!</CardTitle>
              <CardDescription>Telefon numaranız başarıyla doğrulandı. GameMarkt'a hoş geldiniz!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {showOptions && (
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <p className="text-sm text-muted-foreground">
                      Hesabınızı daha da güçlendirmek için aşağıdaki seçenekleri değerlendirebilirsiniz:
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Card className="border-accent/50 bg-accent/10">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <Shield className="h-6 w-6 text-accent" />
                          <div className="flex-1">
                            <h3 className="font-medium">Onaylı Satıcı Ol</h3>
                            <p className="text-sm text-muted-foreground">
                              TC kimlik doğrulaması ile güvenilir satıcı statüsü kazanın
                            </p>
                          </div>
                        </div>
                        <Link href="/verification/seller" className="block mt-3">
                          <Button variant="outline" size="sm" className="w-full bg-transparent">
                            Başvur
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>

                    <Card className="border-primary/50 bg-primary/10">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <Star className="h-6 w-6 text-primary" />
                          <div className="flex-1">
                            <h3 className="font-medium">Booster Ol</h3>
                            <p className="text-sm text-muted-foreground">Oyun boost hizmetleri vererek para kazanın</p>
                          </div>
                        </div>
                        <Link href="/verification/booster" className="block mt-3">
                          <Button variant="outline" size="sm" className="w-full bg-transparent">
                            Başvur
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="pt-4 border-t">
                    <Link href="/dashboard">
                      <Button className="w-full">Hesabıma Git</Button>
                    </Link>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
