# Strapi CMS Deployment Guide

This guide shows you how to deploy the Strapi CMS from your main project repository to Render.

## 🚀 **Quick Deploy to Render**

### **Step 1: Deploy to Render**

1. **Go to Render**: https://render.com/
2. **Click "New +" → "Web Service"**
3. **Connect your GitHub repository** (the main status page repo)
4. **Configure the service:**

   - **Name**: `strapi-cms`
   - **Environment**: `Node`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `strapi` ⭐ **Important!**
   - **Build Command**: `npm install && node scripts/build.js`
   - **Start Command**: `npm start`
   - **Plan**: `Free`

### **Step 2: Add Environment Variables**

In Render, add these environment variables:

```env
NODE_ENV=production
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
JWT_SECRET=your-super-secret-jwt-key-here
ADMIN_JWT_SECRET=your-super-secret-admin-jwt-key-here
APP_KEYS=your-app-keys-here,your-app-keys-here-2
API_TOKEN_SALT=your-api-token-salt-here
TRANSFER_TOKEN_SALT=your-transfer-token-salt-here
```

**Generate random secrets:**
```bash
node -e "console.log('JWT_SECRET=' + require('crypto').randomBytes(32).toString('hex'))"
node -e "console.log('ADMIN_JWT_SECRET=' + require('crypto').randomBytes(32).toString('hex'))"
node -e "console.log('APP_KEYS=' + require('crypto').randomBytes(32).toString('hex') + ',' + require('crypto').randomBytes(32).toString('hex'))"
node -e "console.log('API_TOKEN_SALT=' + require('crypto').randomBytes(32).toString('hex'))"
node -e "console.log('TRANSFER_TOKEN_SALT=' + require('crypto').randomBytes(32).toString('hex'))"
```

### **Step 3: Deploy**

1. **Click "Create Web Service"**
2. **Wait for deployment** (5-10 minutes)
3. **Your Strapi URL will be**: `https://strapi-cms.onrender.com`

## 🔧 **Alternative: Using render.yaml**

If you prefer automatic configuration:

1. **The `render.yaml` file is already in the `strapi/` folder**
2. **In Render, you can import this configuration**
3. **All environment variables will be auto-generated**

## 🎯 **Set Up Strapi Admin**

### **Step 1: Create Admin Account**

1. **Go to your Strapi URL**: `https://strapi-cms.onrender.com/admin`
2. **Create your first admin account:**
   - **First Name**: Your name
   - **Last Name**: Your last name
   - **Email**: Your email
   - **Password**: Create a strong password
3. **Click "Create your account"**

### **Step 2: Create API Token**

1. **In Strapi admin**, go to **Settings** (gear icon) → **API Tokens**
2. **Click "Create new API Token"**
3. **Fill in:**
   - **Name**: `Status Page API`
   - **Description**: `API token for status page integration`
   - **Token duration**: `Unlimited`
   - **Token type**: `Full access`
4. **Click "Save"**
5. **Copy the generated token** (this is your `STRAPI_API_TOKEN`)

## 📝 **Configure Your Status Page**

Add these to your main project's `.env.local`:

```env
# Strapi CMS Integration
STRAPI_URL="https://strapi-cms.onrender.com"
STRAPI_API_TOKEN="your-generated-api-token"
```

## 🧪 **Test the Integration**

1. **Start your status page app:**
   ```bash
   npm run dev
   ```

2. **Go to**: `http://localhost:3000/dashboard`

3. **You should see Strapi data loading** (if configured correctly)

## 📁 **Project Structure**

```
your-project/
├── src/                    # Main status page app
├── strapi/                 # Strapi CMS
│   ├── package.json       # Strapi dependencies
│   ├── render.yaml        # Render configuration
│   ├── Dockerfile         # Docker configuration
│   └── README.md          # Strapi documentation
├── package.json           # Main app dependencies
└── README.md             # Main app documentation
```

## 🔍 **Troubleshooting**

### **Common Issues:**

1. **"Build failed"**
   - Check that **Root Directory** is set to `strapi`
   - Verify all environment variables are set

2. **"Service not accessible"**
   - Wait 5-10 minutes for full deployment
   - Check if the service is "Live" in Render dashboard

3. **"Database error"**
   - SQLite is used by default (no setup needed)
   - Check environment variables are correct

### **Local Development:**

```bash
# Run Strapi locally
cd strapi
npm install
npm run develop

# Strapi will be available at: http://localhost:1337/admin
```

## 🎉 **Success!**

Once deployed, your Strapi CMS will be available at:
- **Admin Panel**: `https://strapi-cms.onrender.com/admin`
- **API**: `https://strapi-cms.onrender.com/api`

Your status page will automatically connect to this Strapi instance for CMS functionality! 