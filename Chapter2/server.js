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


app.post("/calculate", (req, res) => {
  const height = parseFloat(req.body.height);
  console.log(height);
  const weight = parseFloat(req.body.weight);
  console.log(weight);
  const bmi = weight / (height * height);
  console.log(bmi);

  res.send(`
 <p>Height of ${height} & Weight of ${weight} gives you BMI of ${bmi.toFixed(2)}</p>
 `);
});


// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

// Chat-GPT summary

/*

  - Imports Express and creates an app instance.
  - Uses middleware to:
      • Serve static files from the "public" directory.
      • Parse URL-encoded form data (needed for HTMX form submissions).
      • Parse JSON bodies for API-style requests.
  
  - Defines a POST route at "/calculate":
      • Reads "height" and "weight" from req.body.
      • Converts them to floating-point numbers.
      • Calculates BMI using: weight / (height * height).
      • Logs the values for debugging.
      • Responds with a small HTML snippet containing the formatted BMI result.
  
  - Starts the Express server on port 3000 and logs a startup message.
*/

