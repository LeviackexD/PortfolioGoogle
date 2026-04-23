import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Download } from 'lucide-react';

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Detecta el scroll para cambiar el estilo de la barra de navegación (fondo translúcido)
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo del sitio */}
        <motion.a
          href="#"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut"
          }}
          className="text-2xl font-black tracking-tighter text-white uppercase cursor-pointer"
        >
          <span className="inline-block">M.C.J</span>
        </motion.a>

        {/* Navegación para Escritorio (Desktop) */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="group relative text-sm uppercase tracking-widest text-gray-400 hover:text-white transition-colors duration-300"
            >
              {item.name}
              {/* Línea decorativa inferior al hacer hover */}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-orange-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}

          {/* Botón Descargar CV */}
          <motion.a
            href="/cv.pdf" // Coloca tu archivo cv.pdf dentro de la carpeta "public"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 bg-orange-500 text-white px-5 py-2.5 rounded-full text-xs uppercase font-bold tracking-widest hover:bg-white hover:text-black transition-colors duration-300 shadow-lg shadow-orange-500/20"
          >
            <span>CV</span>
            <Download size={14} />
          </motion.a>
        </div>

        {/* Botón de menú para móviles (Mobile Toggle) */}
        <div className="flex items-center space-x-4 md:hidden">
          <motion.a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-orange-500 rounded-full text-white"
          >
            <Download size={18} />
          </motion.a>
          <button className="text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Menú desplegable para móviles con animaciones de Framer Motion */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-black border-t border-white/10 p-6 flex flex-col space-y-4 md:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)} // Cierra el menú al hacer clic en un enlace
                className="text-lg uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
              >
                {item.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
