# FrameBox - Live TV Streaming Platform

A modern, premium IPTV player built with Next.js featuring a Minecraft-style pixel box UI theme.

## Features

- 🎬 **Live TV Streaming**: Stream from IPTV playlists with HLS.js support
- 🎮 **Minecraft-Inspired UI**: Premium pixel box design with nostalgic gaming aesthetics
- 🔍 **Smart Search**: Filter channels by name or category
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🎨 **Premium Color Scheme**: Gold (#FFD700), Saddle Brown (#8B4513), with premium dark backgrounds
- ⚡ **Fast Performance**: Built with Next.js 16 and Turbopack

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **Video Streaming**: HLS.js
- **Playlist Parsing**: Custom M3U parser with axios
- **Language**: TypeScript

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Main home page with player and channel list
│   ├── layout.tsx        # Root layout
│   ├── globals.css       # Global styles and pixel font
│   └── framebox.css      # FrameBox theme styles
├── components/
│   ├── PixelBoxUI.tsx    # Reusable pixel box components (Header, ChannelCard, SearchBox)
│   └── VideoPlayer.tsx   # HLS video player component
└── lib/
    └── iptvParser.ts     # M3U playlist parser and utilities
```

## Getting Started

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The server uses Turbopack for fast refresh and rebuilds.

### Build for Production

```bash
npm run build
npm run start
```

## Features Explained

### IPTV Playlist Parser

- Fetches M3U8 playlist from the provided IPTV source
- Extracts channel information (name, URL, logo, category)
- Groups channels by category for better organization
- Supports searching and filtering

### Video Player

- HLS.js-based streaming for M3U8 URLs
- Native HTML5 video player controls
- Auto-play functionality
- Cross-origin resource sharing (CORS) support

### UI Components

**PixelBox**: Premium pixel-bordered container with gold/brown theme

- Hover effects and selection states
- Customizable styling

**ChannelCard**: Individual channel selector

- Channel logo with fallback emoji
- Channel name display
- Selection highlight

**SearchBox**: Filter channels in real-time

**Header**: Site branding with pixel font

## Configuration

The IPTV playlist URL is configured in `src/app/page.tsx`:

```typescript
const PLAYLIST_URL = "https://iptv-org.github.io/iptv/index.m3u";
```

Change this to use a different IPTV source.

## Customization

### Colors

- Primary Gold: `#FFD700`
- Primary Brown: `#8B4513`
- Secondary Brown: `#A0522D`
- Dark Background: `#0F0F0F`, `#1A1A1A`, `#2C2C2C`

Edit `src/app/globals.css` and `src/app/framebox.css` to customize colors.

### Pixel Font

The project uses **Press Start 2P** from Google Fonts for the authentic pixel aesthetic. Customize in `src/app/globals.css`.

## Performance Optimization

- Image optimization with Next.js Image component
- CSS-in-modules for scoped styling
- Lazy loading of channel logos
- Efficient playlist parsing with limited channel display (20 per category)

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Notes

- Some IPTV streams may require CORS headers to work properly
- Very large playlists (10,000+ channels) are paginated to improve performance
- Channel logos are optional; emoji fallback is provided

## License

MIT

## Support

For issues or feature requests, please check the IPTV playlist source compatibility.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
