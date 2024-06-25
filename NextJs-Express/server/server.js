// server.js
const express = require("express");
const donInformation = require("./routes/donInformation");
const donPaymentAndFees = require("./routes/donPaymentAndFees");
const donDetails = require("./routes/donDetails");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use("/api/don/information", donInformation);
app.use("/api/don/paymentAndFees", donPaymentAndFees);
app.use("/api/don/details", donDetails);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
