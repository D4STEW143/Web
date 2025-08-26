// JavaScript source code
function Power() {
	let base = document.getElementById("base").value;
	let exponent = document.getElementById("exponent").value;
	document.getElementById("power").innerHTML = base ** exponent;
}

function GetMouseCoords(event) {
	let x = event.clientX;
	let y = event.clientY;
	document.getElementById("mouse").innerHTML = `X = ${x}, Y = ${y};`
}
document.addEventListener("mousemove", GetMouseCoords);

function SwitchBackground() {
	let switchBackground = document.getElementById('switch-background');
	if (switchBackground.style.backgroundImage === 'url("img/moon.png")') {
		document.body.className = 'light-theme';
		switchBackground.style.backgroundImage = 'url("img/sun.png")';
	}
	else {
		document.body.className = 'dark-theme';
		switchBackground.style.backgroundImage = 'url("img/moon.png")';
	}
}
document.addEventListener("DOMContentLoaded", SwitchBackground);

function ThemeChangeDelay() {
	let slider = document.getElementById('theme - change - delay - slider');
	let switchBackground = document.getElementById('switch-background');

	let body = document.querySelector('body');
	body.style.cssText += `transition: background-color ${slider.value}s ease`;
}
document.addEventListener("mouseup", ThemeChangeDelay);

