const textObj = {
  // ################### Start of Study ###################
  greetings: `
   <header>
   <div class="row">
   <div class="column2">
      <h3>Thank you for participating in a study by the Cognition, Action, and Sustainability Unit of the University of Freiburg! - in cooperation with:</h3>
      <p><strong>FRIAS</strong> (Freiburg Institute for Advanced Studies) and <strong>YAC</strong> (Young Academy for Cultures and Societies Research)</p>
   </div>
   <div class="column">
   <img src="src/static/UniFreiburg_logo.png" alt="UniFreiburg_logo" style="width:70%; max-height: 180px; max-width: 180px;">
   </div>
 </div> 
 </header>
 <main class="content-horizontal-center content-vertical-center">
   <div class="w-xl text-justify">

<div class="hint-box">
  <i>💡 Important note:</i>
  <p>You can enlarge or reduce the text and images at any time:</p>
   <ul>
    <li>
      <strong>Windows:</strong> Hold down the <kbd>Ctrl</kbd> key and move your mouse wheel
      or press the <kbd>+</kbd>/<kbd>-</kbd> key.
    </li>
    <li>
      <strong>Mac:</strong> Hold down the <kbd>⌘ command</kbd> key and move your mouse wheel
      or press the <kbd>+</kbd>/<kbd>-</kbd> key.
    </li>
  </ul>
</div>

       <br>     
       <section>
           With our research, we aim to get a better understanding of human behavior and mental processes. For this
           purpose, in the following study, your behavior will be measured (e.g., choices, reaction times, whether you left fullscreen).
       </section>
       <br>
       <section>
           The duration of the study is <b>approximately XXX minutes</b>. Please use a <strong>computer or
               laptop with a keyboard</strong> for the study. Please ensure that you can
           participate in the study without being disturbed. First of all, we would like to ask you to agree to the informed consent on the following page.
       </section>
   </div>
 </main>
 
 <form id="page-form">
 </form>
 
 <footer class="content-vertical-center content-horizontal-right">
   To continue the study, please press &nbsp;
   <button id="continue" type="submit" form="page-form">
       Continue &rarr;
   </button>
 </footer>
   `,
  informCon: `

<header>
  <h2>Informed Consent</h2>
</header>

<main class="content-horizontal-center content-vertical-center">
  <div class="w-xl text-justify">
 <p>Dear participant,</p>
    <p>Thank you for taking part in a study conducted by the Department of General Psychology at the University of Freiburg! Please read the information below carefully.</p>

    <p><b>Voluntariness.</b> Your participation in this study is <strong>voluntary</strong>. You may end this online study at any time without providing a reason and without experiencing any disadvantages. To do so, simply close the browser window. However, if you terminate the online study early, you will not be able to complete it and will therefore not be entitled to compensation.</p>
    <p>Participation in this online study <strong>does not involve any unusual burdens or risks</strong> for you. For participating in this study, you will receive the payment amount listed on Prolific.</p>


    <p><b>Anonymization and storage of the data.</b> The data collected as part of this online study will be <strong>fully anonymized</strong> during collection and storage. The collected data will be stored for at least 10 years. Since the data is collected anonymously, it is not possible to draw any conclusions about your identity. For this reason, however, we are also unable to identify your data set after collection, and therefore cannot delete your data. Even if you terminate the online study early, deletion of the data is not possible for the same reason.</p>


    <p><b>Publication of the collected data.</b> Your data will be used <strong>exclusively for scientific purposes</strong>. Any future publication of the data will be in fully anonymized form and also solely for scientific research purposes. The fully anonymized data will be made publicly available, for example, via the Open Science Framework (OSF) and/or GitHub.</p>

    <p><b>Responsibilities.</b> This study follows the <strong>recommendations of the German Research Foundation (DFG) and the German Psychological Society (DGPs)</strong> for ensuring quality and transparency in research.</p>
    <p>If you have any questions now or after the study, please contact the principal investigators Julius Fenn or Wilhelm Gros:</p>


    <p>
        <strong>Julius Fenn</strong><br>
        <a href="mailto:julius.fenn@psychologie.uni-freiburg.de">julius.fenn@psychologie.uni-freiburg.de</a> or <br>
        <strong>Wilhelm Gros</strong><br>
        <a href="mailto:wilhelm.gros@livmats.uni-freiburg.de">wilhelm.gros@livmats.uni-freiburg.de</a> <br>
        University of Freiburg<br>
        Institute of Psychology<br>
        Department of General Psychology<br>
        Engelbergerstrasse 41<br>
        79106 Freiburg, Germany
    </p>
    <br>
    <form id="page-form" style="display: block;" autocomplete="off">
      <div class="page-item page-item-radio" id="page-item-ques_dummycam">
        <p class="text-left font-weight-bold" style="margin: 1rem 0 0.25rem">
          Please select one of the following options:
        </p>
        <p class="small text-muted hide-if-empty" style="margin: 0.25rem 0">
          Refusal to give consent will end the study.
        </p>
        <table class="table-plain page-item-table">
          <colgroup>
            <col style="width: 7.5%">
            <col style="width: 92.5%">
          </colgroup>
          <tbody>
            <tr>
              <td>
                <input type="radio" name="dummy_informedconsent" value="1" id="dummy_informedconsent" required>
              </td>
              <td>
                <label for="dummy_informedconsent" class="text-left" style="font-size:26px">
                  I confirm that I have understood the above information and <strong>agree</strong> to participate in the study.
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <input type="radio" name="dummy_informedconsent" value="0" id="dummy_informedconsent2" required>
              </td>
              <td>
                <label for="dummy_informedconsent2" class="text-left" style="font-size:26px">
                  I confirm that I have understood the above information and <strong>do not agree</strong> to participate in the study.
                </label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>
  </div>
</main>

<footer class="content-vertical-center content-horizontal-right">
  <button id="continue" type="submit" form="page-form">
    Continue &rarr;
  </button>
</footer>
   `,
  informConNo: `
   <header></header>
   <main class="content-horizontal-center content-vertical-center">
   <div class="w-xl text-justify">
   <section>
       You have not agreed to the informed consent. Unfortunately, this means that the study is over for you. You can
       now close the screen. Press the <kbd>Esc</kbd> key to exit fullscreen mode. 
   </section>
 </div>
 </main>
   `,

  // feedback question
  feedbackQues: `
  <header>
    <h2>
    Please answer the following last question if you wish:
    </h2>
  </header>
  
  <main class="content-horizontal-center content-vertical-center" >
  <div class="w-xl">
    <form id="page-form" style="display: block;" autocomplete="off">
<!-- multiline text text --> 
<div class="page-item page-item-textarea" id="page-item-feedback_critic">
  <p class="text-left font-weight-bold" style="margin: 1rem 0 0.25rem">
  Do you have any feedback or criticism about the online study? 
  </p>
  <p class="text-left small text-muted hide-if-empty" style="margin: 0.25rem 0">
  Any criticism or suggestions for improvement will be of great help in improving future studies. 
  </p>
  <textarea name="feedback_critic" class="w-100" rows="8"></textarea>
</div>
<!-- END multiline text --> 
     
    </form>
  </div> 
</main>
  
  <footer class="content-vertical-center content-horizontal-right">
  <button id="continue" type="submit" form="page-form">
  Continue &rarr;
</button>
</footer>
  `,
    // ################### Record Audio ###################
 testAudio: `
<header>
   <h2>Test your microphone:</h2>
</header>

<main class="content-horizontal-center content-vertical-center">
   <div class="w-xl text-justify">
     <section>
       Use the recording button below (red dot) to test whether recording works. Please briefly listen to the recording. If you hear your voice, your microphone is working properly. You can repeat the process several times until you are sure that your microphone works. Then press <kbd>Continue</kbd> to proceed.
     </section>
         <section id="interface">
      <div id="controls">
        <button id="recBtn" disabled>&#x2B24;</button>
        <div id="clips"/>
        <i>Note: The audio recording will be displayed here after you have recorded something.</i>
      </div>
    </section>
    <br>
     <section>
<b>Note:</b> As soon as you click <kbd>Continue</kbd>, only your final recorded audio will be saved. All previous recordings will be deleted, giving you the opportunity to improve them. The audio recording does not have to be perfect; it is sufficient if, from your perspective, it contains the most important information related to the question.
     </section>
   </div>
</main>

<form id="page-form">
</form>

<footer class="content-vertical-center content-horizontal-right">
 You can only continue once you have recorded an audio recording:
   <button id="continue" type="submit" form="page-form">
      Continue &rarr;
   </button>
</footer>

  `,




  recordAudio: `
<main class="content-horizontal-center content-vertical-center">
   <div class="w-xl text-justify">
   <section>
   <div class="page-item page-item-likert">
  <div class="concept">
    <h2 id="question_title">XX1</h2>
    <p id="question_text">XX2</p>
  </div>
  </section>
     <section>
       Use the recording button below (red dot) to start the recording:
     </section>
         <section id="interface">
      <div id="controls">
        <button id="recBtn" disabled>&#x2B24;</button>
        <div id="clips"/>
        <i>Note: The audio recording will be displayed here after you have recorded something.</i>
      </div>
    </section>
    <br>
     <section>
<b>Note:</b> As soon as you click <kbd>Continue</kbd>, only your final recorded audio will be saved. All previous recordings will be deleted, giving you the opportunity to improve them. The audio recording does not have to be perfect; it is sufficient if, from your perspective, it contains the most important information related to the question.
     </section>
   </div>
</main>

<form id="page-form">
</form>

<footer class="content-vertical-center content-horizontal-right">
 You can only continue once you have recorded an audio recording:
   <button id="continue" type="submit" form="page-form">
      Continue &rarr;
   </button>
</footer>

  `,

  // Headphone Screening info
   hs_info: `
   <header>
   <h2>Testung Ton</h2>
   <p class="font-weight-bold">
   Sie <em>müssen</em> während der Studie Ton wahrnehmen können!
 </p>
 </header>
 
 
 
 <main class="content-horizontal-center content-vertical-center">
   <div class="w-l text-justify">
       <section>
       Wenn Sie noch keine Kopfhörer tragen, bitte ziehen Sie welche an, bevor Sie fortfahren bzw. stellen Sie sicher, dass ihre Computerlautsprecher eingeschaltet sind.
       </section>
       <br>
       <section>
       Wir werden nun kurz testen, ob Sie Ton wahrnehmen können. Führen Sie bitte folgende Schritte aus:
       </section>
       <ol>
       <li><strong>Stellen Sie die Lautstärke Ihres Computers auf etwa 25%</strong> seines maximalen Niveaus ein.</li>
       <li><a id="hs_calibration" href="#" onclick="playAudio();">Klicken Sie hier</a>, um einen Kalibrierungston zu hören. <strong>Erhöhen Sie die Lautstärke Ihres Computers, bis der Kalibrierungston laut, aber angenehm ist.</strong> Sie können ihn so oft wie nötig anhören.</li>
     </ol>
     <p>Klicken Sie auf "Weiter", sobald Sie die Lautstärke des Computers auf ein lautes, aber angenehmes Niveau eingestellt haben</p>
   </div>
 </main>
 
 <form id="page-form">
 </form>
 
 <footer class="content-vertical-center content-horizontal-right">
   <button id="continue" type="submit" form="page-form">
       Weiter &rarr;
   </button>
 </footer>
   `,
   hs_task: `
   <header>
   <h2>Testung Ton</h2>
 </header>
 
 
 
 <main class="content-horizontal-center content-vertical-center">
   <div class="w-l text-justify">
       <section>
       Im Folgenden hören Sie mehrere Sequenzen aus jeweils zwei Tönen, getrennt durch Stille. <strong>Ihre Aufgabe ist es zu beurteilen, welcher dieser Töne der leiseste oder sanfteste war.</strong>
       </section>
       <br>
       <section>
       Wir werden Sie nach jeder Sequenz aus zwei Tönen um Ihr Urteil bitten. <strong>Die Töne werden nur einmal abgespielt</strong>, daher bitten wir Sie, genau zuzuhören.
        </section>
 
     <p>Klicken Sie auf "Weiter", um mit der Aufgabe zu beginnen.</p>
   </div>
 </main>
 
 <form id="page-form">
 </form>
 
 <footer class="content-vertical-center content-horizontal-right">
   <button id="continue" type="submit" form="page-form">
       Weiter &rarr;
   </button>
 </footer>
   `,
   hs_sound: `
   <header>
   <h2>Bitte hören Sie genau auf die Töne</h2>
 </header>
 
 
 <main class="content-horizontal-center content-vertical-center" style="height:300px;">
 </main>


 <footer class="content-vertical-center content-horizontal-center">
 Die Studie wird automatisch fortgesetzt
 </footer>
   `,
   hs_judgement: `
   <header>
   </header>
 
 
 <main class="content-horizontal-center content-vertical-center">
 <div>
 <p class="font-weight-bold">Welcher der zwei Töne war der leiseste (ruhigste)?</p>
 <div>
   <button
     id="choice-1"
     style="
       font-size: 64px;
       width: 140px;
       height: 150px;
       border-radius: 6px;
       margin: 12px;
     "
   >
     1
   </button>
   <button
     id="choice-2"
     style="
       font-size: 64px;
       width: 140px;
       height: 150px;
       border-radius: 6px;
       margin: 12px;
     "
   >
     2
   </button>
 </div>
 </main>
 
 <footer class="content-vertical-center content-horizontal-center">
Treffen Sie eine Entscheidung, um die Studie fortzusetzen.
 </footer>
   `,
   hs_trap: `
   <header></header>
   <main class="content-horizontal-center content-vertical-center">
   <div class="w-l text-justify">
   <section>
   Ihr System bietet nicht die erforderliche Audioqualität, um diese Studie abzuschließen. Leider bedeutet das, dass die Studie für Sie beendet ist. Sie können
       jetzt den Bildschirm schließen. Drücken Sie die <kbd>Esc</kbd>-Taste, um den Vollbildmodus zu beenden.
   </section>
   </div>
   </main>   
   `,

};
