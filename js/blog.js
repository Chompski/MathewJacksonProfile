function createBlog() {
  // Blog Main
  var mainDiv = document.createElement("DIV");
  document.body.appendChild(mainDiv);
  mainDiv.setAttribute("id", "blog");
  mainDiv.setAttribute("class", "col-12 animated bounceInUp blogMain")

  // Inner div
  var innerMain = document.createElement("DIV");
  innerMain.setAttribute("id", "innerBlog");
  innerMain.setAttribute("class", "blogPort col-12 row");
  document.getElementById("blog").appendChild(innerMain);

  // Title div and title
  var titleDiv = document.createElement("DIV");
  titleDiv.setAttribute("id", "titleDiv");
  titleDiv.setAttribute("class", "col-6");
  document.getElementById("innerBlog").appendChild(titleDiv);

  var title = document.createElement("H4");
  title.innerHTML = "This is a title.";
  document.getElementById("titleDiv").appendChild(title);

  //Date Div and date
  var dateDiv = document.createElement("DIV");
  dateDiv.setAttribute("id", "dateDiv");
  dateDiv.setAttribute("class", "col-6 text-right");
  document.getElementById("innerBlog").appendChild(dateDiv);

  var date = document.createElement("H4");
  date.innerHTML = "26/10/1987";
  document.getElementById("dateDiv").appendChild(date);

  //content Div and content
  var contentDiv = document.createElement("DIV");
  contentDiv.setAttribute("id", "contentDiv");
  contentDiv.setAttribute("class", "col-12 text-center");
  document.getElementById("innerBlog").appendChild(contentDiv);

  var content = document.createElement("P");
  content.innerHTML =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
  document.getElementById("contentDiv").appendChild(content);

  //Image Div and Image
  var imageDiv = document.createElement("DIV");
  imageDiv.setAttribute("id", "imageDiv");
  imageDiv.setAttribute("class", "col-12 text-center");
  document.getElementById("innerBlog").appendChild(imageDiv);

  var image = document.createElement("IMG");
  image.setAttribute("src", "Images/antdentifierex.png");
  image.setAttribute("class", "mx-auto d-block img-fluid");
  document.getElementById("imageDiv").appendChild(image);

}
