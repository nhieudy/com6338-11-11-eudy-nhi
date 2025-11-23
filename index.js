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
  // const makeh2 = makeTag("h2")(data[0].title);
  // console.log(data);
  // console.log(data[0].title);
  // return makeh2;
  const makeH2 = makeTag("h2");
  const makeH3 = makeTag("h3");
  const makeP = makeTag("p");
  const makeBR = (str) => str + "<br />";
  const makeEM = makeTag("em");

  const title = makeH2(data[0].title);
  const author = pipe(makeEM, makeH3)(`by ${data[0].author}`);
  // const lines = (makeP(data[0].lines));
  //lines "" add p tag
  const lines = data[0].lines.join("<br/>"); //convert line array into one string with <br/> inbetween
  const stanzas = lines.split("<br/><br/>"); //new array, elements split where <br><br> (where "") is

  //eac
  let poem = ""; 
  for (s of stanzas) {
    poem += makeP(s);
  }
  console.log(lines);
  console.log(stanzas);
  console.log(poem);
  console.log(data);
  return title + author + poem;
};

// attach a click event to #get-poem
getPoemBtn.onclick = async function () {
  // renders the HTML string returned by makePoemHTML to #poem
  poemEl.innerHTML = makePoemHTML(await getJSON(poemURL));
};
