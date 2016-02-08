$(document).ready(function(){
	
	$('.start').click(startPomodoro);
	//$(".study-txt").prop("value","Hello2");
	
	/*
	$('.stop').click(stopTimer);
	*/
	
	$('.reset').click(reset);
	});

var timerRunning = false;
var sStartTime;
var studyDuration;
var breakDuration;
var diffSec;
var timeBeforePause = 0;
var studying = true;

var timer;

var startPomodoro = function(reset){
	if(!timerRunning){
		$(".play>i").removeClass("fa-play start");
		$(".play>i").addClass("fa-pause stop");
		if(studying){
			studyTimer();
		}
		else{
			breakTimer();
		}
	}
	else{
		stopTimer();
		timeBeforePause += diffSec;
	}
}

var reset = function(){
	stopTimer();
	$('h1').text("00:00:00");
	timeBeforePause = 0;
}

function studyTimer(){
		if(!timerRunning){
			timerRunning=true;
			sStartTime = new Date();
			if(timeBeforePause === 0){
				studyDuration = parseInt($(".study-minute").text());
			}
		}
			
		var curTime = new Date();
		diffSec = Math.round((curTime - sStartTime)/1000);
		
		var timeLeft = studyDuration*60 - diffSec - timeBeforePause;
		
		$("h1").text(getDisplayTime(timeLeft));
		if(timeLeft > 0){
			timer = window.setTimeout(studyTimer, 1000);
		}
		else{
			timerRunning = false;
			timeBeforePause = 0;
			studying = false;
			breakTimer();
			
		}
	};
	
var breakTimer = function(){
	
	if(!timerRunning){
		timerRunning = true;
		sStartTime = new Date();
		if(timeBeforePause === 0){
			breakDuration = parseInt($(".break-minute").text());
		}
	}
	var curTime = new Date();
	diffSec = Math.round((curTime - sStartTime)/1000);
	
	var timeLeft = breakDuration*60 - diffSec - timeBeforePause;
	
	$("h1").text(getDisplayTime(timeLeft));
	if(timeLeft > 0){
		timer = window.setTimeout(breakTimer, 1000);
	}
	else{
		timerRunning = false;
		timeBeforePause = 0;
		studying = true;
		studyTimer();
	}
}
	
	var getDisplayTime = function(seconds){
		var remainingSec = seconds;
		var hours = Math.floor(remainingSec/3600);
		remainingSec -= hours*3600;
		var minutes = Math.floor(remainingSec/60);
		remainingSec -= minutes*60;
		
		return ("00" + hours).slice(-2) + ":" + ("00" + minutes).slice(-2) + ":" + ("00" + remainingSec).slice(-2);
	}
	
	var stopTimer = function(){
		clearTimeout(timer);
		timerRunning = false;
		$(".play>i").removeClass("fa-pause stop");
		$(".play>i").addClass("fa-play start");
	}
