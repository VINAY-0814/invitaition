import { SmoothScroll } from '@/components/smooth-scroll'
import { FilmOverlay } from '@/components/film-overlay'
import { Petals } from '@/components/petals'
import { AudioController } from '@/components/audio-controller'
import { ScrollProgress } from '@/components/scroll-progress'
import { ScrollHint } from '@/components/scroll-hint'
import { HeroOpening } from '@/components/sections/hero-opening'
import { CinematicScene } from '@/components/cinematic-scene'
import { TitleCard } from '@/components/title-card'
import { Finale } from '@/components/sections/finale'

export default function Page() {
  return (
    <SmoothScroll>
      {/* Global cinematic overlays */}
      <FilmOverlay />
      <Petals />
      <ScrollProgress />
      <ScrollHint />
      <AudioController />

      <main className="relative bg-background">
        {/* Chapter 0 — the invitation, in 3D */}
        <HeroOpening />

        {/* Chapter I — the invitation detail */}
        <CinematicScene
          image="/images/marigold-detail.png"
          alt="Macro detail of marigold flowers and gold embroidery"
          chapter="Chapter I"
          title="An Invitation"
          lines={['Where two families become one,', 'and a promise is set in gold.']}
          grade="amber"
          align="bottom"
          priority
        />

        <TitleCard lines={['Every love story is beautiful,', 'but ours is my favourite.']} />

        {/* Chapter II — the first look */}
        <CinematicScene
          image="/images/first-look.png"
          alt="The bride and groom seeing each other for the first time at golden hour"
          chapter="Chapter II"
          title="The First Look"
          lines={['A single glance across the courtyard —', 'and the whole world went quiet.']}
          grade="gold"
          reverse
        />

        {/* Chapter III — the ceremony */}
        <CinematicScene
          image="/images/ceremony-mandap.png"
          alt="The sacred fire and mandap during the wedding ceremony"
          chapter="Chapter III"
          title="The Sacred Vows"
          lines={['Seven steps around the fire,', 'seven lifetimes bound as one.']}
          grade="ember"
          align="bottom"
        />

        <TitleCard
          small
          lines={['In the light of the sacred flame,', 'two souls became a single vow.']}
        />

        {/* Chapter IV — the celebration */}
        <CinematicScene
          image="/images/celebration.png"
          alt="Guests dancing under warm lights and sparklers at night"
          chapter="Chapter IV"
          title="The Celebration"
          lines={['Under a thousand golden lights,', 'joy spilled into the night.']}
          grade="dusk"
          reverse
        />

        {/* Chapter V — the palace at golden hour */}
        <CinematicScene
          image="/images/palace-golden-hour.png"
          alt="The royal palace bathed in golden-hour light"
          chapter="Chapter V"
          title="Golden Hour"
          lines={['As the sun kissed the palace walls,', 'forever felt close enough to touch.']}
          grade="gold"
          align="top"
        />

        {/* Finale */}
        <Finale />
      </main>
    </SmoothScroll>
  )
}
