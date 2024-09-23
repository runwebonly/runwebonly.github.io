const stars = document.querySelectorAll('.star');
const message = document.getElementById('thank-you-message');
const submitButton = document.getElementById('submit-button');
const nameInput = document.getElementById('name');
const responseMessage = document.getElementById('response-message');

let isLocked = false;  // Để kiểm tra người dùng đã nhấn sao hay chưa
let isRated = false;   // Cờ để biết người dùng đã đánh giá sao hay chưa

stars.forEach(star => {
    star.addEventListener('mouseover', handleMouseOver);
    star.addEventListener('mouseout', handleMouseOut);
    star.addEventListener('click', handleClick);
});

function handleMouseOver(e) {
    if (isLocked) return;  // Ngừng khi đã khoá
    const value = e.target.getAttribute('data-value');
    highlightStars(value);
}

function handleMouseOut() {
    if (isLocked) return;
    resetStars();
}

function handleClick() {
    highlightStars(5);  // Mặc định đánh giá 5 sao
    message.classList.remove('hidden');  // Hiện thông báo
    isLocked = true;
    isRated = true;  // Đánh dấu người dùng đã đánh giá
}

function highlightStars(value) {
    stars.forEach(star => {
        if (star.getAttribute('data-value') <= value) {
            star.classList.add('hovered');
        } else {
            star.classList.remove('hovered');
        }
    });
}

function resetStars() {
    stars.forEach(star => {
        star.classList.remove('hovered');
    });
}

// Chức năng tự động đánh giá 5 sao nếu người dùng chưa nhấn sao
submitButton.addEventListener('click', () => {
    const userName = nameInput.value;
    if (!isRated) {
        // Nếu người dùng chưa đánh giá
        handleClick();  // Gọi hàm đánh giá 5 sao tự động
        message.innerHTML = "Hệ thống đã tự đánh giá 5 sao giúp bạn 🥳";
    }
    
    if (userName) {
        // Gửi tên lên server
        fetch('/submit-name', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `name=${encodeURIComponent(userName)}`,
        })
        .then(response => response.text())
        .then(data => {
            responseMessage.textContent = data;
        })
        .catch(error => {
            responseMessage.textContent = 'Có lỗi khi lưu tên của bạn.';
            console.error('Error:', error);
        });
    } else {
        responseMessage.textContent = 'Vui lòng nhập tên trước khi gửi.';
    }
});
