import { Navbar } from "@/components/Navbar";
import { AppShell } from "@mantine/core";
import { memo } from "react";
import { Outlet } from "react-router-dom";

export const AppLayout = memo(() => {
  return (
    <AppShell navbar={{ width: 300, breakpoint: "sm" }} padding="md">
      <Navbar />
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
});
