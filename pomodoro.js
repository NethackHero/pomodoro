$(document).ready(function(){
	
	$('.start').click(startPomodoro);
	
	$('.reset').click(reset);
	
	$('.plus').click(addMinute);
	$('.minus').click(minusMinute);
	});

var timerRunning = false;
var sStartTime;
var studyDuration;
var breakDuration;
var diffSec;
var timeBeforePause = 0;
var studying = true;
var currentRound = 1;

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
	currentRound = 1;
	$('.block').html("<div id='#1' class='.title'>"+
					"<h5><span class='uppercase'>STUDY </span>"+
					"<span class='1-minute' contenteditable='true'>25</span>mins "+
					"<button class='minus'><i class='fa fa-minus'></i></button><button class='plus'><i class='fa fa-plus'></i></button>"+
					"<span class='round'>#1</span>"+
					"</h5>"+
					"</div>"+
					"<h1>00:00:00</h1>"+
					"<div id='#2' class='.title'>"+
					"<h5><span class='uppercase'>BREAK </span>"+
					"<span class='2-minute' contenteditable='true'>10</span>mins "+
					"<button class='minus'><i class='fa fa-minus'></i></button><button class='plus'><i class='fa fa-plus'></i></button>"+
					"<span class='round'>#2</span></h5>"+
					"</div>"+
					"<script>	$('.plus').click(addMinute);"+
					"$('.minus').click(minusMinute);</script>");
}

function studyTimer(){
		if(!timerRunning){
			timerRunning=true;
			sStartTime = new Date();
			if(timeBeforePause === 0){
				studyDuration = parseInt($("." + currentRound + "-minute").text());
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
			shiftUp();
			timerRunning = false;
			timeBeforePause = 0;
			currentRound++;
			studying = false;
			breakTimer();
		}
	};
	
var breakTimer = function(){
	
	if(!timerRunning){
		timerRunning = true;
		sStartTime = new Date();
		if(timeBeforePause === 0){
			breakDuration = parseInt($("." + currentRound + "-minute").text());
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
		shiftUp();
		timerRunning = false;
		timeBeforePause = 0;
		currentRound++;
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
	
	var timerType = function(){
		if(studying){
			return "study";
		}
		else{
			return "break";
		}
	}
	
	var timerDuration = function(){
		if(studying){
			return studyDuration;
		}
		else{
			return breakDuration;
		}
	}
	
	var shiftUp = function(){
		$('h1').remove();
		$('.block').append("<h1>00:00:00</h1><div id='#" + (currentRound+2) + "' class='.title'><h5><span class='uppercase'>" + timerType() + "</span> <span class='" + 
		(currentRound+2) + "-minute' contenteditable='true'>"+
		timerDuration()
		+"</span>mins <button class='minus'><i class='fa fa-minus'></i></button><button class='plus'><i class='fa fa-plus'></i></button><span class='round'>#"+ 
		(currentRound+2)+"</span></h5></div>"+
		"<script>	$('.plus').click(addMinute);"+
		"$('.minus').click(minusMinute);</script>");
	}
	
	
	var addMinute = function(){
		
		var order = $($(this).parent()).parent().attr('id');
		var id = order.replace('#','');
		
		var cls = "." + id + "-minute";
		var old = parseInt($(cls).text());
		$(cls).text(old+1);
	}
	
	var minusMinute = function(){
		var order = $($(this).parent()).parent().attr('id');
		var id = order.replace('#','');
		
		var cls = "." + id + "-minute";
		var old = parseInt($(cls).text());
		$(cls).text(old-1);
	}
