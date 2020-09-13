let gameOver = false;
const rainbowString = "👾";
const btnPressClass = "is-pressed";
const rainbowClass = "has-rainbow";

const dialog = {
  hide: function (dialogBox) {
    dialogBox.style.display = "none";
  },
  updateContent: function () {
    const boxHeadline = document.querySelector("#play-box .box__headline");
    boxHeadline.innerHTML = "Play again?";

    const boxText = document.querySelector("#play-box .box__txt");
    boxText.innerHTML = "Virus were not at the same place.";
  },
  showPlayAgain: function (dialogBox) {
    dialog.updateContent();
    dialogBox.style.display = "block";
  } };


const getRandomIntInclusive = maxNum => {
  const min = 0;
  const max = Math.floor(maxNum);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const rainbow = {
  insert: function (el) {
    const btnCount = el.length - 1;
    const luckyBtn = getRandomIntInclusive(btnCount);

    el[luckyBtn].children[0].innerHTML = rainbowString;
    el.forEach(function (item) {
      game.addBtnClick(item);
    });
  },
  remove: function (el) {
    el.forEach(function (item) {
      const itemChild = item.children[0];
      itemChild.innerHTML = "";
      itemChild.classList.remove(rainbowClass);
      item.classList.remove(btnPressClass);
    });
  } };


const game = {
  btn: document.querySelectorAll(".grid__btn"),
  box: document.getElementById("play-box"),
  start: function () {
    rainbow.insert(game.btn);
    dialog.hide(game.box);
  },
  run: function () {
    if (gameOver) {
      rainbow.remove(game.btn);
      game.start();
    } else {
      game.start();
    }
  },
  stop: function () {
    gameOver = true;

    game.btn.forEach(function (item) {
      game.removeBtnClick(item);
    });

    setTimeout(function () {
      dialog.showPlayAgain(game.box);
    }, 5000);
  },
  play: function (e) {
    const thisItem = e.target;
    thisItem.classList.add(btnPressClass);
    game.removeBtnClick(thisItem);

    const rainbowEl = thisItem.children[0];
    if (rainbowEl.innerHTML === rainbowString) {
      rainbowEl.classList.add(rainbowClass);
      game.stop();
    }
  },
  addBtnClick: function (el) {
    el.addEventListener("click", game.play, false);
  },
  removeBtnClick: function (el) {
    el.removeEventListener("click", game.play, false);
  } };


const btnPlay = document.getElementById("play-btn");
btnPlay.addEventListener("click", game.run, false);