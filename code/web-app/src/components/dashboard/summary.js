import { Doughnut, Bar } from "react-chartjs-2";
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from "@mui/material";

export const Summary = (props) => {
  const data = {
    datasets: [
      {
        data: [63, 14, 22],
        backgroundColor: ["#3F51B5", "#e53935", "#FB8C00"],
        borderWidth: 1,
        borderColor: "#111827",
        hoverBorderColor: "#FFFFFF",
      },
    ],
    labels: ["Party-01", "Party-02", "Party-03"],
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
      value: 14,
      color: "#E53935",
    },
    {
      title: "Party-03",
      value: 23,
      color: "#FB8C00",
    },
  ];

  return (
    <Card sx={{ height: "100%", backgroundColor: "neutral.200" }} {...props}>
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
        <Box
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
        </Box>
      </CardContent>
    </Card>
  );
};
