import { GDPR } from "./GDPR.js";
import { ProfileAccordion } from "./profile_accordion.js";


document.addEventListener("DOMContentLoaded", (e) => {
    new GDPR();
    new ProfileAccordion();
});