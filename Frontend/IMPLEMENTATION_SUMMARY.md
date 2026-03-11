# Axios Interceptors & Token Refresh - Implementation Summary

## 🎯 What Was Implemented

### 1. Enhanced Axios Instance (`src/lib/axios.ts`)
- ✅ **Request Interceptor**: Automatically attaches JWT tokens to all requests
- ✅ **Response Interceptor**: Handles 401 errors and triggers token refresh
- ✅ **Token Refresh Logic**: Automatically refreshes expired tokens
- ✅ **Request Queue**: Prevents multiple simultaneous refresh requests
- ✅ **Error Handling**: Comprehensive error handling for different HTTP status codes
- ✅ **Utility Functions**: `refreshAccessToken()` and `clearAuthTokens()`

### 2. Updated Login Component (`src/pages/admin/Login.tsx`)
- ✅ Stores both `access` and `refresh` tokens
- ✅ Handles both token response formats (`token`/`access` and `refresh`)
- ✅ Backward compatible with existing backend responses

### 3. Updated Dashboard Component (`src/pages/admin/Dashboard.tsx`)
- ✅ Uses centralized `clearAuthTokens()` utility
- ✅ Consistent token cleanup on logout

### 4. Documentation
- ✅ `AXIOS_INTERCEPTORS.md`: Complete guide on how the system works
- ✅ `AXIOS_EXAMPLES.tsx`: 10 practical examples for common use cases

## 🔑 Key Features

### Automatic Token Refresh
When an API call returns 401 (Unauthorized):
1. Interceptor catches the error
2. Attempts to refresh the token using `/api/token/refresh/` endpoint
3. If successful: Retries the original request with new token
4. If failed: Clears tokens and redirects to login

### Request Queuing
If multiple requests fail simultaneously:
- Only ONE refresh request is made
- Other requests are queued
- All queued requests retry after successful refresh

### Smart Error Handling
- **401**: Triggers token refresh
- **403**: Logs forbidden access
- **404**: Logs resource not found
- **500+**: Logs server errors
- **Other**: Generic error logging

## 📋 Backend Requirements

Your backend needs to support:

### 1. Login Endpoint Response
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

### 2. Token Refresh Endpoint
```
POST /api/token/refresh/
Body: { "refresh": "<refresh_token>" }
Response: { "access": "<new_access_token>" }
```

## 🚀 How to Use

### Basic Usage (No Changes Required)
```typescript
// Your existing API calls work automatically
const response = await blogApi.getAll();
// Token is added automatically
// If token expires, it's refreshed automatically
```

### Manual Token Refresh
```typescript
import { refreshAccessToken } from '@/lib/axios';

const newToken = await refreshAccessToken();
```

### Logout
```typescript
import { clearAuthTokens } from '@/lib/axios';

clearAuthTokens();
window.location.href = '/admin/login';
```

## ⚙️ Configuration

### Change Login Redirect URL
In `src/lib/axios.ts`, update:
```typescript
window.location.href = '/admin/login'; // Change to your login route
```

### Change Refresh Endpoint
In `src/lib/axios.ts`, update:
```typescript
const response = await axios.post(`${API_BASE_URL}/token/refresh/`, {
  refresh: refreshToken,
});
```

## 🧪 Testing Checklist

- [ ] Login stores both access and refresh tokens
- [ ] API calls include Authorization header
- [ ] Expired token triggers automatic refresh
- [ ] Multiple simultaneous requests don't cause multiple refresh calls
- [ ] Failed refresh redirects to login
- [ ] Logout clears all tokens
- [ ] Protected routes check for token presence

## 📁 Files Modified

1. `src/lib/axios.ts` - Enhanced with interceptors and token refresh
2. `src/pages/admin/Login.tsx` - Updated to store refresh token
3. `src/pages/admin/Dashboard.tsx` - Updated to use clearAuthTokens utility

## 📁 Files Created

1. `AXIOS_INTERCEPTORS.md` - Complete documentation
2. `AXIOS_EXAMPLES.tsx` - Practical usage examples

## 🎨 Benefits

✅ **Better UX**: Users don't get logged out when token expires
✅ **Automatic**: No manual token management needed
✅ **Centralized**: All auth logic in one place
✅ **Robust**: Handles edge cases and race conditions
✅ **Maintainable**: Easy to update and extend

## 🔧 Next Steps

1. **Verify Backend**: Ensure your backend returns both `access` and `refresh` tokens
2. **Test Token Refresh**: Verify the `/api/token/refresh/` endpoint works
3. **Update Other Components**: Replace manual token removal with `clearAuthTokens()`
4. **Add Token Expiry Check**: Optionally implement proactive token refresh
5. **Monitor Logs**: Check console for any auth-related errors

## 💡 Pro Tips

1. **Proactive Refresh**: Set up an interval to refresh tokens before they expire
2. **Token Validation**: Decode JWT to check expiration time
3. **Error Boundaries**: Wrap components with error boundaries for better error handling
4. **Loading States**: Show loading indicators during token refresh
5. **Offline Handling**: Handle network errors gracefully

## 🐛 Troubleshooting

### Issue: Infinite redirect loop
**Cause**: Login endpoint requires authentication
**Fix**: Ensure login endpoint is public

### Issue: Token not refreshing
**Cause**: Refresh token not stored or expired
**Fix**: Check localStorage for 'refresh_token'

### Issue: CORS errors
**Cause**: Backend CORS not configured for refresh endpoint
**Fix**: Add refresh endpoint to CORS allowed endpoints

## 📞 Support

For issues or questions:
1. Check `AXIOS_INTERCEPTORS.md` for detailed documentation
2. Review `AXIOS_EXAMPLES.tsx` for usage patterns
3. Verify backend token response format
4. Check browser console for error messages
