  function Window() {
    var Window = document.getElementById("Window");
    return Window.paused ? Window.play() : Window.pause();
  };

  function Recordplayer() {
    var Recordplayer = document.getElementById("Recordplayer");
    return Recordplayer.paused ? Recordplayer.play() : Recordplayer.pause();
  };

  function Study() {
    var Study = document.getElementById("Study");
    return Study.paused ? Study.play() : Study.pause();
  };
  function Clock() {
    var Clock = document.getElementById("Clock");
    return Clock.paused ? Clock.play() : Clock.pause();
  };