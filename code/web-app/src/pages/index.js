import Head from "next/head";
import { Box, Container, Grid, Typography, Divider } from "@mui/material";
import { PublishedVotes } from "../components/dashboard/published-votes";
import { LatestOrders } from "../components/dashboard/latest-orders";
import { LatestProducts } from "../components/dashboard/latest-products";
import { Votes } from "../components/dashboard/votes";
import { TotalCenters } from "../components/dashboard/total-centers";
import { YetToVoteCount } from "../components/dashboard/yet-to-vote-count";
import { TotalVoters } from "../components/dashboard/total-voters";
import { Summary } from "../components/dashboard/summary";
import { DashboardLayout } from "../components/dashboard-layout";
import { width } from "@mui/system";

const Page = () => (
  <>
    <Head>
      <title>Dashboard</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 5,
      }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={3} justifyContent="center">
          <Box>
            <Box
              sx={{
                cursor: "no-drop",
                mb: 2,
                px: 10,
                borderRadius: 1,
              }}
            >
              <div alignItems="center">
                <Typography color="rgb(16,185, 129)" align="center" variant="h4">
                  Time Remaining
                </Typography>
                <Typography color="rgb(255,0,0)" align="center" variant="h3">
                  4 h 12 mins
                </Typography>
              </div>
            </Box>
          </Box>
        </Grid>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <PublishedVotes />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <YetToVoteCount />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <TotalVoters />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <TotalCenters />
          </Grid>
        </Grid>
        <Grid Grid container spacing={3} mt={0.5}>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <Votes />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <Summary />
          </Grid>
          {/* <Grid item lg={4} md={6} xl={12} xs={12}>
            <LatestProducts sx={{ height: "100%" }} />
          </Grid>
          <Grid item lg={8} md={12} xl={12} xs={12}>
            <LatestOrders />
          </Grid> */}
        </Grid>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
