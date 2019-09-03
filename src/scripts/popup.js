class Popup {
    'use strict';
    constructor() {
        this.settings = {
                    button: '#modal',
                    maxWidth: 850,
                    minWidth: 280,
                    className: 'fade-and-drop',
                };
        this.modal = document.createElement('div');
        this.closeButton = document.createElement('button');
        this.overlay = document.createElement("div");
        this.transitionEnd = this.transitionSelect();
    }

    transitionSelect() {
        let el = document.createElement("div");
        if (el.style.WebkitTransition) return "webkitTransitionEnd";
        if (el.style.OTransition) return "oTransitionEnd";
        return 'transitionend';
    }

    extend() {
        for (let i = 1; i < arguments.length; i++) {
            for (let key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key)) {
                    arguments[0][key] = arguments[i][key]
                }
            }
        }
        return arguments[0]
    }

    $(el) {
        return document.querySelectorAll(el)[0];
    }

    close() {
        this.modal.className = this.modal.className.replace(" scotch-open", "");
        this.overlay.className = this.overlay.className.replace(" scotch-open", "");
        this.modal.addEventListener(this.transitionEnd, () => this.modal.parentNode.removeChild(this.modal));
        this.overlay.addEventListener(this.transitionEnd, () => {
            if(this.overlay.parentNode) this.overlay.parentNode.removeChild(this.overlay);
        });
    }

    handlerModel(){
        this.closeButton.addEventListener('click', this.close.call(new Popup()));
        this.overlay.addEventListener('click', this.close.call(new Popup()));
    }

    handlerButton(){
        let button = this.$(this.settings.button);
        button.addEventListener('click', this.open.call(new Popup()));
    }

    buildModel() {
        let contentHolder,
            docFrag;
        docFrag = document.createDocumentFragment();
        this.modal.className = 'scotch-modal ' + this.settings.className;
        this.modal.style.minWidth = this.settings.minWidth + 'px';
        this.modal.style.maxWidth = this.settings.maxWidth + 'px';
        this.closeButton.className = 'scotch-close close-button';
        this.closeButton.innerHTML = '&times;';
        this.modal.appendChild(this.closeButton);
        this.overlay.className = "scotch-overlay " + this.settings.className;
        docFrag.appendChild(this.overlay);
        contentHolder = document.createElement("div");
        contentHolder.className = "scotch-content";
        contentHolder.appendChild(this.createModal());
        this.modal.appendChild(contentHolder);
        docFrag.appendChild(this.modal);
        document.body.appendChild(docFrag);
    }

    open() {
        this.buildModel();
        window.App.search.init();
        this.handlerModel();
        window.getComputedStyle(this.modal).height;
        this.modal.className = this.modal.className + (this.modal.offsetHeight > window.innerHeight ? ' scotch-open scotch-anchored' : ' scotch-open');
        this.overlay.className = this.overlay.className + ' scotch-open';
        window.App.select.createElement();
    }

    createModal() {
        let frag = document.createDocumentFragment();
        let div = document.createElement('div');
        div.className = 'modal-wrapper';
        let h4 = document.createElement('h4');
        h4.innerText = this.settings.title;
        div.appendChild(h4);
        let p = document.createElement('p');
        p.innerHTML = this.settings.content;
        div.appendChild(p);
        let select = document.createElement('select');
        select.disabled = true;
        let option_default = document.createElement('option');
        option_default.innerText = 'Загрузка станций...';
        option_default.value = '0';
        select.appendChild(option_default);
        div.appendChild(select);
        let div_result = document.createElement('div');
        div_result.id = 'result';
        div.appendChild(div_result);
        let checkbox = document.createRange().createContextualFragment('<div class="check"><label class="container">Расширенный вид<input type="checkbox" name="extend" id="extend"><span class="checkmark"></span></label></div>');
        div.appendChild(checkbox);
        frag.appendChild(div);
        return frag;

    }
    
    init(opt){
        this.settings = this.extend({}, this.settings, opt);
        this.handlerButton();
    }
}