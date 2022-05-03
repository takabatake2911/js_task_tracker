class App {
    $root = document.getElementById("root");
    $form = document.getElementById("form");
    $entry_box = document.getElementById("entry-box");
    $submit_btn = document.getElementById("submit-btn");
    $date_control = document.getElementById("date-control");
    constructor() {
        this.setToday();
    }
    main() {
        this.connectEvents();
    }
    setToday() {
        const today = new Date();
        const year = today.getFullYear().toString();
        const month = today.getMonth().toString().padStart(2, "0");
        const date = today.getDate().toString().padStart(2, "0");
        this.$date_control.value = `${year}-${month}-${date}`;
    }
    connectEvents() {
        this.$form.addEventListener("submit", (e) => {
            e.preventDefault();
            const task_str = this.$entry_box.value;
            const date = this.$date_control.value;
            if (task_str === "") {
                alert("タスク内容を入力してください");
                return;
            }
            if (date === "") {
                alert("タスクの日付を入力してください");
                return;
            }
            this.appendCard(task_str, date);
            this.$entry_box.value = "";
        });
    }
    appendCard(task_str, date) {
        const $card = new Card(task_str, date);
        this.$root.appendChild($card);
    }
}

class Card {
    constructor(task_str, date) {
        this.element = document.createElement("div");
        this.element.classList.add("card");
        this.addDateText(date);
        this.addCardText(task_str);
        this.addFavoriteButton();
        this.addDeleteButton();
        return this.element;
    }
    addDateText(date) {
        this.$date_text = document.createElement("p");
        this.$date_text.classList.add("date-text");
        this.$date_text.textContent = `${date}`;
        this.element.appendChild(this.$date_text);
    }
    addCardText(task_str) {
        this.$card_text = document.createElement("p");
        this.$card_text.textContent = task_str;
        this.$card_text.classList.add("card-text");
        this.element.appendChild(this.$card_text);
    }
    addFavoriteButton() {
        this.fav_btn = document.createElement("button");
        this.fav_btn.classList.add("fav-btn");
        this.fav_btn.textContent = "お気に入り";
        this.fav_btn.addEventListener("click", () => {
            this.element.classList.toggle("favorite");
        });
        this.element.appendChild(this.fav_btn);
    }
    addDeleteButton() {
        this.del_btn = document.createElement("button");
        this.del_btn.classList.add("del-btn");
        this.del_btn.textContent = "削除";
        this.del_btn.addEventListener("click", () => {
            this.element.remove();
        });
        this.element.appendChild(this.del_btn);
    }
}
const app = new App();
app.main();
