import { alpha, Card, Stack, styled } from "@mui/material";
import { common } from "@mui/material/colors";

const RootComponent = styled("div")({
  backgroundImage: "url(/arcadeBackground.png)",
  backgroundSize: "contain",
  height: "95vh",
});

export const App = () => {
  return (
    <RootComponent>
      <Stack
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        pt={4}
      >
        <img alt={"Arcade"} src="/arcadeBanner.png" />
      </Stack>
      <Stack direction={"row"} mt={4} spacing={3} justifyContent={"center"}>
        {[1, 2, 3].map((num) => {
          return (
            <Card
              key={num}
              sx={{
                width: "26%",
                height: "450px",
                borderRadius: "10px",
                backgroundColor: alpha(common.white, 0.8),
              }}
            ></Card>
          );
        })}
      </Stack>
    </RootComponent>
  );
};
