// write your code here!
//there's a note about the script tag wtfffff (moved it to the bottom of body so DOM can load)
//1. on page load (script tag is at the bottom, whew) fetch the duck list (fetch request) and
//1a. display each in duck nav(is this already there or do we need to append?)
//2. eventListener for click, display duck name, image, and likes button (is this in html?)
//2a. display duck likes with #duck-display (code is in github/README)
//3. eventlistener for click on the button to increment the number of likes (+= parseInt?)
//3a. text still reads x likes in button (${})?
//4. event listener on the duck form (submit) so When the #new-duck-form is submitted, it generates a new duck image in the #duck-nav.
//4a. When clicked, it shows a name, image, and like button in the #duck-display. No persistence is needed. (no patch) A duck starts with 0 likes.

const baseURL = "http://localhost:3000/ducks";
const duckList = document.getElementById("duck-nav");
//making the form into a variable so I can put an eventListener on it
const duckForm = document.getElementById("new-duck-form");

let ducks;
//putting this in the global scope for later?

//fetching duck data!
fetch(baseURL)
  .then((response) => response.json())
  .then((ducks) => {
    console.log(ducks);
    ducks.forEach(renderDucks);
  });
//fetch request the ducks, get json from server response! sweet! it console.logs! now what?
//for each duck you pull out of the json, plug it into renderDucks (make this next)
function renderDucks(duck) {
  let duckImage = document.createElement("img");
  //it has a problem with line 32 being undefined and I have no idea what it is
  duckImage.src = duck.img_url;
  duckList.appendChild(duckImage);
  duckImage.addEventListener("click", () => {
    showDuckDetails(duck);
  });
}
renderDucks();
//aw yeah, I got the ducks in the nav! now what?
//now to define showDuckDetails with the event listener in it?
function showDuckDetails(duck) {
  currentDuck = duck;
  let detailName = document.getElementById("duck-display-name");
  let detailImage = document.getElementById("duck-display-image");
  let likesButton = document.getElementById("duck-display-likes");
  //omggg the three lets above needed to be ids from the html and not the json, finally caught that
  detailName.textContent = duck.name;
  detailImage.src = duck.img_url;
  likesButton.innerText = duck.likes;

  //why is this part showing NaN on click?
  likesButton.addEventListener("click", (e) => {
    e.preventDefault();
    //on click, parseInt more likes to the base amount from the json
    //ok now why is line 56 not working??
    const baseAmount = e.target["likes"];
    currentDuck.likes += parseInt(baseAmount);
    document.getElementById("duck-display-likes").textContent =
      currentDuck.likes;
  });
}
showDuckDetails();

duckForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let currentDuck = duck;
  //start declaring new lets with their element ids?
  //  newDetailName.textContent= however you say form submission

  //renderDucks(duckForm);
  //duckList.appendchild(new image) to put it in the nav
  //duckList.appendchild(new name) to put it in the nav
  //add eventListener into this eventListener that shows new details when clicked
  //could this second listener just be addEventListener where on ("click" (renderDuck)?)
  e.target.reset();
});

//stretch deliverable, patch new ducks back to the server
//could this be part of the big event listener?
//how do I write this? idek. I think body is involved? stringify it back intoJSON?
// e.preventDefault and e.target.reset() are needed for the form, but idk if we need them for clicks
//lingering question: I declared ducks globally, so how come in the console it says it's not a thing?
