var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var count = document.getElementById("count");
var back = document.querySelector("#back");

var allBookmark = [];

var regexName = /^[a-z A-Z]{3,}$/;

var regexUrl =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

if (localStorage.getItem("bookmark") != null) {
  allBookmark = JSON.parse(localStorage.getItem("bookmark"));
  displayBookmark(allBookmark);
}

function addBookmark() {
  if (regexName.test(siteName.value) && regexUrl.test(siteUrl.value)) {
    var bookmark = {
      name: siteName.value,
      url: siteUrl.value,
    };

    allBookmark.push(bookmark);

    localStorage.setItem("bookmark", JSON.stringify(allBookmark));
    displayBookmark(allBookmark);
    clearForm();
  } else {
    Swal.fire({
      title: "Error!",
      text: "Please enter valid name and URL",
      icon: "error",
      confirmButtonText: "OK",
    });
  }
}

function clearForm() {
  siteName.value = "";
  siteUrl.value = "";
  siteName.classList.remove("is-valid");
  siteName.classList.remove("is-invalid");
  siteUrl.classList.remove("is-valid");
  siteUrl.classList.remove("is-invalid");
}

function displayBookmark(list) {
  var container = ``;

  for (var i = 0; i < list.length; i++) {
    container += `
        <tr>
        <td>${i + 1}</td>
        <td>${list[i].name}</td>
        <td><a href="${
          list[i].url
        }" target="_blank" class="btn btn-visit text-decoration-none"><i class="fa-solid fa-eye pe-2"></i> Visit</a></td>
        <td><button class="btn btn-delete" onclick="deleteBookmark()"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
       </tr>

        `;
  }
  document.getElementById("tBody").innerHTML = container;
  bookmarkCounter();
}

function deleteBookmark(bookmarkIndex) {
  allBookmark.splice(bookmarkIndex, 1);
  localStorage.setItem("bookmark", JSON.stringify(allBookmark));
  displayBookmark(allBookmark);
}

function searchBookmark(term) {
  searchArray = [];

  for (var i = 0; i < allBookmark.length; i++) {
    if (
      allBookmark[i].name.toLowerCase().includes(term.toLowerCase()) === true
    ) {
      searchArray.push(allBookmark[i]);
    }
  }
  displayBookmark(searchArray);
}

// function validateBookmark() {

//     if (regexName.test(siteName.value) == false) {
//         return 'Name Must be at least 3 chars'
//     }
//     else if(regexUrl.test(siteUrl.value) == false){
//         return 'Url must be validate'
//     }
//     return true;

// }

function reset() {
  allBookmark = [];
  localStorage.setItem("bookmark", JSON.stringify(allBookmark));
  displayBookmark(allBookmark);
}

function bookmarkCounter() {
  count.innerHTML = `${allBookmark.length}`;
}

siteName.addEventListener("input", function () {
  if (regexName.test(siteName.value)) {
    siteName.classList.remove("is-invalid");
    siteName.classList.add("is-valid");
  } else {
    siteName.classList.remove("is-valid");
    siteName.classList.add("is-invalid");
  }
});
siteUrl.addEventListener("input", function () {
  if (regexUrl.test(siteUrl.value)) {
    siteUrl.classList.remove("is-invalid");
    siteUrl.classList.add("is-valid");
  } else {
    siteUrl.classList.remove("is-valid");
    siteUrl.classList.add("is-invalid");
  }
});

function backPage() {
  window.location.href =
    "../pages/home.html";
}
back.addEventListener("click", backPage);