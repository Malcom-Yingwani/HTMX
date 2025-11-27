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

let currentPrice = 60;
app.get("/get-price", (req, res) => {
  currentPrice = currentPrice + (Math.random() * 2) - 1;
  res.send("$" + currentPrice.toFixed(2));
  console.log("Current Price: " + currentPrice.toFixed(2))
});

// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

/*
  SUMMARY OF BITCOIN PRICE TRACKER SERVER (EXPRESS)

  - Imports Express and initializes an app instance.
  - Uses middleware to:
      • Serve static files from the "public" directory.
      • Parse URL-encoded form data for HTML forms.
      • Parse JSON bodies for API requests.

  - Initializes a variable `currentPrice` starting at 60 (USD).

  - Defines a GET route at "/get-price":
      • Simulates live Bitcoin price by adding a random change between -1 and +1.
      • Responds with the updated price formatted as a string with a "$" sign and 1 decimal place.
      • Enables dynamic updates for the front-end HTMX component.

  - Starts the Express server on port 3000 and logs a message.
*/
