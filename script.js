"use strict";

// SELECT EVERY ELEMENT
let userName = document.querySelector(".user--name");
let userTag = document.querySelector(".user--tag");
let userBio = document.querySelector(".user--bio");
let dateJoined = document.querySelector(".date");
let repoCount = document.querySelector(".repo--count");
let followers = document.querySelector(".followers--count");
let following = document.querySelector(".following--count");
let userLocation = document.querySelector(".location--text");
let twitter = document.querySelector(".twitter--handle");
let portfolio = document.querySelector(".portfolio--text");
let github = document.querySelector(".github--handle");
let avatar = document.querySelector(".avatar");
let searchButton = document.querySelector(".search--button");
let search = document.querySelector(".search");
let body = document.querySelector("body");
let socials = document.querySelector(".profile__socials");
let loader = document.querySelector(".loader");
let mainContainer = document.querySelector(".main__container");
let themeChanger = document.querySelector(".theme--switch");

// TOGGLE THEMES
themeChanger.addEventListener("click", function () {
  document.body.classList.toggle("light__mode");
  searchButton.classList.toggle("button-fix");
  if (document.body.classList.contains("light__mode")) {
    localStorage.setItem("themeMode", "light__mode");
  } else {
    localStorage.removeItem("themeMode");
  }
});

// Handle modes
const mode = localStorage.getItem("themeMode");
if (mode === "light__mode") {
  document.body.classList.add(mode);
}

// UPDATES THE UI
const updateUI = function (userData) {
  userName.textContent = userData.name;

  userTag.textContent = userData.login;

  userBio.textContent = userData.bio
    ? userData.bio
    : "This user is a mystery, even to me";

  repoCount.textContent = userData.public_repos;

  followers.textContent = userData.followers;

  userLocation.textContent = userData.location
    ? userData.location
    : "This user is off grid";

  following.textContent = userData.following;

  twitter.textContent = userData.twitter_username
    ? userData.twitter_username
    : "This user doesn't like the bird app";

  portfolio.textContent = userData.blog
    ? userData.blog
    : "This user has no personal links";

  github.textContent = userData.html_url;

  avatar.src = userData.avatar_url;
};

// FETCH USER DATA
const getUserAndRepoData = async function (username) {
  try {
    loader.style.display = "block";
    const userResponse = await fetch(
      `https://api.github.com/users/${username}`
    );
    // IF USER INPUTS WRONG OR INVALID STRING
    if (!userResponse.ok) {
      throw new Error("You searched for a ghost. Try again");
    }

    // CONVERTS FULFILLED PROOMISE TO JSON
    const userData = await userResponse.json();
    updateUI(userData);

    localStorage.setItem("userData", JSON.stringify(userData));

    loader.style.display = "none";
  } catch (error) {
    search.value = error.message;
    setTimeout(function () {
      search.value = "";
      loader.style.display = "none";
    }, 2000);
  }
};

const loadStoredData = function () {
  const storedData = localStorage.getItem("userData");
  const userData = JSON.parse(storedData);
  updateUI(userData);
};

window.addEventListener("load", loadStoredData);

// EVENT LISTENER TO FETCH DATA
searchButton.addEventListener("click", function () {
  const username = search.value.toLowerCase();

  getUserAndRepoData(username);
  search.value = "";
});

let number = 0;
// ARRAY CONTAINING ALL CLICK SVGS
const stamps = [
  "./Click-svgs/circles.svg",
  "./Click-svgs/heart.svg",
  "./Click-svgs/moon.svg",
  "./Click-svgs/rainbow.svg",
  "./Click-svgs/shooting-star.svg",
  "./Click-svgs/waves.svg",
];

const stampsTag = document.querySelector("div.stamps");

const addStamp = function (x, y) {
  const img = document.createElement("img");
  img.setAttribute("src", stamps[number]);
  const randID = crypto.randomUUID();
  img.setAttribute("id", randID);

  setTimeout(function () {
    const prevImg = document.getElementById(randID);
    stampsTag.removeChild(prevImg);
  }, 3000);

  // remove half the window width
  img.style.left = `${x - window.innerWidth / 2}px`;
  img.style.top = `${y}px`;
  stampsTag.appendChild(img);

  // add some audio
  const audio = document.createElement("audio");
  audio.setAttribute("src", "plop.mp3");
  audio.play();

  number = number + 1;
  if (number > stamps.length - 1) {
    number = 0;
  }
};

body.addEventListener("click", function (event) {
  addStamp(event.pageX, event.pageY);
});

mainContainer.addEventListener("click", function (event) {
  event.stopPropagation();
});
