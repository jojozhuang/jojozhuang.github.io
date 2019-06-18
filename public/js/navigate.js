(function() {
  function displaySearchResults(results, store) {
    var searchResults = document.getElementById('search-results');

    if (results.length) { // Are there any results?
      var appendString = '';
      for (var i = 0; i < results.length; i++) {  // Iterate over the results
        var item = results[i];
				//console.log(item);
        //appendString += '<dd>';
        //appendString += '  <a href="' + item.url + '" title="' + item.title + '">';
        //appendString += '    <div>' + item.index + '. ' + item.title + '</div>';
        //appendString += '  </a>';
        //appendString += '  <div class="float-left"><p>' + item.excerpt + '</p></div>';
        //appendString += '</dd>';
        appendString += '<dd>';
        appendString += '  <div class="media">';
        appendString += '    <div class="media-left">';
        appendString += '      <a href="' + item.url + '" title="' + item.title + '">';
        appendString += '        <img src="../public/assets/category/' + item.image + '" class="rounded" style="width:80px;margin-right:10px">';
        appendString += '      </a>';
        appendString += '    </div>';
        appendString += '    <div class="media-body">';
        appendString += '      <a href="' + item.url + '" title="' + item.title + '"><div class="subject"><span>' + item.index + '. ' + item.title + '</span></div></a>';
        appendString += '      <p>' + item.excerpt + '</p>';
        appendString += '      <div class="pull-left">';
        appendString += '          <ul class="list-inline list-unstyled">';
        appendString += '            <li class="list-inline-item"><span><i class="far fa-calendar-alt" style="color:#bc2105"></i></span> ' + item.postdate + '</li>';
        appendString += '            <li class="list-inline-item">|</li>';
        appendString += '            <li class="list-inline-item"><span><i class="fas fa-comments" style="color:#008c25"></i></span> <a href="' + item.url + '#disqus_thread">Comments</a></li>';
        appendString += '            <li class="list-inline-item hidden-extra">|</li>';
        appendString += '            <li class="list-inline-item hidden-extra">';
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
      searchResults.innerHTML = 'No content';
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

  function jsUcfirst(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
  }

  var subject = document.getElementById('subject').value;
  var searchTerm = getQueryVariable('query');
  var results = [];
  if (searchTerm) {
    $(".page-wrapper").removeClass("toggled");
  } else {
    $(".page-wrapper").addClass("toggled");
    searchTerm = jsUcfirst(subject) + ",";
  }

  if (searchTerm) {
    // bread crumb
    searchTerm = searchTerm.substring(0, searchTerm.length - 1);
    var terms = searchTerm.split(",");
    var appendString = '';
    var searchkey = '';
    appendString += '<ol class="breadcrumb">';
    for (i = 0; i < terms.length; i++) {
      searchkey += terms[i] + ",";
      appendString += '  <li class="breadcrumb-item"><a href="/' + subject + '?query=' + searchkey + '">'+terms[i]+'</a></li>';
    }
    appendString += '</ol>';
    var breadcrumb = document.getElementById('bread-crumb');
    breadcrumb.innerHTML = appendString;

   // search
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
          'excerpt': window.store[key].excerpt,
          'tags': window.store[key].tags,
          'postdate': window.store[key].postdate,
          'image': window.store[key].image
        });
      }
    }

    //console.log("results:");
    //console.log(results);
    displaySearchResults(results, window.store); // We'll write this in the next section
  }
})();
