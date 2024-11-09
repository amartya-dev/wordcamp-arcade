"use client";
// UI
import { Icon } from "@iconify/react";
// Models
import { Button, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";

type DropDownMenuOptions = {
  title: string;
  dropdowns: string[];
};

export const DropdownMenuItem = ({ title, dropdowns }: DropDownMenuOptions) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClosed = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div onMouseLeave={handleMenuClosed}>
      <Button
        sx={{ color: "common.white", textTransform: "none" }}
        variant={"text"}
        onClick={handleMenuOpen}
      >
        <Typography mr={0.2}>{title}</Typography>{" "}
        <Icon icon={open ? "raphael:arrowup" : "raphael:arrowdown"} />
      </Button>
      <Menu
        id={`menu-${title}`}
        anchorEl={anchorEl}
        // MenuListProps={{
        //   onMouseLeave: handleMenuClosed,
        // }}
        open={open}
        onClose={handleMenuClosed}
      >
        {dropdowns.map((dropDown, index) => {
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
        })}
      </Menu>
    </div>
  );
};
