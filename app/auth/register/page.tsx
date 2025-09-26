"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Eye, EyeOff, User, Mail, Lock, Phone } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { createClient } from "@/lib/supabase/client"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [step, setStep] = useState(1)
  const [phoneVerified, setPhoneVerified] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")
  const [sentCode, setSentCode] = useState("")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    agreePrivacy: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = "Ad alanı zorunludur"
    if (!formData.lastName.trim()) newErrors.lastName = "Soyad alanı zorunludur"
    if (!formData.email.trim()) newErrors.email = "E-posta alanı zorunludur"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Geçerli bir e-posta adresi girin"
    if (!formData.phone.trim()) newErrors.phone = "Telefon numarası zorunludur"
    else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, "")))
      newErrors.phone = "Geçerli bir telefon numarası girin"
    if (!formData.password) newErrors.password = "Şifre alanı zorunludur"
    else if (formData.password.length < 8) newErrors.password = "Şifre en az 8 karakter olmalıdır"
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Şifreler eşleşmiyor"
    if (!formData.agreeTerms) newErrors.agreeTerms = "Kullanım şartlarını kabul etmelisiniz"
    if (!formData.agreePrivacy) newErrors.agreePrivacy = "Gizlilik politikasını kabul etmelisiniz"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const sendVerificationCode = async () => {
    if (!validateStep1()) return

    setIsLoading(true)

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/auth/success`,
          data: {
            username: `${formData.firstName}${formData.lastName}`.toLowerCase(),
            full_name: `${formData.firstName} ${formData.lastName}`,
            phone: formData.phone,
          },
        },
      })

      if (error) {
        setErrors({ email: error.message })
      } else {
        // Simulate SMS code for demo
        const code = Math.floor(100000 + Math.random() * 900000).toString()
        setSentCode(code)
        console.log(`[v0] SMS Code sent: ${code}`)
        setStep(2)
      }
    } catch (error) {
      setErrors({ email: "Kayıt sırasında bir hata oluştu" })
    } finally {
      setIsLoading(false)
    }
  }

  const verifyPhone = async () => {
    if (verificationCode !== sentCode) {
      setErrors({ verificationCode: "Doğrulama kodu hatalı" })
      return
    }

    setPhoneVerified(true)
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)

    router.push("/auth/success")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      sendVerificationCode()
    } else {
      verifyPhone()
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardHeader className="text-center">
              <div className="h-16 w-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">{step === 1 ? "Hesap Oluştur" : "Telefon Doğrulama"}</CardTitle>
              <CardDescription>
                {step === 1
                  ? "GameMarkt'a katılın ve güvenli alışverişin keyfini çıkarın"
                  : `${formData.phone} numarasına gönderilen kodu girin`}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {step === 1 && (
                <Alert className="border-accent/50 bg-accent/10">
                  <Shield className="h-4 w-4 text-accent" />
                  <AlertDescription className="text-accent-foreground">
                    Telefon numaranız SMS ile doğrulanacaktır. Onaylı satıcı olmak için ayrıca TC kimlik doğrulaması
                    gereklidir.
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {step === 1 ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Ad *</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="firstName"
                            placeholder="Adınız"
                            className="pl-10"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                          />
                        </div>
                        {errors.firstName && <p className="text-sm text-destructive">{errors.firstName}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lastName">Soyad *</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="lastName"
                            placeholder="Soyadınız"
                            className="pl-10"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                          />
                        </div>
                        {errors.lastName && <p className="text-sm text-destructive">{errors.lastName}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">E-posta *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="ornek@email.com"
                          className="pl-10"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                        />
                      </div>
                      {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          placeholder="05XX XXX XX XX"
                          className="pl-10"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                        />
                      </div>
                      {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Şifre *</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="En az 8 karakter"
                          className="pl-10 pr-10"
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Şifre Tekrar *</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Şifrenizi tekrar girin"
                          className="pl-10 pr-10"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="agreeTerms"
                          checked={formData.agreeTerms}
                          onCheckedChange={(checked) => handleInputChange("agreeTerms", checked as boolean)}
                        />
                        <Label htmlFor="agreeTerms" className="text-sm leading-5">
                          <Link href="/terms" className="text-primary hover:underline">
                            Kullanım Şartları
                          </Link>
                          'nı okudum ve kabul ediyorum *
                        </Label>
                      </div>
                      {errors.agreeTerms && <p className="text-sm text-destructive">{errors.agreeTerms}</p>}

                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="agreePrivacy"
                          checked={formData.agreePrivacy}
                          onCheckedChange={(checked) => handleInputChange("agreePrivacy", checked as boolean)}
                        />
                        <Label htmlFor="agreePrivacy" className="text-sm leading-5">
                          <Link href="/privacy" className="text-primary hover:underline">
                            Gizlilik Politikası
                          </Link>
                          'nı okudum ve kabul ediyorum *
                        </Label>
                      </div>
                      {errors.agreePrivacy && <p className="text-sm text-destructive">{errors.agreePrivacy}</p>}
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                        <Phone className="h-8 w-8 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">6 haneli doğrulama kodunu girin</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="verificationCode">Doğrulama Kodu</Label>
                      <Input
                        id="verificationCode"
                        placeholder="123456"
                        className="text-center text-2xl tracking-widest"
                        maxLength={6}
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ""))}
                      />
                      {errors.verificationCode && <p className="text-sm text-destructive">{errors.verificationCode}</p>}
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => sendVerificationCode()}
                    >
                      Kodu Tekrar Gönder
                    </Button>
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading
                    ? step === 1
                      ? "Kod Gönderiliyor..."
                      : "Doğrulanıyor..."
                    : step === 1
                      ? "Doğrulama Kodu Gönder"
                      : "Telefonu Doğrula"}
                </Button>
              </form>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Zaten hesabınız var mı?{" "}
                  <Link href="/auth/login" className="text-primary hover:underline">
                    Giriş Yap
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
