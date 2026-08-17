# 🚀 Deployment & Hosting Guide

Your wedding invitation is now ready to be deployed! Here are the easiest ways to host it online.

## 1️⃣ Deploy to Vercel (Recommended - FREE & Easy)

**Vercel is the creator of Next.js and provides the best hosting experience.**

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Wedding invitation ready for deployment"
git push origin main
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Select your `invitaition` repository
5. Click "Deploy"

**That's it!** Your site will be live in 1-2 minutes.

**Your URL will be:** `https://invitaition.vercel.app` (or custom domain)

---

## 2️⃣ Deploy to Netlify (FREE Alternative)

1. Go to [netlify.com](https://netlify.com)
2. Sign in with GitHub
3. Click "New site from Git"
4. Select your repository
5. Build settings:
   - **Build command:** `pnpm build`
   - **Publish directory:** `.next`
6. Click "Deploy"

---

## 3️⃣ Self-Host on Your Own Server

### Build the Project
```bash
# Install dependencies
pnpm install

# Build for production
pnpm build

# Start production server
pnpm start
```

Server will run on `http://localhost:3000`

---

## 4️⃣ Deploy to Other Platforms

### AWS Amplify
- Connect GitHub repo
- Auto-deploys on every push
- Free tier available

### Railway
- Connect GitHub repo
- Simple one-click deployment
- Pay-as-you-go pricing

### Render
- Free hosting with GitHub integration
- Automatic deployments

---

## 📱 Custom Domain Setup

Once deployed to Vercel:

1. Go to your Vercel project settings
2. Click "Domains"
3. Add your custom domain (e.g., `yourwedding.com`)
4. Update DNS settings at your domain registrar
5. Follow Vercel's DNS instructions

---

## ✅ Checklist Before Going Live

- [ ] Update couple names in `components/sections/hero-opening.tsx`
- [ ] Update wedding date, time, and venue
- [ ] Replace placeholder images with your photos
- [ ] Update hashtag in `components/sections/finale.tsx`
- [ ] Test on mobile devices
- [ ] Check all links and buttons work
- [ ] Add custom domain (optional)

---

## 🔗 Live Invitation Links

After deployment, share these links with your guests:

- **Main Link:** Your Vercel URL
- **QR Code:** Generate from [qr-code-generator.com](https://www.qr-code-generator.com)
- **Social Media:** Share in WhatsApp, email, Instagram

---

## 📊 Monitor Your Invitation

### Vercel Analytics
- View analytics in Vercel dashboard
- Track visitor count and engagement
- Monitor performance metrics

### Google Analytics (Optional)
Add to `app/layout.tsx` for detailed insights

---

## 🎯 Quick Links

| Action | Link |
|--------|------|
| Deploy Now | [Vercel](https://vercel.com/new) |
| GitHub Repo | [Your Repo](https://github.com/VINAY-0814/invitaition) |
| Customize Guide | See README.md |
| Get Help | Check troubleshooting section |

---

**Your invitation is ready to share! 💕 Deploy it now and let your guests experience your love story.** 🎬
