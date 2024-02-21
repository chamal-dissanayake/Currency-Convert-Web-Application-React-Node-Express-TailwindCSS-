const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

//middlewares

app.use(express.json());
app.use(cors());

//get currency
app.get("/getAllCurrencies",async (req, res)=>{
    const nameURL = "https://openexchangerates.org/api/currencies.json?app_id=d9d3f82d558a4cdeb3f6a32607c66c16";
    
    try {
        const nameResponse = await axios.get(nameURL);
        const nameDate = nameResponse.data;

    return res.json(nameDate);
        
    } catch (error) {
        console.log(error);
        
    }

});

//get the target value
app.get("/convertCurrency", async (req, res)=>{
    const {
        date,
        sourceCurrency,
        targetCurrency,
        amountInSourceCurrency,
    } = req.query;

    try {
        const dataURL = `https://openexchangerates.org/api/historical/${date}.json?app_id=d9d3f82d558a4cdeb3f6a32607c66c16`;

        const dataResponse = await axios.get(dataURL);
        const rates = dataResponse.data.rates;

        //rates
        const sourceRate = rates[sourceCurrency];
        const targetRate = rates[targetCurrency];

        //final target value

        const targetAmount = (targetRate / sourceRate) * amountInSourceCurrency;

        return res.json(targetAmount.toFixed(2));
        
    } catch (error) {
        console.error(error);
        
    }
});

//listen a port

app.listen (5000, ()=>{
    console.log("SERVER IS RUNNING");
})
