let area = document.getElementById("area");
//setting pretext
const xhr = new XMLHttpRequest();
xhr.open("GET", "http://127.0.0.1:80/", true)
xhr.onload = function () {
    let data = this.responseText;
    document.getElementById("notes").innerText = data
}
xhr.send()

area.addEventListener("dblclick", function () {
    // getting previous notes
    let notes = document.getElementById("notes");
    let notes_text = notes.innerText;

    // inserting textarea
    area.innerHTML = `<textarea id="notes">`;
    let new_notes = document.getElementById("notes");
    new_notes.focus();//setting the focus to the box after inserting the box
    new_notes.innerText = notes_text;

    //changing text area to p
    new_notes.addEventListener("blur", function () {
        let new_text = document.getElementById("notes").value;
        console.log(new_text)
        area.innerHTML = `<p id="notes"></p>`
        document.getElementById("notes").innerText = new_text;

        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://127.0.0.1:80/", true)
        xhr.setRequestHeader("Content-type","application/json")
        xhr.onload = function () {
            let data = this.responseText;
            console.log(data)
        }
        xhr.send(JSON.stringify({"notes":new_text}))

    })
})