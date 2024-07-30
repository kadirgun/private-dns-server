import { Button, Modal } from "@mantine/core";
import { memo } from "react";
import { useDisclosure } from "@mantine/hooks";
import { RecordForm } from "./RecordForm";

export const AddRecordButton = memo(() => {
  const [opened, { close, open }] = useDisclosure();

  return (
    <>
      <Button size="xs" variant="light" onClick={open}>
        Add record
      </Button>

      <Modal title="Add record" onClose={close} opened={opened} centered>
        <RecordForm />
      </Modal>
    </>
  );
});
