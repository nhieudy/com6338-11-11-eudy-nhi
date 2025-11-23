const getPoemBtn = document.getElementById("get-poem");
const poemEl = document.getElementById("poem");
const poemURL =
  "https://poetrydb.org/random,linecount/1;12/author,title,lines.json";

const getJSON = (url) => fetch(url).then((res) => res.json());

const pipe =
  (...fns) =>
  (firstArg) =>
    fns.reduce((returnValue, fn) => fn(returnValue), firstArg);

const makeTag = (tag) => (str) => `<${tag}>${str}</${tag}>`;

// complete this function
const makePoemHTML = (data) => {
  //Use makeTag at least once
  const makeH2 = makeTag("h2");
  const makeH3 = makeTag("h3");
  const makeP = makeTag("p");
  const makeEM = makeTag("em");

  //Ended up just using join to add <br/>
  // const makeBR = (str) => str + "<br />";
  const title = makeH2(data[0].title);
  const author = pipe(makeEM, makeH3)(`by ${data[0].author}`); //Used pipe once

  //lines "" add p tag
  //Convert lines array into one string with <br/> inbetween
  const lines = data[0].lines.join("<br/>");

  //New array called stanzas, elements split where <br><br> is (where "" is in )
  const stanzas = lines.split("<br/><br/>");

  //each stanza, make a p tag for it
  // let poem = "";
  // for (s of stanzas) {
  //   poem += makeP(s);
  // }

  //Technically could do for of (like above) or map, then join into one string
  const poem = stanzas.map(makeP).join("");
  return title + author + poem;
};

// attach a click event to #get-poem
getPoemBtn.onclick = async function () {
  // renders the HTML string returned by makePoemHTML to #poem
  poemEl.innerHTML = makePoemHTML(await getJSON(poemURL));
};
