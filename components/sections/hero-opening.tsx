'use client'

import { useRef } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'

const OpeningScene = dynamic(
  () => import('@/components/three/opening-scene').then((m) => m.OpeningScene),
  { ssr: false },
)

export function HeroOpening({
  bride = 'She',
  groom = 'He',
  date = 'A Day to Remember',
  place = 'A Beautiful Venue',
  time = 'Golden Hour',
}: {
  bride?: string
  groom?: string
  date?: string
  place?: string
  time?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // The whole hero drifts away and darkens as you scroll into the film.
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.15])

  return (
    <section ref={ref} className="relative h-[130vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-background">
        {/* 3D golden rings + dust */}
        <motion.div style={{ opacity: sceneOpacity }} className="absolute inset-0">
          <OpeningScene />
        </motion.div>

        {/* dark-to-light curtain: starts nearly black, lifts on load */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 3.2, ease: 'easeInOut' }}
          className="pointer-events-none absolute inset-0 bg-[#0a0704]"
        />

        {/* warm bloom wash from below */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background/70 to-transparent" />

        {/* title and details */}
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 1.4 }}
            className="mb-6 text-[10px] font-medium uppercase tracking-luxe text-primary md:text-xs"
          >
            Together with their families
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, letterSpacing: '0.5em', filter: 'blur(12px)' }}
            animate={{ opacity: 1, letterSpacing: '0.02em', filter: 'blur(0px)' }}
            transition={{ delay: 2, duration: 2, ease: 'easeOut' }}
            className="font-serif text-6xl font-light leading-none text-ivory text-shadow-cinematic md:text-8xl"
          >
            {groom}
            <span className="mx-3 inline-block align-middle text-primary drop-shadow-glow md:mx-5">
              &amp;
            </span>
            {bride}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 3, duration: 1.4 }}
            className="my-7 h-px w-40 origin-center bg-gradient-to-r from-transparent via-primary to-transparent"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.2, duration: 1.6 }}
            className="font-serif text-lg italic text-ivory/85 md:text-2xl"
          >
            {date}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.4, duration: 1.6 }}
            className="mt-2 font-serif text-base text-primary/90 md:text-lg"
          >
            {time}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5, duration: 1.6 }}
            className="mt-3 text-[11px] font-medium uppercase tracking-luxe text-primary/80"
          >
            {place}
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
