import { Tooltip, ActionIcon, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import { memo } from "react";
import { RecordForm } from "./RecordForm";

export type EditRecordButtonProps = {
  record: DNSRecord;
};

export const EditRecordButton = memo(({ record }: EditRecordButtonProps) => {
  const [opened, { close, open }] = useDisclosure();

  return (
    <>
      <Tooltip label="Edit record" position="left" color="dark.5" withArrow>
        <ActionIcon size="sm" onClick={open}>
          <IconEdit size={14} />
        </ActionIcon>
      </Tooltip>

      <Modal title="Edit record" onClose={close} opened={opened} centered>
        <RecordForm record={record} />
      </Modal>
    </>
  );
});
