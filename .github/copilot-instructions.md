# FrameBox - Live TV Streaming Platform

A premium IPTV player built with Next.js featuring a Minecraft-style pixel box UI theme.

## Project Overview

FrameBox is a modern web application that streams live TV channels from IPTV playlists. The application features:

- Real-time channel streaming with HLS.js support
- Minecraft-inspired pixel box UI with premium gold/brown color scheme
- Smart search and category filtering
- Responsive design for all devices
- Zero gradients - solid premium colors only

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS with custom CSS modules
- **Video Streaming**: HLS.js for M3U8 playlists
- **Language**: TypeScript
- **Build Tool**: Turbopack

## Key Features

### IPTV Integration
- M3U playlist parser with axios
- Automatic channel extraction (name, URL, logo, category)
- Category-based grouping
- Real-time search functionality

### UI/UX
- Minecraft-inspired pixel box design
- Premium color palette:
  - Gold: #FFD700
  - Saddle Brown: #8B4513
  - Secondary Brown: #A0522D
  - Dark backgrounds: #0F0F0F, #1A1A1A, #2C2C2C
- Press Start 2P pixel font
- Responsive grid layout (1-2 columns)

### Video Player
- Native HTML5 video with HLS.js
- Auto-play capability
- CORS support for streams
- Overlay with channel info

## File Structure

```
src/
├── app/
│   ├── page.tsx          # Main page (player + channel list)
│   ├── layout.tsx        # Root layout & metadata
│   ├── globals.css       # Global styles & pixel font import
│   └── framebox.css      # FrameBox theme styles
├── components/
│   ├── PixelBoxUI.tsx    # Reusable components (PixelBox, ChannelCard, Header, etc.)
│   └── VideoPlayer.tsx   # HLS video player
└── lib/
    └── iptvParser.ts     # M3U parser & utilities
```

## Development

**Start dev server**: `npm run dev`
**Build**: `npm run build`
**Production**: `npm run start`

Server runs on http://localhost:3000 with Turbopack hot reloading.

## Customization Guide

### Change IPTV Playlist
Edit `src/app/page.tsx` line 8:
```typescript
const PLAYLIST_URL = 'your-playlist-url-here';
```

### Modify Colors
Edit `src/app/framebox.css`:
- Pixel box borders: `.pixel-box` border-color
- Selection highlight: `.pixel-box.selected` border-color
- Text colors: Use Tailwind classes (#FFD700, #8B4513, etc.)

### Update Pixel Font
Edit `src/app/globals.css` font import if using different font family.

## Important Notes

- Images use Next.js Image component with relative sizing
- HLS.js handles M3U8 streams automatically
- Very large playlists paginate (20 channels/category)
- Channel logos are optional (emoji fallback)
- Some streams may need CORS-enabled headers

## Performance

- Turbopack for 4.4s startup
- Lazy-loaded images
- Efficient playlist parsing
- Limited channel display per category

## Browser Support

Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
