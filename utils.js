const jwt_decode = require("jwt-decode");
(o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="),
  (u = function (n) {
    return String.fromCharCode(n);
  }),
  (f = function (n, t) {
    return n.charCodeAt(t);
  }),
  (_ = {
    __encode: function (n) {
      var t,
        c,
        u,
        l,
        h,
        v,
        s,
        A = "",
        x = 0;

      for (n = _.__utf8_encode(n); x < n.length; ) {
        l = (t = f(n, x++)) >> 2;
        h = ((3 & t) << 4) | ((c = f(n, x++)) >> 4);
        v = ((15 & c) << 2) | ((u = f(n, x++)) >> 6);
        s = 63 & u;
        if (isNaN(c)) v = s = 64;
        else if (isNaN(u)) s = 64;
        A = A + o.charAt(l) + o.charAt(h) + o.charAt(v) + o.charAt(s);
      }

      return A;
    },
    __decode: function (n) {
      var t,
        c,
        f,
        l,
        h,
        v,
        s = "",
        A = 0;

      for (n = n.replace(/^A-Za-z0-9\+\/=/g, ""); A < n.length; ) {
        f = o.indexOf(n.charAt(A++));
        t =
          ((15 & (l = o.indexOf(n.charAt(A++)))) << 4) |
          ((h = o.indexOf(n.charAt(A++))) >> 2);
        c = ((3 & h) << 6) | (v = o.indexOf(n.charAt(A++)));
        s += u((f << 2) | (l >> 4));
        if (64 != h) s += u(t);
        if (64 != v) s += u(c);
      }

      s = _.__utf8_decode(s);
      return s;
    },
    __utf8_encode: function (n) {
      n = n.replace(/\r\n/g, "\n");

      for (var t = "", c = 0; c < n.length; c++) {
        var o = f(n, c);
        if (o < 128) t += u(o);
        else if (o > 127 && o < 2048) {
          t += u((o >> 6) | 192);
          t += u((63 & o) | 128);
        } else {
          t += u((o >> 12) | 224);
          t += u(((o >> 6) & 63) | 128);
          t += u((63 & o) | 128);
        }
      }

      return t;
    },
    __utf8_decode: function (n) {
      for (var t = "", c = 0, o = 0, _ = 0, l = 0; c < n.length; )
        (l = f(n, c)) < 128
          ? ((t += u(l)), c++)
          : l > 191 && l < 224
          ? ((o = f(n, c + 1)), (t += u(((31 & l) << 6) | (63 & o))), (c += 2))
          : ((o = f(n, c + 1)),
            (_ = f(n, c + 2)),
            (t += u(((15 & l) << 12) | ((63 & o) << 6) | (63 & _))),
            (c += 3));

      return t;
    },
  }),
  (l = function (n) {
    if (!n || n.length < 2) return "";

    for (var t = o.length - o.indexOf(n[0]), c = "", u = 1; u < n.length; u++)
      c += o[(o.indexOf(n[u]) + t) % o.length];

    return _.__decode(c);
  });
const decodeHelper = (data) => {
  const unBase = l(data);
  try {
    const decoded = jwt_decode(unBase);
    return { "success:": true, data: decoded };
  } catch {
    return { "success:": false, data: "" };
  }
};

// return unBase;
// console.log(jwt_decode(unBase));
module.exports = decodeHelper;
