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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const awilix_1 = require("awilix");
class Container {
    constructor(injectionMode = 'CLASSIC') {
        this.initializationMetadata = [];
        this.container = (0, awilix_1.createContainer)({ injectionMode });
    }
    resolve(registrationKey) {
        return this.container.resolve(registrationKey);
    }
    resolveClass(constructor) {
        return this.container.build((0, awilix_1.asClass)(constructor));
    }
    resolveFunction(factory) {
        return this.container.build((0, awilix_1.asFunction)(factory));
    }
    registerValue(registrationKey, registration) {
        if (this.container.registrations[registrationKey]) {
            throw Error(`Could not complete container value registration. Registration key ${registrationKey} is already in use.`);
        }
        this.container.register(registrationKey, (0, awilix_1.asValue)(registration));
    }
    registerClass(registrationKey, registration, lifetime = 'SINGLETON') {
        if (this.container.registrations[registrationKey]) {
            throw Error(`Could not complete container class registration. Registration key ${registrationKey} is already in use.`);
        }
        this.container.register(registrationKey, (0, awilix_1.asClass)(registration, { lifetime }));
    }
    registerFunction(registrationKey, registration, lifetime = 'SINGLETON') {
        if (this.container.registrations[registrationKey]) {
            throw Error(`Could not complete container function registration. Registration key ${registrationKey} is already in use.`);
        }
        this.container.register(registrationKey, (0, awilix_1.asFunction)(registration, { lifetime }));
    }
    registerInitializer(initializerKey, initializer) {
        if (this.initializationMetadata[initializerKey]) {
            throw Error(`Could not complete container initializer registration. Registration key ${initializerKey} is already in use.`);
        }
        this.initializationMetadata.push({ initializerKey, initializer });
    }
    initialize(logger) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, e_1, _b, _c;
            const initializationHash = {};
            try {
                for (var _d = true, _e = __asyncValues(this.initializationMetadata), _f; _f = yield _e.next(), _a = _f.done, !_a; _d = true) {
                    _c = _f.value;
                    _d = false;
                    const { initializerKey, initializer } = _c;
                    logger === null || logger === void 0 ? void 0 : logger.info(`initializing ${initializerKey}`);
                    const initializedRecord = yield this.container.build((0, awilix_1.asClass)(initializer)).initialize();
                    for (const recordKey of Object.keys(initializedRecord)) {
                        this.registerValue(recordKey, initializedRecord[recordKey]);
                        initializationHash[recordKey] = initializedRecord[recordKey];
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return initializationHash;
        });
    }
    terminate(logger) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, e_2, _b, _c;
            try {
                for (var _d = true, _e = __asyncValues(this.initializationMetadata), _f; _f = yield _e.next(), _a = _f.done, !_a; _d = true) {
                    _c = _f.value;
                    _d = false;
                    const { initializerKey, initializer } = _c;
                    const initializerInstance = this.container.build((0, awilix_1.asClass)(initializer));
                    if (initializerInstance.terminate) {
                        logger === null || logger === void 0 ? void 0 : logger.info(`terminating ${initializerKey}`);
                        yield initializerInstance.terminate();
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
                }
                finally { if (e_2) throw e_2.error; }
            }
        });
    }
}
exports.Container = Container;
//# sourceMappingURL=container.js.map