const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
var posts = require("./posts.json");
var email;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

function generateArticles() {
  for (i = 0; i < posts.length; i++) {
    content = `<!DOCTYPE html>
<html lang="en">

<head>
  <title></title>
  <meta name="index" content=${i}>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width">
  <link rel="icon" href="/media/svg/primordiallogo3.svg">
  <link type="text/css" rel="stylesheet" href="/css/styles.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>

<body>
  <header>
    <nav>
      <div class="wrapper">
        <div class="logowrapper" id="logoblog"><a href="/"><img src="/media/svg/primordiallogo3.svg"
              class="navicon"></a>
        </div>
        <div class="logowrapper menu">
          <img src="/media/svg/primordiallogo3.svg" class="navicon" id="logomenu">
          <div>
            <a href="/" class="whitelink" id="blog">Blog</a>
            <a href="/pages/post.html" class="whitelink">Post</a>
            <a href="/pages/about.html" class="whitelink">Introduction</a>
            <a href="/pages/contact.html" class="whitelink">Contact Us</a>
          </div>
        </div>
      </div>
    </nav>
  </header>
  <img src="/media/svg/border_ornamental_top.svg" class="border">
  <div class="bg">
  </div>
  <div class="maincontainer">
    <div class="pagetitle">
      <h1 class="title"></h1>
      <h2 class="quote">
        <script src="/js/quotes.js"></script>
      </h2>
    </div>
    <div class="main">
      <script src="/js/populate.js"></script>
    </div>
  </div>
  <img src="/media/svg/border_ornamental_bottom.svg" class="border">
  <footer>
    <div class="footer-top">
      <div class="footer-wrapper">
        <div class="socials">
          Social Media
          <div class="lists">
            <ul>
              <li><a href="#" class="fa fa-twitter whitelink"></a></li>
              <li><a href="#" class="fa fa-facebook whitelink"></a></li>
              <li><a href="#" class="fa fa-telegram whitelink"></a></li>
            </ul>
            <ul>
              <li><a href="#" class="fa fa-linkedin whitelink"></a></li>
              <li><a href="#" class="fa fa-instagram whitelink"></a></li>
              <li><a href="#" class="fa fa-vk whitelink"></a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
</body>

</html>`;

    path = "../articles/" + posts[i].date + "/";
    fs.mkdir(path, { recursive: true }, (err) => {
      if (err) return console.log(err);
    })
    fs.writeFile(`${path + i}.html`, content, (err) => {
      if (err) {
        return console.log(err);
      }
    });
  }
}

generateArticles();

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: "../" });
});

app.post('/', (req, res) => {
  email = require("./email.json");
  var data = req.body;
  email.push(data);
  fs.writeFile("./email.json", JSON.stringify(email), (err) => {
    return console.log(err);
  })
});

app.use(express.static("../"));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

