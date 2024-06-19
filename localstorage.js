document.addEventListener('DOMContentLoaded', function() {
    const titleInput = document.getElementById('titleInput');
    const contentInput = document.getElementById('contentInput');
    const addNoteButton = document.getElementById('addNoteButton');
    const notesContainer = document.getElementById('notesContainer');

    // Load notes from local storage
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach(note => {
        addNoteToDOM(note);
    });

    // Add note
    addNoteButton.addEventListener('click', function() {
        const title = titleInput.value;
        const content = contentInput.value;
        if (title && content) {
            const note = { title, content };
            notes.push(note);
            localStorage.setItem('notes', JSON.stringify(notes));
            addNoteToDOM(note);
            titleInput.value = '';
            contentInput.value = '';
        }
    });

    // Function to add note to DOM
    function addNoteToDOM(note) {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        
        const noteTitle = document.createElement('h2');
        noteTitle.textContent = note.title;
        
        const noteContent = document.createElement('p');
        noteContent.textContent = note.content;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            notesContainer.removeChild(noteElement);
            const index = notes.findIndex(n => n.title === note.title && n.content === note.content);
            notes.splice(index, 1);
            localStorage.setItem('notes', JSON.stringify(notes));
        });

        noteElement.appendChild(noteTitle);
        noteElement.appendChild(noteContent);
        noteElement.appendChild(deleteButton);

        notesContainer.appendChild(noteElement);
    }
});
