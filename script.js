// 반응형 높이 계산
const updateHeights = () => {
  const mainElement = document.querySelector(".main"); // .main 요소를 동적으로 선택
  const viewportHeight = window.innerHeight; // 현재 뷰포트 높이
  const totalHeight = mainElement ? mainElement.offsetHeight : 5700; // .main 높이 또는 기본값
  const sectionHeight = totalHeight / images.length; // 각 섹션 높이
  const startOffset = viewportHeight * 0.2; // 뷰포트 높이에 비례한 시작 오프셋

  return { totalHeight, sectionHeight, startOffset };
};

// 초기 높이 설정
let { totalHeight, sectionHeight, startOffset } = updateHeights();

// 페이지 로드 시 클릭 유도 메시지 표시
window.addEventListener("load", () => {
  if (clickMessage) {
    clickMessage.style.display = "block";
  }
});

// 클릭 시 배경 음악 재생 및 클릭 메시지 숨김
document.addEventListener("click", () => {
  if (backgroundMusic) {
    backgroundMusic.muted = false;
    backgroundMusic.volume = 0.5;
    backgroundMusic.play().catch((error) => {
      console.error("배경음 재생 실패:", error);
    });
  }
  if (clickMessage) {
    clickMessage.style.display = "none";
  }
});

// 스크롤 이벤트 핸들러 (이미지 및 오디오 제어)
window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;

  // 이미지 및 오디오 제어
  images.forEach((image, index) => {
    const sectionStart = startOffset + sectionHeight * index;
    const sectionEnd = sectionStart + sectionHeight;

    if (scrollPosition >= sectionStart && scrollPosition < sectionEnd) {
      // 현재 구간에 해당하는 이미지 보이기
      image.style.opacity = "1";
      image.style.zIndex = "10"; // 현재 이미지가 가장 위에 오도록 설정

      // 오디오 재생 제어
      if (!audioPlayed[index] && audios[index]) {
        audios[index].play().catch((error) => {
          console.error(`오디오 재생 실패 (audio${index + 1}):`, error);
        });
        audioPlayed[index] = true;
      }
    } else {
      // 다른 구간의 이미지 숨기기 및 오디오 정지
      image.style.opacity = "0";
      image.style.zIndex = "0"; // 다른 이미지보다 뒤에 오도록 설정
      if (audios[index]) {
        audios[index].pause();
        audios[index].currentTime = 0;
        audioPlayed[index] = false;
      }
    }
  });

  // 스크롤 버튼 표시 조건
  if (scrollPosition + window.innerHeight >= totalHeight) {
    if (scrollButton) scrollButton.style.display = "block";
  } else {
    if (scrollButton) scrollButton.style.display = "none";
  }
});

// 창 크기 변경 시 반응형 처리
window.addEventListener("resize", () => {
  // 높이를 다시 계산
  const heights = updateHeights();
  totalHeight = heights.totalHeight;
  sectionHeight = heights.sectionHeight;
  startOffset = heights.startOffset;
});

// 다음 페이지 이동 버튼 클릭 이벤트
if (scrollButton) {
  scrollButton.addEventListener("click", () => {
    window.location.href = "test2.html";
  });
}

// 음악 토글 버튼 (음소거 설정)
if (musicToggleButton) {
  musicToggleButton.addEventListener("click", () => {
    if (backgroundMusic) {
      backgroundMusic.muted = !backgroundMusic.muted;
      musicToggleButton.textContent = backgroundMusic.muted
        ? "음악 켜기"
        : "음악 끄기";
    }
  });
});
