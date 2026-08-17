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
        {/* Opening: The invitation with 3D rings */}
        <HeroOpening
          groom="He"
          bride="She"
          date="A Celebration of Love"
          place="A Beautiful Venue"
          time="At Golden Hour"
        />

        {/* Scene 1: The Invitation Detail */}
        <CinematicScene
          image="/1.jpeg"
          alt="Wedding invitation detail with golden embellishments"
          eyebrow="Chapter I"
          title="An Invitation"
          lines={['Where two families become one,', 'and a promise is set in gold.']}
          details={[
            { icon: 'date', label: 'Date', value: 'A Day to Be Determined' },
            { icon: 'time', label: 'Time', value: 'Evening Celebration' },
            { icon: 'place', label: 'Venue', value: 'A Sacred Space' },
          ]}
          grade="amber"
          align="bottom"
          priority
        />

        <TitleCard lines={['Every love story is beautiful,', 'but ours is my favourite.']} />

        {/* Scene 2: The Groom */}
        <CinematicScene
          image="/2.jpeg"
          alt="Portrait of the groom at golden hour"
          eyebrow="Chapter II"
          title="The Groom"
          lines={['A heart full of promise,', 'ready to share forever.']}
          grade="gold"
          reverse
        />

        {/* Scene 3: The Bride */}
        <CinematicScene
          image="/3.jpeg"
          alt="Portrait of the bride in radiant beauty"
          eyebrow="Chapter III"
          title="The Bride"
          lines={['Grace and love intertwined,', 'stepping into destiny.']}
          grade="ember"
          align="bottom"
        />

        <TitleCard
          small
          lines={['In the light of the sacred flame,', 'two souls became a single vow.']}
        />

        {/* Scene 4: Celebration Begins */}
        <CinematicScene
          image="/4.jpeg"
          alt="Celebration with golden lights and joy"
          eyebrow="Chapter IV"
          title="The First Moment Together"
          lines={['Two become one,', 'and the world witnesses their joy.']}
          grade="dusk"
          reverse
        />

        {/* Scene 5: The Venue */}
        <CinematicScene
          image="/5.jpeg"
          alt="Beautifully decorated venue at golden hour"
          eyebrow="Chapter V"
          title="The Sacred Space"
          lines={['Where memories are made,', 'and forever is celebrated.']}
          grade="gold"
          align="top"
        />

        {/* Scene 6: Evening Moments */}
        <CinematicScene
          image="/6.jpeg"
          alt="Enchanting evening atmosphere"
          eyebrow="Chapter VI"
          title="As Evening Falls"
          lines={['Magic fills the air,', 'and love is in every moment.']}
          grade="amber"
          reverse
        />

        {/* Scene 7: Close Moments */}
        <CinematicScene
          image="/7.jpeg"
          alt="Intimate moments of togetherness"
          eyebrow="Chapter VII"
          title="Cherished Together"
          lines={['Hearts beating as one,', 'forever starts now.']}
          grade="dusk"
          align="bottom"
        />

        {/* Scene 8: Last Moments of Celebration */}
        <CinematicScene
          image="/9.jpeg"
          alt="The grand finale of celebration"
          eyebrow="Chapter VIII"
          title="The Grand Celebration"
          lines={['Under starlit skies,', 'two souls dance forever.']}
          grade="gold"
          reverse
        />

        {/* Finale: Thank You */}
        <Finale
          groom="He"
          bride="She"
          hashtag="#OurWeddingJourney"
          finalMessage="for being part of our story. With all our love,"
        />
      </main>
    </SmoothScroll>
  )
}
