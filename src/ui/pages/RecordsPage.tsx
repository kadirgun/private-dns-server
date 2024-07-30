import { AddRecordButton } from "@/components/Records/AddRecordButton";
import { RecordItem } from "@/components/Records/RecordItem";
import { useGetRecordsQuery } from "@/services/queries/records";
import { Flex, Paper, Table, TextInput } from "@mantine/core";
import { useDebouncedValue, useInputState } from "@mantine/hooks";
import { memo, useMemo } from "react";

export const RecordsPage = memo(() => {
  const { data: records } = useGetRecordsQuery();
  const [search, setSearch] = useInputState("");
  const [debouncedSearch] = useDebouncedValue(search, 300);

  const rows = useMemo(() => {
    if (!records) return [];

    const filtered = records.filter((record) => {
      return record.domain.includes(debouncedSearch) || record.value.includes(debouncedSearch);
    });

    return filtered.map((record, index) => <RecordItem key={index} record={record} />);
  }, [records, debouncedSearch]);

  return (
    <Flex direction="column" gap="md">
      <Flex justify="space-between">
        <TextInput placeholder="Search" size="xs" value={search} onChange={setSearch} />
        <AddRecordButton />
      </Flex>
      <Paper>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Domain</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>Value</Table.Th>
              <Table.Th>TTL</Table.Th>
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Paper>
    </Flex>
  );
});
