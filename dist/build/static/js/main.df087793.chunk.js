"use strict";

((void 0).webpackJsonpfrontend = (void 0).webpackJsonpfrontend || []).push([[0], {
  313: function _(e, t, a) {
    e.exports = a(513);
  },
  318: function _(e, t, a) {},
  513: function _(e, t, a) {
    "use strict";

    a.r(t);
    var r = a(0),
        n = a.n(r),
        o = a(16),
        c = a.n(o),
        l = (a(318), a(13)),
        i = a(266),
        s = a(579),
        u = a(19),
        p = a(60),
        m = a(10),
        d = a(553),
        f = a(559),
        g = a(552),
        b = a(582),
        O = a(584),
        E = a(550),
        h = a(558),
        y = a(580),
        v = a(113),
        j = a.n(v),
        w = a(69),
        P = a(239),
        x = a(551),
        k = a(20),
        S = a.n(k);

    function D() {
      return n.a.createElement(w.a, {
        variant: "body2",
        color: "textSecondary",
        align: "center"
      }, "Copyright \xa9 ", n.a.createElement(E.a, {
        color: "inherit",
        href: "https://github.com/drorIvry"
      }, "Dror Ivry"), " ", new Date().getFullYear(), ".");
    }

    var N = a(45),
        C = Object(N.a)();

    function R(e, t, a, r) {
      return {
        type: "LOGIN",
        payload: {
          username: e,
          password: t,
          accountID: a,
          firstName: r
        }
      };
    }

    function I(e, t) {
      var a = Object.keys(e);

      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })), a.push.apply(a, r);
      }

      return a;
    }

    var T = Object(P.a)(function (e) {
      return {
        paper: {
          marginTop: e.spacing(8),
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        },
        avatar: {
          margin: e.spacing(1),
          backgroundColor: e.palette.secondary.main
        },
        form: {
          width: "100%",
          marginTop: e.spacing(1)
        },
        submit: {
          margin: e.spacing(3, 0, 2)
        }
      };
    });
    var B = Object(u.b)(function (e) {
      return {
        login: e.login
      };
    }, function (e) {
      return {
        onLogin: function onLogin(t, a, r, n) {
          e(R(t, a, r, n));
        }
      };
    })(function (e) {
      e.login;

      var t = e.onLogin,
          a = T(),
          o = Object(r.useState)([]),
          c = Object(l.a)(o, 2),
          i = c[0],
          s = c[1],
          u = Object(r.useState)(!1),
          v = Object(l.a)(u, 2),
          P = v[0],
          k = v[1],
          N = Object(p.b)(["login"]),
          R = Object(l.a)(N, 2),
          B = (R[0], R[1]),
          A = Object(r.useState)(!1),
          M = Object(l.a)(A, 2),
          G = M[0],
          _ = M[1],
          L = Object(r.useState)(""),
          U = Object(l.a)(L, 2),
          W = U[0],
          F = U[1],
          H = function H(e, t) {
        s(function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var a = null != arguments[t] ? arguments[t] : {};
            t % 2 ? I(a, !0).forEach(function (t) {
              Object(m.a)(e, t, a[t]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : I(a).forEach(function (t) {
              Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t));
            });
          }

          return e;
        }({}, i, Object(m.a)({}, e, t)));
      };

      return n.a.createElement(x.a, {
        component: "main",
        maxWidth: "xs"
      }, n.a.createElement(g.a, null), n.a.createElement("div", {
        className: a.paper
      }, n.a.createElement(d.a, {
        className: a.avatar
      }, n.a.createElement(j.a, null)), n.a.createElement(w.a, {
        component: "h1",
        variant: "h5"
      }, "Sign in"), n.a.createElement("div", null, n.a.createElement(b.a, {
        variant: "outlined",
        margin: "normal",
        required: !0,
        fullWidth: !0,
        error: G,
        helperText: W,
        id: "username",
        onChange: function onChange(e) {
          H("username", e.target.value);
        },
        label: "User Name",
        name: "username",
        autoComplete: "email",
        autoFocus: !0
      }), n.a.createElement(b.a, {
        variant: "outlined",
        margin: "normal",
        required: !0,
        fullWidth: !0,
        error: G,
        helperText: W,
        onChange: function onChange(e) {
          H("password", e.target.value);
        },
        name: "password",
        label: "Password",
        type: "password",
        id: "password",
        autoComplete: "current-password"
      }), n.a.createElement(h.a, {
        container: !0
      }, n.a.createElement(O.a, {
        value: P,
        id: "remember",
        color: "primary",
        onClick: function onClick() {
          k(!P);
        }
      }), n.a.createElement("p", null, " Remember me")), n.a.createElement(f.a, {
        type: "submit",
        fullWidth: !0,
        variant: "contained",
        color: "primary",
        className: a.submit,
        onClick: function onClick() {
          S.a.get("/login", {
            withCredentials: !0,
            auth: {
              username: i.username,
              password: i.password
            }
          }).then(function (e) {
            P && B("login", {
              username: i.username,
              password: i.password
            }), t(i.username, i.password, e.accountID, e.firstName), C.push("/dashboard");
          })["catch"](function (e) {
            _(!0), F("Incorrect Username / Password."), console.error(e);
          });
        }
      }, "Sign In"), n.a.createElement(h.a, {
        container: !0
      }, n.a.createElement(h.a, {
        item: !0
      }, n.a.createElement(E.a, {
        onClick: function onClick(e) {
          return C.push("/register");
        },
        variant: "body2"
      }, "Don't have an account? Sign Up"))))), n.a.createElement(y.a, {
        mt: 8
      }, n.a.createElement(D, null)));
    });

    function A(e, t) {
      var a = Object.keys(e);

      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })), a.push.apply(a, r);
      }

      return a;
    }

    var M = Object(P.a)(function (e) {
      return {
        paper: {
          marginTop: e.spacing(8),
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        },
        avatar: {
          margin: e.spacing(1),
          backgroundColor: e.palette.secondary.main
        },
        form: {
          width: "100%",
          marginTop: e.spacing(3)
        },
        submit: {
          margin: e.spacing(3, 0, 2)
        }
      };
    });

    var G = Object(u.b)(function (e) {
      return {
        login: e.login
      };
    }, function (e) {
      return {
        onLogin: function onLogin(t, a, r, n) {
          e(R(t, a, r, n));
        }
      };
    })(function (e) {
      e.login;

      var t = e.onLogin,
          a = M(),
          o = Object(r.useState)([]),
          c = Object(l.a)(o, 2),
          i = c[0],
          s = c[1],
          u = Object(r.useState)(!1),
          p = Object(l.a)(u, 2),
          O = p[0],
          v = p[1],
          P = Object(r.useState)(""),
          k = Object(l.a)(P, 2),
          N = k[0],
          R = k[1],
          I = function I(e, t) {
        s(function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var a = null != arguments[t] ? arguments[t] : {};
            t % 2 ? A(a, !0).forEach(function (t) {
              Object(m.a)(e, t, a[t]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : A(a).forEach(function (t) {
              Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t));
            });
          }

          return e;
        }({}, i, Object(m.a)({}, e, t)));
      };

      return n.a.createElement(x.a, {
        component: "main",
        maxWidth: "xs"
      }, n.a.createElement(g.a, null), n.a.createElement("div", {
        className: a.paper
      }, n.a.createElement(d.a, {
        className: a.avatar
      }, n.a.createElement(j.a, null)), n.a.createElement(w.a, {
        component: "h1",
        variant: "h5"
      }, "Sign up"), n.a.createElement("div", null, n.a.createElement(h.a, {
        container: !0,
        spacing: 2
      }, n.a.createElement(h.a, {
        item: !0,
        xs: 12,
        sm: 6
      }, n.a.createElement(b.a, {
        autoComplete: "fname",
        name: "firstName",
        variant: "outlined",
        required: !0,
        fullWidth: !0,
        id: "firstName",
        label: "First Name",
        onChange: function onChange(e) {
          I("firstName", e.target.value);
        },
        autoFocus: !0
      })), n.a.createElement(h.a, {
        item: !0,
        xs: 12,
        sm: 6
      }, n.a.createElement(b.a, {
        variant: "outlined",
        required: !0,
        fullWidth: !0,
        id: "lastName",
        label: "Last Name",
        onChange: function onChange(e) {
          I("lastName", e.target.value);
        },
        name: "lastName",
        autoComplete: "lname"
      })), n.a.createElement(h.a, {
        item: !0,
        xs: 12
      }, n.a.createElement(b.a, {
        variant: "outlined",
        required: !0,
        fullWidth: !0,
        error: O,
        helperText: N,
        id: "username",
        label: "User Name",
        name: "username",
        onChange: function onChange(e) {
          I("username", e.target.value);
        },
        autoComplete: "email"
      })), n.a.createElement(h.a, {
        item: !0,
        xs: 12
      }, n.a.createElement(b.a, {
        variant: "outlined",
        required: !0,
        fullWidth: !0,
        error: O,
        helperText: N,
        name: "password",
        label: "Password",
        type: "password",
        id: "password",
        onChange: function onChange(e) {
          I("password", e.target.value);
        },
        autoComplete: "current-password"
      }))), n.a.createElement(f.a, {
        type: "submit",
        fullWidth: !0,
        variant: "contained",
        color: "primary",
        onClick: function onClick() {
          console.log(i), S.a.post("/accounts", i).then(function (e) {
            t(i.username, i.password, e.data.accountID, i.firstName), C.push("/dashboard");
          })["catch"](function (e) {
            v(!0), R("Invalid input, Username Taken");
          });
        },
        className: a.submit
      }, "Sign Up"), n.a.createElement(h.a, {
        container: !0,
        justify: "flex-end"
      }, n.a.createElement(h.a, {
        item: !0
      }, n.a.createElement(E.a, {
        onClick: function onClick(e) {
          return C.push("/login");
        },
        variant: "body2"
      }, "Already have an account? Sign in"))))), n.a.createElement(y.a, {
        mt: 5
      }, n.a.createElement(D, null)));
    }),
        _ = a(27),
        L = a.n(_),
        U = a(41),
        W = a(4),
        F = a(126),
        H = a(240),
        K = a(241),
        V = a(267),
        q = a(242),
        z = a(268),
        Y = a(30);

    function J(e) {
      var t = e.active,
          a = e.payload;
      e.label;
      if (t) return n.a.createElement("div", null, n.a.createElement("p", null, a[0].name + ": " + Number(a[0].value).toFixed(3) + "GB"));
    }

    var X = ["#ff4e46", "#00C49F", "#FFBB28", "#ff4e46"],
        $ = function (e) {
      function t() {
        return Object(H.a)(this, t), Object(V.a)(this, Object(q.a)(t).apply(this, arguments));
      }

      return Object(z.a)(t, e), Object(K.a)(t, [{
        key: "convertToGB",
        value: function value(e) {
          return e / 1024 / 1024 / 1024;
        }
      }, {
        key: "render",
        value: function value() {
          return n.a.createElement(Y.g, {
            width: 350,
            id: this.props.id,
            height: 250,
            onMouseEnter: this.onPieEnter
          }, n.a.createElement(Y.f, {
            data: this.props.data,
            cx: 220,
            cy: 100,
            innerRadius: 60,
            outerRadius: 80,
            fill: "#8884d8",
            paddingAngle: 5,
            dataKey: "value"
          }, this.props.data.map(function (e, t) {
            return n.a.createElement(Y.b, {
              key: "cell-".concat(t),
              fill: X[t % X.length]
            });
          })), n.a.createElement(Y.c, null), n.a.createElement(Y.h, {
            content: J
          }));
        }
      }]), t;
    }(r.PureComponent),
        Q = a(567),
        Z = a(563),
        ee = a(564),
        te = a(557),
        ae = a(568),
        re = a(569),
        ne = a(570),
        oe = a(514),
        ce = a(565),
        le = a(259),
        ie = a.n(le),
        se = a(261),
        ue = a.n(se),
        pe = a(260),
        me = a.n(pe),
        de = a(566),
        fe = a(262),
        ge = a.n(fe),
        be = a(585),
        Oe = a(571),
        Ee = a(119),
        he = a.n(Ee),
        ye = a(560),
        ve = a(561),
        je = a(562),
        we = a(254),
        Pe = a.n(we),
        xe = a(255),
        ke = a.n(xe),
        Se = a(256),
        De = a.n(Se),
        Ne = a(258),
        Ce = a.n(Ne),
        Re = a(257),
        Ie = a.n(Re),
        Te = n.a.createElement("div", null, n.a.createElement(ye.a, {
      button: !0,
      onClick: function onClick(e) {
        return C.push("/dashboard");
      }
    }, n.a.createElement(ve.a, null, n.a.createElement(Pe.a, null)), n.a.createElement(je.a, {
      primary: "Dashboard"
    })), n.a.createElement(ye.a, {
      button: !0,
      onClick: function onClick(e) {
        return C.push("/reports");
      }
    }, n.a.createElement(ve.a, null, n.a.createElement(ke.a, null)), n.a.createElement(je.a, {
      primary: "Reports"
    })), n.a.createElement(ye.a, {
      button: !0,
      onClick: function onClick(e) {
        return C.push("/monitors");
      }
    }, n.a.createElement(ve.a, null, n.a.createElement(De.a, null)), n.a.createElement(je.a, {
      primary: "Monitors"
    })), n.a.createElement(ye.a, {
      button: !0,
      onClick: function onClick(e) {
        return C.push("/alerts");
      }
    }, n.a.createElement(ve.a, null, n.a.createElement(Ie.a, null)), n.a.createElement(je.a, {
      primary: "Alerts"
    })));

    function Be(e) {
      return {
        type: "TOGGLE_FRAME_PROGRESSBAR",
        payload: e
      };
    }

    function Ae(e, t) {
      return {
        type: "TOGGLE_FRAME_SNACKBAR",
        payload: {
          snackbarVisible: e,
          snackbarText: t
        }
      };
    }

    function Me(e, t) {
      var a = Object.keys(e);

      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })), a.push.apply(a, r);
      }

      return a;
    }

    function Ge(e) {
      for (var t = 1; t < arguments.length; t++) {
        var a = null != arguments[t] ? arguments[t] : {};
        t % 2 ? Me(a, !0).forEach(function (t) {
          Object(m.a)(e, t, a[t]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : Me(a).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t));
        });
      }

      return e;
    }

    var _e = Object(P.a)(function (e) {
      return {
        root: {
          display: "flex"
        },
        toolbar: {
          paddingRight: 24
        },
        toolbarIcon: Ge({
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "0 8px"
        }, e.mixins.toolbar),
        appBar: {
          zIndex: e.zIndex.drawer + 1,
          transition: e.transitions.create(["width", "margin"], {
            easing: e.transitions.easing.sharp,
            duration: e.transitions.duration.leavingScreen
          })
        },
        appBarShift: {
          marginLeft: 240,
          width: "calc(100% - ".concat(240, "px)"),
          transition: e.transitions.create(["width", "margin"], {
            easing: e.transitions.easing.sharp,
            duration: e.transitions.duration.enteringScreen
          })
        },
        menuButton: {
          marginRight: 36
        },
        menuButtonHidden: {
          display: "none"
        },
        title: {
          flexGrow: 1
        },
        drawerPaper: {
          position: "relative",
          whiteSpace: "nowrap",
          width: 240,
          transition: e.transitions.create("width", {
            easing: e.transitions.easing.sharp,
            duration: e.transitions.duration.enteringScreen
          })
        },
        drawerPaperClose: Object(m.a)({
          overflowX: "hidden",
          transition: e.transitions.create("width", {
            easing: e.transitions.easing.sharp,
            duration: e.transitions.duration.leavingScreen
          }),
          width: e.spacing(7)
        }, e.breakpoints.up("sm"), {
          width: e.spacing(9)
        }),
        appBarSpacer: e.mixins.toolbar,
        content: {
          flexGrow: 1,
          height: "100vh",
          overflow: "auto"
        },
        container: {
          paddingTop: e.spacing(4),
          paddingBottom: e.spacing(4)
        },
        paper: {
          padding: e.spacing(2),
          display: "flex",
          overflow: "auto",
          flexDirection: "column"
        },
        fixedHeight: {
          height: 240
        },
        darkmode: {
          paddingLeft: 18,
          paddingTop: 18
        },
        message: {
          display: "flex",
          alignItems: "center"
        },
        error: {
          backgroundColor: e.palette.error.dark
        },
        switchMode: {
          marginRight: 10
        },
        frameProgress: {
          width: "100%",
          "& > * + *": {
            marginTop: e.spacing(2)
          }
        }
      };
    });

    var Le = Object(u.b)(function (e) {
      return {
        darkMode: e.darkMode,
        drawer: e.drawer,
        frame: e.frame,
        alerts: e.alerts
      };
    }, function (e) {
      return {
        onSwitchClick: function onSwitchClick() {
          e({
            type: "TOGGLE_DARK_MODE",
            payload: null
          });
        },
        onDrawerClick: function onDrawerClick(t) {
          e(function (e) {
            return {
              type: "TOGGLE_DRAWER",
              payload: e
            };
          }(t));
        },
        toggleProgressBar: function toggleProgressBar(t) {
          e(Be(t));
        },
        toggleSnackbar: function toggleSnackbar(t, a) {
          e(Ae(t, a));
        }
      };
    })(function (e) {
      var t = e.alerts,
          a = e.darkMode,
          r = e.drawer,
          o = e.onDrawerClick,
          c = e.onSwitchClick,
          i = e.frame,
          s = (e.toggleProgressBar, e.toggleSnackbar),
          m = _e(),
          d = Object(p.b)(["login"]),
          f = Object(l.a)(d, 3),
          b = (f[0], f[1], f[2]),
          O = Object(u.c)(),
          E = function E(e, t) {
        "clickaway" !== t && s(!1, "");
      };

      return n.a.createElement("div", {
        className: m.root
      }, n.a.createElement(g.a, null), n.a.createElement(Z.a, {
        position: "absolute",
        className: Object(W.a)(m.appBar, r.open && m.appBarShift)
      }, n.a.createElement(ee.a, {
        className: m.toolbar
      }, n.a.createElement(oe.a, {
        edge: "start",
        color: "inherit",
        "aria-label": "open drawer",
        onClick: function onClick(e) {
          return o(!0);
        },
        className: Object(W.a)(m.menuButton, r.open && m.menuButtonHidden)
      }, n.a.createElement(ie.a, null)), n.a.createElement(w.a, {
        component: "h1",
        variant: "h6",
        color: "inherit",
        noWrap: !0,
        className: m.title
      }, "Monitor"), n.a.createElement(oe.a, {
        color: "inherit",
        onClick: function onClick(e) {
          C.push("/alerts");
        }
      }, n.a.createElement(ce.a, {
        badgeContent: t.alerts.length,
        color: "secondary"
      }, n.a.createElement(me.a, null)))), i.progressbarVisible && n.a.createElement(de.a, {
        color: "secondary"
      })), n.a.createElement(Q.a, {
        variant: "permanent",
        classes: {
          paper: Object(W.a)(m.drawerPaper, !r.open && m.drawerPaperClose)
        },
        open: r.open
      }, n.a.createElement("div", {
        className: m.toolbarIcon
      }, n.a.createElement(oe.a, {
        onClick: function onClick(e) {
          return o(!1);
        }
      }, n.a.createElement(ue.a, null))), n.a.createElement(ae.a, null), n.a.createElement(te.a, null, Te), n.a.createElement(ae.a, null), n.a.createElement(re.a, {
        className: m.darkmode,
        control: n.a.createElement(ne.a, {
          className: m.switchMode,
          checked: a.darkMode,
          onChange: function onChange() {
            return c();
          }
        }),
        label: "Dark Mode"
      }), n.a.createElement(te.a, null, function (e) {
        return n.a.createElement("div", null, n.a.createElement(ye.a, {
          button: !0,
          onClick: e
        }, n.a.createElement(ve.a, null, n.a.createElement(Ce.a, null)), n.a.createElement(je.a, {
          primary: "Logout"
        })));
      }(function () {
        b("login"), O({
          type: "LOGOUT"
        });
      }))), n.a.createElement(be.a, {
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left"
        },
        open: i.snackbarVisible,
        autoHideDuration: 6e3,
        onClose: E
      }, n.a.createElement(Oe.a, {
        className: m.error,
        "aria-describedby": "client-snackbar",
        message: n.a.createElement("span", {
          id: "client-snackbar",
          className: m.message
        }, n.a.createElement(ge.a, {
          className: m.error
        }), i.snackbarText),
        action: [n.a.createElement(oe.a, {
          key: "close",
          "aria-label": "close",
          color: "inherit",
          onClick: E
        }, n.a.createElement(he.a, {
          className: m.icon
        }))]
      })));
    });

    function Ue(e) {
      var t = e.graph_data;
      return n.a.createElement(Y.e, {
        width: 1e3,
        height: 500,
        data: t,
        margin: {
          top: 5,
          right: 30,
          left: 200,
          bottom: 5
        }
      }, n.a.createElement(Y.a, {
        strokeDasharray: "3 3"
      }), n.a.createElement(Y.i, {
        dataKey: "time"
      }), n.a.createElement(Y.j, null), n.a.createElement(Y.h, null), n.a.createElement(Y.c, null), n.a.createElement(Y.d, {
        type: "monotone",
        dataKey: "total_load",
        stroke: "#82ca9d"
      }));
    }

    function We(e) {
      return {
        type: "UPDATE_ALERTS",
        payload: e
      };
    }

    function Fe(e, t) {
      var a = Object.keys(e);

      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })), a.push.apply(a, r);
      }

      return a;
    }

    function He(e) {
      for (var t = 1; t < arguments.length; t++) {
        var a = null != arguments[t] ? arguments[t] : {};
        t % 2 ? Fe(a, !0).forEach(function (t) {
          Object(m.a)(e, t, a[t]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : Fe(a).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t));
        });
      }

      return e;
    }

    var Ke = Object(P.a)(function (e) {
      return {
        root: {
          display: "flex"
        },
        toolbar: {
          paddingRight: 24
        },
        toolbarIcon: He({
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "0 8px"
        }, e.mixins.toolbar),
        drawerPaper: {
          position: "relative",
          whiteSpace: "nowrap",
          width: 240,
          transition: e.transitions.create("width", {
            easing: e.transitions.easing.sharp,
            duration: e.transitions.duration.enteringScreen
          })
        },
        drawerPaperClose: Object(m.a)({
          overflowX: "hidden",
          transition: e.transitions.create("width", {
            easing: e.transitions.easing.sharp,
            duration: e.transitions.duration.leavingScreen
          }),
          width: e.spacing(7)
        }, e.breakpoints.up("sm"), {
          width: e.spacing(9)
        }),
        appBarSpacer: e.mixins.toolbar,
        content: {
          flexGrow: 1,
          height: "100vh",
          overflow: "auto"
        },
        container: {
          paddingTop: e.spacing(4),
          paddingBottom: e.spacing(4)
        },
        paper: {
          padding: e.spacing(2),
          display: "flex",
          overflow: "auto",
          flexDirection: "column"
        },
        fixedHeight: {
          height: 350
        }
      };
    });
    var Ve = Object(u.b)(function (e) {
      return {
        dashboard: e.dashboard,
        login: e.login
      };
    }, function (e) {
      return {
        toggleProgressBar: function toggleProgressBar(t) {
          e(Be(t));
        },
        updateDashboard: function updateDashboard(t) {
          e(function (e) {
            return {
              type: "UPDATE_DASHBOARD",
              payload: e
            };
          }(t));
        },
        toggleSnackbar: function toggleSnackbar(t, a) {
          e(Ae(t, a));
        },
        updateAlerts: function updateAlerts(t) {
          e(We(t));
        }
      };
    })(function (e) {
      var t = e.dashboard,
          a = e.updateDashboard,
          o = e.updateAlerts,
          c = e.toggleProgressBar,
          i = e.toggleSnackbar,
          s = e.login,
          u = Ke(),
          p = n.a.useState(!1),
          m = Object(l.a)(p, 2),
          d = m[0],
          f = m[1],
          g = n.a.useState(0),
          b = Object(l.a)(g, 2),
          O = b[0],
          E = b[1],
          y = Object(W.a)(u.paper, u.fixedHeight),
          v = function v(e) {
        return e / 1024 / 1024 / 1024;
      },
          j = function j(e) {
        return [{
          name: "Used",
          value: v(e.used)
        }, {
          name: "Free",
          value: v(e.free)
        }];
      };

      return function (e, t) {
        var a = Object(r.useRef)();
        Object(r.useEffect)(function () {
          a.current = e;
        }, [e]), Object(r.useEffect)(function () {
          if (null !== t) {
            var e = setInterval(function () {
              a.current();
            }, t);
            return function () {
              return clearInterval(e);
            };
          }
        }, [t]);
      }(function () {
        (function () {
          var e = Object(U.a)(L.a.mark(function e() {
            var t, r;
            return L.a.wrap(function (e) {
              for (;;) {
                switch (e.prev = e.next) {
                  case 0:
                    return e.prev = 0, c(!0), e.next = 4, S.a.get("/dashboard", {
                      withCredentials: !0,
                      auth: {
                        username: s.username,
                        password: s.password
                      }
                    });

                  case 4:
                    return t = e.sent, a(t.data), c(!1), f(!0), e.next = 10, S.a.get("/alerts", {
                      withCredentials: !0,
                      auth: {
                        username: s.username,
                        password: s.password
                      }
                    });

                  case 10:
                    r = e.sent, o(r.data), E(1e4), e.next = 20;
                    break;

                  case 15:
                    e.prev = 15, e.t0 = e["catch"](0), c(!1), i(!0, e.t0.message), E(1e4);

                  case 20:
                  case "end":
                    return e.stop();
                }
              }
            }, e, null, [[0, 15]]);
          }));
          return function () {
            return e.apply(this, arguments);
          };
        })()();
      }, O), n.a.createElement("div", {
        className: u.root
      }, n.a.createElement(Le, null), n.a.createElement("main", {
        className: u.content
      }, n.a.createElement("div", {
        className: u.appBarSpacer
      }), n.a.createElement(x.a, {
        maxWidth: "lg",
        className: u.container
      }, n.a.createElement(h.a, {
        container: !0,
        spacing: 3
      }, n.a.createElement(h.a, {
        item: !0,
        xs: 12,
        md: 6,
        lg: 6
      }, n.a.createElement(F.a, {
        className: y
      }, n.a.createElement("h2", null, "Memory"), d && n.a.createElement($, {
        id: "memory",
        data: j(t.Memory)
      }))), n.a.createElement(h.a, {
        item: !0,
        xs: 12,
        md: 6,
        lg: 6
      }, n.a.createElement(F.a, {
        className: y
      }, n.a.createElement("h2", null, "Disk"), d && n.a.createElement($, {
        id: "disk",
        data: j(t.Disk)
      }))), n.a.createElement(h.a, {
        item: !0,
        xs: 12
      }, n.a.createElement(F.a, {
        className: u.paper
      }, n.a.createElement("h1", null, "CPU"), d && n.a.createElement(Ue, {
        graph_data: t.CPU
      }))))), n.a.createElement(D, null)));
    }),
        qe = a(572),
        ze = a(576),
        Ye = a(575),
        Je = a(583),
        Xe = a(573),
        $e = a(574);

    function Qe(e, t) {
      var a = Object.keys(e);

      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })), a.push.apply(a, r);
      }

      return a;
    }

    function Ze(e) {
      for (var t = 1; t < arguments.length; t++) {
        var a = null != arguments[t] ? arguments[t] : {};
        t % 2 ? Qe(a, !0).forEach(function (t) {
          Object(m.a)(e, t, a[t]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : Qe(a).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t));
        });
      }

      return e;
    }

    var et = Object(P.a)(function (e) {
      return {
        root: {
          display: "flex"
        },
        toolbar: {
          paddingRight: 24
        },
        toolbarIcon: Ze({
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "0 8px"
        }, e.mixins.toolbar),
        appBarSpacer: e.mixins.toolbar,
        content: {
          flexGrow: 1,
          height: "100vh",
          overflow: "auto"
        },
        container: {
          paddingTop: e.spacing(4),
          paddingBottom: e.spacing(4)
        },
        paper: {
          padding: e.spacing(2),
          display: "flex",
          overflow: "auto",
          flexDirection: "column"
        },
        fixedHeight: {
          height: 350
        },
        tableWrapper: {
          maxHeight: 440,
          overflow: "auto"
        }
      };
    });
    var tt = Object(u.b)(function (e) {
      return {
        reportsSummery: e.reportsSummery,
        login: e.login
      };
    }, function (e) {
      return {
        toggleProgressBar: function toggleProgressBar(t) {
          e(Be(t));
        },
        updateReportsSummery: function updateReportsSummery(t) {
          e(function (e) {
            return {
              type: "UPDATE_REPORTS_SUMMERY",
              payload: e
            };
          }(t));
        },
        toggleSnackbar: function toggleSnackbar(t, a) {
          e(Ae(t, a));
        }
      };
    })(function (e) {
      var t = e.reportsSummery,
          a = e.updateReportsSummery,
          o = (e.toggleProgressbar, e.toggleSnackbar),
          c = e.login,
          i = et(),
          s = n.a.useState(0),
          u = Object(l.a)(s, 2),
          p = u[0],
          m = u[1],
          d = n.a.useState(10),
          f = Object(l.a)(d, 2),
          g = f[0],
          b = f[1];
      return Object(r.useEffect)(function () {
        (function () {
          var e = Object(U.a)(L.a.mark(function e() {
            var t;
            return L.a.wrap(function (e) {
              for (;;) {
                switch (e.prev = e.next) {
                  case 0:
                    return e.prev = 0, Be(!0), e.next = 4, S.a.get("/reports", {
                      withCredentials: !0,
                      auth: {
                        username: c.username,
                        password: c.password
                      }
                    });

                  case 4:
                    t = e.sent, a(t.data), Be(!1), e.next = 13;
                    break;

                  case 9:
                    e.prev = 9, e.t0 = e["catch"](0), Be(!1), o(!0, e.t0.message);

                  case 13:
                  case "end":
                    return e.stop();
                }
              }
            }, e, null, [[0, 9]]);
          }));
          return function () {
            return e.apply(this, arguments);
          };
        })()();
      }, [t.reports.length]), n.a.createElement("div", {
        className: i.root
      }, n.a.createElement(Le, null), n.a.createElement("main", {
        className: i.content
      }, n.a.createElement("div", {
        className: i.appBarSpacer
      }), n.a.createElement(x.a, {
        maxWidth: "lg",
        className: i.container
      }, n.a.createElement(F.a, null, n.a.createElement("div", {
        className: i.tableWrapper
      }, n.a.createElement(qe.a, {
        stickyHeader: !0,
        size: "medium"
      }, n.a.createElement(Xe.a, null, n.a.createElement($e.a, null, n.a.createElement(Ye.a, null, "Monitor"), n.a.createElement(Ye.a, null, "Report Date"), n.a.createElement(Ye.a, null, "PC Name"))), n.a.createElement(ze.a, null, t.reports.slice(p * g, p * g + g).map(function (e, t) {
        return n.a.createElement($e.a, {
          hover: !0,
          tabIndex: -1,
          key: t,
          onClick: function onClick(t) {
            return C.push("/report/" + e.ReportID);
          }
        }, n.a.createElement(Ye.a, null, e.MonitorName), n.a.createElement(Ye.a, null, e.TimeStamp), n.a.createElement(Ye.a, null, e.PCName));
      })))), n.a.createElement(Je.a, {
        rowsPerPageOptions: [10, 25, 100],
        component: "div",
        count: t.reports.length,
        rowsPerPage: g,
        page: p,
        backIconButtonProps: {
          "aria-label": "previous page"
        },
        nextIconButtonProps: {
          "aria-label": "next page"
        },
        onChangePage: function onChangePage(e, t) {
          m(t);
        },
        onChangeRowsPerPage: function onChangeRowsPerPage(e) {
          b(+e.target.value), m(0);
        }
      }))), n.a.createElement(D, null)));
    }),
        at = a(577),
        rt = a(123),
        nt = a.n(rt),
        ot = a(124),
        ct = a.n(ot);

    function lt(e, t) {
      var a = Object.keys(e);

      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })), a.push.apply(a, r);
      }

      return a;
    }

    function it(e) {
      for (var t = 1; t < arguments.length; t++) {
        var a = null != arguments[t] ? arguments[t] : {};
        t % 2 ? lt(a, !0).forEach(function (t) {
          Object(m.a)(e, t, a[t]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : lt(a).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t));
        });
      }

      return e;
    }

    var st = Object(P.a)(function (e) {
      return {
        root: {
          display: "flex"
        },
        toolbar: {
          paddingRight: 24
        },
        toolbarIcon: it({
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "0 8px"
        }, e.mixins.toolbar),
        appBarSpacer: e.mixins.toolbar,
        content: {
          flexGrow: 1,
          height: "100vh",
          overflow: "auto"
        },
        container: {
          paddingTop: e.spacing(4),
          paddingBottom: e.spacing(4)
        },
        paper: {
          padding: e.spacing(2),
          display: "flex",
          overflow: "auto",
          flexDirection: "column"
        },
        fixedHeight: {
          height: 350
        }
      };
    });
    var ut = Object(u.b)(function (e) {
      return {
        reports: e.reports,
        login: e.login
      };
    }, function (e) {
      return {
        toggleProgressBar: function toggleProgressBar(t) {
          e(Be(t));
        },
        updateReports: function updateReports(t) {
          e(function (e) {
            return {
              type: "UPDATE_REPORTS",
              payload: e
            };
          }(t));
        },
        toggleSnackbar: function toggleSnackbar(t, a) {
          e(Ae(t, a));
        }
      };
    })(function (e) {
      var t = e.reports,
          a = e.toggleProgressBar,
          o = e.updateReports,
          c = e.match,
          i = e.login,
          s = st(),
          u = Object(W.a)(s.paper, s.fixedHeight),
          p = n.a.useState({
        disk: [],
        network: [],
        users: []
      }),
          m = Object(l.a)(p, 2),
          d = m[0],
          f = m[1],
          g = n.a.useState(!1),
          b = Object(l.a)(g, 2),
          O = b[0],
          E = b[1],
          y = function y(e) {
        return (e / 1024 / 1024 / 1024).toFixed(3);
      },
          v = function v(e, t) {
        var a = d[e].indexOf(t),
            r = it({}, d);
        -1 === a ? r[e].push(t) : r[e].splice(a, 1), f(r);
      };

      return Object(r.useEffect)(function () {
        (function () {
          var e = Object(U.a)(L.a.mark(function e() {
            var t;
            return L.a.wrap(function (e) {
              for (;;) {
                switch (e.prev = e.next) {
                  case 0:
                    return e.prev = 0, a(!0), e.next = 4, S.a.get("/report/" + c.params.reportID, {
                      withCredentials: !0,
                      auth: {
                        username: i.username,
                        password: i.password
                      }
                    });

                  case 4:
                    t = e.sent, o(t.data), a(!1), E(!0), e.next = 14;
                    break;

                  case 10:
                    e.prev = 10, e.t0 = e["catch"](0), a(!1), Ae(!0, e.t0.message);

                  case 14:
                  case "end":
                    return e.stop();
                }
              }
            }, e, null, [[0, 10]]);
          }));
          return function () {
            return e.apply(this, arguments);
          };
        })()();
      }, []), n.a.createElement("div", {
        className: s.root
      }, n.a.createElement(Le, null), n.a.createElement("main", {
        className: s.content
      }, n.a.createElement("div", {
        className: s.appBarSpacer
      }), n.a.createElement(x.a, {
        maxWidth: "lg",
        className: s.container
      }, O && n.a.createElement(h.a, {
        container: !0,
        spacing: 3
      }, n.a.createElement(h.a, {
        item: !0,
        xs: 12,
        md: 4,
        lg: 4
      }, n.a.createElement(F.a, {
        className: u
      }, n.a.createElement("h2", null, "cpu"), n.a.createElement(te.a, null, n.a.createElement(ye.a, null, n.a.createElement(je.a, {
        primary: "Load: " + t.reports.CPU[0].total_load + "%"
      })), n.a.createElement(ye.a, null, n.a.createElement(je.a, {
        primary: "Cores: " + t.reports.CPU[0].cpu_count
      })), n.a.createElement(ye.a, null, n.a.createElement(je.a, {
        primary: "Threads: " + t.reports.CPU[0].cores
      }))))), n.a.createElement(h.a, {
        item: !0,
        xs: 12,
        md: 4,
        lg: 4
      }, n.a.createElement(F.a, {
        className: u
      }, n.a.createElement("h2", null, "Memory"), n.a.createElement(te.a, null, n.a.createElement(ye.a, null, n.a.createElement(je.a, {
        primary: "Total: " + y(t.reports.Memory.total) + "GB"
      })), n.a.createElement(ye.a, null, n.a.createElement(je.a, {
        primary: "Free: " + y(t.reports.Memory.available) + "GB"
      })), n.a.createElement(ye.a, null, n.a.createElement(je.a, {
        primary: "Percent: " + t.reports.Memory.percent + "%"
      }))))), n.a.createElement(h.a, {
        item: !0,
        xs: 12,
        md: 4,
        lg: 4
      }, n.a.createElement(F.a, {
        className: u
      }, n.a.createElement("h2", null, "Disk"), n.a.createElement(te.a, null, t.reports.Disk.partitions.map(function (e, t) {
        return n.a.createElement("div", {
          key: t
        }, n.a.createElement(ye.a, {
          button: !0,
          onClick: function onClick(e) {
            return v("disk", t);
          }
        }, n.a.createElement(je.a, {
          primary: e.device
        }), -1 !== d.disk.indexOf(t) ? n.a.createElement(nt.a, null) : n.a.createElement(ct.a, null)), n.a.createElement(at.a, {
          "in": -1 !== d.disk.indexOf(t),
          timeout: "auto",
          unmountOnExit: !0
        }, n.a.createElement(te.a, {
          component: "div",
          disablePadding: !0
        }, n.a.createElement(ye.a, {
          className: s.nested
        }, n.a.createElement(je.a, {
          primary: "FS type: " + e.fstype
        })), n.a.createElement(ye.a, {
          className: s.nested
        }, n.a.createElement(je.a, {
          primary: "Options: " + e.opts
        })), n.a.createElement(ye.a, {
          className: s.nested
        }, n.a.createElement(je.a, {
          primary: "Mount Point: " + e.mount_point
        })))));
      })))), n.a.createElement(h.a, {
        item: !0,
        xs: 12,
        md: 4,
        lg: 4
      }, n.a.createElement(F.a, {
        className: u
      }, n.a.createElement("h2", null, "Network"), n.a.createElement(te.a, null, t.reports.Network.map(function (e, t) {
        return n.a.createElement("div", {
          key: t
        }, n.a.createElement(ye.a, {
          button: !0,
          onClick: function onClick(e) {
            return v("network", t);
          }
        }, n.a.createElement(je.a, {
          primary: e.name
        }), -1 !== d.network.indexOf(t) ? n.a.createElement(nt.a, null) : n.a.createElement(ct.a, null)), n.a.createElement(at.a, {
          "in": -1 !== d.network.indexOf(t),
          timeout: "auto",
          unmountOnExit: !0
        }, n.a.createElement(te.a, {
          component: "div",
          disablePadding: !0
        }, n.a.createElement(ye.a, {
          className: s.nested
        }, n.a.createElement(je.a, {
          primary: "Address: " + e.address[0]
        })))));
      })))), n.a.createElement(h.a, {
        item: !0,
        xs: 12,
        md: 4,
        lg: 4
      }, n.a.createElement(F.a, {
        className: u
      }, n.a.createElement("h2", null, "Operating System"), n.a.createElement(te.a, null, n.a.createElement(ye.a, null, n.a.createElement(je.a, {
        primary: "OS:" + t.reports.OS.name
      })), n.a.createElement(ye.a, null, n.a.createElement(je.a, {
        primary: "Version: " + t.reports.OS.version
      })), n.a.createElement(ye.a, null, n.a.createElement(je.a, {
        primary: "Full Name: " + t.reports.OS.fullname
      })), n.a.createElement(ye.a, null, n.a.createElement(je.a, {
        primary: "Architecture: " + t.reports.OS.architecture
      })), n.a.createElement(ye.a, null, n.a.createElement(je.a, {
        primary: "Processor: " + t.reports.OS.processor
      }))))), n.a.createElement(h.a, {
        item: !0,
        xs: 12,
        md: 4,
        lg: 4
      }, n.a.createElement(F.a, {
        className: u
      }, n.a.createElement("h2", null, "Users"), n.a.createElement(te.a, null, t.reports.Users.map(function (e, t) {
        return n.a.createElement("div", {
          key: t
        }, n.a.createElement(ye.a, {
          button: !0,
          onClick: function onClick(e) {
            return v("users", t);
          }
        }, n.a.createElement(je.a, {
          primary: e.name
        }), -1 !== d.users.indexOf(t) ? n.a.createElement(nt.a, null) : n.a.createElement(ct.a, null)), n.a.createElement(at.a, {
          "in": -1 !== d.users.indexOf(t),
          timeout: "auto",
          unmountOnExit: !0
        }, n.a.createElement(te.a, {
          component: "div",
          disablePadding: !0
        }, n.a.createElement(ye.a, {
          className: s.nested
        }, n.a.createElement(je.a, {
          primary: "User Name: " + e.name
        })), n.a.createElement(ye.a, {
          className: s.nested
        }, n.a.createElement(je.a, {
          primary: "Terminal: " + e.terminal
        })), n.a.createElement(ye.a, {
          className: s.nested
        }, n.a.createElement(je.a, {
          primary: "Host: " + e.host
        })))));
      })))), n.a.createElement(h.a, {
        item: !0,
        xs: 12,
        md: 4,
        lg: 4
      }, n.a.createElement(F.a, {
        className: u
      }, n.a.createElement("h2", null, "Fans"), n.a.createElement(te.a, null, n.a.createElement(ye.a, null, n.a.createElement(je.a, {
        primary: "N/A"
      }))))), n.a.createElement(h.a, {
        item: !0,
        xs: 12,
        md: 4,
        lg: 4
      }, n.a.createElement(F.a, {
        className: u
      }, n.a.createElement("h2", null, "Temperatures"), n.a.createElement(te.a, null, n.a.createElement(ye.a, null, n.a.createElement(je.a, {
        primary: "N/A"
      }))))), n.a.createElement(h.a, {
        item: !0,
        xs: 12,
        md: 4,
        lg: 4
      }, n.a.createElement(F.a, {
        className: u
      }, n.a.createElement("h2", null, "Battery"), n.a.createElement(te.a, null, n.a.createElement(ye.a, null, n.a.createElement(je.a, {
        primary: "Percent: " + Math.floor(t.reports.Battery.percent) + "%"
      })), n.a.createElement(ye.a, null, n.a.createElement(je.a, {
        primary: "N/A"
      })), n.a.createElement(ye.a, null, n.a.createElement(je.a, {
        primary: "Yes"
      }))))))), n.a.createElement(D, null)));
    }),
        pt = a(121);

    function mt(e) {
      return {
        type: "TOGGLE_MONITOR_DIALOG",
        payload: e
      };
    }

    function dt(e) {
      return {
        type: "TOGGLE_MONITOR_PROGRESSBAR",
        payload: e
      };
    }

    var ft = a(578),
        gt = a(515);

    function bt(e) {
      return {
        type: "UPDATE_MONITORS",
        payload: e
      };
    }

    function Ot(e, t) {
      var a = Object.keys(e);

      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })), a.push.apply(a, r);
      }

      return a;
    }

    var Et = Object(P.a)(function (e) {
      return {
        appBar: {
          position: "relative",
          width: 500
        },
        title: {
          marginLeft: e.spacing(2),
          flex: 1
        },
        monitorsField: {
          margin: 10
        },
        monitorsProgress: {
          width: "100%",
          "& > * + *": {
            marginTop: e.spacing(2)
          }
        }
      };
    }),
        ht = n.a.forwardRef(function (e, t) {
      return n.a.createElement(gt.a, Object.assign({
        direction: "up",
        ref: t
      }, e));
    });
    var yt = Object(u.b)(function (e) {
      return {
        dialogStatus: e.monitorDialog,
        login: e.login,
        monitors: e.monitors
      };
    }, function (e) {
      return {
        onDialogClick: function onDialogClick(t) {
          e(mt(t));
        },
        toggleProgressbar: function toggleProgressbar(t) {
          e(dt(t));
        },
        updateMonitors: function updateMonitors(t) {
          e(bt(t));
        },
        toggleSnackbar: function toggleSnackbar(t, a) {
          e(Ae(t, a));
        }
      };
    })(function (e) {
      var t = e.dialogStatus,
          a = e.onDialogClick,
          o = e.toggleProgressbar,
          c = e.login,
          i = e.monitors,
          s = e.updateMonitors,
          u = e.toggleSnackbar,
          p = Et(),
          d = Object(r.useState)([]),
          g = Object(l.a)(d, 2),
          O = g[0],
          E = g[1],
          h = function h(e, t) {
        E(function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var a = null != arguments[t] ? arguments[t] : {};
            t % 2 ? Ot(a, !0).forEach(function (t) {
              Object(m.a)(e, t, a[t]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : Ot(a).forEach(function (t) {
              Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t));
            });
          }

          return e;
        }({}, O, Object(m.a)({}, e, t)));
      };

      return n.a.createElement("div", null, n.a.createElement(ft.a, {
        open: t.dialogOpen,
        onClose: function onClose() {
          return a(!1);
        },
        TransitionComponent: ht
      }, n.a.createElement(Z.a, {
        className: p.appBar
      }, n.a.createElement(ee.a, null, n.a.createElement(oe.a, {
        edge: "start",
        color: "inherit",
        onClick: function onClick() {
          return a(!1);
        },
        "aria-label": "close"
      }, n.a.createElement(he.a, null)), n.a.createElement(w.a, {
        variant: "h6",
        className: p.title
      }, "Add Monitor"), n.a.createElement(f.a, {
        autoFocus: !0,
        color: "inherit",
        onClick: function onClick() {
          o(!0), S.a.post("/monitors", {
            pcName: O.pcName,
            monitorName: O.monitorName
          }, {
            withCredentials: !0,
            auth: {
              username: c.username,
              password: c.password
            }
          }).then(function (e) {
            o(!1), s([].concat(Object(pt.a)(i.monitors), [e.data])), a(!1), C.push("/monitors");
          })["catch"](function (e) {
            o(!1), console.error(e), dt(!1), u(!0, e.message), a(!1);
          });
        }
      }, "save"))), t.progressbarVisible && n.a.createElement(de.a, {
        color: "secondary"
      }), n.a.createElement(b.a, {
        className: p.monitorsField,
        margin: "normal",
        required: !0,
        onChange: function onChange(e) {
          h("pcName", e.target.value);
        },
        id: "name",
        label: "PC Name",
        variant: "outlined",
        type: "text"
      }), n.a.createElement(b.a, {
        className: p.monitorsField,
        margin: "normal",
        onChange: function onChange(e) {
          h("monitorName", e.target.value);
        },
        required: !0,
        id: "name",
        variant: "outlined",
        label: "Monitor Name",
        type: "text"
      })));
    });

    function vt(e, t) {
      var a = Object.keys(e);

      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })), a.push.apply(a, r);
      }

      return a;
    }

    function jt(e) {
      for (var t = 1; t < arguments.length; t++) {
        var a = null != arguments[t] ? arguments[t] : {};
        t % 2 ? vt(a, !0).forEach(function (t) {
          Object(m.a)(e, t, a[t]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : vt(a).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t));
        });
      }

      return e;
    }

    var wt = Object(P.a)(function (e) {
      return {
        root: {
          display: "flex"
        },
        button: {
          margin: e.spacing(1)
        },
        toolbar: {
          paddingRight: 24
        },
        toolbarIcon: jt({
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "0 8px"
        }, e.mixins.toolbar),
        appBarSpacer: e.mixins.toolbar,
        content: {
          flexGrow: 1,
          height: "100vh",
          overflow: "auto"
        },
        container: {
          paddingTop: e.spacing(4),
          paddingBottom: e.spacing(4)
        },
        paper: {
          padding: e.spacing(2),
          display: "flex",
          overflow: "auto",
          flexDirection: "column"
        },
        fixedHeight: {
          height: 350
        },
        tableWrapper: {
          maxHeight: 440,
          overflow: "auto"
        }
      };
    });
    var Pt = Object(u.b)(function (e) {
      return {
        dialogStatus: e.monitorDialog,
        monitors: e.monitors,
        login: e.login
      };
    }, function (e) {
      return {
        onDialogClick: function onDialogClick(t) {
          e(mt(t));
        },
        toggleProgressBar: function toggleProgressBar(t) {
          e(Be(t));
        },
        updateMonitors: function updateMonitors(t) {
          e(bt(t));
        },
        toggleSnackbar: function toggleSnackbar(t, a) {
          e(Ae(t, a));
        }
      };
    })(function (e) {
      var t = e.onDialogClick,
          a = e.toggleProgressBar,
          o = e.updateMonitors,
          c = e.toggleSnackbar,
          i = e.login,
          s = e.monitors,
          u = wt(),
          p = n.a.useState(0),
          m = Object(l.a)(p, 2),
          d = m[0],
          g = m[1],
          b = n.a.useState(10),
          E = Object(l.a)(b, 2),
          h = E[0],
          y = E[1],
          v = n.a.useState([]),
          j = Object(l.a)(v, 2),
          w = j[0],
          P = j[1];
      return Object(r.useEffect)(function () {
        (function () {
          var e = Object(U.a)(L.a.mark(function e() {
            var t;
            return L.a.wrap(function (e) {
              for (;;) {
                switch (e.prev = e.next) {
                  case 0:
                    return e.prev = 0, a(!0), e.next = 4, S.a.get("/monitors", {
                      withCredentials: !0,
                      auth: {
                        username: i.username,
                        password: i.password
                      }
                    });

                  case 4:
                    t = e.sent, o(t.data), a(!1), e.next = 13;
                    break;

                  case 9:
                    e.prev = 9, e.t0 = e["catch"](0), a(!1), c(!0, e.t0.message);

                  case 13:
                  case "end":
                    return e.stop();
                }
              }
            }, e, null, [[0, 9]]);
          }));
          return function () {
            return e.apply(this, arguments);
          };
        })()();
      }, [s.monitors.length]), n.a.createElement("div", {
        className: u.root
      }, n.a.createElement(Le, null), n.a.createElement("main", {
        className: u.content
      }, n.a.createElement("div", {
        className: u.appBarSpacer
      }), n.a.createElement(x.a, {
        maxWidth: "lg",
        className: u.container
      }, n.a.createElement(F.a, null, n.a.createElement("div", {
        className: u.tableWrapper
      }, n.a.createElement(qe.a, {
        stickyHeader: !0,
        size: "medium"
      }, n.a.createElement(Xe.a, null, n.a.createElement($e.a, null, n.a.createElement(Ye.a, {
        padding: "checkbox"
      }, n.a.createElement(O.a, {
        id: "select-all",
        indeterminate: w.length > 0 && w.length < s.monitors.length,
        checked: w.length === s.monitors.length,
        onChange: function onChange(e) {
          if (e.target.checked) {
            var t = s.monitors.map(function (e) {
              return e.APIKey;
            });
            P(t);
          } else P([]);
        },
        inputProps: {
          "aria-label": "select all desserts"
        }
      })), n.a.createElement(Ye.a, null, "Monitor API Key"), n.a.createElement(Ye.a, null, "Monitor Name"), n.a.createElement(Ye.a, null, "PC Name"))), n.a.createElement(ze.a, null, s.monitors.slice(d * h, d * h + h).map(function (e, t) {
        var a,
            r = (a = e.APIKey, -1 !== w.indexOf(a)),
            o = "enhanced-table-checkbox-".concat(t);
        return n.a.createElement($e.a, {
          hover: !0,
          tabIndex: -1,
          key: e.id,
          onClick: function onClick(t) {
            return function (e, t) {
              var a = w.indexOf(t),
                  r = [];
              -1 === a ? r = r.concat(w, t) : 0 === a ? r = r.concat(w.slice(1)) : a === w.length - 1 ? r = r.concat(w.slice(0, -1)) : a > 0 && (r = r.concat(w.slice(0, a), w.slice(a + 1))), P(r);
            }(0, e.APIKey);
          }
        }, n.a.createElement(Ye.a, {
          padding: "checkbox"
        }, n.a.createElement(O.a, {
          checked: r,
          inputProps: {
            "aria-labelledby": o
          }
        })), n.a.createElement(Ye.a, null, e.APIKey), n.a.createElement(Ye.a, null, e.MonitorName), n.a.createElement(Ye.a, null, e.PCName));
      })))), n.a.createElement(Je.a, {
        rowsPerPageOptions: [10, 25, 100],
        component: "div",
        count: s.monitors.length,
        rowsPerPage: h,
        page: d,
        backIconButtonProps: {
          "aria-label": "previous page"
        },
        nextIconButtonProps: {
          "aria-label": "next page"
        },
        onChangePage: function onChangePage(e, t) {
          g(t);
        },
        onChangeRowsPerPage: function onChangeRowsPerPage(e) {
          y(+e.target.value), g(0);
        }
      }), n.a.createElement(f.a, {
        variant: "outlined",
        className: u.button,
        onClick: function onClick() {
          return t(!0);
        }
      }, "Add new Monitor"), n.a.createElement(yt, null), w.length > 0 && n.a.createElement(f.a, {
        variant: "outlined",
        className: u.button,
        onClick: function onClick() {
          S.a.post("/delete-monitor", {
            apiKeys: w
          }, {
            withCredentials: !0,
            auth: {
              username: i.username,
              password: i.password
            }
          }).then(function (e) {
            a(!1), o([].concat(Object(pt.a)(s.monitors), [e.data])), t(!1);
          })["catch"](function (e) {
            a(!1), console.error(e), c(!0, e.message), t(!1);
          });
        }
      }, "Delete"))), n.a.createElement(D, null)));
    });

    function xt(e, t) {
      var a = Object.keys(e);

      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })), a.push.apply(a, r);
      }

      return a;
    }

    function kt(e) {
      for (var t = 1; t < arguments.length; t++) {
        var a = null != arguments[t] ? arguments[t] : {};
        t % 2 ? xt(a, !0).forEach(function (t) {
          Object(m.a)(e, t, a[t]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : xt(a).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t));
        });
      }

      return e;
    }

    var St = Object(P.a)(function (e) {
      return {
        root: {
          display: "flex"
        },
        toolbar: {
          paddingRight: 24
        },
        toolbarIcon: kt({
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "0 8px"
        }, e.mixins.toolbar),
        button: {
          margin: e.spacing(1)
        },
        appBarSpacer: e.mixins.toolbar,
        content: {
          flexGrow: 1,
          height: "100vh",
          overflow: "auto"
        },
        container: {
          paddingTop: e.spacing(4),
          paddingBottom: e.spacing(4)
        },
        paper: {
          padding: e.spacing(2),
          display: "flex",
          overflow: "auto",
          flexDirection: "column"
        },
        fixedHeight: {
          height: 350
        },
        tableWrapper: {
          maxHeight: 440,
          overflow: "auto"
        }
      };
    });
    var Dt = Object(u.b)(function (e) {
      return {
        alerts: e.alerts,
        login: e.login
      };
    }, function (e) {
      return {
        toggleProgressBar: function toggleProgressBar(t) {
          e(Be(t));
        },
        updateAlerts: function updateAlerts(t) {
          e(We(t));
        },
        toggleSnackbar: function toggleSnackbar(t, a) {
          e(Ae(t, a));
        }
      };
    })(function (e) {
      var t = e.alerts,
          a = e.login,
          o = e.toggleProgressBar,
          c = e.updateAlerts,
          i = e.toggleSnackbar,
          s = St(),
          u = n.a.useState(0),
          p = Object(l.a)(u, 2),
          m = p[0],
          d = p[1],
          g = n.a.useState(!1),
          b = Object(l.a)(g, 2),
          E = b[0],
          h = b[1],
          y = n.a.useState(0),
          v = Object(l.a)(y, 2),
          j = v[0],
          w = v[1],
          P = n.a.useState(10),
          k = Object(l.a)(P, 2),
          N = k[0],
          C = k[1],
          R = n.a.useState([]),
          I = Object(l.a)(R, 2),
          T = I[0],
          B = I[1];
      return function (e, t) {
        var a = Object(r.useRef)();
        Object(r.useEffect)(function () {
          a.current = e;
        }, [e]), Object(r.useEffect)(function () {
          if (null !== t) {
            var e = setInterval(function () {
              a.current();
            }, t);
            return function () {
              return clearInterval(e);
            };
          }
        }, [t]);
      }(function () {
        (function () {
          var e = Object(U.a)(L.a.mark(function e() {
            var t;
            return L.a.wrap(function (e) {
              for (;;) {
                switch (e.prev = e.next) {
                  case 0:
                    return e.prev = 0, o(!0), e.next = 4, S.a.get("/alerts", {
                      withCredentials: !0,
                      auth: {
                        username: a.username,
                        password: a.password
                      }
                    });

                  case 4:
                    t = e.sent, c(t.data), o(!1), h(!0), w(1e4), e.next = 16;
                    break;

                  case 11:
                    e.prev = 11, e.t0 = e["catch"](0), w(1e4), o(!1), i(!0, e.t0.message);

                  case 16:
                  case "end":
                    return e.stop();
                }
              }
            }, e, null, [[0, 11]]);
          }));
          return function () {
            return e.apply(this, arguments);
          };
        })()();
      }, j), n.a.createElement("div", {
        className: s.root
      }, n.a.createElement(Le, null), n.a.createElement("main", {
        className: s.content
      }, n.a.createElement("div", {
        className: s.appBarSpacer
      }), n.a.createElement(x.a, {
        maxWidth: "lg",
        className: s.container
      }, E && n.a.createElement(F.a, null, n.a.createElement("div", {
        className: s.tableWrapper
      }, n.a.createElement(qe.a, {
        stickyHeader: !0,
        size: "medium"
      }, n.a.createElement(Xe.a, null, n.a.createElement($e.a, null, n.a.createElement(Ye.a, {
        padding: "checkbox"
      }, n.a.createElement(O.a, {
        indeterminate: T.length > 0 && T.length < t.alerts.length,
        checked: T.length === t.alerts.length,
        id: "select-all",
        onChange: function onChange(e) {
          if (e.target.checked) {
            var a = t.alerts.map(function (e) {
              return e._id;
            });
            B(a);
          } else B([]);
        },
        inputProps: {
          "aria-label": "select all desserts"
        }
      })), n.a.createElement(Ye.a, null, "Alert"), n.a.createElement(Ye.a, null, "Report Date"), n.a.createElement(Ye.a, null, "PC Name"))), n.a.createElement(ze.a, null, t.alerts.slice(m * N, m * N + N).map(function (e, t) {
        var a,
            r = (a = e._id, -1 !== T.indexOf(a)),
            o = "enhanced-table-checkbox-".concat(t);
        return n.a.createElement($e.a, {
          hover: !0,
          tabIndex: -1,
          key: t,
          onClick: function onClick(t) {
            return function (e, t) {
              var a = T.indexOf(t),
                  r = [];
              -1 === a ? r = r.concat(T, t) : 0 === a ? r = r.concat(T.slice(1)) : a === T.length - 1 ? r = r.concat(T.slice(0, -1)) : a > 0 && (r = r.concat(T.slice(0, a), T.slice(a + 1))), B(r);
            }(0, e._id);
          }
        }, n.a.createElement(Ye.a, {
          padding: "checkbox"
        }, n.a.createElement(O.a, {
          checked: r,
          inputProps: {
            "aria-labelledby": o
          }
        })), n.a.createElement(Ye.a, null, e.Alert), n.a.createElement(Ye.a, null, e.AlertDate), n.a.createElement(Ye.a, null, e.PCName));
      })))), n.a.createElement(Je.a, {
        rowsPerPageOptions: [10, 25, 100],
        component: "div",
        count: t.alerts.length,
        rowsPerPage: N,
        page: m,
        backIconButtonProps: {
          "aria-label": "previous page"
        },
        nextIconButtonProps: {
          "aria-label": "next page"
        },
        onChangePage: function onChangePage(e, t) {
          d(t);
        },
        onChangeRowsPerPage: function onChangeRowsPerPage(e) {
          C(+e.target.value), d(0);
        }
      }), T.length > 0 && n.a.createElement(f.a, {
        variant: "outlined",
        className: s.button,
        onClick: function onClick() {
          S.a.post("/delete-alerts", {
            alertIds: T
          }, {
            withCredentials: !0,
            auth: {
              username: a.username,
              password: a.password
            }
          }).then(function (e) {
            o(!1), w(0);
          })["catch"](function (e) {
            o(!1), console.error(e), i(!0, e.message);
          });
        }
      }, "Delete"))), n.a.createElement(D, null)));
    });

    function Nt() {
      return n.a.createElement("div", null, n.a.createElement("h1", null, "404 Not Found!"));
    }

    var Ct = a(586);
    var Rt = Object(u.b)(function (e) {
      return {
        darkMode: e.darkMode,
        login: e.login
      };
    }, function (e) {
      return {
        onLogin: function onLogin(t, a, r, n) {
          e(R(t, a, r, n));
        },
        toggleSnackbar: function toggleSnackbar(t, a) {
          e(Ae(t, a));
        }
      };
    })(function (e) {
      var t = e.darkMode,
          a = e.login,
          o = e.onLogin,
          c = n.a.useMemo(function () {
        return Object(i.a)({
          palette: {
            type: t.darkMode ? "dark" : "light"
          }
        });
      }),
          u = Object(p.b)(["login"]),
          m = Object(l.a)(u, 2),
          d = m[0];
      return m[1], Object(r.useEffect)(function () {
        d.login && S.a.get("/login", {
          withCredentials: !0,
          auth: {
            username: d.login.username,
            password: d.login.password
          }
        }).then(function (e) {
          o(d.login.username, d.login.password, e.accountID, e.firstName), C.push("/dashboard");
        })["catch"](function (e) {
          console.error(e), Ae(!0, "Error while logging in.");
        });
      }, []), a.loggedIn || C.push("/login"), n.a.createElement(Ct.b, {
        history: C
      }, n.a.createElement("div", null, n.a.createElement(s.a, {
        theme: c
      }, n.a.createElement(Ct.c, null, n.a.createElement(Ct.a, {
        path: "/login"
      }, n.a.createElement(B, null)), n.a.createElement(Ct.a, {
        path: "/register"
      }, n.a.createElement(G, null)), n.a.createElement(Ct.a, {
        path: "/dashboard"
      }, n.a.createElement(Ve, null)), n.a.createElement(Ct.a, {
        exact: !0,
        path: "/reports"
      }, n.a.createElement(tt, null)), n.a.createElement(Ct.a, {
        path: "/monitors"
      }, n.a.createElement(Pt, null)), n.a.createElement(Ct.a, {
        path: "/alerts"
      }, n.a.createElement(Dt, null)), n.a.createElement(Ct.a, {
        exsact: !0,
        path: "/report/:reportID",
        component: ut
      }), n.a.createElement(Ct.a, null, n.a.createElement(Nt, null))))));
    }),
        It = a(56),
        Tt = a(264),
        Bt = a.n(Tt);

    function At(e, t) {
      var a = Object.keys(e);

      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })), a.push.apply(a, r);
      }

      return a;
    }

    function Mt(e) {
      for (var t = 1; t < arguments.length; t++) {
        var a = null != arguments[t] ? arguments[t] : {};
        t % 2 ? At(a, !0).forEach(function (t) {
          Object(m.a)(e, t, a[t]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : At(a).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t));
        });
      }

      return e;
    }

    var Gt = {
      darkMode: !0
    },
        _t = function _t() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Gt,
          t = arguments.length > 1 ? arguments[1] : void 0;

      switch (t.type) {
        case "TOGGLE_DARK_MODE":
          return Mt({}, e, {
            darkMode: !e.darkMode
          });

        default:
          return e;
      }
    };

    function Lt(e, t) {
      var a = Object.keys(e);

      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })), a.push.apply(a, r);
      }

      return a;
    }

    function Ut(e) {
      for (var t = 1; t < arguments.length; t++) {
        var a = null != arguments[t] ? arguments[t] : {};
        t % 2 ? Lt(a, !0).forEach(function (t) {
          Object(m.a)(e, t, a[t]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : Lt(a).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t));
        });
      }

      return e;
    }

    var Wt = {
      open: !1
    },
        Ft = function Ft() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Wt,
          t = arguments.length > 1 ? arguments[1] : void 0;

      switch (t.type) {
        case "TOGGLE_DRAWER":
          return Ut({}, e, {
            open: t.payload
          });

        default:
          return e;
      }
    };

    function Ht(e, t) {
      var a = Object.keys(e);

      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })), a.push.apply(a, r);
      }

      return a;
    }

    function Kt(e) {
      for (var t = 1; t < arguments.length; t++) {
        var a = null != arguments[t] ? arguments[t] : {};
        t % 2 ? Ht(a, !0).forEach(function (t) {
          Object(m.a)(e, t, a[t]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : Ht(a).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t));
        });
      }

      return e;
    }

    var Vt = {
      dialogOpen: !1,
      progressbarVisible: !1
    },
        qt = function qt() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Vt,
          t = arguments.length > 1 ? arguments[1] : void 0;

      switch (t.type) {
        case "TOGGLE_MONITOR_DIALOG":
          return Kt({}, e, {
            dialogOpen: t.payload
          });

        case "TOGGLE_MONITOR_PROGRESSBAR":
          return Kt({}, e, {
            progressbarVisible: t.payload
          });

        default:
          return e;
      }
    };

    function zt(e, t) {
      var a = Object.keys(e);

      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })), a.push.apply(a, r);
      }

      return a;
    }

    function Yt(e) {
      for (var t = 1; t < arguments.length; t++) {
        var a = null != arguments[t] ? arguments[t] : {};
        t % 2 ? zt(a, !0).forEach(function (t) {
          Object(m.a)(e, t, a[t]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : zt(a).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t));
        });
      }

      return e;
    }

    var Jt = {
      progressbarVisible: !1,
      snackbarVisible: !1,
      snackbarText: ""
    },
        Xt = function Xt() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Jt,
          t = arguments.length > 1 ? arguments[1] : void 0;

      switch (t.type) {
        case "TOGGLE_FRAME_PROGRESSBAR":
          return Yt({}, e, {
            progressbarVisible: t.payload
          });

        case "TOGGLE_FRAME_SNACKBAR":
          return Yt({}, e, {}, t.payload);

        default:
          return e;
      }
    };

    function $t(e, t) {
      var a = Object.keys(e);

      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })), a.push.apply(a, r);
      }

      return a;
    }

    function Qt(e) {
      for (var t = 1; t < arguments.length; t++) {
        var a = null != arguments[t] ? arguments[t] : {};
        t % 2 ? $t(a, !0).forEach(function (t) {
          Object(m.a)(e, t, a[t]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : $t(a).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t));
        });
      }

      return e;
    }

    var Zt = {
      loggedIn: !1,
      username: "",
      password: "",
      accountID: "",
      firstName: ""
    },
        ea = function ea() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Zt,
          t = arguments.length > 1 ? arguments[1] : void 0;

      switch (t.type) {
        case "LOGIN":
          return Qt({}, e, {}, t.payload, {
            loggedIn: !0
          });

        case "LOGOUT":
          return Qt({}, Zt);

        default:
          return e;
      }
    };

    function ta(e, t) {
      var a = Object.keys(e);

      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })), a.push.apply(a, r);
      }

      return a;
    }

    function aa(e) {
      for (var t = 1; t < arguments.length; t++) {
        var a = null != arguments[t] ? arguments[t] : {};
        t % 2 ? ta(a, !0).forEach(function (t) {
          Object(m.a)(e, t, a[t]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : ta(a).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t));
        });
      }

      return e;
    }

    var ra = {
      monitors: []
    },
        na = function na() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ra,
          t = arguments.length > 1 ? arguments[1] : void 0;

      switch (t.type) {
        case "UPDATE_MONITORS":
          return aa({}, e, {
            monitors: t.payload
          });

        default:
          return e;
      }
    };

    function oa(e, t) {
      var a = Object.keys(e);

      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })), a.push.apply(a, r);
      }

      return a;
    }

    function ca(e) {
      for (var t = 1; t < arguments.length; t++) {
        var a = null != arguments[t] ? arguments[t] : {};
        t % 2 ? oa(a, !0).forEach(function (t) {
          Object(m.a)(e, t, a[t]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : oa(a).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t));
        });
      }

      return e;
    }

    var la = {
      reports: []
    },
        ia = function ia() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : la,
          t = arguments.length > 1 ? arguments[1] : void 0;

      switch (t.type) {
        case "UPDATE_REPORTS_SUMMERY":
          return ca({}, e, {
            reports: t.payload
          });

        default:
          return e;
      }
    };

    function sa(e, t) {
      var a = Object.keys(e);

      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })), a.push.apply(a, r);
      }

      return a;
    }

    function ua(e) {
      for (var t = 1; t < arguments.length; t++) {
        var a = null != arguments[t] ? arguments[t] : {};
        t % 2 ? sa(a, !0).forEach(function (t) {
          Object(m.a)(e, t, a[t]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : sa(a).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t));
        });
      }

      return e;
    }

    var pa = {
      reports: {}
    },
        ma = function ma() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : pa,
          t = arguments.length > 1 ? arguments[1] : void 0;

      switch (t.type) {
        case "UPDATE_REPORTS":
          return ua({}, e, {
            reports: t.payload
          });

        default:
          return e;
      }
    };

    function da(e, t) {
      var a = Object.keys(e);

      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })), a.push.apply(a, r);
      }

      return a;
    }

    function fa(e) {
      for (var t = 1; t < arguments.length; t++) {
        var a = null != arguments[t] ? arguments[t] : {};
        t % 2 ? da(a, !0).forEach(function (t) {
          Object(m.a)(e, t, a[t]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : da(a).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t));
        });
      }

      return e;
    }

    var ga = {
      CPU: [],
      Disk: {},
      Memory: {},
      data: []
    },
        ba = function ba() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ga,
          t = arguments.length > 1 ? arguments[1] : void 0;

      switch (t.type) {
        case "UPDATE_DASHBOARD":
          return fa({}, e, {}, t.payload);

        default:
          return e;
      }
    };

    function Oa(e, t) {
      var a = Object.keys(e);

      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })), a.push.apply(a, r);
      }

      return a;
    }

    function Ea(e) {
      for (var t = 1; t < arguments.length; t++) {
        var a = null != arguments[t] ? arguments[t] : {};
        t % 2 ? Oa(a, !0).forEach(function (t) {
          Object(m.a)(e, t, a[t]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : Oa(a).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t));
        });
      }

      return e;
    }

    var ha = {
      alerts: []
    },
        ya = function ya() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ha,
          t = arguments.length > 1 ? arguments[1] : void 0;

      switch (t.type) {
        case "UPDATE_ALERTS":
          return Ea({}, e, {
            alerts: t.payload
          });

        default:
          return e;
      }
    },
        va = Object(It.c)({
      darkMode: _t,
      drawer: Ft,
      monitorDialog: qt,
      frame: Xt,
      login: ea,
      monitors: na,
      reportsSummery: ia,
      reports: ma,
      dashboard: ba,
      alerts: ya
    }),
        ja = a(265),
        wa = Object(It.d)(va, Object(It.a)(Bt.a, ja.a));

    Boolean("localhost" === window.location.hostname || "[::1]" === window.location.hostname || window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));
    c.a.render(n.a.createElement(p.a, null, n.a.createElement(u.a, {
      store: wa
    }, n.a.createElement(Rt, null))), document.getElementById("root")), "serviceWorker" in navigator && navigator.serviceWorker.ready.then(function (e) {
      e.unregister();
    });
  }
}, [[313, 1, 2]]]);