import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  createTheme,
  ThemeProvider,
  Grid,
  Avatar,
  Stack,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";

import dash from "../images/dash.png";
import dfi from "../images/dfi.png";
import eth from "../images/eth.png";

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

export default function AUMCard({ crypto, handleAUM }) {
  const [price, setPrice] = useState(0.0);
  const [btcPrice, setBTCPrice] = useState(0.0);
  const [AUM, setAUM] = useState(806700.0);
  const [selectedOption, setSelectedOption] = useState("USD");

  /*
==============================================================================
UseEffect triggers the fetchprice functions for the relevant crypto currencies

if there is an error with the API we use the default values in useState
==============================================================================
*/

  useEffect(() => {
    if (price === 0.0) {
      // Call the API to fetch the price
      try {
        fetchPrice({ crypt: crypto });
      } catch (error) {
        console.log(error);
        setPrice(0.0);
        handleAUM(AUM); // sending AUM back to App.js
      }
    }
    if (btcPrice === 0.0) {
      try {
        axios
          .get(
            "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
          )
          .then((response) => {
            const Price = response.data.bitcoin.usd;
            setBTCPrice(Price);
            console.log(`The price of bitcoin is: ${Price}`);
          });
      } catch (error) {
        console.log(error);
        setPrice(22000);
      }
    }
  });

  /*
==============================================================================
handle option change sets the option chosen (usd, euro,btc) in the dropdown bar

Number display returns a element that renders the AUM as a reflection of the 
option chosen by the user (usd, euro, btc)
==============================================================================
*/

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const NumberDisplay = ({ selected }) => {
    console.log(selected);
    if (selected === "USD") {
      const formatted = AUM.toFixed(2);
      return (
        <Typography variant="h6" sx={{ marginRight: 2, marginLeft: 2 }}>
          ${formatted}
        </Typography>
      );
    }
    if (selected === "EURO") {
      const number = AUM * 0.95;
      const formatted = number.toFixed(2);
      return (
        <Typography variant="h6" sx={{ marginRight: 2, marginLeft: 2 }}>
          {formatted}€
        </Typography>
      );
    } else {
      const number = AUM / btcPrice;
      const formatted = number.toFixed(2);
      return (
        <Typography variant="h6" sx={{ marginRight: 2, marginLeft: 2 }}>
          {formatted}BTC
        </Typography>
      );
    }
  };

  /*
==============================================================================
handle info display changes the logo and name of the cryptocurrency displayed
depening on which card it belongs to (dfi, dash, eth)
==============================================================================
*/

  const handleInfoDisplay = ({ crypt }) => {
    if (crypt === "dash") {
      return (
        <>
          <Avatar sx={{ width: 60, height: 60 }} src={dash} />
          <Typography variant="h6" sx={{ marginLeft: 1, flexGrow: 1 }}>
            Dash
          </Typography>
        </>
      );
    }

    if (crypt === "dfi") {
      return (
        <>
          <Avatar sx={{ width: 60, height: 60 }} src={dfi} />
          <Typography variant="h6" sx={{ marginLeft: 1, flexGrow: 1 }}>
            DeFi
          </Typography>
        </>
      );
    }

    if (crypt === "eth") {
      return (
        <>
          <Avatar sx={{ width: 60, height: 60 }} src={eth} />
          <Typography variant="h6" sx={{ marginLeft: 1, flexGrow: 1 }}>
            Ether
          </Typography>
        </>
      );
    }
  };

  /*
==============================================================================
fetch price fetches the price of (dfi,dash,eth) from coingecko and the number
of masternodes from the cakedefi API. It sets the value for AUM in USD as well

we also take in handleAUM for the app.js page to set the AUMs (dfi,dash,eth)
in the parent component (app.js), this is done to minimize the number of API
calls
==============================================================================
*/

  const fetchPrice = ({ crypt }) => {
    if (crypt === "dash") {
      axios
        .get(
          "https://api.coingecko.com/api/v3/simple/price?ids=dash&vs_currencies=usd"
        )
        .then((response) => {
          const Price = response.data.dash.usd;
          setPrice(Price);
          // Retrieve the list of all active nodes from Cake API
          axios
            .get("https://api.cakedefi.com/nodes?order=status&orderBy=DESC")
            .then((response) => {
              const activeNodes = response.data.filter(
                (node) => node.coin === "Dash" && node.status === "ACTIVE"
              );
              const totalValue = activeNodes.length * 1000 * Price;
              setAUM(totalValue);
              handleAUM(totalValue); // imported from app.js
              console.log(
                `The number of all active dash nodes: ${activeNodes.length}`
              );
              // Display the USD value of all active Dash assets
              console.log(
                `USD value of all active Dash assets: $${totalValue.toFixed(2)}`
              );
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    }
    if (crypto === "dfi") {
      axios
        .get(
          "https://api.coingecko.com/api/v3/simple/price?ids=defichain&vs_currencies=usd"
        )
        .then((response) => {
          const Price = response.data.defichain.usd;
          setPrice(Price);
          // Retrieve the list of all active nodes from Cake API
          axios
            .get("https://api.cakedefi.com/nodes?order=status&orderBy=DESC")
            .then((response) => {
              const activeNodes = response.data.filter(
                (node) => node.coin === "DeFi" && node.status === "ACTIVE"
              );
              const totalValue = activeNodes.length * 20000 * Price;
              setAUM(totalValue);
              handleAUM(totalValue); // imported from app.js
              console.log(
                `The number of all active DFI nodes: ${activeNodes.length}`
              );
              // Display the USD value of all active DeFi assets
              console.log(
                `USD value of all active DFI assets: $${totalValue.toFixed(2)}`
              );
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    }
    if (crypto === "eth") {
      axios
        .get(
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
        )
        .then((response) => {
          const Price = response.data.ethereum.usd;
          setPrice(Price);
          // Retrieve the list of all active nodes from Cake API
          axios
            .get("https://api.cakedefi.com/nodes?order=status&orderBy=DESC")
            .then((response) => {
              const activeNodes = response.data.filter(
                (node) => node.coin === "Ether" && node.status === "ACTIVE"
              );
              const totalValue = activeNodes.length * 32 * Price;
              setAUM(totalValue);
              handleAUM(totalValue); // imported from app.js
              console.log(
                `The number of all active ETH nodes: ${activeNodes.length}`
              );
              // Display the USD value of all active Ether assets
              console.log(
                `USD value of all active Ether assets: $${totalValue.toFixed(
                  2
                )}`
              );
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <Card
      sx={{
        minWidth: 310,
        maxWidth: 450,
        margin: "30px auto 20px",
        borderRadius: "16px",
      }}
    >
      <CardContent>
        <Stack sx={{ textAlign: "right" }}>
          <Typography variant="h7" sx={{ marginRight: 2 }}>
            Price USD
          </Typography>
        </Stack>
        <Grid container alignItems="center">
          <ThemeProvider theme={theme}>
            {handleInfoDisplay({ crypt: crypto })}
            <Typography variant="h6" sx={{ marginRight: 2 }}>
              ${price.toFixed(2)}
            </Typography>
          </ThemeProvider>
        </Grid>
        <br></br>
        <hr></hr>
        <br></br>
        <div style={{ marginBottom: 4 }}>
          <Typography variant="h7" sx={{ marginLeft: 2 }}>
            Select Currency
          </Typography>
        </div>
        <div style={{ marginBottom: 4 }}>
          <ThemeProvider theme={theme}>
            <FormControl
              sx={{
                marginTop: 2,
                marginLeft: 2,
                marginBottom: 2,
                marginRight: 0.5,
                minWidth: 200,
                flexGrow: 1,
              }}
            >
              <Select value={selectedOption} onChange={handleOptionChange}>
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="EURO">EURO</MenuItem>
                <MenuItem value="BTC">BTC</MenuItem>
              </Select>
            </FormControl>
            <div style={{ marginBottom: 4 }}>
              <Typography variant="h7" sx={{ marginLeft: 2 }}>
                AUM Value
              </Typography>
            </div>
            {NumberDisplay({ selected: selectedOption })}
          </ThemeProvider>
        </div>
      </CardContent>
    </Card>
  );
}
