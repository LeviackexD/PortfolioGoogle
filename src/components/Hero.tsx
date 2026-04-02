import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowDown } from 'lucide-react';

// Registramos el plugin ScrollTrigger para poder usar animaciones basadas en scroll
gsap.registerPlugin(ScrollTrigger);

// Array de caracteres que se usan para el efecto glitch (simbolos aleatorios)
const GLITCH_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~';

/**
 * Props del componente Hero
 * @param isLoaded - Indica si el preloader ha terminado y las animaciones deben iniciar
 */
interface HeroProps {
  isLoaded?: boolean;
}

/**
 * Componente Hero - Sección principal del portfolio con efectos creativos GSAP
 * 
 * Efectos implementados:
 * 1. Entrada con stagger aleatorio - Las letras aparecen desde abajo en orden aleatorio
 * 2. Onda flotante continua - Cada letra flota independientemente como si estuviera en el agua
 * 3. Glitch aleatorio - Caracteres que parpadean y cambian a símbolos cada pocos segundos
 * 4. Hover magnético - Las letras reaccionan al cursor escalando y brillando
 */
export default function Hero({ isLoaded = false }: HeroProps) {
  // Ref para el contenedor principal del hero (necesario para scoping de GSAP)
  const container = useRef<HTMLDivElement>(null);
  // Ref para el subtítulo (para animar su entrada)
  const subRef = useRef<HTMLDivElement>(null);
  // Array de refs para cada carácter individual - nos permite animar cada letra por separado
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);
  // Ref para guardar la posición del mouse (para efectos interactivos futuros)
  const mouseRef = useRef({ x: 0, y: 0 });

  /**
   * Función para dividir un texto en caracteres individuales (span elements)
   * Cada span tiene:
   * - Un ref para poder acceder al elemento DOM
   * - data-original para guardar el carácter original (para el efecto glitch)
   * - will-change-transform para optimización de GPU
   * 
   * @param text - El texto a dividir
   * @param lineIndex - Índice de la línea (0 para CREATIVE, 1 para DEVELOPER)
   *                    Se multiplica por 100 para evitar colisiones de índice
   */
  const splitText = (text: string, lineIndex: number) => {
    return text.split('').map((char, i) => (
      <span
        key={`${lineIndex}-${i}`}
        ref={(el) => {
          // Guardamos la referencia al elemento en el array
          // Usamos lineIndex * 100 + i para tener espaciado entre líneas
          if (el) charsRef.current[lineIndex * 100 + i] = el;
        }}
        className="char inline-block whitespace-pre will-change-transform"
        data-original={char}  // Guardamos el carácter original para poder restaurarlo tras glitch
      >
        {char}
      </span>
    ));
  };

  /**
   * Efecto 1: GLITCH ALEATORIO
   * 
   * Cada 2-3.5 segundos, selecciona aleatoriamente 1-3 caracteres
   * y les aplica una secuencia de glitch:
   * - Cambia el carácter a un símbolo aleatorio
   * - Aplica movimiento aleatorio (shake)
   * - Oscila la opacidad
   * - Restaura el carácter original
   * 
   * Esto crea el efecto de "fallo digital" estilo cyberpunk
   */
  useEffect(() => {
    // Configuramos un intervalo que se ejecuta cada 1.5 segundos + un valor aleatorio (0-1s)
    // Esto hace que el glitch sea más frecuente y visible
    const glitchInterval = setInterval(() => {
      // Filtramos solo los elementos que existen (no null)
      const availableChars = charsRef.current.filter(Boolean);
      if (availableChars.length === 0) return;
      
      // Seleccionamos entre 1 y 5 caracteres aleatorios para aplicar glitch (más visibilidad)
      const numToGlitch = Math.floor(Math.random() * 5) + 1;
      const targets: HTMLSpanElement[] = [];
      
      // Seleccionamos caracteres aleatorios sin repetir
      for (let i = 0; i < numToGlitch; i++) {
        const randomIndex = Math.floor(Math.random() * availableChars.length);
        const target = availableChars[randomIndex];
        if (target && !targets.includes(target)) {
          targets.push(target);
        }
      }

      // Aplicamos la animación de glitch a cada carácter seleccionado
      targets.forEach((target) => {
        const original = target.dataset.original || target.textContent || '';
        const glitchChar = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        
        // Timeline GSAP para la secuencia de glitch (4 pasos de 100ms cada uno)
        // Más lento para mayor visibilidad del efecto
        const tl = gsap.timeline();
        tl.to(target, {
          opacity: 0.3,
          x: gsap.utils.random(-3, 3),  // Movimiento aleatorio en X
          y: gsap.utils.random(-3, 3),  // Movimiento aleatorio en Y
          duration: 0.1,  // 100ms (más lento)
        })
        // Cambiamos el texto al carácter de glitch
        .call(() => { target.textContent = glitchChar; })
        .to(target, {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.1,  // 100ms
        })
        // Preparación para restaurar
        .to(target, {
          opacity: 0.3,
          duration: 0.1,  // 100ms
          onComplete: () => { target.textContent = original; }
        })
        // Volvemos a opacidad normal
        .to(target, {
          opacity: 1,
          duration: 0.1,  // 100ms
        });
      });
    }, 1500 + Math.random() * 1000);  // 1.5-2.5 segundos entre glitches

    // Limpiamos el intervalo cuando el componente se desmonte
    return () => clearInterval(glitchInterval);
  }, []);

  /**
   * Tracking del mouse
   * Guardamos la posición actual del cursor relativa al contenedor
   * Esto está preparado para futuras interacciones magnéticas globales
   */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!container.current) return;
      const rect = container.current.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    // passive: true para mejor rendimiento (no bloquea el hilo principal)
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  /**
   * HOOK PRINCIPAL DE ANIMACIONES GSAP
   * 
   * useGSAP nos permite ejecutar código GSAP cuando el componente se monta
   * { scope: container } limita el scope a este componente para mejor performance
   * 
   * IMPORTANTE: Las dependencias [isLoaded] hacen que este hook se re-ejecute
   * cuando isLoaded cambie de false a true (cuando el preloader termina)
   * Esto asegura que la animación de entrada 3D se vea completamente
   */
  useGSAP(() => {
    // Si el preloader no ha terminado, NO iniciamos las animaciones de entrada
    // Solo configuramos el estado inicial para que el contenido esté oculto
    if (!isLoaded) {
      // Estado inicial: caracteres ocultos y desplazados hacia abajo
      gsap.set('.char', { y: 50, opacity: 0 });
      // Subtítulo también oculto
      gsap.set(subRef.current, { y: 20, opacity: 0 });
      return; // Salimos sin iniciar animaciones
    }

    const tl = gsap.timeline();

    // ============================================================================
    // ANIMACIÓN DE ENTRADA - Timeline principal (solo se ejecuta cuando isLoaded es true)
    // ============================================================================
    
    // Paso 1: Caracteres entrantes con stagger aleatorio
    // from: 'random' hace que las letras aparezcan en orden aleatorio, no de izquierda a derecha
    tl.to('.char', {
      y: 0,           // Posición final
      opacity: 1,     // Visible
      duration: 1.4,
      stagger: {
        each: 0.03,           // 30ms entre cada carácter
        from: 'random',      // Orden aleatorio para efecto más dinámico
      },
      ease: 'expo.out',       // Easing exponencial out = rápido al principio, lento al final
    })
    // Paso 2: Entrada del subtítulo (empieza 0.8s antes de terminar la anterior)
    .to(subRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
    }, '-=0.8')
    // Paso 3: Animación del indicador de scroll (loop infinito)
    .from('.scroll-indicator', {
      opacity: 0,
      y: -20,
      duration: 1,
      repeat: -1,    // Infinito
      yoyo: true,    // Va y vuelve
    }, '-=0.5');

    // ============================================================================
    // EFECTO 2: ONDA FLOTANTE CONTINUA (Idle Animation)
    // ============================================================================
    // Cada letra flota independientemente con movimiento sinusoidal
    // Esto crea un efecto "orgánico" como si las letras estuvieran suspendidas en agua
    charsRef.current.forEach((char, i) => {
      if (!char) return;
      gsap.to(char, {
        y: 'random(-8, 8)',      // Movimiento vertical aleatorio entre -8 y 8px
        rotateZ: 'random(-3, 3)', // Ligera rotación aleatoria
        duration: 'random(2, 3)',  // Cada letra tiene su propia duración (2-3s)
        repeat: -1,                // Infinito
        yoyo: true,                // Va y vuelve
        ease: 'sine.inOut',        // Easing sinusoidal para movimiento suave
        delay: i * 0.05,           // Stagger basado en índice para efecto de onda
      });
    });

    // ============================================================================
    // EFECTO 3: HOVER MAGNÉTICO
    // ============================================================================
    // Cada letra reacciona individualmente al pasar el cursor por encima
    charsRef.current.forEach((char) => {
      if (!char) return;

      // Evento: Mouse entra en la letra
      char.addEventListener('mouseenter', () => {
        gsap.to(char, {
          scale: 1.3,                                    // Escala al 130%
          color: '#f97316',                              // Color naranja (orange-500)
          textShadow: '0 0 20px rgba(249, 115, 22, 0.8)', // Brillo naranja
          duration: 0.3,
          ease: 'back.out(2)',                           // Easing elástico con rebote
        });
      });

      // Evento: Mouse sale de la letra
      char.addEventListener('mouseleave', () => {
        gsap.to(char, {
          scale: 1,
          // Restauramos el color original: si es espacio no hay color,
          // si está en el div naranja mantenemos naranja, si no transparente
          color: char.dataset.original === ' ' ? '' : (char.parentElement?.classList.contains('text-orange-500') ? '#f97316' : ''),
          textShadow: 'none',
          duration: 0.3,
          ease: 'power2.out',
        });
      });
    });

    // ============================================================================
    // EFECTO 4: PARALLAX DEL TEXTO DE FONDO
    // ============================================================================
    // El texto "HELLO HELLO HELLO" de fondo se mueve horizontalmente al hacer scroll
    gsap.to('.bg-text-hero', {
      scrollTrigger: {
        trigger: container.current,  // Elemento que activa el trigger
        start: 'top top',            // Cuando el top del hero llega al top de la ventana
        end: 'bottom top',           // Hasta que el bottom del hero llega al top
        scrub: true,                 // Animación vinculada al scroll (suave)
      },
      x: -200,                       // Se mueve 200px a la izquierda
      ease: 'none',
    });

    // ============================================================================
    // ANIMACIÓN DE BLOBS (ELEMENTOS DE FONDO DIFUMINADOS)
    // ============================================================================
    // Los círculos difuminados de colores se mueven aleatoriamente creando
    // un ambiente vivo y orgánico en el fondo
    gsap.to('.blob', {
      x: 'random(-50, 50)',        // Movimiento horizontal aleatorio ±50px
      y: 'random(-50, 50)',        // Movimiento vertical aleatorio ±50px
      scale: 'random(0.9, 1.1)',   // Escalado sutil entre 90% y 110%
      duration: 10,                 // Movimiento lento de 10 segundos
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 2,                  // Cada blob empieza 2 segundos después del anterior
    });
  }, { scope: container, dependencies: [isLoaded] });

  return (
    // ============================================================================
    // JSX - ESTRUCTURA DEL COMPONENTE
    // ============================================================================
    
    // Contenedor principal: pantalla completa, fondo oscuro, centrado
    <section ref={container} className="relative h-screen w-full flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden px-6">
      
      {/* ------------------------------------------------------------------------- */}
      {/* CAPA 1: TEXTO DE FONDO CON PARALLAX                                       */}
      {/* ------------------------------------------------------------------------- */}
      {/* Texto "MCJ" gigante y repetido, muy transparente (2% opacidad)         */}
      {/* Se mueve con parallax al hacer scroll                                      */}
      <div className="bg-text-hero absolute top-1/2 left-0 -translate-y-1/2 text-[25vw] font-black text-white/[0.02] whitespace-nowrap pointer-events-none select-none uppercase will-change-transform">
        MCJ MCJ MCJ
      </div>

      {/* ------------------------------------------------------------------------- */}
      {/* CAPA 2: TÍTULO PRINCIPAL CON EFECTO GLITCH                                  */}
      {/* ------------------------------------------------------------------------- */}
      {/* Nombre grande con animación de caracteres individuales                      */}
      <div className="relative z-10 text-center mb-8">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-4">
          <div className="overflow-hidden">
            <div className="line-1 flex justify-center">
              {splitText('MANUEL', 0)}
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="line-2 flex justify-center">
              {splitText('CEREZUELA', 1)}
            </div>
          </div>
        </h1>

        {/* Subtítulo profesional */}
        <div ref={subRef} className="text-xl md:text-2xl text-gray-400 mb-8 tracking-widest uppercase">
          Desarrollador Full Stack & Ingeniero de Sistemas
        </div>
      </div>

      {/* ------------------------------------------------------------------------- */}
      {/* CAPA 3: INFORMACIÓN DE CONTACTO                                           */}
      {/* ------------------------------------------------------------------------- */}
      {/* Datos de contacto profesionales                                            */}
      <div className="flex flex-col md:flex-row gap-6 justify-center items-center text-gray-500 text-sm mb-12">
        <div className="flex items-center gap-2">
          <span>📍</span>
          <span>Granada, España</span>
        </div>
        <div className="flex items-center gap-2">
          <span>📧</span>
          <span>manuel.cerezuela4@gmail.com</span>
        </div>
        <div className="flex items-center gap-2">
          <span>📱</span>
          <span>697 320 916</span>
        </div>
      </div>

      {/* ------------------------------------------------------------------------- */}
      {/* CAPA 4: INDICADOR DE SCROLL                                               */}
      {/* ------------------------------------------------------------------------- */}
      {/* Flecha animada que indica al usuario que puede hacer scroll hacia abajo   */}
      <div className="scroll-indicator absolute bottom-10 flex flex-col items-center gap-2 text-gray-500">
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll Down</span>
        <ArrowDown size={16} />
      </div>
    </section>
  );
}

