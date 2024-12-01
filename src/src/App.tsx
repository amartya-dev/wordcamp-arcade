import { alpha, Button, Card, Stack, styled } from "@mui/material";
import { SlotMachine } from "./components/SlotMachine";
import { getRaffleData, RaffleData, RaffleDataItem } from "./raffles/raffle";
import { useEffect, useState } from "react";
import { common } from "@mui/material/colors";
import { Icon } from "@iconify/react";
import { LogoDisplayPage } from "./components/LogoDisplayPage";

const RootComponent = styled("div")({
  backgroundImage: "url(/arcadeBackground.png)",
  backgroundSize: "contain",
  height: "95vh",
});

export const App = () => {
  const [raffleData, setRaffleData] = useState<RaffleData>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedBrand, setSelectedBrand] = useState<RaffleDataItem>();
  const [displayBrand, setDisplayBrand] = useState<boolean>(false);

  const populateRaffleData = async () => {
    setLoading(true);
    const loadedRaffleData = await getRaffleData();
    setRaffleData(loadedRaffleData);
  };

  useEffect(() => {
    populateRaffleData();
  }, []);

  if (selectedBrand && displayBrand) {
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
        <LogoDisplayPage
          brand={selectedBrand?.brand}
          logoUrl={selectedBrand?.logoUrl}
          setSelectedBrand={setDisplayBrand}
        />
      </RootComponent>
    );
  }

  if (selectedBrand) {
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
        <Button
          variant="text"
          onClick={() => {
            setSelectedBrand(undefined);
          }}
        >
          <Icon icon={"lets-icons:back"} />
        </Button>
        <Stack height={"60%"} justifyContent={"center"} alignItems={"center"}>
          <SlotMachine
            brand={selectedBrand.brand}
            logoUrl={selectedBrand.logoUrl}
            names={selectedBrand.participants}
          />
        </Stack>
      </RootComponent>
    );
  }

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
      <Stack height={"60%"} justifyContent={"center"} alignItems={"center"}>
        <Stack direction={"row"} mt={4} spacing={3} justifyContent={"center"}>
          {raffleData.map((raffleDataItem) => {
            return (
              <Card
                key={raffleDataItem.brand}
                sx={{
                  width: "26%",
                  height: "100px",
                  borderRadius: "10px",
                  backgroundColor: alpha(common.white, 0.8),
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  px: 2,
                  cursor: "pointer",
                }}
                onClick={() => {
                  setDisplayBrand(true);
                  setSelectedBrand(raffleDataItem);
                }}
              >
                <img
                  src={raffleDataItem.logoUrl}
                  width={"100%"}
                  height={"auto"}
                />
              </Card>
            );
          })}
        </Stack>
      </Stack>
    </RootComponent>
  );
};
