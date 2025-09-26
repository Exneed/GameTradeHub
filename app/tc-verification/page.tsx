"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Shield, Upload, CheckCircle, Clock, XCircle, AlertTriangle, Camera, FileText, User } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

type VerificationStatus = "not-started" | "pending" | "under-review" | "approved" | "rejected"

export default function TCVerificationPage() {
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>("pending")
  const [uploadedFiles, setUploadedFiles] = useState({
    frontId: null as File | null,
    backId: null as File | null,
    selfie: null as File | null,
  })
  const [formData, setFormData] = useState({
    tcNumber: "12345678901",
    fullName: "Ahmet Yılmaz",
    birthDate: "1990-01-01",
    phone: "+90 555 123 4567",
    email: "ahmet@example.com",
    address: "",
    additionalNotes: "",
  })

  const statusConfig = {
    "not-started": {
      label: "Başlanmadı",
      color: "bg-gray-500",
      icon: Clock,
      description: "TC kimlik doğrulaması henüz başlatılmamış",
    },
    pending: {
      label: "Belgeler Bekleniyor",
      color: "bg-yellow-500",
      icon: Upload,
      description: "Kimlik belgelerinizi yükleyin",
    },
    "under-review": {
      label: "İnceleme Altında",
      color: "bg-blue-500",
      icon: Clock,
      description: "Belgeleriniz moderatörler tarafından inceleniyor",
    },
    approved: {
      label: "Onaylandı",
      color: "bg-green-500",
      icon: CheckCircle,
      description: "TC kimlik doğrulamanız başarıyla tamamlandı",
    },
    rejected: {
      label: "Reddedildi",
      color: "bg-red-500",
      icon: XCircle,
      description: "Belgelerinizde sorun tespit edildi, lütfen tekrar yükleyin",
    },
  }

  const currentStatus = statusConfig[verificationStatus]
  const Icon = currentStatus.icon

  const getProgressValue = () => {
    switch (verificationStatus) {
      case "not-started":
        return 0
      case "pending":
        return 25
      case "under-review":
        return 75
      case "approved":
        return 100
      case "rejected":
        return 50
      default:
        return 0
    }
  }

  const handleFileUpload = (type: keyof typeof uploadedFiles, file: File) => {
    setUploadedFiles({ ...uploadedFiles, [type]: file })
  }

  const handleSubmit = () => {
    if (uploadedFiles.frontId && uploadedFiles.backId && uploadedFiles.selfie) {
      setVerificationStatus("under-review")
    }
  }

  const FileUploadCard = ({
    title,
    description,
    type,
    icon: IconComponent,
    accept,
  }: {
    title: string
    description: string
    type: keyof typeof uploadedFiles
    icon: any
    accept: string
  }) => (
    <Card className="border-dashed border-2 hover:border-primary/50 transition-colors">
      <CardContent className="p-6">
        <div className="text-center">
          <IconComponent className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>

          {uploadedFiles[type] ? (
            <div className="space-y-2">
              <Badge className="bg-green-500 text-white">
                <CheckCircle className="h-3 w-3 mr-1" />
                Yüklendi: {uploadedFiles[type]!.name}
              </Badge>
              <div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const input = document.createElement("input")
                    input.type = "file"
                    input.accept = accept
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0]
                      if (file) handleFileUpload(type, file)
                    }
                    input.click()
                  }}
                >
                  Değiştir
                </Button>
              </div>
            </div>
          ) : (
            <Button
              variant="outline"
              onClick={() => {
                const input = document.createElement("input")
                input.type = "file"
                input.accept = accept
                input.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0]
                  if (file) handleFileUpload(type, file)
                }
                input.click()
              }}
            >
              <Upload className="h-4 w-4 mr-2" />
              Dosya Seç
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">TC Kimlik Doğrulama</h1>
          <p className="text-muted-foreground">Güvenli alışveriş için TC kimlik doğrulamanızı tamamlayın</p>
        </div>

        {/* Status Overview */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`h-12 w-12 rounded-full ${currentStatus.color} flex items-center justify-center`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{currentStatus.label}</h2>
                  <p className="text-muted-foreground">{currentStatus.description}</p>
                </div>
              </div>
              <Badge className={`${currentStatus.color} text-white`}>{currentStatus.label}</Badge>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>İlerleme</span>
                <span>{getProgressValue()}%</span>
              </div>
              <Progress value={getProgressValue()} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Verification Steps */}
        {verificationStatus === "pending" && (
          <div className="space-y-8">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Kişisel Bilgiler
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tcNumber">TC Kimlik No</Label>
                    <Input
                      id="tcNumber"
                      value={formData.tcNumber}
                      onChange={(e) => setFormData({ ...formData, tcNumber: e.target.value })}
                      maxLength={11}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Ad Soyad</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="birthDate">Doğum Tarihi</Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-posta</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Adres</Label>
                  <Textarea
                    id="address"
                    placeholder="Tam adresinizi girin..."
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Document Upload */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Belge Yükleme</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FileUploadCard
                  title="TC Kimlik Ön Yüz"
                  description="Kimlik kartınızın ön yüzünü net bir şekilde çekin"
                  type="frontId"
                  icon={FileText}
                  accept="image/*"
                />

                <FileUploadCard
                  title="TC Kimlik Arka Yüz"
                  description="Kimlik kartınızın arka yüzünü net bir şekilde çekin"
                  type="backId"
                  icon={FileText}
                  accept="image/*"
                />

                <FileUploadCard
                  title="Selfie Fotoğraf"
                  description="Kimlik kartınızı tutarak selfie çekin"
                  type="selfie"
                  icon={Camera}
                  accept="image/*"
                />
              </div>
            </div>

            {/* Additional Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Ek Notlar (Opsiyonel)</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Doğrulama süreciyle ilgili eklemek istediğiniz notlar..."
                  value={formData.additionalNotes}
                  onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                  rows={3}
                />
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={handleSubmit}
                disabled={!uploadedFiles.frontId || !uploadedFiles.backId || !uploadedFiles.selfie}
                className="px-8"
              >
                <Shield className="h-5 w-5 mr-2" />
                Doğrulama İçin Gönder
              </Button>
            </div>
          </div>
        )}

        {/* Under Review Status */}
        {verificationStatus === "under-review" && (
          <Card>
            <CardContent className="p-8 text-center">
              <Clock className="h-16 w-16 text-blue-500 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-4">Belgeleriniz İnceleniyor</h2>
              <p className="text-muted-foreground mb-6">
                Moderatörlerimiz belgelerinizi inceliyor. Bu işlem genellikle 24-48 saat sürmektedir.
              </p>
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  İnceleme sürecinde belgelerinizde herhangi bir sorun tespit edilirse size bildirilecektir.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )}

        {/* Approved Status */}
        {verificationStatus === "approved" && (
          <Card className="border-green-200 bg-green-50/50">
            <CardContent className="p-8 text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-4 text-green-700">Doğrulama Tamamlandı!</h2>
              <p className="text-muted-foreground mb-6">
                TC kimlik doğrulamanız başarıyla tamamlandı. Artık tüm platform özelliklerini kullanabilirsiniz.
              </p>
              <div className="flex justify-center gap-4">
                <Button asChild>
                  <a href="/marketplace">Marketplace'e Git</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/boost">Boost Hizmetleri</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Rejected Status */}
        {verificationStatus === "rejected" && (
          <Card className="border-red-200 bg-red-50/50">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold mb-4 text-red-700">Doğrulama Reddedildi</h2>
                <p className="text-muted-foreground">
                  Belgelerinizde sorun tespit edildi. Lütfen aşağıdaki nedenleri kontrol ederek tekrar deneyin.
                </p>
              </div>

              <Alert className="mb-6">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Red Nedenleri:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Kimlik kartı fotoğrafı net değil</li>
                    <li>Selfie fotoğrafında kimlik kartı görünmüyor</li>
                    <li>Kişisel bilgiler kimlik kartıyla uyuşmuyor</li>
                  </ul>
                </AlertDescription>
              </Alert>

              <div className="text-center">
                <Button onClick={() => setVerificationStatus("pending")}>
                  <Upload className="h-4 w-4 mr-2" />
                  Tekrar Dene
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Help Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Yardım ve İpuçları</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Fotoğraf Çekme İpuçları:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Fotoğrafları iyi ışıkta çekin</li>
                  <li>• Kimlik kartının tüm köşeleri görünür olsun</li>
                  <li>• Bulanık veya gölgeli fotoğraf çekmeyin</li>
                  <li>• Selfie'de kimlik kartını net tutun</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Güvenlik:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Belgeleriniz güvenli şekilde saklanır</li>
                  <li>• Sadece doğrulama için kullanılır</li>
                  <li>• 3. taraflarla paylaşılmaz</li>
                  <li>• İşlem sonrası silinir</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
