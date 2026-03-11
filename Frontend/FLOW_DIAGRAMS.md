# Axios Interceptor Flow Diagram

## 📊 Request Flow with Token Refresh

```
┌─────────────────────────────────────────────────────────────────────┐
│                        USER MAKES API CALL                          │
│                    (e.g., blogApi.getAll())                         │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    REQUEST INTERCEPTOR                              │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │ 1. Get token from localStorage('admin_token')                 │  │
│  │ 2. Add Authorization header: Bearer <token>                   │  │
│  │ 3. Pass request to axios                                      │  │
│  └───────────────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    SEND REQUEST TO SERVER                           │
│                  (with Authorization header)                        │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
                    ┌────────┴────────┐
                    │  Server Response │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
         ┌────────┐    ┌─────────┐    ┌─────────┐
         │ 200 OK │    │ 401 ERR │    │ Other   │
         └───┬────┘    └────┬────┘    └────┬────┘
             │              │              │
             │              │              ▼
             │              │         ┌──────────────┐
             │              │         │ Log Error    │
             │              │         │ Return Error │
             │              │         └──────────────┘
             │              │
             │              ▼
             │    ┌─────────────────────────────────────────┐
             │    │   RESPONSE INTERCEPTOR (401 Handler)    │
             │    │  ┌───────────────────────────────────┐  │
             │    │  │ Check if refresh already running  │  │
             │    │  └───────────┬───────────────────────┘  │
             │    └──────────────┼──────────────────────────┘
             │                   │
             │         ┌─────────┴─────────┐
             │         │                   │
             │         ▼                   ▼
             │    ┌─────────┐         ┌─────────┐
             │    │   YES   │         │   NO    │
             │    └────┬────┘         └────┬────┘
             │         │                   │
             │         ▼                   ▼
             │    ┌──────────────┐    ┌──────────────────┐
             │    │ Queue Request│    │ Set isRefreshing │
             │    │ Wait for     │    │ = true           │
             │    │ refresh      │    └────────┬─────────┘
             │    └──────┬───────┘             │
             │           │                     ▼
             │           │            ┌─────────────────────┐
             │           │            │ Get refresh token   │
             │           │            │ from localStorage   │
             │           │            └──────────┬──────────┘
             │           │                       │
             │           │              ┌────────┴────────┐
             │           │              │                 │
             │           │              ▼                 ▼
             │           │         ┌─────────┐      ┌──────────┐
             │           │         │ Exists  │      │ Missing  │
             │           │         └────┬────┘      └────┬─────┘
             │           │              │                │
             │           │              ▼                ▼
             │           │    ┌──────────────────┐  ┌─────────────┐
             │           │    │ Call /token/     │  │ Clear tokens│
             │           │    │ refresh/ API     │  │ Redirect to │
             │           │    └────────┬─────────┘  │ login       │
             │           │             │            └─────────────┘
             │           │    ┌────────┴────────┐
             │           │    │                 │
             │           │    ▼                 ▼
             │           │ ┌─────────┐     ┌─────────┐
             │           │ │ Success │     │ Failed  │
             │           │ └────┬────┘     └────┬────┘
             │           │      │               │
             │           │      ▼               ▼
             │           │ ┌──────────────┐ ┌─────────────┐
             │           │ │ Save new     │ │ Clear tokens│
             │           │ │ access token │ │ Redirect to │
             │           │ │ Process queue│ │ login       │
             │           │ └──────┬───────┘ └─────────────┘
             │           │        │
             │           └────────┼─────────┐
             │                    │         │
             │                    ▼         ▼
             │           ┌─────────────────────────┐
             │           │ Retry Original Request  │
             │           │ with new token          │
             │           └────────┬────────────────┘
             │                    │
             └────────────────────┘
                                  │
                                  ▼
                    ┌──────────────────────────┐
                    │   RETURN RESPONSE TO     │
                    │   ORIGINAL CALLER        │
                    └──────────────────────────┘
```

## 🔄 Token Refresh Sequence

```
Time: 0ms
┌─────────────────────┐
│ Request 1 (401)     │──┐
└─────────────────────┘  │
                         │
Time: 5ms                │
┌─────────────────────┐  │
│ Request 2 (401)     │──┤  All requests
└─────────────────────┘  │  queued
                         │
Time: 10ms               │
┌─────────────────────┐  │
│ Request 3 (401)     │──┘
└─────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│ isRefreshing = true             │
│ Only ONE refresh call made      │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│ POST /token/refresh/            │
│ { refresh: "..." }              │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│ Response: { access: "..." }     │
│ Save new token                  │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│ Process Queue:                  │
│ ├─ Retry Request 1 ✓            │
│ ├─ Retry Request 2 ✓            │
│ └─ Retry Request 3 ✓            │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│ isRefreshing = false            │
│ All requests completed          │
└─────────────────────────────────┘
```

## 🔐 Token Storage Structure

```
localStorage
├── admin_token (Access Token)
│   └── Used for: API authentication
│   └── Lifespan: Short (e.g., 15 minutes)
│   └── Refreshed: Automatically when expired
│
├── refresh_token (Refresh Token)
│   └── Used for: Getting new access tokens
│   └── Lifespan: Long (e.g., 7 days)
│   └── Refreshed: On login only
│
└── admin_user (User Data)
    └── Used for: Display user info
    └── Cleared: On logout
```

## 📡 API Endpoints

```
┌─────────────────────────────────────────────────────────┐
│                    LOGIN ENDPOINT                       │
├─────────────────────────────────────────────────────────┤
│ POST /api/login/                                        │
│                                                         │
│ Request:                                                │
│ {                                                       │
│   "username": "admin",                                  │
│   "password": "password123"                             │
│ }                                                       │
│                                                         │
│ Response:                                               │
│ {                                                       │
│   "access": "eyJ0eXAiOiJKV1Qi...",                      │
│   "refresh": "eyJ0eXAiOiJKV1Qi...",                     │
│   "username": "admin",                                  │
│   "email": "admin@example.com"                          │
│ }                                                       │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                  REFRESH ENDPOINT                       │
├─────────────────────────────────────────────────────────┤
│ POST /api/token/refresh/                                │
│                                                         │
│ Request:                                                │
│ {                                                       │
│   "refresh": "eyJ0eXAiOiJKV1Qi..."                      │
│ }                                                       │
│                                                         │
│ Response:                                               │
│ {                                                       │
│   "access": "eyJ0eXAiOiJKV1Qi..."                       │
│ }                                                       │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                  PROTECTED ENDPOINT                     │
├─────────────────────────────────────────────────────────┤
│ GET /api/blog/                                          │
│                                                         │
│ Headers:                                                │
│ Authorization: Bearer eyJ0eXAiOiJKV1Qi...               │
│                                                         │
│ Response (200):                                         │
│ [                                                       │
│   { "id": 1, "title": "Blog 1", ... },                  │
│   { "id": 2, "title": "Blog 2", ... }                   │
│ ]                                                       │
│                                                         │
│ Response (401):                                         │
│ {                                                       │
│   "detail": "Token is invalid or expired"               │
│ }                                                       │
│ → Triggers automatic token refresh                     │
└─────────────────────────────────────────────────────────┘
```

## 🎯 Error Handling Flow

```
┌──────────────────┐
│  API Response    │
└────────┬─────────┘
         │
    ┌────┴────┐
    │ Status? │
    └────┬────┘
         │
    ┌────┴────────────────────────────────┐
    │                                     │
    ▼                                     ▼
┌────────┐                          ┌─────────┐
│ 200-299│                          │ 400-599 │
│ Success│                          │  Error  │
└───┬────┘                          └────┬────┘
    │                                    │
    ▼                               ┌────┴────┐
┌────────────┐                      │ Status? │
│ Return Data│                      └────┬────┘
└────────────┘                           │
                        ┌────────────────┼────────────────┐
                        │                │                │
                        ▼                ▼                ▼
                   ┌────────┐      ┌─────────┐      ┌─────────┐
                   │  401   │      │   403   │      │   404   │
                   └───┬────┘      └────┬────┘      └────┬────┘
                       │                │                │
                       ▼                ▼                ▼
              ┌─────────────────┐  ┌─────────┐    ┌──────────┐
              │ Refresh Token   │  │ Log:    │    │ Log:     │
              │ Retry Request   │  │ Forbidden│   │ Not Found│
              └─────────────────┘  └─────────┘    └──────────┘
                                        │                │
                        ┌───────────────┴────────────────┘
                        │
                        ▼
                   ┌─────────┐
                   │   500+  │
                   └────┬────┘
                        │
                        ▼
                   ┌──────────┐
                   │ Log:     │
                   │ Server   │
                   │ Error    │
                   └──────────┘
```

## 🔄 State Management

```
┌─────────────────────────────────────────────────────────┐
│              Interceptor State Variables                │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ isRefreshing: boolean                                   │
│ ├─ false: No refresh in progress                       │
│ ├─ true:  Refresh in progress, queue new requests      │
│ └─ Purpose: Prevent multiple refresh calls             │
│                                                         │
│ failedQueue: Array<{resolve, reject}>                   │
│ ├─ Stores: Promises of failed requests                 │
│ ├─ Cleared: After successful refresh                   │
│ └─ Purpose: Retry all failed requests together         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## 🧪 Testing Scenarios

```
Scenario 1: Normal Request
┌──────────────┐    ┌──────────┐    ┌──────────┐
│ Make Request │ -> │ Add Token│ -> │ Success  │
└──────────────┘    └──────────┘    └──────────┘

Scenario 2: Expired Token (Single Request)
┌──────────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│ Make Request │ -> │ 401 Error│ -> │ Refresh  │ -> │ Retry    │
└──────────────┘    └──────────┘    └──────────┘    └──────────┘

Scenario 3: Expired Token (Multiple Requests)
┌──────────────┐
│ Request 1    │ ──┐
└──────────────┘   │
┌──────────────┐   │    ┌──────────┐    ┌──────────┐    ┌──────────┐
│ Request 2    │ ──┼─-> │ 401 Error│ -> │ Refresh  │ -> │ Retry All│
└──────────────┘   │    └──────────┘    │ (once)   │    └──────────┘
┌──────────────┐   │                    └──────────┘
│ Request 3    │ ──┘
└──────────────┘

Scenario 4: Refresh Fails
┌──────────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│ Make Request │ -> │ 401 Error│ -> │ Refresh  │ -> │ Redirect │
└──────────────┘    └──────────┘    │ Failed   │    │ to Login │
                                    └──────────┘    └──────────┘
```
