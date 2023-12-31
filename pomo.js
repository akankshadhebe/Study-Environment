 $(document).ready(function () {
  var startButton = $("#btn-start");
  var resetButton = $("#btn-reset");
  var stopMusicButton = $("#btn-stop-music");
  // stopMusicButton.prop('disabled',true);

  var sessionWasRunning = true;

  var isSessionStop = true;
  var isBreakStop = true;

  var resetSession = 1500;
  var resetBreak = 300;

  //user choice of session and break time

  var sessionTime = 1500;
  var breakTime = 300;

  var music = true;    

  stopMusicButton.click(function () {
      music = !music;

      if (music) {
        stopMusicButton.text("Stop song");
      }else{
        stopMusicButton.text("Play song");
      }
  });


// var sessionTime = 4;
// var breakTime = 4;

  var sessionOverMusic = new Howl({
      //edit this to the music you want to play
      // src: ['/src/audio/bensound-cute.mp3'],
      src: ['/src/audio/bensound-anewbeginning.mp3'],
      onend: function () {
        //   stopMusicButton.prop('disabled',true);
      }
  });

  var breakOverMusic = new Howl({
      //edit this to the music you want to play
      src: ['/src/audio/bensound-anewbeginning.mp3'],
      onend: function () {
        //   stopMusicButton.disabled = true;
      }
  });


var song = new Howl({
    src: ['/src/audio/Metronome - QuickSounds.com2.mp3'],
    onend: function () {
        // stopMusicButton.disabled = true;
    }
});

  var sessionClock = $('.session-clock').FlipClock(sessionTime, {
      clockFace: 'MinuteCounter',

      countdown: true,
      autoStart: false,


      callbacks: {
          interval: function () {
            var sessionTime = sessionClock.getTime().time;

            if(music){
                song.play();
            }
              if (sessionTime == 0) {
                  //set time again to offset the one second difference
                  breakClock.setTime(breakTime + 1);
                  breakClock.start();
                  isBreakStop = false;

                  isSessionStop = true;
                  sessionWasRunning = false;

                //   hide session clock
                hideSessionTime();
                showBreakTime();

                  playSessionOverMusic();

              } else if (breakTime == 0 && isBreakStop) {

                  //set time for display
                  breakClock.setTime(breakTime);
              }
          }
      }
  });

  var breakClock = $('.break-clock').FlipClock(breakTime, {
      clockFace: 'MinuteCounter',

      countdown: true,
      autoStart: false,

      callbacks: {
          interval: function () {
              var breakTime = breakClock.getTime().time;

              if(music){
                  song.play();
              }

              if (breakTime == 0) {

                  //set time again to offset the one second difference
                  sessionClock.setTime(sessionTime + 1);
                  sessionClock.start();
                  isSessionStop = false;
                  sessionWasRunning = true;

                  isBreakStop = true;

                  playBreakOverMusic();

                  hideBreakTime();
                  showSessionTime();

              } else if (sessionTime == 0 && isSessionStop) {

                  //set time for display
                  sessionClock.setTime(sessionTime);
              }
          }
      }
  });

  /* Edit Time Section */

  $("#btn-reduce-session-minute").click(function () {
      changeSessionTime(-60);
  });

  $("#btn-increase-session-minute").click(function () {
      changeSessionTime(60);
  });

  $("#btn-reduce-session-second").click(function () {
      changeSessionTime(-1);
  });

  $("#btn-increase-session-second").click(function () {
      changeSessionTime(1);
  });

  function changeSessionTime(time) {
      if ((sessionTime + time >= 0) && (sessionTime + time <= 6000)) {
          stopAllClocks();
          sessionTime += time;
          sessionClock.setTime(sessionTime);
      }
  }

  $("#btn-reduce-break-minute").click(function () {
      changeBreakTime(-60);
  });

  $("#btn-increase-break-minute").click(function () {
      changeBreakTime(60);
  });

  $("#btn-reduce-break-second").click(function () {
      changeBreakTime(-1);
  });

  $("#btn-increase-break-second").click(function () {
      changeBreakTime(1);
  });

  function changeBreakTime(time) {
      if ((breakTime + time >= 0) && (breakTime + time <= 6000)) {
          stopAllClocks();
          breakTime += time;
          breakClock.setTime(breakTime);
      }
  }

  function hideBreakTime() {
    $("#break-section").hide();
    $("#session-section").removeClass("col-lg-6 col-xl-6");
    $("#session-section").addClass("col-xs-12 col-sm-12 col-md-12");


  } 

  function showBreakTime() {
    $("#break-section").show();
    $("#session-section").removeClass("col-xs-12 col-sm-12 col-md-12");
    $("#session-section").addClass("col-lg-6 col-xl-6");
  }

function hideSessionTime() {
    $("#session-section").hide();
    $("#break-section").removeClass("col-lg-6 col-xl-6");
    $("#break-section").addClass("col-xs-12 col-sm-12 col-md-12");
    $("#timer").css("margin-top", "0px");
}

function showSessionTime() {
    $("#session-section").show();
    $("#break-section").removeClass("col-xs-12 col-sm-12 col-md-12");
    $("#break-section").addClass("col-lg-6 col-xl-6");
}




  startButton.click(function () {
      if (sessionWasRunning && isSessionStop) {
          sessionClock.start();
          startButton.text("Stop");
          hideBreakTime();
          console.log('1');

          isSessionStop = false;
      } else if (!sessionWasRunning && isBreakStop) {
          breakClock.start();
          startButton.text("Stop");
          console.log('2');
        hideSessionTime();


          isBreakStop = false;
      }else if(!isSessionStop){
          sessionClock.stop();
          startButton.text("Start");

          showBreakTime();
            console.log('3');
          isSessionStop = true;
          sessionWasRunning = true;
      }else if(!isBreakStop){
          breakClock.stop();
          startButton.text("Start");
          showBreakTime();
          showSessionTime();
        console.log('4');
          isBreakStop = true;
          sessionWasRunning = false;
      }else{
        console.log("else");
      }



  });

  resetButton.click(function () {

      stopAllClocks();

      sessionTime = resetSession;
      breakTime = resetBreak;

      sessionClock.setTime(sessionTime);
      breakClock.setTime(breakTime);

      showBreakTime();
      showSessionTime();
  });

  stopMusicButton.click(function () {
      sessionOverMusic.stop();
      breakOverMusic.stop();

  });

  function stopAllClocks() {
      sessionClock.stop();
      isSessionStop = true;

      breakClock.stop();
      isBreakStop = true;

      startButton.text("Start");
  }

  function playSessionOverMusic() {
      stopMusicButton.prop('disabled',false);

      if (isSessionStop) {
          breakOverMusic.stop();
          sessionOverMusic.play();
      }
  }

  function playBreakOverMusic() {
      stopMusicButton.prop('disabled',false);

      if (isBreakStop) {
          sessionOverMusic.stop();
          breakOverMusic.play();
      }
  }


});