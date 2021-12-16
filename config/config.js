const CryptoJS = require('crypto-js')

module.exports = () =>{
  const API_KEY = process.env.API_KEY;
  const SECRET = process.env.SECRET;
  const path = "/v2/quotations";
  const method = "POST";
  const time = new Date().getTime().toString();
  const rawSignature = `${time}\r\n${method}\r\n${path}\r\n\r\n${body}`;
  const SIGNATURE = CryptoJS.HmacSHA256(rawSignature, SECRET).toString();

  const Authorization = `hmac ${API_KEY}:${time}:${SIGNATURE}`
  return Authorization;
}