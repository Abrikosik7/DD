# ⚡ Руководство по Оптимизации и Развертыванию

## 🚀 Быстрые Действия для Улучшения Производительности

### 1. Минификация кода (5 минут)

**CSS минификация:**
```bash
# Использовать cssnano или clean-css
npx cssnano assets/css/main.css > assets/css/main.min.css
```

**JavaScript минификация:**
```bash
# Использовать terser
npx terser assets/js/main.js -o assets/js/main.min.js
```

**Обновить в HTML:**
```html
<!-- До -->
<link rel="stylesheet" href="assets/css/main.css">
<script src="assets/js/main.js" defer></script>

<!-- После -->
<link rel="stylesheet" href="assets/css/main.min.css">
<script src="assets/js/main.min.js" defer></script>
```

---

### 2. Оптимизация Google Fonts (2 минуты)

**Текущее:**
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;650;700;760;800&display=swap" rel="stylesheet">
```

**Оптимизированное (только используемые веса):**
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
```

**Или использовать Variable Font:**
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400..800&display=swap" rel="stylesheet">
```

---

### 3. Кэширование браузера (3 минуты)

**Добавить в .htaccess или nginx конфиг:**

```apache
# .htaccess
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresDefault "access plus 1 month"
  
  ExpiresByType text/html "access plus 1 week"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE text/xml
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE text/javascript
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/xhtml+xml
  AddOutputFilterByType DEFLATE application/rss+xml
</IfModule>
```

---

### 4. Оптимизация изображений (10 минут)

**Установить инструменты:**
```bash
# macOS
brew install imagemagick

# Linux
sudo apt-get install imagemagick

# Windows - скачать с ImageMagick.org
```

**Сжать JPEG:**
```bash
convert input.jpg -quality 80 -strip output.jpg
```

**Сжать PNG:**
```bash
convert input.png -colors 256 output.png
```

**Создать WebP версии:**
```bash
cwebp input.jpg -q 80 -o output.webp
```

**Использовать в HTML:**
```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Описание" loading="lazy">
</picture>
```

---

### 5. Добавить Lazy Loading (2 минуты)

**Для изображений в галерее (уже есть):**
```html
<!-- В gallery.html уже используется -->
<img src="..." alt="..." loading="lazy" decoding="async">
```

**Для иконок SVG:**
```html
<svg loading="lazy" decoding="async">...</svg>
```

---

### 6. Улучшить SEO (10 минут)

**Добавить в головной элемент всех страниц:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#16a34a">
<meta name="description" content="...">
<link rel="canonical" href="https://ocootech.kg/page.html">
<link rel="alternate" hreflang="ru" href="https://ocootech.kg/page.html">

<!-- Open Graph для соцсетей -->
<meta property="og:type" content="website">
<meta property="og:title" content="OcOO Biohitech">
<meta property="og:description" content="...">
<meta property="og:image" content="https://ocootech.kg/og-image.png">
<meta property="og:url" content="https://ocootech.kg/">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="OcOO Biohitech">
<meta name="twitter:description" content="...">
<meta name="twitter:image" content="https://ocootech.kg/og-image.png">
```

**Создать robots.txt:**
```text
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /temp/

Sitemap: https://ocootech.kg/sitemap.xml
```

**Создать sitemap.xml:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://ocootech.kg/</loc>
    <lastmod>2026-04-27</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://ocootech.kg/about.html</loc>
    <lastmod>2026-04-27</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://ocootech.kg/services.html</loc>
    <lastmod>2026-04-27</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://ocootech.kg/gallery.html</loc>
    <lastmod>2026-04-27</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://ocootech.kg/contacts.html</loc>
    <lastmod>2026-04-27</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

---

### 7. Защита формы (CAPTCHA) (15 минут)

**Использовать reCAPTCHA v3:**

1. Получить ключи с https://www.google.com/recaptcha/admin
2. Добавить скрипт перед закрывающим </body>:

```html
<script src="https://www.google.com/recaptcha/api.js" async defer></script>
```

3. Обновить кнопку отправки:

```html
<button class="btn btn--primary" type="submit" onclick="submitContactForm()">
  Отправить заявку
</button>
```

4. Добавить обработчик:

```javascript
function submitContactForm() {
  grecaptcha.execute('YOUR_RECAPTCHA_KEY', {action: 'submit'}).then(function(token) {
    // Отправить форму с токеном
    document.getElementById('feedback').submit();
  });
}
```

---

## 📦 Рекомендуемые Инструменты

### Для тестирования производительности:
- **Google PageSpeed Insights**: https://pagespeed.web.dev
- **GTmetrix**: https://gtmetrix.com
- **WebPageTest**: https://www.webpagetest.org
- **Lighthouse**: встроена в Chrome DevTools

### Для валидации:
- **W3C HTML Validator**: https://validator.w3.org
- **W3C CSS Validator**: https://jigsaw.w3.org/css-validator
- **WAVE (Доступность)**: https://wave.webaim.org

### Для оптимизации:
- **ImageOptim**: https://imageoptim.com (macOS)
- **TinyPNG**: https://tinypng.com (онлайн)
- **Squoosh**: https://squoosh.app (онлайн)

### Для SEO:
- **Screaming Frog**: https://www.screamingfrog.co.uk
- **Semrush**: https://www.semrush.com
- **Ahrefs**: https://ahrefs.com

---

## 🔄 Непрерывное Улучшение

### Мониторинг:
1. Настроить Google Analytics
2. Настроить Google Search Console
3. Настроить Sentry для отслеживания ошибок
4. Настроить CloudFlare для DDoS защиты

### Регулярные Проверки:
- Еженедельно: производительность и ошибки
- Ежемесячно: SEO и поисковые рейтинги
- Ежеквартально: аналитика пользователей

### Тестирование:
- A/B тестирование CTA кнопок
- Тестирование в реальных браузерах
- Мобильное тестирование на реальных устройствах

---

## 📝 Чеклист Перед Запуском

- [ ] Все критические ошибки исправлены
- [ ] CSS и JS минифицированы
- [ ] Изображения оптимизированы
- [ ] Кэширование браузера настроено
- [ ] HTTPS включен
- [ ] robots.txt создан
- [ ] sitemap.xml создан
- [ ] Open Graph теги добавлены
- [ ] reCAPTCHA настроена
- [ ] Google Analytics установлена
- [ ] Search Console верифицирована
- [ ] Backups настроены
- [ ] Мониторинг настроен

---

## 💡 Быстрые Советы

### Для Мобильных Пользователей:
- ✅ Текущее: мобильное меню работает
- 🔄 Тестировать на сетях 3G/4G
- 🔄 Минимизировать размер CSS/JS

### Для SEO:
- ✅ Current: базовые SEO теги добавлены
- 🔄 Добавить Schema.org JSON-LD
- 🔄 Создать FAQ разделы
- 🔄 Добавить внутренние ссылки

### Для Конверсии:
- ✅ Current: CTA кнопки видимы
- 🔄 A/B тест цветов кнопок
- 🔄 Улучшить UX форм
- 🔄 Добавить социальное доказательство

---

**Дата обновления**: 2026-04-27  
**Версия**: 1.0
