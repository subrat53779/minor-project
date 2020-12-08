window.onload = function(){
    
    morseCode = {
      /*
        List of basic letter character definitions to translate
    
        *** NOTE: Any symbol does not work at the moment  ***
          */
      a: ".--",
      b: "-...",
      c: "-.-.",
      d: "-..",
      e: ".",
      f: "..-.",
      g: "--.",
      h: "....",
      i: "..",
      j: ".---",
      k: "-.-",
      l: ".-..",
      m: "--",
      n: "-.",
      o: "---",
      p: ".--.",
      q: "--.-",
      r: ".-.",
      s: "...",
      t: "-",
      u: "..-",
      v: "...-",
      w: ".--",
      x: "-..-",
      y: "-.--",
      z: "--..",
    
      _0: "-----",
      _1: ".----",
      _2: "..---",
      _3: "...--",
      _4: "....-",
      _5: ".....",
      _6: "-....",
      _7: "--...",
      _8: "---..",
      _9: "----.",
    
      legal: "abcdefghijklmnopqrstuvwxyz1234567890 " //This space at the end is important .-.
    
    }
    morseCode.legal = morseCode.legal.split(""); 
    
    
    inputBox = $("#input")
    inputText = "";
    
    
    // reference to the output field in the index file
    outputBox = $("#output")
    outputText = "";
    
    
    //The submit button will call the morse fuction to translate
    button = $("#submit");
    
    
    /*This is a list of how to treat the audio elements. This section defines how
    long a dot, dash, space, and character spaces are. Also the frequency of the beeps*/
    
    context = new AudioContext()
      /*dot slider on the settings tab 
      range from 1 to 1000*/
    
    dotSlide = $("#dotSlide");
    
    /*dash slider on the settings tab 
    range from 1 to 1000*/
    
    dashSlide = $("#dashSlide");
    
    /*character space slider on the settings tab 
    range from 1 to 300*/
    charSpaceSlide = $("#charSpaceSlide"); //300
    
    /*space slider on the settings tab 
    range from 1 to 300*/
    
    spaceSlide = $("#spaceSlide");
    
    /*frequency slider on the settings tab 
    range from 1 to 1000*/
    
    frequencySlide = $("#frequencySlide")
    
    //Variable to make sure the user doesnt spam the play button >:c
    playing = false;
    
    
    
    setInterval(appLoop, 1000 / 60);
    
    
    
    setDefaults();
    }
    
    function resetSlides() {
      dotSlide[0].value = defaultDotLength;
      dashSlide[0].value = defaultDashLength;
      charSpaceSlide[0].value = defaultCharSpaceLength;
      spaceSlide[0].value = defaultSpaceLength;
      frequencySlide[0].value = defaultFrequency;
    }
    
    function setDefaults() {
    
    
      //How long a dot is
      dotLength = defaultDotLength = 300;
    
      //How long a dash is
      dashLength = defaultDashLength = 550;
    
      //space between dots and dashes
      charSpaceLength = defaultCharSpaceLength = 70;
    
      //how long there is no sound between words
      spaceLength = defaultSpaceLength = 230;
    
      //The frequency/pitch of a beep
      frequency = defaultFrequency = 800;
    
      /*Re-adjust the sliders because if we don't, the value they were at before will just overide
      the new values when the appLoop comes around*/
      resetSlides();
    }
    
    function appLoop() {
    
      /*This if statement is a bug fix. When I typed into a text feild, the alt/filler text would not dissapear
      so i just did it manually here*/
    
      if (document.getElementById("output").value == "") {
    
        document.getElementById("output1lable").innerHTML = "output..."
    
      } else {
    
        document.getElementById("output1lable").innerHTML = ""
    
      }
    
      //ajustable settings
    
      /*
      This app will constantly refer to the sliders in the
      settings tab to change the values of the audio variables
      this will create a live update effect in the settings
    
      */
    
      dotLength = slideVal(dotSlide);
    
      dashLength = slideVal(dashSlide);
    
      charSpaceLength = slideVal(charSpaceSlide);
    
      spaceLength = slideVal(spaceSlide);
    
      frequency = slideVal(frequencySlide);
}

function slideVal(slider) {

  return slider["0"].valueAsNumber

}

function morse() {

  /*
    #1 Get the input Text
    #2 Loop through the character string
    #3 Match the single character to the defined morse translation
    #4 add it to the output string
    #5 Display the output string into the output text field
   */


  //resetting the output text
  outputText = "";


  //getting what the user typed in
  inputText = document.getElementById("input").value



  for (var i = 0; i < inputText.length; i++) {

    /* loop through all the characters of the input text*/


    //get the current character the input string
    var char = inputText[i];

    char = char.toLowerCase()


    if (morseCode.legal.indexOf(char) == -1) {
      console.log("ERROR: Input contains illegal character : " + char);

      $("#input").css({
        "border": "6px solid red"
      })

      return;

    } else {
      console.log("legal")
      $("#input").css({
        "border": "1px solid rgba(0,0,0,.12)",
        "border-top": "0px",
        "border-right": "0px",
        "border-left": "0px"
      })


    }

    /*
          as long as the current character is not a space 
          you can keep going
          */

    if (char != " ") {

      /*If you look at the key for the number definitions at the top of the 
      file, you will notice every number starts with a underscore ex(_1:, _2:)
      this is because having a single number ex (1:, 2:) will become a
      syntax error. Right here, I account for the underscore. If the
      current character from a string is a interger then add a underscore
      to the character string. So "1" becomes "_1". */

      if (Number.isInteger(parseInt(char))) {

        char = "_" + char;

      }

      /*This line allows for string to turn into javascript commands
            so when this line is read by the compiler it will say 
            morseText = morseCode.a or morseCode._1*/

      morseText = eval("morseCode." + char)


      // morseText = (morseText == "." ? "1" : 0)
      /*
      this could be an option setting to use 1's and 0's but i would have to 
      tweak the audio output (beep) function
      */

    } else {

      /* If the character is a space then there will be a space added to the
      output string*/

      morseText = " "

    }

    /*Finish By adding the translated text to the output*/
    outputText += morseText + " ";
  }


  /*Output the final text*/

  document.getElementById("output").value = outputText;

}


function play() {

  /*Starts off a chain reading the output morse code character by character*/

  if (!playing) {

    characterIndex = 0;

    chain();

  }

  playing = true;


}

function stopPlaying() {

  /*Breaks the chain loop by making the if statement, allowing it to continue, false*/

  characterIndex = outputText.length - 1;

}

function chain() {

  /*If im under the character limit of the outputText*/


  if (characterIndex <= outputText.length - 1) {


    // Get the current character
    var char = outputText[characterIndex];


    // If the character is a space
    if (char == " ") {


      // Dont make any sound and wait for the specified 
      // space time to loop again

      setTimeout(chain, spaceLength);
      characterIndex++;


    } else { // if the character is not a space

      //wait for the specified wait time between letters to make a beep sound

      setTimeout(function() {

        beep(char, chain /*callback*/ )

        //when the beep sound stops recall this method
        characterIndex++;

      }, charSpaceLength)

    }

  } else {

    //If were done , were not playing anything, you can press the button again

    playing = false;

  }

}

function beep(type0, callback0) {

  //We already know were going to make a beep but it just depends on
  //when we stop the beep.

  var type = type0;

  var callback = callback0 || function() {}

  var o = context.createOscillator() //cant explain this ;p

  var g = context.createGain() //cant explain that

  o.frequency.value = frequency; //set the pitch and shiz

  o.connect(g) //dunnno

  g.connect(context.destination) //idk

  o.start(0) //ahh! this is familiar ;)

  //duration of a beep
  var time = 0;

  switch (type) {
    case "-":
      //if the character is a dash then the duration is the dash length
      time = dashLength;
      break
    case ".":
      //if the character is a dot then the duration is the dot length
      time = dotLength;
      break
  }

  setTimeout(function() { // wait the length of the character

    //after the wait stop the beep
    o.stop();

    //feedback to the console
    console.log('beep: ' + type)

    //start the chain again to start on the next character
    callback();

  }, time);

}