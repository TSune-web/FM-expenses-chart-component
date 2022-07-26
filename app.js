/**
 *
 * Fetch API, using the fetch() method here, works with HTTP/HTTPS requests/responses. For this challenge, I use the Live Server extension to achieve this issue for development.
 *
 * Without such extensions or frameworks like React.js and Node.js, erros related to CORS and loading data will be thrown and the local json file won't be read.
 *
 */

window.addEventListener("load", renderData);

function renderData() {
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
        const barContainer = document.createElement("div");
        barContainer.classList.add("barContainer");
        container.appendChild(barContainer);

        const day = document.createElement("div");
        day.classList.add("day");
        day.innerText = stat.day;
        barContainer.appendChild(day);

        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.setAttribute("data-barStat", "$" + stat.amount);
        barContainer.appendChild(bar);

        // styling height
        const fraction = maxAmount / 100;
        let barHeight = stat.amount / fraction;
        bar.style.height = barHeight + "%";
      });

      const bars = document.getElementsByClassName("bar");
      highlightToday(bars);
    })
    .catch((err) => console.log("Whoops...error occurred: ", err));
}

function highlightToday(bars) {
  const d = new Date();
  const day = d.getDay(); // returns 0(Sun) - 6(Sat)
  const today = day - 1;

  // fix mismatch of indexes of days
  // -> mon = today[1-1] or bars[0]
  // -> sun = today[0-1] or bars[6]
  let currBar;
  if (today === -1) {
    currBar = bars[6];
  } else {
    currBar = bars[today];
  }

  currBar.classList.add("today");
}
