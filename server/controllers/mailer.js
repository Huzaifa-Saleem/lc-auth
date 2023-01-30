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
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html lang="en">
      <head>
        <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
      </head>
      <div>
        <!--[if mso | IE]>
                <table role="presentation" width="100%" align="center" style="max-width:37.5em;background-color:#ffffff;border:1px solid #eee;border-radius:5px;box-shadow:0 5px 10px rgba(20,50,70,.2);margin-top:20px;width:360px;margin:0 auto;padding:68px 0 130px;"><tr><td></td><td style="width:37.5em;background:#ffffff">
              <![endif]-->
      </div>
      <div
        style="
          max-width: 37.5em;
          background-color: #ffffff;
          border: 1px solid #eee;
          border-radius: 5px;
          box-shadow: 0 5px 10px rgba(20, 50, 70, 0.2);
          margin-top: 20px;
          width: 360px;
          margin: 0 auto;
          padding: 68px 0 130px;
        "
      >
        <img
          alt="Plaid"
          src="https://react-email-demo-cxwer4t8o-resend.vercel.app/static/plaid-logo.png"
          width="212"
          height="88"
          style="
            display: block;
            outline: none;
            border: none;
            text-decoration: none;
            margin: 0 auto;
          "
        />
        <p
          style="
            font-size: 11px;
            line-height: 16px;
            margin: 16px 8px 8px 8px;
            color: #0a85ea;
            font-weight: 700;
            font-family: HelveticaNeue, Helvetica, Arial, sans-serif;
            height: 16px;
            letter-spacing: 0;
            text-transform: uppercase;
            text-align: center;
          "
        >
          Verify Your Identity
        </p>
        <h1
          style="
            color: #000;
            display: inline-block;
            font-family: HelveticaNeue-Medium, Helvetica, Arial, sans-serif;
            font-size: 20px;
            font-weight: 500;
            line-height: 24px;
            margin-bottom: 0;
            margin-top: 0;
            text-align: center;
          "
        >
          Enter the following code to finish linking LC-Auth.
        </h1>
        <table
          style="
            width: 280px;
            background: rgba(0, 0, 0, 0.05);
            border-radius: 4px;
            margin: 16px auto 14px;
            vertical-align: middle;
          "
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
        >
          <tbody>
            <tr>
              <td>
                <p
                  style="
                    font-size: 32px;
                    line-height: 40px;
                    margin: 0 auto;
                    color: #000;
                    display: inline-block;
                    font-family: HelveticaNeue-Bold;
                    font-weight: 700;
                    letter-spacing: 6px;
                    padding-bottom: 8px;
                    padding-top: 8px;
                    width: 100%;
                    text-align: center;
                  "
                >
                  ${text}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        <p
          style="
            font-size: 15px;
            line-height: 23px;
            margin: 0;
            color: #444;
            font-family: HelveticaNeue, Helvetica, Arial, sans-serif;
            letter-spacing: 0;
            padding: 0 40px;
            text-align: center;
          "
        >
          Not expecting this email?
        </p>
        <p
          style="
            font-size: 15px;
            line-height: 23px;
            margin: 0;
            color: #444;
            font-family: HelveticaNeue, Helvetica, Arial, sans-serif;
            letter-spacing: 0;
            padding: 0 40px;
            text-align: center;
          "
        >
          Contact Us > if you did not request this code.
        </p>
      </div>
      <div>
        <!--[if mso | IE]>
              </td><td></td></tr></table>
              <![endif]-->
      </div>
      <p
        style="
          font-size: 12px;
          line-height: 23px;
          margin: 0;
          color: #000;
          font-weight: 800;
          letter-spacing: 0;
          margin-top: 20px;
          font-family: HelveticaNeue, Helvetica, Arial, sans-serif;
          text-align: center;
          text-transform: uppercase;
        "
      >
        Securely powered by LC-Auth.
      </p>
    </html>
    `,
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
