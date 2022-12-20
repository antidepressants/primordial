async function fetchPosts() {
  const response = await fetch("/js/posts.json");
  data = await response.json();
  return data;
}

main = document.getElementsByClassName("main");
title = document.getElementsByClassName("title");
bg = document.getElementsByClassName("bg");

fetchPosts().then(posts => {
  i = document.head.querySelector('meta[name="index"]').content;
  document.title = posts[i].title;
  bg[0].style.backgroundImage = `url(${posts[i].thumbnail})`
  title[0].innerHTML = posts[i].title;
  info = document.createElement('h2');
  info.className = "info";
  info.innerHTML = `By <a class="redlink" href="#">${posts[i].author}</a> on <a class="redlink" href="#">${posts[i].date}</a>`;
  paragraph = document.createElement('p');
  paragraph.innerHTML = posts[i].content;
  references = document.createElement('ul');
  references.className = "references";
  references.innerHTML = "References:";
  for (j = 0; j < posts[i].references.length; j++) {
    reference = document.createElement('li');
    reflink = document.createElement('a');
    reflink.className = "whitelink";
    reflink.innerHTML = posts[i].references[j].title;
    reflink.href = posts[i].references[j].link;
    reference.appendChild(reflink);
    references.appendChild(reference);
  }
  pardiv = document.createElement('div');
  pardiv.className = "pardiv";
  pardiv.appendChild(paragraph);
  if (posts[i].references.length != 0)
    pardiv.appendChild(references);
  article = document.createElement('div');
  article.className = "article";
  article.appendChild(info);
  article.appendChild(pardiv);
  main[0].appendChild(article);
});
