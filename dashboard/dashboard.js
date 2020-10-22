const express = require("express");
const passport = require("passport");
const session = require("express-session");
const Strategy = require("passport-discord").Strategy;
const config = require("../config.json");
const db = require('quick.db');
const bodyParser = require("body-parser");
const Discord = require("discord.js");

const app = express();
const MemoryStore = require("memorystore")(session);

module.exports = async (client) => {
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((obj, done) => done(null, obj));

  passport.use(new Strategy({
    clientID: config.id,
    clientSecret: config.clientSecret,
    callbackURL: `${config.domain}${config.port == 80 ? "" : `:${config.port}`}/callback`,
    scope: ["identify", "guilds"]
  }, (_accessToken, _refreshToken, profile, done) => { process.nextTick(() => done(null, profile)); }
  ));

  app.use(session({
    store: new MemoryStore({ checkPeriod: 86400000 }),
    secret: "#@%#&^$^$%@$^$&%#$%@#$%$^%&$%^#$%@#$%#E%#%@$FEErfgr3g#%GT%536c53cc6%5%tv%4y4hrgrggrgrgf4n",
    resave: false,
    saveUninitialized: false,
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.locals.domain = config.domain.split("//")[1];

  app.set("view engine", "ejs");
  app.set('views', `${__dirname}/views`);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));


  const renderTemplate = (res, req, template, data = {}) => {
    const baseData = {
      bot: client,
      path: req.path,
      user: req.isAuthenticated() ? req.user : null
    };
    res.render(`${__dirname}/views/${template}`, Object.assign(baseData, data));
  };

  const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url
    res.redirect("/login");
  }

  app.get("/", (req, res) => renderTemplate(res, req, "index.ejs"));
  app.get("/dashboard", checkAuth, (req, res) => renderTemplate(res, req, "dashboard.ejs", { perms: Discord.Permissions }));
  app.get("/login", (_req, res) => res.redirect(`https://discord.com/oauth2/authorize?response_type=code&&client_id=${config.id}&redirect_uri=${config.domain}:${config.port}/callback&scope=identify guilds`));
  app.get("/invite", (_req, res) => res.redirect(`https://discord.com/oauth2/authorize?client_id=${config.id}&scope=bot&permissions=8`));

  app.get("/callback", passport.authenticate("discord", { failureRedirect: "/" }), (req, res) => {
    if (req.session.backURL) {
      const url = req.session.backURL;
      req.session.backURL = null;
      res.redirect(url);
    } else {
      res.redirect("/");
    }
  });

  app.get("/logout", (req, res) => {
    req.session.destroy(() => {
      req.logout();
      res.redirect("/");
    });
  });


  app.get("/commands", (req, res) => {
    const commands = client.commands.array();
    const categories = {};

    for (const command of commands) {
      const { name, category } = command;
      if (!categories[category]) categories[category] = [];
      categories[category].push(name);
    }

    const categoryNames = Object.keys(categories);

    const economy = categories["economy"];
    const fun = categories["fun"];
    const info = categories["info"];
    const moderation = categories["moderation"];
    const music = categories["music"];
    const levelstuff = categories["level stuff"];
    const roles = categories["roles"];
    const utililty = categories["utililty"];

    let data = {
      categoryNames: categoryNames,
      economy, fun, info, moderation, music, levelstuff, roles, utililty
    }

    renderTemplate(res, req, "commands.ejs", data);
  });

  app.get("/dashboard/:guildID", checkAuth, async (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
    if (!guild) return res.redirect("/dashboard");
    const member = guild.members.cache.get(req.user.id);
    if (!member) return res.redirect("/dashboard");
    if (!member.permissions.has("MANAGE_GUILD")) return res.redirect("/dashboard");
    var storedSettings = await db.get(`prefix_${guild.id}`)
    if (storedSettings === null) storedSettings = config.dprefix;

    let cmdx = db.get(`cmd_${guild.id}`) || "None";
    let arr = [];
    for (let obj of cmdx) arr.push(obj.name) || "None";

    renderTemplate(res, req, "settings.ejs", { guild, prefix: storedSettings, cmdlistcmd: arr, alert: null });
  });

  app.post("/dashboard/:guildID", checkAuth, async (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
    if (!guild) return res.redirect("/dashboard");
    const member = guild.members.cache.get(req.user.id);
    if (!member) return res.redirect("/dashboard");
    if (!member.permissions.has("MANAGE_GUILD")) return res.redirect("/dashboard");
    var storedSettings = await db.get(`prefix_${guild.id}`)
    if (storedSettings === null) storedSettings = config.dprefix;
    db.set(`prefix_${guild.id}`, req.body.prefix)

    let data = {
      "name": req.body.cmdname,
      "responce": req.body.cmdresponce
    }

    db.push(`cmd_${guild.id}`, data)

    renderTemplate(res, req, "settings.ejs", { guild, prefix: req.body.prefix, cmdlistcmd: null, alert: "Your settings have been saved." });
  });

  app.listen(config.port, null, null, () => console.log(`Dashboard is up and running on port ${config.port}.`));
};