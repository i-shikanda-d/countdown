# Timely - Countdown Creation App

A modern, minimal web app for creating and sharing beautiful countdowns to your special moments.

## Features

- **Multi-step form** for easy countdown creation
- **Local image uploads** stored in `public/uploads`
- **MongoDB integration** for persistent storage
- **Shareable countdown pages** with live countdown timer
- **Web Share API** with clipboard fallback
- **Responsive design** with TailwindCSS
- **TypeScript** throughout for type safety

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: MongoDB + Mongoose
- **State Management**: Zustand
- **Styling**: TailwindCSS
- **Language**: TypeScript
- **Image Storage**: Local filesystem (`public/uploads`)

## Getting Started

### 1. Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas account (free tier is fine)

### 2. Setup MongoDB

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Create a database user with password
4. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/timely`

### 3. Local Development

```bash
# Install dependencies
npm install

# Create .env.local file
cp .env.local.example .env.local

# Edit .env.local and add your MongoDB URI
# MONGODB_URI=mongodb+srv://...

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

### 4. Test the App

1. Go to `http://localhost:3000`
2. Click "Get Started"
3. Select countdown type (Birthday, Anniversary, etc.)
4. Pick a future date and optional time
5. Add optional description and image
6. Create the countdown
7. Share via Web Share API or copy link

## Image Upload

Images are uploaded as multipart FormData and saved to `public/uploads/` with unique filenames:

- **Allowed formats**: JPG, PNG, WebP, GIF
- **Max size**: 5MB
- **Storage**: `public/uploads/<timestamp>-<random>.ext`
- **URL**: `/uploads/<timestamp>-<random>.ext`

The relative path is stored in MongoDB and served directly from the public folder.

## Environment Variables

Create a `.env.local` file in the root directory:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/timely?retryWrites=true&w=majority
NODE_ENV=development
```

## Building for Production

```bash
# Build the app
npm run build

# Start production server
npm start
```

## Important Notes

### Vercel Deployment

The app uses local image uploads to `public/uploads`. **Vercel has limitations**:

- Vercel's filesystem is ephemeral - files uploaded to `/public` are lost when the function ends
- The app will work on Vercel only if:
  1. You don't upload images, OR
  2. You use an external image service (Cloudinary, AWS S3, Supabase Storage)

**For Vercel deployment**, modify the image upload in `src/app/api/create/route.ts` to use:
- Cloudinary (free tier available)
- AWS S3
- Supabase Storage
- Another cloud storage provider

### Local/Self-Hosted Deployment

The current setup works perfectly on:
- Local development machines
- Traditional hosting (AWS EC2, DigitalOcean, Heroku, etc.)
- Any platform with persistent filesystem access

## Customization

### Change Colors

Edit TailwindCSS classes in components. Default colors use `blue-*` and `slate-*` from Tailwind.

### Change Branding

- Landing page: `src/app/page.tsx`
- Countdown footer: `src/app/c/[id]/page.tsx`
- Page titles: `src/app/layout.tsx`

### Add More Countdown Types

Edit `src/types/index.ts` and `src/lib/models/Countdown.ts` to add more preset types.

## Troubleshooting

**MongoDB Connection Error**
- Verify `MONGODB_URI` is correct in `.env.local`
- Check that IP whitelist includes your machine in MongoDB Atlas
- Ensure database user has correct password

**Image Upload Fails**
- Check file size (must be under 5MB)
- Verify file format (JPG, PNG, WebP, GIF only)
- Ensure `public/uploads/` directory exists

**Countdown Not Found**
- Verify the ID in the URL is correct
- Check MongoDB database for the document
- Ensure the app is connected to MongoDB

## License

MIT - Feel free to use and modify as needed.

---

**Made with ❤️ by Filmoja**
