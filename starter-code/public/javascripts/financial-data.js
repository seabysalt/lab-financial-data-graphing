const getBtcValues = () => {

  const fromDate = document.getElementById("date1").value;
  const toDate = document.getElementById("date2").value;
  const currency = document.getElementById("currency").value;
  
  const url = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}&currency=${currency}`;
console.log(currency)
  axios
    .get(url)
    .then(response => {
      const data = response.data;
      const dates = Object.keys(data.bpi);
      const bitcoinValue = Object.values(data.bpi);

      // console.log(dates, bitcoinValue);

      const ctx = document.getElementById("bitcoinChart").getContext("2d");

      const myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: dates,
          datasets: [
            {
              label: "Bitcoin price",
              data: bitcoinValue,
              backgroundColor: "rgba(0, 183, 255, 0.678)"
            }
          ]
        }
      });
    })
    .catch(err => {
      console.log(err);
    });
};

getBtcValues();

document.getElementById("date2").onchange = () => { getBtcValues() };
document.getElementById("currency").onchange = () => { getBtcValues() };
