window.addEventListener('keydown', move, false);
elem = document.getElementById('bird');
var l=document.documentElement.clientWidth - parseInt(getComputedStyle(elem).width, 10) - 2*parseInt(getComputedStyle(elem).border, 10);
var t=document.documentElement.clientHeight - parseInt(getComputedStyle(elem).height, 10) - 2*parseInt(getComputedStyle(elem).border, 10);
var to = parseInt(bird.style.top, 10);
var step = 70, f = true, aclrtn = 2000;

function move (key_sit) {
	console.log (key_sit.type);
	var coords = bird.getBoundingClientRect();
	f=false;
	f=true;
	// console.log ("sadfb");
	var to = parseInt(getComputedStyle(bird).top, 10);
	animate(function (progress) {
		var xm = calc_duration(step)/(calc_duration(step)+calc_duration(t-to));
		var a = (step/(t-to)+xm)/(xm*xm-xm);
		var frac = (1+a*progress*progress-(1+a)*progress);
		bird.style.top = frac*(to-t) + t + 'px';  // Изменение высоты при падении
		// console.log((1+a*progress*progress-(1+a)*progress)+' '+progress);
	}, calc_duration(step) + calc_duration(t-to+step));
	// bird.style.top = ((parseInt(coords.top, 10) - step)<0)? 0 : (parseInt(coords.top, 10) - step) + 'px';
	var to = parseInt(getComputedStyle(bird).top, 10);
}

function animate(draw, duration) {    //  анимация падения
	var start = performance.now();
	// console.log ("sadfb");

	requestAnimationFrame(function framePosition(time) {
	var timePassed = time - start;
 
	if (timePassed > duration) timePassed = duration;
	// console.log (Math.round(timePassed/duration*1000)/1000);

	if (!f) {
		f=true;
		return;
	}

	draw(timePassed/duration);

	if ((timePassed < duration)) { 
		requestAnimationFrame(framePosition);
	}
  });
}

function calc_duration (h) {    // Время падения
	return Math.sqrt ((h)*aclrtn);
}