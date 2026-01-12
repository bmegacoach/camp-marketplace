# CAMP AI Agent Marketplace

The NASDAQ for the Streets - A marketplace for AI agents, tokenized sponsorships, and real world assets on a bond curve.

## Features

- **AI Agent Marketplace**: Browse and trade AI agent tokens
- **Qualified Campers**: Tech Camp scholarship recipients ready for sponsorship
- **RWA Listings**: Tokenized real world property investments
- **Service Agents**: AI-powered business service agents
- **Wallet Integration**: Connect with MetaMask or compatible Web3 wallets

## Tech Stack

- React 18 + TypeScript
- Vite for build tooling
- TailwindCSS for styling
- React Router for navigation
- Firebase (Firestore, Auth, Storage) for backend

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm package manager
- Firebase CLI (`npm install -g firebase-tools`)

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Environment Variables

Firebase credentials are pre-configured in `src/lib/firebase.ts` for the `coachai-camp-ecosystem` project.

For custom projects, update the firebaseConfig object in that file or create a `.env` file:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Firebase Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Firestore Database
4. Enable Authentication (Email/Password, Google)
5. Enable Storage

### 2. Configure Firebase

1. Update `firebase/.firebaserc` with your project ID
2. Copy Firebase config to environment variables
3. Copy `firebase/firebase.json` to project root

### 3. Deploy Firebase Rules

```bash
# Login to Firebase
firebase login

# Deploy Firestore rules and indexes
pnpm deploy:rules
pnpm deploy:indexes
```

## Build and Deploy

### Local Build

```bash
pnpm build
pnpm preview
```

### Deploy to Firebase Hosting

```bash
# Deploy everything
pnpm deploy

# Deploy only hosting
pnpm deploy:hosting
```

### GitHub Actions (Automated)

The project includes a GitHub Actions workflow for automated deployment:

1. Add the following secrets to your GitHub repository:
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_SERVICE_ACCOUNT` (JSON key from Firebase Console)
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`

2. Push to `main` branch to trigger deployment

## Project Structure

```
camp-marketplace/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── services/       # API and service integrations
│   ├── contexts/       # React contexts
│   ├── data/           # Mock data and types
│   └── types/          # TypeScript type definitions
├── firebase/
│   ├── firebase.json         # Firebase configuration
│   ├── firestore.rules       # Firestore security rules
│   ├── firestore.indexes.json # Firestore indexes
│   ├── firebase-config.ts    # Firebase client config
│   └── firebase-services.ts  # Firebase service functions
├── .github/
│   └── workflows/
│       └── firebase-deploy.yml # GitHub Actions deployment
└── public/             # Static assets
```

## Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm deploy` | Deploy to Firebase |
| `pnpm deploy:hosting` | Deploy only hosting |
| `pnpm deploy:rules` | Deploy Firestore rules |
| `pnpm deploy:indexes` | Deploy Firestore indexes |

## License

Private - All rights reserved.
