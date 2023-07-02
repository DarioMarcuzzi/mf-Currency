import "../dist/tailwind.css";
import "../styles.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const currenciesMoney = [
  "AED",
  "ARS",
  "AUD",
  "AWG",
  "BRL",
  "CAD",
  "CHF",
  "CLP",
  "COP",
  "CRC",
  "CZK",
  "DKK",
  "EGP",
  "EUR",
  "GBP",
  "CHF",
  "HTG",
  "INR",
  "JPY",
  "KES",
  "KHR",
  "KWD",
  "MAD",
  "MUR",
  "MYR",
  "NZD",
  "PAB",
  "PGK",
  "PLN",
  "RUB",
  "SAR",
  "SEK",
  "SGD",
  "THB",
  "TRY",
  "USD",
  "VND",
  "VUV",
  "XAF",
  "XOF",
  "XPF",
  "ZAR",
  "ZWL",
];

const Root = (props) => {
  const [data, setData] = useState(null);
  const [base, setBase] = useState(props.myProps);
  // console.log(props.myProps);

  // console.log(base.length);
  // if (base.length === "") {
  // }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:3001/?base=" + base);
        setData(response.data);
        // console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [base]);
  // console.log(data);

  return (
    <section className=" p-1 bg-slate-700 max-h-96 h-96 flex flex-col  font-serif">
      <div className=" flex w-full justify-around h-14 items-center  bg-slate-400">
        <h1 className="text-2xl ">Base</h1>
        <select
          onChange={(e) => setBase(e.target.value)}
          className="text-black"
        >
          <option value="">Referens : {base}</option>
          <option value=""></option>
          <optgroup label="Moneys">
            {data ? (
              data.currenciesSupport?.map((baseCurrency) => (
                <option value={baseCurrency} key={baseCurrency}>
                  {baseCurrency}
                </option>
              ))
            ) : (
              <option value="">there is nothing</option>
            )}
          </optgroup>
        </select>
      </div>
      <div className="grid grid-cols-3  my-2 justify-center items-center text-center gap-2">
        <p className="col-span-1 text-white">Currency</p>
        <p className="col-span-1 text-white border-x-2 border-slate-600 ">
          Value
        </p>
        <p className="col-span-1  text-white ">Disparity %</p>
      </div>
      <div className="flex  h-72 overflow-auto flex-col ">
        {data ? (
          data.currencies.conversion_rates?.map((item) => (
            <div
              className={`grid grid-cols-3 mb-2 text-center items-center ${
                item.id % 2 === 0 ? "bg-slate-500" : "bg-slate-400"
              } h-14`}
              key={item.id}
            >
              <h1 className="">{item.currency}</h1>
              <h1 className="text-right">{item.rate.toFixed(2)}$</h1>
              <h1
                className={`text-right mr-2 ${
                  item.positive ? "text-lime-500" : "text-red-600"
                } `}
              >
                {(item.disparity * 100).toFixed(2)}%
              </h1>
            </div>
          ))
        ) : (
          <div>no hay nada</div>
        )}
      </div>
    </section>
  );
};

export default Root;
