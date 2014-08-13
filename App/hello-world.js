(function (document, undefined) {
    "use strict";
    //Accede al documento donde se inserta el script
    var thisDoc = document.currentScript.ownerDocument;
    //Selecciona la template
    var template = thisDoc.querySelector('template');
    //función privada para asignar al strong el valor del atributo who
    var setWho=function(value){
        var strong = this.shadowRoot.querySelector('strong')
        strong.textContent = value || 'World';
    }
    //Crea el nuevo elemento.
    var myElement = Object.create(HTMLElement.prototype);
    //Creacción del componente
    myElement.createdCallback = function() {
        //Crea un ShadowRoot
        var shadowRoot = this.createShadowRoot();
        //Clona y agrega la template al ShadowRoot
        var clone = document.importNode(template.content, true);
        shadowRoot.appendChild(clone);
    };
    //Una vez que el componente es agregado al dom
    myElement.attachedCallback = function(){
        setWho.bind(this)(this.getAttribute('who'));
    };
    //observador sobre el atributo who
    myElement.attributeChangedCallback =function(attr,oldValue,newValue){
        if(attr==="who"){
            setWho.bind(this)(newValue);
        }
    };
    //crea el componente
    document.registerElement("hello-world",{prototype: myElement});

}(document));
