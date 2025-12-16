/* 
Survey Scales: 
*/

/*
Use the modern version of the Fisher–Yates shuffle algorithm:
https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
*/
function shuffle(queslist) {
  let array_emp = [];
  for (var i = 0; i < queslist.ques.length; i++) {
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

function createitems(queslist, quesindex) {
  let quesitems = [];
  for (i = 0; i < queslist.ques.length; i++) {
    let tmp_ques = queslist.ques[quesindex[i]];
    let tmp_label = queslist.scale[quesindex[i]];

    quesitems.push({
      label: tmp_ques,
      coding: tmp_label,
    });
  }
  return quesitems;
}


/* items Koverola 2022 */
let KoverolaList = {
  ques: [
    "I can trust persons and organizations related to development of robots.",
    "Persons and organizations related to development of robots will consider the needs, thoughts and feelings of their users.",
    "I can trust a robot.",
    "I would feel relaxed talking with a robot.",
    "If robots had emotions, I would be able to befriend them.",
    "I would feel uneasy if I was given a job where I had to use robots.",
    "I fear that a robot would not understand my commands.",
    "Robots scare me.",
    "I would feel very nervous just being around a robot.",
    "I don’t want a robot to touch me.",
    "Robots are necessary because they can do jobs that are too hard or too dangerous for people.",
    "Robots can make life easier.",
    "Assigning routine tasks to robots lets people do more meaningful tasks.",
    "Dangerous tasks should primarily be given to robots.",
    "Robots are a good thing for society, because they help people.",
    "Robots may make us even lazier.",
    "Widespread use of robots is going to take away jobs from people.",
    "I am afraid that robots will encourage less interaction between humans.",
    "Robotics is one of the areas of technology that needs to be closely monitored.",
    "Unregulated use of robotics can lead to societal upheavals.",
  ],
  scale: [
    "1pp",
    "2pp",
    "3pp",
    "4pp",
    "5pp",
    "1pn",
    "2pn",
    "3pn",
    "4pn",
    "5pn",
    "1sp",
    "2sp",
    "3sp",
    "4sp",
    "5sp",
    "1sn",
    "2sn",
    "3sn",
    "4sn",
    "5sn",
  ],
};

var index_KoverolaList = shuffle(KoverolaList);
console.log("KoverolaList: ", KoverolaList);
console.log("KoverolaList index: ", index_KoverolaList);

var items_Koverola = createitems(KoverolaList, index_KoverolaList);
console.log(items_Koverola.slice(0, 4));