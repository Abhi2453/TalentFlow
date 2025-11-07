# TalentFlow

TalentFlow is a modern recruitment management system built with React and TailwindCSS that helps streamline your hiring process.

## Features

- 📊 Interactive Dashboard with hiring metrics
- 💼 Job posting and management
- 👥 Candidate tracking and management 
- 📋 Kanban board for application status
- 📝 Assessment creation and management
- 🌓 Dark/Light mode support
- 📱 Responsive design

## Tech Stack

- React
- TailwindCSS
- React Router
- Recharts
- Lucide Icons
- Vite

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm/yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/TalentFlow.git
cd TalentFlow
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── data/          # Data services
├── hooks/         # Custom React hooks
├── server/        # Backend API routes
└── assets/        # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## Deployment

### Building for Production

1. Create a production build:
```bash
npm run build
```

2. Preview the production build locally:
```bash
npm run preview
```

### Deploying to Vercel

1. Install Vercel CLI globally:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy the application:
```bash
vercel
```

4. For subsequent deployments:
```bash
vercel --prod
```

Environment Variables required:
- `VITE_API_URL`: Your backend API URL
- `VITE_AUTH_DOMAIN`: Authentication domain (if using auth service)
- `VITE_APP_ENV`: Production/Development environment

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Recharts](https://recharts.org/)
- [Lucide Icons](https://lucide.dev/)

