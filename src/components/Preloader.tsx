import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';

export default function Preloader({ onComplete }: { onComplete: () => void, key?: string }) {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Animación del contador de 0 a 100
    const obj = { value: 0 };
    gsap.to(obj, {
      value: 100,
      duration: 2.5,
      ease: "power4.inOut",
      onUpdate: () => {
        setCounter(Math.floor(obj.value));
      },
      onComplete: () => {
        // Pequeño retraso antes de ocultar para que el usuario vea el 100%
        setTimeout(onComplete, 500);
      }
    });
  }, [onComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Contenedor del contador */}
      <div className="relative overflow-hidden h-[15vw] flex items-center">
        <motion.span
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-[15vw] font-black text-white leading-none tracking-tighter"
        >
          {counter}%
        </motion.span>
      </div>

      {/* Barra de progreso sutil en la parte inferior */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${counter}%` }}
          className="h-full bg-orange-500"
        />
      </div>

      {/* Texto decorativo */}
      <div className="absolute bottom-12 left-12 overflow-hidden">
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[10px] uppercase tracking-[0.5em] text-gray-500 font-bold"
        >
          MCJ — Portfolio personal
        </motion.p>
      </div>
    </motion.div>
  );
}
