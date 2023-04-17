const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB!');
});

const bookingSchema = new mongoose.Schema({
    num_tickets: Number,
    ticket_type: String,
    name: String,
    phone: String,
    address: String
  });
  
  const Booking = mongoose.model('Booking', bookingSchema);
  
  app.use(bodyParser.urlencoded({ extended: true }));

  app.post('/bookpage', (req, res) => {
    console.log(req.body);
    console.log("route")
    const numTickets = req.body.numTickets;
    const ticketType = req.body.ticketType;
    const fullName = req.body.fullName;
    const phoneNumber = req.body.phoneNumber;
    const address = req.body.address;
  
    const booking = new Booking({
      num_tickets: numTickets,
      ticket_type: ticketType,
      name: fullName,
      phone: phoneNumber,
      address: address
    });
  
    booking.save((err, booking) => {
      if (err) return console.error(err);
      console.log('Form data saved to MongoDB!');
      res.send('Form data saved to MongoDB!');
      res.send('<html><body><h1>Booking has been confirmed!</h1></body></html>');
    });
  });

  app.listen(8000, () => {
    console.log('Server started on port 8000');
  });
