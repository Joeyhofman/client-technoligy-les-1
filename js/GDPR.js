

class GDPR {

    constructor() {
        this.cookieContent = document.getElementById("cookie-content");
        this.acceptCookiesButton = document.getElementById("accept-cookies-button");
        this.denyCookiesButton = document.getElementById("deny-cookies-button");
        this.body = document.querySelector("body");
        
        
        Object.defineProperty(this, 'ACCEPT_COOKIES_LOCAL_STORAGE_KEY', {
            value: 'cookies_accepted',
            writable: false
        });
        
        this.COOKIE_STATUS = Object.freeze({
            ACCEPTED: "1",
            REJECTED: "0"
        });

        this.#handleCookieContentDisplay();
        this.#bindGDPREventHandlers();
    }

    #handleCookieContentDisplay(){
        if(!this.#hasAcceptedGDPR()){
            this.#setCookieContentAlert();
            this.#focusAcceptCookiesButton();
        }else{
            this.#removeCookieContent();
        }
    }

    #setCookieContentAlert() {
        this.cookieContent.role = "alert";
    }
    
    #focusAcceptCookiesButton() {
        this.acceptCookiesButton.focus();
    }

    #bindGDPREventHandlers(){
        this.acceptCookiesButton.addEventListener("click", this.#handleCookieAccept.bind(this));
        this.denyCookiesButton.addEventListener("click", this.#handleGDPRRejection.bind(this));
    }

    getCookieStatus(){
        return localStorage.getItem(this.ACCEPT_COOKIES_LOCAL_STORAGE_KEY) || this.COOKIE_STATUS.REJECTED;
    }

    #hasAcceptedGDPR(){
        return this.getCookieStatus() === this.COOKIE_STATUS.ACCEPTED;
    }

    #removeCookieContent(){
        this.body.removeChild(this.cookieContent);
    }

    #handleCookieAccept(e){
        this.#removeCookieContent();
        this.#setGDPRCookieStatus(this.COOKIE_STATUS.ACCEPTED);
    }

    #setGDPRCookieStatus(status){
        localStorage.setItem(this.ACCEPT_COOKIES_LOCAL_STORAGE_KEY, status);
    }

    #handleGDPRRejection(e){
        this.#removeCookieContent();
        this.#setGDPRCookieStatus(this.COOKIE_STATUS.REJECTED);
    }
}

export  {
    GDPR
}
