# Family Love — Sitio web

Sitio público de **Family Love**: inicio, quiénes somos, programas, proyectos, noticias, voluntariado y cuentas de usuario.
Hecho con **Next.js 14 + React 18 + Tailwind CSS**. Los datos vienen de la API (`family-love-backend`).

## Requisitos
- Node.js 20 o superior
- El backend funcionando (en local: `http://localhost:4000`)

## Empezar
```bash
npm install
cp .env.example .env.local   # en Windows: copy .env.example .env.local
npm run dev                  # http://localhost:3000
```

## Variables de entorno
| Variable | Para qué |
|---|---|
| `NEXT_PUBLIC_API_URL` | URL del backend, por ejemplo `https://api.tudominio.com/api/v1` |
| `NEXT_PUBLIC_ADMIN_URL` | URL del panel (el menú "Dashboard" lleva ahí) |
| `NEXTAUTH_URL` | URL de este sitio |
| `NEXTAUTH_SECRET` | Secreto de la sesión |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Inicio de sesión con Google |

## Cómo funciona la sesión
NextAuth maneja la cookie del navegador, pero **no toca la base de datos**: le pide al backend `POST /auth/login` o `/auth/google`.
El backend responde con un token, que queda en `session.accessToken` y se envía como `Authorization: Bearer ...` en las rutas protegidas (por ejemplo, voluntariado).

## Publicar
Vercel es lo más simple: importa el repositorio, agrega las variables de entorno y publica.
