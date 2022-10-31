"use strict";

// Elementleri Seçmek
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);
const score0El = document.querySelector(`#score--0`);
const score1El = document.querySelector(`#score--1`);
const güncel0El = document.getElementById(`current--0`);
const güncel1El = document.getElementById(`current--1`);
const diceEl = document.querySelector(`.dice`);
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);

// Başlangıç Koşulları
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add(`hidden`); //zarı sildik, zar olan yere hidden ekledik

// const scores = [0, 0];
// let currentScore = 0;
// let activePlayer = 0;
// let playing = true;
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  güncel0El.textContent = 0;
  güncel1El.textContent = 0;

  player0El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--winner`);
  player0El.classList.add(`player--active`);
  player1El.classList.remove(`player--active`);
};
init();
const switchPlayer = function () {
  //eğer doğruysa diğer oyuncuya geç
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle(`player--active`); // toggle değiştir demek ,varsa yok eder ,yoksa var eder(aktifse deaktif eder ,deaktifse aktif etmeye yarar)
  player1El.classList.toggle(`player--active`); // toggle değiştir demek
};

//Zar atma koşulları
btnRoll.addEventListener(`click`, function () {
  if (playing) {
    //1.rastgele zar oluştur
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2. zarları göster
    diceEl.classList.remove(`hidden`);
    diceEl.src = `dice-${dice}.png`; //resi değiştirmek için src sini değiştiriyoruz
    //3. zzarda 1 kontrol et,eğer doğrıuysa diğer oyuncuya geç
    if (dice !== 1) {
      //zarı mecut score a ekle
      currentScore += dice; // += ilk ögenin üzerine eklemyip toplandığına eşit olmayı tanımlar
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // güncel0El.textContent = currentScore; //sonra değişecek
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener(`click`, function () {
  if (playing)
    //1.Aktif oyuncunun puanına toplam puanı eklemek
    scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  //2.Puanın en az 100 olduğunun kontrolü
  if (scores[activePlayer] >= 20) {
    playing = false;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add(`player--winner`);
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove(`player--active`);
  } else {
    switchPlayer();
  }
  //Oyunu bitir
  //Diğer oyuncuya geç
  //   switchPlayer();
});
btnNew.addEventListener(`click`, init);
