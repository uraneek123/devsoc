import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";

const pillButton = {
  borderRadius: "10px",
  textTransform: "none" as const,
  fontWeight: 600,
  fontSize: "0.95rem",
  px: 3,
  py: 1,
  borderColor: "#e97724",
  borderWidth: "3px",
  color: "#e97724",
  whiteSpace: "nowrap",
  "&:hover": {
    borderColor: "#d06a1f",
    backgroundColor: "rgba(233,119,36,0.06)",
  },
};

export default function SearchToolbar() {
  return (
    <div className="mb-5 space-y-3 sm:space-y-0">
      {/* Desktop: single row */}
      <div className="hidden sm:flex items-center gap-10">
        <Button
          variant="outlined"
          startIcon={<FilterAltIcon />}
          sx={pillButton}
        >
          Filters
        </Button>

        <TextField
          placeholder="Search for a building..."
          variant="outlined"
          size="small"
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#999" }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "5px",
              backgroundColor: "#f9f9f9",
            },
          }}
        />

        <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
          sx={pillButton}
        >
          Sort
        </Button>
      </div>

      {/* Mobile: search on top, buttons below */}
      <div className="sm:hidden space-y-3">
        <TextField
          placeholder="Search for a building..."
          variant="outlined"
          size="small"
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#999" }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              mb: "15px",
              borderRadius: "5px",
              backgroundColor: "#f9f9f9",
            },
          }}
        />
        <div className="flex gap-20">
          <Button
            variant="outlined"
            startIcon={<FilterAltIcon />}
            sx={pillButton}
          >
            Filters
          </Button>
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            sx={{ ...pillButton, ml: "auto" }}
          >
            Sort
          </Button>
        </div>
      </div>
    </div>
  );
}
