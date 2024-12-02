document.addEventListener('DOMContentLoaded', () => {
  const questScreen = document.getElementById('questScreen');
  const collectionScreen = document.getElementById('collectionScreen');
  const collectionModal = document.getElementById('collectionModal');
  const modalConfirmButton = document.getElementById('modalConfirmButton');
  
  const completeButton = document.getElementById('completeButton');
  const rewardCard = document.getElementById('rewardCard');
  const flipCard = document.querySelector('.flip-card');
  const preparingMessage = document.querySelector('.preparing-message');
  const congratsMessage = document.getElementById('congratsMessage');
  const collectButton = document.getElementById('collectButton');
  
  const slots = [
      document.getElementById('slot1'),
      document.getElementById('slot2'),
      document.getElementById('slot3')
  ];

  const rewardSound = new Audio('win.mp3'); // 효과음 파일 경로
  let collectedCardCount = 0;

  // "퀘스트 완료" 버튼 클릭 이벤트
  completeButton.addEventListener('click', () => {
      rewardSound.play(); // 버튼 클릭 시 소리 재생
      completeButton.style.display = 'none';
      rewardCard.style.display = 'flex';

      setTimeout(() => {
          flipCard.classList.add('flipped');
          preparingMessage.style.display = 'none';
      }, 1000);

      setTimeout(() => {
          congratsMessage.style.display = 'block';
      }, 2000);

      setTimeout(() => {
          collectButton.style.display = 'block';
      }, 2500);

  });
  collectButton.addEventListener('click', () => {
    questScreen.style.display = 'none';
    collectionModal.style.display = 'flex';
});

  // 모달 확인 버튼 클릭 이벤트
  modalConfirmButton.addEventListener('click', () => {
      // 모달 숨기기
      collectionModal.style.display = 'none';
      
      // 컬렉션 화면 표시
      collectionScreen.style.display = 'block';

      // 빈 슬롯 중 첫 번째 슬롯에 카드 추가
      const availableSlot = slots.find(slot => !slot.querySelector('img'));
      if (availableSlot) {
          const cardImage = document.createElement('img');
          cardImage.src = 'C1.png';
          cardImage.alt = '수집된 카드';
          
          // 오버레이 제거
          const overlay = availableSlot.querySelector('.overlay');
          overlay.remove();
          
          availableSlot.appendChild(cardImage);
          
          collectedCardCount++;
      }

      // 모든 카드가 모이면 추가 로직 구현 가능
      if (collectedCardCount === 3) {
          // 예: 최종 안전요원 화면으로 전환
          alert('모든 카드를 모았습니다! 안전요원이 되셨어요!');
      }
  });

  document.addEventListener('DOMContentLoaded', () => {
    const restartButton = document.getElementById('restartButton');
  
    // "다시 시작하기" 버튼 클릭 이벤트
    restartButton.addEventListener('click', () => {
        window.location.href = 'test8.html'; // 'test8.html' 페이지로 이동
    });
  });
  
});