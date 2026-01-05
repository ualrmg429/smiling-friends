import { AxiosError } from 'axios';

export const handleApiError = (error: unknown): string => {
  if (error instanceof AxiosError) {
    // Si el backend envió un mensaje personalizado
    const message = error.response?.data?.message;
    
    if (Array.isArray(message)) return message[0]; // Para errores de validación (class-validator)
    if (typeof message === 'string') return message;
    
    // Errores por código de estado
    if (error.response?.status === 401) return "Expirated session. Please, log in again.";
    if (error.response?.status === 404) return "The solicited resource does not exists.";
  }
  
  return "There was an error processing your request. Please, try again later.";
};