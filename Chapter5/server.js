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

// Handle POST request for email validation
app.post("/email", (req, res) => {
  const submittedEmail = req.body.email;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (emailRegex.test(submittedEmail)) {
    return res.send(`
      <div class="mb-3" hx-target="this" hx-swap="outerHTML">
        <label class="form-label">Email address</label>
        <input
        type="email"
        class="form-control"
        name="email"
        hx-post="/email"
        value="${submittedEmail}"
        >
        <div class="alert alert-success" role="alert">
          That email is valid
        </div>
      </div>`
    );
  } else {
    return res.send(`
      <div class="mb-3" hx-target="this" hx-swap="outerHTML">
      <label class="form-label">Email address</label>
      <input
      type="email"
      class="form-control"
      name="email"
      hx-post="/email"
      value="${submittedEmail}"
      >
      <div class="alert alert-danger" role="alert">
        Please enter a valid email address
      </div>
 </div>`

);
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});


// Chat GPT summary

// This code handles the email validation request sent by HTMX when a user types an email into the input field. 
// When the /email route receives a POST request, it reads the submitted email and checks it against a regular expression to determine whether the format is valid. 
// Depending on the result, the server returns new HTML containing the email input field along with either a green success alert or a red error alert. 
// Because the returned HTML includes hx-target="this" and hx-swap="outerHTML", HTMX replaces the entire input section on the page with the updated version, allowing the user to instantly see whether their email is valid without refreshing the page.