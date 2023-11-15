import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

function printGif(apiResponse) {
  const div = document.querySelector("div#displayGif");

  apiResponse.data.forEach((gif) => {
    const img = document.createElement("img");
    img.src = `${gif.images.original.url}`;
    img.height = 200;
    img.width = 200;
    div.appendChild(img);
  });
}

function getGif(userSearch) {
  let request = new XMLHttpRequest();
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${userSearch}&limit=5&offset=0&rating=g&lang=en`;

  request.addEventListener("loadend", () => {
    const response = JSON.parse(request.responseText);
    if(request.status === 200) {
      printGif(response);
    } else {
      window.alert("status: failed");
    }
  });
  request.open("GET", url, true);
  request.send();
}

function handleFormSubmission(event) {
  event.preventDefault();
  const userSearch = document.querySelector("input#giphySearchInput").value;
  document.querySelector("input#giphySearchInput").value = '';
  document.querySelector("div#displayGif").innerHTML = null;
  getGif(userSearch);
}

window.addEventListener("load", () => {
  document.querySelector("form#giphySearch").addEventListener("submit", handleFormSubmission);
});
