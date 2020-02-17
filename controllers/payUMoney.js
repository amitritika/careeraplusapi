const crypto = require("crypto");

exports.payUMoneyPayment = function (req, res) {
  if (!req.body.txnid || !req.body.amount || !req.body.productinfo || !req.body.firstname || !req.body.email) {
		console.log(req.body.amount)
		console.log(req.body.productinfo)
		console.log(req.body.firstname)
		console.log(req.body.email)
         res.send("Mandatory fields missing");
   } else {
         var pd = req.body;
         var hashString = "";
         if(process.env.NODE_ENV=== "development"){
           hashString = process.env.TEST_MERCHANT_KEY  + '|' + pd.txnid + '|' + pd.amount + '|' + pd.productinfo + '|' + pd.firstname + '|' + pd.email + '|' + '||||||||||' + process.env.TEST_MERCHANT_SALT;
         }else{
           hashString = process.env.PROD_MERCHANT_KEY  + '|' + pd.txnid + '|' + pd.amount + '|' + pd.productinfo + '|' + pd.firstname + '|' + pd.email + '|' + '||||||||||' + process.env.PROD_MERCHANT_SALT;

         }
         
         var cryp = crypto.createHash('sha512');
         cryp.update(hashString);
		     var hash = cryp.digest('hex');
         res.send({ 'hash': hash });
   }
}

exports.payUMoneyPaymentResponse = function (req, res) {
    var pd = req.body;
    //Generate new Hash
    var hashString = "";
       if(process.env.NODE_ENV=== "development"){
         hashString = process.env.TEST_MERCHANT_SALT + '|' + pd.status + '||||||||||' + '|' + pd.email + '|' + pd.firstname + '|' + pd.productinfo + '|' + pd.amount + '|' + pd.txnid + '|' + process.env.TEST_MERCHANT_KEY
       }else{
         hashString = process.env.PROD_MERCHANT_SALT + '|' + pd.status + '||||||||||' + '|' + pd.email + '|' + pd.firstname + '|' + pd.productinfo + '|' + pd.amount + '|' + pd.txnid + '|' + process.env.PROD_MERCHANT_KEY

       }
     
     var cryp = crypto.createHash('sha512');
     cryp.update(hashString);
     var hash = cryp.digest('hex');
     // Verify the new hash with the hash value in response
     if (hash == pd.hash) {
         res.send({'status':pd.status});
     } else {
         res.send({'status':"Error occured"});
     }
  }