import { marked } from "marked";
marked.use({
  mangle: false,
  headerIds: false,
});

const notes = JSON.parse(localStorage.getItem("notes"));
if (notes) {
  notes.forEach((note) => {
    addNewNote(note);
  });
}

const addBtn = document.getElementById("add");

addBtn.addEventListener("click", () => addNewNote());

function addNewNote(text = "") {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `<div class="notes">
  <div class="tools">
    <button class="edit">
      <i class="fa-regular fa-pen-to-square"></i>
    </button>
    <button class="delete">
      <i class="fa-solid fa-trash-can"></i>
    </button>
  </div>
  <div class="main ${text ? "" : "hidden"}"></div>
  <textarea class="main ${text ? "hidden" : ""}"></textarea>
</div>;
`;

  const main = note.querySelector(".main");
  const textArea = note.querySelector("textarea");
  textArea.value = text;

  main.innerHTML = marked.parse(text);

  const editBtn = note.querySelector(".edit");
  const deleteBtn = note.querySelector(".delete");

  editBtn.addEventListener("click", () => {
    main.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  textArea.addEventListener("input", (e) => {
    const { value } = e.target;
    main.innerHTML = marked.parse(value);
    updateLS();
  });

  deleteBtn.addEventListener("click", () => {
    note.remove();
    updateLS();
  });

  document.body.appendChild(note);
}
function updateLS() {
  const notesText = document.querySelectorAll("textarea");
  const notes = [];
  notesText.forEach((note) => {
    notes.push(note.value);
  });
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Do this with classes?
