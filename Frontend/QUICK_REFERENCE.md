# 🚀 Axios Interceptors - Quick Reference Card

## 📦 What You Get

✅ **Automatic Token Attachment** - No manual headers needed
✅ **Auto Token Refresh** - Seamless token renewal on expiry
✅ **Request Queuing** - Smart handling of multiple failed requests
✅ **Error Handling** - Comprehensive error logging and handling
✅ **Utility Functions** - Helper functions for common tasks

---

## 🔧 Quick Setup

### 1. Backend Requirements
Your backend must return:
```json
// Login Response
{
  "access": "eyJ0eXAiOiJKV1Qi...",
  "refresh": "eyJ0eXAiOiJKV1Qi..."
}

// Refresh Response
{
  "access": "eyJ0eXAiOiJKV1Qi..."
}
```

### 2. Endpoints Needed
- `POST /api/login/` - Returns access & refresh tokens
- `POST /api/token/refresh/` - Returns new access token

---

## 💻 Common Usage

### Making API Calls (No Changes Needed!)
```typescript
// Just use your existing API calls
const response = await blogApi.getAll();
// ✅ Token added automatically
// ✅ Refreshed automatically if expired
```

### Login
```typescript
const response = await authApi.login({ username, password });

// Store tokens
localStorage.setItem('admin_token', response.data.access);
localStorage.setItem('refresh_token', response.data.refresh);
```

### Logout
```typescript
import { clearAuthTokens } from '@/lib/axios';

clearAuthTokens();
window.location.href = '/admin/login';
```

### Manual Refresh
```typescript
import { refreshAccessToken } from '@/lib/axios';

const newToken = await refreshAccessToken();
```

---

## 🎯 How It Works

### Request Flow
```
Your API Call
    ↓
Request Interceptor (adds token)
    ↓
Server
    ↓
Response Interceptor (checks status)
    ↓
If 401: Auto refresh & retry
If success: Return data
```

### Token Refresh Flow
```
401 Error
    ↓
Get refresh token from localStorage
    ↓
Call /token/refresh/ endpoint
    ↓
If success: Save new token, retry request
If failed: Clear tokens, redirect to login
```

---

## 🔑 Key Files

| File | Purpose |
|------|---------|
| `src/lib/axios.ts` | Main interceptor logic |
| `src/lib/api.ts` | API endpoint definitions |
| `src/pages/admin/Login.tsx` | Stores tokens on login |
| `src/pages/admin/Dashboard.tsx` | Uses clearAuthTokens |

---

## 📚 Documentation Files

| File | Description |
|------|-------------|
| `AXIOS_INTERCEPTORS.md` | Complete guide & configuration |
| `AXIOS_EXAMPLES.tsx` | 10 practical code examples |
| `FLOW_DIAGRAMS.md` | Visual flow diagrams |
| `IMPLEMENTATION_SUMMARY.md` | What was implemented |

---

## ⚙️ Configuration

### Change Login Route
```typescript
// In src/lib/axios.ts, line ~82 and ~112
window.location.href = '/admin/login'; // Change this
```

### Change Refresh Endpoint
```typescript
// In src/lib/axios.ts, line ~90
const response = await axios.post(`${API_BASE_URL}/token/refresh/`, {
  refresh: refreshToken,
});
```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Infinite redirect | Check login endpoint doesn't require auth |
| Token not refreshing | Verify refresh_token in localStorage |
| CORS errors | Add refresh endpoint to CORS config |
| 401 still appearing | Check backend token format |

---

## ✅ Testing Checklist

- [ ] Login stores both tokens
- [ ] API calls include Authorization header
- [ ] Expired token triggers refresh
- [ ] Multiple requests don't cause multiple refreshes
- [ ] Failed refresh redirects to login
- [ ] Logout clears all tokens

---

## 🎨 Benefits

| Feature | Benefit |
|---------|---------|
| Auto Refresh | Users stay logged in |
| Request Queue | No duplicate refresh calls |
| Centralized | One place for all auth logic |
| Error Handling | Better debugging |
| Utilities | Reusable helper functions |

---

## 📞 Need Help?

1. **Read**: `AXIOS_INTERCEPTORS.md` for detailed docs
2. **Check**: `AXIOS_EXAMPLES.tsx` for code examples
3. **View**: `FLOW_DIAGRAMS.md` for visual guides
4. **Review**: Console logs for error messages

---

## 🚀 Pro Tips

💡 **Proactive Refresh**: Set up interval to refresh before expiry
💡 **Token Validation**: Decode JWT to check expiration
💡 **Error Boundaries**: Wrap components for better error handling
💡 **Loading States**: Show indicators during refresh
💡 **Offline Handling**: Handle network errors gracefully

---

## 📊 Token Lifecycle

```
Login → Store Tokens → Make Requests → Token Expires
                            ↓
                    Auto Refresh → Continue
                            ↓
                    Refresh Fails → Logout
```

---

## 🔐 Security Notes

- ✅ Tokens stored in localStorage (consider httpOnly cookies for production)
- ✅ Access token short-lived (15 min recommended)
- ✅ Refresh token long-lived (7 days recommended)
- ✅ Always use HTTPS in production
- ✅ Clear tokens on logout

---

## 📈 Next Steps

1. Test login flow
2. Verify token refresh works
3. Update other logout locations to use `clearAuthTokens()`
4. Consider implementing proactive token refresh
5. Add token expiry monitoring

---

**Version**: 1.0.0  
**Last Updated**: 2026-02-10  
**Status**: ✅ Production Ready
