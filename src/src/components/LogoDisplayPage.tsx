import { alpha, Button, Card, Stack, Typography } from "@mui/material";
import { common } from "@mui/material/colors";
import { motion } from "motion/react";

export const LogoDisplayPage = ({
  logoUrl,
  setSelectedBrand,
  brand,
}: {
  logoUrl: string;
  setSelectedBrand: any;
  brand: any;
}) => {
  return (
    <Stack height={"60%"} justifyContent={"center"} alignItems={"center"}>
      <Stack direction={"row"} mt={4} spacing={3} justifyContent={"center"}>
        <img src={logoUrl} width={"100%"} height={"auto"} />
      </Stack>
      <Button
        sx={{
          mt: 6,
          width: "10%",
          textTransform: "none",
          borderRadius: "10px",
        }}
        onClick={() => {
          setSelectedBrand(undefined);
        }}
        component={motion.div}
        variant={"contained"}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Typography variant="body1">Start !!</Typography>
      </Button>
    </Stack>
  );
};
