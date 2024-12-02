const updateHeights = () => {
  const mainElement = document.querySelector(".main"); // .main 요소
  const viewportHeight = window.innerHeight; // 뷰포트 높이
  const totalHeight = mainElement ? mainElement.offsetHeight : 5700; // .main 높이
  const sectionHeight = totalHeight / images.length; // 섹션 높이
  const startOffset = viewportHeight * 0.2; // 시작 오프셋 (뷰포트 높이의 20%)

  return { totalHeight, sectionHeight, startOffset };
};

// 초기 높이 설정
let { totalHeight, sectionHeight, startOffset } = updateHeights();

// 스크롤 이벤트 핸들러
window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;

  images.forEach((image, index) => {
    const sectionStart = startOffset + sectionHeight * index;
    const sectionEnd = sectionStart + sectionHeight;

    // 현재 구간에 해당하는 이미지 보이기
    if (scrollPosition >= sectionStart && scrollPosition < sectionEnd) {
      image.style.opacity = "1";
      image.style.zIndex = "10"; // 현재 이미지 위로 보이기
    } else {
      // 다른 구간의 이미지는 숨기기
      image.style.opacity = "0";
      image.style.zIndex = "0"; // 다른 이미지는 뒤로 보내기
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
  const heights = updateHeights();
  totalHeight = heights.totalHeight;
  sectionHeight = heights.sectionHeight;
  startOffset = heights.startOffset;
});
