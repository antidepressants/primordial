async function fetchQuotes() {
  const response = await fetch("/js/quotes.json");
  data = await response.json();
  return data;
}

const quote = document.getElementsByClassName("quote");

fetchQuotes().then((quotes) => {
  const quotei = quotes[Math.floor(Math.random() * quotes.length)];
  content = document.createElement('i');
  content.innerHTML = quotei.content;
  sayer = document.createElement('a');
  sayer.className = "greenlink";
  sayer.href = quotei.link;
  sayer.innerHTML = ` - ${quotei.sayer}`;
  quote[0].appendChild(content);
  quote[0].appendChild(sayer);
})
