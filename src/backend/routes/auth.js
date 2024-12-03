const express = require("express");
const bcrypt = require("bcryptjs");
const { Pool } = require("pg"); // Import pg Pool for PostgreSQL
const router = express.Router();
const nodemailer = require("nodemailer");
const multer = require("multer");
require("dotenv").config();
const pool = new Pool({
  user: process.env.DATABASE_USERNAME,
  host: process.env.DATABASE_HOST_NAME,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});

pool.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  } else {
    console.log("Connected to the PostgreSQL database");
    console.log("Backend API Running");
  }
});

const transporter = nodemailer.createTransport({
  host: process.env.MAILER_HOST,
  port: process.env.MAILER_PORT,
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASSWORD,
  },
});
async function createBill(account_id) {
  const query = `select a.account_id,p.plan_price, a.billing_date, a.curr_plan from accounts a 
    inner join plans p on a.curr_plan = p.plan_id
    where a.user_id = $1`;
  const resp = await queryDatabase(query, [account_id]);
  console.log(resp);
  if (resp) {
    const create = `INSERT INTO public.bill(
            bill_id, bill_account_id, due_date, ammount, plan, stat, ammount_paid)
            VALUES ($1, $2, $3, $4, $5, $6, $7)`;
    const bill_id = await genId("bill", "bill_id", 165552317);
    const date = new Date();
    const currentDate = new Date(); // Assuming this is your current date object
    const nextMonth = currentDate.getMonth() + 1; // Get next month (current month + 1)
    const nextYear =
      nextMonth === 12
        ? currentDate.getFullYear() + 1
        : currentDate.getFullYear();
    const nextMonthNumber = nextMonth === 12 ? 1 : nextMonth; // If December, move to January

    // Use resp[0].billing_date for the day (assuming it's a valid day in the month)
    const due_date =
      nextYear +
      "-" +
      String(nextMonthNumber).padStart(2, "0") +
      "-" +
      String(resp[0].billing_date).padStart(2, "0");
    const insert = await queryDatabase(create, [
      bill_id,
      resp[0].account_id,
      due_date,
      resp[0].plan_price,
      resp[0].curr_plan,
      "76522",
      "0",
    ]);
    if (insert) {
      return insert;
    } else {
      console.log(resp);
      return resp;
    }
  } else {
    console.log(resp);
    return resp;
  }
}
// Function to query the database
function queryDatabase(query, params) {
  if (params != null) {
    console.log("running query : " + query);
    console.log("       params : " + params);
    return new Promise((resolve, reject) => {
      pool.query(query, params, (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results.rows);
      });
    });
  } else {
    console.log("running query : " + query);
    return new Promise((resolve, reject) => {
      pool.query(query, (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results.rows);
      });
    });
  }
}
async function sendEmail(to, subject, message, html, attachments) {
  // Mail options
  const mailOptions = {
    from: process.env.MAILER_USER, // Sender address
    to: to, // Recipient email
    subject: subject, // Subject line
    text: message, // Plain text body
    html: html, // HTML body
    attachments: attachments, // File attachments
  };

  // Send the email
  try {
    console.log("sending email to : " + to);
    console.log("         subject : " + subject);
    const info = await transporter.sendMail(mailOptions);
    if (info) {
      console.log("error sending Email : " + info);
      return true;
    }
  } catch (error) {
    console.log("Failed : " + error);
    return false;
  }
}

async function sendBill(bill_id) {
  console.log("sending Bill to Customer");
  const query = `select b.bill_id,p.payment_id,p.payment_date,pt.payment_name, b.due_date,b.ammount,b.ammount_paid, a.billing_address, u.email,
    CONCAT(u.first_name, ' ', u.last_name) as "fullName" from bill b 
	inner join accounts a on b.bill_account_id = a.account_id
	inner join users u on u.user_id = a.user_id
	inner join payments p on b.bill_id = p.bill_id
	inner join paymentoption pt on pt.payment_id = p.payment_type
	where b.bill_id = $1`;
  try {
    console.log("executing query : \n" + query);
    const response = await queryDatabase(query, [bill_id]);
    if (response) {
      console.log(response);
      const html =
        `
            <div className="bg-gray-100 text-gray-800 font-sans max-w-5xl mx-auto p-5 border border-gray-300 rounded-lg">
                 <div className="text-center mb-5">
                   <img src="https://via.placeholder.com/150" alt="One Konek Logo" className="mx-auto mb-2" />
                   <h2 className="text-lg font-bold">
                     ONE-KONEK NETWORK AND DATA SOLUTION
                   </h2>
                   <p>Company ID: 001</p>
                   <p>Tax ID: 343297890000</p>
                   <p>
                     0029 MH Del Pilar, Barangay San Sebastian, Hagonoy Bulacan 3002,
                     Philippines
                   </p>
                 </div>
           
                 <h3 className="text-center text-xl font-semibold mb-5">
                   PAYMENT RECEIPT
                 </h3>
           
                 <div className="flex justify-between mb-5">
                   <div>
                     <p>
                       <strong>Payment Date:</strong> ` +
        response[0].payment_date +
        `
                     </p>
                     <p>
                       <strong>Reference Number:</strong> ` +
        response[0].payment_id +
        `
                     </p>
                     <p>
                       <strong>Payment Mode:</strong>` +
        response[0].payment_name +
        ` 
                     </p>
                   </div>
                   <div className="text-right p-3 bg-green-100 border border-green-300 rounded">
                     <h4 className="font-semibold">Amount Received</h4>
                     <p className="text-2xl font-bold m-0">PHP ` +
        response[0].ammount_paid +
        `.00</p>
                   </div>
                 </div>
           
                 <div className="mb-5">
                   <h4 className="font-semibold">Bill To</h4>
                   <p>` +
        response[0].fullName +
        `</p>
                   <p>` +
        response[0].billing_address +
        `</p>
                 </div>
           
                 <h4 className="font-semibold">Payment for</h4>
                 <table className="w-full border-collapse border border-gray-300">
                   <thead>
                     <tr className="bg-gray-100">
                       <th className="border border-gray-300 px-3 py-2">Invoice Number</th>
                       <th className="border border-gray-300 px-3 py-2">Invoice Date</th>
                       <th className="border border-gray-300 px-3 py-2">Invoice Amount</th>
                       <th className="border border-gray-300 px-3 py-2">Payment Amount</th>
                     </tr>
                   </thead>
                   <tbody>
                     <tr>
                       <td className="border border-gray-300 px-3 py-2">` +
        response[0].bill_id +
        `</td>
                       <td className="border border-gray-300 px-3 py-2">` +
        response[0].due_date +
        `</td>
                       <td className="border border-gray-300 px-3 py-2">PHP ` +
        response[0].ammount +
        `.00</td>
                       <td className="border border-gray-300 px-3 py-2">PHP ` +
        response[0].ammount_paid +
        `.00</td>
                     </tr>
                   </tbody>
                 </table>
               </div>`;
      console.log(response[0]);
      console.log("sending Email to : " + response[0].email);
      const emailsent = await sendEmail(
        response[0].email,
        "One-Konek E-Billing",
        html,
        html
      );
      if (emailsent) {
        console.log("Email sent to : " + response[0].email);
        return true;
      } else {
        console.log(
          "Failed to send email to : " + response[0].email + emailsent
        );
        return false;
      }
    } else {
      console.log(response);
    }
  } catch (error) {
    return error;
  }
}
// Function to get restriction details
async function getRestriction(accountId) {
  try {
    const query = `
            SELECT u.user_id, acc_type.position 
            FROM users u 
            INNER JOIN acounttype acc_type 
            ON u.restriction = acc_type.restriction_id
            WHERE u.user_id = $1
        `;
    console.log("executing query : \n" + query);
    const results = await queryDatabase(query, [accountId]);

    if (results.length === 0) {
      throw new Error("No user found");
    }

    const restrictionData = results[0];
    const hashedRestriction = await bcrypt.hash(restrictionData.position, 10);
    return hashedRestriction;
  } catch (error) {
    throw error;
  }
}

// Function to check if a username is unique
async function checkUsername(username) {
  try {
    const query = "SELECT * FROM login WHERE username = $1";
    const results = await queryDatabase(query, [username]);
    if (results.length == 0) { return true; }
    else { return false; }
  } catch (error) {
    throw error;
  }
}

// Function to verify password
async function verifyPassword(accountId, password) {
  try {
    const query = "SELECT * FROM login WHERE account_id = $1";
    const results = await queryDatabase(query, [accountId]);

    if (results.length === 0) {
      throw new Error("No user found");
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.pword);
    return isMatch;
  } catch (error) {
    throw error;
  }
}

// Function to verify email uniqueness
async function verifyEmail(email) {
  try {
    const query = "SELECT * FROM users WHERE email = $1";
    const results = await queryDatabase(query, [email]);
    if (results.length === 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
}
// Function to generate a unique ID
async function genId(table, field, length) {
  let isUnique = false;
  let id;
  while (!isUnique) {
    id = Math.floor(Math.random() * length);
    const query = `SELECT * FROM ${table} WHERE ${field} = $1`;
    const results = await queryDatabase(query, [id]);
    isUnique = results.length === 0;
  }
  return id;
}
// Function to insert log
async function insertLog(userId, action, ipAddress) {
  const query =
    "INSERT INTO systemlogs (log_id,user_id, time_date,action_taken, ip_address) VALUES  ($1, $2, $3, $4, $5)";
  const id = await genId("systemlogs", "log_id", 123456789);
  // Execute the query with parameters
  const resp = queryDatabase(query, [
    id,
    userId,
    Date.now(),
    action,
    ipAddress,
  ]);
  console.log(resp);
}

router.post("/forgot-password", async (req, res) => {
  debugger;
  //generate new password
  const password = await genId("users", "user_id", 999999999);
  const newPassword = bcrypt.hash(password, 10);
  const text = `Password Reset has been Initiated\n\n
                this is your new Password : ${password}\n
                we recommend that you change it immediately after the first login\n

                if you didn't do this changes, consider securing your email and password for your security
            `;
  const html = `Password Reset has been Initiated\n\n
                this is your new Password : ${password}\n
                we recommend that you change it immediately after the first login\n

                if you didn't do this changes, consider securing your email and password for your security
            `;
  const query = `UPDATE public.login
        SET pass_word=$1
        WHERE account_id= $2;`;
  const results = await verifyEmail(req.body.email);
  if (results.length != 0) {
    const resp = await queryDatabase(query, [newPassword, results[0].user_id]);
    if (resp.length >= 0) {
      sendEmail(req.body.email, "Password Recovery", text, html);

      return res.status(200).json({
        resp: "Password has been reset! please check your email for the instrunctions",
      });
    }
  } else {
    return res.status(200).json({
      resp: "Password has been reset! please check your email for the instrunctions",
    });
  }
});

router.post("/redirect", async (req, res) => {
  try {
    const { data } = req.body;

    const admin = await bcrypt.compare("Admin", data);
    if (admin) {
      return res.status(200).json({ path: "/Admin" });
    }

    const teamLeader = await bcrypt.compare("Team Leader", data);
    if (teamLeader) {
      return res.status(200).json({ path: "/Technician" });
    }

    const staff = await bcrypt.compare("Staff", data);
    if (staff) {
      return res.status(200).json({ path: "/Staff" });
    }
  } catch (error) {
    return res.status(400).json({ code: error.message });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Please enter both username and password." });
    }
    const query = "SELECT * FROM login WHERE username = $1";
    const results = await queryDatabase(query, [username]);

    if (results.length === 0) {
      return res.status(400).json({ error: "Invalid username or password." });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.pass_word);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid username or password." });
    }

    const restriction = await getRestriction(user.account_id);
    const token = await bcrypt.hash(user.pass_word, 10);
    return res.json({
      message: "Login successful",
      token: token,
      zhas2chasT: restriction,
      auth: user.account_id,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error", code: error.message });
  }
});

// Update login details
router.post("/updateLoginDetails", async (req, res) => {
  const { hsdn2owet, username, password, confPass } = req.body;
  try {
    const updates = [];
    const values = [];
    updates.push("username = $1");
    values.push(username);

    if (confPass === password) {
      updates.push("pass_word = $2");
      values.push(await bcrypt.hash(password, 10));
    } else {
      return res.status(401).json({ error: "New password does not match" });
    }

    const sql = `UPDATE login SET ${updates.join(
      ", "
    )} WHERE account_id = $3`;
    values.push(hsdn2owet);
    await queryDatabase(sql, values);
    res.send("User login details updated successfully!");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/updateBillingAddress", async (req, res) => {
  const { hsdn2owet, billing_address } = req.body;
  try {
    const updates = [];
    const values = [];

    if (billing_address)
      updates.push("billing_address = $1") && values.push(billing_address);
    values.push(hsdn2owet);
    const sql = `UPDATE accounts SET billing_address = $1 WHERE user_id = $2`;
    await queryDatabase(sql, values);
    res.send("Billing Information updated successfully!");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Update user information
router.post("/updateUserInfo", async (req, res) => {
  const { hsdn2owet, contactNum, email, passConfirm } = req.body;
  try {
    const updates = [];
    const values = [];

    if (contactNum) updates.push("contact_num = $1") && values.push(contactNum);
    if (email) updates.push("email = $2") && values.push(email);

    values.push(hsdn2owet);
    const sql = `UPDATE users SET ${updates.join(", ")} WHERE user_id = $3`;
    await queryDatabase(sql, values);
    res.send("User information updated successfully!");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//inquire customer
router.post("/inquire", async (req, res) => {
  debugger;
  let x;
  console.log("inquiry initiated");
  const {
    fname,
    mname,
    lname,
    contactNum,
    address,
    email,
    birthday,
    mothersMaidenName,
    plan,
    billing_address,
    landmark,
  } = req.body;

  console.log("starting user id generation");
  const userId = await genId("users", "user_id", 9999999999);
  console.log("generated user id " + userId);
  console.log("starting account id generation");
  const accountId = await genId("accounts", "account_id", 9999999999);
  console.log("generated user id " + accountId);
  console.log("verifying if the email is already used");
  if (verifyEmail(email)) {
    if (
      fname === "" ||
      mname === "" ||
      lname === "" ||
      contactNum === "" ||
      address === "" ||
      email === ""
    ) {
      return res.status(400).json({ error: "fields must not be empty" });
    } else {
      const query = `
                INSERT INTO public.users(
                user_id, first_name, middle_name, last_name, age, email, contact_num, address, profilepic, restriction, birthdate)
                                            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`;
      x = await queryDatabase(query, [
        userId,
        fname,
        mname,
        lname,
        0,
        email,
        contactNum,
        address,
        "",
        25464136855,
        birthday,
      ]);
      if (x) {
        const newAccountQuery = `INSERT INTO public.accounts(
	server_conn, curr_plan, account_id, billing_date, stat, user_id, mother_maiden_name, billing_address, nearest_landmark)
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`;
        x = await queryDatabase(newAccountQuery, [
          null,
          plan,
          accountId,
          null,
          6201,
          userId,
          mothersMaidenName,
          billing_address,
          landmark,
        ]);
        if (x) {
          return res.status(200).send({
            message:
              "Success! we will send a confirmation message through your email address about your account status",
          });
        } else {
          return res.status(301).send({ message: x });
        }
      }
    }
  } else {
    console.log("email already in use");
    return res.status(400).json({ error: "Email is already in use" });
  }
});
// Retrieve user details using the authorization token
router.post("/fgbjmndo234bnkjcslknsqewrSADqwebnSFasq", async (req, res) => {
  debugger;
  const { authorizationToken } = req.body;
  const query = "SELECT * FROM users u WHERE u.user_id = $1";

  if (authorizationToken) {
    try {
      const results = await queryDatabase(query, [authorizationToken]);
      console.log(results);
      if (results == null) {
        return res.status(300).json({ error: "No results found" });
      } else {
        const buffer = results[0].profilepic;
        const Image = buffer.toString("base64");
        res.status(200).json({ rawData: results, Image });
      }
    } catch (error) {
      return res.status(500).json({ error: "Server error", details: error });
    }
  } else {
    return res.status(400).json({ error: "No Token is Given" });
  }
});

// Get transactions
router.post("/getTransactions", async (req, res) => {
  debugger;
  const authorizationToken = req.body;
  const query = `
        select p.payment_id,p.payment_type,a.account_id, p.total_paid,p.rebate, pl.plan_name, p.bill_id,p.payment_date, b.due_date, CONCAT(u.first_name, ' ', u.last_name) as name 
        from payments p 
        left join users u on p.cashier_id = u.user_id
        inner join bill b on p.bill_id = b.bill_id
		inner join plans pl on b.plan = pl.plan_id
        inner join accounts a on b.bill_account_id = a.account_id
    `;

  if (authorizationToken) {
    try {
      const results = await queryDatabase(query);
      return res.json(results);
    } catch (error) {
      return res.status(400).json({ error });
    }
  } else {
    return res
      .status(400)
      .json({ message: "Error! Authentication token not valid!" });
  }
});

router.post("/loadAccountDetails", async (req, res) => {
  const { authorizationToken, user_id } = req.body;
  if (authorizationToken && user_id) {
    const query = `SELECT * FROM accounts a 
                        INNER JOIN users u ON a.user_id = u.user_id 
                        INNER JOIN plans p on a.curr_plan = p.plan_id
                        WHERE a.user_id = $1`;
    try {
      const results = await queryDatabase(query, [user_id]);
      res.json(results);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
});

// Get customer's bill records
router.post("/getCustomerBills", async (req, res) => {
  const { authorizationToken, customerId } = req.body;
  const query = `
        select * from bill b
 inner join plans p on b."plan" = p.plan_id
	where b.bill_account_id = $1 and b.stat = 76522
    `;

  if (authorizationToken) {
    try {
      const results = await queryDatabase(query, [customerId]);
      res.json(results);
    } catch (error) {
      return res.status(400).json({ error });
    }
  } else {
    return res
      .status(400)
      .json({ message: "Error! Authentication token not valid!" });
  }
});
router.post("/getBillHistory", async (req, res) => {
  const { authorizationToken, customerId } = req.body;
  const query = `
        select * from bill b
 inner join plans p on b."plan" = p.plan_id
 inner join accounts a on b.bill_account_id = a.account_id
 inner join users u on a.user_id = u.user_id
	where b.bill_account_id = $1
    `;

  if (authorizationToken) {
    try {
      const results = await queryDatabase(query, [customerId]);
      res.json({ data: results });
    } catch (error) {
      return res.status(400).json({ error });
    }
  } else {
    return res
      .status(400)
      .json({ message: "Error! Authentication token not valid!" });
  }
});
router.post("/updatePosition", async (req, res) => {
  debugger;
  const { authorizationToken, authKey, position, emp_id } = req.body;
  const resp = await queryDatabase(
    "SELECT * FROM login where account_id = $1",
    [authorizationToken]
  );
  if (resp.length != 0 && (await bcrypt.compare(authKey, resp[0].pass_word))) {
    const query = `UPDATE public.users
                        SET restriction=$1
                        WHERE user_id = $2`;
    try {
      const response = await queryDatabase(query, [position, emp_id]);
      res.json({ message: response });
    } catch (error) {
      return res.status(400).json({ error });
    }
  } else {
    return res
      .status(401)
      .json({ error: "Invalid authorization token or password" });
  }
});
// Get staff details
router.post("/getStaff", async (req, res) => {
  const authorizationToken = req.body;
  const query = `
        SELECT users.user_id AS id, 
               CONCAT(users.first_name, ' ', users.last_name) AS name, 
               users.email, 
               users.contact_num AS contact, 
               acounttype.position
        FROM users 
        INNER JOIN acounttype ON users.restriction = acounttype.restriction_id
        WHERE users.restriction = 25464136865 or users.restriction = 25464136835 or users.restriction = 25464136836 or users.restriction = 25464136840
    `;

  if (authorizationToken) {
    try {
      const results = await queryDatabase(query);
      res.json(results);
    } catch (error) {
      return res.status(400).json({ error });
    }
  } else {
    return res.status(400).json({ error: "No token provided" });
  }
});
router.get("/getPositions", async (req, res) => {
  const authorizationToken = req.body;
  const query = `select * from acounttype
    where restriction_id != 25464136845 and restriction_id != 25464136855`;
  if (authorizationToken) {
    return res.status(200).json({ data: await queryDatabase(query) });
  } else {
    return res.status(400).json({ error: "No token provided" });
  }
});
// Get plans
router.post("/getPlans", async (req, res) => {
  const authorizationToken = req.body;
  const query = "SELECT * FROM plans";

  if (authorizationToken) {
    try {
      const results = await queryDatabase(query);
      res.json(results);
    } catch (error) {
      return res.status(400).json({ error });
    }
  } else {
    return res.status(400).json({ error: "No token provided" });
  }
});
router.post("/getPositions", async (req, res) => {
  const authorizationToken = req.body;
  const query =
    "select * from acounttype where acounttype.restriction_id != 25464136845  and acounttype.restriction_id != 25464136855";

  if (authorizationToken) {
    try {
      const results = await queryDatabase(query);
      res.json(results);
    } catch (error) {
      return res.status(400).json({ error });
    }
  } else {
    return res.status(400).json({ error: "No token provided" });
  }
});
// Get customers
router.post("/getCustomers", async (req, res) => {
  debugger;
  const authorizationToken = req.body.token;
  const search = req.body.search;

  const query = `SELECT accounts.account_id,
                CONCAT(users.first_name, ' ', users.last_name) AS "fullName",
                users.address,
                users.email,
                plans.plan_name,
                accounts.billing_date,
                accounts.stat
         FROM users
         inner JOIN accounts ON users.user_id = accounts.user_id
         left JOIN plans ON accounts.curr_plan = plans.plan_id`;

  if (authorizationToken) {
    try {
      const results = await queryDatabase(query);
      res.json(results);
    } catch (error) {
      return res.status(400).json({ error });
    }
  } else {
    return res.status(400).json({ error: "No token provided" });
  }
});
router.post("/sendTicket", async (req, res) => {
  const user = req.body.user;
  const problem = req.body.problem;
  const desc = req.body.desc;
  if (problem && desc && user) {
    const ticketid = await genId("tickets", "ticked_id", 9999999999);
    const query = `INSERT INTO public.tickets(
	account_id, ticked_id, ticket_title, ticket_description, stat, technician_id, tl_id)
	VALUES ($1, $2, $3, $4, 10, null, null);`;
    const updateResp = await queryDatabase(query, [
      user,
      ticketid,
      problem,
      desc,
    ]);
    if (updateResp) {
      return res.status(200).json({ message: "Ticket sent successfully" });
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

router.post("/paybill", async (req, res) => {
  debugger;
  const authorizationToken = req.body.token;
  const reciever = req.body.reciever;
  const amount = req.body.amount;
  const bill_id = req.body.bill_id;
  const bill_stat = req.body.stat;
  const paymentType = req.body.payment_type;
  const prorated = req.body.prorated;

  if (authorizationToken) {
    let query = `UPDATE public.bill
            SET  stat=$1, ammount_paid=$2
            WHERE bill_id=$3`;
    const updateResp = await queryDatabase(query, [bill_stat, amount, bill_id]);
    if (updateResp) {
      query = `INSERT INTO public.payments(
            payment_id, cashier_id, rebate, total_paid, payment_date, payment_type, bill_id)
            VALUES ($1, $2,$3, $4, $5, $6, $7);`;
      // payment type 100000003 = xendit;
      //  100000002 = paymaya;
      const paymentResp = await queryDatabase(query, [
        await genId("payments", "payment_id", 533421223888775),
        reciever,
        prorated,
        amount,
        new Date(),
        paymentType,
        bill_id,
      ]);
      if (paymentResp) {
        const billsent = await sendBill(bill_id);
        if (billsent) {
          return res.status(200).json({ message: "Payment successful" });
        } else {
          return res.status(400).json({ message: "Payment failed" });
        }
      }
    } else {
      return res.status(400).json({ message: "Payment failed" });
    }
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
});

router.post("/get-ticket", async (req, res) => {
  const authorizationToken = req.body.token;
  if (authorizationToken) {
    const query = `SELECT * FROM tickets`;
    try {
      const results = await queryDatabase(query);
      res.json({ data: results });
    } catch (error) {
      return res.status(400).json({ error });
    }
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
});
router.post("/solveTicket", async (req, res) => {
  const authorizationToken = req.body.token;
  const ticketId = req.body.ticketId;
  const technician_id = req.body.technician_id;
  const tl_id = req.body.tl_id;
  if (authorizationToken) {
    const query = `UPDATE tickets SET tl_id = $1, technician_id = $2, stat = 11 WHERE ticked_id = $3`;
    try {
      const results = await queryDatabase(query, [
        tl_id,
        technician_id,
        ticketId,
      ]);
      if (results) {
        return res.json({ message: "team has been deployed" });
      }
    } catch (error) {
      return res.status(400).json({ error });
    }
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
});
router.post("/installationRequests", async (req, res) => {
  const authorizationToken = req.body.token;
  if (authorizationToken) {
    const query = `select concat(u.first_name,' ', u.last_name) as fullName,a.account_id,u.user_id, u.email,u.contact_num, a.mother_maiden_name,u.address, a.nearest_landmark
                        from users u 
                        inner join accounts a on u.user_id = a.user_id 
                        where a.stat = 6201`;
    try {
      const results = await queryDatabase(query);
      if (results) {
        return res.json({ data: results });
      }
    } catch (error) {
      return res.status(400).json({ error });
    }
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
});
router.post("/accountTicket", async (req, res) => {
  const authorizationToken = req.body.token;
  const accountId = req.body.accountId;
  if (authorizationToken) {
    const query = `SELECT * FROM tickets WHERE account_id = $1`;
    try {
      const results = await queryDatabase(query, [accountId]);
      res.json(results);
    } catch (error) {
      return res.status(400).json({ error });
    }
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
});

router.post("/install", async (req, res) => {
  debugger;
  const authorizationToken = req.body.token;
  const email = req.body.email;
  const accountId = req.body.accountId;
  const server = req.body.server;
  const plan = req.body.plan;
  const bilingDate = req.body.bilingDate;
  const user_id = req.body.user_id;
  if (authorizationToken) {
    const query = `UPDATE public.accounts
                        SET server_conn=$1, curr_plan=$2, billing_date=$3, stat=5522
                        WHERE user_id = $4;`;
    try {
      const results = await queryDatabase(query, [
        server,
        plan,
        bilingDate,
        user_id,
      ]);
      if (results) {
        const newLogin = `INSERT INTO public.login(
                                    username, pass_word, account_id)
                                    VALUES ($1, $2, $3);`;
        const password = await bcrypt.hash(accountId, 10);
        const resp = await queryDatabase(newLogin, [email, password, user_id]);
        if (resp) {
          const activationMail = await sendEmail(
            email,
            "One Konek Account Activation",
            "your Account has been activated use this password to login : " +
            accountId,
            "your Account has been activated use this password to login : " +
            accountId
          );
          if (activationMail) {
            const createAccountBill = await createBill(accountId);
            if (createAccountBill) {
              return res.json({ message: "Account Activated" });
            }
          } else {
            return res.json({ message: "Failed to send activation email" });
          }
        } else {
          return res.json({ message: "cannot activate account" });
        }
      }
    } catch (error) {
      return res.status(400).json({ error });
    }
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
});

router.post("/soveTicketNow", async (req, res) => {
  const ticket_status = req.body.stat;
  const ticket_id = req.body.ticket_id;
  const ticketResponse = req.body.ticketResponse;
  const getTicket = `select u.email,ticked_id, t.ticket_title, t.ticket_description  from tickets t
	inner join accounts a on t.account_id = a.account_id
	inner join users u on a.user_id = u.user_id where ticked_id = $1`;
  const resp = await queryDatabase(getTicket, [ticket_id]);
  if (resp) {
    const html =
      `To our Dear Customer,
            this is to inform you that your concern Titled : ` +
      resp[0].ticket_title +
      `,
            ` +
      ticketResponse +
      `
             `;
    const sendmail = await sendEmail(
      resp[0].email,
      "One Konek Ticket :" + ticket_id,
      html,
      html
    );
    if (sendmail) {
      const updateTicket = `UPDATE public.tickets
                                        SET  stat=$1, resp = $2
                                        WHERE ticked_id = $3`;
      const response = await queryDatabase(updateTicket, [
        ticket_status,
        ticketResponse,
        ticket_id,
      ]);
      if (response) {
        return res.json({ message: "your response has been sent to customer" });
      }
    } else {
      return res.status(302).json({ sendmail });
    }
  } else {
    return res.status(301).json({ resp });
  }
});

router.post("/getLogs", async (req, res) => {
  debugger;
  const authorizationToken = req.body.token;
  if (authorizationToken) {
    const query = `select sl.log_id,sl.time_date, CONCAT(u.first_name, ' ', u.last_name) as fullName, sl.action_taken,sl.ip_address 
                        from systemlogs sl 
                        inner join users u on sl.user_id = u.user_id 
                        order by sl.time_date desc`;
    try {
      const results = await queryDatabase(query);
      if (results) {
        return res.json({ data: results });
      }
    } catch (error) {
      return res.status(400).json({ error });
    }
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
});

router.post("/declineInstallation", async (req, res) => {
  const account_id = req.body.account_id;
  const reason = req.body.reason;
  const html =
    `Dear Customer, we are sadly to inform you that your application with us has been declined due to following reasons:` +
    reason;
  try {
    const getInfo = `select * from accounts a 
    inner join users u on a.user_id = u.user_id
    where u.user_id = $1`;
    const resp = await queryDatabase(getInfo, [account_id]);
    if (resp) {
      const query = `UPDATE public.accounts
	SET  stat=$1
	WHERE accounts.account_id = $2;`;
      const updateAccount = await queryDatabase(query, [
        5462,
        resp[0].account_id,
      ]);
      if (updateAccount) {
        console.log(updateAccount);
        const sendMail = await sendEmail(
          resp[0].email,
          "One Konek Installation Request",
          html,
          html
        );
        console.log(sendMail);
        return res
          .status(200)
          .json({ message: "account has been successfully declined" });
      } else {
        console.log(updateAccount);
        return res.json({
          message: "there was a problem updating the account",
        });
      }
    } else {
      console.log(resp);
      return res.json({ message: "Account not found" });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      message:
        "there was a problem with the system, please contact your system administrator",
    });
  }
});

router.post("/updatePlans", async (req, res) => {
  const authorizationToken = req.body.token;
  const account_id = req.body.account_id;
  const newPlan = req.body.plan;
  const newPLanName = req.body.planName;
  if (authorizationToken) {
    const query = `SELECT * FROM users u 
        inner join accounts a on u.user_id = a.user_id
        where a.account_id = $1`;
    try {
      const results = await queryDatabase(query, [account_id]);
      if (results) {
        const updateQuery = `UPDATE public.accounts SET curr_plan=$1 WHERE account_id=$2`;
        try {
          const updateResponse = await queryDatabase(updateQuery, [
            newPlan,
            account_id,
          ]);
          if (updateResponse) {
            const html =
              `your request for change of Internet Plan has been Approved, You are now using : ` +
              newPLanName;
            const sendMail = await sendEmail(
              results[0].email,
              "One Konek : Changing your Account Plans",
              html,
              html
            );
            return res.json({ message: "plan updated successfully" });
          } else {
            console.log(updateResponse);
            return res.json({
              message: "there was a problem updating the plan",
            });
          }
        } catch (error) {
          console.log(error);
          return res.json({
            message:
              "there was a problem with the system, please contact your system administrator",
          });
        }
      }
    } catch (error) {
      console.log(error);
      return res.json({
        message:
          "there was a problem with the system, please contact your system administrator",
      });
    }
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
});

router.post("/getCustomerTransaction", async (req, res) => {
  const authorizationToken = req.body.token;
  const account_id = req.body.account_id;
  if (authorizationToken) {
    const query = `select b.*, p.plan_name from bill b
 left join plans p on b."plan" = p.plan_id
	where b.bill_account_id = $1
  order by b.stat asc`;
    try {
      const results = await queryDatabase(query, [account_id]);
      if (results) {
        return res.json({ results });
      }
    } catch (error) {
      console.log(error);
      return res.json({
        message:
          "there was a problem with the system, please contact your system administrator",
      });
    }
  } else {
    return res.status(401).json({ error: "unauthorized" });
  }
});
router.post("/getNotifications", async (req, res) => {
  const authorizationToken = req.body.token;
  if (authorizationToken) {
    const query = `select * from notif n inner join notif_type nt on n.notif_type = nt.notif_type_id`;
    try {
      const results = await queryDatabase(query);
      if (results) {
        return res.json({ results });
      }
    } catch (error) {
      console.log(error);
      return res.json({
        message:
          "there was a problem with the system, please contact your system administrator",
      });
    }
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
});
router.post("/addNewNotification", async (req, res) => {
  const authorizationToken = req.body.token;
  const newNotif = req.body.newNotif;
  if (authorizationToken) {
    const query = `INSERT INTO public.notif(
	notif_id, creator, notif_type, notif_body, notif_creation_date, notif_ending_date)
	VALUES ($1, $2, $3, $4, $5, $6);`;
    try {
      const newNotifid = await genId('notif', 'notif_id', 999935123);
      if (results) {
        return res.json({ message: "Notification added successfully" });
      }
    } catch (error) {
      console.log(error);
      return res.json({
        message:
          "there was a problem with the system, please contact your system administrator",
      });
    }
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
});

router.post("/getNotifications", async (req, res) => {
  const query = `SELECT * FROM notif n inner join notif_type nt on n.notif_type = nt.notif_type_id`;
  const resp = await queryDatabase(query);
  if (resp) {
    return res.json({ resp });
  } else {
    console.log("error in getting notifications");
    return res.status(400).json({ error: "Error in getting notifications" });
  }
});
router.post("/newNotifications", async (req, res) => {
  const creator = req.body.creator;
  const type = req.body.type;
  const body = req.body.body;
  const start = req.body.start;
  const end = req.body.end;
  const query = `INSERT INTO public.notif(
	notif_id, creator, notif_type, notif_body, notif_creation_date, notif_ending_date)
	VALUES ($1, $2, $3, $4, $5, $6);`;
  const notif_id = await genId("notif", "notif_id", 1234567890);
  const resp = await queryDatabase(query, [
    notif_id,
    creator,
    type,
    body,
    start,
    end,
  ]);
  if (resp) {
    return res.json({ message: "Notification added successfully" });
  } else {
    console.log("error in adding new notification");
    return res.status(400).json({ error: "Error in adding new notification" });
  }
});

const storage = multer.memoryStorage(); // Store files in memory as Buffer objects
const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // Limit file size to 10MB
});

router.post("/send-soa", upload.single("file"), async (req, res) => {
  const email = req.body.email;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  if (!email) {
    return res.status(400).json({ message: "No email provided." });
  }

  try {
    // Configure your SMTP transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail", // e.g., Gmail, Outlook, etc.
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.MAILER_USER, // Sender address from environment variables
      to: email, // List of receivers
      subject: "Your Statement of Account (SOA)",
      text: "Please find attached your Statement of Account.",
      attachments: [
        {
          filename: file.originalname,
          content: file.buffer, // Attach the file buffer directly
          contentType: "application/pdf",
        },
      ],
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending email." });
  }
});

router.post("/getBills", async (req, res) => {
  const query = `SELECT * FROM bill order by due_date asc`;
  const resp = await queryDatabase(query);
  if (resp) {
    return res.json({ resp });
  } else {
    console.log("error in getting bills");
    return res.status(400).json({ error: "Error in getting bills" });
  }
});
transporter.verify().then(console.log).catch(console.error);
module.exports = router;
