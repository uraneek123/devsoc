import rawData from "../../data.json";

export interface Building {
  name: string;
  roomsAvailable: number;
  image: string;
}

interface RawBuilding {
  name: string;
  rooms_available: number;
  building_file?: string;
  building_picture?: string;
}

const filenameFixups: Record<string, string> = {
  "anitb.webp": "anitab.webp",
};

function resolveImage(filename: string): string {
  let clean = filename.replace(/^\.\//, "");
  clean = filenameFixups[clean] ?? clean;
  return `/assets/${clean}`;
}

export const buildings: Building[] = (rawData as RawBuilding[]).map((b) => ({
  name: b.name,
  roomsAvailable: b.rooms_available,
  image: resolveImage(b.building_file ?? b.building_picture ?? ""),
}));
