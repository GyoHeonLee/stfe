let sorts = {
  recent: (a, b) => b.idx - a.idx,
  like: (a, b) => b.likes - a.likes,
};
let sort = sorts.recent;

let filters = {
  all: (it) => true,
  mine: (it) => it.user_id === my_info.id,
  like: (it) => my_info.like.indexOf(it.idx) > -1,
  follow: (it) => my_info.follow.indexOf(it.user_id) > -1,
};
let filter = filters.all;

function setSort(_sort) {
  document
    .querySelectorAll("#sorts li")
    .forEach((sortLi) => sortLi.classList.remove("on"));
  document.querySelector("#sorts li." + _sort).classList.add("on");

  sort = sorts[_sort];
  showPhotos();
}

function setFilter(_filter) {
  document
    .querySelectorAll("#filters li")
    .forEach((filterLi) => filterLi.classList.remove("on"));
  document.querySelector("#filters li." + _filter).classList.add("on");

  filter = filters[_filter];
  showPhotos();
}

function setMenu(_menu) {
  let menus = document.querySelectorAll("nav li");
  menus.forEach((menu) => menu.classList.remove("on"));
  document.querySelector("nav li." + _menu).classList.add("on");

  document.querySelector("main").className = _menu;
}

function setDescLength() {
  document.querySelector("span.descLength").innerHTML =
    document.querySelector("input.description").value.length + "/20";
}

function showMyInfo() {
  document.querySelector("#myInfoId").innerHTML = my_info.id;
  document.querySelector("#myInfoUserName").innerHTML = my_info.user_name;
  document.querySelector("#ip-intro").value = my_info.introduction;
  document.querySelector("#sp-intro").innerHTML = my_info.introduction;
  document.querySelector(
    "#myinfo input[type=radio][value=" + my_info.as + "]"
  ).checked = true;
  document
    .querySelectorAll("#myinfo input[type=checkbox]")
    .forEach((checkbox) => (checkbox.checked = false));

  my_info.interest.forEach(
    (interest) =>
      (document.querySelector(
        "#myinfo input[type=checkbox][value=" + interest + "]"
      ).checked = true)
  );
}

function setEditMyInfo(on) {
  document.querySelector("#myinfo > div").className = on ? "edit" : "non-edit";

  document
    .querySelectorAll("#myinfo input")
    .forEach((input) => (input.disabled = !on));
}

function updateMyInfo() {
  my_info.introduction = document.querySelector("#ip-intro").value;
  my_info.as = document.querySelector(
    "#myinfo input[type=radio]:checked"
  ).value;
  var interests = [];
  document
    .querySelectorAll("#myinfo input[type=checkbox]:checked")
    .forEach((checked) => interests.push(checked.value));
  my_info.interest = interests;
  setEditMyInfo(false);
  showMyInfo();
}

function showPhotos() {
  var existingNodes = document.querySelectorAll("article:not(.hidden)");
  existingNodes.forEach(function (existingNode) {
    existingNode.remove();
  });

  var gallery = document.querySelector("#gallery");

  var filtered = photos.filter(filter);
  filtered.sort(sort);

  filtered.forEach(function (photo) {
    var photoNode = document.querySelector("article.hidden").cloneNode(true);
    photoNode.classList.remove("hidden");

    photoNode.querySelector(".author").innerHTML = photo.user_name;
    photoNode.querySelector(".desc").innerHTML = photo.description;
    photoNode.querySelector(".like").innerHTML = photo.likes;

    if (my_info.like.indexOf(photo.idx) > -1) {
      photoNode.querySelector(".like").classList.add("on");
    }

    photoNode.querySelector(".photo").style.backgroundImage =
      "url('./img/photo/" + photo.file_name + "')";

    photoNode.querySelector(".like").addEventListener("click", function () {
      toggleLike(photo.idx);
    });

    gallery.append(photoNode);
  });
}

function toggleLike(idx) {
  if (my_info.like.indexOf(idx) === -1) {
    my_info.like.push(idx);
    photos.forEach(function (photo) {
      if (photo.idx === idx) photo.likes++;
    });
  } else {
    my_info.like = my_info.like.filter((num) => num !== idx);
    photos.forEach(function (photo) {
      if (photo.idx === idx) photo.likes--;
    });
  }
  showPhotos();
}

function init() {
  showMyInfo();
  showPhotos();
}
