import { memo, useMemo } from "react";
import { useForm } from "@mantine/form";
import { Button, Flex, NumberInput, Select, TextInput } from "@mantine/core";
import { useAddRecordMutation, useUpdateRecordMutation } from "@/services/queries/records";
import { DNSTypes } from "@/data/dns";
import { showNotification } from "@mantine/notifications";

export type RecordFormProps = {
  record?: DNSRecord;
};

export const RecordForm = memo(({ record }: RecordFormProps) => {
  const { mutateAsync: addRecord, isPending: isAddRecordPending } = useAddRecordMutation();
  const { mutateAsync: updateRecord, isPending: isUpdateRecordPending } = useUpdateRecordMutation();

  const form = useForm<DNSRecord>({
    initialValues: {
      id: record?.id || 0,
      domain: record?.domain || "",
      type: record?.type || "A",
      value: record?.value || "",
      ttl: record?.ttl || 3600,
    },
    validate: {
      domain: (value: string) =>
        /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/.test(value)
          ? null
          : "Invalid domain",
    },
  });

  const handleSubmit = async (values: DNSRecord) => {
    if (record) {
      updateRecord(values).then(() => {
        showNotification({
          title: "Record updated",
          message: `Record for ${values.domain} has been updated`,
          color: "teal",
        });
      });
    } else {
      addRecord(values).then(() => {
        showNotification({
          title: "Record added",
          message: `Record for ${values.domain} has been added`,
          color: "teal",
        });
      });
    }
  };

  const isLoading = useMemo(
    () => isAddRecordPending || isUpdateRecordPending,
    [isAddRecordPending, isUpdateRecordPending]
  );

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Flex direction="column" gap="sm">
        <TextInput label="Domain" required {...form.getInputProps("domain")} />
        <Select data={DNSTypes} label="Type" required {...form.getInputProps("type")} />
        <TextInput label="Value" required {...form.getInputProps("value")} />
        <NumberInput label="TTL" required {...form.getInputProps("ttl")} />
        <Button type="submit" loading={isLoading}>
          {record ? "Update record" : "Add record"}
        </Button>
      </Flex>
    </form>
  );
});
