
    const filmsList = document.getElementById('films');
    const titleEl = document.getElementById('title');
    const posterEl = document.getElementById('poster');
    const runtimeEl = document.getElementById('runtime');
    const showtimeEl = document.getElementById('showtime');
    const descriptionEl = document.getElementById('description');
    const availableTicketsEl = document.getElementById('available-tickets');
    const buyBtn = document.getElementById('buy-ticket');

    let currentFilm = null;
    const baseURL = 'http://localhost:3000';

    // Fetch all films and populate list
    fetch(`${baseURL}/films`)
      .then(res => res.json())
      .then(films => {
        filmsList.innerHTML = '';
        films.forEach(film => renderFilmItem(film));
        if (films.length > 0) {
          loadFilmDetails(films[0].id);
        }
      });

    function renderFilmItem(film) {
      const li = document.createElement('li');
      li.textContent = film.title;
      li.classList.add('film', 'item');
      if (film.capacity - film.tickets_sold === 0) li.classList.add('sold-out');

      const delBtn = document.createElement('button');
      delBtn.textContent = 'Delete';
      delBtn.className = 'delete-btn';
      delBtn.addEventListener('click', e => {
        e.stopPropagation();
        deleteFilm(film.id, li);
      });
      li.appendChild(delBtn);

      li.addEventListener('click', () => loadFilmDetails(film.id));
      filmsList.appendChild(li);
    }

    function loadFilmDetails(id) {
      fetch(`${baseURL}/films/${id}`)
        .then(res => res.json())
        .then(film => {
          currentFilm = film;
          titleEl.textContent = film.title;
          posterEl.src = film.poster;
          runtimeEl.textContent = film.runtime;
          showtimeEl.textContent = film.showtime;
          descriptionEl.textContent = film.description;
          updateAvailableTickets();
        });
    }

    function updateAvailableTickets() {
      const available = currentFilm.capacity - currentFilm.tickets_sold;
      availableTicketsEl.textContent = available;
      buyBtn.disabled = available === 0;
      buyBtn.textContent = available === 0 ? 'Sold Out' : 'Buy Ticket';
    }

    buyBtn.addEventListener('click', () => {
      if (!currentFilm) return;
      const available = currentFilm.capacity - currentFilm.tickets_sold;
      if (available > 0) {
        const updatedTickets = currentFilm.tickets_sold + 1;
        fetch(`${baseURL}/films/${currentFilm.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tickets_sold: updatedTickets })
        })
          .then(res => res.json())
          .then(data => {
            currentFilm.tickets_sold = data.tickets_sold;
            updateAvailableTickets();
          });
      }
    });

    function deleteFilm(id, li) {
      fetch(`${baseURL}/films/${id}`, { method: 'DELETE' })
        .then(() => li.remove());
    }