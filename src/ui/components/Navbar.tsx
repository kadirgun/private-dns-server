import { AppShell, NavLink } from "@mantine/core";
import { IconDashboard, IconHistory, IconSettings } from "@tabler/icons-react";
import { memo, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const links = [
  { to: "/", label: "Dashboard", icon: <IconDashboard size="1rem" stroke={1.5} /> },
  { to: "/logs", label: "Logs", icon: <IconHistory size="1rem" stroke={1.5} /> },
  { to: "/settings", label: "Settings", icon: <IconSettings size="1rem" stroke={1.5} /> },
];

export const Navbar = memo(() => {
  const [active, setActive] = useState(0);
  const route = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const index = links.findIndex((link) => link.to === route.pathname);

    setActive(index === -1 ? 0 : index);
  }, [route.pathname]);

  const handleActive = (index: number) => {
    navigate(links[index].to);
  };

  return (
    <AppShell.Navbar p={0}>
      {links.map((link, index) => (
        <NavLink
          active={index === active}
          key={index}
          label={link.label}
          leftSection={link.icon}
          onClick={() => handleActive(index)}
        />
      ))}
    </AppShell.Navbar>
  );
});
