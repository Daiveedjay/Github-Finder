"use strict";

// const userName = document.getElementsByClassName("user--name");
// console.log(userName);
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
console.log(avatar);
let searchButton = document.querySelector(".search--button");
let search = document.querySelector(".search");
let body = document.querySelector("body");
let socials = document.querySelector(".profile__socials");
let loader = document.querySelector(".loader");
let mainContainer = document.querySelector(".main__container");

// let lightMode = document.querySelector(".light--mode");
// let darkMode = document.querySelector(".dark--mode");
let themeChanger = document.querySelector(".theme--switch");

themeChanger.addEventListener("click", function () {
  document.body.classList.toggle("light__mode");
  searchButton.classList.toggle("button-fix");
});

// lightMode.addEventListener("click", function () {
//   lightMode.src = `./Github-user-search-main/src/assets/icon-sun-active.svg`;
//   darkMode.src = `./Github-user-search-main/src/assets/icon-moon.svg`;

// });
// darkMode.addEventListener("click", function () {
//   console.log(darkMode);
//   darkMode.src = `./Github-user-search-main/src/assets/icon-moon-active.svg`;
//   lightMode.src = `./Github-user-search-main/src/assets/icon-sun.svg`;
// });

const getUserAndRepoData = async function (username) {
  try {
    loader.style.display = "block";
    const userResponse = await fetch(
      `https://api.github.com/users/${username}`
    );
    if (!userResponse.ok) {
      throw new Error("You searched for a ghost. Try again");
    }

    const userData = await userResponse.json();
    userName.textContent = userData.name;
    userTag.textContent = userData.login;
    userBio.textContent =
      userData.bio || userData.bio === ""
        ? ""
        : "This user is a mystery, even to me";

    repoCount.textContent = userData.public_repos;
    followers.textContent = userData.followers;
    userLocation.textContent = userData.location;

    following.textContent = userData.following;

    twitter.textContent =
      userData.twitter_username || userData.twitter_username === ""
        ? ""
        : "This user doesn't like the bird app";

    portfolio.textContent = userData.blog;
    github.textContent = userData.html_url;
    avatar.src = userData.avatar_url;

    console.log(userData);
    loader.style.display = "none";
    console.log(userData.bio, userData.name);
  } catch (error) {
    search.value = error.message;
    setTimeout(function () {
      search.value = "";
    }, 2000);

    loader.style.display = "none";

    console.error(error);
  }
};

searchButton.addEventListener("click", function () {
  const username = search.value.toLowerCase();

  getUserAndRepoData(username);
  search.value = "";
});

let number = 0;
const stamps = [
  "./IMG/icon-location.svg",
  "./IMG/icon-twitter.svg",
  "./IMG/icon-website.svg",
  "./IMG/icon-company.svg",
];

const stampsTag = document.querySelector("div.stamps");

let img;
const addStamp = function (x, y) {
  // <img src="circles.svg">
  img = document.createElement("img");
  img.setAttribute("src", stamps[number]);
  console.log(x, y);
  // remove half the window width
  img.style.left = `${x - window.innerWidth / 2}px`;
  img.style.top = `${y}px`;
  stampsTag.appendChild(img);

  number = number + 1;
  if (number > stamps.length - 1) {
    number = 0;
  }
};

body.addEventListener("click", function (event) {
  if (event.target === mainContainer) return;

  addStamp(event.pageX, event.pageY);
});

setTimeout(function () {
  img.style.display = "none";
}, 1500);
