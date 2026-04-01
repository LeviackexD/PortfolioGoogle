import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    
    // Estado inicial para evitar parpadeos (FOUC)
    gsap.set('.char', { y: 100, opacity: 0 });
    gsap.set(subRef.current, { y: 20, opacity: 0 });

    // Animación de las "blobs" de fondo (manchas de color difuminadas)
    gsap.to('.blob', {
      x: 'random(-50, 50)',
      y: 'random(-50, 50)',
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 2
    });

    // Línea de tiempo para la entrada del texto principal
    tl.to('.char', {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.03,
      ease: 'expo.out',
    })
    // Entrada del subtítulo
    .to(subRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
    }, '-=0.8')
    // Animación del indicador de scroll
    .from('.scroll-indicator', {
      opacity: 0,
      y: -20,
      duration: 1,
      repeat: -1,
      yoyo: true,
    }, '-=0.5');

    // Efecto Parallax para el texto gigante de fondo
    gsap.to('.bg-text-hero', {
      scrollTrigger: {
        trigger: container.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      x: -200,
      ease: 'none'
    });
  }, { scope: container });

  // Función para dividir el texto en caracteres individuales para animarlos
  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="char inline-block whitespace-pre">
        {char}
      </span>
    ));
  };

  return (
    <section ref={container} className="relative h-screen w-full flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden px-6">
      {/* Texto de fondo con efecto parallax */}
      <div className="bg-text-hero absolute top-1/2 left-0 -translate-y-1/2 text-[25vw] font-black text-white/[0.02] whitespace-nowrap pointer-events-none select-none uppercase will-change-transform">
        HELLO HELLO HELLO
      </div>
      
      {/* Elementos visuales de fondo (blobs) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="blob absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[150px]" />
        <div className="blob absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px]" />
      </div>

      {/* Contenido principal: Título y Subtítulo */}
      <div className="z-10 text-center">
        <h1 className="text-[12vw] md:text-[10vw] font-black leading-[0.8] tracking-tighter text-white uppercase mb-12 select-none">
          <div className="overflow-hidden py-2">
            {splitText('CREATIVE')}
          </div>
          <div className="overflow-hidden py-2">
            <span className="text-orange-500">{splitText('DEVELOPER')}</span>
          </div>
        </h1>
        
        <div ref={subRef} className="max-w-2xl mx-auto">
          <p className="text-lg md:text-xl text-gray-400 font-light tracking-[0.2em] uppercase">
            Crafting digital <span className="text-white font-medium italic font-serif">masterpieces</span> through <span className="text-white font-medium">code</span>.
          </p>
        </div>
      </div>

      {/* Indicador de scroll inferior */}
      <div className="scroll-indicator absolute bottom-10 flex flex-col items-center gap-2 text-gray-500">
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll Down</span>
        <ArrowDown size={16} />
      </div>
    </section>
  );
}
