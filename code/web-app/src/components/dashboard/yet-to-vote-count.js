import { Avatar, Box, Card, CardContent, Grid, Typography, CircularProgress } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MoneyIcon from "@mui/icons-material/Money";

// Import react-circular-progressbar module and styles
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const YetToVoteCount = (props) => (
  <Card sx={{ height: "100%", backgroundColor: "#111827" }} {...props}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="#4fc3f7" gutterBottom variant="h5">
            Remaining
          </Typography>
          <Typography color="#f3e5f5" variant="h5">
            8,000, 000
          </Typography>
        </Grid>
        <Grid item sx={{ height: 10 }}>
          <div style={{ width: "115px", paddingRight: 20 }}>
            <CircularProgressbar value={40} text={"40%"} />
          </div>
        </Grid>
      </Grid>
      {/* <Box
        sx={{
          pt: 2,
          display: "flex",
          alignItems: "center",
        }}
      >
        <ArrowDownwardIcon color="error" />
        <Typography
          color="error"
          sx={{
            mr: 1,
          }}
          variant="body2"
        >
          12%
        </Typography>
        <Typography color="textSecondary" variant="caption">
          Since last month
        </Typography>
      </Box> */}
    </CardContent>
  </Card>
);
