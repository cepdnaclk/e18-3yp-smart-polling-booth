import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export const TotalVoters = (props) => (
  <Card sx={{ height: "100%", backgroundColor: "#111827" }} {...props}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="#4fc3f7" gutterBottom variant="h5">
            Total Voters
          </Typography>
          <Typography color="#f3e5f5" variant="h5">
            32,000, 000
          </Typography>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
