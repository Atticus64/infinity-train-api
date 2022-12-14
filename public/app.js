var N = typeof globalThis < "u"
    ? globalThis
    : typeof window < "u"
    ? window
    : typeof global < "u"
    ? global
    : typeof self < "u"
    ? self
    : {},
  K = { exports: {} };
(function (b) {
  var M = typeof window < "u"
    ? window
    : typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope
    ? self
    : {}; /**
   * Prism: Lightweight, robust, elegant syntax highlighting
   *
   * @license MIT <https://opensource.org/licenses/MIT>
   * @author Lea Verou <https://lea.verou.me>
   * @namespace
   * @public
   */

  var i = function (g) {
    var h = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,
      F = 0,
      w = {},
      s = {
        manual: g.Prism && g.Prism.manual,
        disableWorkerMessageHandler: g.Prism &&
          g.Prism.disableWorkerMessageHandler,
        util: {
          encode: function t(e) {
            return e instanceof y
              ? new y(e.type, t(e.content), e.alias)
              : Array.isArray(e)
              ? e.map(t)
              : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(
                /\u00a0/g,
                " ",
              );
          },
          type: function (t) {
            return Object.prototype.toString.call(t).slice(8, -1);
          },
          objId: function (t) {
            return t.__id || Object.defineProperty(t, "__id", { value: ++F }),
              t.__id;
          },
          clone: function t(e, a) {
            a = a || {};
            var n, r;
            switch (s.util.type(e)) {
              case "Object":
                if (r = s.util.objId(e), a[r]) return a[r];
                n = {}, a[r] = n;
                for (var l in e) e.hasOwnProperty(l) && (n[l] = t(e[l], a));
                return n;
              case "Array":
                return r = s.util.objId(e),
                  a[r] ? a[r] : (n = [],
                    a[r] = n,
                    e.forEach(function (o, u) {
                      n[u] = t(o, a);
                    }),
                    n);
              default:
                return e;
            }
          },
          getLanguage: function (t) {
            for (; t;) {
              var e = h.exec(t.className);
              if (e) return e[1].toLowerCase();
              t = t.parentElement;
            }
            return "none";
          },
          setLanguage: function (t, e) {
            t.className = t.className.replace(RegExp(h, "gi"), ""),
              t.classList.add("language-" + e);
          },
          currentScript: function () {
            if (typeof document > "u") return null;
            if ("currentScript" in document && 1 < 2) {
              return document
                .currentScript;
            }
            try {
              throw new Error();
            } catch (n) {
              var t =
                (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(n.stack) || [])[1];
              if (t) {
                var e = document.getElementsByTagName("script");
                for (var a in e) if (e[a].src == t) return e[a];
              }
              return null;
            }
          },
          isActive: function (t, e, a) {
            for (var n = "no-" + e; t;) {
              var r = t.classList;
              if (r.contains(e)) return !0;
              if (r.contains(n)) return !1;
              t = t.parentElement;
            }
            return !!a;
          },
        },
        languages: {
          plain: w,
          plaintext: w,
          text: w,
          txt: w,
          extend: function (t, e) {
            var a = s.util.clone(s.languages[t]);
            for (var n in e) a[n] = e[n];
            return a;
          },
          insertBefore: function (t, e, a, n) {
            n = n || s.languages;
            var r = n[t], l = {};
            for (var o in r) {
              if (r.hasOwnProperty(o)) {
                if (o == e) {
                  for (var u in a) {
                    a.hasOwnProperty(u) &&
                      (l[u] = a[u]);
                  }
                }
                a.hasOwnProperty(o) || (l[o] = r[o]);
              }
            }
            var d = n[t];
            return n[t] = l,
              s.languages.DFS(s.languages, function (v, k) {
                k === d && v != t && (this[v] = l);
              }),
              l;
          },
          DFS: function t(e, a, n, r) {
            r = r || {};
            var l = s.util.objId;
            for (var o in e) {
              if (e.hasOwnProperty(o)) {
                a.call(e, o, e[o], n || o);
                var u = e[o], d = s.util.type(u);
                d === "Object" && !r[l(u)]
                  ? (r[l(u)] = !0, t(u, a, null, r))
                  : d === "Array" && !r[l(u)] && (r[l(u)] = !0, t(u, a, o, r));
              }
            }
          },
        },
        plugins: {},
        highlightAll: function (t, e) {
          s.highlightAllUnder(document, t, e);
        },
        highlightAllUnder: function (t, e, a) {
          var n = {
            callback: a,
            container: t,
            selector:
              'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
          };
          s.hooks.run("before-highlightall", n),
            n.elements = Array.prototype.slice.apply(
              n.container.querySelectorAll(n.selector),
            ),
            s.hooks.run("before-all-elements-highlight", n);
          for (var r = 0, l; l = n.elements[r++];) {
            s.highlightElement(
              l,
              e === !0,
              n.callback,
            );
          }
        },
        highlightElement: function (t, e, a) {
          var n = s.util.getLanguage(t), r = s.languages[n];
          s.util.setLanguage(t, n);
          var l = t.parentElement;
          l && l.nodeName.toLowerCase() === "pre" && s.util.setLanguage(l, n);
          var o = t.textContent,
            u = { element: t, language: n, grammar: r, code: o };
          function d(k) {
            u.highlightedCode = k,
              s.hooks.run("before-insert", u),
              u.element.innerHTML = u.highlightedCode,
              s.hooks.run("after-highlight", u),
              s.hooks.run("complete", u),
              a && a.call(u.element);
          }
          if (
            s.hooks.run("before-sanity-check", u),
              l = u.element.parentElement,
              l && l.nodeName.toLowerCase() === "pre" &&
              !l.hasAttribute("tabindex") && l.setAttribute("tabindex", "0"),
              !u.code
          ) {
            s.hooks.run("complete", u), a && a.call(u.element);
            return;
          }
          if (s.hooks.run("before-highlight", u), !u.grammar) {
            d(s.util.encode(u.code));
            return;
          }
          if (e && g.Worker) {
            var v = new Worker(s.filename);
            v.onmessage = function (k) {
              d(k.data);
            },
              v.postMessage(
                JSON.stringify({
                  language: u.language,
                  code: u.code,
                  immediateClose: !0,
                }),
              );
          } else d(s.highlight(u.code, u.grammar, u.language));
        },
        highlight: function (t, e, a) {
          var n = { code: t, grammar: e, language: a };
          if (s.hooks.run("before-tokenize", n), !n.grammar) {
            throw new Error(
              'The language "' + n.language + '" has no grammar.',
            );
          }
          return n.tokens = s.tokenize(n.code, n.grammar),
            s.hooks.run("after-tokenize", n),
            y.stringify(s.util.encode(n.tokens), n.language);
        },
        tokenize: function (t, e) {
          var a = e.rest;
          if (a) {
            for (var n in a) e[n] = a[n];
            delete e.rest;
          }
          var r = new L();
          return S(r, r.head, t), j(t, r, e, r.head, 0), I(r);
        },
        hooks: {
          all: {},
          add: function (t, e) {
            var a = s.hooks.all;
            a[t] = a[t] || [], a[t].push(e);
          },
          run: function (t, e) {
            var a = s.hooks.all[t];
            if (!(!a || !a.length)) for (var n = 0, r; r = a[n++];) r(e);
          },
        },
        Token: y,
      };
    g.Prism = s;
    function y(t, e, a, n) {
      this.type = t,
        this.content = e,
        this.alias = a,
        this.length = (n || "").length | 0;
    }
    y.stringify = function t(e, a) {
      if (typeof e == "string") return e;
      if (Array.isArray(e)) {
        var n = "";
        return e.forEach(function (d) {
          n += t(d, a);
        }),
          n;
      }
      var r = {
          type: e.type,
          content: t(e.content, a),
          tag: "span",
          classes: ["token", e.type],
          attributes: {},
          language: a,
        },
        l = e.alias;
      l &&
      (Array.isArray(l)
        ? Array.prototype.push.apply(r.classes, l)
        : r.classes.push(l)), s.hooks.run("wrap", r);
      var o = "";
      for (var u in r.attributes) {
        o += " " + u + '="' + (r.attributes[u] || "").replace(/"/g, "&quot;") +
          '"';
      }
      return "<" + r.tag + ' class="' + r.classes.join(" ") + '"' + o + ">" +
        r.content + "</" + r.tag + ">";
    };
    function _(t, e, a, n) {
      t.lastIndex = e;
      var r = t.exec(a);
      if (r && n && r[1]) {
        var l = r[1].length;
        r.index += l, r[0] = r[0].slice(l);
      }
      return r;
    }
    function j(t, e, a, n, r, l) {
      for (var o in a) {
        if (!(!a.hasOwnProperty(o) || !a[o])) {
          var u = a[o];
          u = Array.isArray(u) ? u : [u];
          for (var d = 0; d < u.length; ++d) {
            if (l && l.cause == o + "," + d) return;
            var v = u[d],
              k = v.inside,
              W = !!v.lookbehind,
              J = !!v.greedy,
              ee = v.alias;
            if (J && !v.pattern.global) {
              var te = v.pattern.toString().match(/[imsuy]*$/)[0];
              v.pattern = RegExp(v.pattern.source, te + "g");
            }
            for (
              var X = v.pattern || v, m = n.next, A = r;
              m !== e.tail && !(l && A >= l.reach);
              A += m.value.length, m = m.next
            ) {
              var E = m.value;
              if (e.length > t.length) return;
              if (!(E instanceof y)) {
                var P = 1, x;
                if (J) {
                  if (x = _(X, A, t, W), !x || x.index >= t.length) break;
                  var z = x.index, ae = x.index + x[0].length, $ = A;
                  for ($ += m.value.length; z >= $;) {
                    m = m.next, $ += m.value.length;
                  }
                  if (
                    $ -= m.value.length, A = $, m.value instanceof y
                  ) continue;
                  for (
                    var C = m;
                    C !== e.tail && ($ < ae || typeof C.value == "string");
                    C = C.next
                  ) P++, $ += C.value.length;
                  P--, E = t.slice(A, $), x.index -= A;
                } else if (x = _(X, 0, E, W), !x) continue;
                var z = x.index,
                  D = x[0],
                  U = E.slice(0, z),
                  Y = E.slice(z + D.length),
                  Z = A + E.length;
                l && Z > l.reach && (l.reach = Z);
                var O = m.prev;
                U && (O = S(e, O, U), A += U.length), q(e, O, P);
                var ne = new y(o, k ? s.tokenize(D, k) : D, ee, D);
                if (m = S(e, O, ne), Y && S(e, m, Y), P > 1) {
                  var B = { cause: o + "," + d, reach: Z };
                  j(t, e, a, m.prev, A, B),
                    l && B.reach > l.reach && (l.reach = B.reach);
                }
              }
            }
          }
        }
      }
    }
    function L() {
      var t = { value: null, prev: null, next: null },
        e = { value: null, prev: t, next: null };
      t.next = e, this.head = t, this.tail = e, this.length = 0;
    }
    function S(t, e, a) {
      var n = e.next, r = { value: a, prev: e, next: n };
      return e.next = r, n.prev = r, t.length++, r;
    }
    function q(t, e, a) {
      for (var n = e.next, r = 0; r < a && n !== t.tail; r++) n = n.next;
      e.next = n, n.prev = e, t.length -= r;
    }
    function I(t) {
      for (var e = [], a = t.head.next; a !== t.tail;) {
        e.push(a.value), a = a.next;
      }
      return e;
    }
    if (!g.document) {
      return g.addEventListener &&
        (s.disableWorkerMessageHandler ||
          g.addEventListener("message", function (t) {
            var e = JSON.parse(t.data),
              a = e.language,
              n = e.code,
              r = e.immediateClose;
            g.postMessage(s.highlight(n, s.languages[a], a)), r && g.close();
          }, !1)),
        s;
    }
    var p = s.util.currentScript();
    p && (s.filename = p.src, p.hasAttribute("data-manual") && (s.manual = !0));
    function c() {
      s.manual || s.highlightAll();
    }
    if (!s.manual) {
      var f = document.readyState;
      f === "loading" || f === "interactive" && p && p.defer
        ? document.addEventListener("DOMContentLoaded", c)
        : window.requestAnimationFrame
        ? window.requestAnimationFrame(c)
        : window.setTimeout(c, 16);
    }
    return s;
  }(M);
  b.exports && (b.exports = i),
    typeof N < "u" && (N.Prism = i),
    i.languages.markup = {
      comment: { pattern: /<!--(?:(?!<!--)[\s\S])*?-->/, greedy: !0 },
      prolog: { pattern: /<\?[\s\S]+?\?>/, greedy: !0 },
      doctype: {
        pattern:
          /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
        greedy: !0,
        inside: {
          "internal-subset": {
            pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
            lookbehind: !0,
            greedy: !0,
            inside: null,
          },
          string: { pattern: /"[^"]*"|'[^']*'/, greedy: !0 },
          punctuation: /^<!|>$|[[\]]/,
          "doctype-tag": /^DOCTYPE/i,
          name: /[^\s<>'"]+/,
        },
      },
      cdata: { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, greedy: !0 },
      tag: {
        pattern:
          /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
        greedy: !0,
        inside: {
          tag: {
            pattern: /^<\/?[^\s>\/]+/,
            inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ },
          },
          "special-attr": [],
          "attr-value": {
            pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
            inside: {
              punctuation: [{ pattern: /^=/, alias: "attr-equals" }, {
                pattern: /^(\s*)["']|["']$/,
                lookbehind: !0,
              }],
            },
          },
          punctuation: /\/?>/,
          "attr-name": {
            pattern: /[^\s>\/]+/,
            inside: { namespace: /^[^\s>\/:]+:/ },
          },
        },
      },
      entity: [
        { pattern: /&[\da-z]{1,8};/i, alias: "named-entity" },
        /&#x?[\da-f]{1,8};/i,
      ],
    },
    i.languages.markup.tag.inside["attr-value"].inside.entity =
      i.languages.markup.entity,
    i.languages.markup.doctype.inside["internal-subset"].inside =
      i.languages.markup,
    i.hooks.add("wrap", function (g) {
      g.type === "entity" &&
        (g.attributes.title = g.content.replace(/&amp;/, "&"));
    }),
    Object.defineProperty(i.languages.markup.tag, "addInlined", {
      value: function (h, F) {
        var w = {};
        w["language-" + F] = {
          pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
          lookbehind: !0,
          inside: i.languages[F],
        }, w.cdata = /^<!\[CDATA\[|\]\]>$/i;
        var s = {
          "included-cdata": { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, inside: w },
        };
        s["language-" + F] = { pattern: /[\s\S]+/, inside: i.languages[F] };
        var y = {};
        y[h] = {
          pattern: RegExp(
            /(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/
              .source.replace(/__/g, function () {
                return h;
              }),
            "i",
          ),
          lookbehind: !0,
          greedy: !0,
          inside: s,
        }, i.languages.insertBefore("markup", "cdata", y);
      },
    }),
    Object.defineProperty(i.languages.markup.tag, "addAttribute", {
      value: function (g, h) {
        i.languages.markup.tag.inside["special-attr"].push({
          pattern: RegExp(
            /(^|["'\s])/.source + "(?:" + g + ")" +
              /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
            "i",
          ),
          lookbehind: !0,
          inside: {
            "attr-name": /^[^\s=]+/,
            "attr-value": {
              pattern: /=[\s\S]+/,
              inside: {
                value: {
                  pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                  lookbehind: !0,
                  alias: [h, "language-" + h],
                  inside: i.languages[h],
                },
                punctuation: [{ pattern: /^=/, alias: "attr-equals" }, /"|'/],
              },
            },
          },
        });
      },
    }),
    i.languages.html = i.languages.markup,
    i.languages.mathml = i.languages.markup,
    i.languages.svg = i.languages.markup,
    i.languages.xml = i.languages.extend("markup", {}),
    i.languages.ssml = i.languages.xml,
    i.languages.atom = i.languages.xml,
    i.languages.rss = i.languages.xml,
    function (g) {
      var h =
        /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
      g.languages.css = {
        comment: /\/\*[\s\S]*?\*\//,
        atrule: {
          pattern: RegExp(
            "@[\\w-](?:" + /[^;{\s"']|\s+(?!\s)/.source + "|" + h.source +
              ")*?" + /(?:;|(?=\s*\{))/.source,
          ),
          inside: {
            rule: /^@[\w-]+/,
            "selector-function-argument": {
              pattern:
                /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
              lookbehind: !0,
              alias: "selector",
            },
            keyword: {
              pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
              lookbehind: !0,
            },
          },
        },
        url: {
          pattern: RegExp(
            "\\burl\\((?:" + h.source + "|" +
              /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ")\\)",
            "i",
          ),
          greedy: !0,
          inside: {
            function: /^url/i,
            punctuation: /^\(|\)$/,
            string: { pattern: RegExp("^" + h.source + "$"), alias: "url" },
          },
        },
        selector: {
          pattern: RegExp(
            `(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|` + h.source +
              ")*(?=\\s*\\{)",
          ),
          lookbehind: !0,
        },
        string: { pattern: h, greedy: !0 },
        property: {
          pattern:
            /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
          lookbehind: !0,
        },
        important: /!important\b/i,
        function: {
          pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
          lookbehind: !0,
        },
        punctuation: /[(){};:,]/,
      }, g.languages.css.atrule.inside.rest = g.languages.css;
      var F = g.languages.markup;
      F &&
        (F.tag.addInlined("style", "css"), F.tag.addAttribute("style", "css"));
    }(i),
    i.languages.clike = {
      comment: [{
        pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
        lookbehind: !0,
        greedy: !0,
      }, { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 }],
      string: {
        pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: !0,
      },
      "class-name": {
        pattern:
          /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
        lookbehind: !0,
        inside: { punctuation: /[.\\]/ },
      },
      keyword:
        /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
      boolean: /\b(?:false|true)\b/,
      function: /\b\w+(?=\()/,
      number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
      operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
      punctuation: /[{}[\];(),.:]/,
    },
    i.languages.javascript = i.languages.extend("clike", {
      "class-name": [i.languages.clike["class-name"], {
        pattern:
          /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
        lookbehind: !0,
      }],
      keyword: [{ pattern: /((?:^|\})\s*)catch\b/, lookbehind: !0 }, {
        pattern:
          /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
        lookbehind: !0,
      }],
      function:
        /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
      number: {
        pattern: RegExp(
          /(^|[^\w$])/.source + "(?:" +
            (/NaN|Infinity/.source + "|" + /0[bB][01]+(?:_[01]+)*n?/.source +
              "|" + /0[oO][0-7]+(?:_[0-7]+)*n?/.source + "|" +
              /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source + "|" +
              /\d+(?:_\d+)*n/.source + "|" +
              /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/
                .source) +
            ")" + /(?![\w$])/.source,
        ),
        lookbehind: !0,
      },
      operator:
        /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/,
    }),
    i.languages.javascript["class-name"][0].pattern =
      /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,
    i.languages.insertBefore("javascript", "keyword", {
      regex: {
        pattern: RegExp(
          /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source +
            /\//.source + "(?:" +
            /(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/
              .source +
            "|" +
            /(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/
              .source +
            ")" +
            /(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/
              .source,
        ),
        lookbehind: !0,
        greedy: !0,
        inside: {
          "regex-source": {
            pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
            lookbehind: !0,
            alias: "language-regex",
            inside: i.languages.regex,
          },
          "regex-delimiter": /^\/|\/$/,
          "regex-flags": /^[a-z]+$/,
        },
      },
      "function-variable": {
        pattern:
          /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
        alias: "function",
      },
      parameter: [{
        pattern:
          /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
        lookbehind: !0,
        inside: i.languages.javascript,
      }, {
        pattern:
          /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
        lookbehind: !0,
        inside: i.languages.javascript,
      }, {
        pattern:
          /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
        lookbehind: !0,
        inside: i.languages.javascript,
      }, {
        pattern:
          /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
        lookbehind: !0,
        inside: i.languages.javascript,
      }],
      constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
    }),
    i.languages.insertBefore("javascript", "string", {
      hashbang: { pattern: /^#!.*/, greedy: !0, alias: "comment" },
      "template-string": {
        pattern:
          /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
        greedy: !0,
        inside: {
          "template-punctuation": { pattern: /^`|`$/, alias: "string" },
          interpolation: {
            pattern:
              /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
            lookbehind: !0,
            inside: {
              "interpolation-punctuation": {
                pattern: /^\$\{|\}$/,
                alias: "punctuation",
              },
              rest: i.languages.javascript,
            },
          },
          string: /[\s\S]+/,
        },
      },
      "string-property": {
        pattern:
          /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
        lookbehind: !0,
        greedy: !0,
        alias: "property",
      },
    }),
    i.languages.insertBefore("javascript", "operator", {
      "literal-property": {
        pattern:
          /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
        lookbehind: !0,
        alias: "property",
      },
    }),
    i.languages.markup &&
    (i.languages.markup.tag.addInlined("script", "javascript"),
      i.languages.markup.tag.addAttribute(
        /on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/
          .source,
        "javascript",
      )),
    i.languages.js = i.languages.javascript,
    function () {
      if (typeof i > "u" || typeof document > "u") return;
      Element.prototype.matches ||
        (Element.prototype.matches = Element.prototype.msMatchesSelector ||
          Element.prototype.webkitMatchesSelector);
      var g = "Loading\u2026",
        h = function (p, c) {
          return "\u2716 Error " + p + " while fetching file: " + c;
        },
        F = "\u2716 Error: File does not exist or is empty",
        w = {
          js: "javascript",
          py: "python",
          rb: "ruby",
          ps1: "powershell",
          psm1: "powershell",
          sh: "bash",
          bat: "batch",
          h: "c",
          tex: "latex",
        },
        s = "data-src-status",
        y = "loading",
        _ = "loaded",
        j = "failed",
        L = "pre[data-src]:not([" + s + '="' + _ + '"]):not([' + s + '="' + y +
          '"])';
      function S(p, c, f) {
        var t = new XMLHttpRequest();
        t.open("GET", p, !0),
          t.onreadystatechange = function () {
            t.readyState == 4 && (t.status < 400 && t.responseText
              ? c(t.responseText)
              : t.status >= 400
              ? f(h(t.status, t.statusText))
              : f(F));
          },
          t.send(null);
      }
      function q(p) {
        var c = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(p || "");
        if (c) {
          var f = Number(c[1]), t = c[2], e = c[3];
          return t ? e ? [f, Number(e)] : [f, void 0] : [f, f];
        }
      }
      i.hooks.add("before-highlightall", function (p) {
        p.selector += ", " + L;
      }),
        i.hooks.add("before-sanity-check", function (p) {
          var c = p.element;
          if (c.matches(L)) {
            p.code = "", c.setAttribute(s, y);
            var f = c.appendChild(document.createElement("CODE"));
            f.textContent = g;
            var t = c.getAttribute("data-src"), e = p.language;
            if (e === "none") {
              var a = (/\.(\w+)$/.exec(t) || [, "none"])[1];
              e = w[a] || a;
            }
            i.util.setLanguage(f, e), i.util.setLanguage(c, e);
            var n = i.plugins.autoloader;
            n && n.loadLanguages(e),
              S(t, function (r) {
                c.setAttribute(s, _);
                var l = q(c.getAttribute("data-range"));
                if (l) {
                  var o = r.split(/\r\n?|\n/g),
                    u = l[0],
                    d = l[1] == null ? o.length : l[1];
                  u < 0 && (u += o.length),
                    u = Math.max(0, Math.min(u - 1, o.length)),
                    d < 0 && (d += o.length),
                    d = Math.max(0, Math.min(d, o.length)),
                    r = o.slice(u, d).join(`
`),
                    c.hasAttribute("data-start") ||
                    c.setAttribute("data-start", String(u + 1));
                }
                f.textContent = r, i.highlightElement(f);
              }, function (r) {
                c.setAttribute(s, j), f.textContent = r;
              });
          }
        }),
        i.plugins.fileHighlight = {
          highlight: function (c) {
            for (
              var f = (c || document).querySelectorAll(L), t = 0, e;
              e = f[t++];
            ) i.highlightElement(e);
          },
        };
      var I = !1;
      i.fileHighlight = function () {
        I ||
        (console.warn(
          "Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead.",
        ),
          I = !0), i.plugins.fileHighlight.highlight.apply(this, arguments);
      };
    }();
})(K);
const R = K.exports,
  Q = "https://the-infinity-train-api.deno.dev/api",
  G = (b) => document.querySelector(b),
  H = G(".prism-container"),
  re = G(".form-send-api"),
  V = G(".input-api"),
  ie = () => {
    let b = R.highlight(H.innerText, R.languages.js, "json");
    H.innerHTML = b;
  },
  se = async (b) => {
    let i = await (await fetch(`${Q}${b}?pretty`)).text();
    return i.includes(`
`) || (i = JSON.stringify(JSON.parse(i), null, 2)),
      i;
  };
re.addEventListener("submit", async (b) => {
  b.preventDefault(), H.firstChild.innerHTML = "";
  const M = await se(V.value);
  let i = R.highlight(M, R.languages.js, "json");
  H.innerHTML = i;
});
ie();
const T = G(".btn-clipboard");
T.addEventListener("click", () => {
  ue(`${Q}${V.value}`),
    T.ariaLabel = "Copied",
    T.classList.add("hint--success");
});
T.addEventListener("mouseleave", () => {
  T.ariaLabel = "Copy to clipboard", T.classList.remove("hint--success");
});
const ue = (b) => {
  navigator.clipboard.writeText(b).then(() => {}, () => {});
};
