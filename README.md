# Sidebar App

A modern Next.js sidebar application built with React, TypeScript, and Tailwind CSS. This application features a responsive sidebar layout with multiple pages including dashboard, documentation, playground, and more.

## Features

- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Responsive Design**: Fully responsive sidebar that adapts to different screen sizes
- **TypeScript**: Full type safety throughout the application
- **Dark/Light Theme**: Built-in theme switching support
- **Multiple Pages**: Dashboard, playground, documentation, settings, and more
- **Authentication**: Login and signup pages with context-based auth
- **Cloud Deployment**: Pre-configured for Google Cloud Platform deployment

## Tech Stack

- **Framework**: Next.js 15.3.4 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Theme**: next-themes for dark/light mode

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd sidebar-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── dashboard/       # Dashboard page
│   ├── documentation/   # Documentation page
│   ├── feedback/        # Feedback page
│   ├── login/          # Login page
│   ├── models/         # Models page
│   ├── playground/     # Playground page
│   ├── settings/       # Settings page
│   ├── signup/         # Signup page
│   └── support/        # Support page
├── components/         # Reusable UI components
│   ├── ui/            # shadcn/ui components
│   └── ...            # Custom components
├── contexts/          # React contexts
├── hooks/            # Custom React hooks
└── lib/              # Utility functions and configurations
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

This project is configured for deployment on:

- **Google Cloud Platform**: Using `app.yaml` and Cloud Build
- **Vercel**: Ready for Vercel deployment
- **Docker**: Includes Dockerfile for containerized deployment

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed deployment instructions.

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Support

If you encounter any issues or have questions, please:
1. Check the [documentation](./src/app/documentation)
2. Open an issue on GitHub
3. Visit the support page in the application
