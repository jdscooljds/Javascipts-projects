const apiUrl="https://api.quotable.io/random";
const quote = document.getElementById("quote");
const author = document.getElementById("author");


async function getquote(url){
    const response= await fetch(url);
    let data= await response.json();
    console.log(data);

    quote.innerHTML=data.content;
    author.innerHTML=data.author;
}

getquote(apiUrl);

function tweet(){
    window.open("https://www.facebook.com/login/" + quote.innerHTML + "---- by " + author.innerHTML, "facebook Window", "width=600, height=300");
}