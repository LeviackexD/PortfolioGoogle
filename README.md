# Portfolio de Manuel Cerezuela

Portfolio personal de desarrollador web con animaciones avanzadas, diseño editorial moderno y experiencia de scroll fluida.

![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)
![Vite](https://img.shields.io/badge/Vite-6-purple)
![Tailwind](https://img.shields.io/badge/Tailwind-4-teal)
![GSAP](https://img.shields.io/badge/GSAP-3.14-green)

## Tecnologías

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **Estilos:** Tailwind CSS 4
- **Animaciones:** GSAP + ScrollTrigger + Lenis (scroll suave)
- **UI:** Lucide React + Framer Motion

## Características

- **Animaciones GSAP avanzadas** con ScrollTrigger para efectos de parallax y revelación
- **Scroll suave con Lenis** para una navegación fluida
- **Cursor personalizado** para mejorar la experiencia interactiva
- **Preloader animado** con transiciones suaves
- **Diseño editorial moderno** con tipografía cuidada
- **Navegación por anclas** con scroll animado
- **Totalmente responsive**

## Secciones

- **Hero:** Presentación principal con animaciones de entrada
- **Sobre mí:** Información personal y trayectoria
- **Proyectos:** Galería de trabajos destacados
- **Habilidades:** Tecnologías y herramientas dominadas
- **Contacto:** Formulario y enlaces de contacto

## Scripts

```bash
npm run dev      # Iniciar servidor de desarrollo
npm run build    # Construir para producción
npm run lint     # Verificar tipos de TypeScript
```

## Estructura

```
src/
├── components/     # Componentes React
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Projects.tsx
│   ├── Skills.tsx
│   ├── Contact.tsx
│   ├── Navbar.tsx
│   ├── Preloader.tsx
│   ├── CustomCursor.tsx
│   └── BackToTop.tsx
├── lib/
│   └── utils.ts    # Utilidades (cn)
├── App.tsx         # Componente principal
├── main.tsx        # Punto de entrada
└── index.css       # Estilos globales
```

## Desarrollo

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Copiar `.env.example` a `.env.local` y configurar variables si es necesario

3. Iniciar desarrollo:
   ```bash
   npm run dev
   ```

4. Abrir [http://localhost:3000](http://localhost:3000)

## Build

```bash
npm run build
```

Los archivos de producción se generan en la carpeta `dist/`.

---

Desarrollado por **Manuel Cerezuela**

