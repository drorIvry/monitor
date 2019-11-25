import Account from '../dal/Account';
import Monitors from '../dal/Monitors';
export function validateBasicAuth(cryptr, req, res, next) {
  const b64auth = (req.header('authorization') || '').split(' ')[1] || '';
  const [username, password] = new Buffer.from(b64auth, 'base64').toString().split(':');
  Account.findOne({
    UserName: username
  }, (error, doc) => {
    if (error) return res.send(500, {
      error
    });

    if (!doc) {
      return res.status(401).end('Authentication required.');
    }

    const decryptedPass = cryptr.decrypt(doc.Password);

    if (!username || !password) {
      return res.status(401).send('Authentication required.');
    }

    if (username === doc.UserName && password === decryptedPass) next();else {
      return res.status(401).send('Authentication required.');
    }
  });
}
export function validateAPI(req, res, next) {
  const apiKey = req.header('monitor-api-key');

  if (!apiKey) {
    res.set('WWW-Authenticate', 'Basic realm="401"');
    return res.status(401).send('Authentication required.');
  }

  Monitors.findOne({
    APIKey: apiKey
  }, (error, doc) => {
    if (error) return res.send(500, {
      error
    });
    if (doc) next();else {
      res.set('WWW-Authenticate', 'Basic realm="401"');
      return res.status(401).send('Authentication required.');
    }
  });
}