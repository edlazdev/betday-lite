# BetDay Lite

Reto técnico: aplicación de apuestas simuladas (mercado 1x2) con Next.js 15, App Router, React 18, TypeScript y Tailwind.

## Stack

| Capa | Tecnología |
|------|------------|
| Framework | Next.js **15** (App Router) |
| UI | React **18**, TypeScript **5** |
| Estilos | Tailwind CSS **4** |
| Auth | **NextAuth v5** (Auth.js), proveedor **Credentials**, sesión **JWT** |
| Lint | ESLint **9** + `eslint-config-next` vía **FlatCompat** (`eslint.config.mjs`) |

## Estructura del proyecto

```
src/
├── app/                      # App Router
│   ├── layout.tsx            # Layout global, Header, ToastProvider
│   ├── page.tsx              # Home (timeline)
│   ├── loading.tsx           # Skeleton global
│   ├── login/page.tsx        # Login credentials
│   ├── profile/              # Mis apuestas + loading.tsx
│   ├── bets/[betId]/         # Detalle apuesta + loading.tsx
│   └── api/
│       ├── auth/[...nextauth]/route.ts
│       └── bets/
│           ├── route.ts      # GET lista, POST crear
│           └── [betId]/route.ts  # GET detalle, DELETE cancelar
├── components/
│   ├── Header.tsx, UserMenu.tsx
│   ├── HomeTimeline.tsx, MatchCarousel.tsx, MatchCard.tsx, BetCard.tsx
│   ├── providers/ToastProvider.tsx
│   └── ui/shared/            # Card, CardHeader, Carousel, OddsButton, ToastContainer
├── data/matches.today.json   # Partidos del día (mock)
├── lib/
│   ├── constants.ts          # Rutas, labels, mensajes UI
│   ├── helpers.ts            # getOddByPick, formatMatchTime, truncateText, getInitials
│   ├── matches-data.ts       # Lectura JSON + agrupación por hora
│   ├── bets-session.ts       # Lógica de apuestas + cookie httpOnly
│   └── internal-fetch.ts     # Fetch interno reenviando Cookie (RSC → API)
├── auth.ts / auth.config.ts  # NextAuth (Credentials + callbacks)
├── middleware.ts             # Protección /profile y /bets/*
└── types/index.ts            # Dominio + props de componentes
```

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Home: timeline del día con eventos por hora, CTA apostar 1/x/2 |
| `/profile` | Perfil: apuestas del usuario (protegida) |
| `/bets/[betId]` | Detalle de una apuesta |

## Cómo ejecutar

```bash
npm install
cp .env.example .env.local
# Editar .env.local y definir AUTH_SECRET (ej: openssl rand -base64 32)
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

**Login demo:** `demo@betday.dev` / `demo123` (configurable con `DEMO_USER_EMAIL` y `DEMO_USER_PASSWORD` en `.env.local`).

## Datos (simulación)

- **`src/data/matches.today.json`**: partidos del día (`date`, `timezone`, `matches[]`) con liga, equipos y cuotas 1X2 (`home`, `draw`, `away`).
- Las apuestas se persisten en una **cookie httpOnly** ligada al usuario de NextAuth (`betday_bets_<userId>`), ver `lib/bets-session.ts`. Sobrevive al reinicio del servidor; límite práctico ~4 KB por cookie 

Los tipos en `src/types/index.ts` reflejan la estructura de partidos y apuestas para API routes y componentes.

## Store (estado)

- Partidos: `lib/matches-data.ts` (JSON + Server Components en Home).
- Apuestas: cookie + `lib/bets-session.ts`; API `GET`/`POST` `/api/bets` y `GET`/`DELETE` `/api/bets/[betId]` leen/escriben la cookie según `auth()`. Los Server Components que llaman a la API usan `internalFetch` (`lib/internal-fetch.ts`) para reenviar la cabecera `Cookie`.

## Despliegue en Vercel

- **Variable obligatoria en producción:** `AUTH_SECRET` (generar con `openssl rand -base64 32`).
- Opcionales: `AUTH_URL`, `DEMO_USER_EMAIL`, `DEMO_USER_PASSWORD`.



