(function() {
  function displaySearchResults(results, store) {
    var searchResults = document.getElementById('search-results');

    if (results.length) { // Are there any results?
      var appendString = '';
      for (var i = 0; i < results.length; i++) {  // Iterate over the results
        var item = results[i];
				//console.log(item);
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
  var results = [];

  if (searchTerm) {
    if (searchTerm) {
      searchTerm = searchTerm.substring(0, searchTerm.length - 1);
    }
    //document.getElementById('search-box').setAttribute("value", searchTerm);
    document.getElementById('search-key').innerHTML = searchTerm;

    for (var key in window.store) {
      var navpath = window.store[key].navpath;
      if (navpath) {
        //console.log(navpath);
      }
      if (navpath.startsWith("["+searchTerm)) {
        results.push({
          'id': key,
          'title': window.store[key].title,
          'content': window.store[key].content,
          'url': window.store[key].url,
          'index': window.store[key].index,
          'excerpt': window.store[key].excerpt
        });
      }
    }

    //console.log("results:");
    //console.log(results);
    displaySearchResults(results, window.store); // We'll write this in the next section
  }
})();
