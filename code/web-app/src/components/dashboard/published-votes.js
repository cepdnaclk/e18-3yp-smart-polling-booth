import { Card, CardContent, Grid, Typography, CircularProgress } from "@mui/material";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const PublishedVotes = (props) => (
  <Card sx={{ maxHeight: 140, height: "100%", backgroundColor: "neutral.200" }} {...props}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="h5">
            Voted
          </Typography>
          <Typography color="textPrimary" variant="h5">
            {props.voteCount}
          </Typography>
        </Grid>
        <Grid item>
          <div style={{ width: "115px", paddingRight: 20 }}>
            <CircularProgressbar
              value={Math.round((props.voteCount / props.totalCount) * 100)}
              text={`${Math.round((props.voteCount / props.totalCount) * 100)}%`}
            />
          </div>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
