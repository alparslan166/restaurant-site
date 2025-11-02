from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# 🔹 Mac için doğru font yolu (Helvetica)
pdfmetrics.registerFont(TTFont('Helvetica', '/System/Library/Fonts/Supplemental/Helvetica.ttf'))

# 🔹 PDF oluşturulacak dosya yolu
file_path = "/Users/alparslan166/Desktop/menu/Dijital_Menu_Sistemi_Teklifi_TR.pdf"
doc = SimpleDocTemplate(file_path, pagesize=A4)
styles = getSampleStyleSheet()

# 🔹 Varsayılan stillere Helvetica uygula
for style_name in styles.byName:
    styles[style_name].fontName = 'Helvetica'

story = []

# ===================== BAŞLIK =====================
story.append(Paragraph("<b>DİJİTAL MENÜ SİSTEMİ TEKLİFİ</b>", styles["Title"]))
story.append(Spacer(1, 12))

story.append(Paragraph("<b>Firma / Restoran Adı:</b> ____________________________", styles["Normal"]))
story.append(Paragraph("<b>Tarih:</b> ____________________________", styles["Normal"]))
story.append(Paragraph("<b>Hazırlayan:</b> Alparslan Turan", styles["Normal"]))
story.append(Spacer(1, 18))

# ===================== PROJE TANIMI =====================
story.append(Paragraph("<b>Proje Tanımı</b>", styles["Heading2"]))
story.append(Paragraph("""
Restoranınız için özel olarak tasarlanmış, mobil uyumlu ve yönetimi kolay dijital menü sistemi kurulacaktır. 
Bu sistem sayesinde müşteriler menünüzü telefonlarından kolayca görüntüleyebilir, kampanyalar ve fiyat değişiklikleri anlık olarak yayınlanabilir. 
Sistem, restoranınıza özel renkler, logolar ve görsellerle markanıza uygun hale getirilecektir.
""", styles["Normal"]))
story.append(Spacer(1, 12))

# ===================== ÖZELLİKLER =====================
story.append(Paragraph("<b>Sistemin Özellikleri</b>", styles["Heading2"]))
features = [
    ["Mobil Uyumlu Tasarım", "Tüm cihazlarda profesyonel görünüm"],
    ["Kampanya Alanı", "Anlık duyuru ve indirim bandı (örnek: Tatlılar 70 TL)"],
    ["Kategori Sistemi", "Pizza, hamburger, tatlı, içecek vb. alt menüler"],
    ["Ürün Görselleri", "Her ürün için fotoğraf, fiyat, içerik"],
    ["Yönetim Kolaylığı", "Menü değişiklikleri anında güncellenebilir"],
    ["Kendi Alan Adınızla", "İsteğe göre kendi domain (.com veya .com.tr) altında yayınlanır"]
]
table = Table(features, colWidths=[160, 330])
table.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, 0), colors.lightgrey),
    ("BOX", (0, 0), (-1, -1), 1, colors.black),
    ("GRID", (0, 0), (-1, -1), 0.5, colors.grey),
    ("FONTNAME", (0, 0), (-1, -1), "Helvetica"),
]))
story.append(table)
story.append(Spacer(1, 12))

# ===================== TEKLİF BEDELİ =====================
story.append(Paragraph("<b>Teklif Bedeli</b>", styles["Heading2"]))
pricing = [
    ["Hizmet", "Açıklama", "Ücret"],
    ["Sistem Kurulumu ve Tasarım", "Sitenin kurulumu, menü entegrasyonu, özelleştirme", "6.000 TL (tek seferlik)"],
    ["Aylık Bakım ve Güncelleme (Opsiyonel)", "Menü değişikliği, kampanya ekleme, destek", "350 TL / ay"]
]
table2 = Table(pricing, colWidths=[160, 240, 90])
table2.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, 0), colors.lightgrey),
    ("BOX", (0, 0), (-1, -1), 1, colors.black),
    ("GRID", (0, 0), (-1, -1), 0.5, colors.grey),
    ("FONTNAME", (0, 0), (-1, -1), "Helvetica"),
]))
story.append(table2)
story.append(Spacer(1, 12))

# ===================== TESLİM VE ÖDEME =====================
story.append(Paragraph("<b>Teslim Süresi</b>", styles["Heading2"]))
story.append(Paragraph("Proje başlangıcından itibaren 3 iş günü içinde teslim edilecektir.", styles["Normal"]))
story.append(Spacer(1, 12))

story.append(Paragraph("<b>Ödeme Şartları</b>", styles["Heading2"]))
story.append(Paragraph("%50 başlangıçta, kalan %50 proje tesliminde.", styles["Normal"]))
story.append(Spacer(1, 12))

# ===================== GARANTİ =====================
story.append(Paragraph("<b>Garanti ve Destek</b>", styles["Heading2"]))
story.append(Paragraph("""
Sistem kurulumu sonrası 1 ay ücretsiz teknik destek dahildir. 
Bakım planı seçilirse güncellemeler sınırsız şekilde yapılır.
""", styles["Normal"]))
story.append(Spacer(1, 18))

# ===================== İMZA =====================
story.append(Paragraph("<b>Hazırlayan:</b> Alparslan Turan", styles["Normal"]))
story.append(Paragraph("Yazılım Geliştirici", styles["Normal"]))
story.append(Paragraph("Telefon: 0 (5xx) xxx xx xx", styles["Normal"]))
story.append(Paragraph("E-posta: alparslan@example.com", styles["Normal"]))

# ===================== PDF KAYDET =====================
doc.build(story)
print("✅ PDF başarıyla oluşturuldu:", file_path)
