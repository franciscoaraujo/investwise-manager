// API configuration
export const API_BASE_URL = "http://localhost:8081";

// Common headers for API requests
export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "Access-Control-Allow-Origin": "*", // Permite qualquer origem
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// HTTP status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

// API response data type
export type ApiResponseData = Record<string, unknown>;

// API error handling
export class ApiError extends Error {
  status: number;
  data?: ApiResponseData;

  constructor(message: string, status: number, data?: ApiResponseData) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

// Generic API request function
export async function apiRequest<T, D = Record<string, unknown>>(
  url: string,
  method: string = "GET",
  data?: D,
  headers: HeadersInit = DEFAULT_HEADERS
): Promise<T> {
  const fullUrl = `${API_BASE_URL}${url}`;

  const options: RequestInit = {
    method,
    headers,
    mode: "cors", // Habilita CORS no frontend
    credentials: "include", // Garante envio de cookies, se necessário
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(fullUrl, options);

    // Check if response is empty (for DELETE requests or other requests that might return no content)
    const contentType = response.headers.get("content-type");
    let responseData: Record<string, unknown> | null = null;

    if (contentType && contentType.includes("application/json")) {
      // Only try to parse JSON if the content type is JSON
      const text = await response.text();
      if (text) {
        responseData = JSON.parse(text) as Record<string, unknown>;
      }
    }

    if (!response.ok) {
      const errorMessage =
        responseData && "erro" in responseData
          ? String(responseData.erro)
          : "Ocorreu um erro na requisição";

      throw new ApiError(
        errorMessage,
        response.status,
        responseData || undefined
      );
    }

    return responseData as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(
      (error as Error).message || "Erro ao conectar com o servidor",
      0
    );
  }
}
