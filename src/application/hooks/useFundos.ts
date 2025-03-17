import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { FundosService } from "@/infrastructure/api/fundos-service";
import { Fundo, FundoResponse } from "@/domain/fundos/types";
import { ApiError } from "../../infrastructure/api/config";

export function useFundos() {
  //configuração de estado para fundos
  const [fundos, setFundos] = useState<FundoResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all funds
  const fetchFundos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await FundosService.getAll();
      setFundos(data);
    } catch (err) {
      const errorMessage =
        err instanceof ApiError
          ? err.data?.erro || err.message
          : "Erro ao carregar fundos";
      setError(errorMessage as string);
      toast.error(errorMessage as string);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a new fund
  const createFundo = useCallback(async (fundo: Fundo) => {
    setLoading(true);
    setError(null);
    try {
      const newFundo = await FundosService.create(fundo);
      setFundos((prev) => [...prev, newFundo]);
      toast.success("Fundo criado com sucesso!");
      return newFundo;
    } catch (err) {
      const errorMessage =
        err instanceof ApiError
          ? err.data?.erro || err.message
          : "Erro ao criar fundo";
      setError(errorMessage as string);
      toast.error(errorMessage as string);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update an existing fund
  const updateFundo = useCallback(async (id: number, fundo: Fundo) => {
    setLoading(true);
    setError(null);
    try {
      const updatedFundo = await FundosService.update(id, fundo);
      setFundos((prev) =>
        prev.map((f) => (f.idFundo === id ? updatedFundo : f))
      );
      toast.success("Fundo atualizado com sucesso!");
      return updatedFundo;
    } catch (err) {
      const errorMessage =
        err instanceof ApiError
          ? err.data?.erro || err.message
          : "Erro ao atualizar fundo";
      setError(errorMessage as string);
      toast.error(errorMessage as string);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete a fund
  const deleteFundo = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await FundosService.delete(id);
      setFundos((prev) => prev.filter((f) => f.idFundo !== id));
      toast.success("Fundo removido com sucesso!");
    } catch (err) {
      const errorMessage =
        err instanceof ApiError
          ? err.data?.erro || err.message
          : "Erro ao remover fundo";
      setError(errorMessage as string);
      toast.error(errorMessage as string);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Load funds on component mount
  useEffect(() => {
    fetchFundos();
  }, [fetchFundos]);

  return {
    fundos,
    loading,
    error,
    fetchFundos,
    createFundo,
    updateFundo,
    deleteFundo,
  };
}
