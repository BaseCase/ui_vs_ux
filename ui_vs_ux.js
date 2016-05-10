document.addEventListener("DOMContentLoaded", function() {
  insert_random_gif_into(document.querySelector('#gif1 .slot'));
  insert_random_gif_into(document.querySelector('#gif2 .slot'));


  function insert_random_gif_into(el) {
    var url = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC";

    var req = new XMLHttpRequest();
    req.addEventListener('load', handle_it);
    req.open('GET', url);
    req.send();

    function handle_it(xhr) {
      var json = JSON.parse(xhr.target.responseText);
      var gif_url = json.data.image_url;
      var img = document.createElement('img');
      img.src = gif_url;
      el.appendChild(img);
    }
  }
});



/**** todo
 * - [ ] show two random gifs with UI/UX labels
 * - [ ] if URL is just the base, get new random GIFs and update URL to be shareable
 * - [ ] if given a shareable URL, populate GIFs with the given ones
 ******/
