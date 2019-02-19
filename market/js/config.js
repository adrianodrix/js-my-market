function setConfig() {
  let texts = {
    'title': 'My Market v1'
  };

  document.title = texts.title;
  document.getElementById("navbar-brand").innerHTML = texts.title;
}

setConfig();
