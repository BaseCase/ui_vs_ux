(function() {
  var BASE_API_URL = "http://api.giphy.com/v1/gifs";
  var API_KEY = "dc6zaTOxFJmzC";

  document.addEventListener("DOMContentLoaded", function() {
    if (window.location.hash) {
      load_specific_gifs();
    } else {
      load_random_gifs();
    }

    document.getElementById('new-example').href = window.location.origin + window.location.pathname;
  });

  function load_random_gifs() {
    var gif1_id, gif2_id;

    get(random_gif_url(), function(res) {
      add_image_to_el(document.querySelector('#gif1 .slot'), res.data.image_url);
      gif1_id = res.data.id;

      get(random_gif_url(), function(res) {
        add_image_to_el(document.querySelector('#gif2 .slot'), res.data.image_url);
        gif2_id = res.data.id;
        update_shareable_url(gif1_id, gif2_id);
      });
    });

  }

  function update_shareable_url(id1, id2) {
    var link = window.location.origin +
               window.location.pathname +
               '#' +
               id1 + '+' + id2;
    document.getElementById('shareable-url').value = link;
  }

  function random_gif_url() {
    return `${BASE_API_URL}/random?api_key=${API_KEY}&cb=${Math.floor(Math.random() * (new Date()).getTime())}`;
  }

  function load_specific_gifs() {
    var gif_ids = window.location.hash.substring(1).split('+');

    if (gif_ids.length !== 2)
      return load_random_gifs();

    insert_specific_gif_into(document.querySelector('#gif1 .slot'), gif_ids[0]);
    insert_specific_gif_into(document.querySelector('#gif2 .slot'), gif_ids[1]);
    update_shareable_url(gif_ids[0], gif_ids[1]);
  }

  function insert_specific_gif_into(el, gif_id) {
    var url = `${BASE_API_URL}/${gif_id}?api_key=${API_KEY}`;
    get(url, function(res) {
      add_image_to_el(el, res.data.images.original.url);
    });
  }

  function add_image_to_el(el, img_src) {
    var img = document.createElement('img');
    img.src = img_src;
    el.appendChild(img);
  }

  function get(url, callback) {
    var req = new XMLHttpRequest();
    req.addEventListener('load', handle_it);
    req.open('GET', url);
    req.send();

    function handle_it(xhr) {
      var json = JSON.parse(xhr.target.responseText);
      callback(json);
    }
  }
})();



/**** todo
 * - [x] show two random gifs with UI/UX labels
 * - [ ] styles to make it look like one of those image macros the kids like
 * - [x] if URL is just the base get new random GIFs
 * - [x] update URL to be shareable
 * - [x] if given a shareable URL, populate GIFs with the given ones
 ******/
