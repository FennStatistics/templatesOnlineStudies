/* 
################### global variables ###################
*/

/* for testing study */
const Required_Testing = true; // set to false for production !!!

/* number of components / elements to set progress bar */
const numElements = 11;
var numElementsCounter = 0;

/* global variables */
var URLparams_global;
var paracountclicks = 0;

// >>> assign if survey is answered by experts
var condExpert = false; // default


/* 
################### global functions ###################
*/
// Function to generate a random fake PID (10–24 chars, Prolific-like)
function generateRandomPID(length = 30) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let pid = "";
  for (let i = 0; i < length; i++) {
    pid += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pid;
}

function generateFixedLengthID(length = 8) {
  const max = Math.pow(10, length);
  const num = Math.floor(Math.random() * max);
  return num.toString().padStart(length, "0");
}

function shuffleArray(array) {
  let array_emp = [];
  for (var i = 0; i < array.length; i++) {
    array_emp.push(i);
  }

  let j, x;
  for (i = array_emp.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = array_emp[i];
    array_emp[i] = array_emp[j];
    array_emp[j] = x;
  }
  return array_emp;
}

function getJsonSize(obj) {
  const jsonString = JSON.stringify(obj);
  const sizeInBytes = new TextEncoder().encode(jsonString).length;
  const sizeInKB = sizeInBytes / 1024;

  console.log(`✅ JSON size: ${sizeInBytes} bytes (${sizeInKB.toFixed(2)} KB)`);

  if (sizeInKB > 5000) {
    console.warn(
      "⚠️ Warning: JSON size exceeds or is close to JATOS limit of 5 MB. Consider chunking or uploading as a file."
    );
  }

  return {
    bytes: sizeInBytes,
    kilobytes: sizeInKB,
  };
}


/* 
################### Start of Study ###################
*/
const Greetings_htmlForm = new lab.html.Form({
  title: "Greetings",
  content: textObj.greetings,
  messageHandlers: {
    run: function anonymous() {
      if (typeof jatos.jQuery === "function") {
        if (
          study.state.meta.screen_height < 700 &&
          study.state.meta.screen_width < 1200
        ) {
          alert(
            "It seems that your screen size you are using is smaller than 1200x700 pixels (height x width):\n" +
            "> your screen width: " +
            study.state.meta.screen_width +
            " your screen height: " +
            study.state.meta.screen_height +
            "\nStudy is aborted!"
          );
          jatos.abortStudy("study aborted - screen to small");
        }
      }
    },
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";

      // get URL params
      if (typeof jatos.jQuery === "function") {
        URLparams_global = jatos.urlQueryParameters;
        console.log("URLparams_global:", URLparams_global);

        // check if expert condition is provided via URL parameter condExpert
        const allowedConditionsBoolean = ["true", "false"];
        if (
          typeof URLparams_global.condExpert === "string" &&
          allowedConditionsBoolean.includes(
            URLparams_global.condExpert.toLowerCase()
          )
        ) {
          condExpert = URLparams_global.condExpert.toLowerCase() === "true";
        } else {
          condExpert = false; // default
        }
        // EXPERT CASE: no hard requirement for a real Prolific PID
        if (condExpert === true) {
          let assignedPID = generateRandomPID(); // sasign a random ID for experts

          study.options.datastore.set("PROLIFIC_PID", assignedPID);
          console.log("Expert mode: assigned fake PID:", assignedPID);

          // NON-EXPERT CASE: Prolific participants → PID required
        } else {
          if (
            typeof URLparams_global === "undefined" ||
            typeof URLparams_global.PROLIFIC_PID === "undefined" ||
            URLparams_global.PROLIFIC_PID === ""
          ) {
            alert(
              "Sorry, there may be a technical error! It was not possible to obtain all the necessary data from Prolific. Please contact the study director."
            );
            jatos.abortStudy("study aborted - no Prolific ID");
          } else {
            study.options.datastore.set(
              "PROLIFIC_PID",
              URLparams_global.PROLIFIC_PID
            );
            console.log(
              "Participant mode: using real PID:",
              URLparams_global.PROLIFIC_PID
            );
          }
        }
      }
    },
  },
});

const InformCon_htmlForm = new lab.html.Form({
  title: "InformedConsent",
  content: textObj.informCon,
  messageHandlers: {
    commit: function anonymous() {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";

      if (typeof jatos.jQuery === "function") {
        // If JATOS is available, send data there
        var resultJson = study.options.datastore.exportJson();
        console.log("result data sent to JATOS first time");
        jatos
          .submitResultData(resultJson)
          .then(() => console.log("success"))
          .catch(() => console.log("error"));
      }
    },
  },
});


const InformConsentNO_htmlForm = new lab.html.Form({
  title: "InformedConsentNO",
  content: textObj.informConNo,
  tardy: true,
  skip: "${ study.state.dummy_informedconsent == 1}",
  messageHandlers: {
    run: function anonymous() {
      // progress bar 100%
      document.querySelector(".progress-bar").style.width = 100 + "%";
    },
  },
});


/* 
################### Record Audio ###################
*/

// Global variables for audio recording
let rec_button = "recBtn";
let clip_list = "clips";
let auto_start = false;
let save_audio = true;
let codec = "audio/ogg; codecs=opus";
let audioData = null; // Variable to store the audio data temporarily

// Function to setup the recorder
const setupRecorder = function (stream, c) {
  let mediaRecorder = new MediaRecorder(stream);
  let chunks = [];
  let audioURL;

  mediaRecorder.onstart = function () {
    console.log("Recording started...");
  };

  mediaRecorder.onstop = async function () {
    console.log("Recording stopped...");

    const blobToAudio = (blob) => {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    };

    const blob = new Blob(chunks, { type: codec });
    audioData = await blobToAudio(blob); // Store audio data for later use in commit

    console.log(`Chunk length: ${chunks.length}, blob size: ${blob.size}.`);

    if (clip_list) {
      if (audioURL) window.URL.revokeObjectURL(audioURL);
      audioURL = window.URL.createObjectURL(blob);
      updateClip(audioURL);
    }

    chunks = [];
  };

  mediaRecorder.ondataavailable = function (e) {
    chunks.push(e.data);
  };

  return mediaRecorder;
};

// Function to activate the recording button
const activateRecButton = function (recorder, c) {
  const recBtn = document.getElementById(rec_button);
  recBtn.disabled = false;

  if (recorder.state === "recording") {
    recBtn.classList.add("recording");
  }

  recBtn.onclick = function (e) {
    e.preventDefault();

    if (recorder.state === "recording") {
      recorder.stop();
      recBtn.classList.remove("recording");
    } else {
      recorder.start();
      recBtn.classList.add("recording");
    }
  };
};

// Function to update the clip list with the new audio recording
const updateClip = function (audioURL) {
  const clip = document.createElement("article");
  const audio = document.createElement("audio");
  audio.src = audioURL;
  audio.controls = true;
  clip.appendChild(audio);

  const clipList = document.getElementById(clip_list);
  // Clear the current content and add the new clip
  clipList.innerHTML = ""; // This will remove all existing children
  clipList.appendChild(clip); // Add the new clip

  $("#continue").show();
};

// Function to store audio data in the commit stage
const storeAudioData = function (testAudio = false) {
  console.log("Storing audio data in commit stage...");
  console.log("Audio data type:", typeof audioData);
  console.log("Audio data length:", audioData ? audioData.length : "No data");
  if (testAudio && save_audio && audioData) {
    study.options.datastore.set("audio", audioData);
    study.options.datastore.set("audio_length", audioData.length);

    console.log("Testing: Audio data stored in commit stage.");
  } else if (save_audio && audioData) {
    var resultDataAudio = {
      ID: study.options.datastore.state.ID,
      Question: currentQuestion,
      audio: audioData,
      audio_length: audioData.length,
    };
    getJsonSize(resultDataAudio);
    jatos
      .uploadResultFile(resultDataAudio, "resultDataAudio_" + currentQuestion + "_" + study.options.datastore.state.ID + ".json")
      .then(() => console.log("File was successfully uploaded"))
      .catch(() => console.log("File upload failed"));
    console.log("Audio data stored in commit stage.");
  }
};

/* 
################### 1) Test Audio ###################
*/
// The TestAudio_htmlForm definition
const TestAudio_htmlForm = new lab.html.Form({
  title: "Test Audio",
  content: textObj.testAudio,
  tardy: true,
  messageHandlers: {
    prepare: async function () {
      let c = this; // labjs component reference
      audioData = null; // Reset audio data for each new recording session

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        let recorder = await setupRecorder(stream, c);

        c.waitFor("run").then(() => {
          if (auto_start) recorder.start();
          if (rec_button) activateRecButton(recorder, c);
        });
      } else {
        alert("Audio recording not supported by your browser!");
      }
    },
    run: () => {
      $("#continue").hide();
    },
    commit: () => {
      // Store audio data when commit is triggered
      storeAudioData((testAudio = true)); // This will store the audio data in the lab.js datastore

      if (typeof jatos.jQuery === "function") {
        // If JATOS is available, send data there
        var resultJson = study.options.datastore.exportJson();
        console.log("result data sent to JATOS - 2nd time");
        getJsonSize(resultJson);
        jatos
          .submitResultData(resultJson)
          .then(() => console.log("success"))
          .catch(() => console.log("error"));
      }

      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});

/* 
################### 2) Answer Questions ###################
*/
var currentQuestion = undefined; // Track the current question index
const template = new lab.html.Form({
  content: textObj.recordAudio, // parameters substituted ...
  tardy: true,
  messageHandlers: {
    prepare: async function () {
      let c = this; // labjs component reference
      audioData = null; // Reset audio data for each new recording session

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        let recorder = await setupRecorder(stream, c);

        c.waitFor("run").then(() => {
          if (auto_start) recorder.start();
          if (rec_button) activateRecButton(recorder, c);
        });
      } else {
        alert("Audio recording not supported by your browser!");
      }
    },
    run: function anonymous() {
      $("#continue").hide();
      currentQuestion = this.parameters.question; // Set the current question index
      console.log("Current Question:", currentQuestion);

      $("#question_title").text(this.parameters.question_title);
      $("#question_text").html(this.parameters.question_text);
    },
    commit: () => {
      // Store audio data when commit is triggered
      storeAudioData(); // This will store the audio data in the lab.js datastore

      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});

const questionsLoop = new lab.flow.Loop({
  template: template,
templateParameters: [
  {
    question: "1",
    question_title: "1. Best Moments in Research",
    question_text: `<ul>
      <li>What have been the most rewarding or exciting moments in your research experience?</li>
      <li>Can you describe a moment when you felt particularly proud of a result or breakthrough?</li>
      <li>Which aspects of doing research do you enjoy the most?</li>
      <li>Are there specific projects, collaborations, or discoveries that stand out positively for you?</li>
    </ul>`,
  },
  {
    question: "2",
    question_title: "2. Biggest Struggles and Challenges in Research",
    question_text: `<ul>
      <li>What have been the biggest challenges or difficulties you have faced in your research?</li>
      <li>Which parts of the research process do you find most frustrating or demanding?</li>
      <li>Have there been moments when progress felt particularly slow or uncertain?</li>
      <li>What kinds of obstacles (e.g., methodological, organizational, personal) affect your work the most?</li>
      <li>How do these challenges influence your motivation or day-to-day research activities?</li>
    </ul>`,
  },
],
  sample: {
    mode: "sequential", // draw-shuffle
    n: "2",
  },
});

const questionAnswering = new lab.html.Frame({
  context: `
<header>
   <h2>Answer the following question:</h2>
</header>
<main style="width: 100%;">
  <!-- this is where stimuli will be inserted -->
</main>
  `,
  contextSelector: "main",
  content: questionsLoop,
});



/* 
################### End of Study ###################
*/

// feedback screen general
const FeedbackScreen_htmlScreen = new lab.html.Form({
  title: "FeedbackScreen",
  content: textObj.feedbackQues,
  messageHandlers: {
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";

      if (typeof jatos.jQuery === "function") {
        // If JATOS is available, send data there
        var resultJson = study.options.datastore.exportJson();
        console.log("result data sent to JATOS");
        jatos
          .submitResultData(resultJson)
          .then(() => console.log("success"))
          .catch(() => console.log("error"));
      }
    },
  },
});

// ending screen
const EndingScreen_htmlScreen = new lab.html.Screen({
  title: "EndingScreen",
  tardy: true,
  content: `
  <header>
  <h2> Thank you very much for your participation ! </h2>
  </header>

  <main class="content-horizontal-center content-vertical-center">
  <div class="w-xl text-justify">
  <br>
  <div>
  <i id="cond_expert">The experiment will end in a few seconds and you will be automatically redirected back to Prolific.</i> 
  <br>
  <br>
  <br>
  If you have any questions, please contact the study director Julius Fenn (julius.fenn@psychologie.uni-freiburg.de).
  </div>
  </main>
  `,
  timeout: 9000, // 9 seconds
  messageHandlers: {
    run: function anonymous() {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";

      if (condExpert === true) {
        $("#cond_expert").html(
          "Thank you for participating in this study, the study will end in a few seconds automatically."
        );
      }

      // alert(numElementsCounter);
    },
    epilogue: function anonymous() {
      if (typeof jatos.jQuery === "function") {
        // If JATOS is available, send data there
        var resultJson = study.options.datastore.exportJson();
        console.log("my result data sent to JATOS final time");
        jatos
          .submitResultData(resultJson)
          .then(() => console.log("success"))
          .catch(() => console.log("error"));

        // then redirect
        if (
          study.options.datastore.extract("sender").includes("FeedbackScreen")
        ) {
          if (condExpert === true) {
            jatos.endStudy(true, "everything worked fine - expert condition");
          } else {
            jatos.endStudyAndRedirect(
              "https://app.prolific.com/submissions/complete?cc=CP2ZDXDH", // !!!
              true,
              "eeverything worked fine - layperson condition"
            );
          }
        } else {
          alert(
            "It seems that you did not go through the entire study because you did not see the previous feedback screen."
          );
          jatos.abortStudy("study aborted - copied submission link");
        }
      }
    },
  },
});

// Define the sequence of components that define the study
const study = new lab.flow.Sequence({
  metadata: {
    title:
      "Provide your study title here",
    description:
      "This online study examines XXX.",
    repository: "URL to repository",
    contributors:
      "template provided by Julius Fenn",
  },
  plugins: [
    new lab.plugins.Metadata(),
    // new lab.plugins.Fullscreen(),
    new lab.plugins.Debug(), // comment out finally
    // new lab.plugins.Download()
  ],
  content: [  
    // >>> introduction phase
    Greetings_htmlForm,

    InformCon_htmlForm,
    InformConsentNO_htmlForm,

   
    // >>> record audio phase
    TestAudio_htmlForm,
    questionAnswering,

    // >>> final screens
    FeedbackScreen_htmlScreen,
    EndingScreen_htmlScreen,
  ],
});

// Start the study
if (typeof jatos.jQuery === "function") {
  jatos.onLoad(() => study.run());
} else {
  study.run();
}
