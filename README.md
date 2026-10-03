# Pulse — Real-Time Chat Application

Pulse is a modern real-time chat application frontend built with **React, TypeScript, Redux Toolkit, Axios, WebSocket, React Router, and SCSS**.

The application is designed around a clean, scalable frontend architecture with Redux Toolkit handling application state, Axios handling REST API communication, and native WebSocket communication powering real-time messaging and presence updates.

> 🚧 **Project Status:** Active development

---

## ✨ Features

### 🔐 Authentication

- User registration
- User login
- JWT-based authentication
- Persistent authentication state
- Protected application routes
- Current user profile retrieval
- Logout handling

### 💬 Real-Time Messaging

- One-to-one conversations
- Real-time message delivery using WebSocket
- Message history
- Automatic message state updates through Redux
- Sending and receiving messages without page refresh
- Real-time typing indicators

### 👥 Users

- Search users
- User list
- Current-user exclusion from search results
- Online/offline presence updates
- User selection for starting conversations

### 🟢 Presence

- Real-time online/offline status
- WebSocket-based presence events
- Automatic Redux state updates when a user's status changes

### ⌨️ Typing Indicators

- Real-time typing events
- Sender-specific typing state
- WebSocket-powered communication

### 🎨 UI

- Responsive interface
- SCSS-based styling
- Reusable UI components
- Feature-based component organization
- Theme-ready architecture

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | UI development |
| TypeScript | Type safety |
| Vite | Frontend tooling and development server |
| Redux Toolkit | Global state management |
| React Redux | React bindings for Redux |
| Axios | REST API communication |
| WebSocket | Real-time communication |
| React Router | Client-side routing |
| SCSS | Styling |
| ESLint | Code quality |
| Git | Version control |
| GitHub | Repository hosting |

---

## 🏗️ Architecture

Pulse follows a **feature-first architecture** while keeping shared infrastructure and application state separated.

```text
src/
│
├── app/
│   └── App.tsx
│
├── components/
│   ├── common/
│   └── ui/
│
├── features/
│   ├── auth/
│   │   ├── components/
│   │   └── index.Auth.tsx
│   │
│   ├── chat/
│   │   ├── components/
│   │   └── index.Chat.tsx
│   │
│   ├── users/
│   │   ├── components/
│   │   └── index.Users.tsx
│   │
│   ├── profile/
│   │   ├── components/
│   │   └── index.Profile.tsx
│   │
│   ├── settings/
│   │   ├── components/
│   │   └── index.Settings.tsx
│   │
│   ├── theme/
│   │   ├── components/
│   │   └── index.Theme.tsx
│   │
│   └── notifications/
│       ├── components/
│       └── index.Notifications.tsx
│
├── hooks/
│
├── helpers/
│   ├── date/
│   ├── error/
│   ├── number/
│   ├── string/
│   └── validation/
│
├── layouts/
│
├── routes/
│
├── redux/
│   ├── hooks/
│   ├── selectors/
│   ├── services/
│   │   ├── axios.ts
│   │   └── websocket/
│   │       ├── websocket.ts
│   │       ├── websocketManager.ts
│   │       └── websocketEvents.ts
│   │
│   ├── slices/
│   ├── thunks/
│   └── store/
│       ├── rootReducer.ts
│       └── store.ts
│
├── scss/
│   ├── base/
│   ├── components/
│   ├── features/
│   ├── layouts/
│   ├── themes/
│   ├── utilities/
│   └── main.scss
│
├── types/
│
└── main.tsx
```

The exact structure may evolve as the application grows.

---

# 🧠 State Management

Pulse uses **Redux Toolkit** as the application's centralized state-management solution.

The project intentionally uses Redux Toolkit's core features rather than RTK Query at this stage.

### Redux flow

```text
Component
    │
    ▼
dispatch()
    │
    ▼
createAsyncThunk
    │
    ▼
Axios / API
    │
    ▼
FastAPI Backend
    │
    ▼
fulfilled / rejected
    │
    ▼
Slice Reducer
    │
    ▼
Redux Store
    │
    ▼
useAppSelector()
    │
    ▼
Component
```

This structure keeps asynchronous operations, state updates, and UI rendering clearly separated.

---

# 🔌 WebSocket Architecture

Pulse uses the browser's native **WebSocket API** for real-time communication.

```text
FastAPI WebSocket Server
          │
          ▼
   WebSocket Connection
          │
          ▼
 WebSocket Manager
          │
          ▼
      Redux Dispatch
          │
          ▼
      Redux Slice
          │
          ▼
       Redux Store
          │
          ▼
       React UI
```

WebSocket events currently include:

### Message

```json
{
  "type": "message",
  "receiver_id": 12,
  "message": "Hello!"
}
```

### Presence

```json
{
  "type": "presence",
  "user_id": 12,
  "is_online": true
}
```

### Typing

```json
{
  "type": "typing",
  "receiver_id": 12,
  "is_typing": true
}
```

The frontend does not implement delivery or seen/read receipts because those events are not currently provided by the backend API.

---

# 🌐 Backend Integration

The frontend communicates with a separate **FastAPI backend**.

The backend provides REST APIs for authentication, users, and message history, along with a WebSocket endpoint for real-time communication.

### REST API

```text
POST /api/auth/register
POST /api/auth/login

GET /api/users/me
GET /api/users?search=...

GET /api/messages/{other_id}
```

### WebSocket

```text
WS /ws?token=<JWT>
```

The frontend stores and sends the JWT as required for authenticated API and WebSocket communication.

---

# 🔑 Authentication Flow

```text
User
 │
 ▼
Login / Register
 │
 ▼
FastAPI Authentication API
 │
 ▼
JWT Access Token
 │
 ▼
Frontend Authentication State
 │
 ├───────────────┐
 ▼               ▼
REST APIs      WebSocket
 │               │
 ▼               ▼
Bearer JWT     ?token=JWT
```

Protected routes require an authenticated user.

---

# 📦 Installation

## Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- Git

You can verify your installation with:

```bash
node --version
npm --version
git --version
```

---

## Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/pulse-frontend.git
```

Move into the project:

```bash
cd pulse-frontend
```

---

## Install Dependencies

```bash
npm install
```

---

# ⚙️ Environment Variables

Create a `.env` file in the project root.

Example:

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000/ws
```

> Do not commit `.env` files containing secrets or private credentials.

For local development, you can create:

```text
.env
```

For production, configure environment variables through your deployment platform.

---

# ▶️ Running the Application

Start the development server:

```bash
npm run dev
```

Vite will provide a local development URL, typically:

```text
http://localhost:5173
```

---

# 🏭 Production Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

# 🧹 Code Quality

Run ESLint:

```bash
npm run lint
```

The project uses TypeScript and ESLint to maintain code quality and consistency.

---

# 📁 Important Architectural Decisions

### Redux Toolkit

Redux Toolkit is used for:

- Authentication state
- User state
- Chat state
- Message state
- Presence state
- Typing state
- Async API operations

RTK Query is intentionally not used at this stage.

---

### Axios

Axios is responsible for REST API communication.

Typical flow:

```text
Thunk
  ↓
Axios Service
  ↓
FastAPI
  ↓
Thunk Result
  ↓
Redux Slice
```

---

### Native WebSocket

The project uses the native browser WebSocket API instead of an additional WebSocket abstraction library.

This keeps the real-time communication layer explicit and helps maintain a clear understanding of the WebSocket lifecycle.

---

### Feature-Based Organization

Application functionality is organized around features rather than a global pages-based structure.

For example:

```text
features/
├── auth/
├── chat/
├── users/
├── profile/
├── settings/
└── notifications/
```

This makes individual features easier to maintain and expand.

---

# 🔒 Security Considerations

The frontend follows several basic security practices:

- Authentication uses JWT access tokens.
- Protected API requests use Bearer authentication.
- Environment variables are used for configurable endpoints.
- Secrets should never be committed to Git.
- Backend authorization remains the source of truth for protected resources.

> Client-side route protection is a UI-level security measure. Actual authorization must always be enforced by the backend.

---

# 🚀 Deployment

The frontend is designed to be deployed independently from the backend.

Possible deployment platforms include:

- Vercel
- Netlify
- Cloudflare Pages
- Other static/frontend hosting platforms

Production environment variables should point to the deployed FastAPI backend and WebSocket server.

Example:

```env
VITE_API_BASE_URL=https://api.example.com
VITE_WS_URL=wss://api.example.com/ws
```

---

# 🗺️ Development Roadmap

The project is actively evolving.

Potential future improvements include:

- [ ] Improved chat UI
- [ ] Conversation list
- [ ] Better message grouping
- [ ] Message timestamps
- [ ] Improved responsive layouts
- [ ] Dark/light theme system
- [ ] Notification system
- [ ] Improved error handling
- [ ] Connection/reconnection handling
- [ ] Optimistic message updates
- [ ] Message pagination
- [ ] File/image messaging
- [ ] Emoji support
- [ ] User profile improvements
- [ ] Production deployment
- [ ] Automated testing
- [ ] Performance optimization
- [ ] Accessibility improvements

Features will be added according to the capabilities provided by the backend.

---

# 🧪 Testing

Testing infrastructure will be introduced as the application grows.

Planned areas include:

- Component testing
- Redux reducer testing
- Async thunk testing
- Helper function testing
- WebSocket behavior testing
- Authentication flow testing
- End-to-end testing

---

# 📊 Project Goals

Pulse is being developed with the following goals:

- Learn and apply Redux Toolkit deeply
- Build a real-world real-time application
- Understand WebSocket architecture
- Practice scalable React architecture
- Maintain strong TypeScript usage
- Separate application state from UI concerns
- Build reusable frontend components
- Prepare the application for production deployment

---

# 🤝 Contributing

This project is currently primarily developed as a personal learning and portfolio project.

If contribution is opened in the future, contribution guidelines will be added here.

---

# 📄 License

No open-source license has currently been added to this repository.

All rights are reserved unless otherwise stated.

---

# 👨‍💻 Author

**Amol Pawar**

Pulse is being developed as a full-stack real-time chat application with a separate frontend and backend codebase.

---

## 🔗 Project Structure

Pulse is maintained as two independent repositories:

```text
Pulse
│
├── pulse-frontend
│   └── React + TypeScript + Redux Toolkit
│
└── pulse-backend
    └── FastAPI + Python
```

Keeping the frontend and backend in separate repositories allows each application to have its own:

- Git history
- Development workflow
- Dependencies
- CI/CD pipeline
- Deployment lifecycle
- Release process

---

## ⭐ Pulse

A real-time chat application built to explore modern frontend architecture, Redux state management, REST APIs, and WebSocket communication.