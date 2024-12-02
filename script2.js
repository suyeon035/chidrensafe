document.addEventListener("DOMContentLoaded", function () {
  const lines = [
    "똑똑",
    "들어오세요",
    "기다리던 친구들이 왔네 허허",
    "브레드이발소에 온 걸 환영해!",
    "내가 친구들을 부른 이유가 있어",
    "브레드이발소에서 안전사고가 일어나는거야!",
    "자꾸 안전사고가 나니 손님도 못 받고!",
    "이러다 이발소가 망해버리는 건 안돼!",
    "친구들이 브레드이발소를 도와주면 좋겠어",
    "친구들이 브레드이발소의 안전요원이 되어",
    "안전 사고를 발견하고 사고를 막아주면 돼!",
    "용감한 친구들 안전요원이 되어줄거지!",
  ];

  const audioElements = [
    document.getElementById("audio1"),
    document.getElementById("audio2"),
    document.getElementById("audio3"),
    document.getElementById("audio4"),
    document.getElementById("audio5"),
    document.getElementById("audio6"),
    document.getElementById("audio7"),
    document.getElementById("audio8"),
    document.getElementById("audio9"),
    document.getElementById("audio10"),
    document.getElementById("audio11"),
    document.getElementById("audio12"),
  ];

  const spans = Array.from(document.querySelectorAll(".text-animated"));
  const secondImage = document.getElementById("second-image");
  const fifthImage = document.getElementById("fifth-image");
  const ninthImage = document.getElementById("ninth-image");
  const overlay = document.getElementById("overlay");
  const closeButton = document.getElementById("close-button");
  const startButton = document.getElementById("start-button");
  const proceedButton = document.getElementById("proceed-button");

  let lineIndex = 0;

  function typeLine(line, callback) {
    let charIndex = 0;
    spans[lineIndex].style.display = "inline-block";
    spans[lineIndex].textContent = "";
    const typingInterval = setInterval(() => {
      if (charIndex < line.length) {
        spans[lineIndex].textContent += line.charAt(charIndex);
        charIndex++;
      } else {
        clearInterval(typingInterval);
        callback();
      }
    }, 100);
  }

  function displayLines() {
    if (lineIndex < lines.length) {
      // 현재 줄의 오디오 파일 재생
      audioElements[lineIndex].play().catch((error) => {
        console.log("오디오 재생 오류:", error);
      });

      // 대사 출력
      typeLine(lines[lineIndex], () => {
        setTimeout(() => {
          spans[lineIndex].style.opacity = 0;
          setTimeout(() => {
            spans[lineIndex].style.display = "none";

            // 이미지 전환
            if (lineIndex === 1) {
              secondImage.style.display = "block";
            }
            if (lineIndex === 4) {
              secondImage.style.display = "none";
              fifthImage.style.display = "block";
            }
            if (lineIndex === 7) {
              fifthImage.style.display = "none";
              ninthImage.style.display = "block";
            }

            lineIndex++;
            displayLines();
          }, 500);
        }, 2000);
      });
    } else {
      showOverlay();
    }
  }
  function showOverlay() {
    overlay.style.display = "flex";
    startButton.style.display = "none"; // 대사가 끝난 후 시작하기 버튼 숨기기
    proceedButton.style.display = "block"; // 다음 페이지 버튼 보이기
  }

  closeButton.addEventListener("click", () => {
    overlay.style.display = "none"; // 오버레이 숨기기
    // 아래 코드들은 삭제 또는 주석 처리합니다. (필요하지 않음)
    // startButton.style.display = "none"; // 시작하기 버튼 숨기기
    // proceedButton.style.display = "none"; // 다음 페이지 버튼 숨기기
  });

  startButton.addEventListener("click", () => {
    startButton.style.display = "none"; // 첫 번째 시작하기 버튼 숨기기
    displayLines(); // 대사 시작
  });

  proceedButton.addEventListener("click", () => {
    window.location.href = "test3.html"; // 두 번째 버튼 클릭 시 이동할 페이지
  });
});
