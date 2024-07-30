import { Table, Group } from "@mantine/core";
import { memo } from "react";
import { DeleteRecordButton } from "./DeleteRecordButton";
import { EditRecordButton } from "./EditRecordButton";

export type RecordItemProps = {
  record: DNSRecord;
};

export const RecordItem = memo(({ record }: RecordItemProps) => {
  return (
    <Table.Tr>
      <Table.Td>{record.domain}</Table.Td>
      <Table.Td>{record.type}</Table.Td>
      <Table.Td>{record.value}</Table.Td>
      <Table.Td>{record.ttl}</Table.Td>
      <Table.Td>
        <Group justify="center" align="center" gap="xs">
          <EditRecordButton record={record} />

          <DeleteRecordButton record={record} />
        </Group>
      </Table.Td>
    </Table.Tr>
  );
});
