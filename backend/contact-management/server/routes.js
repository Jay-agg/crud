const express = require("express");
const Contact = require("./model");
const nodemailer = require("nodemailer");
const router = express.Router();

// Get all contacts
router.get("/contacts", async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

// Add new contact
router.post("/contacts", async (req, res) => {
  const newContact = new Contact(req.body);
  await newContact.save();
  res.json(newContact);
});

// Update contact
router.put("/contacts/:id", async (req, res) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedContact);
});

// Delete contact
router.delete("/contacts/:id", async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: "Contact deleted" });
});

// Send email
router.post("/send-email", async (req, res) => {
  const selectedContacts = req.body.contacts;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your-email@gmail.com",
      pass: "your-email-password",
    },
  });

  let mailOptions = {
    from: "your-email@gmail.com",
    to: "info@redpositive.in",
    subject: "Selected Contacts Information",
    text: JSON.stringify(selectedContacts, null, 2),
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send("Email sent: " + info.response);
  });
});

module.exports = router;
