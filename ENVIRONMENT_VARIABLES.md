# Environment Variables Reference

This document lists all environment variables used in the Tiny SaaS Status Page application.

## 📋 Complete Environment Variables List

### **Required Variables**

#### **Database Configuration**
```env
# PostgreSQL database connection string
DATABASE_URL="postgresql://username:password@localhost:5432/status_page"
```

#### **NextAuth.js Authentication**
```env
# Your application URL (development/production)
NEXTAUTH_URL="http://localhost:3000"

# Secret key for JWT encryption (generate with: openssl rand -base64 32)
NEXTAUTH_SECRET="your-secret-key-here"
```

#### **Email Provider (NextAuth.js)**
```env
# SMTP server configuration for email authentication
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
EMAIL_FROM="noreply@yourdomain.com"
```

### **Optional Variables**

#### **AWS S3 Storage**
```env
# AWS credentials for S3 storage
AWS_ACCESS_KEY_ID="your-aws-access-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
AWS_REGION="us-east-1"
AWS_S3_BUCKET="your-s3-bucket-name"
```

#### **Cubbit Storage**
```env
# Cubbit credentials for redundant storage
CUBBIT_ACCESS_KEY="your-cubbit-access-key"
CUBBIT_SECRET_KEY="your-cubbit-secret-key"
CUBBIT_BUCKET="your-cubbit-bucket-name"
CUBBIT_ENDPOINT="https://s3.cubbit.eu"
```

#### **Strapi CMS Integration**
```env
# Strapi CMS configuration
STRAPI_URL="https://your-strapi-instance.com"
STRAPI_API_TOKEN="your-strapi-api-token"
```

## 🔧 Setup Instructions

### **1. Create Environment File**
```bash
# Copy the example file
cp env.example .env.local
```

### **2. Required Variables Setup**

#### **Database (Required)**
```env
DATABASE_URL="postgresql://username:password@localhost:5432/status_page"
```
- **Local PostgreSQL**: `postgresql://username:password@localhost:5432/status_page`
- **Supabase**: `postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres`
- **Railway**: `postgresql://postgres:[password]@[host]:[port]/[database]`
- **PlanetScale**: `mysql://[username]:[password]@[host]/[database]?sslaccept=strict`

#### **NextAuth.js (Required)**
```env
# Development
NEXTAUTH_URL="http://localhost:3000"

# Production
NEXTAUTH_URL="https://yourdomain.com"

# Generate a secure secret
NEXTAUTH_SECRET="your-generated-secret-key"
```

#### **Email Provider (Required for Authentication)**
```env
# Gmail Example
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
EMAIL_FROM="noreply@yourdomain.com"

# Other SMTP providers work too
# SendGrid, Mailgun, etc.
```

### **3. Optional Variables Setup**

#### **AWS S3 (Optional - for file storage)**
```env
AWS_ACCESS_KEY_ID="AKIAIOSFODNN7EXAMPLE"
AWS_SECRET_ACCESS_KEY="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
AWS_REGION="us-east-1"
AWS_S3_BUCKET="your-bucket-name"
```

#### **Cubbit (Optional - for redundant storage)**
```env
CUBBIT_ACCESS_KEY="your-cubbit-access-key"
CUBBIT_SECRET_KEY="your-cubbit-secret-key"
CUBBIT_BUCKET="your-bucket-name"
CUBBIT_ENDPOINT="https://s3.cubbit.eu"
```

#### **Strapi (Optional - for CMS)**
```env
STRAPI_URL="https://your-strapi-instance.com"
STRAPI_API_TOKEN="your-strapi-api-token"
```

## 🚀 Deployment Environment Variables

### **Vercel**
Add these in your Vercel project settings:
- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `EMAIL_SERVER_HOST`
- `EMAIL_SERVER_PORT`
- `EMAIL_SERVER_USER`
- `EMAIL_SERVER_PASSWORD`
- `EMAIL_FROM`
- `AWS_ACCESS_KEY_ID` (optional)
- `AWS_SECRET_ACCESS_KEY` (optional)
- `AWS_REGION` (optional)
- `AWS_S3_BUCKET` (optional)
- `CUBBIT_ACCESS_KEY` (optional)
- `CUBBIT_SECRET_KEY` (optional)
- `CUBBIT_BUCKET` (optional)
- `CUBBIT_ENDPOINT` (optional)
- `STRAPI_URL` (optional)
- `STRAPI_API_TOKEN` (optional)

### **Railway**
Add these in your Railway project environment variables.

### **Netlify**
Add these in your Netlify site settings.

## 🔒 Security Notes

### **Required for Production**
- ✅ `DATABASE_URL` - Database connection
- ✅ `NEXTAUTH_URL` - Application URL
- ✅ `NEXTAUTH_SECRET` - JWT encryption
- ✅ `EMAIL_SERVER_*` - Email authentication

### **Optional but Recommended**
- 🔶 `AWS_S3_*` - File storage
- 🔶 `CUBBIT_*` - Redundant storage
- 🔶 `STRAPI_*` - Content management

### **Security Best Practices**
1. **Never commit `.env.local` to version control**
2. **Use strong, unique secrets for `NEXTAUTH_SECRET`**
3. **Use environment-specific URLs for `NEXTAUTH_URL`**
4. **Rotate API keys regularly**
5. **Use least-privilege IAM roles for AWS**

## 🧪 Development vs Production

### **Development (.env.local)**
```env
NEXTAUTH_URL="http://localhost:3000"
DATABASE_URL="postgresql://localhost:5432/status_page_dev"
```

### **Production**
```env
NEXTAUTH_URL="https://yourdomain.com"
DATABASE_URL="postgresql://production-db-url"
```

## 🔍 Troubleshooting

### **Common Issues**

1. **"Database connection failed"**
   - Check `DATABASE_URL` format
   - Verify database is running
   - Check firewall settings

2. **"Authentication failed"**
   - Verify `NEXTAUTH_SECRET` is set
   - Check `NEXTAUTH_URL` matches your domain
   - Verify email server credentials

3. **"File upload failed"**
   - Check AWS S3 credentials
   - Verify bucket permissions
   - Check Cubbit configuration

4. **"Strapi integration not working"**
   - Verify `STRAPI_URL` is accessible
   - Check `STRAPI_API_TOKEN` permissions
   - Ensure content types exist in Strapi

### **Validation Commands**
```bash
# Test database connection
npm run db:studio

# Test Prisma connection
npx prisma db push

# Check environment variables
node -e "console.log(process.env.DATABASE_URL ? 'DB OK' : 'DB Missing')"
``` 