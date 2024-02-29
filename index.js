import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Step 1: Make sure that when a user visits the home page,
//   it shows a random activity.You will need to check the format of the
//   JSON data from response.data and edit the index.ejs file accordingly.
app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  console.log(req.body);
try{
  const type  = req.body.type; // use req (parameter) body(import bodyParser) to get data and store in pass
  const participants  = req.body.participants // get the data of particapants
  const response = await axios.get(
    `https://bored-api.appbrewery.com/filter?type=${type}&participants=${participants}`
  );

  const result = response.data;
res.render("index.ejs", {
  data: result[Math.floor(Math.random()*result.length)],
});
}catch (error){
  res.render("solution.ejs", {
    error: "No Activities Found",
  });
}
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
