'use client'

import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX, Music } from 'lucide-react'

/**
 * Ambient background music with a mute toggle.
 * Autoplay is blocked by browsers, so we start playback on the first user
 * interaction. Drop your track at /public/audio/wedding-theme.mp3.
 */
export function AudioController({ src = '/audio/wedding-theme.mp3' }: { src?: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [muted, setMuted] = useState(true)
  const [started, setStarted] = useState(false)
  const [available, setAvailable] = useState(true)

  useEffect(() => {
    const audio = new Audio(src)
    audio.loop = true
    audio.preload = 'auto'
    audio.volume = 0
    audioRef.current = audio

    const onError = () => setAvailable(false)
    audio.addEventListener('error', onError)

    // Try to begin (muted) on the first interaction to satisfy autoplay policy.
    const kick = () => {
      if (started) return
      audio
        .play()
        .then(() => setStarted(true))
        .catch(() => {
          /* will retry on toggle */
        })
    }
    window.addEventListener('pointerdown', kick, { once: true })
    window.addEventListener('keydown', kick, { once: true })

    return () => {
      audio.removeEventListener('error', onError)
      window.removeEventListener('pointerdown', kick)
      window.removeEventListener('keydown', kick)
      audio.pause()
      audioRef.current = null
    }
  }, [src, started])

  // Smoothly fade volume when toggling.
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const target = muted ? 0 : 0.55
    let raf = 0
    const step = () => {
      const diff = target - audio.volume
      if (Math.abs(diff) < 0.01) {
        audio.volume = target
        return
      }
      audio.volume = Math.max(0, Math.min(1, audio.volume + diff * 0.08))
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [muted])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      audio.play().then(() => setStarted(true)).catch(() => {})
    }
    setMuted((m) => !m)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={muted ? 'Unmute music' : 'Mute music'}
      aria-pressed={!muted}
      className="group fixed bottom-[4vh] right-4 z-50 flex items-center gap-2 rounded-full border border-primary/30 bg-background/50 px-3.5 py-2 text-primary backdrop-blur-md transition-colors hover:border-primary/60 hover:bg-background/70 md:right-6"
    >
      <span className="relative flex h-4 w-4 items-center justify-center">
        {muted ? (
          <VolumeX className="h-4 w-4" />
        ) : (
          <Volume2 className="h-4 w-4" />
        )}
      </span>
      <span className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-luxe">
        <Music className="h-3 w-3 opacity-70" />
        {available ? (muted ? 'Play' : 'On') : 'Add track'}
      </span>
      {/* equalizer bars when playing */}
      {!muted && available && (
        <span aria-hidden className="ml-0.5 flex items-end gap-0.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-0.5 rounded-full bg-primary"
              style={{
                height: '10px',
                animation: `eq 0.9s ease-in-out ${i * 0.15}s infinite alternate`,
              }}
            />
          ))}
        </span>
      )}
      <style>{`@keyframes eq { from { transform: scaleY(0.35) } to { transform: scaleY(1) } }`}</style>
    </button>
  )
}
