---
title: "Categories"
layout: default
permalink: "/news"
---

<div class="container">
    <div class="row justify-content-center">


        <h4 class="font-weight-bold spanborder text-capitalize"><span>News</span></h4>

        {% assign pages_list = site.categories["News"] %}
        {% for post in pages_list %}
        {% if post.title != null %}
          {% if group == null or group == post.group %}
            {% include main-loop-card.html %}
          {% endif %}
        {% endif %}
        {% endfor %}
        {% assign pages_list = nil %}
        {% assign group = nil %}


    </div>
</div>
