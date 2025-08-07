const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// Root route (fix for "Cannot GET /")
app.get('/', (req, res) => {
  res.send('Order Backend is working!');
});

// POST route for sending order (replace /api/orders if needed)
app.post('/send-order', async (req, res) => {
  const { name, email, phone, webname, type, details } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and Email are required!' });
  }

  // Configure your email transport here (example with Gmail)
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'yourgmail@gmail.com',
      pass: 'your-app-password',
    },
  });

  const mailOptions = {
    from: 'yourgmail@gmail.com',
    to: 'yourgmail@gmail.com',
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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
