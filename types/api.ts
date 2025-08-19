export interface LoginResponse {
  success: boolean;
  data: {
    token: string;
    user: {
      id: string;
      email: string;
      role: string;
    };
  };
  error?: string;
}

export interface DocumentsParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  status?: string;
}
