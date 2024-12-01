import Papa from "papaparse";

export type RaffleDataItem = {
  brand: string;
  participants: string[];
  logoUrl: string;
  csvName: string;
};

export type RaffleData = RaffleDataItem[];

const raffleData: RaffleData = [
  {
    brand: "GoDaddy",
    csvName: "names.csv",
    participants: [],
    logoUrl:
      "https://delhi.wordcamp.org/2024/files/2024/09/Copy-of-gd-logo-480x360-1-480x198-1.png",
  },
  {
    brand: "Bluehost",
    csvName: "names.csv",
    participants: [],
    logoUrl:
      "https://delhi.wordcamp.org/2024/files/2024/09/bh_logo_2015-500x105-1.png",
  },
  {
    brand: "RankMath",
    csvName: "names.csv",
    participants: [],
    logoUrl:
      "https://delhi.wordcamp.org/2024/files/2024/10/rank-math-logo-Uzair-Nazeer.png",
  },
  {
    brand: "LaraPush",
    csvName: "names.csv",
    participants: [],
    logoUrl: "https://delhi.wordcamp.org/2024/files/2024/10/larapush.png",
  },
];

export const getRaffleData = async () => {
  const updatedData = await Promise.all(
    raffleData.map(async (raffleDataItem) => {
      const response = await fetch(`/${raffleDataItem.csvName}`);
      const fileContent = await response.text();

      // Parse CSV content
      const parsedData = Papa.parse<string[]>(fileContent, { header: false });
      const participants = parsedData.data
        .map((row) => row[2])
        .filter((name) => !!name);

      return { ...raffleDataItem, participants };
    })
  );

  return updatedData;
};
