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

const ExclusionCriteria_htmlForm = new lab.html.Form({
  title: "ExclusionCriteria",
  content: textObj.exclusionCriteria,
  tardy: true,
  skip: "${ condExpert == true}",
  messageHandlers: {
    run: function anonymous() { },
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});

// function for Attention Check
function continueornot() {
  if ($("fieldset :checkbox:checked").length > 0) {
    // ok
    return true;
  } else {
    alert("Please check at least one of these activities.");
    return false;
  }
}

const AttentionCheck_htmlForm = new lab.html.Form({
  title: "AttentionCheck",
  content: textObj.attentionCheck,
  tardy: true,
  skip: "${ condExpert == true}",
  messageHandlers: {
    run: function anonymous() { },
    commit: () => {
      var attCheck_array = [];
      $("fieldset :checkbox").each(function () {
        if (this.checked) {
          attCheck_array.push(this.id);
        }
      });
      attCheck_array;

      study.options.datastore.set("attCheck_array", attCheck_array);
      study.options.datastore.set(
        "attCheck_text",
        $("#attCheck_OtherText").val()
      );

      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});

const SetupStudy_htmlForm = new lab.html.Form({
  title: "SetupStudy",
  content: textObj.setupStudy,
  messageHandlers: {
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";

      if (typeof jatos.jQuery === "function") {
        // If JATOS is available, send data there
        var resultJson = study.options.datastore.exportJson();
        console.log("result data sent to JATOS second time");
        jatos
          .submitResultData(resultJson)
          .then(() => console.log("success"))
          .catch(() => console.log("error"));
      }
    },
  },
});




/* 
################### Reflection on Sustainability ###################
*/

const SustainabilityReflection_htmlForm = new lab.html.Form({
  title: "SustainabilityReflection",
  content: textObj.sustainabilityReflection,
  messageHandlers: {
    run: () => {
      const pillars = [
        {
          key: "ecological",
          title: "Ecological sustainability",
          text: `The ecological aspect of sustainability concerns the preservation of ecosystems, biodiversity, and climate stability to maintain Earth’s life-support systems. It seeks to minimize environmental degradation, protect natural habitats, and ensure the long-term resilience of planetary ecological processes.`,
          name: "reflection_ecological",
        },
        {
          key: "social",
          title: "Social sustainability",
          text: `The social aspect of sustainability concerns the equitable well-being and development of all people within safe ecological limits. It emphasizes social justice, health, education, equality, and inclusion to foster cohesive, resilient, and peaceful societies.`,
          name: "reflection_social",
        },
        {
          key: "economic",
          title: "Economic sustainability",
          text: `The economic aspect of sustainability concerns the pursuit of prosperity and productivity within ecological and social boundaries. It promotes efficient resource use, innovation, decent employment, and equitable growth to support long-term economic resilience and stability.`,
          name: "reflection_economic",
        },
      ];

      // Randomize order (Fisher–Yates shuffle)
      for (let i = pillars.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pillars[i], pillars[j]] = [pillars[j], pillars[i]];
      }

      // Render randomized pillars into container
      pillars.forEach((p) => {
        $("#sustainability-container").append(`
      <div class="pillar-block" style="margin-bottom: 3rem;">
         <p class="font-weight-bold" style="font-size: 28px; text-decoration: underline;">
          ${p.title}
        </p>
        <p>${p.text}</p>
   <textarea class="w-100" rows="8" name="${p.name}"
  style="font-size: 20px; line-height: 1.4;"
  placeholder="Please write your reflection here..." required></textarea>

      </div>
    `);
      });

      let remaining = 180;
      const btn = $("#continue")[0];
      btn.disabled = true;

      const interval = setInterval(() => {
        remaining--;
        if (remaining <= 0) {
          btn.disabled = false;
          btn.innerHTML = "Continue →";
          clearInterval(interval);
        } else {
          btn.innerHTML = `Please continue reflecting for ${remaining} more seconds…`;
        }
      }, 1000);
    },

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



/* 
################### Brainstorm Applications ###################
*/
// Transition from AIT to survey scales
const TransitionToBrainstorming_htmlForm = new lab.html.Form({
  title: "TransitionToBrainstorming",
  content: textObj.TransitionToBrainstorming,
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

// Global container for the collected scenarios
let scenarioArray = [];

const ScenarioList_htmlScreen = new lab.html.Form({
  title: "Task 3 – Application Cases",
  content: `
<header>
  <h2>Brainstorm Possible Applications Cases</h2>
</header>

<main class="content-horizontal-center content-vertical-center">
  <div class="w-xl text-justify">

    <p>
Please list possible application cases for the Soft Robot Walker. Consider any potential uses that come to mind, whether they are practical, speculative, or innovative.
      <br><br>
      Enter one scenario at a time and press <strong>"Add"</strong>. You may edit or delete entries later.
      Please list <strong>at least four applications</strong> before continuing.
    </p>

    <input type="text" id="new-scenario-input" class="w-100" style="height:60px;" placeholder="Enter an application scenario">
    <button id="add-scenario-btn">Add</button>
    <ul id="scenario-list" style="display:none;"></ul>

  </div>
</main>

<form id="page-form"></form>

<footer class="content-vertical-center content-horizontal-right">
  <span>Please provide at least four application cases before continuing:</span>&nbsp;
  <button id="continue" type="submit" form="page-form" style="display:none;">
    Continue &rarr;
  </button>
</footer>
`,
  messageHandlers: {
    run() {
      $(document).ready(function () {
        function addScenario(text) {
          const exists =
            $("#scenario-list .scenario-text").filter(function () {
              return $(this).text().trim().toLowerCase() === text.toLowerCase();
            }).length > 0;

          if (exists) {
            alert("This scenario already exists in your list.");
            return;
          }

          const listItem = $('<li class="scenario-item"></li>');
          const symbol = $('<span class="list-symbol">•</span>');
          const scenarioText = $('<span class="scenario-text"></span>').text(
            text
          );
          const editButton = $('<button class="edit-btn">Edit</button>');
          const deleteButton = $('<button class="delete-btn">Delete</button>');

          listItem.append(symbol, scenarioText, editButton, deleteButton);
          $("#scenario-list").append(listItem);
        }

        $("#add-scenario-btn").on("click", function () {
          const scenarioText = $("#new-scenario-input").val().trim();
          if (scenarioText) {
            addScenario(scenarioText);
            $("#new-scenario-input").val("");
            $("#scenario-list").fadeIn();

            if ($("#scenario-list .scenario-text").length >= 4) {
              $("#continue").fadeIn();
            }
          } else {
            alert("Please enter an application scenario.");
          }
        });

        $("#scenario-list").on("click", ".edit-btn", function () {
          const item = $(this).closest(".scenario-item");
          const oldText = item.find(".scenario-text").text();
          const newText = prompt("Edit scenario:", oldText);

          if (newText && newText.trim()) {
            const exists =
              $("#scenario-list .scenario-text").filter(function () {
                return (
                  $(this).text().trim().toLowerCase() === newText.toLowerCase()
                );
              }).length > 0;

            if (exists) {
              alert("This scenario already exists.");
            } else {
              item.find(".scenario-text").text(newText);
            }
          }
        });

        $("#scenario-list").on("click", ".delete-btn", function () {
          $(this).closest(".scenario-item").remove();

          if ($("#scenario-list .scenario-text").length < 4) {
            $("#continue").fadeOut();
          }
        });
      });
    },
    commit() {
      scenarioArray = $("#scenario-list .scenario-text")
        .map(function () {
          return $(this).text();
        })
        .get();

      console.log("Scenarios:", scenarioArray);

      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});

const ScenarioRating_htmlScreen = new lab.html.Form({
  title: "Task 4 – Rate Application Relevance",
  content: `
<header>
  <h2>Relevance of Application Scenarios</h2>
</header>

<main class="content-horizontal-center content-vertical-center">
  <div class="w-xl text-justify">

    <p>
      Below are the application scenarios you listed in the previous task.
      Please rate how important or relevant you consider each scenario to be for the Soft Robot Walker.
      Use the following scale:
      <br><br>
<strong style="white-space: nowrap;">
  0 = Not important &nbsp;&nbsp;|&nbsp;&nbsp; 1 = Somewhat important &nbsp;&nbsp;|&nbsp;&nbsp; 2 = Highly important
</strong>

</p>

    <ul id="scenario-rating-list" style="display:none;"></ul>

  </div>
</main>

<form id="page-form"></form>

<footer class="content-vertical-center content-horizontal-right">
  <span>Please rate all scenarios before continuing:</span>&nbsp;
  <button id="continue" type="submit" form="page-form" style="display:none;">
    Continue &rarr;
  </button>
</footer>
`,
  messageHandlers: {
    run() {
      $(document).ready(function () {
        if (scenarioArray.length === 0) {
          console.warn("No scenarios listed — skipping Task 4.");
          $("#continue").fadeIn();
          $("#scenario-rating-list").hide();
          return;
        }

        function addScenarioRating(text) {
          const item = $('<li class="rating-item"></li>');
          const label = $('<span class="scenario-rating-text"></span>').text(
            text
          );

          const ratings = $(`
            <div class="rating-options">
              <input type="radio" name="rating-${text}" value="0" id="rating-${text}-0">
              <label for="rating-${text}-0">0</label>

              <input type="radio" name="rating-${text}" value="1" id="rating-${text}-1">
              <label for="rating-${text}-1">1</label>

              <input type="radio" name="rating-${text}" value="2" id="rating-${text}-2">
              <label for="rating-${text}-2">2</label>
            </div>
          `);

          item.append(label, ratings);
          $("#scenario-rating-list").append(item);
        }

        scenarioArray.forEach(addScenarioRating);

        $("#scenario-rating-list").fadeIn();

        function checkCompletion() {
          const rated = $(
            "#scenario-rating-list .rating-options input[type=radio]:checked"
          ).length;
          if (rated === scenarioArray.length) $("#continue").fadeIn();
          else $("#continue").fadeOut();
        }

        $("#scenario-rating-list").on(
          "change",
          "input[type=radio]",
          checkCompletion
        );
      });
    },
    commit() {
      const ratings = $("#scenario-rating-list .rating-item")
        .map(function () {
          const text = $(this).find(".scenario-rating-text").text();
          const rating = $(this).find("input[type=radio]:checked").val();
          return { scenario: text, relevance: rating ?? "unrated" };
        })
        .get();

      console.log("Relevance ratings:", ratings);

      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});


/* 
################### Survey Scales ###################
*/
// >>>  General Attitudes Towards Robots Scale (GAToRS)
const LikertGAToRS1_htmlForm = new lab.html.Page({
  title: "GAToRS 1",
  items: [
    {
      required: Required_Testing,
      type: "likert",
      items: items_Koverola.slice(0, 7),
      width: "7",
      anchors: [
        "Strongly disagree",
        "Disagree",
        "Somewhat disagree",
        "Neutral",
        "Somewhat agree",
        "Agree",
        "Strongly agree",
      ],
      label:
        "Please read the following statements and indicate the extent to which you agree with each statement.",
      help: "Please answer each statement, even if you are not completely sure how to respond.",
      shuffle: false,
      name: "GAToRS",
    },
  ],
  submitButtonText: "Continue →",
  submitButtonPosition: "right",
  width: "l",
  messageHandlers: {
    run: function anonymous() {
      // adjust size of scale
      document.querySelectorAll("div")[0].classList = ["text-left"];
      document.querySelectorAll("main")[1].classList = ["w-xl"];
      document.querySelectorAll(".page-item-table colgroup")[0].innerHTML = `
     <col style=\"width: 55%\">
     <col style=\"width: 5%\">
     <col style=\"width: 5%\">
     <col style=\"width: 10%\">
     <col style=\"width: 5%\">
     <col style=\"width: 5%\">
     <col style=\"width: 5%\">
     <col style=\"width: 15%\">
     `;
      // sticky labels to front
      $("thead").first().css("z-index", "20");
      // collect paradata
      paracountclicks = 0;
      document.querySelectorAll("input").forEach((item) => {
        item.addEventListener("click", (event) => {
          paracountclicks++;
          console.log("input clicked", paracountclicks);
        });
      });
    },
    end: function anonymous() {
      // collect paradata
      let numberitems = document.querySelectorAll("tbody tr").length;
      paracountclicks -= numberitems;
      study.options.datastore.set("para_countclicks", paracountclicks);
    },
    commit: function anonymous() {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});

const LikertGAToRS2_htmlForm = new lab.html.Page({
  title: "GAToRS 2",
  items: [
    {
      required: Required_Testing,
      type: "likert",
      items: items_Koverola.slice(7, 14),
      width: "7",
      anchors: [
        "Strongly disagree",
        "Disagree",
        "Somewhat disagree",
        "Neutral",
        "Somewhat agree",
        "Agree",
        "Strongly agree",
      ],
      label:
        "Please read the following statements and indicate the extent to which you agree with each statement.",
      help: "Please answer each statement, even if you are not completely sure how to respond.",
      shuffle: false,
      name: "GAToRS",
    },
  ],
  submitButtonText: "Continue →",
  submitButtonPosition: "right",
  width: "l",
  messageHandlers: {
    run: function anonymous() {
      // adjust size of scale
      document.querySelectorAll("div")[0].classList = ["text-left"];
      document.querySelectorAll("main")[1].classList = ["w-xl"];
      document.querySelectorAll(".page-item-table colgroup")[0].innerHTML = `
     <col style=\"width: 55%\">
     <col style=\"width: 5%\">
     <col style=\"width: 5%\">
     <col style=\"width: 10%\">
     <col style=\"width: 5%\">
     <col style=\"width: 5%\">
     <col style=\"width: 5%\">
     <col style=\"width: 15%\">
     `;
      // sticky labels to front
      $("thead").first().css("z-index", "20");
      // collect paradata
      paracountclicks = 0;
      document.querySelectorAll("input").forEach((item) => {
        item.addEventListener("click", (event) => {
          paracountclicks++;
          console.log("input clicked", paracountclicks);
        });
      });
    },
    end: function anonymous() {
      // collect paradata
      let numberitems = document.querySelectorAll("tbody tr").length;
      paracountclicks -= numberitems;
      study.options.datastore.set("para_countclicks", paracountclicks);
    },
    commit: function anonymous() {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});

const LikertGAToRS3_htmlForm = new lab.html.Page({
  title: "GAToRS 3",
  items: [
    {
      required: Required_Testing,
      type: "likert",
      items: items_Koverola.slice(14, 20),
      width: "7",
      anchors: [
        "Strongly disagree",
        "Disagree",
        "Somewhat disagree",
        "Neutral",
        "Somewhat agree",
        "Agree",
        "Strongly agree",
      ],
      label:
        "Please read the following statements and indicate the extent to which you agree with each statement.",
      help: "Please answer each statement, even if you are not completely sure how to respond.",
      shuffle: false,
      name: "GAToRS",
    },
  ],
  submitButtonText: "Continue →",
  submitButtonPosition: "right",
  width: "l",
  messageHandlers: {
    run: function anonymous() {
      // adjust size of scale
      document.querySelectorAll("div")[0].classList = ["text-left"];
      document.querySelectorAll("main")[1].classList = ["w-xl"];
      document.querySelectorAll(".page-item-table colgroup")[0].innerHTML = `
     <col style=\"width: 55%\">
     <col style=\"width: 5%\">
     <col style=\"width: 5%\">
     <col style=\"width: 10%\">
     <col style=\"width: 5%\">
     <col style=\"width: 5%\">
     <col style=\"width: 5%\">
     <col style=\"width: 15%\">
     `;
      // sticky labels to front
      $("thead").first().css("z-index", "20");
      // collect paradata
      paracountclicks = 0;
      document.querySelectorAll("input").forEach((item) => {
        item.addEventListener("click", (event) => {
          paracountclicks++;
          console.log("input clicked", paracountclicks);
        });
      });
    },
    end: function anonymous() {
      // collect paradata
      let numberitems = document.querySelectorAll("tbody tr").length;
      paracountclicks -= numberitems;
      study.options.datastore.set("para_countclicks", paracountclicks);
    },
    commit: function anonymous() {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});

const GAToRS_sequence = new lab.flow.Sequence({
  title: "GAToRS Sequence",
  shuffle: false,
  content: [
    LikertGAToRS1_htmlForm,
    LikertGAToRS2_htmlForm,
    LikertGAToRS3_htmlForm,
  ],
});






/* 
################### Brainstorm and Rate Application Scenartios ###################
*/

/* 
################### End of Study ###################
*/

/* 
################### Evaluate Information ###################
*/
// Transition from AIT to survey scales
const TransitionToEvaluation_htmlForm = new lab.html.Form({
  title: "TransitionToEvaluation",
  content: textObj.TransitionToEvaluation,
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

/* 
################### End of Study ###################
*/
// Transition to survey scales
const TransitionToFinal_htmlForm = new lab.html.Form({
  title: "TransitionToFinal",
  content: textObj.TransitionToFinal,
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


// socio demographic questions
const SocioDemo_htmlScreen = new lab.html.Form({
  title: "socio demographic questions",
  content: textObj.socioDemo,
  messageHandlers: {
    run: () => {
      // Show/hide field based on university question
      $("#university_affiliation").on("change", function () {
        if ($(this).val() === "yes") {
          $("#university_field_row").show();
          $("#university_field").prop("required", true);
        } else {
          $("#university_field_row").hide();
          $("#university_field").prop("required", false).val("");
        }
      });

      // Country autocomplete (your existing code)
      $(document).ready(function () {
        let countries = [];
        $("#country option").each(function () {
          let countryName = $(this).text().trim();

          if (countryName !== "- Please select -") {
            countries.push(countryName);
          }
        });

        // console.log("countries:", countries);

        $("#autocomplete-country").autocomplete({
          source: countries,
          select: function (event, ui) {
            $("#country option")
              .filter(function () {
                return $(this).text() === ui.item.value;
              })
              .prop("selected", true);
          },
        });
      });
    },
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});

// feedback screen conscientious completion
const ConscientiousCompletion_htmlScreen = new lab.html.Form({
  title: "ConscientiousCompletion",
  content: textObj.ConscientiousCompletion,
  tardy: true,
  skip: "${ condExpert == true}",
  messageHandlers: {
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});

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
        ScenarioList_htmlScreen,
    ScenarioRating_htmlScreen,

    
    // >>> introduction phase
    Greetings_htmlForm,

    InformCon_htmlForm,
    InformConsentNO_htmlForm,

    ExclusionCriteria_htmlForm, // not shown to experts
    AttentionCheck_htmlForm, // not shown to experts
    SetupStudy_htmlForm,


    // >>> main study- evaluate sustainability (3 pillars)
    SustainabilityReflection_htmlForm,

    // >>> main study- brainstorming
    TransitionToBrainstorming_htmlForm,
    ScenarioList_htmlScreen,
    ScenarioRating_htmlScreen,

    // >>> main study- survey scales
    TransitionToFinal_htmlForm,
    GAToRS_sequence, // survey scale

    // >>> ending phase - socio-demographic questions
    SocioDemo_htmlScreen,

    // >>> ending phase - final
    ConscientiousCompletion_htmlScreen, // not shown to experts

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
