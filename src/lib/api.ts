// API Configuration - Point to your local Node.js backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Generic fetch wrapper with error handling
async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    throw error;
  }
}

// Blog APIs
export const blogAPI = {
  getAll: () => fetchAPI<Blog[]>('/blogs'),
  getBySlug: (slug: string) => fetchAPI<Blog>(`/blogs/${slug}`),
  create: (data: Partial<Blog>) => fetchAPI<Blog>('/blogs', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: Partial<Blog>) => fetchAPI<Blog>(`/blogs/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => fetchAPI<void>(`/blogs/${id}`, {
    method: 'DELETE',
  }),
};

// Cause APIs
export const causeAPI = {
  getAll: () => fetchAPI<Cause[]>('/causes'),
  getById: (id: string) => fetchAPI<Cause>(`/causes/${id}`),
  create: (data: Partial<Cause>) => fetchAPI<Cause>('/causes', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: Partial<Cause>) => fetchAPI<Cause>(`/causes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => fetchAPI<void>(`/causes/${id}`, {
    method: 'DELETE',
  }),
};

// Testimonial APIs
export const testimonialAPI = {
  getAll: () => fetchAPI<Testimonial[]>('/testimonials'),
  create: (data: Partial<Testimonial>) => fetchAPI<Testimonial>('/testimonials', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: Partial<Testimonial>) => fetchAPI<Testimonial>(`/testimonials/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => fetchAPI<void>(`/testimonials/${id}`, {
    method: 'DELETE',
  }),
};

// Donation APIs
export const donationAPI = {
  create: (data: DonationData) => fetchAPI<DonationResponse>('/donations', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  verifyPayPal: (orderId: string) => fetchAPI<PayPalVerification>('/donations/verify-paypal', {
    method: 'POST',
    body: JSON.stringify({ orderId }),
  }),
  uploadProof: async (donationId: string, file: File) => {
    const formData = new FormData();
    formData.append('proof', file);
    formData.append('donationId', donationId);
    
    const response = await fetch(`${API_BASE_URL}/donations/upload-proof`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Failed to upload proof');
    }
    
    return response.json();
  },
  generateReference: () => fetchAPI<{ referenceId: string }>('/donations/generate-reference'),
};

// Contact API
export const contactAPI = {
  submit: (data: ContactData) => fetchAPI<{ success: boolean; message: string }>('/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

// Chatbot API
export const chatbotAPI = {
  sendMessage: (message: string) => fetchAPI<ChatbotResponse>('/chatbot', {
    method: 'POST',
    body: JSON.stringify({ message }),
  }),
};

// Type definitions
export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  images: string[];
  quote?: {
    text: string;
    author: string;
  };
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface Cause {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  goalAmount: number;
  raisedAmount: number;
  category: string;
  featured: boolean;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  image: string;
  rating: number;
}

export interface DonationData {
  amount: number;
  currency: string;
  causeId?: string;
  donorName: string;
  donorEmail: string;
  paymentMethod: 'paypal' | 'swift';
  message?: string;
}

export interface DonationResponse {
  id: string;
  referenceId: string;
  status: 'pending' | 'completed' | 'failed';
  paypalOrderId?: string;
}

export interface PayPalVerification {
  success: boolean;
  transactionId: string;
  status: string;
}

export interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
  captchaToken?: string;
}

export interface ChatbotResponse {
  message: string;
  suggestions?: string[];
}
