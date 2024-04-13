import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import {
  resetFields,
  selectAddress,
  selectEmailAddress,
  updateAddress,
  updateEmailAddress,
} from "../src/reudux/features/inputSlice";
import { useState } from "react";
import axios from "axios";
function App() {
  const dispatch = useDispatch();
  const address = useSelector(selectAddress);
  const emailAddress = useSelector(selectEmailAddress);
  const [submitted, setSubmitted] = useState(false);
  const [noaddress, setnoaddress] = useState(false);
  const [res, setres] = useState({
    id: null,
    address: "",
    latitude: "",
    longitude: "",
  });
  const handleSubmit = async () => {
    dispatch(updateAddress(address));
    dispatch(updateEmailAddress(emailAddress));

    try {
      const response = await axios.get(
        `https://5111-45-130-203-144.ngrok-free.app/geolocation?address=${address}&email=${emailAddress}`
      );
      const data = response.data.location;
      if (data == null) {
        setnoaddress(false);
      } else {
        setnoaddress(true);
      }
      setres({
        id: data.id,
        address: data.address,
        latitude: data.latitude,
        langitude: data.longitude,
      });

      setSubmitted(true);
      console.log(data, res);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };
  const handleReset = () => {
    dispatch(resetFields());
    setSubmitted(false);
  };

  return (
    <Container sx={{ height: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          sx={{
            padding: "30px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Geolocation finder
          </Typography>
          <TextField
            size="small"
            id="outlined-basic"
            label="Address"
            variant="outlined"
            onChange={(event) => dispatch(updateAddress(event.target.value))}
          />
          <TextField
            size="small"
            type="email"
            id="outlined-basic"
            label="Email Address"
            variant="outlined"
            onChange={(event) =>
              dispatch(updateEmailAddress(event.target.value))
            }
          />
          {submitted ? (
            <div>
              <Typography variant="h5">your geolocation is</Typography>
              {noaddress == false ? (
                <Typography color={"red"} variant="body1">
                  there is no address
                </Typography>
              ) : (
                <Typography variant="body1">
                  your Address is {res.address}, <br />
                  {res.latitude} <br />
                  {res.langitude}
                </Typography>
              )}
              <Button
                sx={{ width: "100%" }}
                variant="contained"
                onClick={handleReset}
              >
                Reset
              </Button>
            </div>
          ) : (
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </Card>
      </Box>
    </Container>
  );
}

export default App;
