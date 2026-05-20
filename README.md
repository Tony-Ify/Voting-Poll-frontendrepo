# Poll & Voting System - Frontend (Angular)

## 📋 Project Overview

Frontend UI for a civic engagement platform that allows users to:
- Create accounts with state selection
- View and vote on polls
- See voting results filtered by region (state-level)
- Manage their profiles
- Admin interface for poll management

Built with **Angular 16+** with **Reactive Forms**, **TypeScript**, and **Tailwind CSS**.

---

## 🎯 Project Requirements

### Core Features Implemented

✅ **User Authentication**
- Sign up with email, password, name, and state
- Login with JWT token
- Token storage in localStorage
- Token refresh on expiration
- Logout functionality
- Protected routes with AuthGuard

✅ **User Profile**
- View profile information (name, email, state)
- Edit profile (optional)
- Display user role (user/admin)

✅ **Dashboard**
- View active polls
- View closed polls
- Switch between active/closed tabs
- Display poll cards with details
- Vote button on each poll
- View results button
- Empty state when no polls
- Loading spinners
- Error handling

✅ **Voting**
- Select poll option
- Submit vote
- One vote per poll enforced
- Success message on vote submission
- Redirect to results on vote
- Error handling for already voted

✅ **Results Page**
- Display total votes
- Show vote count per option
- Show percentage
- Visual progress bars
- Filter results by state
- Compare state-based results

✅ **Admin Features**
- Create new polls
- Edit existing polls
- Delete polls
- Close/reopen polls
- View all polls (active & closed)
- Create admin users

✅ **UI/UX**
- Dark/Light theme toggle
- Responsive mobile design
- Loading states
- Error messages
- Success messages
- Form validation
- Clean navigation

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **Angular** | 16+ | Frontend framework |
| **TypeScript** | 5+ | Language |
| **RxJS** | 7+ | Reactive programming |
| **Tailwind CSS** | 3+ | Styling |
| **Reactive Forms** | - | Form management |
| **Angular Router** | - | Routing |
| **HttpClient** | - | API communication |
| **Node.js** | 18+ | Runtime |
| **npm** | 9+ | Package manager |

---

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm 9+
- Angular CLI 16+
- Git

### Step 1: Install Angular CLI

```bash
npm install -g @angular/cli@latest
```

### Step 2: Clone Repository

```bash
git clone <your-frontend-repo-url>
cd frontend
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Environment Setup

Create `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
};
```

Create `src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-api-domain.com/api',
};
```

### Step 5: Update API Configuration

Update `src/app/services/api.service.ts` with correct API URL:

```typescript
private apiUrl = environment.apiUrl; // Defaults to http://localhost:3000/api
```

### Step 6: Start Development Server

```bash
ng serve --open
```

Application will open at `http://localhost:4200`

---

## 📁 Project Structure

```
src/
├── app/
│   ├── modules/
│   │   ├── auth/                           # Authentication module
│   │   │   ├── login.component/
│   │   │   │   ├── login.component.ts
│   │   │   │   ├── login.component.html
│   │   │   │   └── login.component.css
│   │   │   ├── signup.component/
│   │   │   │   ├── signup.component.ts
│   │   │   │   ├── signup.component.html
│   │   │   │   └── signup.component.css
│   │   │   ├── auth.module.ts
│   │   │   ├── auth-routing.module.ts
│   │   │   └── auth.dto.ts
│   │   │
│   │   ├── polls/                          # Polls module
│   │   │   ├── poll-list/
│   │   │   │   ├── poll-list.ts
│   │   │   │   ├── poll-list.html
│   │   │   │   └── poll-list.css
│   │   │   ├── poll-detail/
│   │   │   │   ├── poll-detail.ts
│   │   │   │   ├── poll-detail.html
│   │   │   │   └── poll-detail.css
│   │   │   ├── results/
│   │   │   │   ├── results.ts
│   │   │   │   ├── results.html
│   │   │   │   └── results.css
│   │   │   ├── polls.module.ts
│   │   │   ├── polls-routing.module.ts
│   │   │   ├── polls.service.ts
│   │   │   └── poll.dto.ts
│   │   │
│   │   ├── admin/                          # Admin module
│   │   │   ├── admin-dashboard/
│   │   │   │   ├── admin-dashboard.ts
│   │   │   │   ├── admin-dashboard.html
│   │   │   │   └── admin-dashboard.css
│   │   │   ├── poll-management/
│   │   │   │   ├── poll-management.ts
│   │   │   │   ├── poll-management.html
│   │   │   │   └── poll-management.css
│   │   │   ├── create-admin/
│   │   │   │   ├── create-admin.ts
│   │   │   │   ├── create-admin.html
│   │   │   │   └── create-admin.css
│   │   │   ├── admin.module.ts
│   │   │   └── admin-routing.module.ts
│   │   │
│   │   ├── user/                           # User module
│   │   │   ├── profile/
│   │   │   │   ├── profile.ts
│   │   │   │   ├── profile.html
│   │   │   │   └── profile.css
│   │   │   ├── user.module.ts
│   │   │   └── user-routing.module.ts
│   │   │
│   │   └── votes/                          # Votes module
│   │       └── votes.service.ts
│   │
│   ├── services/
│   │   ├── auth.service.ts                 # Authentication logic
│   │   ├── api.service.ts                  # Base API service
│   │   ├── polls.service.ts                # Polls API calls
│   │   ├── votes.service.ts                # Votes API calls
│   │   └── theme.service.ts                # Theme management
│   │
│   ├── shared/
│   │   ├── navbar.component/
│   │   │   ├── navbar.component.ts
│   │   │   ├── navbar.component.html
│   │   │   └── navbar.component.css
│   │   ├── footer.component/
│   │   │   ├── footer.component.ts
│   │   │   ├── footer.component.html
│   │   │   └── footer.component.css
│   │   ├── loading-spinner.component/
│   │   │   ├── loading-spinner.component.ts
│   │   │   ├── loading-spinner.component.html
│   │   │   └── loading-spinner.component.css
│   │   ├── auth.guard.ts                   # Protect authenticated routes
│   │   ├── no-auth.guard.ts                # Protect auth pages
│   │   ├── admin.guard.ts                  # Protect admin routes
│   │   ├── auth.interceptor.ts             # Add token to requests
│   │   └── shared.module.ts
│   │
│   ├── app.ts                              # Root component
│   ├── app.html
│   ├── app.css
│   ├── app.config.ts                       # App configuration
│   ├── app.routes.ts                       # Route definitions
│   ├── app.module.ts                       # App module
│   └── app.spec.ts
│
├── styles/
│   ├── global.css                          # Global styles
│   ├── responsive.css                      # Responsive styles
│   └── styles.css                          # Main styles
│
├── environments/
│   ├── environment.ts                      # Dev config
│   └── environment.prod.ts                 # Prod config
│
├── index.html
├── main.ts
└── styles.css
```

---

## 🔌 API Integration

### Base URL
```typescript
http://localhost:3000/api
```

### Services Used

#### AuthService
```typescript
signUp(name, email, password, state): Observable<User>
login(email, password): Observable<User>
logout(): void
isAuthenticated(): boolean
getCurrentUser(): User | null
```

#### PollsService
```typescript
getAllPolls(): Observable<Poll[]>
getActivePools(): Observable<Poll[]>
getClosedPools(): Observable<Poll[]>
getPollById(id): Observable<Poll>
createPoll(poll): Observable<Poll>
updatePoll(id, poll): Observable<Poll>
updatePollStatus(id, status): Observable<Poll>
deletePoll(id): Observable<void>
```

#### VotesService
```typescript
submitVote(pollId, optionId, state): Observable<Vote>
getUserPollVote(pollId): Observable<Vote | null>
getPollVotes(pollId): Observable<Vote[]>
getPollResults(pollId): Observable<PollResults>
getPollResultsByState(pollId, state): Observable<PollResults>
getPollResultsByAllStates(pollId): Observable<AllStatesVoteResults>
```

---

## 🛣️ Routing

### Public Routes
- `/login` - Login page
- `/signup` - Sign up page

### Protected Routes (Require Authentication)
- `/dashboard` - Poll list (regular users)
- `/dashboard/:id` - Poll detail (regular users)
- `/dashboard/:id/results` - Poll results (regular users)
- `/profile` - User profile (regular users)

### Admin Routes (Require Admin Role)
- `/admin` - Admin dashboard
- `/admin/create-admin` - Create admin user
- `/admin/polls/create` - Create poll
- `/admin/polls/:id/edit` - Edit poll

---

## 🎨 Components

### Authentication Components

**LoginComponent**
```typescript
// src/app/modules/auth/login.component/login.component.ts
- Form validation
- Remember me option
- Error handling
- Redirect to dashboard on success
```

**SignupComponent**
```typescript
// src/app/modules/auth/signup.component/signup.component.ts
- Form validation
- State selection
- Password confirmation
- Error handling
- Redirect to dashboard on success
```

### Poll Components

**PollListComponent**
```typescript
// src/app/modules/polls/poll-list/poll-list.ts
- Display polls in grid
- Active/Closed tabs
- Vote button
- Results button
- Loading and error states
```

**PollDetailComponent**
```typescript
// src/app/modules/polls/poll-detail/poll-detail.ts
- Display poll details
- Select option
- Submit vote
- Show success message
- Prevent duplicate voting
```

**ResultsComponent**
```typescript
// src/app/modules/polls/results/results.ts
- Display vote counts
- Show percentages
- Filter by state
- Progress bars
- State comparison
```

### Admin Components

**AdminDashboardComponent**
```typescript
// src/app/modules/admin/admin-dashboard/admin-dashboard.ts
- List all polls
- Edit button
- Delete button
- Close/reopen button
- Create poll button
```

**PollManagementComponent**
```typescript
// src/app/modules/admin/poll-management/poll-management.ts
- Create/edit poll
- Add poll options (2-4)
- Form validation
- Error handling
```

**CreateAdminComponent**
```typescript
// src/app/modules/admin/create-admin/create-admin.ts
- Create admin user
- Secret key validation
- Form validation
- Success/error messages
```

---

## 🔐 Guards & Interceptors

### Guards

**AuthGuard**
- Protects authenticated routes
- Redirects to login if not authenticated

**NoAuthGuard**
- Protects login/signup pages
- Redirects to dashboard if already authenticated

**AdminGuard**
- Protects admin routes
- Redirects to dashboard if not admin

### Interceptors

**AuthInterceptor**
- Adds JWT token to all requests
- Handles 401 unauthorized errors
- Refreshes token if expired

---

## 🎯 Features Guide

### 1. User Authentication

**Sign Up**
```typescript
// Navigate to /signup
// Fill form with: name, email, password, confirm password, state
// Click "Sign Up"
// Redirects to dashboard
```

**Login**
```typescript
// Navigate to /login
// Enter email and password
// Click "Login"
// Redirects to dashboard
```

### 2. View Polls

**Dashboard**
```typescript
// Navigate to /dashboard
// See active polls by default
// Click "Closed Polls" tab to see closed polls
// Each poll shows: title, description, option count, vote count
```

### 3. Vote on Poll

**Submit Vote**
```typescript
// Click "Vote" on a poll card
// Select option from poll detail page
// Click "Submit Vote"
// See success message
// Redirected to results page
```

### 4. View Results

**Poll Results**
```typescript
// Click "Results" on a poll card
// See: total votes, votes per option, percentages
// Select state to filter results
// See state-specific vote counts
```

### 5. Admin Features

**Create Poll**
```typescript
// Click "Admin" in navbar (only visible to admins)
// Click "+ Create Poll"
// Enter: title, description, options (2-4)
// Click "Create"
// Redirected to admin dashboard
```

**Manage Polls**
```typescript
// In admin dashboard
// Click "Edit" to modify poll
// Click "Delete" to remove poll
// Click "Close" to close active poll
// Click "Reopen" to reopen closed poll
```

**Create Admin User**
```typescript
// Click "Admin" in navbar
// Click "+ Create Admin User"
// Enter: name, email, password, state, secret key
// Click "Create"
// New admin user created
```

### 6. Profile

**View Profile**
```typescript
// Click "Profile" in navbar
// See: name, email, state, role
```

**Toggle Theme**
```typescript
// Click moon/sun icon in navbar
// Theme switches between dark/light
// Preference saved in localStorage
```

---

## 📊 Data Models

### User
```typescript
interface User {
  id: number;
  name: string;
  email: string;
  state: string;
  role: 'user' | 'admin';
}
```

### Poll
```typescript
interface Poll {
  id: number;
  title: string;
  description: string;
  status: 'active' | 'closed';
  createdBy: User;
  options: PollOption[];
  totalVotes: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### PollOption
```typescript
interface PollOption {
  id: number;
  pollId: number;
  optionText: string;
  displayOrder: number;
}
```

### Vote
```typescript
interface Vote {
  id: number;
  userId: number;
  pollId: number;
  optionId: number;
  state: string;
  createdAt: Date;
}
```

### PollResults
```typescript
interface PollResults {
  pollId: number;
  totalVotes: number;
  stats: {
    optionId: number;
    optionText: string;
    voteCount: number;
    percentage: number;
  }[];
}
```

---

## 🧪 Testing

### Manual Testing

1. **User Registration**
   - Sign up with valid data
   - Verify success message
   - Verify redirect to dashboard

2. **User Login**
   - Login with registered credentials
   - Verify token stored in localStorage
   - Verify redirect to dashboard

3. **Voting**
   - Vote on a poll
   - Verify success message
   - Try voting again (should show error)
   - View results

4. **Admin Features**
   - Create admin user
   - Create poll as admin
   - Edit poll
   - Delete poll
   - Close/reopen poll

5. **Results Filtering**
   - View poll results
   - Filter by different states
   - Verify state-specific counts

### Running Tests

```bash
# Unit tests
ng test

# E2E tests
ng e2e

# Code coverage
ng test --code-coverage
```

---

## 🔍 Available Scripts

```bash
# Development
ng serve --open              # Start dev server and open browser
ng serve                     # Start dev server

# Production
ng build --configuration production  # Build for production

# Testing
ng test                      # Run unit tests
ng e2e                       # Run e2e tests
ng test --code-coverage     # Run tests with coverage


# Development Tools
ng generate component name   # Generate component
ng generate service name     # Generate service
ng generate module name      # Generate module
