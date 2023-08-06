import apiClient from "./apiClient";

export const getClients = (): Promise<IClient[]> => {
  return apiClient.get<IClient[]>("clients");
};

export const getClientsByName = (name: string): Promise<IClient[]> => {
  return apiClient.get<IClient[]>(`search/${name}`);
};

export const deleteClient = (id: string): Promise<IClient[]> => {
  return apiClient.delete<IClient[]>(`delete/client/${id}`);
};

export const createClient = (client: IClient): Promise<void> => {
  return apiClient.post<void>("clients", client);
};

export const updateClient = (client: IClient): Promise<void> => {
  return apiClient.put<void>("clients", client);
};
