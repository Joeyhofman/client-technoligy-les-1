class GDPR {
    constructor() {
        this.cookieContent = document.getElementById("cookie-content");
        this.acceptCookiesButton = document.getElementById("accept-cookies-button");
        this.denyCookiesButton = document.getElementById("deny-cookies-button");
        this.body = document.querySelector("body");
        this.ACCEPT_COOKIES_LOCAL_STORAGE_KEY = "cookies_accepted";

        if(localStorage.getItem(this.ACCEPT_COOKIES_LOCAL_STORAGE_KEY)){
            this.body.removeChild(this.cookieContent);
        }else{
            this.cookieContent.role = "alert";
            this.acceptCookiesButton.focus();
        }
        this.acceptCookiesButton.addEventListener("click", this.#handleCookieAccept);
        this.denyCookiesButton.addEventListener("click", this.#handleGDPRRejection);
    }

    #handleCookieAccept(e){
        body.removeChild(cookieContent);
        localStorage.setItem(ACCEPT_COOKIES_LOCAL_STORAGE_KEY, "1");
    }

    #handleGDPRRejection(e){
        body.removeChild(cookieContent);
        localStorage.setItem(ACCEPT_COOKIES_LOCAL_STORAGE_KEY, "0");
    }
}

export  {
    GDPR
}
