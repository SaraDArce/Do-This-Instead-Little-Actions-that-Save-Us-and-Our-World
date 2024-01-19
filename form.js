app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/data/actions", (req, res) => {
  res.send(data);
});

app.get("/data/actions/new", (req, res) => {
  res.send(`
    <form action="data/actions" method="POST" >
      Topic: <input type="text" name="topic" /> <br />
      Suggestion: <input type="text" name="suggestion" /> <br />
      <input type="submit"/>
    </form>
  `);
});

// The form above is making a request to this route
app.post("/data/actions", (req, res) => {
  console.log(req.body);
  data.push(req.body);
  res.redirect("/data/actions");
});
