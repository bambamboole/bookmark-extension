import arrayToTree from "../general/arrayToTree";

export default function fetchBookmarks(currentStates) {

  if (currentStates.lightmode) {
    document.getElementsByTagName("BODY")[0].classList.add('lightmode');
  } else {
    document.getElementsByTagName("BODY")[0].classList.remove('lightmode');
  }

  // if bookmarks in local storage
  if (localStorage.getItem('bookmarks') != null) {

    // elements
    let categories = [];
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    let containerElement = document.getElementById('bookmark-container');

    containerElement.innerHTML = '';

    // push all bookmark categories in categorie array
    for (let i = 0; i < bookmarks.length; i++) {
      categories.push(bookmarks[i].category);
    }

    // convert array with category paths to object tree
    categories = arrayToTree(categories, '/');

    // generate container elements out of object tree
    buildTree(categories, containerElement);

    // render bookmarks in the specific category div
    for (let i = 0; i < bookmarks.length; i++) {
      let url = bookmarks[i].url;
      let title = bookmarks[i].title;
      let id = bookmarks[i].id;
      let favicon = bookmarks[i].favicon;
      let category = String(bookmarks[i].category);
      category = category.replace(/\//g, '_');

      let currentCategoryElement = document.getElementById(category);

      if(!currentCategoryElement) {
        containerElement.innerHTML = '<div class="item" id="' + id + '">' +
          '<a href="' + url + '">' +
          '<img src="' + favicon + '" alt="favicon" class="favicon">' +
          title + '</a>' +
          '<span class="close"></span>' +
          '</div>' + containerElement.innerHTML;
      } else {
        currentCategoryElement.innerHTML = '<div class="item" id="' + id + '">' +
          '<a href="' + url + '">' +
          '<img src="'+ favicon +'" alt="favicon" class="favicon">' +
          title + '</a>' +
          '<span class="close"></span>' +
          '</div>' + currentCategoryElement.innerHTML;
      }

      if(favicon == "" || !favicon) {
        let bookmark = document.getElementById(id);
        bookmark.childNodes[0].style.paddingLeft = "24px";
        bookmark.childNodes[0].childNodes[0].style.display = "none";
      }
    }
  }


  // Build HTML tree recursively from object.
  function buildTree(obj, context, prefix) {
    for (var key in obj) {
      if(key != "") {
        let div = document.createElement('div'),
        pID = prefix ? prefix + '_' + key : key;

        div.innerHTML = "<span class='title'>" + key + "</span><div class='content'></div><span class='icon'></span>";
        let content = div.children[1];
        content.setAttribute('id', pID);
        content.classList.add(key);
        div.classList.add("category");
        buildTree(obj[key], content, pID);
        context.appendChild(div);
      }
    }
  }
}