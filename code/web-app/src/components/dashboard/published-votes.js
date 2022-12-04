import { Avatar, Box, Card, CardContent, Grid, Typography, CircularProgress } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MoneyIcon from "@mui/icons-material/Money";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const PublishedVotes = (props) => (
  <Card sx={{ maxHeight: 140, height: "100%", backgroundColor: "#111827" }} {...props}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="#4fc3f7" gutterBottom variant="h5">
            Voted
          </Typography>
          <Typography color="#f3e5f5" variant="h5">
            24,000, 000
          </Typography>
        </Grid>
        <Grid item>
          <div style={{ width: "115px", paddingRight: 20 }}>
            <CircularProgressbar value={60} text={"60%"} />
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
