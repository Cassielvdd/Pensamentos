const express = require("express");
const bcryptjs = require("bcryptjs");
const expressHandlebars = require("express-handlebars");
const session = require("express-session");
const flash = require("express-flash");
const sessionFileStore = require("session-file-store")(session);
const sequelize = require("./db/conn.js");
const app = express();
const path = require("path");
const os = require("os");

//modules
const Tought = require("./models/Pensamento.js");
const User = require("./models/User.js");
const ToughtsController = require("./controllers/ToughtsController.js");
const toughtsRoutes = require("./routes/toughtsRoutes.js");
const authRoutes = require("./routes/authRoutes.js");

app.engine("handlebars", expressHandlebars.engine());
app.set("view engine", "handlebars");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    name: "session",
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new sessionFileStore({
      logFn: function () {},
      path: path.join(os.tmpdir(), "sessions"),
    }),
    cookie: {
      secure: false,
      maxAge: 3600000,
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    },
  }),
);

app.use(flash());
app.use((req, res, next) => {
  if (req.session.userid) {
    res.locals.session = req.session;
  }
  next();
});

app.use("/toughts", toughtsRoutes);
app.use("/", authRoutes);

app.get("/", ToughtsController.ShowToughts);

sequelize
  .sync()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log("Server Started");
    });
  })
  .catch((err) => {
    console.log(err);
  });
