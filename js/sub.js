async function fetchEmail() {
  const response = await fetch("/js/email.json");
  data = await response.json();
  return data;
}

var form = document.getElementById('emailsub');
var xhr = new XMLHttpRequest();
const port = 3000;
var url = `http://localhost:${port}`;

var email = document.getElementById('email');
var val;

form.addEventListener('submit', (event) => {
  event.preventDefault();
  val = email.value;
  email.value = "";
  fetchEmail().then((mail) => {
    for (i = 0; i < mail.length; i++) {
      if (mail[i].email == val) {
        return;
      }
    }
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    var data = JSON.stringify(
      {
        "email": val,
        "confirmed": false
      }
    );
    xhr.send(data);
  })
})
