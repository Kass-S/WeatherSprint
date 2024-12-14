function saveStorage(city) {
  let cityArr = getFromStorage();

  if (!cityArr.includes(city)) {
    cityArr.push(city);
  }

  localStorage.setItem("Cities", JSON.stringify(cityArr));
}

function getFromStorage() {
  let StorageData = localStorage.getItem("Cities");

  if (StorageData == null) {
    return [];
  }

  return JSON.parse(StorageData);
}

function saveFav(city) {
  let favArr = getFav();

  if (!favArr.includes(city)) {
    favArr.push(city);
  }

  localStorage.setItem("Favorites", JSON.stringify(favArr));
}

function getFav() {
  let localStorageData = localStorage.getItem("Favorites");

  if (localStorageData == null) {
    return [];
  }

  return JSON.parse(localStorageData);
}

function removeFromFav(fav){
    let localStorageData = getFav();

    let nameIndex = localStorageData.indexOf(fav);

    localStorageData.splice(nameIndex, 1);

    localStorage.setItem('Favorites', JSON.stringify(localStorageData));

}

export { saveStorage, getFromStorage, saveFav, getFav, removeFromFav};
