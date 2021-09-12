class MobileMenu {
    constructor() {
        this.DOM = {};
        // クラスを取得
        this.DOM.btn = document.querySelector(".hamburger");
        this.DOM.MenuSp = document.querySelector(".globalMenuSp");
        this.DOM.container = document.querySelector("#global-container");
        this.eventType = this._getEventType();
        this._addEvent();
    }
//EventType====================================
    _getEventType() {
        const isTouchCapable =
            "ontouchstart" in window ||
            (window.DocumentTouch && document instanceof window.DocumentTouch) ||
            navigator.maxTouchPoints > 0 ||
            window.navigator.msMaxTouchPoints > 0;

        return isTouchCapable ? "touchstart" : "click";
    }
//EventType====================================
    _toggle() {
        this.DOM.btn.classList.toggle("active");
        this.DOM.MenuSp.classList.toggle("active");
        this.DOM.container.classList.toggle("shadow");
    }
    _addEvent() {
        this.DOM.btn.addEventListener(this.eventType, this._toggle.bind(this));
        this.DOM.MenuSp.addEventListener(this.eventType, this._toggle.bind(this));
    }
}