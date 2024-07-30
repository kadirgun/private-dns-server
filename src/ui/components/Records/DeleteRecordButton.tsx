import { useDeleteRecordMutation } from "@/services/queries/records";
import { Tooltip, ActionIcon } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconTrashFilled } from "@tabler/icons-react";
import { memo } from "react";

export type DeleteRecordButtonProps = {
  record: DNSRecord;
};

export const DeleteRecordButton = memo(({ record }: DeleteRecordButtonProps) => {
  const { mutateAsync: deleteRecord, isPending } = useDeleteRecordMutation();

  const handleClick = () => {
    deleteRecord(record.id).then(() => {
      showNotification({
        title: "Record deleted",
        message: `Record for ${record.domain} has been deleted`,
        color: "teal",
      });
    });
  };

  return (
    <Tooltip label="Delete record" position="left" color="dark.5" withArrow onClick={handleClick}>
      <ActionIcon color="red" size="sm" loading={isPending}>
        <IconTrashFilled size={14} />
      </ActionIcon>
    </Tooltip>
  );
});
