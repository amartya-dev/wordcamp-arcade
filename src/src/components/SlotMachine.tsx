import { useState, useRef } from "react";
import { alpha, Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import { common } from "@mui/material/colors";
import Confetti from "react-confetti";

type SlotMachineProps = {
  brand: string;
  names: string[];
  logoUrl: string;
};

export function SlotMachine({ brand, names, logoUrl }: SlotMachineProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [availableNames, setAvailableNames] = useState<string[]>(names);
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null); // Ref for the scroll container

  const itemHeight = 130;

  const [party, setParty] = useState<boolean>(false);

  const theme = useTheme();

  const handleDraw = () => {
    if (availableNames.length === 1) {
      return;
    }

    const newAvailableNames = availableNames.filter(
      (_, index) => index !== selectedIndex
    );
    setAvailableNames(newAvailableNames);

    let randomIndex = Math.floor(Math.random() * newAvailableNames.length); // Randomly select an index to scroll to

    setSelectedIndex(randomIndex);

    const duration = 10000; // 10 seconds
    const frameRate = 16; // Approximately 60 FPS
    const totalFrames = duration / frameRate;
    let currentFrame = 0;

    const scrollHeight = itemHeight * newAvailableNames.length;
    const easeInOutQuad = (t: number) =>
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        // Calculate the progress as a fraction of total frames
        const progress = currentFrame / totalFrames;

        // Apply easing for smooth acceleration and deceleration
        const easedProgress = easeInOutQuad(progress);

        // Calculate the new scroll position
        const scrollPosition = easedProgress * scrollHeight;

        scrollContainerRef.current.scrollTo({
          top: scrollPosition % scrollHeight, // Loop through the list dynamically
          behavior: "auto", // Immediate scroll for smooth continuous effect
        });
      }

      currentFrame++;

      // Stop scrolling after the duration
      if (currentFrame >= totalFrames) {
        clearInterval(interval);

        // Scroll to the final name
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTo({
            top: itemHeight * randomIndex,
            behavior: "smooth",
          });
        }

        // Add a delay before finally setting the name in the winner list
        setTimeout(() => {
          setParty(true);
          setSelectedNames([...selectedNames, newAvailableNames[randomIndex]]);
          setTimeout(() => {
            setParty(false);
          }, 1000);
        }, 500);
      }
    }, frameRate);
  };

  return (
    <Stack
      direction={"row"}
      width={"100%"}
      justifyContent={"center"}
      spacing={2}
    >
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        numberOfPieces={party ? 500 : 0}
      />
      <Stack
        width={"50%"}
        justifyContent={"center"}
        alignItems={"center"}
        spacing={4}
      >
        <img src={logoUrl} height={"100px"} />
        <Box
          component={motion.div}
          ref={scrollContainerRef} // Attach ref to the scrollable container
          sx={{
            height: "100px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            overflowY: "auto",
            background: `
            radial-gradient(circle at 50% 100%, #e0e0e0, #f5f5f5 70%)`,
            borderRadius: "50px",
            boxShadow: "inset 0 0 15px rgba(0, 0, 0, 0.3)",
            pb: 4,
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <Box
            sx={{
              width: "60%",
              height: "100%",
            }}
          >
            {availableNames.map((name, index) => (
              <Typography
                sx={{
                  height: "130%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
                key={name + index}
                variant="h3"
                textAlign={"center"}
              >
                {name}
              </Typography>
            ))}
          </Box>
        </Box>
        <Button
          sx={{
            mt: 2,
            width: "20%",
            textTransform: "none",
            borderRadius: "10px",
          }}
          component={motion.div}
          variant={"contained"}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDraw}
        >
          <Typography variant="body1">Draw !!</Typography>
        </Button>
      </Stack>
      {selectedNames.length >= 1 && (
        <Stack
          direction={"column"}
          sx={{ backgroundColor: alpha(common.white, 0.8), borderRadius: 5 }}
          alignItems={"center"}
          width={"500px"}
          justifyContent={"center"}
          p={2}
        >
          <Typography variant="h3" mb={2}>
            Winners !!
          </Typography>
          {selectedNames.map((selectedName, index) => {
            return (
              <Stack
                direction={"row"}
                justifyContent={"center"}
                alignItems={"center"}
                component={motion.div}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                <Typography variant="h4">
                  <Icon
                    icon={"material-symbols:trophy"}
                    color={theme.palette.primary.main}
                  />
                </Typography>
                <Typography variant="h4">{selectedName}</Typography>
              </Stack>
            );
          })}
        </Stack>
      )}
    </Stack>
  );
}
