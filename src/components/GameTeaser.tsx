import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Gamepad2, Sword, Shield, Heart, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/**
 * Pixel-art style CSS for the arcade button
 * Uses box-shadow to simulate chunky pixel borders like a retro UI frame
 */
const pixelBorderStyle = {
  boxShadow: `
    /* Outer pixel border */
    -4px 0 0 0 #f97316,
    4px 0 0 0 #f97316,
    0 -4px 0 0 #f97316,
    0 4px 0 0 #f97316,
    /* Corner fills */
    -4px -4px 0 0 #f97316,
    4px -4px 0 0 #f97316,
    -4px 4px 0 0 #f97316,
    4px 4px 0 0 #f97316,
    /* Second layer (darker) */
    -8px 0 0 0 #ea580c,
    8px 0 0 0 #ea580c,
    0 -8px 0 0 #ea580c,
    0 8px 0 0 #ea580c,
    /* Glow */
    0 0 40px rgba(249, 115, 22, 0.3),
    0 0 80px rgba(249, 115, 22, 0.15)
  `,
};

export default function GameTeaser() {
  const container = useRef<HTMLDivElement>(null);
  const coinBtnRef = useRef<HTMLAnchorElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const coinRef = useRef<HTMLSpanElement>(null);
  const [blinkVisible, setBlinkVisible] = useState(true);

  // Classic arcade blinking text effect
  useEffect(() => {
    const interval = setInterval(() => {
      setBlinkVisible((v) => !v);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    // Parallax background text
    gsap.to('.bg-text-game', {
      scrollTrigger: {
        trigger: container.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
      x: -300,
      ease: 'none'
    });

    // Content fade in and slide up
    gsap.from(textRef.current, {
      scrollTrigger: {
        trigger: container.current,
        start: 'top 75%',
      },
      y: 60,
      opacity: 0,
      duration: 1.4,
      ease: 'power3.out',
    });

    // RPG decorative icons floating
    gsap.to('.floating-icon', {
      y: 'random(-25, 25)',
      x: 'random(-25, 25)',
      rotation: 'random(-20, 20)',
      duration: 'random(3, 6)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.3
    });

    // Coin spinning animation
    if (coinRef.current) {
      gsap.to(coinRef.current, {
        rotateY: 360,
        duration: 2,
        repeat: -1,
        ease: 'none',
      });
    }

    // Button neon pulse
    const btn = coinBtnRef.current;
    if (btn) {
      gsap.to(btn, {
        boxShadow: `
          -4px 0 0 0 #f97316, 4px 0 0 0 #f97316,
          0 -4px 0 0 #f97316, 0 4px 0 0 #f97316,
          -4px -4px 0 0 #f97316, 4px -4px 0 0 #f97316,
          -4px 4px 0 0 #f97316, 4px 4px 0 0 #f97316,
          -8px 0 0 0 #ea580c, 8px 0 0 0 #ea580c,
          0 -8px 0 0 #ea580c, 0 8px 0 0 #ea580c,
          0 0 60px rgba(249, 115, 22, 0.5),
          0 0 120px rgba(249, 115, 22, 0.25)
        `,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Hover: screen shake + color invert
      btn.addEventListener('mouseenter', () => {
        gsap.to(btn, {
          scale: 1.08,
          duration: 0.15,
          ease: 'back.out(3)',
        });
        // Quick shake
        gsap.to(btn, {
          x: 'random(-3, 3)',
          y: 'random(-2, 2)',
          duration: 0.05,
          repeat: 5,
          yoyo: true,
          ease: 'none',
          onComplete: () => {
            gsap.set(btn, { x: 0, y: 0 });
          }
        });
      });

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          scale: 1,
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      });
    }

    // Scanline animation
    gsap.to('.scanline-overlay', {
      backgroundPosition: '0 100%',
      duration: 8,
      repeat: -1,
      ease: 'none',
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative bg-[#0a0a0a] py-32 px-6 border-t border-white/5 overflow-hidden z-30">
      {/* Scanline CRT overlay */}
      <div
        className="scanline-overlay absolute inset-0 pointer-events-none z-20 opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
          backgroundSize: '100% 4px',
        }}
      />

      {/* Background text */}
      <div className="bg-text-game absolute top-1/2 left-0 -translate-y-1/2 text-[20vw] font-black text-white/[0.02] whitespace-nowrap pointer-events-none select-none uppercase will-change-transform">
        INSERT COIN INSERT COIN
      </div>

      {/* Floating RPG decorative elements */}
      <div className="absolute top-16 left-16 opacity-[0.07] floating-icon text-orange-500">
        <Sword size={56} />
      </div>
      <div className="absolute top-24 right-24 opacity-[0.07] floating-icon text-yellow-500">
        <Star size={40} />
      </div>
      <div className="absolute bottom-20 left-32 opacity-[0.07] floating-icon text-red-500">
        <Heart size={44} />
      </div>
      <div className="absolute bottom-16 right-16 opacity-[0.07] floating-icon text-blue-400">
        <Shield size={52} />
      </div>
      <div className="absolute top-1/2 left-8 opacity-[0.05] floating-icon text-orange-500">
        <Gamepad2 size={72} />
      </div>

      <div className="max-w-4xl mx-auto text-center z-10 relative" ref={textRef}>
        {/* Top badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 mb-8">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-orange-500 font-bold">🎮 New Quest Available</span>
        </div>

        {/* Main title */}
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6 uppercase">
          Prueba mi portfolio <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500 line-through decoration-white/20">clásico</span>{' '}
          <span className="text-orange-500 italic font-serif">interactivo</span>
        </h2>

        <p className="text-xl text-gray-400 font-light leading-relaxed max-w-2xl mx-auto mb-16">
          ¿Aburrido de hacer scroll? He creado una experiencia inmersiva estilo RPG de 16 bits usando Phaser. Explora mi mundo, habla con NPCs y descubre mis proyectos como si fuera un videojuego clásico.
        </p>

        {/* ═══════════ INSERT COIN BUTTON (ARCADE STYLE) ═══════════ */}
        <div className="flex flex-col items-center gap-6">
          <a
            ref={coinBtnRef}
            href="https://rpg-portfolio-ten.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group inline-flex items-center gap-5 bg-[#1a1a2e] text-orange-500 font-black text-xl md:text-3xl uppercase px-10 md:px-16 py-5 md:py-7 cursor-none select-none"
            style={{
              ...pixelBorderStyle,
              fontFamily: '"Courier New", Courier, monospace',
              letterSpacing: '0.1em',
              imageRendering: 'pixelated',
            }}
          >
            {/* Spinning coin icon */}
            <span
              ref={coinRef}
              className="text-yellow-400 text-3xl md:text-4xl inline-block will-change-transform"
              style={{ perspective: '200px' }}
            >
              🪙
            </span>

            {/* Blinking text */}
            <span
              style={{ opacity: blinkVisible ? 1 : 0.3 }}
              className="transition-opacity duration-100"
            >
              INSERT COIN
            </span>

            {/* Arrow */}
            <span className="text-orange-500/50 text-2xl animate-bounce">▸</span>

            {/* Inner scanline effect on button */}
            <div
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(249, 115, 22, 0.15) 1px, rgba(249, 115, 22, 0.15) 2px)',
                backgroundSize: '100% 2px',
              }}
            />
          </a>

          {/* Credit counter */}
          <div className="text-orange-500/60 text-xs tracking-[0.4em] uppercase" style={{ fontFamily: '"Courier New", monospace' }}>
            CREDIT(S): 1
          </div>
        </div>

        {/* Controls HUD */}
        <div className="mt-12 text-gray-500 text-xs tracking-[0.3em] uppercase flex flex-wrap items-center justify-center gap-4 md:gap-6">
          <span className="flex items-center gap-2">
            <span className="border-2 border-gray-600 rounded px-2 py-0.5 text-gray-400 font-mono text-[10px]">W A S D</span>
            <span>MOVE</span>
          </span>
          <span className="w-1 h-1 bg-gray-600 rounded-full" />
          <span className="flex items-center gap-2">
            <span className="border-2 border-gray-600 rounded px-2 py-0.5 text-gray-400 font-mono text-[10px]">E</span>
            <span>INTERACT</span>
          </span>
          <span className="w-1 h-1 bg-gray-600 rounded-full" />
          <span className="flex items-center gap-2">
            <span className="border-2 border-gray-600 rounded px-2 py-0.5 text-gray-400 font-mono text-[10px]">ESC</span>
            <span>MENU</span>
          </span>
        </div>

        {/* HP/XP bar decoration */}
        <div className="mt-10 max-w-xs mx-auto space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-red-400 font-mono tracking-widest">HP</span>
            <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
              <div className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full" style={{ width: '100%' }} />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-blue-400 font-mono tracking-widest">XP</span>
            <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
              <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" style={{ width: '72%' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
