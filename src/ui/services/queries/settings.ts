import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetSettingsQuery = () => {
  return useQuery({
    queryKey: ["settings"],
    queryFn: async (): Promise<Settings> => {
      return ipc.invoke("settings.get");
    },
  });
};

export const useUpdateSettingsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["settings.set"],
    mutationFn: async (settings: Settings) => {
      return ipc.invoke("settings.set", settings);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });
};
