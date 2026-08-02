'use client'

import { motion } from 'framer-motion'

export function TitleCard({ lines, small = false }: { lines: string[]; small?: boolean }) {
  return (
    <section className="relative flex min-h-[70vh] w-full items-center justify-center overflow-hidden bg-background px-6 py-24">
      {/* soft golden radial glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[60vmin] w-[60vmin] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-2xl text-center">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{ delay: i * 0.25, duration: 1.1, ease: 'easeOut' }}
            className={`text-balance font-serif font-light leading-snug text-ivory ${
              small ? 'text-2xl md:text-3xl' : 'text-3xl md:text-5xl'
            } ${i > 0 ? 'mt-2' : ''}`}
          >
            {line}
          </motion.p>
        ))}
      </div>
    </section>
  )
}
