(function() {
  function displaySearchResults(results, store) {
    var searchResults = document.getElementById('search-results');

    if (results.length) { // Are there any results?
      var appendString = '';
      for (var i = 0; i < results.length; i++) {  // Iterate over the results
        var item = store[results[i].ref];
        appendString += '<dd>';
        appendString += '  <a href="' + item.url + '" title="' + item.title + '">';
        appendString += '    <div>' + item.index + '. ' + item.title + '</div>';
        appendString += '  </a>';
        appendString += '  <div class="float-left"><p>' + item.excerpt + '</p></div>';
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
