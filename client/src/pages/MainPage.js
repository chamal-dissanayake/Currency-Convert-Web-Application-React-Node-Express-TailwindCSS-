import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MainPage() {
  const [date, setDate] = useState(null);
  const [sourceCurrency, setSourceCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [amountInSourceCurrency, setAmountInSourceCurrency] = useState(0);
  const [amountInTargetCurrency, setAmountInTargetCurrency] = useState(0);
  const [currencyNames, setCurrencyNames] = useState([]);
  const [loading, setLoading] = useState(true);

  //handelsubmit method
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "http://localhost:5000/convertCurrency",
        {
          params: {
            date,
            sourceCurrency,
            targetCurrency,
            amountInSourceCurrency,
          },
        }
      );

      setAmountInTargetCurrency(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  //get all currency names
  useEffect(() => {
    const getCurrencyNames = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/getAllCurrencies"
        );
        setCurrencyNames(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCurrencyNames();
  }, []);

  return (
    <div>
      <h1 className="lg:mx-32 text-5xl font-bold text-green-500">
        Convert Your Currencies Today
      </h1>
      <p className="lg:mx-32 opacity-40 py-6"></p>
      <div className="mt-5 flex items-center justify-center flex-col">
        <section className="w-full lg:w-1/2">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor={date}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Date
              </label>
              <input
                onChange={(e) => setDate(e.target.value)}
                type="date"
                id={date}
                name={date}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                placeholder="Choose Date"
                required
              ></input>
            </div>

            <div className="mb-4">
              <label
                htmlFor={sourceCurrency}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Source Currency
              </label>
              <select
                onChange={(e) => setSourceCurrency(e.target.value)}
                id={sourceCurrency}
                name={sourceCurrency}
                value={sourceCurrency}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              >
                <option>Chooose Source Currency</option>
                {Object.keys(currencyNames).map((currancy) => (
                  <option className="p-1" key={currancy} value={currancy}>
                    {currencyNames[currancy]}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor={targetCurrency}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Target Currency
              </label>
              <select
                onChange={(e) => setTargetCurrency(e.target.value)}
                id={targetCurrency}
                name={targetCurrency}
                value={targetCurrency}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              >
                <option>Target Source Currency</option>
                {Object.keys(currencyNames).map((currancy) => (
                  <option className="p-1" key={currancy} value={currancy}>
                    {currencyNames[currancy]}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor={amountInSourceCurrency}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Amount In Source Currency
              </label>
              <input
                onChange={(e) => setAmountInSourceCurrency(e.target.value)}
                type="number"
                id={amountInSourceCurrency}
                name={amountInSourceCurrency}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                placeholder="Amount In Source Currency"
                required
              ></input>
            </div>

            <button className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">
              {""}
              Get The Target Currency
            </button>
          </form>
        </section>
      </div>

      {!loading ? (
        <section className="mt-5 lg:mx-32 text-xl">
          {amountInSourceCurrency} {currencyNames[sourceCurrency]} is Equals to{" "}
          <span className="text-green-500 font-bold">
            {" "}
            {amountInTargetCurrency}{" "}
          </span>{" "}
          in {currencyNames[targetCurrency]}.
        </section>
      ) : null}
    </div>
  );
}
