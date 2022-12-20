async function fetchPosts() {
  const response = await fetch("/js/posts.json");
  data = await response.json();
  return data;
}

main = document.getElementsByClassName("maingrid");

fetchPosts().then((posts) => {
  for (i = posts.length - 1; i >= 0; i--) {
    path = `/articles/${posts[i].date}/${i}.html`
    thumbnail = document.createElement('div');
    header = document.createElement('h1');
    link = document.createElement('a');
    info = document.createElement('h2');
    div = document.createElement('div');
    thumbnail.className = "thumbnail";
    thumbnail.innerHTML = `<img src="${posts[i].thumbnail}">`
    link.className = "bglink cardlink";
    link.href = `${path}`;
    header.innerHTML = posts[i].title;
    info.className = "info";
    info.innerHTML = `By <a class="whitelink" href="#">${posts[i].author}</a> on <a class="whitelink" href="#">${posts[i].date}</a>`;
    div.className = "article";
    div.appendChild(thumbnail);
    div.appendChild(header)
    div.appendChild(info);
    link.appendChild(div);
    main[0].appendChild(link);
  }
});
