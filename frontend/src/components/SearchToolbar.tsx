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
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-10 mb-5">
      <TextField
        className="order-1 sm:order-2"
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

      <div className="order-2 flex justify-between sm:contents">
        <Button
          className="sm:order-1!"
          variant="outlined"
          startIcon={<FilterAltIcon />}
          sx={pillButton}
        >
          Filters
        </Button>
        <Button
          className="sm:order-3!"
          variant="outlined"
          startIcon={<FilterListIcon />}
          sx={pillButton}
        >
          Sort
        </Button>
      </div>
    </div>
  );
}
