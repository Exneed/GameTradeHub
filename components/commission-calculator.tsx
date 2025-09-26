"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Calculator, TrendingUp, Info } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function CommissionCalculator() {
  const [price, setPrice] = useState<number>(100)
  const commissionRate = 0.1 // 10%

  const commission = price * commissionRate
  const sellerEarnings = price - commission
  const platformFee = commission

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Komisyon Hesaplayıcı
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="price">Hizmet Fiyatı (₺)</Label>
          <Input
            id="price"
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(Number.parseFloat(e.target.value) || 0)}
            placeholder="Fiyat girin..."
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary" />
              <span className="font-medium">Toplam Fiyat</span>
            </div>
            <Badge className="bg-primary text-primary-foreground">{price.toFixed(2)} ₺</Badge>
          </div>

          <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-red-500" />
              <span className="font-medium">Platform Komisyonu (%10)</span>
            </div>
            <Badge variant="destructive">-{commission.toFixed(2)} ₺</Badge>
          </div>

          <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-500" />
              <span className="font-medium">Satıcı Kazancı</span>
            </div>
            <Badge className="bg-green-500 text-white">{sellerEarnings.toFixed(2)} ₺</Badge>
          </div>
        </div>

        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Komisyon Politikası:</strong>
            <br />• Tüm boost hizmetlerinden %10 komisyon alınır
            <br />• Komisyon otomatik olarak hesaplanır ve kesilir
            <br />• Satıcılar net kazancı direkt hesaplarına alır
            <br />• Güvenli ödeme ve işlem garantisi sağlanır
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="p-3 bg-muted/30 rounded-lg">
            <div className="text-sm text-muted-foreground">Komisyon Oranı</div>
            <div className="text-lg font-bold text-primary">%10</div>
          </div>
          <div className="p-3 bg-muted/30 rounded-lg">
            <div className="text-sm text-muted-foreground">Kazanç Oranı</div>
            <div className="text-lg font-bold text-green-500">%90</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
