(function () {
  function displayListView(results) {
    var searchResults = document.getElementById('posting-list');

    if (results.length) { // Are there any results?
      var appendString = '';
      for (var i = 0; i < results.length; i++) {  // Iterate over the results
        var item = results[i];
        appendString += '<dd>';
        appendString += '  <div class="media">';
        appendString += '    <div class="media-left">';
        appendString += '      <a href="' + item.url + '" title="' + item.title + '">';
        appendString += '        <img src="../assets/assets/category/' + getImage(item.subcategory) + '" class="rounded">';
        appendString += '      </a>';
        appendString += '    </div>';
        appendString += '    <div class="media-body">';
        appendString += '      <a class="title-org" href="' + item.url + '" title="' + item.title + '"><div class="subject"><span ' + formatColor(item.draft) + ' >' + item.index + '. ' + item.title + '</span></div></a>';
        appendString += '      <a class="title-abb" href="' + item.url + '" title="' + item.title + '"><div class="subject"><span ' + formatColor(item.draft) + ' >' + item.index + '. ' + formatTitle(item.title) + '</span></div></a>';
        appendString += '      <p class="excerpt">' + item.excerpt + '</p>';
        appendString += '      <div class="pull-left">';
        appendString += '          <ul class="list-inline list-unstyled more-att">';
        //appendString += '            <li class="list-inline-item hidden-extra"><span><i class="far fa-calendar-alt" style="color:#bc2105"></i></span> ' + item.date + '</li>';
        //appendString += '            <li class="list-inline-item hidden-extra">|</li>';
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

  function isNullOrUndefined(val) {
    return val === undefined || val === null;
  }

  function formatTitle(title) {
    if (title) {
      if (title.length > 37) {
        title = title.slice(0, 37) + "...";
      }
    }
    return title;
  }

  function formatColor(isDraft) {
    //console.log(isDraft);
    if (isDraft) {
      return 'style="color:#e8073b"';
    }
    return '';
  }

  function getCategoryName(category) {
    return window.category[category];
  }

  function getSubCategoryName(subcategory) {
    return window.subcategory[subcategory];
  }

  function getParentCategory(subcategory) {
    return window.parentcategory[subcategory];
  }

  function getImage(subcategory) {
    var image = window.image[subcategory];
    image = (image === undefined) ? "empty.png" : image;
    return image;
  }

  var categoryList = document.getElementById('category-list');
  var categoryList2 = document.getElementById('category-list2');
  var postingList = document.getElementById('posting-list');
  var subject = document.getElementById('subject').value;
  var nav = getQueryVariable('n');
  var cat = getQueryVariable('c');
  var subcat = getQueryVariable('s');
  var results = [];

  if (nav) {
    //$(".page-wrapper").removeClass("toggled");
    categoryList.classList.remove("d-xl-block")
    categoryList.style.display = "none";
    categoryList2.style.display = "none";
    postingList.style.display = "block";
  } else {
    categoryList.style.display = "block";
    categoryList2.style.display = "block";
    postingList.style.display = "none";
    //$(".page-wrapper").addClass("toggled");
    nav = subject;
  }

  if (nav) {
    // bread crumb
    var appendString = '';
    appendString += '<ol class="breadcrumb">';
    var q = subject;
    if (nav) {
      q += "/?n=" + nav;
    }
    appendString += '  <li class="breadcrumb-item"><a href="/' + q + '">' + jsUcfirst(subject) + '</a></li>';
    if (cat) {
      q += "&c=" + cat;
      appendString += '  <li class="breadcrumb-item"><a href="/' + q + '">' + getCategoryName(cat) + '</a></li>';
    }
    if (subcat) {
      q += "&s=" + subcat;
      appendString += '  <li class="breadcrumb-item"><a href="/' + q + '">' + getSubCategoryName(subcat) + '</a></li>';
    }

    appendString += '</ol>';
    var breadcrumbCtrl = document.getElementById('bread-crumb');
    if (breadcrumbCtrl) {
      breadcrumbCtrl.innerHTML = appendString;
    }

    // match
    for (var key in window.store) {
      var subcategory = window.store[key].subcategory;
      if (subcat && subcategory == subcat ||
        isNullOrUndefined(subcat) && cat && getParentCategory(subcategory) === cat ||
        isNullOrUndefined(cat)) {
        results.push({
          'id': key,
          'title': window.store[key].title,
          'subcategory': window.store[key].subcategory,
          'url': window.store[key].url,
          'index': window.store[key].index,
          'excerpt': window.store[key].excerpt,
          'tags': window.store[key].tags,
          'date': window.store[key].date,
          'draft': window.store[key].draft
        });
      }
    }

    //console.log("results:");
    //console.log(results);
    displayListView(results);
  }
})();
