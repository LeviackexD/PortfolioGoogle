import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, X, Grid3x3 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Todos los proyectos disponibles
const allProjects = [
  {
    title: 'Fika Coffee & Brunch',
    category: 'Web Corporativa / Hostelería',
    description: 'Sitio web minimalista para una cafetería de especialidad en Escocia. Enfocado en la experiencia visual, menú digital y branding moderno.',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&h=800&auto=format&fit=crop',
    link: 'https://fikacafeforres.vercel.app/',
    preview: '/fika-preview.mov',
    color: '#D4A373',
  },
  {
    title: 'TimeTracker Pro',
    category: 'Productividad / Analytics',
    description: 'App inteligente de gestión del tiempo con análisis de productividad y reportes automáticos para freelancers.',
    technologies: ['React', 'Express', 'Chart.js', 'JWT Auth'],
    image: 'https://picsum.photos/seed/timetracker/1200/800',
    preview: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJqZ3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/l41lTjJ8Z8Z8Z8Z8Z/giphy.gif',
    color: '#00d2ff',
  },
  {
    title: 'HelpDesk Scotland',
    category: 'Soporte Técnico / SaaS',
    description: 'Plataforma de tickets de soporte para empresas con sistema de priorización y estadísticas en tiempo real.',
    technologies: ['React', 'Socket.io', 'MySQL', 'Node.js'],
    image: 'https://picsum.photos/seed/helpdesk/1200/800',
    preview: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJqZ3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKMGpxx6B3N2c0w/giphy.gif',
    color: '#9d50bb',
  },
  {
    title: 'Portfolio RPG Interactivo',
    category: 'Videojuego / Phaser.js',
    description: 'Portfolio estilo RPG donde exploras mis habilidades y proyectos como en un juego de aventuras.',
    technologies: ['Phaser.js', 'JavaScript', 'Canvas API', 'Tilemaps'],
    image: 'https://picsum.photos/seed/rpg/1200/800',
    preview: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJqZ3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/l41lTjJ8Z8Z8Z8Z8Z/giphy.gif',
    color: '#3a7bd5',
  },
  {
    title: 'Scottish Market',
    category: 'E-commerce / Local',
    description: 'Plataforma para productos locales de Escocia con sistema de pagos y panel para vendedores.',
    technologies: ['React', 'Stripe', 'Firebase', 'Tailwind'],
    image: 'https://picsum.photos/seed/market/1200/800',
    preview: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJqZ3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKMGpxx6B3N2c0w/giphy.gif',
    color: '#ff6b6b',
  },
  {
    title: 'SysMonitor Pro',
    category: 'Sistemas / Dashboard',
    description: 'Dashboard de monitoreo de servidores con alertas en tiempo real y análisis de rendimiento.',
    technologies: ['React', 'WebSockets', 'Node.js', 'Chart.js'],
    image: 'https://picsum.photos/seed/sysmonitor/1200/800',
    preview: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJqZ3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/l41lTjJ8Z8Z8Z8Z8Z/giphy.gif',
    color: '#4ecdc4',
  },
  {
    title: 'DevHub Scotland',
    category: 'Comunidad / Networking',
    description: 'Plataforma para desarrolladores en Escocia con eventos locales, proyectos colaborativos y mentoría.',
    technologies: ['Next.js', 'PostgreSQL', 'Prisma', 'Socket.io'],
    image: 'https://picsum.photos/seed/devhub/1200/800',
    preview: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJqZ3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKMGpxx6B3N2c0w/giphy.gif',
    color: '#f7b731',
  },
];

// Solo los primeros 4 proyectos para el scroll horizontal
const featuredProjects = allProjects.slice(0, 4);

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Animación de apertura/cierre del modal con GSAP
  useGSAP(() => {
    if (!modalRef.current) return;

    if (showAllProjects) {
      // Animación de apertura
      gsap.fromTo(modalRef.current,
        {
          opacity: 0,
          scale: 0.8,
          backdropFilter: 'blur(0px)'
        },
        {
          opacity: 1,
          scale: 1,
          backdropFilter: 'blur(20px)',
          duration: 0.4,
          ease: 'power2.out'
        }
      );

      // Animación de entrada de las tarjetas
      gsap.fromTo('.modal-project-card',
        {
          opacity: 0,
          y: 30,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.3,
          stagger: 0.1,
          ease: 'power2.out',
          delay: 0.2
        }
      );
    }
  }, [showAllProjects]);

  const openModal = () => {
    setShowAllProjects(true);
    // Prevenir scroll del body cuando el modal está abierto
    document.body.style.overflow = 'hidden';
  };
  const closeModal = () => {
    setShowAllProjects(false);
    // Restaurar scroll del body cuando se cierra el modal
    document.body.style.overflow = '';
  };

  // Limpiar overflow cuando el componente se desmonta
  useGSAP(() => {
    return () => {
      document.body.style.overflow = '';
    };
  });

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
        MIS PROYECTOS
      </div>

      {/* Contenedor del scroll horizontal */}
      <div ref={sectionRef} className="flex h-screen w-max items-center relative overflow-hidden will-change-transform bg-[#0a0a0a]">
        {/* Diapositiva de Título Inicial */}
        <div className="w-screen h-full flex items-center px-12 md:px-32 shrink-0 bg-[#0a0a0a]">
          <div className="project-title-wrapper space-y-8 will-change-transform">
            <span className="text-orange-500 font-bold tracking-[0.4em] text-sm block">02 / Portafolio</span>
            <h2 className="project-main-title text-[12vw] font-black text-white uppercase tracking-tighter leading-[0.8] select-none">
              <div className="overflow-hidden">
                {splitTitle('MIS')}
              </div>
              <div className="overflow-hidden">
                <span className="text-orange-500">{splitTitle('TRABAJOS')}</span>
              </div>
            </h2>
          </div>
        </div>

        {/* Diapositivas de Proyectos Destacados */}
        {featuredProjects.map((project, index) => (
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
                {/* Preview (Aparece en hover) */}
                {project.preview.match(/\.(mp4|mov|webm)$/) ? (
                  <video
                    src={project.preview}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-105 group-hover:scale-100"
                  />
                ) : (
                  <img
                    src={project.preview}
                    alt={`${project.title} preview`}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-105 group-hover:scale-100"
                    referrerPolicy="no-referrer"
                  />
                )}
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
                  <a
                    href={(project as any).link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-white flex items-center justify-center text-black hover:bg-orange-500 hover:text-white transition-all duration-500 transform group-hover:rotate-45 group-hover:scale-110 shadow-2xl"
                  >
                    <ArrowUpRight className="w-8 h-8 md:w-10 md:h-10" />
                  </a>
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

        {/* Diapositiva de "Ver Todos los Proyectos" */}
        <div className="w-screen h-full flex items-center justify-center px-6 md:px-16 shrink-0 bg-[#0a0a0a]">
          <div className="text-center space-y-8 max-w-2xl">
            <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
              ¿Quieres ver <span className="text-orange-500">más</span>?
            </h3>
            <p className="text-gray-400 text-lg">
              Explora todos mis proyectos incluyendo sistemas de monitoreo, videojuegos y plataformas de e-commerce
            </p>
            <button
              onClick={openModal}
              className="group relative inline-flex items-center gap-3 bg-orange-500 text-white px-8 py-4 rounded-full text-lg font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 shadow-lg shadow-orange-500/20"
            >
              <Grid3x3 className="w-5 h-5" />
              <span>Ver todos los proyectos</span>
              <ArrowUpRight className="w-5 h-5 transform group-hover:rotate-45 transition-transform duration-300" />
            </button>
            <div className="text-gray-600 text-sm">
              {allProjects.length} proyectos disponibles
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Todos los Proyectos */}
      {showAllProjects && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-[#0a0a0a] rounded-3xl w-full h-full max-h-[90vh] max-w-7xl overflow-hidden border border-white/10 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del Modal - Fijo */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">
                  Todos los <span className="text-orange-500">Proyectos</span>
                </h2>
                <p className="text-gray-400 mt-1">
                  {allProjects.length} proyectos de desarrollo full stack y sistemas
                </p>
              </div>
              <button
                onClick={closeModal}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors duration-300 shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Grid de Proyectos - Scroll interno */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {allProjects.map((project, index) => (
                  <div
                    key={index}
                    className="modal-project-card group relative w-full aspect-video bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300"
                  >
                    {/* Contenedor de Medios (Preview solo en hover, sin texto) */}
                    <div className="absolute inset-0 w-full h-full">
                      {/* Preview (Solo visible en hover) */}
                      {project.preview.match(/\.(mp4|mov|webm)$/) ? (
                        <video
                          src={project.preview}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        />
                      ) : (
                        <img
                          src={project.preview}
                          alt={`${project.title} preview`}
                          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          referrerPolicy="no-referrer"
                        />
                      )}
                      {/* Overlay oscuro para legibilidad en hover */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Información del proyecto (visible por defecto) */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-center">
                      <div className="text-center space-y-4">

                        {/* Categoría */}
                        <div className="opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                          <span className="text-[10px] uppercase tracking-[0.2em] text-orange-500 font-bold bg-orange-500/10 px-3 py-1 rounded-full inline-block">
                            {project.category}
                          </span>
                        </div>

                        {/* Título */}
                        <h3 className="text-2xl md:text-3xl font-black text-white tracking-tighter leading-none opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                          {project.title}
                        </h3>

                        {/* Descripción */}
                        <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed max-w-lg mx-auto opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                          {project.description}
                        </p>

                        {/* Tecnologías */}
                        <div className="flex flex-wrap justify-center gap-2 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                          {project.technologies.slice(0, 4).map((tech, i) => (
                            <span key={i} className="text-xs text-white/70 bg-white/10 px-2 py-1 rounded border border-white/20 backdrop-blur-sm">
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Botón de acción (solo visible en hover) */}
                        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                          <a
                            href={(project as any).link || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-orange-500 hover:text-white transition-all duration-500 transform group-hover:rotate-45 group-hover:scale-110"
                          >
                            <ArrowUpRight className="w-6 h-6" />
                          </a>
                        </div>

                        {/* Indicador de Preview (solo en hover) */}
                        <div className="absolute top-4 right-4 flex items-center space-x-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                          <span className="text-[10px] font-bold text-white tracking-widest uppercase">Preview</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
