$(document).ready(function(){
	
		$('.start').click(startTimer);
	//$(".study-txt").prop("value","Hello2");
	});

var timerRunning = false;
var sStartTime;
var startTimer = function(){
		var studyTime = $(".study-txt").attr("value");
		var breakTime = $(".break-txt").attr("value");
		if(!timerRunning){
			timerRunning=true;
			sStartTime = new Date();
		}
		var curTime = new Date();
		var diffSec = Math.round((curTime - sStartTime)/1000);
		
		
		$(".study-txt").prop("value",getDisplayTime(diffSec));
		window.setTimeout(startTimer, 1000);
	};
	
	var getDisplayTime = function(seconds){
		
		var remainingSec = seconds;
		var hours = Math.floor(remainingSec/3600);
		remainingSec -= hours*3600;
		var minutes = Math.floor(remainingSec/60);
		remainingSec -= minutes*60;
		
		return ("00" + hours).slice(-2) + ":" + ("00" + minutes).slice(-2) + ":" + ("00" + remainingSec).slice(-2);
	}
