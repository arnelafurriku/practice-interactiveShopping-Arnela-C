window.addEventListener("load", () => {

  const inputEl = document.getElementById("item-input");
  const addBtn = document.getElementById("add-btn");
  const listEl = document.getElementById("list");

  function createItemElement(text) {
    const li = document.createElement("li");
    li.className = "item";

    const span = document.createElement("span");
    span.textContent = text;

    const editBtn = document.createElement("button");
    editBtn.className = "btn edit";
    editBtn.type = "button";
    editBtn.textContent = "Edit";

    const removeBtn = document.createElement("button");
    removeBtn.className = "btn remove";
    removeBtn.type = "button";
    removeBtn.textContent = "Remove";

    li.append(span, editBtn, removeBtn);
    return li;
  }

  function addItem() {
    const raw = inputEl.value.trim();
    if (!raw) {
      inputEl.focus();
      return;
    }
    const li = createItemElement(raw);
    listEl.appendChild(li);
    inputEl.value = "";
    inputEl.focus();
  }

  function switchToEdit(li) {
    const span = li.querySelector("span");
    const current = span.textContent;

    // Replace span with input
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = current;
    editInput.setAttribute("aria-label", "Edit item");
    li.replaceChild(editInput, span);

    // Turn Edit -> Save
    const editBtn = li.querySelector(".edit");
    editBtn.classList.remove("edit");
    editBtn.classList.add("save");
    editBtn.textContent = "Save";

    // Focus + select text
    editInput.focus();
    editInput.select();
  }

  function saveEdit(li) {
    const input = li.querySelector('input[type="text"]');
    const newText = input.value.trim();
    if (!newText) {
    
      li.remove();
      return;
    }

    const span = document.createElement("span");
    span.textContent = newText;
    li.replaceChild(span, input);

    // Turn Save -> Edit
    const saveBtn = li.querySelector(".save");
    saveBtn.classList.remove("save");
    saveBtn.classList.add("edit");
    saveBtn.textContent = "Edit";
  }


  // Add item: click
  addBtn.addEventListener("click", addItem);

  // Add item: Enter key
  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addItem();
  });

  listEl.addEventListener("click", (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;

    const li = target.closest("li.item");
    if (!li) return;

    if (target.classList.contains("remove")) {
      // Remove item
      li.remove();
    } else if (target.classList.contains("edit")) {
      // Switch to edit mode
      switchToEdit(li);
    } else if (target.classList.contains("save")) {
      // Save changes
      saveEdit(li);
    }
  });
});
