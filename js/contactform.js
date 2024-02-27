
class ContactForm {

    constructor() {
        this.contactForm = document.getElementById("contact-form");
        this.firstNameField = document.getElementById("first_name");
        this.lastNameField = document.getElementById("last_name");
        this.phoneNumberField = document.getElementById("phone_number");
        this.emailField = document.getElementById("email");
        this.subjectField = document.getElementById("subject");
        this.messageField = document.getElementById("message");
        this.resetButton = document.getElementById("resetButton");
        this.submitButton = document.getElementById("submitButton");

        this.firstNameErrors = document.getElementById("first-name-errors");
        this.lastNameErrors = document.getElementById("last-name-errors");
        this.phoneNumberErrors = document.getElementById("phone-number-errors");
        this.emailErrors = document.getElementById("email-errors");
        this.subjectErrors = document.getElementById("subject-errors");
        this.messageErrors = document.getElementById("message-errors");

        this.successMessage = document.getElementById('successMessage');
        this.spinnerSpan = document.getElementById("spinner");

        this.SUCCESS_FLASH_MESSAGE_IN_SECONDS = 7;

        
        this.#bindEventListeners();
        this.#setSubmitButtonEnabled(false);
    }

    #bindEventListeners(){
        this.contactForm.addEventListener("submit", this.#handleSubmitEvent.bind(this));
        this.resetButton.addEventListener("click", this.#handleResetForm.bind(this));
        
        this.firstNameField.addEventListener("input", (e) => {
            this.#setSubmitButtonEnabled(this.#formValid());
            this.#validateInput(e, "voornaam", this.firstNameErrors);
        });
        this.lastNameField.addEventListener("input", (e) => {
            this.#setSubmitButtonEnabled(this.#formValid());
            this.#validateInput(e, "achternaam", this.lastNameErrors)
        });
        this.phoneNumberField.addEventListener("input", (e) => {
            this.#setSubmitButtonEnabled(this.#formValid());
            this.#validateInput(e, "telefoonnummer", this.phoneNumberErrors);
        });
        this.emailField.addEventListener("input", (e) => {
            this.#setSubmitButtonEnabled(this.#formValid());
            this.#validateInput(e, "emailadres", this.emailErrors)
        });
        this.subjectField.addEventListener("input", (e) => {
            this.#setSubmitButtonEnabled(this.#formValid());
            this.#validateInput(e, "onderwerp", this.subjectErrors)
        });
        this.messageField.addEventListener("input", (e) => {
            this.#setSubmitButtonEnabled(this.#formValid());
            this.#validateInput(e, "bericht", this.messageErrors)
        });
    }

    #formValid(){
        return this.contactForm.checkValidity();
    }

    #setSpinnerEnabled(enabled){
        if(enabled) {
            this.spinnerSpan.classList.add("spinner-active");
        }else{
            this.spinnerSpan.classList.remove("spinner-active");
        }
    }

    #setSubmitButtonEnabled(enabled) {
        if (enabled) {
            this.submitButton.removeAttribute("disabled");
        } else {
            this.submitButton.setAttribute("disabled", "");
        }
    }
    

    #validateInput(e, fieldName, errorSpan){
        if (!e.target.validity.valid) {
            if (e.target.validity.valueMissing) {
                errorSpan.textContent = `${fieldName} is verplicht.`;
            } else if (e.target.validity.tooShort) {
                const minLength = e.target.minLength;
                errorSpan.textContent = `${fieldName} moet minimaal ${minLength} tekens bevatten.`;
            } else if (e.target.validity.tooLong) {
                const maxLength = e.target.data.maxLength;
                errorSpan.textContent = `${fieldName} mag niet langer zijn dan ${maxLength} tekens.`;
            }else if (e.target.validity.patternMismatch || e.target.validity.typeMismatch) {
                errorSpan.textContent = `Geeng geldige ${fieldName}.`;
            }
        } else {
            errorSpan.textContent = "";
        }
    }

    async #handleSubmitEvent(e){
        e.preventDefault(); 

        if(this.#formValid()){
            this.#setSpinnerEnabled(true);
            this.#setSubmitButtonEnabled(false);
            this.submitButton.setAttribute("aria-busy", "true");
            this.#clearErrors();
            try {
                const requestOptions = this.#buildRequest();
                const resposne = await this.#sendRequest(requestOptions);
                this.#setSpinnerEnabled(false);
                this.#setSubmitButtonEnabled(true);
                this.submitButton.setAttribute("aria-busy", "false");
                this.#handleResponse(resposne); 
            } catch (error) {
                this.#handleConnectionError();
                this.#setSpinnerEnabled(false);
                this.#setSubmitButtonEnabled(true);
                this.submitButton.setAttribute("aria-busy", "false");
                
            }
        }
    }

    async #sendRequest(requestOptions){
        const response = await fetch("https://localhost:49153/contact", requestOptions);
        return response;
    }

    async #handleResponse(response){
        const responseBody = await response.json();

        if(response.status === 400){
            this.#handleBadRequest(responseBody);
        }else if(response.status === 200){
            this.#handleSuccess(responseBody);
        }else if(response.status === 500){
            this.#handleInernalServerError(responseBody);
        }
    }

    #showFlashMessage(durationInMiliseconds, message, options = {color: "#ffffff", background: "#7FFF7F"}){
        this.successMessage.style.display = 'block';
        this.successMessage.textContent = message;
        this.successMessage.style.background = options?.background;
        this.successMessage.style.color = options?.color;
        this.successMessage.setAttribute("alert", "");
        this.successMessage.setAttribute("aria-hidden", "false");
        
        setTimeout(function() {
            this.successMessage.style.display = 'none';
            this.successMessage.setAttribute("alert", "");
            this.successMessage.setAttribute("aria-hidden", "true");
        }, durationInMiliseconds);
    }
    
    #handleSuccess(responseBody){
        this.#showFlashMessage(this.SUCCESS_FLASH_MESSAGE_IN_SECONDS * 1000, "Bedankt voor uw bercith!")
        this.#resetForm();
    }

    #handleBadRequest(responseBody){
        this.#clearErrors();
        this.firstNameErrors.textContent = responseBody?.FirstName?.join(' ');
        this.lastNameErrors.textContent = responseBody?.LastName?.join(' ');
        this.phoneNumberErrors.textContent = responseBody?.PhoneNumber?.join(' ');
        this.emailErrors.textContent = responseBody?.Email?.join(' ');
        this.subjectErrors.textContent = responseBody?.Subject?.join(' ');
        this.messageErrors.textContent = responseBody?.Message?.join(' ');
    }

    #clearErrors(){
        this.firstNameErrors.textContent = "";
        this.lastNameErrors.textContent = "";
        this.phoneNumberErrors.textContent = "";
        this.emailErrors.textContent = "";
        this.subjectErrors.textContent = "";
        this.messageErrors.textContent = "";
    }

    #handleInernalServerError(responseBody){
        this.#showFlashMessage(8000, "Wij konden uw contactverzoek niet verwerken.", {color: "white", background: "red"});
    }

    #handleConnectionError(){
        this.#showFlashMessage(8000, "Wij konden uw contactverzoek niet verwerken.", {color: "white", background: "red"});
    }

    #buildHeaders(){
        return {
            "Content-Type": "application/json",
        }
    }

    #resetForm(){
        this.firstNameField.value = "";
        this.lastNameField.value = "";
        this.phoneNumberField.value = "";
        this.emailField.value = "";
        this.subjectField.value = "";
        this.messageField.value = "";
    }

    #handleResetForm(e){
        this.#resetForm();
    }

    #buildBody(){
        return {
            firstname: this.firstNameField.value,
            lastname: this.lastNameField.value,
            phonenumber: this.phoneNumberField.value,
            email: this.emailField.value,
            subject: this.subjectField.value,
            message: this.messageField.value,
        };
    }

    #buildRequest(){
        const headers = this.#buildHeaders();
        const body = this.#buildBody();
    
         return  {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        };
    }
}

new ContactForm();
