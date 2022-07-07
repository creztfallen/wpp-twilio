const express = require('express');
const twilio = require('twilio');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config({ path: '.env' });
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/message', (req, res) => {
  const options = ['pedra', 'papel', 'tesoura'];

  const lose = {
    pedra: 'papel',
    papel: 'tesoura',
    tesoura: 'pedra',
  };

  const user = req.body.Body.toLowerCase();
  const win = ['LUPALINDA! Na sua cara!', 'BUYATCHAKA! Ganhei, otário!'];

  switch (user) {
    case 'pedra':
    case 'papel':
    case 'tesoura':
      const machine = options[Math.floor(Math.random() * options.length)];

      if (machine === user) {
        res.send(
          '<Response><Message>Tá lendo minha mente, maldito?!</Message></Response>'
        );
      } else {
        if (lose[machine] === user) {
          res.send(
            `<Response><Message>Droga, eu escolhi *${machine}*.</Message><Message> Você ganhou dessa vez, mas eu quero uma revanche, seu merda!</Message></Response>`
          );
        } else {
          const twiml = new twilio.twiml.MessagingResponse();
          twiml.message(`Eu escolhi *${machine}*`);
          twiml
            .message(Math.floor(Math.random() * win.length))
            .media(
              'https://c.tenor.com/_6WJAbA6J4sAAAAd/willem-dafoe-laugh.gif'
            );
          res.send(twiml.toString());
        }
      }
      break;
    default:
      res.send(
        '<Response><Message>Isso daqui é Pedra, Papel ou Tesoura, imbecil!</Message></Response>'
      );
      break;
  }
});

const PORT = process.env.PORT;
const listener = app.listen(
  PORT,
  console.log(`Server listening on port ${PORT}`)
);
