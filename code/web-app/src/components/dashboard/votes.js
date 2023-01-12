import { Bar, tooltips, Line, Pie } from "react-chartjs-2";
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme } from "@mui/material";

export const Votes = (props) => {
  const data = {
    datasets: [
      {
        backgroundColor: "#00797C",
        borderColor: "green",
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: [18, 5, 19, 20, 20, 19, 20],
        label: "party 1",
        maxBarThickness: 10,
      },
      {
        backgroundColor: "#00BCC0",
        borderColor: "red",
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: [11, 20, 12, 29, 30, 25, 13],
        label: "party 2",
        maxBarThickness: 10,
      },
      {
        backgroundColor: "#5AFFFC",
        borderColor: "rgb(75, 192, 192)",
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: [1, 12, 4, 14, 2, 21, 13],
        label: "party 3",
        maxBarThickness: 10,
      },
    ],
    labels: ["11:00", "11:10", "11:20", "11:30", "11:40", "11:50", "12:00"],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "bottom",
      },
    },
  };

  return (
    <Card sx={{ maxHeight: 600, height: "100%", backgroundColor: "neutral.200" }} {...props}>
      <CardHeader title="hourly progress" p={9} color="#123123" />
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
      </CardContent>
      {/* <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          // p: 2,
        }}
      >
        <Button color="success" endIcon={<ArrowRightIcon fontSize="small" />} size="small">
          Overview
        </Button>
      </Box> */}
    </Card>
  );
};
