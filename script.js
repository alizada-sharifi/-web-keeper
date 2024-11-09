const modalShow = document.getElementById("show-modal");
const closeModal = document.getElementById("close-modal");
const modal = document.getElementById("modal");
const websiteName = document.getElementById("website-name");
const websiteUrl = document.getElementById("website-url");
const form = document.querySelector("form");
const container = document.getElementById("container");
let bookmarks = [];
// =================
modalShow.addEventListener("click", () => {
  modal.classList.add("show-modal");
  websiteName.focus();
});
closeModal.addEventListener("click", () => {
  modal.classList.remove("show-modal");
});
window.addEventListener("click", (e) =>
  e.target === modal ? modal.classList.remove("show-modal") : false
);
// ========= validate our bookmark
function validate(nameValue, urlValue) {
  const expression =
    /(https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
  const regex = new RegExp(expression);
  if (!nameValue || !urlValue) {
    alert("Please submit values for both fields.");
    return false;
  }
  if (!urlValue.match(regex)) {
    alert("Please provide a valid web address.");
    return false;
  }
  return true;
}
function buildBookmark() {
  container.textContent = "";
  bookmarks.forEach((bookmark) => {
    const { name, url } = bookmark;
    container.innerHTML += `<div class="item">
        <i class="fa-solid fa-xmark" title="Delete Bookmark" onclick="deleteBookmark('${url}')"></i>
        <div class="name">
          <a href="${url}" target="_blank">${name}</a>
        </div>
      </div>`;
  });
}
function getBookmarks() {
  if (localStorage.getItem("bookmarks")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  }
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  buildBookmark();
}
function deleteBookmark(url) {
  bookmarks.forEach((bookmark, i) => {
    if (bookmark.url === url) {
      bookmarks.splice(i, 1);
    }
  });
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  getBookmarks();
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nameValue = websiteName.value;
  let urlValue = websiteUrl.value;
  if (!urlValue.includes("http://", "https://")) {
    urlValue = `https://${urlValue}`;
  }
  if (!validate(nameValue, urlValue)) {
    return false;
  }
  const bookmark = {
    name: nameValue,
    url: urlValue,
  };
  bookmarks.push(bookmark);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  getBookmarks();
  form.reset();
  websiteName.focus();
});
getBookmarks();
