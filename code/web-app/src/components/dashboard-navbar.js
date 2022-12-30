import { useRef, useState } from "react";
import NextLink from "next/link";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { useAuthContext } from "../contexts/auth-context";
import { AppBar, Avatar, Badge, Box, IconButton, Toolbar, Tooltip } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Bell as BellIcon } from "../icons/bell";
import { UserCircle as UserCircleIcon } from "../icons/user-circle";
import { Users as UsersIcon } from "../icons/users";
import { AccountPopover } from "./account-popover";

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

export const DashboardNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;
  const authContext = useAuthContext();
  const settingsRef = useRef(null);
  const [openAccountPopover, setOpenAccountPopover] = useState(false);
  const menu = "";

  if (authContext.isAuthenticated) {
    menu = (
      <>
        <IconButton
          onClick={onSidebarOpen}
          sx={{
            display: {
              xs: "inline-flex",
              lg: "none",
            },
          }}
        >
          <MenuIcon fontSize="small" />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title="Notifications">
          <IconButton sx={{ mx: 2 }}>
            <Badge badgeContent={4} color="info" variant="dot">
              <BellIcon fontSize="small" />
            </Badge>
          </IconButton>
        </Tooltip>
        <Avatar
          onClick={() => setOpenAccountPopover(true)}
          ref={settingsRef}
          sx={{
            cursor: "pointer",
            height: 40,
            width: 40,
            mx: 1,
          }}
          src="/static/images/avatars/avatar_2.png"
        >
          <UserCircleIcon fontSize="small" />
        </Avatar>
      </>
    );
  }
  // else {
  //   menu = (
  //     <NextLink
  //       href={"/sign-in/"}
  //       passHref
  //       sx={{
  //         display: "flex",
  //         justifyContent: "flex-end",
  //       }}
  //     >
  //       <Button
  //         component="a"
  //         disableRipple
  //         sx={{
  //           color: "neutral.300",
  //           fontWeight: "fontWeightBold",
  //           justifyContent: "center",
  //           px: 3,
  //           textAlign: "center",
  //           textTransform: "none",
  //           width: 100,
  //           "& .MuiButton-startIcon": {
  //             color: "neutral.400",
  //           },
  //           "&:hover": {
  //             backgroundColor: "rgba(255,255,255, 0.08)",
  //           },
  //         }}
  //       >
  //         <Box sx={{ flexGrow: 1 }}>Login</Box>
  //       </Button>
  //     </NextLink>
  //   );
  // }

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: "calc(100% - 280px)",
          },
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          {menu}
        </Toolbar>
      </DashboardNavbarRoot>
      <AccountPopover
        anchorEl={settingsRef.current}
        open={openAccountPopover}
        onClose={() => setOpenAccountPopover(false)}
      />
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};
