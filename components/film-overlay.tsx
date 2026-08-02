'use client'

/**
 * Fixed, non-interactive cinematic overlay layered above everything:
 * film grain, subtle vignette and thin letterbox bars. Purely decorative.
 */
export function FilmOverlay() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-40">
      {/* vignette */}
      <div className="absolute inset-0 bg-vignette" />

      {/* animated film grain */}
      <div
        className="absolute -inset-[100%] opacity-[0.06] mix-blend-screen"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          animation: 'grain-shift 0.6s steps(2) infinite',
        }}
      />

      {/* thin cinematic letterbox bars */}
      <div className="letterbox-bar absolute inset-x-0 top-0 h-[3vh]" />
      <div className="letterbox-bar absolute inset-x-0 bottom-0 h-[3vh]" />
    </div>
  )
}
