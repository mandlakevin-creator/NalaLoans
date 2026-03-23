# NALA Personal Loans - MVP

A modern, professional personal loans platform inspired by Wonga, built with React, TypeScript, and tRPC. NALA provides fast, simple, and honest personal loans with transparent pricing and instant decisions.

## 🚀 Features

### Core Features (MVP)
- **Interactive Loan Calculator**: Real-time calculation with dual sliders for loan amount (R1,000-R50,000) and period (7-180 days)
- **Loan Eligibility Checker**: Pre-qualification system that scores applicants and recommends loan amounts
- **User Dashboard**: Track active loans, payment history, and applications
- **Multi-Step Loan Application**: Comprehensive form for personal details, income verification, and bank information
- **Professional UI**: Mobile-first responsive design with NALA's green color scheme
- **Secure Authentication**: Manus OAuth integration for user authentication

### Interest Structure
- **40% Total Annual Interest Rate**
  - 20% NCR regulated cap
  - 20% Admin fees for operational costs
- Transparent fee structure with no hidden charges
- Real-time calculation of monthly installments and total repayment

### Database
- User management with profile information
- Loan tracking (active, completed, defaulted)
- Application workflow management
- Payment history and transaction records
- Loan products and eligibility criteria
- OTP verification system
- Educational content management

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS 4, shadcn/ui
- **Backend**: Express 4, tRPC 11, Node.js
- **Database**: MySQL/TiDB with Drizzle ORM
- **Authentication**: Manus OAuth
- **Testing**: Vitest
- **Build**: Vite, esbuild

## 📋 Project Structure

```
nala-loans/
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx              # Landing page with calculator
│   │   │   ├── EligibilityChecker.tsx # Pre-qualification tool
│   │   │   ├── LoanApplication.tsx   # Multi-step application form
│   │   │   └── Dashboard.tsx         # User dashboard
│   │   ├── components/               # Reusable UI components
│   │   ├── lib/
│   │   │   └── trpc.ts              # tRPC client
│   │   ├── App.tsx                  # Routes and layout
│   │   └── index.css                # Global styles
│   └── public/                       # Static assets
├── server/
│   ├── routers.ts                   # tRPC procedures
│   ├── db.ts                        # Database helpers
│   ├── calculator.test.ts           # Unit tests
│   └── _core/                       # Framework internals
├── drizzle/
│   ├── schema.ts                    # Database schema
│   └── migrations/                  # SQL migrations
├── shared/                          # Shared types and constants
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js 22.13.0+
- pnpm 10.4.1+
- MySQL/TiDB database

### Installation

```bash
# Clone the repository
git clone https://github.com/mandlakevin-creator/NalaLoans.git
cd NalaLoans

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local

# Run database migrations
pnpm drizzle-kit generate
pnpm drizzle-kit migrate

# Start development server
pnpm dev
```

### Development

```bash
# Start dev server (runs on http://localhost:3000)
pnpm dev

# Run TypeScript check
pnpm check

# Run tests
pnpm test

# Format code
pnpm format

# Build for production
pnpm build

# Start production server
pnpm start
```

## 📊 API Endpoints

### Public Procedures
- `calculator.calculateLoan`: Calculate loan details (amount, interest, monthly payment)
- `eligibility.checkEligibility`: Check user eligibility and get recommended loan amount

### Protected Procedures
- `loans.getLoans`: Get user's active loans
- `applications.getApplications`: Get user's applications
- `profile.getProfile`: Get user profile information

## 🧪 Testing

The project includes comprehensive unit tests for the loan calculator and eligibility checker:

```bash
# Run all tests
pnpm test

# Run specific test file
pnpm test server/calculator.test.ts
```

**Test Coverage:**
- Loan calculation accuracy (interest, fees, monthly installments)
- Eligibility scoring logic
- Age and income validation
- Max loan amount calculation
- Employment status impact on scoring

## 🎨 Design System

### Colors
- **Primary**: NALA Green (#4a9d6f) - Professional financial brand color
- **Secondary**: Teal (#50b8a0) - Complementary accents
- **Destructive**: Red (#e74c3c) - Alerts and errors
- **Neutral**: Grays for backgrounds and text

### Typography
- **Headings**: Plus Jakarta Sans (700, 800)
- **Body**: Inter (400, 500, 600)

### Components
- Buttons (primary, secondary, outline)
- Cards with shadows and borders
- Forms with validation
- Sliders for interactive input
- Badges for status indicators
- Modals and dialogs

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: 640px (sm), 1024px (lg)
- Touch-friendly button sizes
- Optimized layouts for all screen sizes

## 🔐 Security

- Manus OAuth for authentication
- Session-based security with HTTP-only cookies
- Protected routes for authenticated users
- Input validation on client and server
- Environment variables for sensitive data

## 📈 Performance

- Optimized bundle size with tree-shaking
- Code splitting for routes
- Lazy loading of components
- Efficient database queries
- Caching strategies

## 🚀 Deployment

The project is ready for deployment on Manus hosting:

1. Create a checkpoint in the Manus UI
2. Click "Publish" to deploy
3. Custom domain support available

**Live URL**: https://nalaloans-hjhv9quk.manus.space

## 📝 Environment Variables

```env
# Database
DATABASE_URL=mysql://user:password@host:port/database

# Authentication
JWT_SECRET=your-secret-key
VITE_APP_ID=your-app-id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://oauth.manus.im

# API
BUILT_IN_FORGE_API_URL=https://api.manus.im
BUILT_IN_FORGE_API_KEY=your-api-key
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im
VITE_FRONTEND_FORGE_API_KEY=your-frontend-key

# Owner
OWNER_NAME=Your Name
OWNER_OPEN_ID=your-open-id
```

## 🗺️ Roadmap

### Phase 2 (Next)
- [ ] Stripe payment integration for loan repayments
- [ ] OTP verification system
- [ ] Advanced eligibility criteria
- [ ] Payment history and receipts
- [ ] Loan repayment scheduling

### Phase 3
- [ ] Educational content (Money Academy)
- [ ] Financial literacy resources
- [ ] Blog and articles
- [ ] FAQ section

### Phase 4
- [ ] Admin dashboard
- [ ] Loan management tools
- [ ] Analytics and reporting
- [ ] Customer support chat

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📄 License

This project is proprietary and confidential. All rights reserved.

## 📞 Support

For support, contact: support@nalaloans.com

## 🙏 Acknowledgments

- Inspired by Wonga's professional lending platform
- Built with modern web technologies
- Designed for South African market

---

**Version**: 1.0.0 (MVP)  
**Last Updated**: March 2026  
**Status**: Production Ready
// Vercel rebuild trigger
