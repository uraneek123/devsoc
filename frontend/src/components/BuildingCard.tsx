import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import type { Building } from "../data/buildings";

interface Props {
  building: Building;
}

export default function BuildingCard({ building }: Props) {
  return (
    <>
      {/* Desktop / Tablet card (vertical) */}
      <Card
        className="hidden sm:block"
        sx={{
          position: "relative",
          overflow: "hidden",
          height: "100%",
          cursor: "pointer",
          transition: "transform 0.2s, box-shadow 0.2s",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
          },
        }}
        elevation={0}
      >
        <img
          src={building.image}
          alt={building.name}
          className="w-full h-60 object-cover"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/assets/placeholder.webp";
          }}
        />

        <Box
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            display: "flex",  
            alignItems: "center",
            gap: 0.5,
            backgroundColor: "white",
            borderRadius: "10px",
            px: 1.5,
            py: 1.0,
            boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
          }}
        >
          <FiberManualRecordIcon sx={{ fontSize: 12, color: "#4caf50" }} />
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, fontSize: "0.7rem", color: "#333" }}
          >
            {building.roomsAvailable} rooms available
          </Typography>
        </Box>

        <Box
          sx={{
            position: "absolute",
            bottom: 5.0,
            left: 5.0,
            right: 5.0,
            backgroundColor: "#e97724",
            py: 1.2,
            px: 2,
            borderRadius: "10px",
          }}
        >
          <Typography
            variant="body1"
            sx={{ color: "white", fontWeight: 600, fontSize: "0.8rem" }}
          >
            {building.name}
          </Typography>
        </Box>
      </Card>

      {/* Mobile card (horizontal landscape) */}
      <Card
        className="sm:hidden"
        sx={{
          position: "relative",
          overflow: "hidden",
          height: 140,
          cursor: "pointer",
        }}
        elevation={0}
      >
        <img
          src={building.image}
          alt={building.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/assets/placeholder.webp";
          }}
        />

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2.5,
            background:
              "linear-gradient(transparent 40%, rgba(0,0,0,0.4) 100%)",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: "white",
              fontWeight: 700,
              fontSize: "1rem",
              textShadow: "0 1px 4px rgba(0,0,0,0.5)",
            }}
          >
            {building.name}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              backgroundColor: "white",
              borderRadius: "9999px",
              px: 2.5,
              py: 1.5,
              boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
              flexShrink: 0,
            }}
          >
            <FiberManualRecordIcon sx={{ fontSize: 12, color: "#4caf50" }} />
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, fontSize: "0.8rem", color: "#333" }}
            >
              {building.roomsAvailable} / {building.roomsAvailable}
            </Typography>
          </Box>
        </Box>
      </Card>
    </>
  );
}
