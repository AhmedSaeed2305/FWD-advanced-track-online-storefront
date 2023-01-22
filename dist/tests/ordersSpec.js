"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var orders_1 = require("../models/orders");
var users_1 = require("../models/users");
var products_1 = require("../models/products");
var server_1 = __importDefault(require("../server"));
var supertest_1 = __importDefault(require("supertest"));
// asigning supertest to the app
var request = (0, supertest_1.default)(server_1.default);
var orderStore = new orders_1.OrderStore();
var userStore = new users_1.UserStore();
var productStore = new products_1.ProductStore();
// Create order before run tests
beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, userStore.create({
                    firstName: "test1",
                    lastName: "test1",
                    password: "password123",
                })];
            case 1:
                _a.sent();
                return [4 /*yield*/, productStore.create("test1", "1000", "test1")];
            case 2:
                _a.sent();
                return [4 /*yield*/, orderStore.create({
                        quantity: 10,
                        status: true,
                        productId: 1,
                        userId: 1,
                    })];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// model test suites
describe("orders model", function () {
    it("should have an index method", function () {
        expect(orderStore.index).toBeDefined();
    });
    it("should have a show method", function () {
        expect(orderStore.show).toBeDefined();
    });
    it("should have a create method", function () {
        expect(orderStore.show).toBeDefined();
    });
    it("should have an addProducts method", function () {
        expect(orderStore.addProducts).toBeDefined();
    });
    // Show all orders test
    it("index method should return a list of orders", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, orderStore.index("1")];
                case 1:
                    result = _a.sent();
                    expect(result).toEqual(jasmine.any(Array));
                    return [2 /*return*/];
            }
        });
    }); });
    // Show one order test
    it("show method should return one order", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, orderStore.show("1")];
                case 1:
                    result = _a.sent();
                    expect(result).toEqual(jasmine.any(Object));
                    return [2 /*return*/];
            }
        });
    }); });
});
// the endpoint test suite for orders handler
describe("Test endpoints responses", function () {
    it("gets all orders endpoint", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get("/orders?id=1")];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it("gets one order endpoint", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get("/order/user-id?id=1")];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it("creates new order end point", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.post("/new-order")];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(400);
                    return [2 /*return*/];
            }
        });
    }); });
    it("add product end point", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.post("/add-products")];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(400);
                    return [2 /*return*/];
            }
        });
    }); });
});
