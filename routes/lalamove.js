const express = require('express')
const axios = require('axios')
const CryptoJS = require('crypto-js')
require('dotenv').config()

var router = express.Router();

/* GET quotations. */
router.post('/quotations', async (req, res, next) => {

  const API_KEY = process.env.API_KEY;
  const SECRET = process.env.SECRET;
  const time = new Date().getTime().toString();
  const method = "POST";
  const path = "/v2/quotations";

  const body = JSON.stringify({
    scheduleAt:req.body.scheduleAt,
    serviceType: req.body.serviceType,
    specialRequests: req.body.specialRequests,
    stops: [
      {
        location: {
          lat: req.body.pick_up_point_lat,
          lng: req.body.pick_up_point_lng,
        },
        addresses: {
          ms_MY: {
            displayString:req.body.pick_up_point_displayString,
            market: req.body.market,
          },
        },
      },
      {
        location: {
          lat: req.body.drop_point_lat,
          lng: req.body.drop_point_lng,
        },
        addresses: {
          ms_MY: {
            displayString:req.body.drop_point_displayString,
            market: req.body.market,
          },
        },
      },
    ],
    requesterContact:{
      name:req.body.requesterContacName,
      phone:req.body.requesterContactPhone

    },
    deliveries: [
      {
        toStop: 1,
        toContact: {
          name: req.body.deliveriesName,
          phone: req.body.deliveriesPhone,
        },
      },
    ],
  });

  const rawSignature = `${time}\r\n${method}\r\n${path}\r\n\r\n${body}`;
  const SIGNATURE = CryptoJS.HmacSHA256(rawSignature, SECRET).toString();

  try{
    const response = await axios
    .post('https://rest.sandbox.lalamove.com'+path, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `hmac ${API_KEY}:${time}:${SIGNATURE}`,
        Accept: "application/json",
        "X-LLM-Market": req.body.market,
      },
    })
    .then((result) => {

      return res.status(200).json({
        statusCode: 200,
        data:result.data

      })
    }).catch((err) => {
      return res.status(409).json({
        statusCode:409,
        message:err.response.data
      })
    })

  }catch(e){
    return res.status(500).json({
      statusCode:500,
      message:e
    })
  }
 


});

/* Place Order */
router.post('/orders', async (req, res, next) => {
  const API_KEY = process.env.API_KEY;
  const SECRET = process.env.SECRET;
  const time = new Date().getTime().toString();
  const method = "POST";
  const path = "/v2/orders";
  const body = JSON.stringify({
    scheduleAt:req.body.scheduleAt,
    serviceType: req.body.serviceType,
    serviceType: req.body.serviceType,
    specialRequests: [],
    stops: [
      {
        location: {
          lat: req.body.pick_up_point_lat,
          lng: req.body.pick_up_point_lng,
        },
        addresses: {
          ms_MY: {
            displayString:req.body.pick_up_point_displayString,
            market: req.body.market,
          },
        },
      },
      {
        location: {
          lat: req.body.drop_point_lat,
          lng: req.body.drop_point_lng,
        },
        addresses: {
          ms_MY: {
            displayString:req.body.drop_point_displayString,
            market: req.body.market,
          },
        },
      },
    ],
    requesterContact:{
      name:req.body.requesterContacName,
      phone:req.body.requesterContactPhone

    },
    deliveries: [
      {
        toStop: 1,
        toContact: {
          name: req.body.deliveriesName,
          phone: req.body.deliveriesPhone,
        },
      },
    ],
    quotedTotalFee:{
      amount: req.body.quotedTotalFee.amount,
      currency: req.body.quotedTotalFee.currency
    },
    pod:req.body.pod
  });

  const rawSignature = `${time}\r\n${method}\r\n${path}\r\n\r\n${body}`;
  const SIGNATURE = CryptoJS.HmacSHA256(rawSignature, SECRET).toString();

  try{
    const response = await axios
    .post('https://rest.sandbox.lalamove.com'+path, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `hmac ${API_KEY}:${time}:${SIGNATURE}`,
        Accept: "application/json",
        "X-LLM-Market": req.body.market,
      },
    })
    .then((result) => {
      return res.status(200).json({
        statusCode: 200,
        data:result.data

      })
    }).catch((err) => {
      return res.status(409).json({
        statusCode:409,
        message:err.response.data
      })
    })

  }catch(e){
    return res.status(500).json({
      statusCode:500,
      message:e
    })
  }


})

router.get('/orders/:orderRef', async (req, res, next) => {
  const API_KEY = process.env.API_KEY;
  const SECRET = process.env.SECRET;
  const time = new Date().getTime().toString();
  const method = "GET";
  const path = `/v2/orders/${req.params.orderRef}`;
  const rawSignature = `${time}\r\n${method}\r\n${path}\r\n\r\n`;
  const SIGNATURE = CryptoJS.HmacSHA256(rawSignature, SECRET).toString();

  try{
    const response = await axios
    .get('https://rest.sandbox.lalamove.com'+path, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `hmac ${API_KEY}:${time}:${SIGNATURE}`,
        Accept: "application/json",
        "X-LLM-Market": req.headers.market,
      },
    })
    .then((result) => {
      if(result.data){
        return res.status(200).json({
          statusCode: 200,
          data:result.data
        })

      }
      
    }).catch((err) => {
      return res.status(409).json({
        statusCode:409,
        message:err
      })
    })

  }catch(e){
    return res.status(500).json({
      statusCode:500,
      message:e
    })
  }
})

router.get('/orders/:orderRef/drivers/:driverID', async (req, res, next) => {
  const API_KEY = process.env.API_KEY;
  const SECRET = process.env.SECRET;
  const time = new Date().getTime().toString();
  const method = "GET";
  const path = `/v2/orders/${req.params.orderRef}/drivers/${req.params.driverID}`;
  const rawSignature = `${time}\r\n${method}\r\n${path}\r\n\r\n`;
  const SIGNATURE = CryptoJS.HmacSHA256(rawSignature, SECRET).toString();

  try{
    const response = await axios
    .get('https://rest.sandbox.lalamove.com'+path, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `hmac ${API_KEY}:${time}:${SIGNATURE}`,
        Accept: "application/json",
        "X-LLM-Market": req.headers.market,
      },
    })
    .then((result) => {
      return res.status(200).json({
        statusCode: 200,
        data:result.data

      })
    }).catch((err) => {
      if(err.response.data){

        return res.status(409).json({
          statusCode:409,
          message:err.response.data
        })
      }
    })

  }catch(e){
    return res.status(500).json({
      statusCode:500,
      message:"something happend on the server"
    })
  }

})

router.get('/orders/:orderRef/drivers/:driverID/location', async (req, res, next) => {
  const API_KEY = process.env.API_KEY;
  const SECRET = process.env.SECRET;
  const time = new Date().getTime().toString();
  const method = "GET";
  const path = `/v2/orders/${req.params.orderRef}/drivers/${req.params.driverID}/location`;
  const rawSignature = `${time}\r\n${method}\r\n${path}\r\n\r\n`;
  const SIGNATURE = CryptoJS.HmacSHA256(rawSignature, SECRET).toString();

  try{
    const response = await axios
    .get('https://rest.sandbox.lalamove.com'+path, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `hmac ${API_KEY}:${time}:${SIGNATURE}`,
        Accept: "application/json",
        "X-LLM-Market": req.headers.market,
      },
    })
    .then((result) => {
      return res.status(200).json({
        statusCode: 200,
        data:result.data

      })
    }).catch((err) => {
      if(err.response.data){

        return res.status(409).json({
          statusCode:409,
          message:err.response.data
        })
      }
    })

  }catch(e){
    return res.status(500).json({
      statusCode:500,
      message:"something happend on the server"
    })
  }

})

router.put('/orders/:orderRef/cancel', async (req, res, next) =>{
  const API_KEY = process.env.API_KEY;
  const SECRET = process.env.SECRET;
  const time = new Date().getTime().toString();
  let body ={}
  const method = "PUT";
  const path = `/v2/orders/${req.params.orderRef}/cancel`;
  const rawSignature = `${time}\r\n${method}\r\n${path}\r\n\r\n${body}`;
  const SIGNATURE = CryptoJS.HmacSHA256(rawSignature, SECRET).toString();

  try{
    const response = await axios
    .put('https://rest.sandbox.lalamove.com'+path, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `hmac ${API_KEY}:${time}:${SIGNATURE}`,
        Accept: "application/json",
        "X-LLM-Market": "MY_KUL",
      },
    })
    .then((result) => {
      return res.status(200).json({
        statusCode: 200,
        data:result.data

      })
    }).catch((err) => {
      if(err.response.data){

        return res.status(409).json({
          statusCode:409,
          message:err.response.data
        })
      }
    })

  }catch(e){
    return res.status(500).json({
      statusCode:500,
      message:"something happend on the server"
    })
  }

})


module.exports = router;