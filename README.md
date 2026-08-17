# Wedding Invitation - Cinematic Digital Experience

A modern, elegant, and interactive wedding invitation built with **React 19**, **Next.js 16**, **Framer Motion**, and **Tailwind CSS**. This is a production-ready digital wedding film experience with cinematic animations, smooth scrolling, and stunning visual effects.

## 🎬 Features

✨ **Cinematic Experience**
- Full-screen sections with Ken Burns effect (dynamic zoom & pan)
- Smooth scroll animations with parallax
- Film grain overlay and vignette effects
- Custom color grading (gold, amber, ember, dusk tones)

🎨 **Modern Design**
- Responsive design (mobile, tablet, desktop)
- Dark theme with elegant typography
- Gradient overlays and backdrop blur effects
- Decorative elements (lines, icons, scrim effects)

🎵 **Interactive Features**
- Audio controller for background music
- Falling flower petals animation
- Scroll progress indicator
- Smooth scroll hint
- "Replay the film" button

🚀 **Performance & Best Practices**
- React 19 with server-side rendering
- Optimized images with Next.js Image component
- Lazy loading for better performance
- TypeScript for type safety
- Accessibility features (ARIA labels, semantic HTML)
- Modern CSS (Tailwind v4, backdrop blur, CSS variables)

## 📁 Project Structure

```
invitaition/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main invitation page
│   └── globals.css         # Global styles
├── components/
│   ├── sections/
│   │   ├── hero-opening.tsx    # Opening title with couple names
│   │   └── finale.tsx          # Thank you closing section
│   ├── three/
│   │   └── opening-scene.tsx   # 3D rings scene (Three.js)
│   ├── cinematic-scene.tsx     # Reusable scene component with Ken Burns
│   ├── title-card.tsx          # Poetic text cards
│   ├── audio-controller.tsx    # Music control
│   ├── petals.tsx              # Falling flowers animation
│   ├── film-overlay.tsx        # Film grain effect
│   ├── smooth-scroll.tsx       # Scroll enhancement
│   └── [other components]
├── public/
│   ├── 1.jpeg              # Invitation detail image
│   ├── 2.jpeg              # Groom portrait
│   ├── 3.jpeg              # Bride portrait
│   ├── 4.jpeg              # Together moment
│   ├── 5.jpeg              # Venue detail
│   ├── 6.jpeg              # Evening atmosphere
│   ├── 7.jpeg              # Intimate moment
│   ├── 9.jpeg              # Grand finale
│   └── images/             # Additional images
├── package.json            # Dependencies
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (or npm/yarn)

### Installation

```bash
# Clone the repository
git clone https://github.com/VINAY-0814/invitaition.git
cd invitaition

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the invitation.

## 📝 Customization Guide

### Update Couple Names & Details

**Edit `components/sections/hero-opening.tsx`:**
```tsx
<HeroOpening
  groom="Your Name"           // Update groom name
  bride="Partner Name"        // Update bride name
  date="December 12, 2024"    // Wedding date
  place="City Palace, Udaipur" // Venue
  time="6:00 PM"              // Event time
/>
```

**Edit `components/sections/finale.tsx`:**
```tsx
<Finale
  groom="Your Name"
  bride="Partner Name"
  hashtag="#YourHashtag"
  finalMessage="Custom thank you message"
/>
```

### Replace Images

All images are stored in the `public/` folder and referenced in `app/page.tsx`:

```tsx
<CinematicScene
  image="/1.jpeg"           // Replace with your image path
  alt="Description"
  eyebrow="Chapter Title"
  title="Scene Title"
  lines={['Line 1', 'Line 2']}
/>
```

**Image Mapping (Current Setup):**
- `/1.jpeg` - Invitation detail / Opening image
- `/2.jpeg` - Groom portrait
- `/3.jpeg` - Bride portrait
- `/4.jpeg` - Together moment
- `/5.jpeg` - Venue showcase
- `/6.jpeg` - Evening ambiance
- `/7.jpeg` - Intimate close-up
- `/9.jpeg` - Grand celebration finale

### Add Event Details

Update the `details` prop in any `CinematicScene`:

```tsx
<CinematicScene
  image="/path/to/image.jpg"
  eyebrow="Chapter Title"
  title="Event Name"
  details={[
    { icon: 'date', label: 'Date', value: 'December 12, 2024' },
    { icon: 'time', label: 'Time', value: '6:00 PM Onwards' },
    { icon: 'place', label: 'Venue', value: 'Palace Grounds, City' },
  ]}
/>
```

### Customize Colors & Grades

Modify the `grade` prop for different color overlays:
- `grade="gold"` - Warm gold tones (default)
- `grade="amber"` - Rich amber
- `grade="ember"` - Deep warm red
- `grade="dusk"` - Sunset purples

### Add Background Music

Replace audio path in `components/audio-controller.tsx`:
```tsx
const audioPath = '/audio/your-wedding-song.mp3'
```

## 🎨 Typography & Fonts

The invitation uses:
- **Serif Font**: Cormorant Garamond (elegant, traditional)
- **Sans Font**: Geist (clean, modern)

Configured in `app/layout.tsx` with Google Fonts.

## 🎯 Deployment

### Deploy to Vercel (Recommended)

```bash
# Push to GitHub, then:
vercel deploy
```

### Deploy to Other Platforms

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## 📊 Performance Optimizations

- ✅ Image optimization with Next.js Image component
- ✅ Lazy loading for off-screen images
- ✅ Framer Motion GPU-accelerated animations
- ✅ Minimal CSS bundle with Tailwind v4
- ✅ Dynamic imports for Three.js scene (SSR disabled)
- ✅ Server-side rendering for fast initial load

## 🔧 Technologies Used

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 16.2.6 | React framework |
| React | 19 | UI library |
| Framer Motion | 12.43.0 | Animations |
| Tailwind CSS | 4.3.3 | Styling |
| Three.js | 0.185.1 | 3D graphics |
| React Three Fiber | 9.7.0 | Three.js for React |
| TypeScript | 5.7.3 | Type safety |

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels for icons and interactive elements
- Keyboard navigation support
- Dark mode friendly
- Alt text for all images
- Focus indicators on buttons

## 🐛 Troubleshooting

**Images not loading?**
- Ensure images are in the `public/` folder
- Check image paths in components
- Verify file names are correct (case-sensitive)

**Animations not smooth?**
- Check browser GPU acceleration is enabled
- Reduce animation complexity on slower devices
- Use Chrome DevTools Performance tab to debug

**Three.js scene not rendering?**
- Ensure WebGL is supported in your browser
- Check console for error messages
- Verify Three.js dependencies are installed

## 📄 License

This project is open source and available under the MIT License.

## 💝 Credits

Created with love for celebrating special moments. Built with modern web technologies to deliver an unforgettable digital experience.

---

**Ready to celebrate?** Customize this invitation with your details and share your love story with your guests! 🎉💕
