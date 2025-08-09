const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Order Backend is working!');
});

app.post('/send-order', async (req, res) => {
  const { name, email, phone, webname, type, details } = req.body;

  if (!name || !email || !phone || !webname || !type || !details) {
    return res.status(400).json({ message: 'Please fill all required fields!' });
  }

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'navidabid92@gmail.com',
      pass: 'qgsqcmvbenratxpi', // Production e env file use korben
    },
  });

  const mailOptions = {
    from: 'navidabid92@gmail.com',
    to: 'navidabid92@gmail.com',
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
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send order.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
