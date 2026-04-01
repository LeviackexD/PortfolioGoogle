import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'React / Next.js', level: '95%' },
  { name: 'TypeScript', level: '90%' },
  { name: 'GSAP / Framer Motion', level: '85%' },
  { name: 'Tailwind CSS', level: '98%' },
  { name: 'Node.js / Express', level: '80%' },
  { name: 'PostgreSQL / MongoDB', level: '75%' },
  { name: 'Three.js', level: '60%' },
  { name: 'UI/UX Design', level: '85%' },
];

export default function Skills() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animación de entrada para los nombres de las habilidades
    gsap.from('.skill-item', {
      scrollTrigger: {
        trigger: container.current,
        start: 'top 70%',
      },
      x: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.1,
    });

    // Animación de llenado de las barras de progreso
    gsap.from('.skill-bar', {
      scrollTrigger: {
        trigger: container.current,
        start: 'top 70%',
      },
      scaleX: 0, // Comienza desde ancho 0
      duration: 1.5,
      ease: 'power4.out',
      stagger: 0.1,
      transformOrigin: 'left', // El crecimiento ocurre de izquierda a derecha
    });

    // Efecto Parallax para el texto decorativo de fondo ("STACK")
    gsap.to('.bg-text-skills', {
      scrollTrigger: {
        trigger: container.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
      x: -300,
      ease: 'none'
    });
  }, { scope: container });

  return (
    <section id="skills" ref={container} className="relative bg-[#0a0a0a] py-32 px-6 overflow-hidden z-30">
      {/* Texto gigante de fondo con movimiento parallax */}
      <div className="bg-text-skills absolute top-1/2 left-0 -translate-y-1/2 text-[25vw] font-black text-white/[0.02] whitespace-nowrap pointer-events-none select-none uppercase will-change-transform">
        TECH STACK TECH STACK
      </div>
      
      <div className="max-w-7xl mx-auto z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Columna de texto descriptivo */}
          <div>
            <h2 className="text-sm uppercase tracking-[0.4em] text-orange-500 font-bold mb-8">03 / Expertise</h2>
            <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-12">
              MY TECH<br />STACK.
            </h3>
            <p className="text-xl text-gray-400 font-light leading-relaxed max-w-md">
              I specialize in building high-performance, accessible, and visually stunning digital products using the latest technologies.
            </p>
          </div>

          {/* Columna de barras de habilidades */}
          <div className="space-y-8">
            {skills.map((skill) => (
              <div key={skill.name} className="skill-item group">
                <div className="flex justify-between items-end mb-3">
                  <span className="text-lg font-medium text-white group-hover:text-orange-500 transition-colors">{skill.name}</span>
                  <span className="text-xs font-mono text-gray-500">{skill.level}</span>
                </div>
                {/* Contenedor de la barra de progreso */}
                <div className="h-[1px] w-full bg-white/10 relative overflow-hidden">
                  <div 
                    className="skill-bar absolute top-0 left-0 h-full bg-orange-500" 
                    style={{ width: skill.level }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
