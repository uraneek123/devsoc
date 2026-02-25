import rawData from "../../data.json";

export interface Building {
  name: string;
  roomsAvailable: number;
  image: string;
}

interface RawBuilding {
  name: string;
  rooms_available: number;
  building_picture: string;
}

function resolveImage(filename: string): string {
  const clean = filename.replace(/^\.\//, "");
  return `/assets/${clean}`;
}

export const buildings: Building[] = (rawData as RawBuilding[]).map((b) => ({
  name: b.name,
  roomsAvailable: b.rooms_available,
  image: resolveImage(b.building_picture),
}));
