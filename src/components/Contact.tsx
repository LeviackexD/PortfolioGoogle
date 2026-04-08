import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Mail, Github, Linkedin, Twitter, ArrowRight } from 'lucide-react';
import ContactModal from './ContactModal';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const container = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useGSAP(() => {
    // Animación de entrada para los elementos de contacto (socials, inquiries, location)
    gsap.from('.contact-item', {
      scrollTrigger: {
        trigger: container.current,
        start: 'top 80%',
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
    });

    // Efecto Parallax para el texto decorativo de fondo ("CONTACT")
    gsap.to('.bg-text-contact', {
      scrollTrigger: {
        trigger: container.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
      x: -300,
      ease: 'none'
    });
    // ============================================================================
    // ANIMACIÓN CONTINUA DE "LET'S TALK" - Efecto de atención para indicar click
    // ============================================================================
    const talkChars = document.querySelectorAll('.talk-char');
    
    // Animación de onda continua para llamar la atención
    talkChars.forEach((char, i) => {
      gsap.to(char, {
        y: gsap.utils.random(-3, 3),
        rotateZ: gsap.utils.random(-2, 2),
        duration: gsap.utils.random(1.5, 2.5),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.05,
      });
    });

    // Animación de escala pulsante en todo el texto cada 3 segundos
    gsap.to('.lets-talk-container', {
      scale: 1.02,
      duration: 0.6,
      repeat: -1,
      repeatDelay: 2,
      yoyo: true,
      ease: 'power2.inOut',
    });

    // Brillo pulsante
    gsap.to('.lets-talk-container', {
      textShadow: '0 0 30px rgba(249, 115, 22, 0.5), 0 0 60px rgba(249, 115, 22, 0.3)',
      duration: 1,
      repeat: -1,
      repeatDelay: 1,
      yoyo: true,
      ease: 'power2.inOut',
      delay: 0.5,
    });

    // Efecto hover magnético para "LET'S TALK"
    const letsTalkBtn = document.querySelector('.lets-talk-container');
    if (letsTalkBtn) {
      letsTalkBtn.addEventListener('mouseenter', () => {
        gsap.to(talkChars, {
          scale: 1.1,
          color: '#f97316',
          duration: 0.3,
          stagger: 0.02,
          ease: 'back.out(2)',
        });
      });
      
      letsTalkBtn.addEventListener('mouseleave', () => {
        gsap.to(talkChars, {
          scale: 1,
          color: '#ffffff',
          duration: 0.3,
          stagger: 0.02,
          ease: 'power2.out',
        });
      });
    }
  }, { scope: container });

  // Utilidad para dividir texto en caracteres animables
  const splitLetsTalk = (text: string) => {
    return text.split('').map((char, i) => (
      <span 
        key={i} 
        className="talk-char inline-block"
        style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section id="contact" ref={container} className="relative bg-[#0a0a0a] py-32 px-6 border-t border-white/5 overflow-hidden z-30">
      {/* Texto gigante de fondo con movimiento parallax */}
      <div className="bg-text-contact absolute top-1/2 left-0 -translate-y-1/2 text-[25vw] font-black text-white/[0.02] whitespace-nowrap pointer-events-none select-none uppercase will-change-transform">
        CONTACT CONTACT CONTACT
      </div>
      
      <div className="max-w-7xl mx-auto text-center z-10 relative">
        <h2 className="text-sm uppercase tracking-[0.4em] text-orange-500 font-bold mb-12">04 / Contact</h2>
        
        {/* Botón principal de llamada a la acción que abre el modal */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="contact-item lets-talk-container inline-block text-5xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter hover:text-orange-500 transition-colors duration-500 mb-20 cursor-none will-change-transform"
        >
          {splitLetsTalk("LET'S TALK.")}
        </button>

        {/* Grid de información de contacto detallada */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left pt-20 border-t border-white/10">
          {/* Redes Sociales */}
          <div className="contact-item">
            <h4 className="text-[10px] uppercase tracking-widest text-gray-500 mb-6">Socials</h4>
            <div className="flex space-x-6">
              <a href="#" className="text-white hover:text-orange-500 transition-colors"><Github size={20} /></a>
              <a href="#" className="text-white hover:text-orange-500 transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="text-white hover:text-orange-500 transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Consultas / Email */}
          <div className="contact-item">
            <h4 className="text-[10px] uppercase tracking-widest text-gray-500 mb-6">Inquiries</h4>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="text-white hover:text-orange-500 transition-colors flex items-center gap-2 cursor-none"
            >
              manolocerezuela4@gmail.com <ArrowRight size={14} />
            </button>
          </div>

          {/* Ubicación */}
          <div className="contact-item">
            <h4 className="text-[10px] uppercase tracking-widest text-gray-500 mb-6">Location</h4>
            <p className="text-white">Spain / Remote</p>
          </div>
        </div>

        {/* Footer / Copyright */}
        <div className="mt-32 text-[10px] uppercase tracking-[0.5em] text-gray-600">
          © 2026 M.CJ — ALL RIGHTS RESERVED
        </div>
      </div>

      {/* Componente Modal de Contacto */}
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
