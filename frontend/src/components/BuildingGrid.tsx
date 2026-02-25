import { buildings } from "../data/buildings";
import BuildingCard from "./BuildingCard";

export default function BuildingGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {buildings.map((building) => (
        <BuildingCard key={building.name} building={building} />
      ))}
    </div>
  );
}
