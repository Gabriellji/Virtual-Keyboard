/* eslint-disable no-console */
/* eslint-disable no-empty */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable no-tabs */
/* eslint-disable func-names */
/* eslint-disable indent */
// eslint-disable-next-line strict
const Keyboard = {
	// eslint-disable-next-line no-tabs
	elements: {
		main: null,
		keysContainer: null,
		keys: []
	},

	eventHandlers: {
		oninput: null,
		onclose: null
	},

	properties: {
		value: "",
		capsLock: false
    },
    
    lang: {
		value: ""
	},

	init() {
        // Create main elements
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        // Setup main elements
        this.elements.main.classList.add("keyboard", "1keyboard--hidden");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        // Add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        // Automatically use keyboard for elements with .use-keyboard-input
        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
	},

	_createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace",
            "Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\", "DEL",
            "Caps Lock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "`", "ENTER",
            "Shift", "\\", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "Shift", "↑", "/", 
            "Ctrl", "Win", "Alt", "space", "Alt", "Ctrl", "←", "↓", "→"
        ];

        const keyLayoutRus = [
            "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace",
            "Tab", "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ", "\\", "DEL",
            "Caps Lock", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", "ENTER",
            "Shift", "\\", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", "Shift", "↑", "/", 
            "Ctrl", "Win", "Alt", "space", "Alt", "Ctrl", "←", "↓", "→"
        ];

        const dataCode = [
            "Backquote", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace",
            "Tab", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "Backslash", "Delete",
            "CapsLock", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "Enter",
            "ShiftLeft", "Backslash", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash", "ArrowUp", "ShiftRight",
            "ControlLeft", "OSLeft", "AltLeft", "Space", "AltRight", "ControlRight", "ArrowLeft", "ArrowDown", "ArrowRight"
          ];


        // Creates HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        keyLayout.forEach((key, index) => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["Backspase", "DEL", "ENTER", "/"].indexOf(key) !== -1;

            // Add attributes/classes

            keyElement.setAttribute("data-code", dataCode[index]);
            keyElement.innerText = keyLayout[index];

            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");


            switch (key) {
                case "Backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("backspace");

                    // keyElement.addEventListener("click", () => {
                    //     this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                    //     this._triggerEvent("oninput");
                    // });

                    break;

                case "Caps Lock":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");

                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                    });

                    keyElement.addEventListener("keydown", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                    });
     
                    break;

                case "ENTER":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_return");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;
                case "space":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = createIconHTML("space_bar");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });

                  
                    break;
                // case "done":
                //     keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                //     keyElement.innerHTML = createIconHTML("scheck_circle");

                //     keyElement.addEventListener("click", () => {
                //         this.close();
                //         this._triggerEvent("onclose");
                //     });

                //     break;
                
                default:
                        keyElement.textContent = key.toLowerCase();

                        keyElement.addEventListener("click", () => {
                            this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                            this._triggerEvent("oninput");
                        });
                        

                    break;
            }

            // keyElement.textContent = key.toLowerCase();

            document.addEventListener("keydown", () => {
                if (event.code === "ShiftRight") {
                    console.log("lol");
                    keyLayout.splice(0, Infinity, ...keyLayoutRus);
                    keyElement.innerText = keyLayoutRus[index];   
                } else {
                    keyElement.innerText = keyLayout[index];
                }
                
                if (event.code === "Backspace") {
                            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                } else if (event.code === "CapsLock") {
                    this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                } else if (event.code === "Enter") {
                    this.properties.value += "\n";
                } else if (event.code === "Space") {
                    this.properties.value += " ";
                } 
                let pressedKey = document.querySelector(`button[data-code = ${event.code}]`);
                pressedKey.classList.add("keyboard__key--dark");
            });
            document.addEventListener("keyup", () => {
                let unPressedKey = document.querySelector(`button[data-code = ${event.code}]`);
                unPressedKey.classList.remove("keyboard__key--dark");
            });

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;
	},

	_triggerEvent(handlerName) {
		if (typeof this.eventHandlers[handlerName] === "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
	},

	_toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
	},

	open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard--hidden");
	},

	close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard--hidden");
    }

};

// const createIconHTML = (icon_name) => {
//     return `<i class="material-icons">${icon_name}</i>`;
// };


// const Keyboard = {
// 	// eslint-disable-next-line no-tabs
// 	elements: {
// 		main: null,
// 		keysContainer: null,
// 		keys: []
// 	},

// 	eventHandlers: {
// 		oninput: null,
// 		onclose: null
// 	},

// 	properties: {
// 		value: "",
// 		capsLock: false
// 	},


// document.addEventListener("keydown", (event) => {
//        let keys = document.querySelector(".keyboard__key");
//     //    let capsLock = document.querySelector(".keyboard__key--activatable");
//      let textArea = document.querySelector(".use-keyboard-iput");
//     if (event.key === "CapsLock") {
//         // document.querySelectorAll(".keyboard__key").classList.add("keyboard__key--wide", "keyboard__key--activatable");
//         // document.querySelectorAll(".keyboard__key").innerHTML = createIconHTML("keyboard_capslock");
//         const array = document.querySelectorAll(".keyboard__key");
//         // this.properties.capsLock = !this.properties.capsLock;
       
//         // capsLock.value = !capsLock.value;
//         array.forEach.call(array, (key) => {
//         const elem = key;
//         //   elem.innerHTML = elem.textContent === elem.textContent.toUpperCase() 
//         //     ? elem.textContent.toLowerCase()
//         //     : elem.textContent.toUpperCase();
//     if (elem.childElementCount === 0) {
//         // const properties = {
//         //     value: "",
//         //     capsLock: false
//         // };
//         elem.textContent = this.properties.capsLock ? elem.textContent.toUpperCase() : elem.textContent.toLowerCase();
//   }
//         });
//       } else if (event.key === "Backspase") {
//         textArea.value = textArea.value.substring(0, textArea.value.length - 1);
//       }
  
   
//     let pressedKey = document.querySelector(`button[data-code = ${event.code}]`);
//     pressedKey.classList.add("keyboard__key--dark");
// });
  
// document.addEventListener("keyup", (event) => {
//     let unPressedKey = document.querySelector(`button[data-code = ${event.code}]`);
//     unPressedKey.classList.remove("keyboard__key--dark");
// });

// }

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});
