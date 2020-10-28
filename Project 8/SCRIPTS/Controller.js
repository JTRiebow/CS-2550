function onPageLoad() {
    $("#createBtn").click(onCreateBtnClicked);
    $('#cancelBtn').click(onCancelBtnClicked);
    $('#newBtn').click(onNewBtnClicked);

    var items = modelGetAllFilms();
    for (var i = 0; i < items.length; i++)
        addTableItem(items[i]);

        clearInputForm();
}

/*************************************************************************/
function onCreateBtnClicked() {
    if (!validateControls())
        return;

    var form = document.forms["editForm"];
    var newFilm = modelCreateFilm(
        form.filmTitle.value,
        parseInt(form.filmCost.value),
        parseInt(form.filmProfit.value),
        form.filmDate.value,
        form.filmGenre.checked,
        form.filmAward.value);

        addTableItem(newFilm);

        clearInputForm();
}

/************************************************************************** */
function onNewBtnClicked() {
    document.getElementById('formTitle').innerHTML = "Create New Film";
    document.getElementById('filmEditArea').style.display='inline';
    document.getElementById('filmListArea').style.display='none';
    document.getElementById("createBtn").style.display = "inline";
    document.getElementById("updateBtn").style.display = "none";
}
/************************************************************************** */
function onCancelBtnClicked() {
    clearInputForm();
}
/************************************************************************** */
function onEditBtnClicked(id) {
    var film = modelGetFilm(id);
    if (!film) {
        alert("Unable to find film with ID #" + id);
    }

    $("#formTitle").text("Edit Film");
    var form = document.forms["editForm"];
    form.filmTitle.value = film.filmTitle;
    form.filmCost.value = film.filmCost;
    form.filmProfit.value = film.filmProfit;
    for (var date in form.filmDate.options) {
        var option = form.filmDate.options[date];
        if (option.value === film.filmDate) {
            option.selected = true;
        }
    }
    if (film.filmGenre === "action") {
        form.filmGenre[0].checked = true;
    }
    if (film.filmGenre === "sci-fi") {
        form.filmGenre[1].checked = true;
    }
    if (film.filmGenre === "horror") {
        form.filmGenre[2].checked = true;
    }
    if (film.filmGenre === "drama") {
        form.filmGenre[3].checked = true;
    }
    if (film.filmGenre === "doc") {
        form.filmGenre[4].checked = true;
    }
    if (film.filmGenre === "animated") {
        form.filmGenre[5].checked = true;
    }

    film.filmAward.checked = film.filmAward;

    $("#filmEditArea").css("display", "inline");
    $("#filmListArea").css("display", "none");
    $("#createBtn").css("display", "none");

    $("#updateBtn")
    .css("display", "inline")
    .off("click")
    .click(function () { onUpdateBtnClicked(film.id) });
    
}

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
function validateControls() {
    var form = document.forms["editForm"];
    var validated = true;

    if (form.filmTitle.value === "") {
        $("#filmTitleError").text("Film Title Not Given.");
        validated = false;
    }
    else {
        $("#filmTitleError").text("");
    }
    
    if (form.filmCost.value === "") {
        $("#filmCostError").text("Film Cost Not Given.");
        validated = false;
    }
    else if (isNaN(parseInt(form.filmCost.value))){
        $("#filmCostError").text("Must Be A Number.");
        validated = false;
    }
    else if (parseInt(form.filmCost.value) < 0) {
        $("#filmCostError").text("Must Be A Positive Number.");
    }
    else {
        $("#filmCostError").text("");
    }

    if (form.filmProfit.value === "") {
        $("#filmProfitError").text("Film Profit Not Given");
        validated = false;
    }
    else if (isNaN(parseInt(form.filmProfit.value))){
        $("#filmProfitError").text("Must Be A Number.");
        validated = false;
    }
    else if (parseInt(form.filmProfit.value) < 0) {
        $("#filmProfitError").text("Must Be A Positive Number.");
    }
    else {
        $("#filmProfitError").text("");
    }

    if (form.filmDate.selectedIndex == -1) {
        $("#filmDateError").text("Date Not Given.");
        validated = false;
    }
    else
        $("#filmDateError").text("");

    if (form.actionRadio.checked == false && form.scifiRadio.checked == false && form.horrorRadio.checked == false && form.dramaRadio.checked == false && form.docRadio.checked == false && form.animatedRadio.checked == false) {
        $("#filmRadioError").text("Genre Not Given.");
        validated = false;
    }
    else
        $("#filmRadioError").text("");

    return validated;
}
/*******************************************************************************/
function addTableItem(film) {
    var table = $("#filmTable").get(0);
    var row = table.insertRow(table.rows.length);
    row.id = 'row' + film.id;

    var cell = row.insertCell(0);
    cell.innerHTML = film.filmTitle;

    cell = row.insertCell(1);
    cell.innerHTML = film.filmCost;

    cell = row.insertCell(2);
    cell.innerHTML = film.filmProfit;

    
    cell = row.insertCell(3);
    cell.innerHTML = "<button type='button' id='editBtn" + film.id + "' class='btn-sm btn-info' data-toggle='modal' data-target='#myModal'>Edit <span class='glyphicon glyphicon-edit'></span></button>";
    
    cell = row.insertCell(4);
    cell.innerHTML = "<button type='button' id='deleteBtn" + film.id + "' class='btn-sm btn-danger'>Delete <span class='glyphicon glyphicon-trash'></span></button>";

    $('#editBtn' + film.id).click(function () { onEditBtnClicked(film.id) });

    $('#deleteBtn' + film.id).click(function () { onDeleteBtnClicked(film.id) });

}
/*********************************************************************************/
function clearInputForm() {
    $('#filmEditArea').css("display", 'none');
    $('#filmListArea').css("display", 'block');

    var form = document.forms["editForm"];

    form.filmTitle.value = "";
    $("#filmTitleError").text("");

    form.filmCost.value = "";
    $("#filmCostError").text("");

    form.filmProfit.value = "";
    $("#filmProfitError").text("");

    form.filmDate.selectedIndex = -1;
    $("#filmDateError").text("");

    form.actionRadio.checked = false;
    form.scifiRadio.checked = false;
    form.horrorRadio.checked = false;
    form.dramaRadio.checked = false;
    form.docRadio.checked = false;
    form.animatedRadio.checked = false;
    $("#filmRadioError").text("");

    form.filmAward.checked = false;
    $("#filmAwardError").text("");

    $("#createBtn").css("display", "inline");
    $("#saveBtn").css("display", "none");
}
/************************************************************************** */
function onUpdateBtnClicked(id) {
    if (!validateControls()) {
        return;
    }

    var form = document.forms["editForm"];
    var film = modelUpdateFilm(
        id,
        form.filmTitle.value,
        parseInt(form.filmCost.value),
        parseInt(form.filmProfit.value),
        form.filmDate.value,
        form.filmGenre.value,
        form.filmAward.checked);

        if (!film) {
            alert("Unable to update film id# =" + id);
            return;
        }

        var tr = $("#row" + id).children();
        tr.eq(0).text(film.filmTitle);
        tr.eq(1).text(film.filmCost);
        tr.eq(2).text(film.filmProfit);

        clearInputForm();
}
/************************************************************************************ */
function onDeleteBtnClicked(id) {
    var film = modelGetFilm(id);
    if (!film) {
        alert("Unable to find film id# =" + id);
        return;
    }

    if (!confirm("Are you sure you want to delete " + film.filmTitle + "?")) {
        return;
    }

    modelDeleteFilm(id);

    $("#row" + id).remove();

}