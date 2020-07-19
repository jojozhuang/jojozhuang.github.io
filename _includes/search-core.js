<script>
{% assign postings = site.algorithm | concat: site.programming | concat: site.architecture | concat: site.cloud | concat: site.tutorial | concat: site.project %}
window.store = {
  {% for post in postings %}
    "{{ post.url | slugify }}": {
      "key": "{{ post.key | xml_escape }}",
      "title": "{{ post.title | xml_escape }}",
      "subcategory": "{{ post.subcategory | xml_escape }}",
      {%- if page.advanced -%}
      "content": {{ post.content | strip_html | strip_newlines | jsonify }},
      {%- endif -%}
      "url": "{{ post.url | xml_escape }}",
      "index": "{{ post.index | xml_escape }}",
      "excerpt": "{{ post.excerpt | newline_to_br | strip_newlines | replace: '<br />', ' ' | strip_html | strip |  truncatewords: 30 }}",
      "tags": "{{ post.tags | join: ", "}}",
      "date": "{{ post.date | date_to_string}}"
    }
    {%- unless forloop.last -%},{%- endunless -%}
  {% endfor %}
};

// mapping of subcategory and image
{% assign categories = site.data.category.categories %}
window.image = {
  {% for category in categories %}
    {% for subcategory in category.subcategories %}
      "{{subcategory.subcategory}}": "{{ subcategory.image }}",
    {% endfor %}
  {% endfor %}
};

(function() {
  function displaySearchResults(results, store) {
    var searchResults = document.getElementById('search-results');

    if (results.length) { // Are there any results?
      var appendString = '';
      for (var i = 0; i < results.length; i++) {  // Iterate over the results
        var item = store[results[i].ref];
        var strIndex = "";
        if (item.index) {
          strIndex = item.index + '. ';
        }
        appendString += '<dd>';
        appendString += '  <div class="media">';
        appendString += '    <div class="media-left">';
        appendString += '      <a href="' + item.url + '" title="' + item.title + '">';
        appendString += '        <img src="../assets/assets/category/' + getImage(item.subcategory) + '" class="rounded">';
        appendString += '      </a>';
        appendString += '    </div>';
        appendString += '    <div class="media-body">';
        appendString += '      <a class="title-org" href="' + item.url + '" title="' + item.title + '"><div class="subject"><span>' + strIndex + item.title+ '</span></div></a>';
        appendString += '      <a class="title-abb" href="' + item.url + '" title="' + item.title + '"><div class="subject"><span>' + strIndex + formatTitle(item.title)+ '</span></div></a>';
        appendString += '      <p class="excerpt">' + item.excerpt + '</p>';
        appendString += '      <div class="pull-left">';
        appendString += '          <ul class="list-inline list-unstyled more-att">';
        appendString += '            <li class="list-inline-item hidden-extra"><span><i class="far fa-calendar-alt" style="color:#bc2105"></i></span> ' + item.date + '</li>';
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

  function getImage(subcategory) {
    var image = window.image[subcategory];
    image = (image === undefined) ? "empty.png" : image;
    return image;
  }

  var keyword = getQueryVariable('k');
  var category = getQueryVariable('c');

  if (keyword) {
    {% if page.advanced == false %}
      document.getElementById('search-key').innerHTML = keyword;
    {% endif %}
    // Initalize lunr with the fields it will be searching on. I've given title
    // a boost of 10 to indicate matches on this field are more important.
    var idx = lunr(function () {
      this.field('id');
      this.field('title', { boost: 10 });
      this.field('tags', { boost: 20 });
      this.field('excerpt', { boost: 5 });
      this.field('url');
      {% if page.advanced %}
        this.field('content');
      {% endif%}

      for (var url in window.store) { // Add the data to lunr
        var key = window.store[url].key;
        var advanced = {% if page.advanced %} true {% else %} false {% endif %}
        if (advanced || (!category && key!='note') || key==category) {
          this.add({
            'id': url,
            'title': window.store[url].title,
            'tags': window.store[url].tags,
            'excerpt': window.store[url].excerpt,
            {% if page.advanced %}
              'content': window.store[url].content,
            {% endif %}
            'url': window.store[url].url
            //'content': window.store[url].content
          });
        }
      }
    });

    var results = idx.search(keyword); // Get lunr to perform a search
    //console.log("results:");
    //console.log(results);
    displaySearchResults(results, window.store); // We'll write this in the next section
  }

  var spinner = document.getElementById('spinner');
  spinner.style.display = "none";

  {% if page.advanced %}
    var searchbox = document.getElementById('searchbox');
    searchbox.style.display = "block";
  {% else %}
    var searchTitle = document.getElementById('search-title');
    searchTitle.style.display = "block";
  {% endif %}

})();
</script>
