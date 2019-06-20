const express = require ('express');
const morgan = require ('morgan');
const bodyParser = require ('body-parser');
const sgMail = require('@sendgrid/mail');


const app = express();

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/static', express.static('public'));

app.set('views', './views');

app.set('view engine', 'ejs');

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.post('/thanks', (req, res) => {
  res.render('thanks', { contact: req.body })
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'johnpgadi@gmail.com',
  from: contact.email,
  subject: `${contact.firstName} ${contact.lastName} from ${contact.company}: ${contact.subject}.`,
  text: contact.text
};
sgMail.send(msg);
  
});

app.get('/', (req, res) => {
  const data = {
    person: {
      firstName: 'John',
      lastName: 'Gadi',
    }
  }
  // Notice now the data is the second argument passed to the template render method
  res.render('index', data);
});

app.listen(5000, () => {
  console.log('listening at http://localhost:5000');
});

module.exports = app;
