import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animación de revelación lateral (Curtain Reveal) con escala
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 60%',
      }
    });

    tl.fromTo(imageContainerRef.current,
      { clipPath: 'inset(0% 100% 0% 0%)', x: -50 },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        x: 0,
        duration: 1.8,
        ease: 'expo.inOut',
      }
    ).fromTo(imageRef.current,
      { scale: 1.6, filter: 'grayscale(1) blur(10px)' },
      {
        scale: 1.1,
        filter: 'grayscale(0) blur(0px)',
        duration: 2,
        ease: 'expo.out'
      },
      "-=1.4"
    );

    // Efecto Parallax dinámico (Y + sutil rotación)
    gsap.to(imageRef.current, {
      y: -80,
      rotate: 2,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });

    // Efecto de inclinación (Tilt) al mover el ratón sobre el contenedor
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageContainerRef.current) return;
      const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      gsap.to(imageContainerRef.current, {
        rotateY: x * 10,
        rotateX: -y * 10,
        transformPerspective: 1000,
        duration: 0.5,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(imageContainerRef.current, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.5,
        ease: 'power2.out'
      });
    };

    const container = imageContainerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, { scope: sectionRef });

  useGSAP(() => {
    // Animación de entrada para el bloque de texto principal
    gsap.from(textRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 50%',
      },
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
    });

    // Animación escalonada (stagger) para los ítems de estadísticas/info
    gsap.from('.stat-item', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 40%',
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
    });

    // Efecto Parallax para el texto gigante de fondo ("ABOUT ME")
    gsap.to('.bg-text', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
      x: -300,
      ease: 'none'
    });
  }, { scope: sectionRef });

  return (
    <section id="about" ref={sectionRef} className="relative min-h-screen flex items-center bg-[#0a0a0a] py-32 px-6 overflow-hidden">
      {/* Texto decorativo de fondo con movimiento parallax */}
      <div className="bg-text absolute top-1/2 left-0 -translate-y-1/2 text-[25vw] font-black text-white/[0.02] whitespace-nowrap pointer-events-none select-none uppercase will-change-transform">
        SOBRE MÍ SOBRE MÍ SOBRE MÍ
      </div>

      <div className="max-w-7xl mx-auto z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">

        {/* Columna de la Imagen */}
        <div className="lg:col-span-5 order-2 lg:order-1">
          <div
            ref={imageContainerRef}
            className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white/5 border border-white/10"
          >
            <img
              ref={imageRef}
              src="https://picsum.photos/seed/portrait/800/1000"
              alt="Portrait"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover scale-110"
            />
            {/* Overlay sutil para integrar la imagen con el fondo oscuro */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent" />
          </div>
        </div>

        {/* Columna de Texto */}
        <div ref={textRef} className="lg:col-span-7 space-y-12 order-1 lg:order-2">
          {/* Encabezado de sección */}
          <div className="space-y-2">
            <h2 className="text-sm uppercase tracking-[0.4em] text-orange-500 font-bold">01 / Sobre Mí</h2>
            <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
              CREANDO <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">EXPERIENCIAS.</span>
            </h3>
          </div>

          {/* Texto descriptivo principal */}
          <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
            Soy un desarrollador full-stack apasionado por el mundo digital, obsesionado con los detalles
            <span className="text-orange-500 italic font-serif"> pixel-perfect</span> y las
            <span className="text-blue-400"> animaciones fluidas</span>.
          </p>

          <p className="text-lg text-gray-400 leading-relaxed font-light">
            Con más de 5 años de experiencia, he ayudado a startups y marcas establecidas
            a transformar sus ideas en aplicaciones web de alto rendimiento. Mi enfoque
            combina rigor técnico con exploración creativa.
          </p>

          {/* Grid de información adicional (Estadísticas/Detalles) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-12 border-t border-white/10">
            <div className="stat-item">
              <h4 className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">Location</h4>
              <p className="text-white text-sm font-medium">Remote / Global</p>
            </div>
            <div className="stat-item">
              <h4 className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">Focus</h4>
              <p className="text-white text-sm font-medium">Web & Apps</p>
            </div>
            <div className="stat-item">
              <h4 className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">Status</h4>
              <p className="text-white text-sm font-medium">Available</p>
            </div>
            <div className="stat-item">
              <h4 className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">Experience</h4>
              <p className="text-white text-sm font-medium">5+ Years</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
