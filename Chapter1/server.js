import express from 'express';

// intialise an express app and store in variable
const app = express();

// MIDDLEWARE
// Set static folder
app.use(express.static('public'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded ({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Handle GET request to fetch users
app.get('/users', async(req, res) => {
    setTimeout(async () => {
    // const users = [
    //     { id: 1, name: 'John Doe' },
    //     { id: 2, name: 'Bob Williams' },
    //     { id: 3, name: 'Shannon Jackson'},
    // ];

    const limit = +req.query.limit || 10;

    const response = await fetch(`https://jsonplaceholder.typicode.com/users?_limit=${limit}`)
    const users = await response.json()
    res.send(`
        <h2>Users</h2>
        <ul class="list-group">
            ${users.map((user)=>`<li class="list-group-item">
            ${user.name}</li>`).join('')}
        </ul>
 `)
},2000)
});

// Start the server
app.listen (3000, ()=>{
console. log('Server listening on port 3000');
});

// CODE SUMMARY FOR TEACHER:
// This Express server handles user data fetching with HTMX integration
// - Middleware configured for: static files (public folder), form data parsing, JSON parsing
// - GET /users endpoint: accepts 'limit' query parameter (default 10), fetches from JSONPlaceholder API
// - Returns formatted HTML list with user names and emails using template literals and .map()
// - Server runs on localhost:3000
// Key learning: async/await for API calls, dynamic HTML generation on backend