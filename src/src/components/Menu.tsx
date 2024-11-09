import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import { DropdownMenuItem } from "./DropDownMenuItem";
import { JoinCampButton } from "./JoinCampButton";

export const Menu = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "secondary.main" }}>
        <Toolbar>
          <img src={"/logo.png"} style={{ marginBottom: "-6%" }} alt={"logo"} />
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction={"row"} spacing={2}>
            <DropdownMenuItem
              title={"About"}
              dropdowns={["Contributor Day", "Places to stay", "Roadmap"]}
            />
            <Button
              variant={"text"}
              sx={{ color: "common.white", textTransform: "none" }}
            >
              <Typography>Venue</Typography>
            </Button>
            <DropdownMenuItem
              title={"People"}
              dropdowns={[
                "Attendees",
                "Organizers",
                "Volunteers",
                "Media Partners",
              ]}
            />
            {["Sponsors", "Blog", "Tickets"].map((menuString) => {
              return (
                <Button
                  key={menuString}
                  variant={"text"}
                  sx={{ color: "common.white", textTransform: "none" }}
                >
                  <Typography>{menuString}</Typography>
                </Button>
              );
            })}
          </Stack>
          <JoinCampButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
};
