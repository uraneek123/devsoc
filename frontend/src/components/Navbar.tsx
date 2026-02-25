import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import MapIcon from "@mui/icons-material/Map";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function Navbar() {
  const [doorOpen, setDoorOpen] = useState(true);

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ backgroundColor: "white", borderBottom: "1px solid #eee" }}
    >
      <Toolbar className="flex justify-between">
        <Box
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setDoorOpen((prev) => !prev)}
        >
          <img
            src={
              doorOpen
                ? "/assets/freeRoomsLogo.png"
                : "/assets/freeroomsDoorClosed.png"
            }
            alt="Freerooms logo"
            className="h-10 w-10 object-contain"
          />
          <Typography
            variant="h5"
            sx={{
              color: "#e97724",
              fontWeight: 700,
              fontFamily: '"Inter", sans-serif',
              display: { xs: "none", sm: "block" },
            }}
          >
            Freerooms
          </Typography>
        </Box>

        <Box className="flex items-center gap-3">
          <IconButton
            sx={{
              border: "1px solid #e97724",
              borderRadius: "5px",
              color: "#e97724",
              width: 40,
              height: 40,
            }}
          >
            <SearchIcon />
          </IconButton>
          <IconButton
            sx={{
              backgroundColor: "#e97724",
              borderRadius: "5px",
              color: "white",
              width: 40,
              height: 40,
              "&:hover": { backgroundColor: "#d06a1f" },
            }}
          >
            <GridViewRoundedIcon />
          </IconButton>
          <IconButton
            sx={{
              border: "1px solid #e97724",
              borderRadius: "5px",
              color: "#e97724",
              width: 40,
              height: 40,
            }}
          >
            <MapIcon />
          </IconButton>
          <IconButton
            sx={{
              border: "1px solid #e97724",
              borderRadius: "5px",
              color: "#e97724",
              width: 40,
              height: 40,
            }}
          >
            <DarkModeIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
