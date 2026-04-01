import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'NEON HORIZON',
    category: 'E-Commerce / WebGL',
    description: 'A high-performance digital store with immersive 3D product previews and seamless transitions.',
    technologies: ['React', 'Three.js', 'GSAP', 'Tailwind'],
    image: 'https://picsum.photos/seed/neon/1200/800',
    preview: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJqZ3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKMGpxx6B3N2c0w/giphy.gif', // Placeholder GIF
    color: '#ff4e00',
  },
  {
    title: 'CYBER CORE',
    category: 'SaaS Platform',
    description: 'Next-generation dashboard for real-time data analysis and cloud infrastructure management.',
    technologies: ['Next.js', 'TypeScript', 'D3.js', 'Node.js'],
    image: 'https://picsum.photos/seed/cyber/1200/800',
    preview: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJqZ3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/l41lTjJ8Z8Z8Z8Z8Z/giphy.gif', // Placeholder GIF
    color: '#00d2ff',
  },
  {
    title: 'AETHER STUDIO',
    category: 'Portfolio / Design',
    description: 'Minimalist editorial portfolio for creative agencies focusing on typography and motion.',
    technologies: ['React', 'Framer Motion', 'Lenis', 'Vite'],
    image: 'https://picsum.photos/seed/aether/1200/800',
    preview: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJqZ3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKMGpxx6B3N2c0w/giphy.gif', // Placeholder GIF
    color: '#9d50bb',
  },
  {
    title: 'VIRTUAL VOID',
    category: 'Web3 / NFT',
    description: 'Decentralized marketplace for digital assets with real-time bidding and wallet integration.',
    technologies: ['Solidity', 'Ethers.js', 'React', 'Hardhat'],
    image: 'https://picsum.photos/seed/void/1200/800',
    preview: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJqZ3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/l41lTjJ8Z8Z8Z8Z8Z/giphy.gif', // Placeholder GIF
    color: '#3a7bd5',
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const trigger = triggerRef.current;
    if (!section || !trigger) return;

    // Cálculo del ancho total para el scroll horizontal
    const totalWidth = section.scrollWidth;
    const viewportWidth = window.innerWidth;
    const scrollDistance = totalWidth - viewportWidth;

    // Ajustamos la altura del trigger para que coincida con la distancia de scroll
    // Esto crea el espacio necesario para el scroll horizontal
    gsap.set(trigger, { height: `+=${scrollDistance}` });

    // Timeline principal para el scroll horizontal (pinning)
    const mainTl = gsap.to(section, {
      x: -scrollDistance,
      ease: 'none',
      scrollTrigger: {
        id: 'projectsScroll',
        trigger: trigger,
        pin: section, // Bloquea el contenedor horizontal
        pinSpacing: true, // Asegura que el espacio se añada
        scrub: 1,
        start: 'top top',
        end: () => `+=${scrollDistance}`,
        invalidateOnRefresh: true,
      },
    });

    // Animación de entrada de los caracteres del título
    gsap.from('.project-title-char', {
      y: 100,
      opacity: 0,
      stagger: 0.05,
      duration: 1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top 80%',
      },
    });

    // Transición del título principal hacia el fondo (efecto de "desvanecimiento" al background)
    gsap.to('.project-title-wrapper', {
      opacity: 0.01,
      scale: 1.8,
      x: -400,
      filter: 'blur(15px)',
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top top',
        end: '+=50%',
        scrub: true,
      },
    });

    // Aparece el texto de fondo real mientras el título principal se aleja
    gsap.fromTo('.bg-text-projects', 
      { opacity: 0 },
      {
        opacity: 0.01,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: '+=50%',
          scrub: true,
        }
      }
    );

    // Animación de las tarjetas de proyecto al entrar en el viewport horizontal
    const cards = gsap.utils.toArray('.project-card');
    cards.forEach((card: any) => {
      // Entrada del contenedor de la tarjeta (escala y opacidad)
      gsap.from(card, {
        scale: 0.85,
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          containerAnimation: mainTl, // Sincronizado con la animación horizontal principal
          start: 'left 95%',
          toggleActions: 'play none none reverse',
        },
      });

      // Entrada del contenido interno de la tarjeta (título y categoría)
      const content = card.querySelector('.project-content');
      if (content) {
        gsap.from(content, {
          y: 60,
          opacity: 0,
          duration: 1,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            containerAnimation: mainTl,
            start: 'left 80%',
            toggleActions: 'play none none reverse',
          },
        });
      }
    });

    // Efecto Parallax para el texto gigante de fondo ("SELECTED WORKS")
    gsap.to('.bg-text-projects', {
      scrollTrigger: {
        trigger: trigger,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
      x: -400,
      ease: 'none'
    });

    // Refrescar ScrollTrigger después de configurar todo
    ScrollTrigger.refresh();
  }, { scope: triggerRef });

  // Utilidad para dividir el título en letras animables
  const splitTitle = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="project-title-char inline-block whitespace-pre">
        {char}
      </span>
    ));
  };

  return (
    <div id="projects" ref={triggerRef} className="relative min-h-screen bg-[#0a0a0a] z-20">
      {/* Texto de fondo parallax */}
      <div className="bg-text-projects absolute top-1/2 left-0 -translate-y-1/2 text-[25vw] font-black text-white/[0.01] whitespace-nowrap pointer-events-none select-none uppercase will-change-transform z-0">
        SELECTED WORKS SELECTED WORKS
      </div>
      
      {/* Contenedor del scroll horizontal */}
      <div ref={sectionRef} className="flex h-screen w-max items-center relative overflow-hidden will-change-transform bg-[#0a0a0a]">
        {/* Diapositiva de Título Inicial */}
        <div className="w-screen h-full flex items-center px-12 md:px-32 shrink-0 bg-[#0a0a0a]">
          <div className="project-title-wrapper space-y-8 will-change-transform">
            <span className="text-orange-500 font-bold tracking-[0.4em] text-sm block">02 / Portfolio</span>
            <h2 className="project-main-title text-[12vw] font-black text-white uppercase tracking-tighter leading-[0.8] select-none">
              <div className="overflow-hidden">
                {splitTitle('SELECTED')}
              </div>
              <div className="overflow-hidden">
                <span className="text-orange-500">{splitTitle('WORKS')}</span>
              </div>
            </h2>
          </div>
        </div>

        {/* Diapositivas de Proyectos */}
        {projects.map((project, index) => (
          <div key={index} className="project-card w-[80vw] h-full flex items-center justify-center px-4 md:px-12 shrink-0">
            <div className="relative group w-full max-w-5xl aspect-video overflow-hidden rounded-2xl bg-white/5 border border-white/10">
              
              {/* Contenedor de Medios (Imagen estática + GIF en hover) */}
              <div className="absolute inset-0 w-full h-full">
                {/* Imagen estática (Base) */}
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:opacity-0"
                  referrerPolicy="no-referrer"
                />
                {/* GIF de Vista Previa (Aparece en hover) */}
                <img 
                  src={project.preview} 
                  alt={`${project.title} preview`}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-105 group-hover:scale-100"
                  referrerPolicy="no-referrer"
                />
                {/* Overlay de degradado para legibilidad */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              </div>
              
              {/* Información del proyecto */}
              <div className="project-content absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                <div className="max-w-2xl transform transition-transform duration-500 group-hover:-translate-y-4">
                  
                  {/* Categoría y Tags de Tecnología */}
                  <div className="flex flex-wrap gap-2 mb-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-orange-500 font-bold bg-orange-500/10 px-2 py-1 rounded">
                      {project.category}
                    </span>
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="text-[10px] uppercase tracking-[0.1em] text-white/50 border border-white/10 px-2 py-1 rounded backdrop-blur-md">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Título */}
                  <h3 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-none mb-4">
                    {project.title}
                  </h3>

                  {/* Descripción (Solo visible en hover o con scroll horizontal) */}
                  <p className="text-gray-400 text-sm md:text-lg font-light leading-relaxed max-w-xl opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200">
                    {project.description}
                  </p>
                </div>

                {/* Botón de acción */}
                <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12">
                  <button className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-white flex items-center justify-center text-black hover:bg-orange-500 hover:text-white transition-all duration-500 transform group-hover:rotate-45 group-hover:scale-110 shadow-2xl">
                    <ArrowUpRight className="w-8 h-8 md:w-10 md:h-10" />
                  </button>
                </div>
              </div>

              {/* Indicador de "Live Preview" o "Video" */}
              <div className="absolute top-6 right-6 flex items-center space-x-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] font-bold text-white tracking-widest uppercase">Preview</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
