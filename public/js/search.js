(function() {
  function displaySearchResults(results, store) {
    var searchResults = document.getElementById('search-results');

    if (results.length) { // Are there any results?
      var appendString = '';
      for (var i = 0; i < results.length; i++) {  // Iterate over the results
        var item = store[results[i].ref];
        appendString += '<dd>';
        appendString += '  <div class="media">';
        appendString += '    <div class="media-left">';
        appendString += '      <a href="' + item.url + '" title="' + item.title + '">';
        appendString += '        <img src="../public/assets/category/' + item.image + '" class="rounded">';
        appendString += '      </a>';
        appendString += '    </div>';
        appendString += '    <div class="media-body">';
        appendString += '      <a class="title-org" href="' + item.url + '" title="' + item.title + '"><div class="subject"><span>' + item.index + '. ' + item.title+ '</span></div></a>';
        appendString += '      <a class="title-abb" href="' + item.url + '" title="' + item.title + '"><div class="subject"><span>' + item.index + '. ' + formatTitle(item.title)+ '</span></div></a>';
        appendString += '      <p class="excerpt">' + item.excerpt + '</p>';
        appendString += '      <div class="pull-left">';
        appendString += '          <ul class="list-inline list-unstyled more-att">';
        appendString += '            <li class="list-inline-item hidden-extra"><span><i class="far fa-calendar-alt" style="color:#bc2105"></i></span> ' + item.postdate + '</li>';
        appendString += '            <li class="list-inline-item hidden-extra">|</li>';
        appendString += '            <li class="list-inline-item"><span><i class="fas fa-comments" style="color:#008c25"></i></span> <a href="' + item.url + '#disqus_thread">Comments</a></li>';
        appendString += '            <li class="list-inline-item">|</li>';
        appendString += '            <li class="list-inline-item">';
        appendString += '              <span><i class="fas fa-tags" style="color:#3B5998"></i> ' + item.tags + ' </span>';
        appendString += '            </li>';
        appendString += '            <li class="list-inline-item hidden-extra">|</li>';
        appendString += '            <li class="list-inline-item hidden-extra">';
        appendString += '              <span><i class="fab fa-facebook" style="color:#3B5998"></i></span>';
        appendString += '              <span><i class="fab fa-twitter-square" style="color:#1DA1F2"></i></span>';
        appendString += '              <span><i class="fab fa-google-plus" style="color:#DB4437"></i></span>';
        appendString += '            </li>';
        appendString += '          </ul>';
        appendString += '      </div>';
        appendString += '    </div>';
        appendString += '  </div>';
        appendString += '</dd>';
      }
      searchResults.innerHTML = appendString;
    } else {
      searchResults.innerHTML = '<li>No results found</li>';
    }
  }

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');

      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      }
    }
  }

  function formatTitle(title) {
    if (title) {
      if (title.length > 37) {
        title = title.slice(0,37) + "...";
      }
    }
    return title;
  }

  var searchTerm = getQueryVariable('query');

  if (searchTerm) {
    //document.getElementById('search-box').setAttribute("value", searchTerm);
    document.getElementById('search-key').innerHTML = searchTerm;

    // Initalize lunr with the fields it will be searching on. I've given title
    // a boost of 10 to indicate matches on this field are more important.
    var idx = lunr(function () {
      this.field('id');
      this.field('title', { boost: 10 });
      //this.field('category');
      this.field('content');
      this.field('url');

      for (var key in window.store) { // Add the data to lunr
        this.add({
          'id': key,
          'title': window.store[key].title,
          //'author': window.store[key].author,
          //'category': window.store[key].category,
          'content': window.store[key].content,
          'url': window.store[key].url,
          'index': window.store[key].index,
          'excerpt': window.store[key].excerpt
        });
      }
    });

    var results = idx.search(searchTerm); // Get lunr to perform a search
    console.log("results:");
    console.log(results);
    displaySearchResults(results, window.store); // We'll write this in the next section
  }
})();
