# Resources Program Online Studies

❗**Note:** This document will be continously updated.❗

**Author:** Julius Fenn ([julius.fenn@psychologie.uni-freiburg.de](mailto:julius.fenn@psychologie.uni-freiburg.de))

---

## Scope of This README

This resource collection is intended for:

* Students and researchers who want to **program online studies**
* Learning **experiment builders**, **web technologies**, and **study deployment workflows**
* Understanding the technical foundations behind browser-based experiments

The emphasis is on **lab.js**, **web fundamentals**, and **practical tooling** used in online behavioral research.

---

## Conceptual Overview: Programming Online Studies

Programming online studies typically involves:

1. **Designing the study logic** (trial structure, randomization, conditions)
2. **Implementing the study in the browser** (using building blocks of webpages: HTML, CSS, JavaScript)
3. **Running the study on a server** (e.g., JATOS)
4. **Collecting and storing data securely**


## Practical Note

A common workflow is:

* Build the study in **lab.js**
* Export it
* Deploy it as a **multi-component study** in JATOS

---

## Core Tool: programming studies using lab.js

### What is lab.js?

**lab.js** is a free, open-source, browser-based study builder for behavioral experiments.

**Key features:**

* Graphical builder + code-based editing
* Runs entirely in the browser
* Supports randomization, loops, conditions, and timelines
* Exports studies compatible with JATOS and other platforms

### Key Reference

* Henninger, F., Shevchenko, Y., Mertens, U. K., Kieslich, P. J., & Hilbig, B. E. (2022). lab.js: A free, open, online study builder. Behavior Research Methods, 54(2), 556–573. https://doi.org/10.3758/s13428-019-01283-5


### Documentation

* lab.js documentation: [https://labjs.readthedocs.org/](https://labjs.readthedocs.org/)

---

## Core Took: host studies and store data using JATOS

### What is JATOS?

**JATOS (Just Another Tool for Online Studies)** is a server application for hosting, running, and managing online studies. It is especially well suited for complex experimental designs that require multiple components, conditional flows, and robust data handling.

**Key features:**

* Web-based study hosting
* Secure data storage
* Participant and session management
* Flexible study logic via JavaScript
* Tight integration with lab.js and custom JavaScript studies


### Key Resources

* JATOS overview: [https://www.jatos.org/Whats-JATOS.html](https://www.jatos.org/Whats-JATOS.html)
* Simple multi-component studies (e.g., consent → task → questionnaire): [https://www.jatos.org/Write-your-own-Study-Basics-and-Beyond.html](https://www.jatos.org/Write-your-own-Study-Basics-and-Beyond.html)

---

## Local Development Tools

### Live Server

For local testing of studies in the browser:

* Use **Live Server** (e.g., VS Code extension)
* Enables automatic reload when files change

This is especially useful when modifying:

* `index.html`
* `study.js`

---
---

## Web Programming Fundamentals (Essential)

To understand and customize online studies, basic web development skills are essential.

### Core Technologies

* **HTML** – structure of the study pages
* **CSS** – layout and visual design
* **JavaScript** – logic, interaction, timing

### Free Learning Resources

* freeCodeCamp (Web fundamentals):
  [https://www.freecodecamp.org/](https://www.freecodecamp.org/)
* Responsive Web Design (freeCodeCamp):
  [https://www.freecodecamp.org/learn/2022/responsive-web-design/](https://www.freecodecamp.org/learn/2022/responsive-web-design/)
* *Eloquent JavaScript* (book):
  [https://eloquentjavascript.net/](https://eloquentjavascript.net/)
* Codecademy (interactive courses):
  [https://www.codecademy.com/catalog](https://www.codecademy.com/catalog)


---

## Learning by Reading and Explaining Code

A highly effective strategy is to:

* Inspect exported lab.js files in VisualStudioCode
* Let tools like ChatGPT explain the code step by step

### Suggested Prompt

> *Explain in simple words the following file step by step. The study was programmed using lab.js.*

Apply this to:

* `study.js`


---
---


## Supporting Tools for Surveys

### SoSci Survey

A platform for online surveys, often combined with experimental tools.

* Tutorial videos: [https://www.soscisurvey.de/de/screencast](https://www.soscisurvey.de/de/screencast)

---

## Recommended Learning Order (Minimal Path)

1. Understand the **idea of online studies** (browser-based execution)
2. Learn **basic HTML, CSS, JavaScript**
3. Explore **lab.js** (builder + code view)
4. Test studies locally with **Live Server**
5. Deploy studies using **JATOS**
6. (Optional) Learn Git for version control, see

---

## License & Contributions

This is a living document. Suggestions and extensions are welcome—please contact the author via email.