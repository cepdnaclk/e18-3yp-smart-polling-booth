import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import axios from "axios";
import { Box, Container, Grid, Typography, Divider } from "@mui/material";
import useSWR from "swr";
import { PublishedVotes } from "../components/dashboard/published-votes";
import { Votes } from "../components/dashboard/votes";
import { TotalCenters } from "../components/dashboard/total-centers";
import { YetToVoteCount } from "../components/dashboard/yet-to-vote-count";
import { TotalVoters } from "../components/dashboard/total-voters";
import { Summary } from "../components/dashboard/summary";
import { DashboardLayout } from "../components/dashboard-layout";
import client from "../api/client";

async function customFetch(url) {
  const res = await fetch(url);
  return res.json();
}

const Page = () => {
  const [totalVoteCount, setTotalVoteCount] = useState(0);
  const [divisionCount, setDivisionCount] = useState(0);
  useEffect(() => {
    (async () => {
      const res = await client.get("/").catch((error) => {
        // console.log(error);
      });

      try {
        if (res.data) {
          // console.log(res.data);
          setTotalVoteCount(res.data.TotalVoters);
          setDivisionCount(res.data.TotalDivisions);
        }
      } catch {}
    })();
  }, []);

  const url = "http://3.93.242.30:4000/votes/currentVotes";
  // const url = "http://localhost:4000/votes/currentVotes";

  const { data, error } = useSWR(url, customFetch, {
    refreshInterval: 1000,
  });

  // console.log("useSWR", data);

  return (
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
                    Time remaining
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
              <PublishedVotes
                voteCount={!data ? 0 : data.currentVoteCount}
                totalCount={totalVoteCount}
              />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <YetToVoteCount
                voteCount={!data ? 0 : data.currentVoteCount}
                totalCount={totalVoteCount}
              />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TotalVoters totalCount={totalVoteCount} />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TotalCenters divisionCount={divisionCount} />
            </Grid>
          </Grid>
          <Grid Grid container spacing={3} mt={0.5}>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <Votes />
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <Summary />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
