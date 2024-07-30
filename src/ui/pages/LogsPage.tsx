import { CodeHighlight } from "@mantine/code-highlight";
import { ScrollArea } from "@mantine/core";
import { memo, useEffect, useMemo, useState } from "react";

export const LogsPage = memo(() => {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const listener = (event: unknown, data: string) => {
      setLogs((prev) => [data, ...prev]);
    };

    ipc.on("log", listener);

    return () => {
      ipc.off("log", listener);
    };
  }, []);

  const content = useMemo(() => (logs.length === 0 ? "No logs found yet" : logs.join("\n")), [logs]);

  return (
    <ScrollArea h="100vh" m="-16px">
      <CodeHighlight code={content} language="accesslog" h="100vh" withCopyButton={false} />
    </ScrollArea>
  );
});
