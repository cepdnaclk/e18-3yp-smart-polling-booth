import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export const TotalVoters = (props) => (
  <Card sx={{ maxHeight: 140, height: "100%", backgroundColor: "neutral.200" }} {...props}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="h5">
            Total Voters
          </Typography>
          <Typography color="textPrimary" variant="h5">
            {props.totalCount}
          </Typography>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
