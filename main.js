window.addEventListener('keydown', move, false);
elem = document.getElementById('bird');
const move_time = 1000;
var l = document.documentElement.clientWidth - parseInt(getComputedStyle(elem).width, 10) - 2*parseInt(getComputedStyle(elem).border, 10);
var t = document.documentElement.clientHeight - parseInt(getComputedStyle(elem).height, 10) - 2*parseInt(getComputedStyle(elem).border, 10);
var to = parseInt(bird.style.top, 10);
var step = 70, f = true, acceleration = 2000;

var keyCodes = {
	37: 'left arrow',
	38: 'up arrow',
	39: 'right arrow'
};

function move (key_sit) {
	console.log (key_sit.keyCode);
	var coords = bird.getBoundingClientRect();

	var to = parseInt(getComputedStyle(bird).top, 10);
	var left_coord = parseInt(getComputedStyle(bird).left, 10);
	switch (keyCodes[key_sit.keyCode]) {
		case 'left arrow':
			animate (function (progress) {
				bird_move_distance = 100;
				bird.style.left = left_coord - progress*bird_move_distance + 'px';
			}, move_time);
			break;
		case 'right arrow':
			animate (function (progress) {
				bird_move_distance = 100;
				bird.style.left = left_coord + Math.sqrt(progress)*bird_move_distance + 'px';
			}, move_time);
			break;
		default:
			animate(function (progress) {
				var xm = calc_duration(step)/(calc_duration(step) + calc_duration(t-to));
				var a = (step/(t - to) + xm)/(xm*xm - xm);
				var frac = (1 + a*progress*progress - (1 + a)*progress);
				bird.style.top = frac*(to - t) + t + 'px';  // Изменение высоты при падении
				// console.log((1+a*progress*progress-(1+a)*progress)+' '+progress);
			}, calc_duration(step) + calc_duration(t - to + step));
			// bird.style.top = ((parseInt(coords.top, 10) - step)<0)? 0 : (parseInt(coords.top, 10) - step) + 'px';
			var to = parseInt(getComputedStyle(bird).top, 10);
	}
}

function animate(draw, duration) {		//  falling animation
	var start = performance.now();

	requestAnimationFrame(function framePosition(time) {
	var timePassed = time - start;
 
	if (timePassed > duration) timePassed = duration;
	// console.log (Math.round(timePassed/duration*1000)/1000);

	draw(timePassed/duration);

	if ((timePassed < duration)) { 
		requestAnimationFrame(framePosition);
	}
  });
}

function calc_duration (h) {	// fall time
	return Math.sqrt ((h)*acceleration);
}