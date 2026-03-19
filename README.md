# BetDay Lite

Reto técnico: aplicación de apuestas simuladas (mercado 1x2) con Next.js 15, App Router, React 18, TypeScript y Tailwind.

## Stack

- **Next.js 15** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **NextAuth** (autenticación)

## Estructura del proyecto

```
src/
├── app/                    # App Router: rutas y layouts
│   ├── (routes)/           # Agrupación de rutas (opcional)
│   ├── api/                # API Routes
│   ├── profile/
│   └── bets/[betId]/
├── components/             # Componentes reutilizables
│   ├── ui/                 # Componentes de UI base
│   └── ...                 # EventCard, BetCard, etc.
├── data/                   # JSON estáticos (matches.today.json)
├── lib/                    # Utilidades, datos (matches-data, bets-session, internal-fetch)
├── types/                  # Tipos alineados con la API/JSON
└── ...
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



