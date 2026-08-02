'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
// scrollY-based fade so it reliably clears the hero

export function ScrollHint({ label = 'Begin the film' }: { label?: string }) {
  const { scrollY } = useScroll()
  // fade the hint out within the first viewport of scrolling
  const opacity = useTransform(scrollY, [0, 260], [1, 0])

  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-none fixed inset-x-0 bottom-[6vh] z-40 flex flex-col items-center gap-2 text-primary/80"
    >
      <span className="text-[10px] font-medium uppercase tracking-luxe">{label}</span>
      <motion.span
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
        className="block h-8 w-[1px] bg-gradient-to-b from-primary to-transparent"
      />
    </motion.div>
  )
}
