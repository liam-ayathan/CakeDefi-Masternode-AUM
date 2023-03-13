import React, { useState,useEffect } from "react";
import "chart.js/auto";
import axios from "axios";
import { Bar } from "react-chartjs-2";
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

const BarChart = () => {

  /*
==============================================================================
setting default values for dash and dfi market caps and using use effect to 
fetch current market cap.
==============================================================================
*/

  const [dfiMarketCap, setDfiMarketCap] = useState(242301238);
  const [dashMarketCap, setDashMarketCap] = useState(522121782);

  /* */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              ids: "defichain,dash",
            },
          }
        );
        setDfiMarketCap(response.data[1].market_cap);
        setDashMarketCap(response.data[0].market_cap);
        console.log("fetched");
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  });

  const data = {
    labels: [""],
    datasets: [
      {
        label: "Defichain",
        data: [dfiMarketCap.toFixed(2)],
        backgroundColor: "#FF00AF",
        borderColor: "#FF00AF",
        borderWidth: 2,
      },
      {
        label: "Dash",
        data: [dashMarketCap.toFixed(2)],
        backgroundColor: "#008CE7",
        borderColor: "#008CE7",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: false,
        text: "Sales by Quarter",
        font: {
          family: theme.typography.fontFamily,
          weight: theme.typography.fontWeight,
          size: theme.typography.fontSize,
        },
      },
      legend: {
        display: true,
        position: "bottom",
      },
      height: 400,
      layout: {
        padding: {
          top: 20,
        },
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            font: {
              family: theme.typography.fontFamily,
              weight: theme.typography.fontWeight,
              size: theme.typography.fontSize,
            },
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            font: {
              family: theme.typography.fontFamily,
              weight: theme.typography.fontWeight,
              size: theme.typography.fontSize,
            },
          },
        },
      ],
    },
  };

  const value = dfiMarketCap + dashMarketCap;
  return (
    <Card
      sx={{
        minWidth: 310,
        maxWidth: 450,
        minHeight: 523,
        margin: "30px auto 20px",
        borderRadius: "16px",
      }}
    >
      <CardContent>
        <ThemeProvider theme={theme}>
          <Typography
            variant="h6"
            sx={{
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            Market Cap Comparison (USD)
          </Typography>
          <Typography
            variant="h6"
            sx={{
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              fontSize: 20,
              marginTop: -0.4,
            }}
          >
            Total Valuation: ${value.toFixed(2)}
          </Typography>
        </ThemeProvider>
      </CardContent>
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 415,
          maxHeight: 415,
          marginTop: -3.6,
          marginBottom: 0,
        }}
      >
        <Bar data={data} options={options} />
      </CardContent>
    </Card>
  );
};

export default BarChart;
