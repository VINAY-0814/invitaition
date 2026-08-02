'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export function Finale({
  bride = 'Isha',
  groom = 'Aarav',
  hashtag = '#AaravWedsIsha',
}: {
  bride?: string
  groom?: string
  hashtag?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1.25, 1.1])
  const opacity = useTransform(scrollYProgress, [0.1, 0.5], [0, 1])

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden">
      <motion.div style={{ scale }} className="absolute inset-0 will-change-transform">
        <Image
          src="/images/finale-silhouette.png"
          alt="Silhouette of the couple against a golden sunset sky"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background" />
      <div className="absolute inset-0 bg-vignette" />

      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <p className="mb-5 text-[10px] font-medium uppercase tracking-luxe text-primary">
          And so, forever begins
        </p>
        <h2 className="font-serif text-5xl font-light text-ivory text-shadow-cinematic md:text-7xl">
          Thank you
        </h2>
        <p className="mx-auto mt-6 max-w-md text-pretty font-serif text-lg italic leading-relaxed text-ivory/85 md:text-xl">
          for being part of our story. With all our love,
        </p>
        <p className="mt-4 font-serif text-2xl text-primary drop-shadow-glow md:text-3xl">
          {groom} &amp; {bride}
        </p>
        <p className="mt-8 text-[11px] font-medium uppercase tracking-luxe text-ivory/70">
          {hashtag}
        </p>

        <button
          type="button"
          onClick={toTop}
          className="group mt-12 flex items-center gap-2 rounded-full border border-primary/40 bg-background/40 px-5 py-2.5 text-primary backdrop-blur-md transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
        >
          <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
          <span className="text-[10px] font-medium uppercase tracking-luxe">
            Replay the film
          </span>
        </button>
      </motion.div>
    </section>
  )
}
