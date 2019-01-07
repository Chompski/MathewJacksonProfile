function hide(DIV) {
    let div = document.getElementById(DIV);
    let frontEnd = 'closed'


        if (div.style.display === "none") {
        div.style.display = "block";
        // div.scrollIntoView();
        }
       else if (div.id !== 'Front-End-Div') {
         div.style.display = "none";
        }
    
}