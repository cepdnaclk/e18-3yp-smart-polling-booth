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
  TextField,
} from "@mui/material";

export const SettingsNotifications = (props) => (
  <form {...props}>
    <Card>
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
            <FormControlLabel
              control={<Checkbox color="primary" defaultChecked />}
              label="Number of voters"
            />
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
      <form>
        <Card>
          <CardContent>
            <TextField
              fullWidth
              label="Password"
              margin="normal"
              name="Password"
              // onChange={handleChange}
              type="password"
              // value={values.password}
              variant="outlined"
            />
          </CardContent>
        </Card>
      </form>
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
