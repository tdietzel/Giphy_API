import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

function printGiphs(apiResponse) {
  console.log(apiResponse);
  const gifUrl = apiResponse.data[0].bitly_gif_url;
  console.log("GIF URL:", gifUrl);
  document.querySelector("img#displayGiphy").setAttribute("src", `${apiResponse.data[0].images.original.url}`);
}

function getGiph(userSearch) {
  let request = new XMLHttpRequest();
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${userSearch}&limit=5&offset=0&rating=g&lang=en`;

  request.addEventListener("loadend", () => {
    const response = JSON.parse(request.responseText);
    console.log("response: " + response + "responseText: " + request.status);
    if(request.status === 200) {
      printGiphs(response);
    } else {
      console.log("error");
    }
  });
  request.open("GET", url, true);
  request.send();
}

function handleFormSubmission(event) {
  event.preventDefault();
  const userSearch = document.querySelector("input#giphySearchInput").value;
  document.querySelector("input#giphySearchInput").value = '';
  getGiph(userSearch);
}

window.addEventListener("load", () => {
  document.querySelector("form#giphySearch").addEventListener("submit", handleFormSubmission);
});