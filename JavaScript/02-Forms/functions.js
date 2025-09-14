// JavaScript source code
function Power() {
	let base = document.getElementById("base").value;
	let exponent = document.getElementById("exponent").value;
	document.getElementById("power").innerHTML = base ** exponent;
}
document.addEventListener("mousemove", GetMouseCoords);
function GetMouseCoords(event) {
	let x = event.clientX;
	let y = event.clientY;
	document.getElementById("mouse").innerHTML = `X = ${x}, Y = ${y}`;
}
function SwitchBackground() {
	let switchBackground = document.getElementById("switch-background");
	//if(switchBackground.style.backgroundImage === 'url("img/moon.png")')
	//{
	//    switchBackground.style.backgroundImage = 'url("img/sun.png")';
	//    document.body.className = 'dark';
	//}
	//else
	//{
	//    switchBackground.style.backgroundImage = 'url("img/moon.png")';
	//    document.body.className = 'light';
	//}
	let delay = document.getElementById('delay').value;
	document.body.style.transition = `background-color ${delay}s, color ${delay}s`;
	document.getElementById('switch-background').style.transition = `background-image ${delay}s`;
	document.body.className = document.body.className === "light" ? "dark" : "light";
}

function UploadPhoto() {
	let image = document.getElementById('photo');
	let students_photo = document.getElementById('students-photo');
	let filename = students_photo.value.split('\\');
	filename = filename[filename.length - 1];
	image.src = filename;
	alert(filename);
	//alert(students_photo.value);
}

function SetImage() {
	let filename = document.getElementById("students-photo");
	let reader = new FileReader();
	reader.onload = function (e) {
		document.getElementById("photo").src = e.target.result;
	}
	reader.readAsDataURL(filename.files[0]);
}
/////////////////////////////////////////////////////////////
//                          Timer                          //
document.body.onload = function tick_timer() {
	let time = new Date();
	document.getElementById("full-time").innerHTML = time;

	document.getElementById("hours").innerHTML = addLeadingZero(time.getHours());
	document.getElementById("minutes").innerHTML = addLeadingZero(time.getMinutes());
	document.getElementById("seconds").innerHTML = addLeadingZero(time.getSeconds());

	document.getElementById("day").innerHTML = addLeadingZero(time.getDate());
	document.getElementById("month").innerHTML = addLeadingZero(time.getMonth() + 1);
	document.getElementById("year").innerHTML = addLeadingZero(time.getFullYear());

	document.getElementById("weekday").innerHTML = time.toLocaleDateString("ru", { weekday: 'long' });

	document.getElementById("current-date").style.visibility = document.getElementById("show-date").checked ? "visible" : "hidden";
	document.getElementById("weekday").style.visibility = document.getElementById("show-weekday").checked ? "visible" : "hidden";

	setTimeout(tick_timer, 100);
}

function addLeadingZero(number) {
	return number < 10 ? "0" + number : number;
}

document.getElementById("btn-start").onclick = function startCountdownTimer() {
	let targetDateControl = document.getElementById("target-date");
	let targetTimeControl = document.getElementById("target-time");
	let btnStart = document.getElementById("btn-start");
	targetDateControl.disabled = targetTimeControl.disabled = !targetDateControl.disabled;
	if (btnStart.value === "Start") {
		btnStart.value = "Stop";
		tickCountdown();

		//document.getElementById("target-date-value").innerHTML = targetDateControl.valueAsDate;
		//document.getElementById("target-time-value").innerHTML = targetTimeControl.valueAsDate;
	}
	else {
		btnStart.value = "Start";
		document.getElementById("target-date-value").innerHTML = "Waiting....";
		document.getElementById("target-time-value").innerHTML = "Waiting....";
	}
}

function tickCountdown() {
	if (!document.getElementById("target-time").disabled) return;
	let now = new Date();
	let targetDateControl = document.getElementById("target-date");
	let targetTimeControl = document.getElementById("target-time");
	let targetDate = targetDateControl.valueAsDate;
	let targetTime = targetTimeControl.valueAsDate;

	//Выравниевание часового пояса
	console.log(targetDate.getTimezoneOffset());
	targetDate.setHours(targetDate.getHours() + targetDate.getTimezoneOffset() / 60);
	targetTime.setHours(targetTime.getHours() + targetTime.getTimezoneOffset() / 60);

	//Сводим даты и время в одну переменную
	targetTime.setFullYear(targetDate.getFullYear());
	targetTime.setMonth(targetDate.getMonth());
	targetTime.setDate(targetDate.getDate());

	//Таймер
	let diff = new Date();
	const timer_time = new Date();
	diff.setTime((timer_time.getDate() + (targetTime.getTime() - now.getTime()) - (Math.abs(timer_time.getTimezoneOffset()) * 60000)));
	document.getElementById("days-unit").innerHTML = Math.trunc(DaysFromHours(HoursFromMin(MinutesFromMls(targetTime))) - DaysFromHours(HoursFromMin(MinutesFromMls(now))));
	document.getElementById("hours-unit").innerHTML = diff.getHours();
	document.getElementById("minutes-unit").innerHTML = diff.getMinutes();
	document.getElementById("seconds-unit").innerHTML = diff.getSeconds();
	if (document.getElementById("days-unit").textContent === '0' &&
		document.getElementById("hours-unit").textContent === '0' &&
		document.getElementById("minutes-unit").textContent === '0' &&
		document.getElementById("seconds-unit").textContent === '0') {
		let alarm = new Audio("\\sound\\alarm.mp3");
		alarm.play();
		return;
	}

	//debug target datetime
	//document.getElementById("target-date-value").innerHTML = diff;
	//document.getElementById("target-time-value").innerHTML = targetTime;
	setTimeout(tickCountdown, 100)
}

//function SecondsFromMls(date) {
//	return date.getTime() / 6000;
//}
function MinutesFromMls(date) {
	return date.getTime() / 60000;
}
function HoursFromMin(minutes) {
	return minutes / 60;
}
function DaysFromHours(hours) {
	return hours / 24;
}
//}
//function YearsFromDays(days) {
//	return days / 365;
//}

//function Countdown(now, target) {
//	document.getElementById("seconds-unit").innerHTML = Math.trunc(SecondsFromMls(target) - SecondsFromMls(now));
//	document.getElementById("minutes-unit").innerHTML = Math.trunc(MinutesFromMls(target) - MinutesFromMls(now));
//	document.getElementById("hours-unit").innerHTML = Math.trunc(HoursFromMin(Math.trunc(MinutesFromMls(target) - MinutesFromMls(now))));
//	setTimeout(Countdown, 100);
//}
