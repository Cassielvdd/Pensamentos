const User = require("../models/User");
const bcryptjs = require("bcryptjs");

module.exports = class AuthControler {
  static login(req, res) {
    res.render("auth/login");
  }
  static register(req, res) {
    res.render("auth/register");
  }
  static async registerPost(req, res) {
    const { name, email, password, confirmpassword } = req.body;

    if (password != confirmpassword) {
      req.flash("message", "As senhas não conferem, tente novamente");
      res.render("auth/register");
      res.redirect("auth/register");
    }
    const checkUser = await User.findOne({ where: { email: email } });
    if (checkUser) {
      req.flash("message", "Email já cadastrado");
      res.render("auth/register");
      res.redirect("auth/register");
    }

    const salt = bcryptjs.genSaltSync(20);
    const hashedPassword = bcryptjs.hashSync(password, salt);

    const user = {
      name,
      email,
      password: hashedPassword,
    };
    try {
      const createdUser = await User.create(user);

      req.session.userid = createdUser.id;

      req.flash("message", "Cadastro realizado com sucesso");

      req.session.save(() => {
        return res.redirect("/");
      });
    } catch (error) {
      console.log(error);
    }
  }
  static logout(req, res) {
    req.session.destroy();
    res.redirect("/login");
  }
  static async loginPost(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email: email },
    });
    if (!user) {
      req.flash("message", "Usuário não encontrado");
      res.render("auth/login");
      return;
    }
    const passwordMatch = bcryptjs.compareSync(password, user.password);
    if (!passwordMatch) {
      req.flash("message", "Senha inválida");
      res.render("auth/login");
      return;
    }
    try {
      req.session.userid = user.id;

      req.flash("message", "Logado");

      req.session.save(() => {
        return res.redirect("/");
      });
    } catch (error) {
      console.log(error);
    }
  }
};
