# Деплой сайта, домена и почты

Ниже базовая схема для `electric-yerevan.am`.

## 1. Подключить домен к Cloudflare

1. Добавьте домен в Cloudflare.
2. У регистратора замените nameservers на те, что выдаст Cloudflare.
3. Дождитесь активации зоны.

## 2. Поднять сайт в Cloudflare Pages

1. В Cloudflare откройте `Workers & Pages`.
2. Создайте новый `Pages` project из GitHub-репозитория `Electro`.
3. Build command: `npm run build`
4. Build output directory: `dist`
5. После первого деплоя добавьте custom domain:
   - `electric-yerevan.am`
   - `www.electric-yerevan.am` при необходимости

## 3. Настроить входящую почту на домене

Рекомендуемый публичный адрес на сайте:

- `info@electric-yerevan.am`

В `Email Routing`:

1. Включите Email Routing.
2. Создайте правило:
   - custom address: `info`
   - destination inbox: ваш реальный ящик
3. Подтвердите destination inbox по письму от Cloudflare.

## 4. Настроить исходящую почту для формы

Форма отправляет заявки через Cloudflare Email Service API.

Рекомендуемый адрес отправителя:

- `noreply@electric-yerevan.am`

Нужно включить Email Sending и добавить в Pages secrets:

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_EMAIL_API_TOKEN`
- `CONTACT_NOTIFICATION_TO`
- `CONTACT_FROM_EMAIL`

Рекомендуемые значения:

- `CONTACT_NOTIFICATION_TO`: ваш реальный inbox, куда должны падать заявки
- `CONTACT_FROM_EMAIL`: `noreply@electric-yerevan.am`

## 5. Настроить публичные переменные сайта

В Pages variables:

- `VITE_SITE_URL=https://electric-yerevan.am`
- `VITE_CONTACT_EMAIL=info@electric-yerevan.am`
- `VITE_GA_MEASUREMENT_ID=...`
- `VITE_GA_CONSENT_MODE=advanced`

## 6. Что уже сделано в коде

- живая serverless-ручка: `/api/contact`
- отправка формы с фронтенда на backend
- вложения файлов для фото и документов
- валидация полей и ограничение вложений
- публичный email вынесен в `VITE_CONTACT_EMAIL`

## 7. Ограничения

- видео из формы лучше отправлять в WhatsApp, а не через сайт
- лимит вложений в текущей реализации: до 5 файлов и до 3 МБ суммарно
- локальный `vite dev` не поднимает Pages Functions

Для локальной проверки формы:

```bash
npm run dev:pages
```
