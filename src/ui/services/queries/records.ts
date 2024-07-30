import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetRecordsQuery = () => {
  return useQuery({
    queryKey: ["records"],
    queryFn: async (): Promise<DNSRecord[]> => {
      return ipc.invoke("records.list");
    },
  });
};

export const useAddRecordMutation = () => {
  const client = useQueryClient();

  return useMutation({
    mutationKey: ["records.add"],
    mutationFn: async (record: DNSRecord) => {
      return ipc.invoke("records.add", record);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["records"] });
    },
  });
};

export const useUpdateRecordMutation = () => {
  const client = useQueryClient();
  return useMutation({
    mutationKey: ["records.update"],
    mutationFn: async (record: DNSRecord) => {
      return ipc.invoke("records.update", record);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["records"] });
    },
  });
};

export const useDeleteRecordMutation = () => {
  const client = useQueryClient();
  return useMutation({
    mutationKey: ["records.delete"],
    mutationFn: async (id: number) => {
      return ipc.invoke("records.delete", id);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["records"] });
    },
  });
};
