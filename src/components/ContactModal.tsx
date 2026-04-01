import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success'>('idle');

  // Maneja el envío del formulario con una simulación de carga
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');
    
    // Simulación de una llamada a API
    setTimeout(() => {
      setFormState('success');
      // Cierra el modal automáticamente después de mostrar el mensaje de éxito
      setTimeout(() => {
        onClose();
        setFormState('idle');
      }, 2000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Fondo oscuro con desenfoque (Overlay) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          />
          
          {/* Contenedor principal del Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-xl bg-[#111] border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden"
          >
            {/* Decoraciones visuales internas (blobs) */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full translate-y-1/2 -translate-x-1/2" />
            
            {/* Botón de cierre (X) */}
            <motion.button 
              whileHover={{ rotate: 90, scale: 1.1, color: '#f97316' }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', damping: 15, stiffness: 300 }}
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-500 transition-colors z-10"
            >
              <X size={24} />
            </motion.button>

            {/* Renderizado condicional: Mensaje de éxito o Formulario */}
            {formState === 'success' ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                className="text-center py-12"
              >
                {/* Icono de envío exitoso animado */}
                <motion.div 
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    type: 'spring', 
                    damping: 12, 
                    stiffness: 200,
                    delay: 0.1
                  }}
                  className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Send className="text-white" size={32} />
                </motion.div>
                <motion.h3 className="text-3xl font-black text-white mb-2">MESSAGE SENT!</motion.h3>
                <motion.p className="text-gray-400">I'll get back to you as soon as possible.</motion.p>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <div className="mb-10">
                  <motion.h2 className="text-4xl font-black text-white tracking-tighter mb-2">LET'S WORK TOGETHER.</motion.h2>
                  <motion.p className="text-gray-400">Fill out the form below and I'll be in touch.</motion.p>
                </div>

                {/* Formulario de contacto */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Campo: Nombre Completo */}
                  <motion.div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Full Name</label>
                    <motion.input 
                      whileFocus={{ scale: 1.01 }}
                      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                      required
                      type="text" 
                      placeholder="John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-orange-500 transition-all"
                    />
                  </motion.div>

                  {/* Campo: Email */}
                  <motion.div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Email Address</label>
                    <motion.input 
                      whileFocus={{ scale: 1.01 }}
                      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                      required
                      type="email" 
                      placeholder="john@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-orange-500 transition-all"
                    />
                  </motion.div>

                  {/* Campo: Mensaje */}
                  <motion.div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Message</label>
                    <motion.textarea 
                      whileFocus={{ scale: 1.01 }}
                      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                      required
                      rows={4}
                      placeholder="Tell me about your project..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-orange-500 transition-all resize-none"
                    />
                  </motion.div>

                  {/* Botón de Envío con estado de carga */}
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={formState === 'sending'}
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-5 rounded-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                  >
                    {formState === 'sending' ? 'SENDING...' : (
                      <>
                        SEND MESSAGE
                        <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
