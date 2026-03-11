# Axios Interceptors & Token Refresh Documentation

## Overview
The axios instance now includes automatic token refresh functionality using interceptors. This ensures seamless authentication and prevents unnecessary logouts when access tokens expire.

## Features

### 1. **Request Interceptor**
- Automatically attaches the JWT access token to all outgoing requests
- Reads token from `localStorage.getItem('admin_token')`
- Adds `Authorization: Bearer <token>` header

### 2. **Response Interceptor**
- Handles 401 Unauthorized errors automatically
- Attempts to refresh the access token using the refresh token
- Retries the original failed request with the new token
- Queues multiple failed requests during token refresh to avoid race conditions

### 3. **Token Refresh Logic**
When a 401 error occurs:
1. Checks if a refresh is already in progress
2. If yes, queues the request
3. If no, attempts to refresh the token using `/token/refresh/` endpoint
4. On success: Updates the token and retries all queued requests
5. On failure: Clears tokens and redirects to login page

### 4. **Error Handling**
- **401 Unauthorized**: Triggers token refresh
- **403 Forbidden**: Logs access forbidden error
- **404 Not Found**: Logs resource not found
- **500+ Server Errors**: Logs server error
- **Other Errors**: Generic error logging

## Usage

### Basic API Calls
```typescript
import axiosInstance from './lib/axios';

// No need to manually add tokens - interceptor handles it
const response = await axiosInstance.get('/api/endpoint');
```

### Manual Token Refresh
```typescript
import { refreshAccessToken } from './lib/axios';

// Manually refresh token (useful for proactive refresh)
const newToken = await refreshAccessToken();
if (newToken) {
  console.log('Token refreshed successfully');
} else {
  console.log('Failed to refresh token');
}
```

### Clear Tokens on Logout
```typescript
import { clearAuthTokens } from './lib/axios';

// Clear tokens when user logs out
const handleLogout = () => {
  clearAuthTokens();
  // Redirect to login page
  window.location.href = '/admin/login';
};
```

## Backend Requirements

Your backend must support the following:

### 1. Token Refresh Endpoint
```
POST /api/token/refresh/
Body: { "refresh": "<refresh_token>" }
Response: { "access": "<new_access_token>" }
```

### 2. Token Storage
After login, store both tokens:
```typescript
// On successful login
localStorage.setItem('admin_token', response.data.access);
localStorage.setItem('refresh_token', response.data.refresh);
```

### 3. Token Response Format
Login endpoint should return:
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

## Configuration

### Update Login Endpoint
Make sure your login function stores both tokens:

```typescript
// In your login component
const handleLogin = async (credentials) => {
  try {
    const response = await authApi.login(credentials);
    
    // Store both tokens
    localStorage.setItem('admin_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
    
    // Redirect to dashboard
    navigate('/admin/dashboard');
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

### Customize Redirect URL
If your login page is not at `/admin/login`, update the redirect URL in `axios.ts`:

```typescript
// Change this line
window.location.href = '/admin/login';

// To your login route
window.location.href = '/your-login-route';
```

### Customize Refresh Endpoint
If your backend uses a different refresh endpoint, update:

```typescript
// Change this line
const response = await axios.post(`${API_BASE_URL}/token/refresh/`, {
  refresh: refreshToken,
});

// To your endpoint
const response = await axios.post(`${API_BASE_URL}/your-refresh-endpoint/`, {
  refresh: refreshToken,
});
```

## How It Works

### Request Flow
```
User makes API call
    ↓
Request Interceptor adds token
    ↓
Request sent to server
    ↓
Response received
    ↓
Response Interceptor checks status
    ↓
If 401: Trigger refresh logic
If success: Return response
```

### Token Refresh Flow
```
401 Error detected
    ↓
Check if refresh in progress
    ↓
If yes: Queue request
If no: Start refresh
    ↓
Call /token/refresh/ endpoint
    ↓
If success: Update token, retry all queued requests
If failure: Clear tokens, redirect to login
```

## Benefits

1. **Seamless UX**: Users don't get logged out when access token expires
2. **Automatic Retry**: Failed requests are automatically retried with new token
3. **Race Condition Prevention**: Multiple simultaneous requests don't trigger multiple refresh calls
4. **Centralized Logic**: All token management in one place
5. **Error Handling**: Comprehensive error handling for different HTTP status codes

## Testing

### Test Token Refresh
1. Login to get tokens
2. Wait for access token to expire (or manually set an expired token)
3. Make an API call
4. Verify that the token is automatically refreshed and request succeeds

### Test Queue System
1. Make multiple API calls simultaneously
2. Ensure all requests are queued and retried after token refresh
3. Verify no duplicate refresh requests are made

## Troubleshooting

### Issue: Infinite redirect loop
**Solution**: Check that your login endpoint doesn't require authentication

### Issue: Token not being attached
**Solution**: Verify token is stored in localStorage with key 'admin_token'

### Issue: Refresh fails immediately
**Solution**: Check that refresh token is stored with key 'refresh_token'

### Issue: CORS errors on refresh
**Solution**: Ensure your backend allows the refresh endpoint in CORS configuration
