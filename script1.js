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
/* SUBSCRIBE (Fixed) */
function subscribeEmail() {
  // 1. Check if Firebase is ready
  if (!window.db) {
    alert("Database connection not ready. Please wait a moment.");
    return;
  }

  const field = document.getElementById("subEmail");
  if (!field) return;

  const email = field.value.trim();

  // 2. Simple validation
  if (!email.includes("@")) {
    alert("Please enter a valid email address.");
    return;
  }

  // 3. THE MISSING PART: Save to Firestore
  window.db.collection("subscribers").add({
    email: email,
    time: firebase.firestore.FieldValue.serverTimestamp() // Adds a date/time stamp
  })
  .then(() => {
    // This happens if it works
    alert("Successfully joined the club! Check your inbox soon.");
    field.value = "";
  })
  .catch((err) => {
    // This happens if there is an error
    console.error("Firebase Error:", err);
    alert("Oops! Something went wrong. Try again later.");
  });
}