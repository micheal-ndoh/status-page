# Tiny SaaS Status Page

A modern, feature-rich status page application built with Next.js, designed for teams to publicly display service uptime and manage incidents through a secure dashboard.

## ✨ Features

### Public Status Page
- **Real-time Service Status**: Display current uptime status of various services
- **Modern UI/UX**: Eye-catching design with Gen Z aesthetics and professional sophistication
- **Dynamic Animations**: Smooth page transitions and micro-interactions powered by Framer Motion
- **Responsive Design**: Fully responsive and accessible across all devices
- **Dark Mode Support**: Optional dark mode toggle for better user experience

### Incident Management Dashboard
- **Secure Authentication**: Email-based authentication with NextAuth.js
- **Incident Creation**: Comprehensive incident management with detailed forms
- **Service Management**: Full CRUD operations for services
- **Real-time Updates**: Live status updates and incident tracking
- **File Uploads**: Support for screenshots and logos with redundant storage

### Technical Features
- **Redundant Storage**: AWS S3 and Cubbit integration for file storage
- **Modern Database**: PostgreSQL with Prisma ORM for type-safe database operations
- **CMS Integration**: Strapi integration for content management
- **Form Validation**: Robust validation with Zod schemas
- **Type Safety**: Full TypeScript support throughout the application

## 🚀 Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **UI Framework**: Chakra UI
- **Animations**: Framer Motion
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with Email Provider
- **Form Handling**: React Hook Form with Zod validation
- **Storage**: AWS S3 + Cubbit (redundant)
- **CMS**: Strapi integration
- **Styling**: Chakra UI with custom theme
- **Icons**: Heroicons

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18+ 
- PostgreSQL database
- AWS S3 bucket (optional)
- Cubbit account (optional)
- Strapi instance (optional)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tiny-saas-status-page
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/status_page"
   
   # NextAuth.js
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   
   # Email Provider (for NextAuth)
   EMAIL_SERVER_HOST="smtp.gmail.com"
   EMAIL_SERVER_PORT=587
   EMAIL_SERVER_USER="your-email@gmail.com"
   EMAIL_SERVER_PASSWORD="your-app-password"
   EMAIL_FROM="noreply@yourdomain.com"
   
   # AWS S3 (optional)
   AWS_ACCESS_KEY_ID="your-aws-access-key"
   AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
   AWS_REGION="us-east-1"
   AWS_S3_BUCKET="your-s3-bucket-name"
   
   # Cubbit (optional)
   CUBBIT_ACCESS_KEY="your-cubbit-access-key"
   CUBBIT_SECRET_KEY="your-cubbit-secret-key"
   CUBBIT_BUCKET="your-cubbit-bucket-name"
   CUBBIT_ENDPOINT="https://s3.cubbit.eu"
   
   # Strapi CMS (optional)
   STRAPI_URL="https://your-strapi-instance.com"
   STRAPI_API_TOKEN="your-strapi-api-token"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   
   # (Optional) Run migrations
   npm run db:migrate
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Public status page
├── components/            # Reusable components
├── lib/                   # Utilities and configurations
│   ├── auth.ts           # NextAuth configuration
│   ├── prisma.ts         # Prisma client
│   ├── storage.ts        # Storage utilities
│   ├── strapi.ts         # Strapi integration
│   └── validations.ts    # Zod schemas
└── theme/                # Chakra UI theme
prisma/
└── schema.prisma         # Database schema
```

## 🔧 Configuration

### Database Setup
The application uses PostgreSQL with Prisma ORM. The schema includes:
- **Users**: Authentication and user management
- **Services**: Service definitions and status tracking
- **Incidents**: Incident management and updates
- **Attachments**: File storage references

### Authentication
The application uses NextAuth.js with email provider for passwordless authentication. Users receive magic links via email to sign in.

### Storage Configuration
The application supports redundant file storage:
- **Primary**: Cubbit (S3-compatible)
- **Fallback**: AWS S3
- **Sync**: Automatic synchronization between both services

## 🎨 Customization

### Theme Customization
The application uses a custom Chakra UI theme located in `src/theme/index.ts`. You can customize:
- Color palette
- Typography
- Component styles
- Dark mode configuration

### Styling
The application follows a modern design system with:
- Vibrant accent colors
- Clean typography
- Generous whitespace
- Smooth animations
- Responsive layouts

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📊 API Endpoints

### Public Endpoints
- `GET /api/services` - Get all services
- `GET /api/incidents` - Get all incidents

### Protected Endpoints
- `POST /api/services` - Create a service
- `PUT /api/services/[id]` - Update a service
- `DELETE /api/services/[id]` - Delete a service
- `POST /api/incidents` - Create an incident
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/activity` - Get recent activity

## 🔒 Security

- **Authentication**: Email-based authentication with NextAuth.js
- **Authorization**: Role-based access control
- **Validation**: Input validation with Zod schemas
- **CORS**: Configured for production use
- **Environment Variables**: Secure configuration management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the maintainers

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Chakra UI](https://chakra-ui.com/) for the component library
- [Prisma](https://www.prisma.io/) for the database toolkit
- [Framer Motion](https://www.framer.com/motion/) for animations
- [NextAuth.js](https://next-auth.js.org/) for authentication # status-page
