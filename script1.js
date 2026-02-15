/* ---------- BLOG SEARCH SCRIPT ---------- */

// MASTER LIST
const BLOG_OPTIONS = [
  "My 17th Birthday",
  "Fresh Start",
  "Life as an Army Kid",
  "The Shift",
  "Goodbye School!",
  "Scribbles and Doodles",
  "Lasts",
  "Fear",
  "LOVE NOWADAYS",
  "College-mates or Critics?",
  "Love is NOT Blind!!",
  "What the hell MEN!!!"
];

document.addEventListener("DOMContentLoaded", () => {

  const searchInput = document.getElementById("blogSearch");
  const datalist = document.getElementById("blogSuggestions");

  if (!searchInput || !datalist) return;

  /* Fill suggestions */
  datalist.innerHTML = BLOG_OPTIONS
    .map(blog => `<option value="${blog}">`)
    .join("");

  /* Enter key */
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  });

  /* Auto-search when selected */
  searchInput.addEventListener("input", (e) => {
    if (BLOG_OPTIONS.includes(e.target.value)) {
      handleSearch();
    }
  });

});


/* MAIN SEARCH FUNCTION */
function handleSearch() {

  const input = document.getElementById("blogSearch");

  if (!input) return;

  const q = input.value.toLowerCase().trim();

  if (q === "") return;


  /* Keyword → Page Map */
  const blogMap = {

    "17": "birthday.html",
    "birthday": "birthday.html",

    "fresh": "fresh-start.html",
    "start": "fresh-start.html",

    "army": "life-as-army-kid.html",

    "shift": "new.html",

    "school": "farewell.html",
    "goodbye": "farewell.html",

    "scribbles": "scribbles.html",
    "doodles": "scribbles.html",

    "last": "lasts.html",

    "fear": "fear.html",

    "nowadays": "date.html",
    "love now": "date.html",

    "college": "chaos.html",
    "critics": "chaos.html",
    "mates": "chaos.html",

    "blind": "love.html",

    "men": "MEN.html"
  };


  /* Find matching keyword */
  const match = Object.keys(blogMap).find(key =>
    q.includes(key)
  );


  if (match) {

    window.location.href = blogMap[match];

  } else {

    alert("Blog not found. Try typing a title or keyword.");

  }
}


/* SUBSCRIBE (Optional) */
function subscribeEmail() {
  // Check if the database is connected
  if (!window.db) {
    alert("Wait a second, the database is still loading...");
    return;
  }

  const field = document.getElementById("subEmail");
  const email = field.value.trim();

  if (!email.includes("@")) {
    alert("Please enter a real email!");
    return;
  }

  // This part RECREATES the collection automatically
  window.db.collection("subscribers").add({
    email: email,
    time: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
    alert("YOU HAVE SUBSCRIBED TO ARCHITA BLOGS SUCESSFULLY!!");
    field.value = ""; // Clear the input
  })
  .catch((error) => {
    console.error("Error:", error);
    alert("It failed. Check the console!");
  });
}