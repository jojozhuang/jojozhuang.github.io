---
layout: default
title: Jekyll Themes
---
{% for themes in site.themes %}


<a href="{{ themes.url | prepend: site.baseurl }}">
        <h2>{{ themes.title }}</h2>
</a>

<p class="post-excerpt">{{ themes.description | truncate: 160 }}</p>

{% endfor %}     
