# MERN Backend API - Notes Project

A robust, production-ready backend API built with Node.js, Express.js, MongoDB, and Mongoose. This project demonstrates enterprise-level backend development practices with secure authentication, role-based access control, and RESTful API design.

---
# Backend API - Project Name

🚀 Postman Documentation:  
https://parbeen-s-team.docs.buildwithfern.com/notes-baclend-api/localhost-3000-api-admin

🔗 Live Backend URL:  
https://your-backend.onrender.com

## 📋 Project Overview

This backend application serves as the API layer for a full-stack MERN (MongoDB, Express, React, Node.js) application. It provides comprehensive user management, authentication, and authorization features with activity logging and admin controls. The API is designed with security best practices and scalability in mind.

### Key Characteristics:
- **Secure Authentication**: JWT-based authentication with access and refresh tokens
- **Stateless Architecture**: Leverages JWT for scalability across multiple servers
- **Role-Based Access Control**: Fine-grained permissions based on user roles
- **Production Ready**: Deployed and accessible on Render
- **Error Handling**: Comprehensive middleware for error management
- **Activity Tracking**: Built-in activity logging for audit trails

---

## ✨ Features

- ✅ **User Authentication**
  - User registration and login with password hashing (bcrypt)
  - JWT access tokens for API requests
  - Refresh tokens stored in HTTP-only cookies
  - Check login status endpoint

- ✅ **Authorization & RBAC**
  - Multiple user roles (admin, user)
  - Role-based middleware for protected routes
  - Granular permission control

- ✅ **User Management**
  - User profile management
  - Role assignment and modification
  - User data retrieval and updates

- ✅ **Admin Dashboard**
  - User management capabilities
  - Activity monitoring and logs
  - System statistics and analytics

- ✅ **Notes Management**
  - CRUD operations for user notes
  - Note filtering and search

- ✅ **Security Features**
  - Password hashing with bcrypt
  - CORS protection
  - Cookie-based refresh token storage
  - Error middleware for security
  - Input validation

- ✅ **Activity Logging**
  - Track user actions for audit trails
  - Activity history and reporting

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Runtime** | Node.js | 18+ |
| **Framework** | Express.js | ^5.2.1 |
| **Database** | MongoDB | Latest |
| **ODM** | Mongoose | ^9.6.1 |
| **Authentication** | JSON Web Token (JWT) | ^9.0.3 |
| **Password Hashing** | bcrypt | ^6.0.0 |
| **CORS** | cors | ^2.8.6 |
| **Cookie Parser** | cookie-parser | ^1.4.7 |
| **Environment Management** | dotenv | ^17.4.2 |
| **Deployment** | Render | - |

---

## 📁 Folder Structure

```
backend/
├── src/
│   ├── app.js                          # Express app configuration
│   ├── config/
│   │   └── db.js                       # MongoDB connection configuration
│   ├── controller/
│   │   ├── admin.controller.js         # Admin operations
│   │   ├── auth.controller.js          # Authentication logic
│   │   ├── notes.controller.js         # Notes CRUD operations
│   │   └── user.controller.js          # User operations
│   ├── middleware/
│   │   ├── activitylog.middleware.js   # Activity logging
│   │   ├── async.middleware.js         # Async error handling wrapper
│   │   ├── auth.middleware.js          # JWT verification
│   │   ├── error.middleware.js         # Global error handler
│   │   └── role.middleware.js          # RBAC authorization
│   ├── models/
│   │   ├── activitylog.model.js        # Activity log schema
│   │   ├── tasks.js                    # Tasks/Notes schema
│   │   └── user.model.js               # User schema
│   ├── routes/
│   │   ├── admin.routes.js             # Admin endpoints
│   │   ├── auth.routes.js              # Auth endpoints
│   │   ├── notes.route.js              # Notes endpoints
│   │   └── user.routes.js              # User endpoints
│   ├── services/
│   │   ├── admin.service.js            # Admin business logic
│   │   └── user.service.js             # User business logic
│   └── utility/
│       └── error.utils.js              # Custom error classes
├── server.js                           # Entry point
├── .env                                # Environment variables
├── .gitignore                          # Git ignore rules
└── package.json                        # Dependencies and scripts
```

---

## 🏗️ API Architecture

### Architecture Pattern: **MVC (Model-View-Controller)**

```
Request Flow:
┌─────────────┐
│   Request   │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────┐
│   Middleware Layer                  │
│  - Authentication (JWT)             │
│  - Authorization (RBAC)             │
│  - Error Handling                   │
│  - Activity Logging                 │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│   Routes                            │
│  (Request routing to controllers)   │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│   Controllers                       │
│  (Request handling & response)      │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│   Services                          │
│  (Business logic)                   │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│   Models                            │
│  (Database operations)              │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│   MongoDB                           │
│  (Data persistence)                 │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────┐
│  Response   │
└─────────────┘
```

### Key Design Principles:
- **Separation of Concerns**: Each layer has distinct responsibilities
- **Reusable Components**: Services contain shared business logic
- **Middleware Pipeline**: Sequential middleware execution for cross-cutting concerns
- **Error Propagation**: Centralized error handling through middleware

---

## 🔐 Authentication Flow

### JWT Token-Based Authentication

```
1. User Registration
   ├─ User submits credentials
   ├─ Password hashed with bcrypt
   ├─ User document stored in MongoDB
   └─ Confirmation response sent

2. User Login
   ├─ User submits email and password
   ├─ Password verified against hash
   ├─ JWT Access Token created (short-lived, ~15 minutes)
   ├─ JWT Refresh Token created (long-lived, ~7 days)
   ├─ Refresh Token stored in HTTP-only cookie
   ├─ Access Token sent in response
   └─ Client stores Access Token in memory

3. API Request
   ├─ Client includes Access Token in Authorization header
   ├─ Server verifies token with JWT_SECRET
   ├─ If valid: Request proceeds with user context
   └─ If invalid/expired: 401 Unauthorized returned

4. Token Refresh
   ├─ When Access Token expires
   ├─ Client calls /api/auth/refresh endpoint
   ├─ Server verifies Refresh Token from cookie
   ├─ New Access Token issued
   ├─ New Refresh Token may be issued
   └─ Cycle continues
```

### Token Structure:
```javascript
// Access Token Payload
{
  userId: "ObjectId",
  email: "user@example.com",
  role: "user",
  iat: 1234567890,
  exp: 1234571490
}

// Refresh Token Payload
{
  userId: "ObjectId",
  iat: 1234567890,
  exp: 1234654290
}
```

---

## 👥 Role-Based Access Control (RBAC)

### Role Hierarchy & Permissions

| Role | Level | Permissions | Endpoints |
|------|-------|-----------|-----------|
| **Admin** | 1 (Highest) | All system access, user management, view logs, system config | `/api/admin/*` |
| **User** | 2 | Create/edit own notes, view own profile, limited data | `/api/user/*`, `/api/notes/*` |
| **Guest** | 3 | Public endpoints only | `/api/auth/register`, `/api/auth/login` |

### Authorization Implementation:

```javascript
// Example: Admin-only route
router.get("/users", isAuthenticated, authorizeRoles("admin"), adminController.getAllUsers);

// Example: User route with role check
router.get("/profile", isAuthenticated, authorizeRoles("user", "admin"), userController.getProfile);
```

### Middleware Execution:
```
Request
  ↓
isAuthenticated (JWT Verification)
  ↓
authorizeRoles (Role Check)
  ↓
Route Handler
```

---

## 📊 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Authentication | Description |
|--------|----------|-----------------|-------------|
| POST | `/api/auth/register` | ❌ None | Register new user |
| POST | `/api/auth/login` | ❌ None | User login, returns JWT |
| GET | `/api/auth/checklogin` | ✅ JWT | Verify user session |
| POST | `/api/auth/refresh` | ⚠️ Refresh Cookie | Get new access token |

### User Endpoints

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| GET | `/api/user/profile` | ✅ | User, Admin | Get user profile |
| PUT | `/api/user/profile` | ✅ | User, Admin | Update user profile |
| GET | `/api/user/all` | ✅ | Admin | Get all users |
| PUT | `/api/user/:id/role` | ✅ | Admin | Change user role |

### Notes Endpoints

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| POST | `/api/notes` | ✅ | User, Admin | Create note |
| GET | `/api/notes` | ✅ | User, Admin | Get user notes |
| GET | `/api/notes/:id` | ✅ | User, Admin | Get single note |
| PUT | `/api/notes/:id` | ✅ | User, Admin | Update note |
| DELETE | `/api/notes/:id` | ✅ | User, Admin | Delete note |

### Admin Endpoints

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| GET | `/api/admin/activity-logs` | ✅ | Admin | View activity logs |
| GET | `/api/admin/statistics` | ✅ | Admin | Get system statistics |
| GET | `/api/admin/users` | ✅ | Admin | List all users |
| DELETE | `/api/admin/users/:id` | ✅ | Admin | Delete user |

### Response Format

**Success Response (200, 201):**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "user_id",
    "email": "user@example.com",
    "role": "user"
  }
}
```

**Error Response (400, 401, 403, 500):**
```json
{
  "success": false,
  "message": "Error description",
  "statusCode": 400
}
```

---

## 🚀 Installation Steps

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- MongoDB Atlas account (for cloud database)
- Git

### Step 1: Clone Repository
```bash
git clone https://github.com/yourusername/mern-backend.git
cd backend
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install all required packages:
- express (web framework)
- mongoose (MongoDB ODM)
- jsonwebtoken (JWT authentication)
- bcrypt (password hashing)
- cors (cross-origin requests)
- cookie-parser (cookie handling)
- dotenv (environment variables)

### Step 3: Environment Setup
See [Environment Variables](#-environment-variables) section below.

### Step 4: Database Setup
- Create MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
- Create a cluster and database
- Get connection string
- Add connection string to `.env` file

### Step 5: Start Development Server
```bash
npm run dev
```

The server will start on `http://localhost:3000`

---

## 🔑 Environment Variables

### Required Variables

Create a `.env` file in the root of the backend directory:

```env
# Server Configuration
PORT=3000

# Database Configuration
MONGO_URI=mongodb+srv://username:password@cluster-name.mongodb.net/database-name?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your-secret-key-generate-a-strong-random-string-of-at-least-32-characters

# Frontend URLs (CORS)
FRONTEND_URL=http://localhost:5173
PRODUCTION_FRONTEND_URL=https://your-frontend.vercel.app

# Optional: Node Environment
NODE_ENV=development
```

### Environment Variable Guidelines

| Variable | Purpose | Example |
|----------|---------|---------|
| `PORT` | Server port number | `3000` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret for signing JWT tokens | 64-char random string |
| `FRONTEND_URL` | Development frontend URL | `http://localhost:5173` |
| `PRODUCTION_FRONTEND_URL` | Production frontend URL | `https://app.example.com` |
| `NODE_ENV` | Environment type | `development`, `production` |

### Generating a Secure JWT_SECRET

Use this command to generate a secure random string:

**Linux/Mac:**
```bash
openssl rand -hex 32
```

**Windows PowerShell:**
```powershell
[System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32) | ForEach-Object { $_.ToString("X2") } | Join-String
```

**Node.js (any platform):**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 💻 Running Locally

### Development Mode

Start the development server with hot-reload:

```bash
npm run dev
```

**Output:**
```
Server running on http://localhost:3000
MongoDB connected successfully
```

### Production Mode

Start the server in production mode:

```bash
npm start
```

### Testing the API

Using cURL:
```bash
# Register new user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"securepassword123","name":"John Doe"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"securepassword123"}'

# Get user profile (include access token from login response)
curl -X GET http://localhost:3000/api/user/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Using Postman

1. Import API collection or create requests manually
2. Add tokens to `Authorization` header: `Bearer {access_token}`
3. Test endpoints with different roles and permissions
4. Verify response structures and error handling

---

## 🌐 Deployment Link

### Live API URL
**https://mern-backend-production.onrender.com**

### Deployment Details
- **Platform**: Render
- **Region**: Auto
- **Environment**: Production
- **Status**: Active

### Deployment Process

The application is deployed on Render using the following steps:

1. **Repository Connection**
   - Linked GitHub repository to Render
   - Auto-deploy on main branch push

2. **Environment Variables**
   - Configured all `.env` variables in Render dashboard
   - Secured sensitive information

3. **Build Command**
   ```bash
   npm install
   ```

4. **Start Command**
   ```bash
   npm start
   ```

5. **Verification**
   - Health check endpoint responds
   - Database connection successful
   - All middleware initialized

### Accessing Live API

Test the live deployment:
```bash
curl https://mern-backend-production.onrender.com/api/auth/checklogin
```

### Monitoring

- **Render Dashboard**: Monitor logs and resource usage
- **MongoDB Atlas**: Track database metrics
- **Error Tracking**: Monitor application errors and exceptions

---

## 🔒 Security Practices Used

### 1. **Password Security**
- ✅ Passwords hashed using bcrypt with salt rounds (10+)
- ✅ Never store plain-text passwords
- ✅ Constant-time comparison to prevent timing attacks

```javascript
// Example
const hashedPassword = await bcrypt.hash(plainPassword, 10);
```

### 2. **JWT Authentication**
- ✅ Access tokens with short expiration (15 minutes)
- ✅ Refresh tokens with longer expiration (7 days)
- ✅ Tokens signed with strong secret
- ✅ Token verification on every protected request

### 3. **CORS Protection**
- ✅ Whitelist allowed origins
- ✅ Credentials allowed only from trusted domains
- ✅ Prevents cross-site request forgery

```javascript
const allowedOrigins = [
  "http://localhost:5173",
  "https://frontend-production.com"
];
```

### 4. **HTTP-Only Cookies**
- ✅ Refresh tokens stored in HTTP-only cookies
- ✅ Inaccessible to JavaScript (XSS protection)
- ✅ Automatic transmission with requests
- ✅ Secure flag enabled in production

### 5. **Authorization & RBAC**
- ✅ Role-based access control on all protected endpoints
- ✅ User-level permission checks
- ✅ Principle of least privilege

### 6. **Input Validation & Sanitization**
- ✅ Validate all incoming data
- ✅ Sanitize user inputs before database operations
- ✅ Prevent NoSQL injection attacks

### 7. **Error Handling**
- ✅ Generic error messages to prevent information leakage
- ✅ Detailed logging for debugging (not exposed to clients)
- ✅ Centralized error middleware

### 8. **Environment Variables**
- ✅ Sensitive data in `.env` (not in version control)
- ✅ Different secrets for dev and production
- ✅ Never commit `.env` file to Git

### 9. **Database Security**
- ✅ MongoDB Atlas IP whitelist
- ✅ Strong authentication credentials
- ✅ Encrypted connections (MongoDB+srv protocol)

### 10. **API Security**
- ✅ Rate limiting (recommended for production)
- ✅ Request size limits
- ✅ HTTPS in production
- ✅ Security headers implementation (recommended)

### Security Headers (Recommended Enhancement)

Consider adding these headers using `helmet` middleware:

```javascript
const helmet = require('helmet');
app.use(helmet());
```

---

## 🎯 Future Improvements

### Short-term Enhancements
- [ ] **Rate Limiting**: Implement rate limiting using `express-rate-limit`
- [ ] **Input Validation**: Add comprehensive validation using `joi` or `zod`
- [ ] **Security Headers**: Implement Helmet.js for HTTP security headers
- [ ] **Request Logging**: Add morgan middleware for detailed request logging
- [ ] **Email Verification**: Implement email verification for new registrations
- [ ] **Password Reset**: Add forgot password functionality with email tokens

### Medium-term Features
- [ ] **Two-Factor Authentication (2FA)**: TOTP or SMS-based 2FA
- [ ] **Social Authentication**: OAuth integration (Google, GitHub, etc.)
- [ ] **API Documentation**: Swagger/OpenAPI documentation
- [ ] **Pagination**: Implement cursor-based or offset pagination
- [ ] **Search & Filtering**: Advanced search capabilities for notes
- [ ] **File Upload**: Support for file attachments/document uploads
- [ ] **Real-time Updates**: WebSocket integration for live notifications
- [ ] **Data Export**: CSV/PDF export functionality

### Long-term Scalability
- [ ] **Caching Layer**: Redis integration for performance optimization
- [ ] **API Versioning**: Support multiple API versions (v1, v2, etc.)
- [ ] **Microservices**: Split into separate microservices if needed
- [ ] **Load Balancing**: Multi-instance deployment with load balancer
- [ ] **Message Queue**: Implement job queue for async operations
- [ ] **Analytics**: Comprehensive analytics and reporting
- [ ] **Backup & Recovery**: Automated backup and disaster recovery
- [ ] **Performance Monitoring**: APM tools integration (New Relic, DataDog)

### Developer Experience
- [ ] **Testing**: Unit tests, integration tests, and E2E tests
- [ ] **CI/CD Pipeline**: Automated testing and deployment
- [ ] **Docker**: Containerize application for consistency
- [ ] **Environment Profiles**: Development, staging, production configs
- [ ] **API Client SDK**: Generate TypeScript SDK for frontend

### DevOps & Deployment
- [ ] **Docker & Kubernetes**: Container orchestration
- [ ] **GitHub Actions**: Automated CI/CD workflows
- [ ] **Database Migrations**: Schema versioning and migrations
- [ ] **Monitoring & Alerting**: Error tracking and performance alerts
- [ ] **Blue-Green Deployment**: Zero-downtime deployments

---

## 👨‍💼 Author

Parbeen Singh Panwar
- **Email**: parbeensingh27@gmail.com
- **GitHub**: [@Parbeen27](https://github.com/yourusername)
- **LinkedIn**: [your-linkedin](https://linkedin.com/in/yourprofile)



---

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 🤝 Contributing

For contributions or feedback, please reach out directly.

---

## 📞 Support

For issues, questions, or feedback:
- Email: parbeensingh@gmail.com
- GitHub Issues: [Create an issue](https://github.com/yourusername/mern-backend/issues)

---

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc7519)
- [OWASP API Security](https://owasp.org/www-project-api-security/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

---

**Last Updated**: May 2026
**Version**: 1.0.0

---


