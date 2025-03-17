import { apiRequest } from "./config";
import { Fundo, FundoResponse, FundosResponse } from "@/domain/fundos/types";

// API endpoints
const ENDPOINTS = {
  CREATE_FUNDOS: "/fundos",
  FUNDOS: "/fundos/ativos",
  FUNDO_BY_ID: (id: number) => `/fundos/${id}`,
};

/**
 * Service for handling fund-related API calls
 */
export const FundosService = {
  /**
   * Get all funds
   */
  getAll: async (): Promise<FundoResponse[]> => {
    try {
      const response = await apiRequest<FundosResponse | FundoResponse[]>(
        ENDPOINTS.FUNDOS
      );
      console.log("response", response);

      // Check if response is an array (direct response) or an object with content property (paginated response)
      if (Array.isArray(response)) {
        return response;
      } else if (response && "content" in response) {
        return response.content || [];
      } else {
        console.error("Unexpected response format:", response);
        return [];
      }
    } catch (error) {
      console.error("Error fetching funds:", error);
      throw error;
    }
  },

  /**
   * Get a fund by ID
   */
  getById: async (id: number): Promise<FundoResponse> => {
    try {
      return await apiRequest<FundoResponse>(ENDPOINTS.FUNDO_BY_ID(id));
    } catch (error) {
      console.error(`Error fetching fund with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Create a new fund
   */
  create: async (fundo: Fundo): Promise<FundoResponse> => {
    try {
      return await apiRequest<FundoResponse, Fundo>(
        ENDPOINTS.CREATE_FUNDOS,
        "POST",
        fundo
      );
    } catch (error) {
      console.error("Error creating fund:", error);
      throw error;
    }
  },

  /**
   * Update an existing fund
   */
  update: async (id: number, fundo: Fundo): Promise<FundoResponse> => {
    try {
      return await apiRequest<FundoResponse, Fundo>(
        ENDPOINTS.FUNDO_BY_ID(id),
        "PUT",
        fundo
      );
    } catch (error) {
      console.error(`Error updating fund with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete a fund
   */
  delete: async (id: number): Promise<void> => {
    try {
      await apiRequest<void>(ENDPOINTS.FUNDO_BY_ID(id), "DELETE");
    } catch (error) {
      console.error(`Error deleting fund with ID ${id}:`, error);
      throw error;
    }
  },
};
