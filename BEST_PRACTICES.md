# 🎯 Best Practices & Рекомендации по поддержке проекта

## 📚 Содержание
1. [Структура проекта](#структура-проекта)
2. [HTML рекомендации](#html-рекомендации)
3. [CSS рекомендации](#css-рекомендации)
4. [JavaScript рекомендации](#javascript-рекомендации)
5. [Производительность](#производительность)
6. [Доступность](#доступность)
7. [SEO оптимизация](#seo-оптимизация)

---

## 🗂️ Структура проекта

### Текущая организация:
```
/project
├── HTML файлы (главная, страницы)
├── /assets
│   ├── /css/main.css          (все стили)
│   ├── /js/main.js            (весь JavaScript)
│   ├── /img                   (изображения)
│   └── /fonts                 (шрифты)
├── Документация (markdown файлы)
├── robots.txt
└── sitemap.xml
```

### ✅ Правила организации файлов:
- **HTML в корне** — для коротких URL (например: `/about.html`)
- **Assets в папке** — `assets/` для всех ресурсов
- **Один CSS файл** — `assets/css/main.css` (все стили)
- **Один JS файл** — `assets/js/main.js` (весь код)
- **Изображения** — `assets/img/` с логичной структурой
- **Шрифты** — `assets/fonts/` если используются кастомные

---

## 📄 HTML рекомендации

### ✅ Правильная структура:
```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Краткое описание для SEO">
  <title>Название страницы — Компания</title>
  
  <!-- Performance -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="dns-prefetch" href="https://example.com">
  <link rel="stylesheet" href="assets/css/main.css">
</head>
<body>
  <header>...</header>
  <main>...</main>
  <footer>...</footer>
  
  <script src="assets/js/main.js" defer></script>
</body>
</html>
```

### 📋 Семантические теги:
- `<header>` — шапка/навигация
- `<nav>` — меню навигации
- `<main>` — основной контент
- `<section>` — разделы контента
- `<article>` — статьи, карточки, поесты
- `<aside>` — боковая панель, сайдбар
- `<footer>` — подвал сайта
- `<figure>` + `<figcaption>` — изображения с подписями

### ♿ ARIA атрибуты:
```html
<!-- Для кнопок и ссылок -->
<a href="#" aria-label="Описание для экрана">
  <span aria-hidden="true">Иконка</span> Текст
</a>

<!-- Для активных элементов меню -->
<a href="current-page" aria-current="page">Текущая страница</a>

<!-- Для списков -->
<div role="list">
  <div role="listitem">Элемент 1</div>
  <div role="listitem">Элемент 2</div>
</div>
```

### 🖼️ Изображения:
```html
<!-- С ленивой загрузкой -->
<img src="image.jpg" alt="Описание" loading="lazy" decoding="async">

<!-- Responsive images -->
<img srcset="image-small.jpg 640w,
            image-medium.jpg 960w,
            image-large.jpg 1440w"
     sizes="(max-width: 640px) 100vw,
            (max-width: 960px) 50vw,
            33vw"
     src="image.jpg" alt="Описание">
```

---

## 🎨 CSS рекомендации

### ✅ Использование CSS переменных:

**Определение в :root**
```css
:root {
  /* Цвета */
  --bg: #ffffff;
  --text: #1a202c;
  --accent: #16a34a;
  
  /* Типографика */
  --font: "Inter", system-ui, sans-serif;
  --fs-body: 1rem;
  --fs-h1: 1.75rem;
  
  /* Отступы (8px шкала) */
  --s-2: 0.5rem;   /* 8px */
  --s-4: 1rem;     /* 16px */
  --s-6: 1.5rem;   /* 24px */
  
  /* Радиусы */
  --radius: 12px;
  --radius-sm: 8px;
}
```

**Использование**
```css
.button {
  background: var(--accent);
  color: var(--bg);
  padding: var(--s-4);
  border-radius: var(--radius);
  font-family: var(--font);
}
```

### 📐 Сетка (Grid/Flex):
```css
/* Адаптивная сетка */
.grid { display: grid; gap: 1.25rem; }
.grid.two { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.grid.three { grid-template-columns: repeat(3, minmax(0, 1fr)); }

/* Медиа-запросы для сетки */
@media (max-width: 960px) {
  .grid.three { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .grid.two, .grid.three { grid-template-columns: 1fr; }
}
```

### 🎯 Правила модификации стилей:
1. **BEM нотация** для классов:
   ```css
   .card { }              /* Блок */
   .card__header { }      /* Элемент */
   .card--featured { }    /* Модификатор */
   ```

2. **Не удалять неиспользуемые классы** — они могут понадобиться в будущем

3. **Добавлять комментарии** для сложных селекторов:
   ```css
   /* Hero section — главный баннер */
   .hero { }
   
   /* Animations & Transitions */
   @keyframes fadeInUp { }
   ```

---

## 🔧 JavaScript рекомендации

### ✅ Структура кода:

**Группировка по модулям**
```javascript
// 1. Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initHeader();
    initNavigation();
    initForms();
});

// 2. Отдельные функции для каждого компонента
function initHeader() { }
function initNavigation() { }
function initForms() { }
```

**JSDoc комментарии**
```javascript
/**
 * Инициализирует мобильную навигацию
 * @description Создает кнопку меню и добавляет обработчики событий
 * @returns {void}
 */
function initMobileNav() {
    // Реализация
}
```

### 🛡️ Best Practices:

1. **Всегда проверяй наличие элемента:**
   ```javascript
   const element = document.querySelector('.some-element');
   if (!element) return;  // Защита от ошибок
   ```

2. **Используй event delegation:**
   ```javascript
   document.addEventListener('click', function(e) {
       if (e.target.matches('.button')) {
           handleButtonClick(e.target);
       }
   });
   ```

3. **Избегай глобальных переменных:**
   ```javascript
   // ❌ Плохо
   const myVar = 'value';
   
   // ✅ Хорошо
   (function() {
       const myVar = 'value';
   })();
   ```

4. **Используй const/let вместо var:**
   ```javascript
   // ✅ Хорошо
   const fixed = 'не изменится';
   let changeable = 'может измениться';
   ```

### 📦 Минификация (для продакшена):

```bash
# Установка terser
npm install -D terser

# Минификация
terser input.js -o output.min.js
```

---

## ⚡ Производительность

### 📊 Метрики для отслеживания:

```
Lighthouse Score:
✅ Performance > 90
✅ Accessibility > 90  
✅ Best Practices > 85
✅ SEO > 95
```

### 🔍 Инструменты для проверки:
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)
- Встроенный Lighthouse в Chrome DevTools

### 💡 Оптимизация изображений:

**Инструменты сжатия:**
- ImageOptim (macOS)
- TinyPNG / TinyJPG (онлайн)
- ImageMagick (command line)
- ffmpeg (видео)

**Форматы:**
- **PNG** — для графики с прозрачностью
- **JPG** — для фото (качество 75-85%)
- **WebP** — современный формат (+ JPG fallback)
- **SVG** — для иконок и логотипов

### ⏱️ Кэширование (backend):

```
# .htaccess для Apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

---

## ♿ Доступность

### 🔑 Клавиатурная навигация:
- `Tab` — переход между элементами
- `Enter` — активация ссылок/кнопок
- `Esc` — закрытие модалов/меню
- `Стрелки` — навигация по спискам/галерее

### 📣 Экраны читающие (Screen readers):
```html
<!-- Скрыто от читающих -->
<span aria-hidden="true">→</span>

<!-- Видимо только для читающих -->
<span class="sr-only">Перейти на страницу</span>

<!-- Живая область для уведомлений -->
<div role="status" aria-live="polite">
  Ваша заявка отправлена!
</div>
```

### 🎨 Контрастность:
- Минимум: 4.5:1 для обычного текста
- Минимум: 3:1 для крупного текста
- Инструмент: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

### 🔍 Проверка:
- Lighthouse accessibility score
- axe DevTools (Chrome extension)
- WAVE (WebAIM)

---

## 🔍 SEO оптимизация

### ✅ Обязательные элементы:

**Title tag**
```html
<title>Основное ключевое слово — Компания</title>
<!-- Длина: 50-60 символов -->
```

**Meta description**
```html
<meta name="description" content="Первые 160 символов контента для выдачи.">
<!-- Длина: 150-160 символов -->
```

**Headings иерархия**
```html
<h1>Одна H1 на странице</h1>
<h2>Секция</h2>
<h3>Подсекция</h3>
<!-- Не пропускать уровни! -->
```

**Schema.org разметка**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "OcOO Biohitech",
  "url": "https://ocoo.com",
  "logo": "https://ocoo.com/logo.png",
  "sameAs": [
    "https://facebook.com/ocoo",
    "https://twitter.com/ocoo"
  ]
}
</script>
```

### 📱 Open Graph теги:
```html
<meta property="og:title" content="Заголовок">
<meta property="og:description" content="Описание">
<meta property="og:image" content="https://example.com/image.jpg">
<meta property="og:url" content="https://example.com">
<meta property="og:type" content="website">
```

### 🤖 robots.txt:
```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /private

Sitemap: https://example.com/sitemap.xml
```

### 📍 Внутренняя ссылочная структура:
- Каждая страница должна быть доступна из меню
- Использовать anchor links внутри длинных страниц
- Связывать релевантные страницы в контенте

---

## 🚀 Чек-лист перед деплоем

- [ ] Все ссылки работают (включая якоря)
- [ ] Нет консольных ошибок (F12 → Console)
- [ ] Все изображения загружаются
- [ ] Формы отправляют данные
- [ ] Мобильная версия выглядит хорошо
- [ ] Lighthouse score > 90
- [ ] SSL сертификат установлен (HTTPS)
- [ ] robots.txt и sitemap.xml настроены
- [ ] Analytics интегрирован
- [ ] Backup сделан

---

## 📖 Полезные ресурсы

### Документация:
- [MDN Web Docs](https://developer.mozilla.org/)
- [Can I Use](https://caniuse.com/) — поддержка браузерами
- [CSS-Tricks](https://css-tricks.com/) — туториалы CSS

### Инструменты:
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- [VS Code Extensions](https://code.visualstudio.com/docs/editor/extension-marketplace)
- [Git Tutorial](https://git-scm.com/doc) — версионирование

### Performance:
- [Web.dev Performance](https://web.dev/performance/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

---

**Успехов в развитии проекта! 🎉**

*Поддерживай код чистым, документацию актуальной, и производительность высокой!*
