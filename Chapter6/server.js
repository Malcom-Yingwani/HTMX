import express from "express";

// intialise an express app and store in variable
const app = express();

// MIDDLEWARE
// Set static folder
app.use(express.static("public"));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Handle GET request for profile edit
app.get("/user/:id/edit", (req, res) => {
  // send an HTML form for editing
  res.send(`
    <form hx-put="/user/1" hx-target="this" hx-swap="outerHTML">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
          <input type="text" class="form-control" id="name" name="name" value="Greg
 Lim">
      </div>
      <div class="mb-3">
        <label for="bio" class="form-label">Bio</label>
        <textarea type="text" class="form-control" id="bio" name="bio">Follower of Christ |
Author of Best-selling Amazon Tech Books and Creator of Coding Courses
        </textarea>
       </div>
      <button type="submit" class="btn btn-primary">
        Save Changes
      </button>
      <button type="submit" hx-get="/index.html" class="btn btn-secondary">
      Cancel
    </button>
 </form>
 `);
});

// Handle PUT request for editing
app.put("/user/:id", (req, res) => {
  const name = req.body.name;
  const bio = req.body.bio;

  // Send the updated profile back
  res.send(`
    <div class="card" style="width: 18rem;"
      hx-target="this"
      hx-swap="outerHTML"
  >
    <div class="card-body">
      <h5 class="card-title">${name}</h5>
      <p class="card-text">
        ${bio}
      </p>
      <button class="btn btn-primary"
        hx-get="/user/1/edit">
        Click To Edit
      </button>
      
    </div>
 </div>
 `);
});

app.delete("/user/:id", (req, res) => {
  // Return a card with empty name and bio but still editable
  res.send(`
    <div class="card" style="width: 18rem;"
         hx-target="this"
         hx-swap="outerHTML">
      <div class="card-body">
        <h5 class="card-title"></h5>
        <p class="card-text"></p>
        <button class="btn btn-primary" hx-get="/user/${req.params.id}/edit">
          Click To Edit
        </button>
        <button class="btn btn-danger" 
                hx-delete="/user/${req.params.id}" 
                hx-target="closest .card" 
                hx-swap="outerHTML">
          Delete
        </button>
      </div>
    </div>
  `);
});



// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
