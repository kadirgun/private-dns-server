import { createHashRouter } from "react-router-dom";
import { AppLayout } from "./layouts/AppLayout";
import { RecordsPage } from "./pages/RecordsPage";
import { SettingsPage } from "./pages/SettingsPage";
import { LogsPage } from "./pages/LogsPage";

export const router = createHashRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <RecordsPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
      {
        path: "logs",
        element: <LogsPage />,
      },
    ],
  },
]);
