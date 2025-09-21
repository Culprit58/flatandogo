Flatadango 🎬

Flatadango is a mini web app that demonstrates the three pillars of JavaScript:

Handling Events: Click events for buying tickets, deleting films, and selecting films.

DOM Manipulation: Dynamically rendering film details, updating available tickets, and styling sold-out films.

Communicating with the Server: Using fetch() to perform GET, PATCH, and DELETE operations on a JSON server.

⚠️ This is a private learning project.

Features

View a menu of available films.

Click a film to view its details (poster, runtime, showtime, description, tickets).

Buy tickets and see available tickets update in real time.

Sold-out films are clearly marked, and buying is disabled.

Delete films from the list and server.

Setup & Installation

Clone this repository:

git clone <PRIVATE_REPO_URL>
cd flatadango

Install JSON Server globally (if not installed):

npm install -g json-server

Start the JSON server:

json-server --watch db.json --port 3000

Open index.html in your browser.

Project Structure
flatadango/
├── index.html        # Main application
├── db.json           # Film database (server data)
├── README.md         # Documentation
└── LICENSE           # MIT license
Usage

On page load, the first movie's details are displayed.

Click any movie in the list to view its details.

Click Buy Ticket to purchase (unless sold out).

Click Delete next to a movie to remove it.

Technologies Used

HTML5

CSS3

JavaScript (ES6+)

JSON Server

License

This project is licensed under the MIT License.

© 2025 Flatandogo. For private educational use only.