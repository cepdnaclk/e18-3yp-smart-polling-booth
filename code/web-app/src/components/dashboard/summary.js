import { Doughnut, Bar } from "react-chartjs-2";
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import client from "../../api/client";

export const Summary = (props) => {
  const [summary, setSummary] = useState({ data: [], label: [] });
  const data = {
    datasets: [
      {
        data: summary.data,
        backgroundColor: ["#3F51B5", "#e53935", "#FB8C00"],
        borderWidth: 1,
        borderRadius: 6,
        borderColor: "#111827",
        hoverBorderColor: "#FFFFFF",
      },
    ],
    labels: summary.label,
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  const Parties = [
    {
      title: "Party-01",
      value: 63,
      color: "#3F51B5",
    },
    {
      title: "Party-02",
      value: 63,
      color: "#3F6283",
    },
    {
      title: "Party-03",
      value: 63,
      color: "#3F2234",
    },
    {
      title: "Party-04",
      value: 63,
      color: "#3F1234",
    },
  ];

  const getSummary = async () => {
    const res = await client.get("votes/summary").catch((error) => {
      console.log(error);
    });
    if (res.data.summary) {
      console.log("start");
      console.log(Array.from(res.data.summary));

      summary.data = [];
      summary.label = [];

      Object.values(Array.from(res.data.summary)).forEach((item) => {
        console.log(item);
        summary.data.push(item.count);
        summary.label.push(item._id);
      });
    }
  };

  useEffect(() => {
    getSummary();
  }, []);

  return (
    <Card sx={{ maxHeight: 600, height: "100%", backgroundColor: "neutral.200" }} {...props}>
      <CardHeader title="Summary of Election" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: "relative",
          }}
        >
          <Bar data={data} options={options} />
        </Box>
        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 2,
          }}
        >
          {Parties.map(({ color, title, value }) => (
            <Box
              key={title}
              sx={{
                px: 1,
                textAlign: "center",
              }}
            >
              <Typography color="textPrimary" variant="body1">
                {title}
              </Typography>
              <Typography style={{ color }} variant="h4">
                {value}%
              </Typography>
            </Box>
          ))}
        </Box> */}
      </CardContent>
    </Card>
  );
};
