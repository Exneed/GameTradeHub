"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Shield, CheckCircle, Clock, Mail, Phone, CreditCard, Upload, Camera } from "lucide-react"
import { Navigation } from "@/components/navigation"

type VerificationStep = "email" | "phone" | "identity" | "completed"

export default function VerifyPage() {
  const [currentStep, setCurrentStep] = useState<VerificationStep>("email")
  const [verificationCode, setVerificationCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [identityFiles, setIdentityFiles] = useState<{
    front: File | null
    back: File | null
    selfie: File | null
  }>({
    front: null,
    back: null,
    selfie: null,
  })

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleVerifyCode = async () => {
    if (!verificationCode || verificationCode.length !== 6) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)

    if (currentStep === "email") {
      setCurrentStep("phone")
      setVerificationCode("")
    } else if (currentStep === "phone") {
      setCurrentStep("identity")
      setVerificationCode("")
    }
  }

  const handleResendCode = () => {
    setCountdown(60)
    // Simulate resend API call
  }

  const handleFileUpload = (type: "front" | "back" | "selfie", file: File) => {
    setIdentityFiles((prev) => ({ ...prev, [type]: file }))
  }

  const handleSubmitIdentity = async () => {
    if (!identityFiles.front || !identityFiles.back || !identityFiles.selfie) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsLoading(false)
    setCurrentStep("completed")
  }

  const getStepProgress = () => {
    switch (currentStep) {
      case "email":
        return 25
      case "phone":
        return 50
      case "identity":
        return 75
      case "completed":
        return 100
      default:
        return 0
    }
  }

  const renderEmailVerification = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="h-16 w-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
          <Mail className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2">E-posta Doğrulama</h3>
        <p className="text-muted-foreground">E-posta adresinize gönderilen 6 haneli doğrulama kodunu girin</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="emailCode">Doğrulama Kodu</Label>
          <Input
            id="emailCode"
            placeholder="123456"
            maxLength={6}
            className="text-center text-2xl tracking-widest"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ""))}
          />
        </div>

        <Button onClick={handleVerifyCode} className="w-full" disabled={isLoading || verificationCode.length !== 6}>
          {isLoading ? "Doğrulanıyor..." : "Doğrula"}
        </Button>

        <div className="text-center">
          <Button
            variant="ghost"
            onClick={handleResendCode}
            disabled={countdown > 0}
            className="text-sm text-muted-foreground"
          >
            {countdown > 0 ? `Tekrar gönder (${countdown}s)` : "Kodu tekrar gönder"}
          </Button>
        </div>
      </div>
    </div>
  )

  const renderPhoneVerification = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="h-16 w-16 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-4">
          <Phone className="h-8 w-8 text-accent" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Telefon Doğrulama</h3>
        <p className="text-muted-foreground">Telefon numaranıza gönderilen SMS kodunu girin</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="phoneCode">SMS Kodu</Label>
          <Input
            id="phoneCode"
            placeholder="123456"
            maxLength={6}
            className="text-center text-2xl tracking-widest"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ""))}
          />
        </div>

        <Button onClick={handleVerifyCode} className="w-full" disabled={isLoading || verificationCode.length !== 6}>
          {isLoading ? "Doğrulanıyor..." : "Doğrula"}
        </Button>

        <div className="text-center">
          <Button
            variant="ghost"
            onClick={handleResendCode}
            disabled={countdown > 0}
            className="text-sm text-muted-foreground"
          >
            {countdown > 0 ? `Tekrar gönder (${countdown}s)` : "SMS'i tekrar gönder"}
          </Button>
        </div>
      </div>
    </div>
  )

  const renderIdentityVerification = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="h-16 w-16 rounded-2xl bg-chart-4/20 flex items-center justify-center mx-auto mb-4">
          <CreditCard className="h-8 w-8 text-chart-4" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Kimlik Doğrulama</h3>
        <p className="text-muted-foreground">TC Kimlik kartınızın fotoğraflarını yükleyin</p>
      </div>

      <Alert className="border-chart-4/50 bg-chart-4/10">
        <Shield className="h-4 w-4 text-chart-4" />
        <AlertDescription className="text-chart-4-foreground">
          Kimlik bilgileriniz güvenli bir şekilde saklanır ve sadece doğrulama amacıyla kullanılır.
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label>Kimlik Kartı Ön Yüz</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="front-upload"
                onChange={(e) => e.target.files?.[0] && handleFileUpload("front", e.target.files[0])}
              />
              <label htmlFor="front-upload" className="cursor-pointer">
                {identityFiles.front ? (
                  <div className="flex items-center justify-center space-x-2 text-accent">
                    <CheckCircle className="h-5 w-5" />
                    <span>{identityFiles.front.name}</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto" />
                    <p className="text-sm text-muted-foreground">Ön yüz fotoğrafını yükle</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Kimlik Kartı Arka Yüz</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="back-upload"
                onChange={(e) => e.target.files?.[0] && handleFileUpload("back", e.target.files[0])}
              />
              <label htmlFor="back-upload" className="cursor-pointer">
                {identityFiles.back ? (
                  <div className="flex items-center justify-center space-x-2 text-accent">
                    <CheckCircle className="h-5 w-5" />
                    <span>{identityFiles.back.name}</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto" />
                    <p className="text-sm text-muted-foreground">Arka yüz fotoğrafını yükle</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Selfie (Kimlikle Birlikte)</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="selfie-upload"
                onChange={(e) => e.target.files?.[0] && handleFileUpload("selfie", e.target.files[0])}
              />
              <label htmlFor="selfie-upload" className="cursor-pointer">
                {identityFiles.selfie ? (
                  <div className="flex items-center justify-center space-x-2 text-accent">
                    <CheckCircle className="h-5 w-5" />
                    <span>{identityFiles.selfie.name}</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Camera className="h-8 w-8 text-muted-foreground mx-auto" />
                    <p className="text-sm text-muted-foreground">Kimlikle birlikte selfie çek</p>
                  </div>
                )}
              </label>
            </div>
          </div>
        </div>

        <Button
          onClick={handleSubmitIdentity}
          className="w-full"
          disabled={isLoading || !identityFiles.front || !identityFiles.back || !identityFiles.selfie}
        >
          {isLoading ? "Gönderiliyor..." : "Kimlik Doğrulaması Gönder"}
        </Button>
      </div>
    </div>
  )

  const renderCompleted = () => (
    <div className="space-y-6 text-center">
      <div className="h-16 w-16 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="h-8 w-8 text-accent" />
      </div>
      <h3 className="text-xl font-semibold mb-2">Doğrulama Tamamlandı!</h3>
      <p className="text-muted-foreground">
        Hesabınız başarıyla oluşturuldu. Kimlik doğrulamanız 24 saat içinde tamamlanacak.
      </p>

      <Alert className="border-accent/50 bg-accent/10">
        <Clock className="h-4 w-4 text-accent" />
        <AlertDescription className="text-accent-foreground">
          Kimlik doğrulamanız tamamlanana kadar bazı özellikler kısıtlı olabilir.
        </AlertDescription>
      </Alert>

      <Button asChild className="w-full">
        <Link href="/dashboard">Dashboard'a Git</Link>
      </Button>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Hesap Doğrulama</CardTitle>
              <CardDescription>Hesabınızı güvenli hale getirmek için doğrulama adımlarını tamamlayın</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>İlerleme</span>
                  <span>{getStepProgress()}%</span>
                </div>
                <Progress value={getStepProgress()} className="h-2" />
              </div>

              <div className="flex justify-center space-x-4">
                <Badge variant={currentStep === "email" ? "default" : "secondary"} className="flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  E-posta
                </Badge>
                <Badge variant={currentStep === "phone" ? "default" : "secondary"} className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  Telefon
                </Badge>
                <Badge
                  variant={currentStep === "identity" ? "default" : "secondary"}
                  className="flex items-center gap-1"
                >
                  <CreditCard className="h-3 w-3" />
                  Kimlik
                </Badge>
              </div>

              {currentStep === "email" && renderEmailVerification()}
              {currentStep === "phone" && renderPhoneVerification()}
              {currentStep === "identity" && renderIdentityVerification()}
              {currentStep === "completed" && renderCompleted()}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
