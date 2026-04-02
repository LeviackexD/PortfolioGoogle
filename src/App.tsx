import { useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import BackToTop from './components/BackToTop';
import Preloader from './components/Preloader';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // Estado que indica cuando todo el preload ha terminado y las animaciones pueden iniciar
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Inicialización de Lenis para un scroll suave y fluido
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Función de animación para Lenis (Request Animation Frame)
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Conexión de Lenis con GSAP ScrollTrigger para sincronizar animaciones
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Refresca ScrollTrigger después de un breve retraso para asegurar mediciones correctas
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    // Comportamiento de scroll suave para enlaces de anclaje (#) usando Lenis
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(anchor.hash);
        if (targetElement) {
          lenis.scrollTo(targetElement as HTMLElement, {
            offset: 0,
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // Manejo del cambio de tamaño de ventana para recalcular posiciones de scroll
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    // Limpieza al desmontar el componente
    return () => {
      lenis.destroy();
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  /**
   * Manejador de finalización del preloader
   * Se ejecuta cuando el preloader ha terminado su animación y se está ocultando
   * Esperamos 300ms adicionales para que la transición de salida del preloader termine
   * antes de iniciar las animaciones del Hero (para que se vea la rotación 3D)
   */
  const handlePreloaderComplete = () => {
    setIsLoading(false);
    // Retraso adicional para asegurar que el preloader ha salido completamente de la pantalla
    setTimeout(() => {
      setIsLoaded(true);
    }, 300);
  };

  return (
    <main className="bg-[#0a0a0a] text-white selection:bg-orange-500 selection:text-white">
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader key="preloader" onComplete={handlePreloaderComplete} />
        )}
      </AnimatePresence>

      {/* Componentes globales y secciones de la página */}
      <CustomCursor />
      <BackToTop />
      <Navbar />
      {/* Pasamos isLoaded al Hero para controlar el inicio de sus animaciones */}
      <Hero isLoaded={isLoaded} />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </main>
  );
}
