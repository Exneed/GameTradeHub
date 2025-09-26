"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Wallet, Plus, Eye, EyeOff, TrendingUp } from "lucide-react"
import Link from "next/link"

interface BalanceWidgetProps {
  balance: number
  monthlyChange?: number
  className?: string
}

export function BalanceWidget({ balance, monthlyChange = 0, className }: BalanceWidgetProps) {
  const [showBalance, setShowBalance] = useState(true)

  return (
    <Card className={`bg-gradient-to-br from-primary/20 to-accent/20 border-primary/30 ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Wallet className="h-4 w-4 text-primary" />
            <span className="font-medium text-sm">Bakiye</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setShowBalance(!showBalance)} className="h-6 w-6 p-0">
            {showBalance ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
          </Button>
        </div>

        <div className="space-y-2">
          <div className="text-2xl font-bold text-primary">{showBalance ? `${balance.toFixed(2)} ₺` : "••••••"}</div>

          {monthlyChange !== 0 && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3" />
              <span>
                Bu ay {monthlyChange > 0 ? "+" : ""}
                {monthlyChange.toFixed(1)}%
              </span>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <Button size="sm" asChild className="flex-1">
              <Link href="/balance">
                <Plus className="h-3 w-3 mr-1" />
                Yükle
              </Link>
            </Button>
            <Button size="sm" variant="outline" asChild className="flex-1 bg-transparent">
              <Link href="/balance?tab=history">Geçmiş</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
