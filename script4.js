document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("start-button");
    const preventButton = document.getElementById("prevent-button");
    const warningScreen = document.getElementById("warning-screen");
    const textBox = document.getElementById("textBox");
    const textSpans = Array.from(document.querySelectorAll(".text-animated"));

    const lines = [
        "이곳에는 어떤 사고가 발생할 수 있을까요?",
        "윌크가 샤워를 하는 중이에요",
        "윌크가 첨벙첨벙 물을 튀기고 있어요",
        "물이 콘센트 근처로 가고 있어요",
    ];
    let lineIndex = 0;

    const warningBGM = new Audio("alert.mp3");

    // 물방울 생성 함수
    function createWaterDrops() {
        const container = document.querySelector('.container');
        const rect = container.getBoundingClientRect();

        function spawnDrop() {
            const drop = document.createElement("div");
            drop.className = "water-drop";

            const size = Math.random() * 10 + 5;
            drop.style.width = `${size}px`;
            drop.style.height = `${size}px`;

            drop.style.left = `${Math.random() * rect.width}px`;
            drop.style.top = `${Math.random() * rect.height}px`;

            container.appendChild(drop);

            drop.addEventListener("animationend", () => drop.remove());
        }

        return setInterval(spawnDrop, 100);
    }

    // 타이핑 애니메이션
    function typeLine(line, callback) {
        let charIndex = 0;
        textSpans[lineIndex].textContent = "";
        textSpans[lineIndex].style.display = "inline-block";

        const typingInterval = setInterval(() => {
            if (charIndex < line.length) {
                textSpans[lineIndex].textContent += line[charIndex];
                charIndex++;
            } else {
                clearInterval(typingInterval);
                callback();
            }
        }, 100);
    }

    function displayLines() {
        if (lineIndex < lines.length) {
            typeLine(lines[lineIndex], () => {
                setTimeout(() => {
                    textSpans[lineIndex].style.display = "none";
                    lineIndex++;
                    displayLines();
                }, 2000);
            });
        } else {
            setTimeout(() => {
                textBox.style.display = "none";
                warningScreen.style.display = "flex"; // 경고 화면 표시

                // 경고 화면 브금 재생
                warningBGM.loop = true; // 반복 재생
                warningBGM.play();
            }, 2000);
        }
    }

    // 시작 버튼 클릭 시
    startButton.addEventListener("click", function () {
        startButton.style.display = "none";
        textBox.style.display = "flex";
    
        // 배경음악 재생
        const bgm = new Audio("shower.mp3");
        bgm.loop = true; // 반복 재생
        bgm.play();
    
        const dropInterval = createWaterDrops();
        displayLines();
    
        setTimeout(() => clearInterval(dropInterval), lines.length * 3000);
    });    

    // 예방 버튼 클릭 시 퀴즈 페이지로 이동
    preventButton.addEventListener("click", function () {
        console.log("예방 버튼이 클릭되었습니다."); // 디버깅 로그
        window.location.href = "test5.html"; // 퀴즈 페이지로 이동
    });

    const dialogueAudio = [
        new Audio('T41.mp3'),
        new Audio('T42.mp3'),
        new Audio('T43.mp3'),
        new Audio('T44.mp3'),
    ];
    
    function typeLine(line, callback) {
        let charIndex = 0;
        textSpans[lineIndex].textContent = "";
        textSpans[lineIndex].style.display = "inline-block";
    
        // 대사 음성 재생
        dialogueAudio[lineIndex].play();
    
        const typingInterval = setInterval(() => {
            if (charIndex < line.length) {
                textSpans[lineIndex].textContent += line[charIndex];
                charIndex++;
            } else {
                clearInterval(typingInterval);
                callback();
            }
        }, 100);
    }
    
});
