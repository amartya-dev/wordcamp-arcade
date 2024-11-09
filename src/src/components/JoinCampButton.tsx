import { Button, Menu, MenuItem, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import { useState } from "react";

export const JoinCampButton = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClosed = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Button
        sx={{
          ml: 2,
          textTransform: "none",
          borderRadius: "10px",
          border: "1px solid #000000",
          boxShadow: "2px 2px 0 0 #FFFFFF",
        }}
        variant={"contained"}
        onClick={handleMenuOpen}
      >
        <Typography mr={2}>Join camp as</Typography>
        <Icon
          icon={open ? "teenyicons:up-outline" : "teenyicons:down-outline"}
          color={"black"}
        />
      </Button>
      <Menu
        id={`menu-join-camp`}
        anchorEl={anchorEl}
        // MenuListProps={{
        //   onMouseLeave: handleMenuClosed,
        // }}
        open={open}
        onClose={handleMenuClosed}
      >
        {["Attendee", "Sponsor", "Speaker", "Volunteer", "Emcee"].map(
          (dropDown, index) => {
            return (
              <MenuItem
                onClick={() => {
                  handleMenuClosed();
                }}
                key={index}
              >
                {dropDown}
              </MenuItem>
            );
          }
        )}
      </Menu>
    </>
  );
};
