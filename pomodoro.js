$(document).ready(function(){
	
		$('.start').click(studyTimer);
	//$(".study-txt").prop("value","Hello2");
	});

var timerRunning = false;
var sStartTime;
var textTime;
function studyTimer(){
		if(!timerRunning){
			timerRunning=true;
			sStartTime = new Date();
			textTime = parseInt($(".study-txt").prop("value"));
		}
		var curTime = new Date();
		var diffSec = Math.round((curTime - sStartTime)/1000);
		
		var timeLeft = textTime*60 - diffSec;
		
		$(".study-txt").prop("value",getDisplayTime(timeLeft));
		if(timeLeft > 0){
			window.setTimeout(studyTimer, 1000);
		}
		else{
			timerRunning = false;
			breakTimer();
			$(".study-txt").prop("value",textTime);
		}
	};
	
var breakTimer = function(){
	
	if(!timerRunning){
		timerRunning = true;
		sStartTime = new Date();
		textTime = parseInt($(".break-txt").prop("value"));
	}
	var curTime = new Date();
	var diffSec = Math.round((curTime - sStartTime)/1000);
	
	var timeLeft = textTime*60 - diffSec;
	
	$(".break-txt").prop("value",getDisplayTime(timeLeft));
	if(timeLeft > 0){
		window.setTimeout(breakTimer, 1000);
	}
	else{
		timerRunning = false;
		studyTimer();
		$(".break-txt").prop("value",textTime);
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
