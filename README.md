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
├── data/                   # JSON estáticos (matches.today.json, bets.me.json)
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
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Datos (simulación)

- **`src/data/matches.today.json`**: partidos del día (`date`, `timezone`, `matches[]`) con liga, equipos y cuotas 1X2 (`home`, `draw`, `away`).
- **`src/data/bets.me.json`**: apuestas del usuario (`bets[]`) con `matchId`, `pick` (HOME/DRAW/AWAY), `odd`, `stake`, `status` (PENDING/WON/LOST), `return`.

Los tipos en `src/types/index.ts` reflejan exactamente estos JSON para usarlos en API routes y fetch.

## Store (estado)

El estado de partidos y apuestas vive en **servidor** (`lib/matches-data.ts`, `lib/bets-store.ts`). Las API routes serán la interfaz; las vistas consumen por `fetch` o Server Components.


