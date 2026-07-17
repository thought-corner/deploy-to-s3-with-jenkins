// 서버(Thymeleaf) 대신 브라우저가 렌더링하는 부분들

// 1) 학습 내용 목록 - 예전엔 서버가 th:each 로 그렸지만 이제 JS가 그림
const features = [
	'Jenkins CI/CD 파이프라인 학습',
	'AWS S3 정적 웹사이트 배포(CD)',
	'정적 파일 = 서버 없이 브라우저에서 렌더링',
	'aws s3 sync 로 자동 배포',
];

const list = document.getElementById('features');
for (const feature of features) {
	const li = document.createElement('li');
	li.textContent = feature;
	list.appendChild(li);
}

// 2) 이름 인사 - 예전엔 ?name= 쿼리로 서버가 처리했지만 이제 입력 즉시 JS가 반영
const nameInput = document.getElementById('nameInput');
const nameSpan = document.getElementById('name');
nameInput.addEventListener('input', () => {
	nameSpan.textContent = nameInput.value.trim() || '방문자';
});

// 3) 시계 - 예전엔 서버 시각(${now}), 이제 브라우저 시각을 매초 갱신
const clock = document.getElementById('clock');
function pad(n) {
	return String(n).padStart(2, '0');
}
function tick() {
	const now = new Date();
	clock.textContent =
		`${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ` +
		`${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
}
tick();
setInterval(tick, 1000);
