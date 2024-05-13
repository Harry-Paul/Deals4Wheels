/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const tf = require("@tensorflow/tfjs")

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.api = onRequest((request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Methods","GET , POST");
  logger.info("Hello logs!", {structuredData: true});
  let data=request.query.data;
  data= data.replace(/[ ,]+/g, ",");
  console.log(data)
  data=data.split(",")
  let df=[];
  data.slice(1).forEach(e =>{
    df.push(parseFloat(e))
  })
  df = Float32Array.from(df);
  console.log(df)
  console.log("datatype: "+ typeof df)
  let pred = predict(df).catch(console.log)
  pred.then(e=>{
    response.send(e)
  })
});

async function predict(data){
    let tensor =tf.tensor1d(data)
    tensor=tensor.expandDims(0)
    console.log("cvb")
    let model = await tf.loadLayersModel(
        "https://firebasestorage.googleapis.com/v0/b/deals4wheels-b38f7.appspot.com/o/model.json?alt=media&token=aae5d6e6-a426-4054-a9b5-ab2e6385444c"
    );
    console.log("abc")
    let pr= await model.predict(tensor).dataSync();
    return pr
}