import { useEffect, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Box, Divider, Drawer, Typography, useMediaQuery, Avatar } from "@mui/material";
import { ChartBar as ChartBarIcon } from "../icons/chart-bar";
import { Cog as CogIcon } from "../icons/cog";
import { ShoppingBag as ShoppingBagIcon } from "../icons/shopping-bag";
import { User as UserIcon } from "../icons/user";
import { Users as UsersIcon } from "../icons/users";
import { Lock as LockIcon } from "../icons/lock";
import { useAuthContext } from "../contexts/auth-context";
import { NavItem } from "./nav-item";

const defaultMenu = [
  {
    href: "/",
    icon: <ChartBarIcon fontSize="small" />,
    title: "Dashboard",
  },
  {
    href: "/divisions",
    icon: <ShoppingBagIcon fontSize="small" />,
    title: "Divisions",
  },
  {
    href: "/sign-in",
    icon: <LockIcon fontSize="small" />,
    title: "Sign in",
  },
];

const adminMenu = [
  {
    href: "/",
    icon: <ChartBarIcon fontSize="small" />,
    title: "Dashboard",
  },
  {
    href: "/divisions",
    icon: <ShoppingBagIcon fontSize="small" />,
    title: "Divisions",
  },
  {
    href: "/candidates",
    icon: <UsersIcon fontSize="small" />,
    title: "Candidates",
  },
  {
    href: "/manage-publishes",
    icon: <CogIcon fontSize="small" />,
    title: "Manage publishes",
  },
  {
    href: "/account",
    icon: <UserIcon fontSize="small" />,
    title: "Account",
  },
];

export const DashboardSidebar = (props) => {
  const authContext = useAuthContext();
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });
  const menu = 0;

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  if (authContext.isAuthenticated) {
    menu = (
      <Box sx={{ flexGrow: 1, py: "20px" }}>
        {adminMenu.map((item) => (
          <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
        ))}
      </Box>
    );
  } else {
    menu = (
      <Box sx={{ flexGrow: 1, py: "20px" }}>
        {defaultMenu.map((item) => (
          <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
        ))}
      </Box>
    );
  }

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Box sx={{ pl: 3, pt: 3 }}>
            <NextLink href="/" passHref>
              <a>
                <Avatar
                  onClick={() => {}}
                  sx={{
                    alignItems: "center",
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    px: 3,
                    py: "11px",
                    borderRadius: 1,
                  }}
                  src="/favicon.ico"
                ></Avatar>
              </a>
            </NextLink>
          </Box>
          <Box sx={{ px: 3, py: 1, cursor: "pointer" }}>
            <div>
              <Typography color="inherit" variant="h5">
                .Smart Polling
              </Typography>
            </div>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 3,
          }}
        />
        {menu}
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#ffffff",
            width: 280,
            borderColor: "#2D3748",
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#ffffff",
          width: 280,
          borderColor: "#2D3748",
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
