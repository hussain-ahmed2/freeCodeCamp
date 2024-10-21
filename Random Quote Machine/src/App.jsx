import { useEffect, useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import "./App.css";

function App() {
  const URL =
    "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";
  const [quotes, setQuotes] = useState([]);
  const [quote, setQuote] = useState({});

  function generateRandomColor() {
    const r = Math.floor(Math.random()*256);
    const g = Math.floor(Math.random()*256);
    const b = Math.floor(Math.random()*256);

    return `rgb(${r},${g},${b})`;
  }

  function generateRandomQuote(quotes) {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    document.querySelector('a').href = `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="${quote.quote}"+${quote.author})`;
    setQuote(quote);
  }

  async function fetchQuotes(URL) {
    const res = await fetch(URL);
    const data = await res.json();
    setQuotes(data.quotes);
    generateRandomQuote(data.quotes);
  }

  function handleClick() {
    generateRandomQuote(quotes);
    const color = generateRandomColor();
    document.querySelector('body').style.backgroundColor = color;
    document.querySelector('body').style.color = color;
    const button = document.querySelector('button');
    button.style.backgroundColor = color;
  }

  useEffect(() => {
    fetchQuotes(URL);
  },[]);

  return (
    <>
      <div id="wrapper">
        <div id="quote-box">
          <div id="text">
            <FaQuoteLeft />
            &nbsp;
            {quote.quote}
          </div>
          <div id="author">-&nbsp;{quote.author}</div>
          <div id="quote-links">
            <a href="" id="tweet-quote"><BsTwitterX /></a>
            <button onClick={handleClick} id="new-quote">
              New Quote
            </button>
          </div>
        </div>
        <div id="dev">by hussain</div>
      </div>
    </>
  );
}

export default App;
