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

// function hide(id) {
//   var x = document.getElementById("id");
//   if (x.style.display === "none") {
//     x.style.display = "block";
//   } else {
//     x.style.display = "none";
//   }
// }
