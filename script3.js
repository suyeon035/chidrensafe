document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.querySelector(".overlay");
  const hearts = document.querySelectorAll(".heart");
  const timerDisplay = document.querySelector(".timer");
  const progressBar = document.querySelector(".progress");
  const hiddenObject = document.querySelector(".hidden-object");
  const messageBox = document.getElementById("message-box");
  const messageText = document.getElementById("message-text");
  const restartButton = document.getElementById("restart-button");
  const startButton = document.getElementById("start-button"); // 게임 시작 버튼
  const ruleBox = document.getElementById("rule-box"); // 룰 박스
  const safetyButton = document.getElementById("safety-button"); // 안전사고 예방하기 버튼
  const hintButton = document.getElementById("hint-button"); // 힌트 버튼
  const hintBox = document.getElementById("hint-box"); // 힌트 박스
  const closeHintButton = document.getElementById("close-hint-button"); // 힌트 닫기 버튼

  let timeLeft; // 남은 시간
  let lives; // 하트 개수
  let timer; // 타이머 변수
  let gameStarted = false; // 게임이 시작되었는지 여부를 추적하는 변수
  let hintVisible = false; // 힌트 박스가 보이는지 여부를 추적하는 변수

  // 게임 시작 함수
  function startGame() {
    timeLeft = 10; // 제한시간 (초)
    lives = hearts.length; // 하트 개수
    updateTimerDisplay();
    resetHearts();

    // "다시 시작" 버튼 숨기기
    restartButton.style.display = "none";
    safetyButton.style.display = "none"; // 게임 시작 시 안전사고 예방 버튼 숨기기

    // 게임 시작 플래그 설정
    gameStarted = true;

    // 메세지 박스를 숨기기
    messageBox.style.display = "none"; // 게임 시작 시 메세지 박스 숨기기

    // 타이머 시작
    timer = setInterval(() => {
      timeLeft--;
      updateTimerDisplay();
      progressBar.style.width = `${(timeLeft / 10) * 100}%`;

      if (timeLeft <= 0) {
        clearInterval(timer);
        gameOver("시간이 초과되었습니다!");
      }
    }, 1000);
  }

  // 타이머 디스플레이 업데이트
  function updateTimerDisplay() {
    timerDisplay.textContent = `남은 시간: ${timeLeft}초`;
  }

  // 하트 초기화
  function resetHearts() {
    hearts.forEach((heart) => {
      heart.style.visibility = "visible"; // 하트를 보이도록 설정
    });
  }

  // 마우스 이동에 따라 손전등 효과 변경
  document.addEventListener("mousemove", (e) => {
    const x = e.clientX;
    const y = e.clientY;

    overlay.style.maskImage = `radial-gradient(circle 150px at ${x}px ${y}px, transparent 50%, black 51%)`;
  });

  // 하트를 클릭할 때 (힌트 박스가 표시 중일 때는 하트가 사라지지 않도록 처리)
  hearts.forEach((heart) => {
    heart.addEventListener("click", () => {
      // 힌트가 표시된 상태에서는 하트를 클릭해도 하트가 사라지지 않도록
      if (!hintVisible && gameStarted && !hiddenObject.clicked) {
        heart.style.visibility = "hidden"; // 하트 사라지기
        lives--; // 남은 하트 개수 감소

        if (lives === 0) {
          gameOver("하트를 모두 잃었습니다!");
        }
      }
    });
  });

  // 숨은 그림 클릭 이벤트
  hiddenObject.addEventListener("click", () => {
    hiddenObject.clicked = true; // 숨은 그림을 클릭한 상태로 설정
    gameSuccess("미션 성공! 숨은 그림을 찾았습니다.");
  });

  // 클릭하지 못했을 때 하트 하나 제거
  document.addEventListener("click", (e) => {
    // 숨은 그림을 찾지 않았을 때만
    if (!hiddenObject.clicked && gameStarted) {
      const rect = overlay.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // 하트가 아닌 곳을 클릭한 경우
      let clickedOutsideHeart = true; // 클릭한 곳이 하트 외부인지 확인하는 변수
      hearts.forEach((heart) => {
        const heartRect = heart.getBoundingClientRect();
        if (
          x >= heartRect.left && x <= heartRect.right &&
          y >= heartRect.top && y <= heartRect.bottom
        ) {
          clickedOutsideHeart = false; // 하트 영역을 클릭한 경우
        }
      });

      // 하트가 아닌 곳을 클릭하면 하트 하나 제거
      if (clickedOutsideHeart && lives > 0) {
        loseLife();
      }
    }
  });

  // 실패 시 하트 하나 제거
  function loseLife() {
    if (lives > 0) {
      hearts[lives - 1].style.visibility = "hidden";
      lives--;

      if (lives === 0) {
        gameOver("하트를 모두 잃었습니다!");
      }
    }
  }

  // 게임 종료 시 호출
  function gameOver(message) {
    clearInterval(timer); // 타이머 멈추기
    const backgroundMusic = document.getElementById("background-music");
  backgroundMusic.pause();
  
  // 게임 실패 음원 재생
  const gameOverSound = document.getElementById("game-over-sound");
  gameOverSound.currentTime = 0; // 음원 처음부터 재생
  gameOverSound.play();

    showMessage(message);
    restartButton.style.display = "block"; // 게임 종료 후 "다시 시작" 버튼 보이기
    safetyButton.style.display = "none"; // 게임 종료 시 안전사고 예방 버튼 숨기기
  }

  // 성공 메시지 시 호출
  function gameSuccess(message) {
    clearInterval(timer); // 숨은 그림을 찾았을 때 타이머 멈추기
    const backgroundMusic = document.getElementById("background-music");
  backgroundMusic.pause();

  // 게임 성공 음원 재생
  const gameSuccessSound = document.getElementById("game-success-sound");
  gameSuccessSound.currentTime = 0; // 음원 처음부터 재생
  gameSuccessSound.play();

    showMessage(message);
    safetyButton.style.display = "block"; // 미션 성공 시 안전사고 예방 버튼 표시
  }

  // 메시지 박스 표시
  function showMessage(message) {
    messageText.textContent = message;
    messageBox.style.display = "block"; // 박스 보이게 함
  }

  // 다시 시작 버튼 클릭 이벤트
  restartButton.addEventListener("click", () => {
    location.reload(); // 페이지 새로 고침
  });

  // 게임 시작 버튼 클릭 이벤트
  startButton.addEventListener("click", () => {
    ruleBox.style.display = "none"; // 룰 박스 숨기기
    startGame(); // 게임 시작
  });

  // 안전사고 예방하기 버튼 클릭 시 다른 페이지로 이동
  safetyButton.addEventListener("click", () => {
    window.location.href = "test4.html"; // 페이지 URL을 원하는 주소로 바꿔주세요
  });

  // 힌트 버튼 클릭 시 힌트 박스 보이기
  hintButton.addEventListener("click", () => {
    hintBox.style.display = "block"; // 힌트 박스 보이기
    hintVisible = true; // 힌트가 표시된 상태로 설정
  });

  // 힌트 닫기 버튼 클릭 시 힌트 박스 닫기
  closeHintButton.addEventListener("click", () => {
    hintBox.style.display = "none"; // 힌트 박스 숨기기
    hintVisible = false; // 힌트가 숨겨진 상태로 설정
  });

  // 배경음악 요소와 버튼 가져오기
const music = document.getElementById('background-music');
const musicToggleButton = document.getElementById('music-toggle-button');

// 음악 상태 관리
let isMusicPlaying = false;

// 음악 제어 버튼 클릭 이벤트
musicToggleButton.addEventListener('click', () => {
  if (isMusicPlaying) {
    music.pause();
    musicToggleButton.textContent = '음악 켜기';
  } else {
    music.play();
    musicToggleButton.textContent = '음악 끄기';
  }
  isMusicPlaying = !isMusicPlaying;
});

});

