// server.js (example)
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/send-order', async (req, res) => {
  const { name, email, phone, webname, type, details } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and Email are required!' });
  }

  // Configure your email transport (using Gmail as example)
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'yourgmail@gmail.com',
      pass: 'your-gmail-app-password', // Use app password, not regular password
    },
  });

  const mailOptions = {
    from: 'yourgmail@gmail.com',
    to: 'yourgmail@gmail.com',  // where you want to receive orders
    subject: 'New Website Order from ' + name,
    text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Website Name: ${webname}
      Website Type: ${type}
      Details: ${details}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: 'Order sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send order.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
