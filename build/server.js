/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.tsx":
/*!*********************!*\
  !*** ./src/app.tsx ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "App": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_components_header_header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core/components/header/header */ "./src/core/components/header/header.tsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _core_components_lazy_lazy_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core/components/lazy/lazy.component */ "./src/core/components/lazy/lazy.component.tsx");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router */ "react-router");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_router__WEBPACK_IMPORTED_MODULE_4__);
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};





var isFirst = true;
function App(props) {
    var location = (0,react_router__WEBPACK_IMPORTED_MODULE_4__.useLocation)();
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
        isFirst = false;
    }, [location.pathname]);
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(core_components_header_header__WEBPACK_IMPORTED_MODULE_1__.Header, null),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.Routes, null, props.routes.map(function (r, idx) {
            return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.Route, { path: r.path, element: react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_core_components_lazy_lazy_component__WEBPACK_IMPORTED_MODULE_3__["default"], __assign({ moduleProvider: r.component, Component: isFirst ? props.comp : undefined }, props)), key: idx });
        }))));
}


/***/ }),

/***/ "./src/core/components/header/header.tsx":
/*!***********************************************!*\
  !*** ./src/core/components/header/header.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Header": () => (/* binding */ Header)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);


function Header() {
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("nav", { className: "navbar navbar-expand-lg navbar-light bg-light" },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "container-fluid" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Link, { className: "navbar-brand", to: "/" }, "Navbar"),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { className: "navbar-toggler", type: "button", "data-bs-toggle": "collapse", "data-bs-target": "#navbarSupportedContent", "aria-controls": "navbarSupportedContent", "aria-expanded": "false", "aria-label": "Toggle navigation" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { className: "navbar-toggler-icon" })),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "collapse navbar-collapse", id: "navbarSupportedContent" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", { className: "navbar-nav me-auto mb-2 mb-lg-0" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", { className: "nav-item" },
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Link, { className: "nav-link active", to: "/" }, "Home")),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", { className: "nav-item" },
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Link, { className: "nav-link", to: "/contact-us" }, "Contact Us")),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", { className: "nav-item dropdown" },
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", { className: "nav-link dropdown-toggle", href: "#", id: "navbarDropdown", role: "button", "data-bs-toggle": "dropdown", "aria-expanded": "false" }, "Dropdown"),
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", { className: "dropdown-menu", "aria-labelledby": "navbarDropdown" },
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", null,
                                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", { className: "dropdown-item", href: "#" }, "Action")),
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", null,
                                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", { className: "dropdown-item", href: "#" }, "Another action")),
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", null,
                                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("hr", { className: "dropdown-divider" })),
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", null,
                                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", { className: "dropdown-item", href: "#" }, "Something else here")))),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", { className: "nav-item" },
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", { className: "nav-link disabled", href: "#", tabIndex: -1, "aria-disabled": "true" }, "Disabled"))),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form", { className: "d-flex" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", { className: "form-control me-2", type: "search", placeholder: "Search", "aria-label": "Search" }),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { className: "btn btn-outline-success", type: "submit" }, "Search"))))));
}
;


/***/ }),

/***/ "./src/core/components/lazy/lazy.component.tsx":
/*!*****************************************************!*\
  !*** ./src/core/components/lazy/lazy.component.tsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Lazy)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router */ "react-router");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var src_core_functions_create_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/core/functions/create-context */ "./src/core/functions/create-context.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};




function Lazy(props) {
    var Component = props.Component;
    var _a = __read((0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null), 2), Comp = _a[0], setComp = _a[1];
    var _b = __read((0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({}), 2), pageData = _b[0], setPageData = _b[1];
    var location = (0,react_router__WEBPACK_IMPORTED_MODULE_1__.useLocation)();
    var searchParams = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_2__.useSearchParams)();
    var params = (0,react_router__WEBPACK_IMPORTED_MODULE_1__.useParams)();
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
        window.pageProps = null;
        if (!Component) {
            props.moduleProvider().then(function (moduleObj) {
                if (moduleObj.default.getInitialProps) {
                    var ctx = (0,src_core_functions_create_context__WEBPACK_IMPORTED_MODULE_3__.createContextClient)(location, searchParams[0], params);
                    moduleObj.default.getInitialProps(ctx).then(function (data) {
                        setPageData(data);
                        setComp(moduleObj);
                    });
                }
                else {
                    setComp(moduleObj);
                }
            });
        }
    }, [location.pathname]);
    var pageProps = props.pageProps || window.pageProps || pageData;
    if (Comp) {
        return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Comp.default, __assign({}, pageProps));
    }
    return Component ? react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Component, __assign({}, pageProps)) : react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", null, "Loading...");
}


/***/ }),

/***/ "./src/core/functions/create-context.ts":
/*!**********************************************!*\
  !*** ./src/core/functions/create-context.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createContextClient": () => (/* binding */ createContextClient),
/* harmony export */   "createContextServer": () => (/* binding */ createContextServer)
/* harmony export */ });
var __values = (undefined && undefined.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
function createContextServer(req, resp) {
    if (!JSON.parse("true")) {
        throw new Error("createContextServer function can execute only on server!!");
    }
    var context = {
        location: {
            pathname: req.path,
            hostname: req.hostname
        },
        query: req.query,
        params: req.params,
        req: req,
        res: resp
    };
    return context;
}
function createContextClient(location, searchParams, params) {
    var e_1, _a;
    if (JSON.parse("true")) {
        throw new Error("createContextClient function can execute only on client!!");
    }
    var query = {};
    try {
        for (var _b = __values(searchParams.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
            var entry = _c.value;
            query[entry[0]] = entry[1];
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    var context = {
        location: {
            pathname: location.pathname,
            hostname: window.location.hostname
        },
        query: query,
        params: params
    };
    return context;
}


/***/ }),

/***/ "./src/routes.tsx":
/*!************************!*\
  !*** ./src/routes.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Routes": () => (/* binding */ Routes)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var Routes = [
    {
        path: "/",
        component: function () { return __webpack_require__.e(/*! import() | home */ "home").then(__webpack_require__.bind(__webpack_require__, /*! pages/home/home.component */ "./src/pages/home/home.component.tsx")); }
    },
    {
        path: "/:id/product",
        component: function () { return __webpack_require__.e(/*! import() | home-new */ "home").then(__webpack_require__.bind(__webpack_require__, /*! pages/home/home.component */ "./src/pages/home/home.component.tsx")); }
    },
    {
        path: "contact-us",
        component: function () { return __webpack_require__.e(/*! import() | contact-us */ "contact-us").then(__webpack_require__.bind(__webpack_require__, /*! pages/contact-us/contact-us.component */ "./src/pages/contact-us/contact-us.component.tsx")); }
    },
    {
        path: "/404",
        component: function () { return Promise.resolve({ default: function () { return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", null, "Not Found"); } }); }
    }
];


/***/ }),

/***/ "./src/template.tsx":
/*!**************************!*\
  !*** ./src/template.tsx ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HtmlTemplate": () => (/* binding */ HtmlTemplate),
/* harmony export */   "getHtml": () => (/* binding */ getHtml)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/server */ "react-dom/server");
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom_server__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom/server */ "react-router-dom/server");
/* harmony import */ var react_router_dom_server__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom_server__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app */ "./src/app.tsx");
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./routes */ "./src/routes.tsx");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





var HtmlTemplate = /** @class */ (function (_super) {
    __extends(HtmlTemplate, _super);
    function HtmlTemplate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HtmlTemplate.prototype.render = function () {
        var script = "\n        window.pageProps = ".concat(JSON.stringify(this.props.pageProps || {}), ";\n        ");
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("html", null,
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("head", null,
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("link", { href: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css", rel: "stylesheet", integrity: "sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC", crossOrigin: "anonymous" }),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("title", null, this.props.pageProps.seo.title)),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("body", null,
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { id: "root" }, this.props.children),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("script", { dangerouslySetInnerHTML: { __html: script } }),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("script", { src: "/client.js" }),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("script", { src: "/reload/reload.js" }))));
    };
    return HtmlTemplate;
}(react__WEBPACK_IMPORTED_MODULE_0__.Component));

function getHtml(Component, props, url) {
    var html = (0,react_dom_server__WEBPACK_IMPORTED_MODULE_1__.renderToString)(react__WEBPACK_IMPORTED_MODULE_0___default().createElement(HtmlTemplate, { pageProps: props },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom_server__WEBPACK_IMPORTED_MODULE_2__.StaticRouter, { location: url },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_app__WEBPACK_IMPORTED_MODULE_3__.App, { comp: Component, routes: _routes__WEBPACK_IMPORTED_MODULE_4__.Routes, pageProps: props }))));
    return html;
}


/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("react-dom/server");

/***/ }),

/***/ "react-router":
/*!*******************************!*\
  !*** external "react-router" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("react-router");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("react-router-dom");

/***/ }),

/***/ "react-router-dom/server":
/*!******************************************!*\
  !*** external "react-router-dom/server" ***!
  \******************************************/
/***/ ((module) => {

module.exports = require("react-router-dom/server");

/***/ }),

/***/ "reload":
/*!*************************!*\
  !*** external "reload" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("reload");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".chunk.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/require chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "loaded", otherwise not loaded yet
/******/ 		var installedChunks = {
/******/ 			"server": 1
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		var installChunk = (chunk) => {
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids, runtime = chunk.runtime;
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 1;
/******/ 		
/******/ 		};
/******/ 		
/******/ 		// require() chunk loading for javascript
/******/ 		__webpack_require__.f.require = (chunkId, promises) => {
/******/ 			// "1" is the signal for "already loaded"
/******/ 			if(!installedChunks[chunkId]) {
/******/ 				if(true) { // all chunks have JS
/******/ 					installChunk(require("./" + __webpack_require__.u(chunkId)));
/******/ 				} else installedChunks[chunkId] = 1;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		// no external install chunk
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***********************!*\
  !*** ./src/server.ts ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router */ "react-router");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var src_routes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/routes */ "./src/routes.tsx");
/* harmony import */ var src_template__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/template */ "./src/template.tsx");
/* harmony import */ var _core_functions_create_context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./core/functions/create-context */ "./src/core/functions/create-context.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};






// eslint-disable-next-line @typescript-eslint/no-var-requires
var reload = __webpack_require__(/*! reload */ "reload");
var app = express__WEBPACK_IMPORTED_MODULE_0___default()();
var PORT = process.env.PORT || 5000;
var startServer = function () {
    app.listen(PORT, function () {
        console.log("App listening on port: ".concat(PORT));
    });
};
var reloadServer = function () {
    reload(app).then(function () { return startServer(); }).catch(function (err) {
        console.log("Error on reload of app!!", err.stack);
    }).catch(function (err) {
        console.log("reload app error!!!", err);
    });
};
var isLocal = "true";
console.log("isLocal!!", isLocal);
if (isLocal) {
    reloadServer();
}
else {
    startServer();
}
app.use(express__WEBPACK_IMPORTED_MODULE_0___default()["static"]((0,path__WEBPACK_IMPORTED_MODULE_1__.join)(process.cwd(), "build/public")));
app.get("*", function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var route;
    return __generator(this, function (_a) {
        route = src_routes__WEBPACK_IMPORTED_MODULE_3__.Routes.find(function (r) { return (0,react_router__WEBPACK_IMPORTED_MODULE_2__.matchPath)(r.path, req.path); });
        if (!route) {
            resp.redirect("/404");
            return [2 /*return*/];
        }
        route.component().then(function (dComp) { return __awaiter(void 0, void 0, void 0, function () {
            var Component, props, ctx, html;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Component = dComp.default;
                        props = { seo: { title: "" } };
                        if (!Component.getInitialProps) return [3 /*break*/, 2];
                        ctx = (0,_core_functions_create_context__WEBPACK_IMPORTED_MODULE_5__.createContextServer)(req, resp);
                        return [4 /*yield*/, Component.getInitialProps(ctx)];
                    case 1:
                        props = _a.sent();
                        if (resp.headersSent) {
                            return [2 /*return*/];
                        }
                        _a.label = 2;
                    case 2:
                        html = (0,src_template__WEBPACK_IMPORTED_MODULE_4__.getHtml)(Component, props, req.url);
                        resp.send(html);
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBM0IsQ0FBMkIsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDUixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3RCLHNCQUFPO1NBQ1Y7UUFDRCxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQU0sS0FBSzs7Ozs7d0JBQ3hCLFNBQVMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO3dCQUM1QixLQUFLLEdBQWEsRUFBRSxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUMsQ0FBQzs2QkFDeEMsU0FBUyxDQUFDLGVBQWUsRUFBekIsd0JBQXlCO3dCQUNuQixHQUFHLEdBQUcsbUZBQW1CLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO3dCQUNuQyxxQkFBTSxTQUFTLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQzs7d0JBQTVDLEtBQUssR0FBRyxTQUFvQyxDQUFDO3dCQUM3QyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7NEJBQ2xCLHNCQUFPO3lCQUNWOzs7d0JBRUMsSUFBSSxHQUFHLHFEQUFPLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ2hELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7YUFDbkIsQ0FBQyxDQUFDOzs7S0FDTixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3NyLWRlbW8vLi9zcmMvYXBwLnRzeCIsIndlYnBhY2s6Ly9zc3ItZGVtby8uL3NyYy9jb3JlL2NvbXBvbmVudHMvaGVhZGVyL2hlYWRlci50c3giLCJ3ZWJwYWNrOi8vc3NyLWRlbW8vLi9zcmMvY29yZS9jb21wb25lbnRzL2xhenkvbGF6eS5jb21wb25lbnQudHN4Iiwid2VicGFjazovL3Nzci1kZW1vLy4vc3JjL2NvcmUvZnVuY3Rpb25zL2NyZWF0ZS1jb250ZXh0LnRzIiwid2VicGFjazovL3Nzci1kZW1vLy4vc3JjL3JvdXRlcy50c3giLCJ3ZWJwYWNrOi8vc3NyLWRlbW8vLi9zcmMvdGVtcGxhdGUudHN4Iiwid2VicGFjazovL3Nzci1kZW1vL2V4dGVybmFsIGNvbW1vbmpzIFwiZXhwcmVzc1wiIiwid2VicGFjazovL3Nzci1kZW1vL2V4dGVybmFsIGNvbW1vbmpzIFwicmVhY3RcIiIsIndlYnBhY2s6Ly9zc3ItZGVtby9leHRlcm5hbCBjb21tb25qcyBcInJlYWN0LWRvbS9zZXJ2ZXJcIiIsIndlYnBhY2s6Ly9zc3ItZGVtby9leHRlcm5hbCBjb21tb25qcyBcInJlYWN0LXJvdXRlclwiIiwid2VicGFjazovL3Nzci1kZW1vL2V4dGVybmFsIGNvbW1vbmpzIFwicmVhY3Qtcm91dGVyLWRvbVwiIiwid2VicGFjazovL3Nzci1kZW1vL2V4dGVybmFsIGNvbW1vbmpzIFwicmVhY3Qtcm91dGVyLWRvbS9zZXJ2ZXJcIiIsIndlYnBhY2s6Ly9zc3ItZGVtby9leHRlcm5hbCBjb21tb25qcyBcInJlbG9hZFwiIiwid2VicGFjazovL3Nzci1kZW1vL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vc3NyLWRlbW8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc3NyLWRlbW8vd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vc3NyLWRlbW8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Nzci1kZW1vL3dlYnBhY2svcnVudGltZS9lbnN1cmUgY2h1bmsiLCJ3ZWJwYWNrOi8vc3NyLWRlbW8vd2VicGFjay9ydW50aW1lL2dldCBqYXZhc2NyaXB0IGNodW5rIGZpbGVuYW1lIiwid2VicGFjazovL3Nzci1kZW1vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vc3NyLWRlbW8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zc3ItZGVtby93ZWJwYWNrL3J1bnRpbWUvcmVxdWlyZSBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL3Nzci1kZW1vLy4vc3JjL3NlcnZlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBIZWFkZXIgfSBmcm9tIFwiY29yZS9jb21wb25lbnRzL2hlYWRlci9oZWFkZXJcIjtcbmltcG9ydCB7IElSb3V0ZSB9IGZyb20gXCJjb3JlL21vZGVscy9yb3V0ZS5tb2RlbFwiO1xuaW1wb3J0IHsgUm91dGUsIFJvdXRlcyB9IGZyb20gXCJyZWFjdC1yb3V0ZXItZG9tXCI7XG5pbXBvcnQgTGF6eSBmcm9tIFwiLi9jb3JlL2NvbXBvbmVudHMvbGF6eS9sYXp5LmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgdXNlTG9jYXRpb24gfSBmcm9tIFwicmVhY3Qtcm91dGVyXCI7XG5cbmxldCBpc0ZpcnN0ID0gdHJ1ZTtcbmV4cG9ydCBmdW5jdGlvbiBBcHAocHJvcHM6IEFwcFByb3BzKSB7XG4gICAgY29uc3QgbG9jYXRpb24gPSB1c2VMb2NhdGlvbigpO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlzRmlyc3QgPSBmYWxzZTtcbiAgICB9LCBbbG9jYXRpb24ucGF0aG5hbWVdKTtcbiAgICByZXR1cm4gKFxuICAgICAgICA8PlxuICAgICAgICAgICAgPEhlYWRlciAvPlxuICAgICAgICAgICAgPFJvdXRlcz5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHByb3BzLnJvdXRlcy5tYXAoKHIsIGlkeCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxSb3V0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aD17ci5wYXRofVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudD17XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPExhenlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlUHJvdmlkZXI9e3IuY29tcG9uZW50fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb21wb25lbnQ9e2lzRmlyc3QgPyBwcm9wcy5jb21wIDogdW5kZWZpbmVkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Li4ucHJvcHN9IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2lkeH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz47XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9Sb3V0ZXM+XG4gICAgICAgIDwvPlxuICAgICk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXBwUHJvcHMge1xuICAgIHJvdXRlczogSVJvdXRlW107XG4gICAgY29tcD86IFJlYWN0LkNvbXBvbmVudENsYXNzO1xuICAgIHBhZ2VQcm9wczogYW55O1xufSIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IExpbmsgfSBmcm9tIFwicmVhY3Qtcm91dGVyLWRvbVwiO1xuXG5leHBvcnQgZnVuY3Rpb24gSGVhZGVyKCkge1xuICAgIHJldHVybihcbiAgICAgICAgPG5hdiBjbGFzc05hbWU9XCJuYXZiYXIgbmF2YmFyLWV4cGFuZC1sZyBuYXZiYXItbGlnaHQgYmctbGlnaHRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgICAgICAgICAgPExpbmsgY2xhc3NOYW1lPVwibmF2YmFyLWJyYW5kXCIgdG89XCIvXCI+TmF2YmFyPC9MaW5rPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJuYXZiYXItdG9nZ2xlclwiIHR5cGU9XCJidXR0b25cIiBkYXRhLWJzLXRvZ2dsZT1cImNvbGxhcHNlXCIgZGF0YS1icy10YXJnZXQ9XCIjbmF2YmFyU3VwcG9ydGVkQ29udGVudFwiIGFyaWEtY29udHJvbHM9XCJuYXZiYXJTdXBwb3J0ZWRDb250ZW50XCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCIgYXJpYS1sYWJlbD1cIlRvZ2dsZSBuYXZpZ2F0aW9uXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm5hdmJhci10b2dnbGVyLWljb25cIj48L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sbGFwc2UgbmF2YmFyLWNvbGxhcHNlXCIgaWQ9XCJuYXZiYXJTdXBwb3J0ZWRDb250ZW50XCI+XG4gICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJuYXZiYXItbmF2IG1lLWF1dG8gbWItMiBtYi1sZy0wXCI+XG4gICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICA8TGluayBjbGFzc05hbWU9XCJuYXYtbGluayBhY3RpdmVcIiB0bz1cIi9cIj5Ib21lPC9MaW5rPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICA8TGluayBjbGFzc05hbWU9XCJuYXYtbGlua1wiIHRvPVwiL2NvbnRhY3QtdXNcIj5Db250YWN0IFVzPC9MaW5rPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtIGRyb3Bkb3duXCI+XG4gICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJuYXYtbGluayBkcm9wZG93bi10b2dnbGVcIiBocmVmPVwiI1wiIGlkPVwibmF2YmFyRHJvcGRvd25cIiByb2xlPVwiYnV0dG9uXCIgZGF0YS1icy10b2dnbGU9XCJkcm9wZG93blwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiPlxuICAgICAgICAgICAgICAgICAgICBEcm9wZG93blxuICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImRyb3Bkb3duLW1lbnVcIiBhcmlhLWxhYmVsbGVkYnk9XCJuYXZiYXJEcm9wZG93blwiPlxuICAgICAgICAgICAgICAgICAgICA8bGk+PGEgY2xhc3NOYW1lPVwiZHJvcGRvd24taXRlbVwiIGhyZWY9XCIjXCI+QWN0aW9uPC9hPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDxsaT48YSBjbGFzc05hbWU9XCJkcm9wZG93bi1pdGVtXCIgaHJlZj1cIiNcIj5Bbm90aGVyIGFjdGlvbjwvYT48L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGk+PGhyIGNsYXNzTmFtZT1cImRyb3Bkb3duLWRpdmlkZXJcIiAvPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDxsaT48YSBjbGFzc05hbWU9XCJkcm9wZG93bi1pdGVtXCIgaHJlZj1cIiNcIj5Tb21ldGhpbmcgZWxzZSBoZXJlPC9hPjwvbGk+XG4gICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJuYXYtbGluayBkaXNhYmxlZFwiIGhyZWY9XCIjXCIgdGFiSW5kZXg9ey0xfSBhcmlhLWRpc2FibGVkPVwidHJ1ZVwiPkRpc2FibGVkPC9hPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgIDxmb3JtIGNsYXNzTmFtZT1cImQtZmxleFwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2wgbWUtMlwiIHR5cGU9XCJzZWFyY2hcIiBwbGFjZWhvbGRlcj1cIlNlYXJjaFwiIGFyaWEtbGFiZWw9XCJTZWFyY2hcIiAvPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1vdXRsaW5lLXN1Y2Nlc3NcIiB0eXBlPVwic3VibWl0XCI+U2VhcmNoPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L25hdj5cbiAgICApXG59XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZW1wdHktaW50ZXJmYWNlXG5leHBvcnQgaW50ZXJmYWNlIEhlYWRlclByb3BzIHt9OyIsImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB1c2VQYXJhbXMgLCB1c2VMb2NhdGlvbiB9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIjtcbmltcG9ydCB7IHVzZVNlYXJjaFBhcmFtcyB9IGZyb20gXCJyZWFjdC1yb3V0ZXItZG9tXCI7XG5pbXBvcnQgeyBjcmVhdGVDb250ZXh0Q2xpZW50IH0gZnJvbSBcInNyYy9jb3JlL2Z1bmN0aW9ucy9jcmVhdGUtY29udGV4dFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBMYXp5KHByb3BzOiBMYXp5UHJvcHMpIHtcbiAgICBjb25zdCBDb21wb25lbnQgPSBwcm9wcy5Db21wb25lbnQ7XG4gICAgY29uc3QgW0NvbXAsIHNldENvbXBdID0gdXNlU3RhdGU8e2RlZmF1bHQ6IGFueX18bnVsbD4obnVsbCk7XG4gICAgY29uc3QgW3BhZ2VEYXRhLCBzZXRQYWdlRGF0YV0gPSB1c2VTdGF0ZTxSZWNvcmQ8c3RyaW5nLCBhbnk+Pih7fSk7XG4gICAgY29uc3QgbG9jYXRpb24gPSB1c2VMb2NhdGlvbigpO1xuICAgIGNvbnN0IHNlYXJjaFBhcmFtcyA9IHVzZVNlYXJjaFBhcmFtcygpO1xuICAgIGNvbnN0IHBhcmFtcyA9IHVzZVBhcmFtcygpO1xuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgd2luZG93LnBhZ2VQcm9wcyA9IG51bGw7XG4gICAgICAgIGlmICghQ29tcG9uZW50KSB7XG4gICAgICAgICAgICBwcm9wcy5tb2R1bGVQcm92aWRlcigpLnRoZW4obW9kdWxlT2JqID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobW9kdWxlT2JqLmRlZmF1bHQuZ2V0SW5pdGlhbFByb3BzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGN0eCA9IGNyZWF0ZUNvbnRleHRDbGllbnQobG9jYXRpb24sIHNlYXJjaFBhcmFtc1swXSwgcGFyYW1zIGFzIFJlY29yZDxzdHJpbmcsIHN0cmluZz4pO1xuICAgICAgICAgICAgICAgICAgICAobW9kdWxlT2JqLmRlZmF1bHQgYXMgU3NyQ29tcG9uZW50KS5nZXRJbml0aWFsUHJvcHMoY3R4KS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRQYWdlRGF0YShkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldENvbXAobW9kdWxlT2JqKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0Q29tcChtb2R1bGVPYmopO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9LCBbbG9jYXRpb24ucGF0aG5hbWVdKTtcbiAgICBjb25zdCBwYWdlUHJvcHMgPSBwcm9wcy5wYWdlUHJvcHMgfHwgd2luZG93LnBhZ2VQcm9wcyB8fCBwYWdlRGF0YTtcbiAgICBpZiAoQ29tcCkge1xuICAgICAgICByZXR1cm4gPENvbXAuZGVmYXVsdCB7Li4ucGFnZVByb3BzfSAvPjtcbiAgICB9XG4gICAgcmV0dXJuIENvbXBvbmVudCA/IDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz4gOiA8aDE+TG9hZGluZy4uLjwvaDE+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIExhenlQcm9wcyB7XG4gICAgQ29tcG9uZW50PzogYW55O1xuICAgIG1vZHVsZVByb3ZpZGVyOiAoKSA9PiBQcm9taXNlPHtkZWZhdWx0OiBhbnl9PjtcbiAgICBwYWdlUHJvcHM/OiBhbnk7XG59IiwiaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tIFwiZXhwcmVzc1wiO1xuaW1wb3J0IHsgQ29udGV4dERhdGEgfSBmcm9tIFwiY29yZS9tb2RlbHMvY29udGV4dC5tb2RlbFwiO1xuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tIFwicmVhY3Qtcm91dGVyXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDb250ZXh0U2VydmVyKHJlcTogUmVxdWVzdCwgcmVzcDogUmVzcG9uc2UpIHtcbiAgICBpZiAoIUpTT04ucGFyc2UocHJvY2Vzcy5lbnYuSVNfU0VSVkVSKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjcmVhdGVDb250ZXh0U2VydmVyIGZ1bmN0aW9uIGNhbiBleGVjdXRlIG9ubHkgb24gc2VydmVyISFcIilcbiAgICB9XG4gICAgY29uc3QgY29udGV4dDogQ29udGV4dERhdGEgPSB7XG4gICAgICAgIGxvY2F0aW9uOiB7XG4gICAgICAgICAgICBwYXRobmFtZTogcmVxLnBhdGgsXG4gICAgICAgICAgICBob3N0bmFtZTogcmVxLmhvc3RuYW1lXG4gICAgICAgIH0sXG4gICAgICAgIHF1ZXJ5OiByZXEucXVlcnksXG4gICAgICAgIHBhcmFtczogcmVxLnBhcmFtcyxcbiAgICAgICAgcmVxLFxuICAgICAgICByZXM6IHJlc3BcbiAgICB9O1xuICAgIHJldHVybiBjb250ZXh0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ29udGV4dENsaWVudChsb2NhdGlvbjogTG9jYXRpb24sIHNlYXJjaFBhcmFtczogVVJMU2VhcmNoUGFyYW1zLCBwYXJhbXM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4pIHtcbiAgICBpZiAoSlNPTi5wYXJzZShwcm9jZXNzLmVudi5JU19TRVJWRVIpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImNyZWF0ZUNvbnRleHRDbGllbnQgZnVuY3Rpb24gY2FuIGV4ZWN1dGUgb25seSBvbiBjbGllbnQhIVwiKVxuICAgIH1cbiAgICBjb25zdCBxdWVyeTogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHt9O1xuICAgIGZvcihjb25zdCBlbnRyeSBvZiBzZWFyY2hQYXJhbXMuZW50cmllcygpKSB7XG4gICAgICAgIHF1ZXJ5W2VudHJ5WzBdXSA9IGVudHJ5WzFdO1xuICAgIH1cbiAgICBjb25zdCBjb250ZXh0OiBDb250ZXh0RGF0YSA9IHtcbiAgICAgICAgbG9jYXRpb246IHtcbiAgICAgICAgICAgIHBhdGhuYW1lOiBsb2NhdGlvbi5wYXRobmFtZSxcbiAgICAgICAgICAgIGhvc3RuYW1lOiB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWVcbiAgICAgICAgfSxcbiAgICAgICAgcXVlcnksXG4gICAgICAgIHBhcmFtc1xuICAgIH07XG4gICAgcmV0dXJuIGNvbnRleHQ7XG59IiwiaW1wb3J0IHsgSVJvdXRlIH0gZnJvbSBcIi4vY29yZS9tb2RlbHMvcm91dGUubW9kZWxcIjtcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxuZXhwb3J0IGNvbnN0IFJvdXRlczogSVJvdXRlW10gPSBbXG4gICAge1xuICAgICAgICBwYXRoOiBcIi9cIixcbiAgICAgICAgY29tcG9uZW50OiAoKSA9PiBpbXBvcnQoLyogd2VicGFja0NodW5rTmFtZTogXCJob21lXCIgKi8gXCJwYWdlcy9ob21lL2hvbWUuY29tcG9uZW50XCIpXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHBhdGg6IFwiLzppZC9wcm9kdWN0XCIsXG4gICAgICAgIGNvbXBvbmVudDogKCkgPT4gaW1wb3J0KC8qIHdlYnBhY2tDaHVua05hbWU6IFwiaG9tZS1uZXdcIiAqLyBcInBhZ2VzL2hvbWUvaG9tZS5jb21wb25lbnRcIilcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcGF0aDogXCJjb250YWN0LXVzXCIsXG4gICAgICAgIGNvbXBvbmVudDogKCkgPT4gaW1wb3J0KC8qIHdlYnBhY2tDaHVua05hbWU6IFwiY29udGFjdC11c1wiICovIFwicGFnZXMvY29udGFjdC11cy9jb250YWN0LXVzLmNvbXBvbmVudFwiKVxuICAgIH0sXG4gICAge1xuICAgICAgICBwYXRoOiBcIi80MDRcIixcbiAgICAgICAgY29tcG9uZW50OiAoKSA9PiBQcm9taXNlLnJlc29sdmUoeyBkZWZhdWx0OiAoKSA9PiA8aDE+Tm90IEZvdW5kPC9oMT59KVxuICAgIH1cbl0iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBSZWFjdE5vZGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlbmRlclRvU3RyaW5nIH0gZnJvbSBcInJlYWN0LWRvbS9zZXJ2ZXJcIjtcbmltcG9ydCB7IFN0YXRpY1JvdXRlciB9IGZyb20gXCJyZWFjdC1yb3V0ZXItZG9tL3NlcnZlclwiO1xuaW1wb3J0IHsgQXBwIH0gZnJvbSBcIi4vYXBwXCI7XG5pbXBvcnQgeyBQYWdlRGF0YSB9IGZyb20gXCIuL2NvcmUvbW9kZWxzL3BhZ2UtZGF0YVwiO1xuaW1wb3J0IHsgUm91dGVzIH0gZnJvbSBcIi4vcm91dGVzXCI7XG5cbmV4cG9ydCBjbGFzcyBIdG1sVGVtcGxhdGUgZXh0ZW5kcyBDb21wb25lbnQ8SHRtbFRlbXBsYXRlUHJvcHMsIEh0bWxUZW1wbGF0ZVN0YXRlPiB7XG4gICAgcHVibGljIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3Qgc2NyaXB0ID0gYFxuICAgICAgICB3aW5kb3cucGFnZVByb3BzID0gJHtKU09OLnN0cmluZ2lmeSh0aGlzLnByb3BzLnBhZ2VQcm9wcyB8fCB7fSl9O1xuICAgICAgICBgO1xuICAgICAgICByZXR1cm4oXG4gICAgICAgICAgICA8aHRtbD5cbiAgICAgICAgICAgICAgICA8aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgPGxpbmsgaHJlZj1cImh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vYm9vdHN0cmFwQDUuMC4yL2Rpc3QvY3NzL2Jvb3RzdHJhcC5taW4uY3NzXCIgcmVsPVwic3R5bGVzaGVldFwiIGludGVncml0eT1cInNoYTM4NC1FVlNUUU4zL2F6cHJHMUFubTNRRGdwSkxJbTlOYW8wWXoxenRjUVR3RnNwZDN5RDY1Vm9oaHB1dUNPbUxBU2pDXCIgY3Jvc3NPcmlnaW49XCJhbm9ueW1vdXNcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8dGl0bGU+e3RoaXMucHJvcHMucGFnZVByb3BzLnNlby50aXRsZX08L3RpdGxlPlxuICAgICAgICAgICAgICAgIDwvaGVhZD5cbiAgICAgICAgICAgICAgICA8Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBpZD1cInJvb3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPHNjcmlwdCBkYW5nZXJvdXNseVNldElubmVySFRNTD17e19faHRtbDogc2NyaXB0IH19PlxuICAgICAgICAgICAgICAgICAgICA8L3NjcmlwdD5cbiAgICAgICAgICAgICAgICAgICAgPHNjcmlwdCBzcmM9XCIvY2xpZW50LmpzXCI+PC9zY3JpcHQ+XG4gICAgICAgICAgICAgICAgICAgIDxzY3JpcHQgc3JjPVwiL3JlbG9hZC9yZWxvYWQuanNcIj48L3NjcmlwdD5cbiAgICAgICAgICAgICAgICA8L2JvZHk+XG4gICAgICAgICAgICA8L2h0bWw+XG4gICAgICAgIClcbiAgICB9XG59XG5cblxuZXhwb3J0IGludGVyZmFjZSBIdG1sVGVtcGxhdGVQcm9wcyB7XG4gICAgY2hpbGRyZW46IFJlYWN0Tm9kZTtcbiAgICBwYWdlUHJvcHM6IFBhZ2VEYXRhO1xufVxuZXhwb3J0IGludGVyZmFjZSBIdG1sVGVtcGxhdGVTdGF0ZSB7fVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SHRtbChDb21wb25lbnQ6IGFueSwgcHJvcHM6IFBhZ2VEYXRhLCB1cmw6IHN0cmluZykge1xuICAgIGNvbnN0IGh0bWwgPSByZW5kZXJUb1N0cmluZyhcbiAgICAgICAgPEh0bWxUZW1wbGF0ZSBwYWdlUHJvcHM9e3Byb3BzfT5cbiAgICAgICAgICAgIDxTdGF0aWNSb3V0ZXIgbG9jYXRpb249e3VybH0+XG4gICAgICAgICAgICAgICAgPEFwcCBjb21wPXtDb21wb25lbnR9IHJvdXRlcz17Um91dGVzfSBwYWdlUHJvcHM9e3Byb3BzfSAvPlxuICAgICAgICAgICAgPC9TdGF0aWNSb3V0ZXI+XG4gICAgICAgIDwvSHRtbFRlbXBsYXRlPlxuICAgICk7XG4gICAgcmV0dXJuIGh0bWw7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWRvbS9zZXJ2ZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3Qtcm91dGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXJvdXRlci1kb21cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3Qtcm91dGVyLWRvbS9zZXJ2ZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVsb2FkXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZiA9IHt9O1xuLy8gVGhpcyBmaWxlIGNvbnRhaW5zIG9ubHkgdGhlIGVudHJ5IGNodW5rLlxuLy8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSAoY2h1bmtJZCkgPT4ge1xuXHRyZXR1cm4gUHJvbWlzZS5hbGwoT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5mKS5yZWR1Y2UoKHByb21pc2VzLCBrZXkpID0+IHtcblx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmZba2V5XShjaHVua0lkLCBwcm9taXNlcyk7XG5cdFx0cmV0dXJuIHByb21pc2VzO1xuXHR9LCBbXSkpO1xufTsiLCIvLyBUaGlzIGZ1bmN0aW9uIGFsbG93IHRvIHJlZmVyZW5jZSBhc3luYyBjaHVua3Ncbl9fd2VicGFja19yZXF1aXJlX18udSA9IChjaHVua0lkKSA9PiB7XG5cdC8vIHJldHVybiB1cmwgZm9yIGZpbGVuYW1lcyBiYXNlZCBvbiB0ZW1wbGF0ZVxuXHRyZXR1cm4gXCJcIiArIGNodW5rSWQgKyBcIi5jaHVuay5qc1wiO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGNodW5rc1xuLy8gXCIxXCIgbWVhbnMgXCJsb2FkZWRcIiwgb3RoZXJ3aXNlIG5vdCBsb2FkZWQgeWV0XG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcInNlcnZlclwiOiAxXG59O1xuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbnZhciBpbnN0YWxsQ2h1bmsgPSAoY2h1bmspID0+IHtcblx0dmFyIG1vcmVNb2R1bGVzID0gY2h1bmsubW9kdWxlcywgY2h1bmtJZHMgPSBjaHVuay5pZHMsIHJ1bnRpbWUgPSBjaHVuay5ydW50aW1lO1xuXHRmb3IodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0fVxuXHR9XG5cdGlmKHJ1bnRpbWUpIHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdGZvcih2YXIgaSA9IDA7IGkgPCBjaHVua0lkcy5sZW5ndGg7IGkrKylcblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZHNbaV1dID0gMTtcblxufTtcblxuLy8gcmVxdWlyZSgpIGNodW5rIGxvYWRpbmcgZm9yIGphdmFzY3JpcHRcbl9fd2VicGFja19yZXF1aXJlX18uZi5yZXF1aXJlID0gKGNodW5rSWQsIHByb21pc2VzKSA9PiB7XG5cdC8vIFwiMVwiIGlzIHRoZSBzaWduYWwgZm9yIFwiYWxyZWFkeSBsb2FkZWRcIlxuXHRpZighaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0aWYodHJ1ZSkgeyAvLyBhbGwgY2h1bmtzIGhhdmUgSlNcblx0XHRcdGluc3RhbGxDaHVuayhyZXF1aXJlKFwiLi9cIiArIF9fd2VicGFja19yZXF1aXJlX18udShjaHVua0lkKSkpO1xuXHRcdH0gZWxzZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAxO1xuXHR9XG59O1xuXG4vLyBubyBleHRlcm5hbCBpbnN0YWxsIGNodW5rXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3QiLCJpbXBvcnQgZXhwcmVzcywgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgeyBqb2luIH0gZnJvbSBcInBhdGhcIjtcblxuaW1wb3J0IHsgbWF0Y2hQYXRoIH0gZnJvbSBcInJlYWN0LXJvdXRlclwiO1xuaW1wb3J0IHsgUm91dGVzIH0gZnJvbSBcInNyYy9yb3V0ZXNcIjtcbmltcG9ydCB7IGdldEh0bWwgfSBmcm9tIFwic3JjL3RlbXBsYXRlXCI7XG5pbXBvcnQgeyBjcmVhdGVDb250ZXh0U2VydmVyIH0gZnJvbSBcIi4vY29yZS9mdW5jdGlvbnMvY3JlYXRlLWNvbnRleHRcIjtcbmltcG9ydCB7IFBhZ2VEYXRhIH0gZnJvbSBcIi4vY29yZS9tb2RlbHMvcGFnZS1kYXRhXCI7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXZhci1yZXF1aXJlc1xuY29uc3QgcmVsb2FkID0gcmVxdWlyZShcInJlbG9hZFwiKTtcblxuY29uc3QgYXBwID0gZXhwcmVzcygpO1xuY29uc3QgUE9SVCA9IHByb2Nlc3MuZW52LlBPUlQgfHwgNTAwMDtcblxuY29uc3Qgc3RhcnRTZXJ2ZXIgPSAoKSA9PiB7XG4gICAgYXBwLmxpc3RlbihQT1JULCAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBBcHAgbGlzdGVuaW5nIG9uIHBvcnQ6ICR7UE9SVH1gKTtcbiAgICB9KVxufVxuXG5jb25zdCByZWxvYWRTZXJ2ZXIgPSAoKSA9PiB7XG4gICAgcmVsb2FkKGFwcCkudGhlbigoKSA9PiBzdGFydFNlcnZlcigpKS5jYXRjaCgoZXJyOiBFcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhgRXJyb3Igb24gcmVsb2FkIG9mIGFwcCEhYCwgZXJyLnN0YWNrKTtcbiAgICB9KS5jYXRjaCgoZXJyOiBFcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcInJlbG9hZCBhcHAgZXJyb3IhISFcIiwgZXJyKTtcbiAgICB9KVxufVxuY29uc3QgaXNMb2NhbCA9IHByb2Nlc3MuZW52LklTX0xPQ0FMO1xuY29uc29sZS5sb2coXCJpc0xvY2FsISFcIiwgaXNMb2NhbCk7XG5pZiAoaXNMb2NhbCkge1xuICAgIHJlbG9hZFNlcnZlcigpO1xufSBlbHNlIHtcbiAgICBzdGFydFNlcnZlcigpO1xufVxuXG5cbmFwcC51c2UoZXhwcmVzcy5zdGF0aWMoam9pbihwcm9jZXNzLmN3ZCgpLCBcImJ1aWxkL3B1YmxpY1wiKSkpO1xuXG5hcHAuZ2V0KFwiKlwiLCBhc3luYyAocmVxOiBSZXF1ZXN0LCByZXNwOiBSZXNwb25zZSkgPT4ge1xuICAgIGNvbnN0IHJvdXRlID0gUm91dGVzLmZpbmQociA9PiBtYXRjaFBhdGgoci5wYXRoLCByZXEucGF0aCkpO1xuICAgIGlmICghcm91dGUpIHtcbiAgICAgICAgcmVzcC5yZWRpcmVjdChcIi80MDRcIik7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcm91dGUuY29tcG9uZW50KCkudGhlbihhc3luYyBkQ29tcCA9PiB7XG4gICAgICAgIGNvbnN0IENvbXBvbmVudCA9IGRDb21wLmRlZmF1bHQ7XG4gICAgICAgIGxldCBwcm9wczogUGFnZURhdGEgPSB7IHNlbzogeyB0aXRsZTogXCJcIiB9fTtcbiAgICAgICAgaWYgKENvbXBvbmVudC5nZXRJbml0aWFsUHJvcHMpIHtcbiAgICAgICAgICAgIGNvbnN0IGN0eCA9IGNyZWF0ZUNvbnRleHRTZXJ2ZXIocmVxLCByZXNwKTtcbiAgICAgICAgICAgIHByb3BzID0gYXdhaXQgQ29tcG9uZW50LmdldEluaXRpYWxQcm9wcyhjdHgpO1xuICAgICAgICAgICAgaWYgKHJlc3AuaGVhZGVyc1NlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaHRtbCA9IGdldEh0bWwoQ29tcG9uZW50LCBwcm9wcywgcmVxLnVybCk7XG4gICAgICAgIHJlc3Auc2VuZChodG1sKTtcbiAgICB9KTtcbn0pXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=