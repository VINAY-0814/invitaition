'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Calendar, Clock, MapPin } from 'lucide-react'

export type EventDetail = {
  icon: 'date' | 'time' | 'place'
  label: string
  value: string
}

export type CinematicSceneProps = {
  image: string
  alt: string
  /** small eyebrow label above the title (e.g. "The Groom", "Haldi Ceremony") */
  eyebrow: string
  title: string
  lines?: string[]
  /** optional structured event info (date / time / venue) */
  details?: EventDetail[]
  /** overall grade tint applied over the image */
  grade?: 'gold' | 'amber' | 'ember' | 'dusk'
  /** vertical position of the caption */
  align?: 'center' | 'bottom' | 'top'
  /** flip the Ken Burns drift direction so consecutive scenes feel varied */
  reverse?: boolean
  priority?: boolean
}

const gradeMap: Record<NonNullable<CinematicSceneProps['grade']>, string> = {
  gold: 'from-background/70 via-background/30 to-background/80',
  amber: 'from-background/75 via-background/25 to-background/70',
  ember: 'from-maroon/55 via-background/35 to-background/85',
  dusk: 'from-background/55 via-background/30 to-background/90',
}

const detailIcon = {
  date: Calendar,
  time: Clock,
  place: MapPin,
}

export function CinematicScene({
  image,
  alt,
  eyebrow,
  title,
  lines = [],
  details = [],
  grade = 'gold',
  align = 'center',
  reverse = false,
  priority = false,
}: CinematicSceneProps) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Ken Burns: slow zoom + drift across the scroll of this section.
  const scale = useTransform(scrollYProgress, [0, 1], [1.18, 1.32])
  const y = useTransform(scrollYProgress, [0, 1], reverse ? ['-6%', '6%'] : ['6%', '-6%'])
  const x = useTransform(scrollYProgress, [0, 1], reverse ? ['3%', '-3%'] : ['-3%', '3%'])

  // Caption parallax + fade at the edges.
  const captionY = useTransform(scrollYProgress, [0, 0.5, 1], ['12%', '0%', '-12%'])
  const captionOpacity = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0, 1, 1, 0])

  const alignClass =
    align === 'bottom'
      ? 'items-end pb-[14vh]'
      : align === 'top'
        ? 'items-start pt-[14vh]'
        : 'items-center'

  return (
    <section
      ref={ref}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      {/* Ken Burns background */}
      <motion.div style={{ scale, y, x }} className="absolute inset-0 will-change-transform">
        <Image
          src={image || '/placeholder.svg'}
          alt={alt}
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* color grade */}
      <div className={`absolute inset-0 bg-gradient-to-b ${gradeMap[grade]}`} />
      <div className="absolute inset-0 bg-vignette" />

      {/* caption */}
      <motion.div
        style={{ y: captionY, opacity: captionOpacity }}
        className={`relative z-10 flex h-full w-full flex-col justify-center px-6 text-center ${alignClass}`}
      >
        {/* legibility scrim sits behind the text only */}
        <div className="relative mx-auto max-w-2xl">
          <div className="pointer-events-none absolute -inset-x-10 -inset-y-8 -z-10 rounded-[3rem] bg-background/45 blur-2xl" />

          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-primary" />
            <span className="text-[10px] font-medium uppercase tracking-luxe text-primary">
              {eyebrow}
            </span>
            <span className="h-px w-8 bg-primary" />
          </div>

          <h2 className="text-balance font-serif text-5xl font-light leading-tight text-ivory text-shadow-cinematic md:text-7xl">
            {title}
          </h2>

          {lines.length > 0 && (
            <div className="mx-auto mt-5 max-w-md space-y-1">
              {lines.map((line, i) => (
                <p
                  key={i}
                  className="text-pretty font-serif text-lg italic leading-relaxed text-ivory md:text-xl"
                >
                  {line}
                </p>
              ))}
            </div>
          )}

          {details.length > 0 && (
            <div className="mx-auto mt-7 flex max-w-md flex-col gap-3 rounded-2xl border border-primary/25 bg-background/40 px-6 py-5 backdrop-blur-md">
              {details.map((d, i) => {
                const Icon = detailIcon[d.icon]
                return (
                  <div key={i} className="flex items-center justify-center gap-3 text-ivory">
                    <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <span className="text-[10px] font-medium uppercase tracking-luxe text-primary/90">
                      {d.label}
                    </span>
                    <span className="font-serif text-base text-ivory md:text-lg">{d.value}</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </motion.div>
    </section>
  )
}
