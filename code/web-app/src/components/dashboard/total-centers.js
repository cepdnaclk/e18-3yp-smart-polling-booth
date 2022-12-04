import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export const TotalCenters = (props) => (
  <Card sx={{ height: "100%", backgroundColor: "#111827" }} {...props}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="#4fc3f7" gutterBottom variant="h5">
            Total centers
          </Typography>
          <Typography color="#f3e5f5" variant="h5">
            1, 623
          </Typography>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
