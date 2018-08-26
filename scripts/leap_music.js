var x;
var y;
var C = [261.626, 329.628, 391.995, 523.251, 659.255, 783.991, 1046.50];
var G = [246.942, 391.995, 493.883, 587.330, 783.991, 987.767, 1174.66];
var F = [261.626, 349.228, 440.000, 523.251, 698.456, 880.000, 1046.50];
var Am = [220.000, 261.626, 329.628, 440.000, 523.251, 659.255, 880.000];
var Em = [246.942, 329.628, 391.995, 493.883, 659.255, 783.991, 987.767];
var yPos;
// Store frame for motion functions
var previousFrame = null;

// Setup Leap loop with frame callback function
var controllerOptions = {
  enableGestures: true
};

// to use HMD mode:
// controllerOptions.optimizeHMD = true;

Leap.loop(controllerOptions, function(frame) {

  // Display Hand object data
  var handOutput = document.getElementById("handData");

  var handString = "";
  if (frame.hands.length > 0) {
    for (var i = 0; i < frame.hands.length; i++) {
      var hand = frame.hands[i];
      yPos = hand.palmPosition[1];
      console.log("yPos is" + yPos);

      handString += "Position = " + yPos;
      document.getElementById("musicLine").style.marginTop = 600 - yPos + "px";

    }
  } else {
    handString += "No hands";
  }
  handOutput.innerHTML = handString;




  // Store frame for motion functions
  previousFrame = frame;
})



function getBassNote(chord) {
  console.log("Note Requested " + chord)
  var noteArray = {
    C: 130.813,
    G: 195.998,
    F: 174.614,
    Am: 110.000,
    Em: 164.814
  };
  return noteArray[chord];
}

function playNote(chord, range) {

  var bassSelected = chord;
  if (range > 400) {
    var lowNote = 4;
  } else if (range > 200) {
    var lowNote = 2;
  } else if (range > 0) {
    var lowNote = 0;
  }

  var selectedNoteNumber = Math.floor(Math.random() * 3) + lowNote;
  var selectedNote = eval(chord)[selectedNoteNumber];
  var note = new Pizzicato.Sound({
    source: 'wave',
    options: {
      frequency: selectedNote
    }
  });
  note.play();


  var bassNote = new Pizzicato.Sound({
    source: 'wave',
    options: {
      frequency: getBassNote(bassSelected)
    }
  });
  bassNote.play();

  setTimeout(function() {
    note.stop();
    bassNote.stop();
  }, 500);
}

var chordProgression = [
  "C", "C", "C", "C",
  "G", "G", "G", "G",
  "Am", "Am", "Am", "Am",
  "Em", "Em", "Em", "Em",
  "F", "F", "F", "F",
  "C", "C", "C", "C",
  "F", "F", "F", "F",
  "G", "G", "G", "G"
]
i = 0;

function playMusic() {
  setTimeout(function() {
    if (i >= chordProgression.length) {
      i = 0;
    }
    var chord = chordProgression[i];
    playNote(chord, yPos);
    i++;
    playMusic();
  }, 500);
}

function showCoords(event) {
  x = event.clientX;
  y = event.clientY;
  var coor = "Y coords: " + yPos;
  document.getElementById("musicDisplay").innerHTML = coor;
}
