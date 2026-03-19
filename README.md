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
├── lib/                    # Utilidades, stores, datos (matches-data, bets-store)
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
- Las apuestas del usuario se guardan solo en memoria (sesión) en `lib/bets-store.ts`; no hay JSON inicial.

Los tipos en `src/types/index.ts` reflejan la estructura de partidos y apuestas para API routes y componentes.

## Store (estado)

- Partidos: `lib/matches-data.ts` (JSON + Server Components en Home).
- Apuestas: `lib/bets-store.ts` (memoria) vía `GET`/`POST` `/api/bets`, `GET`/`DELETE` `/api/bets/[betId]`. Profile y detalle de apuesta cargan datos con `fetch` a esas rutas (misma instancia del store que las API en dev).

## Despliegue en Vercel

- **Variable obligatoria en producción:** `AUTH_SECRET` (generar con `openssl rand -base64 32`).
- Opcionales: `AUTH_URL`, `DEMO_USER_EMAIL`, `DEMO_USER_PASSWORD`.



