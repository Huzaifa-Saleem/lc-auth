import nodemailer from "nodemailer";
import Mailgen from "mailgen";
// //
// import { EmailBody } from "./mailBody.js";

// https://ethereal.email/create
let nodeConfig = {
  host: "mail.shashkaywashkay.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "test@shashkaywashkay.com", // generated ethereal user
    pass: "Test123", // generated ethereal password
  },
  tls: {
    ciphers: "SSLv3",
  },
  tls: {
    rejectUnauthorized: false,
  },
};

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Mailgen",
    link: "https://mailgen.js/",
  },
});

/** POST: http://localhost:8080/api/registerMail 
 * @param: {
  "username" : "example123",
  "userEmail" : "admin123",
  "text" : "",
  "subject" : "",
}
*/
export const registerMail = async (req, res) => {
  const { username, userEmail, text, subject } = req.body;

  // body of the email
  var email = {
    body: {
      name: username,
      intro:
        text ||
        "Welcome to Daily Tuition! We're very excited to have you on board.",
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };

  var emailBody = MailGenerator.generate(email);

  let message = {
    from: "test@shashkaywashkay.com",
    to: userEmail,
    subject: subject || "Signup Successful",
    html: emailBody,
  };

  // send mail
  transporter
    .sendMail(message)
    .then(() => {
      return res
        .status(200)
        .send({ msg: "You should receive an email from us." });
    })
    .catch((error) => res.status(500).send({ error }));
};
