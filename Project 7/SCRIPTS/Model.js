var filmList = [];
var filmNum = 1;

function Film(filmTitle, filmCost, filmProfit, filmDate, filmGenre, filmAward) {
    this.id = filmNum++;
    this.filmTitle = filmTitle;
    this.filmCost = filmCost;
    this.filmProfit = filmProfit;
    this.filmDate = filmDate;
    this.filmGenre = filmGenre;
    this.filmAward = filmAward;

    this.sortableName = function () {
        return this.filmTitle;
    }
}

function modelCreateFilm(filmTitle, filmCost, filmProfit, filmDate, filmGenre, filmAward) {
    var newFilm = new Film(filmTitle, filmCost, filmProfit, filmDate, filmGenre, filmAward);
    filmList.push(newFilm);
    return newFilm;
}

function modelGetAllFilms() {
    return filmList;
}

function modelGetFilm(id) {
    for (x in filmList) {
        if (filmList[x].id === id) {
            return filmList[x];
        }
    }
    return undefined;
}

function modelUpdateFilm(id, filmTitle, filmCost, filmProfit, filmDate, filmGenre, filmAward){
    var film = modelGetFilm(id);
    if (!film){
        return undefined;
    }
    film.filmTitle = filmTitle;
    film.filmCost = filmCost;
    film.filmProfit = filmProfit;
    film.filmDate = filmDate;
    film.filmGenre = filmGenre;
    film.filmAward = filmAward;

    return film;
}

function modelDeleteFilm(id) {
    for (var x in filmList){
        if (filmList[x].id === id) {
            filmList.splice(x, 1);
            break;
        }
    }
}