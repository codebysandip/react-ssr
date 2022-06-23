"use strict";
exports.id = "home";
exports.ids = ["home"];
exports.modules = {

/***/ "./src/pages/home/home.component.tsx":
/*!*******************************************!*\
  !*** ./src/pages/home/home.component.tsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
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

var Home = /** @class */ (function (_super) {
    __extends(Home, _super);
    function Home() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Home.getInitialProps = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.resolve({
                        seo: {
                            title: "Home Page"
                        },
                        data: { count: 5 }
                    })];
            });
        });
    };
    Home.prototype.render = function () {
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", null,
            "Home Page Count: ",
            this.props.data.count));
    };
    return Home;
}((react__WEBPACK_IMPORTED_MODULE_0___default().Component)));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Home);


/***/ })

};
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jaHVuay5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUEwQjtBQUcxQjtJQUFrQyx3QkFBMEI7SUFBNUQ7O0lBZUEsQ0FBQztJQWR1QixvQkFBZSxHQUFuQzs7O2dCQUNJLHNCQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUM7d0JBQ25CLEdBQUcsRUFBRTs0QkFDRCxLQUFLLEVBQUUsV0FBVzt5QkFDckI7d0JBQ0QsSUFBSSxFQUFFLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBQztxQkFDbkIsQ0FBQyxFQUFDOzs7S0FDTjtJQUVNLHFCQUFNLEdBQWI7UUFDSSxPQUFPLENBQ0g7O1lBQXNCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBTSxDQUNwRDtJQUNMLENBQUM7SUFDTCxXQUFDO0FBQUQsQ0FBQyxDQWZpQyx3REFBZSxHQWVoRCIsInNvdXJjZXMiOlsid2VicGFjazovL3Nzci1kZW1vLy4vc3JjL3BhZ2VzL2hvbWUvaG9tZS5jb21wb25lbnQudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFBhZ2VEYXRhIH0gZnJvbSBcInNyYy9jb3JlL21vZGVscy9wYWdlLWRhdGFcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSG9tZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxIb21lUHJvcHM+IHtcbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIGdldEluaXRpYWxQcm9wcygpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7IFxuICAgICAgICAgICAgc2VvOiB7XG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiSG9tZSBQYWdlXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkYXRhOiB7Y291bnQ6IDV9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8aDE+SG9tZSBQYWdlIENvdW50OiB7dGhpcy5wcm9wcy5kYXRhLmNvdW50fTwvaDE+XG4gICAgICAgIClcbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSG9tZVByb3BzIGV4dGVuZHMgUGFnZURhdGEge1xuICAgIGRhdGE6IHsgY291bnQ6IG51bWJlciB9O1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9