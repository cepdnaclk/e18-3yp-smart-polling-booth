import PropTypes from "prop-types";
import { Avatar, Box, Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { Clock as ClockIcon } from "../../icons/clock";
import { Download as DownloadIcon } from "../../icons/download";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const ProductCard = ({ product, ...rest }) => (
  <Card sx={{ cursor: "pointer", maxHeight: 140, height: "100%", backgroundColor: "#111827" }}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="secondary.main" gutterBottom variant="h5">
            {product.division}
          </Typography>
          <Typography color="#f3e5f5" variant="h5">
            {product.totalVoters}
          </Typography>
        </Grid>
        <Grid item>
          <div style={{ width: "115px", paddingRight: 20 }}>
            <CircularProgressbar
              value={(product.publishedVotes / product.totalVoters) * 100}
              text={`${Math.round((product.publishedVotes / product.totalVoters) * 100)}%`}
            />
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

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};
