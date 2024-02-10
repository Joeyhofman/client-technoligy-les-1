import { GDPR } from "./GDPR.js";

const gdpr = new GDPR();
console.log(gdpr.getCookieStatus());

document.addEventListener("DOMContentLoaded", function() {
    var accordionTriggers = document.querySelectorAll(".profile-content-accordion__trigger");
  
    accordionTriggers.forEach((trigger) => {
      trigger.addEventListener("click", (event) => {
        const targetId = trigger.dataset.target;
        const content = document.getElementById(targetId);
        
        if (content.style.height === '0px') {
          content.style.height = content.scrollHeight + 'px';
          trigger.setAttribute("aria-expanded", "true");
        } else {
            content.style.height = '0';
            trigger.setAttribute("aria-expanded", "false");
        }
      });
    });
  });