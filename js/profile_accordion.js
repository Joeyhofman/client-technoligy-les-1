class ProfileAccordion {
    constructor() {
        this.accordionTriggers = document.querySelectorAll(".profile-content-accordion__trigger");
        this.#bindClickListeners();
    }

    /**
     * Binds the necessary events for the accordion to function
     */
    #bindClickListeners(){
        this.accordionTriggers.forEach((trigger) => {
            trigger.addEventListener("click", this.#handleTriggerClicked.bind(this));
        });
    }

    /**
     * Handles the clicking of an accordion item
     * @param {MouseEvent} event the click event object
     */
    #handleTriggerClicked(event){
        const trigger = event.currentTarget;
        const targetId = trigger.dataset.target;
        const content = document.getElementById(targetId);
        
        if (this.#accordionItemIsOpen(content)) {
            this.#closeAccorionItem(trigger, content);
        } else {
            this.#openAccorionItem(trigger, content);
        }
    }

    /**
     * Closes a accordion item.
     * @param {HTMLElement} trigger the clickable element that toggles the accordion getItem.
     * @param {HTMLElement} content The content being triggerd by the trigger.
     */
    #closeAccorionItem(trigger, content){
        content.style.height = '0';
        trigger.setAttribute("aria-expanded", "false");
        content.setAttribute("aria-hidden", "true");
    }
    
    
    /**
     * Opens a accordion item.
     * @param {HTMLElement} trigger the clickable element that toggles the accordion getItem.
     * @param {HTMLElement} content The content being triggerd by the trigger.
     */
    #openAccorionItem(trigger, content){
        content.style.height = content.scrollHeight + 'px';
        trigger.setAttribute("aria-expanded", "true");
        content.removeAttribute("aria-hidden", "false");
    }

    /**
     * checks whether a accordion item is open.
     * @param {HTMLElement} content the accordion content of the item you're performing the check against
     * @returns Boolean
     */
    #accordionItemIsOpen(content){
        return content.style.height !== '0px';
    }
}

export {
    ProfileAccordion,
}