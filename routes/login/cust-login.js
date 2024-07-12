const router = require("express").Router();

const {custEmailCheckLogin,} = require("../../services/register-services/cust-email-check");
const { custPassCheck } = require("../../services/register-services/user-pass");
const { createToken } = require("../../server/jwt/cust-jwt");


router.get("/customer-login", async (req, res) => {
  res.render("pages/login-pages/user/user-login.ejs", {
    message: "",
    display: "none",
  });
});

router.post("/customer-login", async (req, res) => {
  const userData = {
    user_email: req.body.email,
    user_pass: req.body.pass,
  };

  //Check if email exists (it works magically)
  try {
    const emailExist = await custEmailCheckLogin(userData);
    if (emailExist) {
      //If email exists 1)match pass
      const pass_match = await custPassCheck(userData);
      if (pass_match) {
        //if pass exits. Assign signed JWT
        //Fetch cust_id , cust_email ,cust_cart_id and create token
        const accessToken = await createToken(userData);
        res.cookie("access-token", accessToken, {
          maxAge: 60 * 60 * 24 * 30 * 1000,
          httpOnly: true,
          secure: true,
          sameSite: "Strict",
        });
        res.redirect("/shop");
      } else {
        //If pass does not exist
        res.render("pages/login-pages/user/user-login.ejs", {
          message: "Invalid Password!",
          display: "flex",
        });
      }
    } else {
      //If email does not exist
      res.render("pages/login-pages/user/user-login.ejs", {
        message: "Email does not exist, New user? Register",
        display: "flex",
      });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
