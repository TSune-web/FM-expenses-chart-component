/**
 *
 * Fetch API, using the fetch() method here, works with HTTP/HTTPS requests/responses. For this challenge, I use the Live Server extension to achieve this issue for development.
 *
 * Without such extensions or frameworks like React.js and Node.js, erros related to CORS and loading data will be thrown and the local json file won't be read.
 *
 */

function fetchData() {
  fetch("data.json")
    .then((data) => data.json())
    .then((results) => {
      const container = document.getElementById("spendingContainer");

      let maxAmount = 0;
      for (const result of results) {
        if (maxAmount < result.amount) {
          maxAmount = result.amount;
        }
      }

      results.forEach((stat) => {
        // barContainer
        const barContainer = document.createElement("div");
        barContainer.classList.add("barContainer");
        container.appendChild(barContainer);

        // day
        const day = document.createElement("div");
        day.classList.add("day");
        day.innerText = stat.day;
        barContainer.appendChild(day);

        // bar
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.setAttribute("data-barStat", "$" + stat.amount);
        barContainer.appendChild(bar);

        // styling height
        const fraction = maxAmount / 100;
        console.log("fraction", fraction)
        let barHeight = stat.amount / fraction;
        console.log("barHeight", barHeight)
        bar.style.height = barHeight + "%";

        if (barHeight > 100) {
          bar.classList.add("turquiose");
        }
      });
    })
    .catch((err) => console.log("Whoops...error occurred: ", err));
}

window.addEventListener("load", fetchData);
