'use client'

import { motion } from 'framer-motion'

export function TitleCard({
  lines = [],
  small = false,
}: {
  lines?: string[]
  small?: boolean
}) {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center bg-background px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        viewport={{ once: false, amount: 0.5 }}
        className="mx-auto max-w-2xl text-center"
      >
        {/* Background blur effect */}
        <div
          className="pointer-events-none absolute -inset-x-10 -inset-y-8 -z-10 rounded-[3rem] bg-gradient-to-b from-primary/10 via-transparent to-primary/5 backdrop-blur-2xl"
          aria-hidden="true"
        />

        {/* Decorative top line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-6 h-px w-20 origin-center bg-gradient-to-r from-transparent via-primary to-transparent mx-auto"
          aria-hidden="true"
        />

        {/* Text content */}
        <div className={`space-y-3 ${small ? 'md:space-y-2' : 'md:space-y-4'}`}>
          {lines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.8 }}
              className={`text-pretty font-serif leading-relaxed text-ivory ${
                small
                  ? 'text-base italic md:text-lg'
                  : 'text-lg italic md:text-2xl'
              }`}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Decorative bottom line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-6 h-px w-20 origin-center bg-gradient-to-r from-transparent via-primary to-transparent mx-auto"
          aria-hidden="true"
        />
      </motion.div>
    </section>
  )
}
