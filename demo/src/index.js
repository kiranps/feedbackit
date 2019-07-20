import feedbackit from "../../src/";

feedbackit.init({
  onSave: function(image) {
    console.log(image);
  }
});

const clickEvent = new MouseEvent("click", {
  view: window,
  bubbles: true,
  cancelable: false
});

const feedbackButton = Array.from(document.querySelectorAll("div")).find(
  el => el.textContent === "Send Feedback"
);

feedbackButton.firstElementChild.dispatchEvent(clickEvent);
