import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";

export const SettingsNotifications = (props) => (
  <form {...props}>
    <Card sx={{ backgroundColor: "#111827" }}>
      <CardHeader subheader="Manage the result viewing to the users" title="Pulished Results" />
      <Divider />
      <CardContent>
        <Grid container spacing={6} wrap="wrap">
          <Grid
            item
            md={4}
            sm={6}
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
            xs={12}
          >
            <Typography color="textPrimary" gutterBottom variant="h6">
              Overall Results
            </Typography>
            <FormControlLabel
              control={<Checkbox color="primary" defaultChecked />}
              label="Current overall result"
            />
            <FormControlLabel control={<Checkbox color="primary" />} label="Number of voters" />
          </Grid>
          <Grid
            item
            md={4}
            sm={6}
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
            xs={12}
          >
            <Typography color="textPrimary" gutterBottom variant="h6">
              Reuslt Analysis
            </Typography>
            <FormControlLabel control={<Checkbox />} label="Result by sub divisions" />
            <FormControlLabel control={<Checkbox color="primary" />} label="Result by divisions" />
            <FormControlLabel control={<Checkbox color="primary" />} label="Result by district" />
            <FormControlLabel control={<Checkbox />} label="Result by provice" />
            {/* <FormControlLabel control={<Checkbox color="primary" />} label="Phone calls" /> */}
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <Button color="primary" variant="contained">
          Publish
        </Button>
      </Box>
    </Card>
  </form>
);
