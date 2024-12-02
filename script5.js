document.addEventListener("DOMContentLoaded", function () {
    const quizCards = document.querySelectorAll(".quiz-card");
    const quizResult = document.getElementById("quiz-result");
    const backgroundOverlay = document.querySelector(".background-overlay");
    const correctSound = document.getElementById("correct-sound");
    const wrongSound = document.getElementById("wrong-sound");

    quizCards.forEach(card => {
        card.addEventListener("click", function () {
            const selectedAnswer = this.getAttribute("data-answer");

            // 기존 결과 초기화
            quizResult.innerHTML = ""; // 기존 텍스트와 버튼 제거

            if (selectedAnswer === "2") {
                wrongSound.pause(); // 오답 음원이 재생 중일 수 있으므로 멈추기
                wrongSound.currentTime = 0; // 재생 위치 초기화
                correctSound.currentTime = 0; // 정답 음원 재생 위치 초기화
                correctSound.play();
                // 정답 메시지 추가
                const resultMessage = document.createElement("p");
                resultMessage.textContent = "정답입니다! 안전사고를 예방할 수 있어요. 😊";
                resultMessage.style.color = "green";
                quizResult.appendChild(resultMessage);

                // 배경색 변경
                backgroundOverlay.style.backgroundColor = "rgba(0, 255, 0, 0.6)"; // 초록색 투명 배경

                // "다음" 버튼 생성
                const nextButton = document.createElement("button");
                nextButton.textContent = "다음";
                nextButton.classList.add("next-button"); // CSS 클래스 추가

                // 버튼 클릭 시 페이지 이동
                nextButton.addEventListener("click", function () {
                    window.location.href = "test6.html"; // 연결할 페이지 경로 설정
                });

                // 결과 영역에 버튼 추가
                quizResult.appendChild(nextButton);
            } else {
                correctSound.pause(); // 정답 음원이 재생 중일 수 있으므로 멈추기
                correctSound.currentTime = 0; // 재생 위치 초기화
                wrongSound.currentTime = 0; // 오답 음원 재생 위치 초기화
                wrongSound.play();
                // 오답 메시지 추가
                quizResult.textContent = "오답입니다. 다시 생각해보세요! 😢";
                quizResult.style.color = "red";

                // 배경색 변경
                backgroundOverlay.style.backgroundColor = "rgba(255, 0, 0, 0.6)"; // 빨간색 투명 배경
            }
        });
    });
});
