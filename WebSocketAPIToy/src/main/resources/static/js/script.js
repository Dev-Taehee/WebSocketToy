// WebSocket 서버 주소
const websocketUrl = 'ws://localhost:8080/ws/myHandler';

// WebSocket 연결
const socket = new WebSocket(websocketUrl);

// 연결이 열렸을 때 실행되는 이벤트 핸들러
socket.addEventListener('open', (event) => {
    console.log('WebSocket 연결이 열렸습니다.');
});

// 메시지를 받았을 때 실행되는 이벤트 핸들러
socket.addEventListener('message', (event) => {
    // 서버로부터 받은 메시지를 화면에 표시
    const receivedMessage = JSON.parse(event.data);
    displayMessage(receivedMessage.sender, receivedMessage.content, false);
});

// 연결이 닫혔을 때 실행되는 이벤트 핸들러
socket.addEventListener('close', (event) => {
    console.log('WebSocket 연결이 닫혔습니다.');
});

function sendMessage() {
    var messageInput = document.getElementById('message-input');
    var message = messageInput.value.trim();
    if (message === '') return;

    var username = localStorage.getItem('username');

    const chatMessage = {
        sender: username,
        content: message
    }

    // 메시지를 WebSocket을 통해 서버로 전송
    socket.send(JSON.stringify(chatMessage));

    // // 입력한 메시지를 화면에 표시 (옵션)
    // displayMessage(username, message, true);

    // 입력 칸 비우기
    messageInput.value = '';
}

// 화면에 메시지를 표시하는 함수 (옵션)
function displayMessage(sender, message, isSender) {
    var chatContainer = document.getElementById('chat-container');
    var messageElement = document.createElement('div');
    messageElement.textContent = sender + ': ' + message;
    messageElement.classList.add('message');

    var username = localStorage.getItem('username');

    if (username === sender) {
        messageElement.classList.add('sender-message');
    } else {
        messageElement.classList.add('user-message');
    }

    chatContainer.appendChild(messageElement);

    // 최하단으로 스크롤
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

    // 로컬 스토리지에서 유저 이름을 불러오고 입력 필드에 채우는 함수
function loadUsername() {
    var savedUsername = localStorage.getItem('username');
    if (savedUsername) {
        document.getElementById('username').value = savedUsername;
    }
}

    // 유저 이름을 로컬 스토리지에 저장하는 함수
function saveUsername() {
    var usernameInput = document.getElementById('username');
    var username = usernameInput.value.trim();
    if (username === '') return;

    localStorage.setItem('username', username);
    alert('유저 이름이 저장되었습니다: ' + username);
}

// 페이지 로드 시 유저 이름을 불러옴
loadUsername();

// 아래에 메시지 전송 함수 및 기타 함수들을 추가하면 됩니다.
