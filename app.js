const express    = require("express"), // Routing framework
      app        = express(), // Express initialization
      ejs        = require("ejs"), // View engine
      bodyParser = require("body-parser"), // req.body parser
      subdomain  = require("express-subdomain"), // Subdomains call handling
      helmet     = require("helmet"); // Safety best practices

// Initialize helmet
app.use(helmet({
    // Needed to be able to use inline scripts and load reCaptcha - at least in dev, not tested in production
    contentSecurityPolicy: false
}));

// Initialize body parser
app.use(bodyParser.urlencoded({ extended: true }));

// Change the base dir from this file's dir to /public
app.use(express.static(__dirname + "/public"));

// Set the view engine to ejs
app.set("view engine", "ejs");

// Routers references
const routers = {
    contact: require("./routes/contact.js"),
    index: require("./routes/index") // Also contains the router for 404 errors
};

// Add routers to the app
app.use("/contact", routers.contact);
app.use("/", routers.index);

// Start server
const listener = app.listen(30000, "127.0.0.1", function() {
    const port = listener.address().port;
    const host = listener.address().address;
    console.log("\n === Server started on http://" + host + ":" + port + " ===\n");
});