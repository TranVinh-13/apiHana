const express = require("express");
const bodyParser = require("body-parser");

const router = express.Router();
const decodeHelper = require("./utils");
const app = express();
var h = require("node-cryptojs-aes").CryptoJS;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", router);
router.get("/", (req, res) => {
  res.send("hello");
});

router.post("/encode", (req, res) => {
  // console.log(req.body);
  
p = {
    stringify: function(b) {
        var e = h.enc.Hex.parse(b.salt.toString()).toString(h.enc.Latin1);
        b = b.ciphertext.toString(h.enc.Latin1);
        return h.enc.Latin1.parse("Salted__" + e + b).toString(h.enc.Base64)
    },
    parse: function(b) {
        b = h.enc.Base64.parse(b).toString(h.enc.Latin1);
        if ("Salted__" !== b.substr(0, 8)) throw Error("Error parsing salt");
        var e = b.substr(8, 8);
        b = b.substr(16);
        return h.lib.CipherParams.create({
            ciphertext: h.enc.Latin1.parse(b),
            salt: h.enc.Latin1.parse(e)
        })
    }
};
AES256 = {
    encrypt: function(b, e) {
        return h.AES.encrypt(b,
            e, {
                format: p
            }).toString()
    },
    decrypt: function(b, e) {
        return h.AES.decrypt(b, e, {
            format: p
        }).toString(h.enc.Utf8)
    }
};
var data = AES256.encrypt(req.body.data,'hw2jmke6e6g0000000000000000000000000');

  res.send(data);
});
app.all("*", (req, res) => {
  res.status(404).send("<h1>404! Page not found</h1>");
});
app.listen(3000, () => {
  console.log("Started on PORT 3000");
});
