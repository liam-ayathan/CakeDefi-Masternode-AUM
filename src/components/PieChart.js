import React from "react";
import "chart.js/auto";
import { Pie } from "react-chartjs-2";
import {
  Card,
  CardContent,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: [
      '"IBM Plex Sans"',
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    fontWeight: 10000,
    fontSize: 20,
  },
});

  /*
==============================================================================
we receive the dfi, dash and eth AUMS from the app.js page
==============================================================================
*/

const PieChart = ({ dfi, dash, eth }) => {
  const data = {
    datasets: [
      {
        label: "AUM (USD)",
        data: [dfi, dash, eth],
        backgroundColor: ["#FF00AF", "#008CE7", "#627EEA"],
      },
    ],
    labels: ["Defichain", "Dash", "Ethereum"],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: false,
        text: "Sales by Quarter",
      },
      legend: {
        position: "bottom",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  const value = dfi + dash + eth;
  return (
    <Card
      sx={{
        minWidth: 310,
        maxWidth: 450,
        margin: "30px auto 20px",
        borderRadius: "16px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CardContent>
        <ThemeProvider theme={theme}>
          <Typography
            variant="h6"
            sx={{
              marginBottom: "1rem",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            AUM Comparison (USD)
          </Typography>
          <Typography
            variant="h6"
            sx={{
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              fontSize: 20,
              marginTop: -2.5,
            }}
          >
            Total Valuation: ${value.toFixed(2)}
          </Typography>
        </ThemeProvider>
        <Pie data={data} options={options} />
      </CardContent>
    </Card>
  );
};

export default PieChart;
