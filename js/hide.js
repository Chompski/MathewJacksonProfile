function hide(DIV) {
  let div = document.getElementById(DIV);

  if (div === blog) {
    port.style.display = "none";
  }

  if (div === port) {
    blog.style.display = "none";
  }


  if (div.style.display === "none") {
    div.style.display = "block";
    // div.scrollIntoView();
  } else if (div.id !== 'Front-End-Div') {
    div.style.display = "none";
  }

}
