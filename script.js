// grab html elements. holds references where data will be display
const filmsList = document.getElementById("films");
const titleEl = document.getElementById("title");
const posterEl = document.getElementById("poster");
const runtimeEl = document.getElementById("runtime");
const showtimeEl = document.getElementById("showtime");
const descriptionEl = document.getElementById("description");
const availableTicketsEl = document.getElementById("available-tickets");
const buyBtn = document.getElementById("buy-ticket");

let currentFilm = null; // keep track of current film
const baseURL = "http://localhost:3000";

// Fetch all films 
fetch(`${baseURL}/films`)
  .then((res) => res.json())
  .then((films) => {
    filmsList.innerHTML = ""; // clear list and render each film.
    films.forEach((film) => renderFilmItem(film));
    if (films.length > 0) {
      loadFilmDetails(films[0].id); //auto load films details first
    }
  });

function renderFilmItem(film) {
  const li = document.createElement("li");
  li.textContent = film.title; // creates a list with film tittle
  li.classList.add("film", "item");
  if (film.capacity - film.tickets_sold === 0) li.classList.add("sold-out"); // adds sold out

  const delBtn = document.createElement("button"); // adds delete button inside each list
  delBtn.textContent = "Delete";
  delBtn.className = "delete-btn";
  delBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    deleteFilm(film.id, li);
  });
  li.appendChild(delBtn);

  li.addEventListener("click", () => loadFilmDetails(film.id)); // loads film details on clicking film list
  filmsList.appendChild(li);
}

function loadFilmDetails(id) { // fetches and updates one current film
  fetch(`${baseURL}/films/${id}`)
    .then((res) => res.json())
    .then((film) => {
      currentFilm = film;
      titleEl.textContent = film.title;
      posterEl.src = film.poster;
      runtimeEl.textContent = film.runtime;
      showtimeEl.textContent = film.showtime;
      descriptionEl.textContent = film.description;
      updateAvailableTickets();
    });
}

function updateAvailableTickets() { // calculates remaining tickets
  const available = currentFilm.capacity - currentFilm.tickets_sold;
  availableTicketsEl.textContent = available;
  buyBtn.disabled = available === 0;
  buyBtn.textContent = available === 0 ? "Sold Out" : "Buy Ticket";
}

buyBtn.addEventListener("click", () => {
  if (!currentFilm) return;
  const available = currentFilm.capacity - currentFilm.tickets_sold;
  if (available > 0) {
    const updatedTickets = currentFilm.tickets_sold + 1;
    fetch(`${baseURL}/films/${currentFilm.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tickets_sold: updatedTickets }),
    })
      .then((res) => res.json())
      .then((data) => {
        currentFilm.tickets_sold = data.tickets_sold;
        updateAvailableTickets();
      });
  }
});

function deleteFilm(id, li) {
  fetch(`${baseURL}/films/${id}`, { method: "DELETE" }).then(() => li.remove());
}
