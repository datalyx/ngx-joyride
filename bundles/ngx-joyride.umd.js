(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('rxjs'), require('@angular/router'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('ngx-joyride', ['exports', '@angular/core', '@angular/common', 'rxjs', '@angular/router', 'rxjs/operators'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['ngx-joyride'] = {}, global.ng.core, global.ng.common, global.rxjs, global.ng.router, global.rxjs.operators));
}(this, (function (exports, core, common, rxjs, router, operators) { 'use strict';

    var JoyrideStep = /** @class */ (function () {
        function JoyrideStep() {
            this.title = new rxjs.ReplaySubject();
            this.text = new rxjs.ReplaySubject();
        }
        return JoyrideStep;
    }());

    var DEFAULT_THEME_COLOR = '#3b5560';
    var STEP_DEFAULT_POSITION = 'bottom';
    var DEFAULT_TIMEOUT_BETWEEN_STEPS = 1;
    var ObservableCustomTexts = /** @class */ (function () {
        function ObservableCustomTexts() {
        }
        return ObservableCustomTexts;
    }());
    var DEFAULT_TEXTS = {
        prev: rxjs.of('prev'),
        next: rxjs.of('next'),
        done: rxjs.of('done'),
        close: rxjs.of(null)
    };
    var JoyrideOptionsService = /** @class */ (function () {
        function JoyrideOptionsService() {
            this.themeColor = DEFAULT_THEME_COLOR;
            this.stepDefaultPosition = STEP_DEFAULT_POSITION;
            this.logsEnabled = false;
            this.showCounter = true;
            this.showPrevButton = true;
            this.stepsOrder = [];
        }
        JoyrideOptionsService.prototype.setOptions = function (options) {
            this.stepsOrder = options.steps;
            this.stepDefaultPosition = options.stepDefaultPosition
                ? options.stepDefaultPosition
                : this.stepDefaultPosition;
            this.logsEnabled =
                typeof options.logsEnabled !== 'undefined'
                    ? options.logsEnabled
                    : this.logsEnabled;
            this.showCounter =
                typeof options.showCounter !== 'undefined'
                    ? options.showCounter
                    : this.showCounter;
            this.showPrevButton =
                typeof options.showPrevButton !== 'undefined'
                    ? options.showPrevButton
                    : this.showPrevButton;
            this.themeColor = options.themeColor
                ? options.themeColor
                : this.themeColor;
            this.firstStep = options.startWith;
            this.waitingTime =
                typeof options.waitingTime !== 'undefined'
                    ? options.waitingTime
                    : DEFAULT_TIMEOUT_BETWEEN_STEPS;
            typeof options.customTexts !== 'undefined'
                ? this.setCustomText(options.customTexts)
                : this.setCustomText(DEFAULT_TEXTS);
        };
        JoyrideOptionsService.prototype.getBackdropColor = function () {
            return this.hexToRgb(this.themeColor);
        };
        JoyrideOptionsService.prototype.getThemeColor = function () {
            return this.themeColor;
        };
        JoyrideOptionsService.prototype.getStepDefaultPosition = function () {
            return this.stepDefaultPosition;
        };
        JoyrideOptionsService.prototype.getStepsOrder = function () {
            return this.stepsOrder;
        };
        JoyrideOptionsService.prototype.getFirstStep = function () {
            return this.firstStep;
        };
        JoyrideOptionsService.prototype.getWaitingTime = function () {
            return this.waitingTime;
        };
        JoyrideOptionsService.prototype.areLogsEnabled = function () {
            return this.logsEnabled;
        };
        JoyrideOptionsService.prototype.isCounterVisible = function () {
            return this.showCounter;
        };
        JoyrideOptionsService.prototype.isPrevButtonVisible = function () {
            return this.showPrevButton;
        };
        JoyrideOptionsService.prototype.getCustomTexts = function () {
            return this.customTexts;
        };
        JoyrideOptionsService.prototype.setCustomText = function (texts) {
            var prev;
            var next;
            var done;
            var close;
            prev = texts.prev ? texts.prev : DEFAULT_TEXTS.prev;
            next = texts.next ? texts.next : DEFAULT_TEXTS.next;
            done = texts.done ? texts.done : DEFAULT_TEXTS.done;
            close = texts.close ? texts.close : DEFAULT_TEXTS.close;
            this.customTexts = {
                prev: this.toObservable(prev),
                next: this.toObservable(next),
                done: this.toObservable(done),
                close: this.toObservable(close)
            };
        };
        JoyrideOptionsService.prototype.toObservable = function (value) {
            return value instanceof rxjs.Observable ? value : rxjs.of(value);
        };
        JoyrideOptionsService.prototype.hexToRgb = function (hex) {
            var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            hex = hex.replace(shorthandRegex, function (m, r, g, b) {
                return r + r + g + g + b + b;
            });
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result
                ? parseInt(result[1], 16) + ", " + parseInt(result[2], 16) + ", " + parseInt(result[3], 16)
                : null;
        };
        return JoyrideOptionsService;
    }());
    JoyrideOptionsService.decorators = [
        { type: core.Injectable }
    ];

    var JOYRIDE = 'ngx-joyride:::';
    var LoggerService = /** @class */ (function () {
        function LoggerService(optionService) {
            this.optionService = optionService;
        }
        LoggerService.prototype.debug = function (message, data) {
            if (data === void 0) { data = ""; }
            if (this.optionService.areLogsEnabled()) {
                console.debug(JOYRIDE + message, data);
            }
        };
        LoggerService.prototype.info = function (message, data) {
            if (data === void 0) { data = ""; }
            if (this.optionService.areLogsEnabled()) {
                console.info(JOYRIDE + message, data);
            }
        };
        LoggerService.prototype.warn = function (message, data) {
            if (data === void 0) { data = ""; }
            if (this.optionService.areLogsEnabled()) {
                console.warn(JOYRIDE + message, data);
            }
        };
        LoggerService.prototype.error = function (message, data) {
            if (data === void 0) { data = ""; }
            if (this.optionService.areLogsEnabled()) {
                console.error(JOYRIDE + message, data);
            }
        };
        return LoggerService;
    }());
    LoggerService.decorators = [
        { type: core.Injectable }
    ];
    LoggerService.ctorParameters = function () { return [
        { type: JoyrideOptionsService }
    ]; };

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
            to[j] = from[i];
        return to;
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    var JoyrideError = /** @class */ (function (_super) {
        __extends(JoyrideError, _super);
        function JoyrideError(message) {
            var _this = _super.call(this, message) || this;
            Object.setPrototypeOf(_this, JoyrideError.prototype);
            return _this;
        }
        return JoyrideError;
    }(Error));
    var JoyrideStepDoesNotExist = /** @class */ (function (_super) {
        __extends(JoyrideStepDoesNotExist, _super);
        function JoyrideStepDoesNotExist(message) {
            var _this = _super.call(this, message) || this;
            Object.setPrototypeOf(_this, JoyrideStepDoesNotExist.prototype);
            return _this;
        }
        return JoyrideStepDoesNotExist;
    }(Error));
    var JoyrideStepOutOfRange = /** @class */ (function (_super) {
        __extends(JoyrideStepOutOfRange, _super);
        function JoyrideStepOutOfRange(message) {
            var _this = _super.call(this, message) || this;
            Object.setPrototypeOf(_this, JoyrideStepOutOfRange.prototype);
            return _this;
        }
        return JoyrideStepOutOfRange;
    }(Error));

    var ROUTE_SEPARATOR = '@';
    var Step = /** @class */ (function () {
        function Step() {
        }
        return Step;
    }());
    (function (StepActionType) {
        StepActionType["NEXT"] = "NEXT";
        StepActionType["PREV"] = "PREV";
    })(exports.StepActionType || (exports.StepActionType = {}));
    var JoyrideStepsContainerService = /** @class */ (function () {
        function JoyrideStepsContainerService(stepOptions, logger) {
            this.stepOptions = stepOptions;
            this.logger = logger;
            this.tempSteps = [];
            this.currentStepIndex = -2;
            this.stepHasBeenModified = new rxjs.Subject();
        }
        JoyrideStepsContainerService.prototype.getFirstStepIndex = function () {
            var firstStep = this.stepOptions.getFirstStep();
            var stepIds = this.stepOptions.getStepsOrder();
            var index = stepIds.indexOf(firstStep);
            if (index < 0) {
                index = 0;
                if (firstStep !== undefined)
                    this.logger.warn("The step " + firstStep + " does not exist. Check in your step list if it's present.");
            }
            return index;
        };
        JoyrideStepsContainerService.prototype.init = function () {
            var _this = this;
            this.logger.info('Initializing the steps array.');
            this.steps = [];
            this.currentStepIndex = this.getFirstStepIndex() - 1;
            var stepIds = this.stepOptions.getStepsOrder();
            stepIds.forEach(function (stepId) { return _this.steps.push({ id: stepId, step: null }); });
        };
        JoyrideStepsContainerService.prototype.addStep = function (stepToAdd) {
            var stepExist = this.tempSteps.filter(function (step) { return step.name === stepToAdd.name; }).length > 0;
            if (!stepExist) {
                this.logger.info("Adding step " + stepToAdd.name + " to the steps list.");
                this.tempSteps.push(stepToAdd);
            }
            else {
                var stepIndexToReplace = this.tempSteps.findIndex(function (step) { return step.name === stepToAdd.name; });
                this.tempSteps[stepIndexToReplace] = stepToAdd;
            }
        };
        JoyrideStepsContainerService.prototype.get = function (action) {
            if (action === exports.StepActionType.NEXT)
                this.currentStepIndex++;
            else
                this.currentStepIndex--;
            if (this.currentStepIndex < 0 || this.currentStepIndex >= this.steps.length)
                throw new JoyrideStepOutOfRange('The first or last step of the tour cannot be found!');
            var stepName = this.getStepName(this.steps[this.currentStepIndex].id);
            var index = this.tempSteps.findIndex(function (step) { return step.name === stepName; });
            var stepFound = this.tempSteps[index];
            this.steps[this.currentStepIndex].step = stepFound;
            if (stepFound == null) {
                this.logger.warn("Step " + this.steps[this.currentStepIndex].id + " not found in the DOM. Check if it's hidden by *ngIf directive.");
            }
            return stepFound;
        };
        JoyrideStepsContainerService.prototype.getStepRoute = function (action) {
            var stepID;
            if (action === exports.StepActionType.NEXT) {
                stepID = this.steps[this.currentStepIndex + 1] ? this.steps[this.currentStepIndex + 1].id : null;
            }
            else {
                stepID = this.steps[this.currentStepIndex - 1] ? this.steps[this.currentStepIndex - 1].id : null;
            }
            var stepRoute = stepID && stepID.includes(ROUTE_SEPARATOR) ? stepID.split(ROUTE_SEPARATOR)[1] : '';
            return stepRoute;
        };
        JoyrideStepsContainerService.prototype.updatePosition = function (stepName, position) {
            var index = this.getStepIndex(stepName);
            if (this.steps[index].step) {
                this.steps[index].step.position = position;
                this.stepHasBeenModified.next(this.steps[index].step);
            }
            else {
                this.logger.warn("Trying to modify the position of " + stepName + " to " + position + ". Step not found!Is this step located in a different route?");
            }
        };
        JoyrideStepsContainerService.prototype.getStepNumber = function (stepName) {
            return this.getStepIndex(stepName) + 1;
        };
        JoyrideStepsContainerService.prototype.getStepsCount = function () {
            var stepsOrder = this.stepOptions.getStepsOrder();
            return stepsOrder.length;
        };
        JoyrideStepsContainerService.prototype.getStepIndex = function (stepName) {
            var index = this.steps
                .map(function (step) { return (step.id.includes(ROUTE_SEPARATOR) ? step.id.split(ROUTE_SEPARATOR)[0] : step.id); })
                .findIndex(function (name) { return stepName === name; });
            if (index === -1)
                throw new JoyrideError("The step with name: " + stepName + " does not exist in the step list.");
            return index;
        };
        JoyrideStepsContainerService.prototype.getStepName = function (stepID) {
            var stepName = stepID && stepID.includes(ROUTE_SEPARATOR) ? stepID.split(ROUTE_SEPARATOR)[0] : stepID;
            return stepName;
        };
        return JoyrideStepsContainerService;
    }());
    JoyrideStepsContainerService.decorators = [
        { type: core.Injectable }
    ];
    JoyrideStepsContainerService.ctorParameters = function () { return [
        { type: JoyrideOptionsService },
        { type: LoggerService }
    ]; };

    var DomRefService = /** @class */ (function () {
        function DomRefService(platformId) {
            this.platformId = platformId;
            this.fakeDocument = { body: {}, documentElement: {} };
            this.fakeWindow = { document: this.fakeDocument, navigator: {} };
        }
        DomRefService.prototype.getNativeWindow = function () {
            if (common.isPlatformBrowser(this.platformId))
                return window;
            else
                return this.fakeWindow;
        };
        DomRefService.prototype.getNativeDocument = function () {
            if (common.isPlatformBrowser(this.platformId))
                return document;
            else
                return this.fakeDocument;
        };
        return DomRefService;
    }());
    DomRefService.decorators = [
        { type: core.Injectable }
    ];
    DomRefService.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] }
    ]; };

    var TemplatesService = /** @class */ (function () {
        function TemplatesService() {
        }
        TemplatesService.prototype.setPrevButton = function (template) {
            this._prevButton = template;
        };
        TemplatesService.prototype.getPrevButton = function () {
            return this._prevButton;
        };
        TemplatesService.prototype.setNextButton = function (template) {
            this._nextButton = template;
        };
        TemplatesService.prototype.getNextButton = function () {
            return this._nextButton;
        };
        TemplatesService.prototype.setDoneButton = function (template) {
            this._doneButton = template;
        };
        TemplatesService.prototype.getDoneButton = function () {
            return this._doneButton;
        };
        TemplatesService.prototype.setCounter = function (template) {
            this._counter = template;
        };
        TemplatesService.prototype.getCounter = function () {
            return this._counter;
        };
        return TemplatesService;
    }());
    TemplatesService.decorators = [
        { type: core.Injectable }
    ];

    var NO_POSITION = 'NO_POSITION';
    var JoyrideDirective = /** @class */ (function () {
        function JoyrideDirective(joyrideStepsContainer, viewContainerRef, domService, router, templateService, platformId) {
            this.joyrideStepsContainer = joyrideStepsContainer;
            this.viewContainerRef = viewContainerRef;
            this.domService = domService;
            this.router = router;
            this.templateService = templateService;
            this.platformId = platformId;
            this.stepPosition = NO_POSITION;
            this.prev = new core.EventEmitter();
            this.next = new core.EventEmitter();
            this.done = new core.EventEmitter();
            this.subscriptions = [];
            this.windowRef = this.domService.getNativeWindow();
            this.step = new JoyrideStep();
        }
        JoyrideDirective.prototype.ngAfterViewInit = function () {
            if (!common.isPlatformBrowser(this.platformId))
                return;
            if (this.prevTemplate)
                this.templateService.setPrevButton(this.prevTemplate);
            if (this.nextTemplate)
                this.templateService.setNextButton(this.nextTemplate);
            if (this.doneTemplate)
                this.templateService.setDoneButton(this.doneTemplate);
            if (this.counterTemplate)
                this.templateService.setCounter(this.counterTemplate);
            this.step.position = this.stepPosition;
            this.step.targetViewContainer = this.viewContainerRef;
            this.setAsyncFields(this.step);
            this.step.stepContent = this.stepContent;
            this.step.stepContentParams = this.stepContentParams;
            this.step.nextClicked = this.next;
            this.step.prevCliked = this.prev;
            this.step.tourDone = this.done;
            if (!this.name)
                throw new JoyrideError("All the steps should have the 'joyrideStep' property set with a custom name.");
            this.step.name = this.name;
            this.step.route = this.router.url.substr(0, 1) === '/' ? this.router.url.substr(1) : this.router.url;
            this.step.transformCssStyle = this.windowRef.getComputedStyle(this.viewContainerRef.element.nativeElement).transform;
            this.step.isElementOrAncestorFixed =
                this.isElementFixed(this.viewContainerRef.element) ||
                    this.isAncestorsFixed(this.viewContainerRef.element.nativeElement.parentElement);
            this.joyrideStepsContainer.addStep(this.step);
        };
        JoyrideDirective.prototype.ngOnChanges = function (changes) {
            if (changes['title'] || changes['text']) {
                this.setAsyncFields(this.step);
            }
        };
        JoyrideDirective.prototype.isElementFixed = function (element) {
            return this.windowRef.getComputedStyle(element.nativeElement).position === 'fixed';
        };
        JoyrideDirective.prototype.setAsyncFields = function (step) {
            if (this.title instanceof rxjs.Observable) {
                this.subscriptions.push(this.title.subscribe(function (title) {
                    step.title.next(title);
                }));
            }
            else {
                step.title.next(this.title);
            }
            if (this.text instanceof rxjs.Observable) {
                this.subscriptions.push(this.text.subscribe(function (text) {
                    step.text.next(text);
                }));
            }
            else {
                step.text.next(this.text);
            }
        };
        JoyrideDirective.prototype.isAncestorsFixed = function (nativeElement) {
            if (!nativeElement || !nativeElement.parentElement)
                return false;
            var isElementFixed = this.windowRef.getComputedStyle(nativeElement.parentElement).position === 'fixed';
            if (nativeElement.nodeName === 'BODY') {
                return isElementFixed;
            }
            if (isElementFixed)
                return true;
            else
                return this.isAncestorsFixed(nativeElement.parentElement);
        };
        JoyrideDirective.prototype.ngOnDestroy = function () {
            this.subscriptions.forEach(function (sub) {
                sub.unsubscribe();
            });
        };
        return JoyrideDirective;
    }());
    JoyrideDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: 'joyrideStep, [joyrideStep]'
                },] }
    ];
    JoyrideDirective.ctorParameters = function () { return [
        { type: JoyrideStepsContainerService },
        { type: core.ViewContainerRef },
        { type: DomRefService },
        { type: router.Router },
        { type: TemplatesService },
        { type: Object, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] }
    ]; };
    JoyrideDirective.propDecorators = {
        name: [{ type: core.Input, args: ['joyrideStep',] }],
        nextStep: [{ type: core.Input }],
        title: [{ type: core.Input }],
        text: [{ type: core.Input }],
        stepPosition: [{ type: core.Input }],
        stepContent: [{ type: core.Input }],
        stepContentParams: [{ type: core.Input }],
        prevTemplate: [{ type: core.Input }],
        nextTemplate: [{ type: core.Input }],
        doneTemplate: [{ type: core.Input }],
        counterTemplate: [{ type: core.Input }],
        prev: [{ type: core.Output }],
        next: [{ type: core.Output }],
        done: [{ type: core.Output }]
    };

    var DocumentService = /** @class */ (function () {
        function DocumentService(DOMService, platformId) {
            this.DOMService = DOMService;
            if (!common.isPlatformBrowser(platformId)) {
                return;
            }
            this.setDocumentHeight();
            var doc = DOMService.getNativeDocument();
            if (doc && !doc.elementsFromPoint) {
                // IE 11 - Edge browsers
                doc.elementsFromPoint = this.elementsFromPoint.bind(this);
            }
        }
        DocumentService.prototype.getElementFixedTop = function (elementRef) {
            return elementRef.nativeElement.getBoundingClientRect().left;
        };
        DocumentService.prototype.getElementFixedLeft = function (elementRef) {
            return elementRef.nativeElement.getBoundingClientRect().left;
        };
        DocumentService.prototype.getElementAbsoluteTop = function (elementRef) {
            var scrollOffsets = this.getScrollOffsets();
            return (elementRef.nativeElement.getBoundingClientRect().top +
                scrollOffsets.y);
        };
        DocumentService.prototype.getElementAbsoluteLeft = function (elementRef) {
            var scrollOffsets = this.getScrollOffsets();
            return (elementRef.nativeElement.getBoundingClientRect().left +
                scrollOffsets.x);
        };
        DocumentService.prototype.setDocumentHeight = function () {
            this.documentHeight = this.calculateDocumentHeight();
        };
        DocumentService.prototype.getDocumentHeight = function () {
            return this.documentHeight;
        };
        DocumentService.prototype.isParentScrollable = function (elementRef) {
            return (this.getFirstScrollableParent(elementRef.nativeElement) !==
                this.DOMService.getNativeDocument().body);
        };
        DocumentService.prototype.isElementBeyondOthers = function (elementRef, isElementFixed, keywordToDiscard) {
            var x1 = isElementFixed
                ? this.getElementFixedLeft(elementRef)
                : this.getElementAbsoluteLeft(elementRef);
            var y1 = isElementFixed
                ? this.getElementFixedTop(elementRef)
                : this.getElementAbsoluteTop(elementRef);
            var x2 = x1 + elementRef.nativeElement.getBoundingClientRect().width - 1;
            var y2 = y1 + elementRef.nativeElement.getBoundingClientRect().height - 1;
            var elements1 = this.DOMService.getNativeDocument().elementsFromPoint(x1, y1);
            var elements2 = this.DOMService.getNativeDocument().elementsFromPoint(x2, y2);
            if (elements1.length === 0 && elements2.length === 0)
                return 1;
            if (this.getFirstElementWithoutKeyword(elements1, keywordToDiscard) !==
                elementRef.nativeElement ||
                this.getFirstElementWithoutKeyword(elements2, keywordToDiscard) !==
                    elementRef.nativeElement) {
                return 2;
            }
            return 3;
        };
        DocumentService.prototype.scrollIntoView = function (elementRef, isElementFixed) {
            var firstScrollableParent = this.getFirstScrollableParent(elementRef.nativeElement);
            var top = isElementFixed
                ? this.getElementFixedTop(elementRef)
                : this.getElementAbsoluteTop(elementRef);
            if (firstScrollableParent !== this.DOMService.getNativeDocument().body) {
                if (firstScrollableParent.scrollTo) {
                    firstScrollableParent.scrollTo(0, top - 150);
                }
                else {
                    // IE 11 - Edge browsers
                    firstScrollableParent.scrollTop = top - 150;
                }
            }
            else {
                this.DOMService.getNativeWindow().scrollTo(0, top - 150);
            }
        };
        DocumentService.prototype.scrollToTheTop = function (elementRef) {
            var firstScrollableParent = this.getFirstScrollableParent(elementRef.nativeElement);
            if (firstScrollableParent !== this.DOMService.getNativeDocument().body) {
                if (firstScrollableParent.scrollTo) {
                    firstScrollableParent.scrollTo(0, 0);
                }
                else {
                    // IE 11 - Edge browsers
                    firstScrollableParent.scrollTop = 0;
                }
            }
            else {
                this.DOMService.getNativeWindow().scrollTo(0, 0);
            }
        };
        DocumentService.prototype.scrollToTheBottom = function (elementRef) {
            var firstScrollableParent = this.getFirstScrollableParent(elementRef.nativeElement);
            if (firstScrollableParent !== this.DOMService.getNativeDocument().body) {
                if (firstScrollableParent.scrollTo) {
                    firstScrollableParent.scrollTo(0, this.DOMService.getNativeDocument().body.scrollHeight);
                }
                else {
                    // IE 11 - Edge browsers
                    firstScrollableParent.scrollTop =
                        firstScrollableParent.scrollHeight -
                            firstScrollableParent.clientHeight;
                }
            }
            else {
                this.DOMService.getNativeWindow().scrollTo(0, this.DOMService.getNativeDocument().body.scrollHeight);
            }
        };
        DocumentService.prototype.getFirstScrollableParent = function (node) {
            var _this = this;
            var regex = /(auto|scroll|overlay)/;
            var style = function (node, prop) { return _this.DOMService.getNativeWindow()
                .getComputedStyle(node, null)
                .getPropertyValue(prop); };
            var scroll = function (node) { return regex.test(style(node, 'overflow') +
                style(node, 'overflow-y') +
                style(node, 'overflow-x')); };
            var scrollparent = function (node) {
                return !node || node === _this.DOMService.getNativeDocument().body
                    ? _this.DOMService.getNativeDocument().body
                    : scroll(node)
                        ? node
                        : scrollparent(node.parentNode);
            };
            return scrollparent(node);
        };
        DocumentService.prototype.calculateDocumentHeight = function () {
            var documentRef = this.DOMService.getNativeDocument();
            return Math.max(documentRef.body.scrollHeight, documentRef.documentElement.scrollHeight, documentRef.body.offsetHeight, documentRef.documentElement.offsetHeight, documentRef.body.clientHeight, documentRef.documentElement.clientHeight);
        };
        DocumentService.prototype.getScrollOffsets = function () {
            var winReference = this.DOMService.getNativeWindow();
            var docReference = this.DOMService.getNativeDocument();
            // This works for all browsers except IE versions 8 and before
            if (winReference.pageXOffset != null)
                return { x: winReference.pageXOffset, y: winReference.pageYOffset };
            // For IE (or any browser) in Standards mode
            if (docReference.compatMode == 'CSS1Compat')
                return {
                    x: docReference.documentElement.scrollLeft,
                    y: docReference.documentElement.scrollTop
                };
            // For browsers in Quirks mode
            return {
                x: docReference.body.scrollLeft,
                y: docReference.body.scrollTop
            };
        };
        DocumentService.prototype.elementsFromPoint = function (x, y) {
            var parents = [];
            var parent = void 0;
            do {
                var elem = this.DOMService.getNativeDocument().elementFromPoint(x, y);
                if (elem && parent !== elem) {
                    parent = elem;
                    parents.push(parent);
                    parent.style.pointerEvents = 'none';
                }
                else {
                    parent = false;
                }
            } while (parent);
            parents.forEach(function (parent) {
                return (parent.style.pointerEvents = 'all');
            });
            return parents;
        };
        DocumentService.prototype.getFirstElementWithoutKeyword = function (elements, keyword) {
            while (elements[0] &&
                elements[0].classList.toString().includes(keyword)) {
                elements.shift();
            }
            return elements[0];
        };
        return DocumentService;
    }());
    DocumentService.decorators = [
        { type: core.Injectable }
    ];
    DocumentService.ctorParameters = function () { return [
        { type: DomRefService },
        { type: Object, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] }
    ]; };

    var JoyrideBackdropService = /** @class */ (function () {
        function JoyrideBackdropService(documentService, optionsService, rendererFactory) {
            this.documentService = documentService;
            this.optionsService = optionsService;
            this.rendererFactory = rendererFactory;
            this.lastXScroll = 0;
            this.lastYScroll = 0;
            this.setRenderer();
        }
        JoyrideBackdropService.prototype.setRenderer = function () {
            this.renderer = this.rendererFactory.createRenderer(null, null);
        };
        JoyrideBackdropService.prototype.draw = function (step) {
            this.elementRef = step.targetViewContainer;
            this.targetAbsoluteTop = this.getTargetTotalTop(step);
            this.targetAbsoluteLeft = this.getTargetTotalLeft(step);
            this.currentBackdropContainer = this.renderer.createElement('div');
            this.renderer.addClass(this.currentBackdropContainer, 'backdrop-container');
            this.renderer.setStyle(this.currentBackdropContainer, 'position', 'fixed');
            this.renderer.setStyle(this.currentBackdropContainer, 'top', '0px');
            this.renderer.setStyle(this.currentBackdropContainer, 'left', '0px');
            this.renderer.setStyle(this.currentBackdropContainer, 'width', '100%');
            this.renderer.setStyle(this.currentBackdropContainer, 'height', '100%');
            this.renderer.setStyle(this.currentBackdropContainer, 'z-index', '1000');
            this.renderer.setAttribute(this.currentBackdropContainer, 'id', 'backdrop-' + step.name);
            this.backdropContent = this.renderer.createElement('div');
            this.renderer.addClass(this.backdropContent, 'backdrop-content');
            this.renderer.setStyle(this.backdropContent, 'position', 'relative');
            this.renderer.setStyle(this.backdropContent, 'height', '100%');
            this.renderer.setStyle(this.backdropContent, 'display', 'flex');
            this.renderer.setStyle(this.backdropContent, 'flex-direction', 'column');
            this.renderer.appendChild(this.currentBackdropContainer, this.backdropContent);
            this.backdropTop = this.renderer.createElement('div');
            this.renderer.addClass(this.backdropTop, 'joyride-backdrop');
            this.renderer.addClass(this.backdropTop, 'backdrop-top');
            this.renderer.setStyle(this.backdropTop, 'width', '100%');
            this.renderer.setStyle(this.backdropTop, 'height', this.targetAbsoluteTop - this.lastYScroll + 'px');
            this.renderer.setStyle(this.backdropTop, 'flex-shrink', '0');
            this.renderer.setStyle(this.backdropTop, 'background-color', "rgba(" + this.optionsService.getBackdropColor() + ", 0.7)");
            this.renderer.appendChild(this.backdropContent, this.backdropTop);
            this.backdropMiddleContainer = this.renderer.createElement('div');
            this.renderer.addClass(this.backdropMiddleContainer, 'backdrop-middle-container');
            this.renderer.setStyle(this.backdropMiddleContainer, 'height', this.elementRef.element.nativeElement.offsetHeight + 'px');
            this.renderer.setStyle(this.backdropMiddleContainer, 'width', '100%');
            this.renderer.setStyle(this.backdropMiddleContainer, 'flex-shrink', '0');
            this.renderer.appendChild(this.backdropContent, this.backdropMiddleContainer);
            this.backdropMiddleContent = this.renderer.createElement('div');
            this.renderer.addClass(this.backdropMiddleContent, 'backdrop-middle-content');
            this.renderer.setStyle(this.backdropMiddleContent, 'display', 'flex');
            this.renderer.setStyle(this.backdropMiddleContent, 'width', '100%');
            this.renderer.setStyle(this.backdropMiddleContent, 'height', '100%');
            this.renderer.appendChild(this.backdropMiddleContainer, this.backdropMiddleContent);
            this.leftBackdrop = this.renderer.createElement('div');
            this.renderer.addClass(this.leftBackdrop, 'joyride-backdrop');
            this.renderer.addClass(this.leftBackdrop, 'backdrop-left');
            this.renderer.setStyle(this.leftBackdrop, 'flex-shrink', '0');
            this.renderer.setStyle(this.leftBackdrop, 'width', this.targetAbsoluteLeft - this.lastXScroll + 'px');
            this.renderer.setStyle(this.leftBackdrop, 'background-color', "rgba(" + this.optionsService.getBackdropColor() + ", 0.7)");
            this.renderer.appendChild(this.backdropMiddleContent, this.leftBackdrop);
            this.targetBackdrop = this.renderer.createElement('div');
            this.renderer.addClass(this.targetBackdrop, 'backdrop-target');
            this.renderer.setStyle(this.targetBackdrop, 'flex-shrink', '0');
            this.renderer.setStyle(this.targetBackdrop, 'width', this.elementRef.element.nativeElement.offsetWidth + 'px');
            this.renderer.appendChild(this.backdropMiddleContent, this.targetBackdrop);
            this.rightBackdrop = this.renderer.createElement('div');
            this.renderer.addClass(this.rightBackdrop, 'joyride-backdrop');
            this.renderer.addClass(this.rightBackdrop, 'backdrop-right');
            this.renderer.setStyle(this.rightBackdrop, 'width', '100%');
            this.renderer.setStyle(this.rightBackdrop, 'background-color', "rgba(" + this.optionsService.getBackdropColor() + ", 0.7)");
            this.renderer.appendChild(this.backdropMiddleContent, this.rightBackdrop);
            this.backdropBottom = this.renderer.createElement('div');
            this.renderer.addClass(this.backdropBottom, 'joyride-backdrop');
            this.renderer.addClass(this.backdropBottom, 'backdrop-bottom');
            this.renderer.setStyle(this.backdropBottom, 'width', '100%');
            this.renderer.setStyle(this.backdropBottom, 'height', '100%');
            this.renderer.setStyle(this.backdropBottom, 'background-color', "rgba(" + this.optionsService.getBackdropColor() + ", 0.7)");
            this.renderer.appendChild(this.backdropContent, this.backdropBottom);
            this.removeLastBackdrop();
            this.drawCurrentBackdrop();
            this.lastBackdropContainer = this.currentBackdropContainer;
        };
        JoyrideBackdropService.prototype.remove = function () {
            this.removeLastBackdrop();
        };
        JoyrideBackdropService.prototype.redrawTarget = function (step) {
            this.targetAbsoluteLeft = this.getTargetTotalLeft(step);
            this.targetAbsoluteTop = this.getTargetTotalTop(step);
            this.handleVerticalScroll(step);
            this.handleHorizontalScroll(step);
        };
        JoyrideBackdropService.prototype.getTargetTotalTop = function (step) {
            var targetVC = step.targetViewContainer;
            return step.isElementOrAncestorFixed
                ? this.documentService.getElementFixedTop(targetVC.element)
                : this.documentService.getElementAbsoluteTop(targetVC.element);
        };
        JoyrideBackdropService.prototype.getTargetTotalLeft = function (step) {
            var targetVC = step.targetViewContainer;
            return step.isElementOrAncestorFixed
                ? this.documentService.getElementFixedLeft(targetVC.element)
                : this.documentService.getElementAbsoluteLeft(targetVC.element);
        };
        JoyrideBackdropService.prototype.redraw = function (step, scroll) {
            if (this.lastYScroll !== scroll.scrollY) {
                this.lastYScroll = scroll.scrollY;
                if (this.elementRef) {
                    this.handleVerticalScroll(step);
                }
            }
            if (this.lastXScroll !== scroll.scrollX) {
                this.lastXScroll = scroll.scrollX;
                if (this.elementRef) {
                    this.handleHorizontalScroll(step);
                }
            }
        };
        JoyrideBackdropService.prototype.handleHorizontalScroll = function (step) {
            var newBackdropLeftWidth = step.isElementOrAncestorFixed ? this.targetAbsoluteLeft : this.targetAbsoluteLeft - this.lastXScroll;
            if (newBackdropLeftWidth >= 0) {
                this.renderer.setStyle(this.leftBackdrop, 'width', newBackdropLeftWidth + 'px');
                this.renderer.setStyle(this.targetBackdrop, 'width', this.elementRef.element.nativeElement.offsetWidth + 'px');
            }
            else {
                this.handleTargetPartialWidth(newBackdropLeftWidth);
            }
        };
        JoyrideBackdropService.prototype.handleTargetPartialWidth = function (newBackdropLeftWidth) {
            this.renderer.setStyle(this.leftBackdrop, 'width', 0 + 'px');
            var visibleTargetWidth = this.elementRef.element.nativeElement.offsetWidth + newBackdropLeftWidth;
            if (visibleTargetWidth >= 0) {
                this.renderer.setStyle(this.targetBackdrop, 'width', visibleTargetWidth + 'px');
            }
            else {
                this.renderer.setStyle(this.targetBackdrop, 'width', 0 + 'px');
            }
        };
        JoyrideBackdropService.prototype.handleVerticalScroll = function (step) {
            var newBackdropTopHeight = step.isElementOrAncestorFixed ? this.targetAbsoluteTop : this.targetAbsoluteTop - this.lastYScroll;
            if (newBackdropTopHeight >= 0) {
                this.renderer.setStyle(this.backdropTop, 'height', newBackdropTopHeight + 'px');
                this.renderer.setStyle(this.backdropMiddleContainer, 'height', this.elementRef.element.nativeElement.offsetHeight + 'px');
            }
            else {
                this.handleTargetPartialHeight(newBackdropTopHeight);
            }
        };
        JoyrideBackdropService.prototype.handleTargetPartialHeight = function (newBackdropTopHeight) {
            this.renderer.setStyle(this.backdropTop, 'height', 0 + 'px');
            var visibleTargetHeight = this.elementRef.element.nativeElement.offsetHeight + newBackdropTopHeight;
            if (visibleTargetHeight >= 0) {
                this.renderer.setStyle(this.backdropMiddleContainer, 'height', visibleTargetHeight + 'px');
            }
            else {
                this.renderer.setStyle(this.backdropMiddleContainer, 'height', 0 + 'px');
            }
        };
        JoyrideBackdropService.prototype.removeLastBackdrop = function () {
            if (this.lastBackdropContainer) {
                this.renderer.removeChild(document.body, this.lastBackdropContainer);
                this.lastBackdropContainer = undefined;
            }
        };
        JoyrideBackdropService.prototype.drawCurrentBackdrop = function () {
            this.renderer.appendChild(document.body, this.currentBackdropContainer);
        };
        return JoyrideBackdropService;
    }());
    JoyrideBackdropService.decorators = [
        { type: core.Injectable }
    ];
    JoyrideBackdropService.ctorParameters = function () { return [
        { type: DocumentService },
        { type: JoyrideOptionsService },
        { type: core.RendererFactory2 }
    ]; };

    var Scroll = /** @class */ (function () {
        function Scroll() {
        }
        return Scroll;
    }());
    var EventListenerService = /** @class */ (function () {
        function EventListenerService(rendererFactory, DOMService) {
            this.rendererFactory = rendererFactory;
            this.DOMService = DOMService;
            this.scrollEvent = new rxjs.Subject();
            this.resizeEvent = new rxjs.Subject();
            this.renderer = rendererFactory.createRenderer(null, null);
        }
        EventListenerService.prototype.startListeningScrollEvents = function () {
            var _this = this;
            this.scrollUnlisten = this.renderer.listen('document', 'scroll', function (evt) {
                _this.scrollEvent.next({
                    scrollX: _this.DOMService.getNativeWindow().pageXOffset,
                    scrollY: _this.DOMService.getNativeWindow().pageYOffset
                });
            });
        };
        EventListenerService.prototype.startListeningResizeEvents = function () {
            var _this = this;
            this.resizeUnlisten = this.renderer.listen('window', 'resize', function (evt) {
                _this.resizeEvent.next(evt);
            });
        };
        EventListenerService.prototype.stopListeningScrollEvents = function () {
            this.scrollUnlisten();
        };
        EventListenerService.prototype.stopListeningResizeEvents = function () {
            this.resizeUnlisten();
        };
        return EventListenerService;
    }());
    EventListenerService.decorators = [
        { type: core.Injectable }
    ];
    EventListenerService.ctorParameters = function () { return [
        { type: core.RendererFactory2 },
        { type: DomRefService }
    ]; };

    var STEP_MIN_WIDTH = 200;
    var STEP_MAX_WIDTH = 400;
    var CUSTOM_STEP_MAX_WIDTH_VW = 90;
    var STEP_HEIGHT = 200;
    var ASPECT_RATIO = 1.212;
    var DEFAULT_DISTANCE_FROM_MARGIN_TOP = 2;
    var DEFAULT_DISTANCE_FROM_MARGIN_LEFT = 2;
    var DEFAULT_DISTANCE_FROM_MARGIN_BOTTOM = 5;
    var DEFAULT_DISTANCE_FROM_MARGIN_RIGHT = 5;
    (function (KEY_CODE) {
        KEY_CODE[KEY_CODE["RIGHT_ARROW"] = 39] = "RIGHT_ARROW";
        KEY_CODE[KEY_CODE["LEFT_ARROW"] = 37] = "LEFT_ARROW";
        KEY_CODE[KEY_CODE["ESCAPE_KEY"] = 27] = "ESCAPE_KEY";
    })(exports.KEY_CODE || (exports.KEY_CODE = {}));
    var JoyrideStepComponent = /** @class */ (function () {
        function JoyrideStepComponent(injector, stepsContainerService, eventListenerService, documentService, renderer, logger, optionsService, templateService) {
            this.injector = injector;
            this.stepsContainerService = stepsContainerService;
            this.eventListenerService = eventListenerService;
            this.documentService = documentService;
            this.renderer = renderer;
            this.logger = logger;
            this.optionsService = optionsService;
            this.templateService = templateService;
            this.stepWidth = STEP_MIN_WIDTH;
            this.stepHeight = STEP_HEIGHT;
            this.showArrow = true;
            this.arrowSize = ARROW_SIZE;
            this.subscriptions = [];
        }
        JoyrideStepComponent.prototype.ngOnInit = function () {
            var _this = this;
            // Need to Inject here otherwise you will obtain a circular dependency
            this.joyrideStepService = this.injector.get(JoyrideStepService);
            this.documentHeight = this.documentService.getDocumentHeight();
            this.subscriptions.push(this.subscribeToResizeEvents());
            this.title = this.step.title.asObservable();
            this.text = this.step.text.asObservable();
            this.setCustomTemplates();
            this.setCustomTexts();
            this.counter = this.getCounter();
            this.isCounterVisible = this.optionsService.isCounterVisible();
            this.isPrevButtonVisible = this.optionsService.isPrevButtonVisible();
            this.themeColor = this.optionsService.getThemeColor();
            if (this.text)
                this.text.subscribe(function (val) { return _this.checkRedraw(val); });
            if (this.title)
                this.title.subscribe(function (val) { return _this.checkRedraw(val); });
        };
        JoyrideStepComponent.prototype.ngAfterViewInit = function () {
            if (this.isCustomized()) {
                this.renderer.setStyle(this.stepContainer.nativeElement, 'max-width', CUSTOM_STEP_MAX_WIDTH_VW + 'vw');
                this.updateStepDimensions();
            }
            else {
                this.renderer.setStyle(this.stepContainer.nativeElement, 'max-width', STEP_MAX_WIDTH + 'px');
                var dimensions = this.getDimensionsByAspectRatio(this.stepContainer.nativeElement.clientWidth, this.stepContainer.nativeElement.clientHeight, ASPECT_RATIO);
                dimensions = this.adjustDimensions(dimensions.width, dimensions.height);
                this.stepWidth = dimensions.width;
                this.stepHeight = dimensions.height;
                this.renderer.setStyle(this.stepContainer.nativeElement, 'width', this.stepWidth + 'px');
                this.renderer.setStyle(this.stepContainer.nativeElement, 'height', this.stepHeight + 'px');
            }
            this.drawStep();
        };
        JoyrideStepComponent.prototype.checkRedraw = function (val) {
            var _this = this;
            if (val != null) {
                // Need to wait that the change is rendered before redrawing
                setTimeout(function () {
                    _this.redrawStep();
                }, 2);
            }
        };
        JoyrideStepComponent.prototype.isCustomized = function () {
            return (this.step.stepContent ||
                this.templateService.getCounter() ||
                this.templateService.getPrevButton() ||
                this.templateService.getNextButton() ||
                this.templateService.getDoneButton());
        };
        JoyrideStepComponent.prototype.setCustomTexts = function () {
            var customeTexts = this.optionsService.getCustomTexts();
            this.prevText = customeTexts.prev;
            this.nextText = customeTexts.next;
            this.doneText = customeTexts.done;
        };
        JoyrideStepComponent.prototype.drawStep = function () {
            var position = this.step.isElementOrAncestorFixed
                ? 'fixed'
                : 'absolute';
            this.renderer.setStyle(this.stepHolder.nativeElement, 'position', position);
            this.renderer.setStyle(this.stepHolder.nativeElement, 'transform', this.step.transformCssStyle);
            this.targetWidth = this.step.targetViewContainer.element.nativeElement.getBoundingClientRect().width;
            this.targetHeight = this.step.targetViewContainer.element.nativeElement.getBoundingClientRect().height;
            this.targetAbsoluteLeft =
                position === 'fixed'
                    ? this.documentService.getElementFixedLeft(this.step.targetViewContainer.element)
                    : this.documentService.getElementAbsoluteLeft(this.step.targetViewContainer.element);
            this.targetAbsoluteTop =
                position === 'fixed'
                    ? this.documentService.getElementFixedTop(this.step.targetViewContainer.element)
                    : this.documentService.getElementAbsoluteTop(this.step.targetViewContainer.element);
            this.setStepStyle();
        };
        JoyrideStepComponent.prototype.getCounter = function () {
            var stepPosition = this.stepsContainerService.getStepNumber(this.step.name);
            var numberOfSteps = this.stepsContainerService.getStepsCount();
            this.counterData = { step: stepPosition, total: numberOfSteps };
            return stepPosition + '/' + numberOfSteps;
        };
        JoyrideStepComponent.prototype.setCustomTemplates = function () {
            this.customContent = this.step.stepContent;
            this.ctx = this.step.stepContentParams;
            this.customPrevButton = this.templateService.getPrevButton();
            this.customNextButton = this.templateService.getNextButton();
            this.customDoneButton = this.templateService.getDoneButton();
            this.customCounter = this.templateService.getCounter();
        };
        JoyrideStepComponent.prototype.keyEvent = function (event) {
            console.log(event);
            if (event.keyCode === exports.KEY_CODE.RIGHT_ARROW) {
                if (this.isLastStep()) {
                    this.close();
                }
                else {
                    this.next();
                }
            }
            else if (event.keyCode === exports.KEY_CODE.LEFT_ARROW) {
                this.prev();
            }
            else if (event.keyCode === exports.KEY_CODE.ESCAPE_KEY) {
                this.close();
            }
        };
        JoyrideStepComponent.prototype.prev = function () {
            this.joyrideStepService.prev();
        };
        JoyrideStepComponent.prototype.next = function () {
            this.joyrideStepService.next();
        };
        JoyrideStepComponent.prototype.close = function () {
            this.joyrideStepService.close();
        };
        JoyrideStepComponent.prototype.isFirstStep = function () {
            return this.stepsContainerService.getStepNumber(this.step.name) === 1;
        };
        JoyrideStepComponent.prototype.isLastStep = function () {
            return (this.stepsContainerService.getStepNumber(this.step.name) ===
                this.stepsContainerService.getStepsCount());
        };
        JoyrideStepComponent.prototype.setStepStyle = function () {
            switch (this.step.position) {
                case 'top': {
                    this.setStyleTop();
                    break;
                }
                case 'bottom': {
                    this.setStyleBottom();
                    break;
                }
                case 'right': {
                    this.setStyleRight();
                    break;
                }
                case 'left': {
                    this.setStyleLeft();
                    break;
                }
                case 'center': {
                    this.setStyleCenter();
                    break;
                }
                default: {
                    this.setStyleBottom();
                }
            }
        };
        JoyrideStepComponent.prototype.setStyleTop = function () {
            this.stepsContainerService.updatePosition(this.step.name, 'top');
            this.topPosition =
                this.targetAbsoluteTop - DISTANCE_FROM_TARGET - this.stepHeight;
            this.stepAbsoluteTop =
                this.targetAbsoluteTop - DISTANCE_FROM_TARGET - this.stepHeight;
            this.arrowTopPosition = this.stepHeight;
            this.leftPosition =
                this.targetWidth / 2 - this.stepWidth / 2 + this.targetAbsoluteLeft;
            this.stepAbsoluteLeft =
                this.targetWidth / 2 - this.stepWidth / 2 + this.targetAbsoluteLeft;
            this.arrowLeftPosition = this.stepWidth / 2 - this.arrowSize;
            this.adjustLeftPosition();
            this.adjustRightPosition();
            this.arrowPosition = 'bottom';
            this.autofixTopPosition();
        };
        JoyrideStepComponent.prototype.setStyleRight = function () {
            this.stepsContainerService.updatePosition(this.step.name, 'right');
            this.topPosition =
                this.targetAbsoluteTop +
                    this.targetHeight / 2 -
                    this.stepHeight / 2;
            this.stepAbsoluteTop =
                this.targetAbsoluteTop +
                    this.targetHeight / 2 -
                    this.stepHeight / 2;
            this.arrowTopPosition = this.stepHeight / 2 - this.arrowSize;
            this.leftPosition =
                this.targetAbsoluteLeft + this.targetWidth + DISTANCE_FROM_TARGET;
            this.stepAbsoluteLeft =
                this.targetAbsoluteLeft + this.targetWidth + DISTANCE_FROM_TARGET;
            this.arrowLeftPosition = -this.arrowSize;
            this.adjustTopPosition();
            this.adjustBottomPosition();
            this.arrowPosition = 'left';
            this.autofixRightPosition();
        };
        JoyrideStepComponent.prototype.setStyleBottom = function () {
            this.stepsContainerService.updatePosition(this.step.name, 'bottom');
            this.topPosition =
                this.targetAbsoluteTop + this.targetHeight + DISTANCE_FROM_TARGET;
            this.stepAbsoluteTop =
                this.targetAbsoluteTop + this.targetHeight + DISTANCE_FROM_TARGET;
            this.arrowTopPosition = -this.arrowSize;
            this.arrowLeftPosition = this.stepWidth / 2 - this.arrowSize;
            this.leftPosition =
                this.targetWidth / 2 - this.stepWidth / 2 + this.targetAbsoluteLeft;
            this.stepAbsoluteLeft =
                this.targetWidth / 2 - this.stepWidth / 2 + this.targetAbsoluteLeft;
            this.adjustLeftPosition();
            this.adjustRightPosition();
            this.arrowPosition = 'top';
            this.autofixBottomPosition();
        };
        JoyrideStepComponent.prototype.setStyleLeft = function () {
            this.stepsContainerService.updatePosition(this.step.name, 'left');
            this.topPosition =
                this.targetAbsoluteTop +
                    this.targetHeight / 2 -
                    this.stepHeight / 2;
            this.stepAbsoluteTop =
                this.targetAbsoluteTop +
                    this.targetHeight / 2 -
                    this.stepHeight / 2;
            this.arrowTopPosition = this.stepHeight / 2 - this.arrowSize;
            this.leftPosition =
                this.targetAbsoluteLeft - this.stepWidth - DISTANCE_FROM_TARGET;
            this.stepAbsoluteLeft =
                this.targetAbsoluteLeft - this.stepWidth - DISTANCE_FROM_TARGET;
            this.arrowLeftPosition = this.stepWidth;
            this.adjustTopPosition();
            this.adjustBottomPosition();
            this.arrowPosition = 'right';
            this.autofixLeftPosition();
        };
        JoyrideStepComponent.prototype.setStyleCenter = function () {
            this.renderer.setStyle(this.stepHolder.nativeElement, 'position', 'fixed');
            this.renderer.setStyle(this.stepHolder.nativeElement, 'top', '50%');
            this.renderer.setStyle(this.stepHolder.nativeElement, 'left', '50%');
            this.updateStepDimensions();
            this.renderer.setStyle(this.stepHolder.nativeElement, 'transform', "translate(-" + this.stepWidth / 2 + "px, -" + this.stepHeight / 2 + "px)");
            this.showArrow = false;
        };
        JoyrideStepComponent.prototype.adjustLeftPosition = function () {
            if (this.leftPosition < 0) {
                this.arrowLeftPosition =
                    this.arrowLeftPosition +
                        this.leftPosition -
                        DEFAULT_DISTANCE_FROM_MARGIN_LEFT;
                this.leftPosition = DEFAULT_DISTANCE_FROM_MARGIN_LEFT;
            }
        };
        JoyrideStepComponent.prototype.adjustRightPosition = function () {
            var currentWindowWidth = document.body.clientWidth;
            if (this.stepAbsoluteLeft + this.stepWidth > currentWindowWidth) {
                var newLeftPos = this.leftPosition -
                    (this.stepAbsoluteLeft +
                        this.stepWidth +
                        DEFAULT_DISTANCE_FROM_MARGIN_RIGHT -
                        currentWindowWidth);
                var deltaLeftPosition = newLeftPos - this.leftPosition;
                this.leftPosition = newLeftPos;
                this.arrowLeftPosition = this.arrowLeftPosition - deltaLeftPosition;
            }
        };
        JoyrideStepComponent.prototype.adjustTopPosition = function () {
            if (this.stepAbsoluteTop < 0) {
                this.arrowTopPosition =
                    this.arrowTopPosition +
                        this.topPosition -
                        DEFAULT_DISTANCE_FROM_MARGIN_TOP;
                this.topPosition = DEFAULT_DISTANCE_FROM_MARGIN_TOP;
            }
        };
        JoyrideStepComponent.prototype.adjustBottomPosition = function () {
            if (this.stepAbsoluteTop + this.stepHeight > this.documentHeight) {
                var newTopPos = this.topPosition -
                    (this.stepAbsoluteTop +
                        this.stepHeight +
                        DEFAULT_DISTANCE_FROM_MARGIN_BOTTOM -
                        this.documentHeight);
                var deltaTopPosition = newTopPos - this.topPosition;
                this.topPosition = newTopPos;
                this.arrowTopPosition = this.arrowTopPosition - deltaTopPosition;
            }
        };
        JoyrideStepComponent.prototype.autofixTopPosition = function () {
            if (this.positionAlreadyFixed) {
                this.logger.warn('No step positions found for this step. The step will be centered.');
            }
            else if (this.targetAbsoluteTop - this.stepHeight - this.arrowSize <
                0) {
                this.positionAlreadyFixed = true;
                this.setStyleRight();
            }
        };
        JoyrideStepComponent.prototype.autofixRightPosition = function () {
            if (this.targetAbsoluteLeft +
                this.targetWidth +
                this.stepWidth +
                this.arrowSize >
                document.body.clientWidth) {
                this.setStyleBottom();
            }
        };
        JoyrideStepComponent.prototype.autofixBottomPosition = function () {
            if (this.targetAbsoluteTop +
                this.stepHeight +
                this.arrowSize +
                this.targetHeight >
                this.documentHeight) {
                this.setStyleLeft();
            }
        };
        JoyrideStepComponent.prototype.autofixLeftPosition = function () {
            if (this.targetAbsoluteLeft - this.stepWidth - this.arrowSize < 0) {
                this.setStyleTop();
            }
        };
        JoyrideStepComponent.prototype.subscribeToResizeEvents = function () {
            var _this = this;
            return this.eventListenerService.resizeEvent.subscribe(function () {
                _this.redrawStep();
            });
        };
        JoyrideStepComponent.prototype.redrawStep = function () {
            this.updateStepDimensions();
            this.drawStep();
        };
        JoyrideStepComponent.prototype.getDimensionsByAspectRatio = function (width, height, aspectRatio) {
            var calcHeight = (width + height) / (1 + aspectRatio);
            var calcWidth = calcHeight * aspectRatio;
            return {
                width: calcWidth,
                height: calcHeight
            };
        };
        JoyrideStepComponent.prototype.adjustDimensions = function (width, height) {
            var area = width * height;
            var newWidth = width;
            var newHeight = height;
            if (width > STEP_MAX_WIDTH) {
                newWidth = STEP_MAX_WIDTH;
                newHeight = area / newWidth;
            }
            else if (width < STEP_MIN_WIDTH) {
                newWidth = STEP_MIN_WIDTH;
                newHeight = STEP_MIN_WIDTH / ASPECT_RATIO;
            }
            return {
                width: newWidth,
                height: newHeight
            };
        };
        JoyrideStepComponent.prototype.updateStepDimensions = function () {
            this.stepWidth = this.stepContainer.nativeElement.clientWidth;
            this.stepHeight = this.stepContainer.nativeElement.clientHeight;
        };
        JoyrideStepComponent.prototype.ngOnDestroy = function () {
            this.subscriptions.forEach(function (subscription) {
                subscription.unsubscribe();
            });
        };
        return JoyrideStepComponent;
    }());
    JoyrideStepComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'joyride-step',
                    template: "<div #stepHolder class=\"joyride-step__holder\" [id]=\"'joyride-step-' + step.name\" [style.top.px]=\"topPosition\" [style.left.px]=\"leftPosition\">\r\n    <joyride-arrow *ngIf=\"showArrow\" class=\"joyride-step__arrow\" [position]=\"arrowPosition\" [style.top.px]=\"arrowTopPosition\"\r\n        [style.left.px]=\"arrowLeftPosition\"></joyride-arrow>\r\n    <div #stepContainer class=\"joyride-step__container\">\r\n        <joy-close-button class=\"joyride-step__close\" (click)=\"close()\"></joy-close-button>\r\n        <div class=\"joyride-step__header\">\r\n            <div class=\"joyride-step__title\" [style.color]=\"themeColor\">{{ title | async }}</div>\r\n        </div>\r\n        <div class=\"joyride-step__body\">\r\n            <ng-container *ngTemplateOutlet=\"customContent ? customContent : defaultContent; context: ctx\"></ng-container>\r\n            <ng-template #defaultContent>\r\n                {{ text | async }}\r\n            </ng-template>\r\n        </div>\r\n        <div class=\"joyride-step__footer\">\r\n            <div *ngIf=\"isCounterVisible\" class=\"joyride-step__counter-container\">\r\n                <ng-container *ngTemplateOutlet=\"customCounter ? customCounter : defaultCounter; context: counterData\"></ng-container>\r\n                <ng-template #defaultCounter>\r\n                    <div class=\"joyride-step__counter\">{{ counter }}</div>\r\n                </ng-template>\r\n            </div>\r\n            <div class=\"joyride-step__buttons-container\">\r\n                <div class=\"joyride-step__prev-container joyride-step__button\" *ngIf=\"isPrevButtonVisible && !isFirstStep()\" (click)=\"prev()\">\r\n                    <ng-container *ngTemplateOutlet=\"customPrevButton ? customPrevButton : defaultPrevButton\"></ng-container>\r\n                    <ng-template #defaultPrevButton>\r\n                        <joyride-button class=\"joyride-step__prev-button\" [color]=\"themeColor\">{{ prevText | async }}</joyride-button>\r\n                    </ng-template>\r\n                </div>\r\n                <div class=\"joyride-step__next-container joyride-step__button\" *ngIf=\"!isLastStep(); else doneButton\" (click)=\"next()\">\r\n                    <ng-container *ngTemplateOutlet=\"customNextButton ? customNextButton : defaulNextButton\"></ng-container>\r\n                    <ng-template #defaulNextButton>\r\n                        <joyride-button [color]=\"themeColor\">{{ nextText | async }}</joyride-button>\r\n                    </ng-template>\r\n                </div>\r\n                <ng-template #doneButton>\r\n                    <div class=\"joyride-step__done-container joyride-step__button\" (click)=\"close()\">\r\n                        <ng-container *ngTemplateOutlet=\"customDoneButton ? customDoneButton : defaultDoneButton\"></ng-container>\r\n                        <ng-template #defaultDoneButton>\r\n                            <joyride-button class=\"joyride-step__done-button\" [color]=\"themeColor\">{{ doneText | async }}</joyride-button>\r\n                        </ng-template>\r\n                    </div>\r\n                </ng-template>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>",
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".joyride-step__holder{position:absolute;font-family:Arial,Helvetica,sans-serif;font-size:16px;z-index:1001}.joyride-step__arrow{position:absolute;left:40px;z-index:1002}.joyride-step__container{box-sizing:border-box;position:relative;color:#000;background-color:#fff;display:flex;flex-direction:column;justify-content:space-between;padding:10px;box-shadow:0 0 30px 1px #000}.joyride-step__header{display:flex;align-items:center;padding:8px}.joyride-step__title{font-weight:700;font-size:20px}.joyride-step__close{position:absolute;right:10px;top:10px;width:14px;height:14px;cursor:pointer}.joyride-step__body{text-align:left;padding:10px 8px}.joyride-step__footer{justify-content:space-between;align-items:center;padding-left:8px}.joyride-step__buttons-container,.joyride-step__footer{display:flex;flex-direction:row}.joyride-step__button:first-child{margin-right:2.5px}.joyride-step__button:last-child{margin-left:2.5px}.joyride-step__counter{font-weight:700;font-size:14px}.joyride-step__counter-container{margin-right:10px}"]
                },] }
    ];
    JoyrideStepComponent.ctorParameters = function () { return [
        { type: core.Injector },
        { type: JoyrideStepsContainerService },
        { type: EventListenerService },
        { type: DocumentService },
        { type: core.Renderer2 },
        { type: LoggerService },
        { type: JoyrideOptionsService },
        { type: TemplatesService }
    ]; };
    JoyrideStepComponent.propDecorators = {
        step: [{ type: core.Input }],
        stepHolder: [{ type: core.ViewChild, args: ['stepHolder', { static: true },] }],
        stepContainer: [{ type: core.ViewChild, args: ['stepContainer', { static: true },] }],
        keyEvent: [{ type: core.HostListener, args: ['window:keyup', ['$event'],] }]
    };

    var JoyrideArrowComponent = /** @class */ (function () {
        function JoyrideArrowComponent() {
            this.position = 'top';
        }
        return JoyrideArrowComponent;
    }());
    JoyrideArrowComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'joyride-arrow',
                    template: "<div [class.joyride-arrow__top]=\"position == 'top'\"\r\n     [class.joyride-arrow__bottom]=\"position == 'bottom'\"\r\n     [class.joyride-arrow__left]=\"position == 'left'\"\r\n     [class.joyride-arrow__right]=\"position == 'right'\">\r\n</div>",
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".joyride-arrow__top{border-bottom:11px solid #fff}.joyride-arrow__bottom,.joyride-arrow__top{border-left:11px solid transparent;border-right:11px solid transparent}.joyride-arrow__bottom{border-top:11px solid #fff}.joyride-arrow__right{border-left:11px solid #fff}.joyride-arrow__left,.joyride-arrow__right{border-bottom:11px solid transparent;border-top:11px solid transparent}.joyride-arrow__left{border-right:11px solid #fff}"]
                },] }
    ];
    JoyrideArrowComponent.propDecorators = {
        position: [{ type: core.Input }]
    };

    var JoyrideButtonComponent = /** @class */ (function () {
        function JoyrideButtonComponent() {
            this.clicked = new core.EventEmitter();
        }
        JoyrideButtonComponent.prototype.onClick = function () {
            this.clicked.emit();
        };
        return JoyrideButtonComponent;
    }());
    JoyrideButtonComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'joyride-button',
                    template: "<button (mouseleave)=\"hover=false\" (mouseover)=\"hover=true\"\r\n    [ngStyle]=\"{'background-color': hover ? '#fff' : color, \r\n                'color': hover ? color : '#fff',\r\n                'border-color' : hover ? color : 'transparent'}\"\r\n    class=\"joyride-button\" (click)=\"onClick()\">\r\n    <ng-content></ng-content>\r\n</button>",
                    styles: [".joyride-button{text-transform:uppercase;border:2px solid transparent;outline:none;padding:6px 12px;font-size:12px;font-weight:700;color:#fff;background-color:#3b5560;cursor:pointer}.joyride-button:hover{color:#3b5560;border:2px solid #3b5560;background-color:#fff}"]
                },] }
    ];
    JoyrideButtonComponent.propDecorators = {
        color: [{ type: core.Input }],
        clicked: [{ type: core.Output }]
    };

    var JoyrideCloseButtonComponent = /** @class */ (function () {
        function JoyrideCloseButtonComponent() {
        }
        return JoyrideCloseButtonComponent;
    }());
    JoyrideCloseButtonComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'joy-close-button',
                    template: "<svg viewBox=\"0 0 25 25\" xmlns=\"http://www.w3.org/2000/svg\">\n                <line x1=\"1\" y1=\"24\" \n                    x2=\"24\" y2=\"1\" \n                    stroke=\"black\" \n                    stroke-width=\"3\"/>\n                <line x1=\"1\" y1=\"1\" \n                    x2=\"24\" y2=\"24\" \n                    stroke=\"black\" \n                    stroke-width=\"3\"/>\n            </svg>"
                },] }
    ];

    var StepDrawerService = /** @class */ (function () {
        function StepDrawerService(componentFactoryResolver, appRef, injector) {
            this.componentFactoryResolver = componentFactoryResolver;
            this.appRef = appRef;
            this.injector = injector;
            this.refMap = {};
        }
        StepDrawerService.prototype.draw = function (step) {
            // 1. Create a component reference from the component
            var ref = this.componentFactoryResolver
                .resolveComponentFactory(JoyrideStepComponent)
                .create(this.injector);
            // 2. Attach component to the appRef so that it's inside the ng component tree
            this.appRef.attachView(ref.hostView);
            // 3. Get DOM element from component
            var domElem = ref.hostView
                .rootNodes[0];
            // 4. Append DOM element to the body
            document.body.appendChild(domElem);
            var instance = ref.instance;
            instance.step = step;
            ref.changeDetectorRef.detectChanges();
            step.stepInstance = instance;
            this.refMap[step.name] = ref;
        };
        StepDrawerService.prototype.remove = function (step) {
            this.appRef.detachView(this.refMap[step.name].hostView);
            this.refMap[step.name].destroy();
        };
        return StepDrawerService;
    }());
    StepDrawerService.decorators = [
        { type: core.Injectable }
    ];
    StepDrawerService.ctorParameters = function () { return [
        { type: core.ComponentFactoryResolver },
        { type: core.ApplicationRef },
        { type: core.Injector }
    ]; };

    var SCROLLBAR_SIZE = 20;
    var DISTANCE_FROM_TARGET = 15;
    var ARROW_SIZE = 10;
    var JoyrideStepService = /** @class */ (function () {
        function JoyrideStepService(backDropService, eventListener, stepsContainerService, documentService, DOMService, stepDrawerService, optionsService, router, logger) {
            this.backDropService = backDropService;
            this.eventListener = eventListener;
            this.stepsContainerService = stepsContainerService;
            this.documentService = documentService;
            this.DOMService = DOMService;
            this.stepDrawerService = stepDrawerService;
            this.optionsService = optionsService;
            this.router = router;
            this.logger = logger;
            this.winTopPosition = 0;
            this.winBottomPosition = 0;
            this.stepsObserver = new rxjs.ReplaySubject();
            this.initViewportPositions();
            this.subscribeToScrollEvents();
            this.subscribeToResizeEvents();
        }
        JoyrideStepService.prototype.initViewportPositions = function () {
            this.winTopPosition = 0;
            this.winBottomPosition = this.DOMService.getNativeWindow().innerHeight - SCROLLBAR_SIZE;
        };
        JoyrideStepService.prototype.subscribeToScrollEvents = function () {
            var _this = this;
            this.eventListener.startListeningScrollEvents();
            this.eventListener.scrollEvent.subscribe(function (scroll) {
                _this.winTopPosition = scroll.scrollY;
                _this.winBottomPosition = _this.winTopPosition + _this.DOMService.getNativeWindow().innerHeight - SCROLLBAR_SIZE;
                if (_this.currentStep)
                    _this.backDropService.redraw(_this.currentStep, scroll);
            });
        };
        JoyrideStepService.prototype.subscribeToResizeEvents = function () {
            var _this = this;
            this.eventListener.resizeEvent.subscribe(function () {
                if (_this.currentStep)
                    _this.backDropService.redrawTarget(_this.currentStep);
            });
        };
        JoyrideStepService.prototype.drawStep = function (step) {
            step.position = step.position === NO_POSITION ? this.optionsService.getStepDefaultPosition() : step.position;
            this.stepDrawerService.draw(step);
        };
        JoyrideStepService.prototype.startTour = function () {
            this.stepsObserver = new rxjs.ReplaySubject();
            this.stepsContainerService.init();
            this.documentService.setDocumentHeight();
            this.tryShowStep(exports.StepActionType.NEXT);
            this.eventListener.startListeningResizeEvents();
            this.subscribeToStepsUpdates();
            return this.stepsObserver.asObservable();
        };
        JoyrideStepService.prototype.close = function () {
            this.removeCurrentStep();
            this.notifyTourIsFinished();
            this.DOMService.getNativeWindow().scrollTo(0, 0);
            this.eventListener.stopListeningResizeEvents();
            this.backDropService.remove();
        };
        JoyrideStepService.prototype.prev = function () {
            this.removeCurrentStep();
            this.currentStep.prevCliked.emit();
            this.tryShowStep(exports.StepActionType.PREV);
        };
        JoyrideStepService.prototype.next = function () {
            this.removeCurrentStep();
            this.currentStep.nextClicked.emit();
            this.tryShowStep(exports.StepActionType.NEXT);
        };
        JoyrideStepService.prototype.navigateToStepPage = function (action) {
            var stepRoute = this.stepsContainerService.getStepRoute(action);
            if (stepRoute) {
                this.router.navigate([stepRoute]);
            }
        };
        JoyrideStepService.prototype.subscribeToStepsUpdates = function () {
            var _this = this;
            this.stepsContainerService.stepHasBeenModified.subscribe(function (updatedStep) {
                if (_this.currentStep && _this.currentStep.name === updatedStep.name) {
                    _this.currentStep = updatedStep;
                }
            });
        };
        JoyrideStepService.prototype.tryShowStep = function (actionType) {
            var _this = this;
            this.navigateToStepPage(actionType);
            var timeout = this.optionsService.getWaitingTime();
            if (timeout > 100)
                this.backDropService.remove();
            setTimeout(function () {
                try {
                    _this.showStep(actionType);
                }
                catch (error) {
                    if (error instanceof JoyrideStepDoesNotExist) {
                        _this.tryShowStep(actionType);
                    }
                    else if (error instanceof JoyrideStepOutOfRange) {
                        _this.logger.error('Forcing the tour closure: First or Last step not found in the DOM.');
                        _this.close();
                    }
                    else {
                        throw new Error(error);
                    }
                }
            }, timeout);
        };
        JoyrideStepService.prototype.showStep = function (actionType) {
            this.currentStep = this.stepsContainerService.get(actionType);
            if (this.currentStep == null)
                throw new JoyrideStepDoesNotExist('');
            // Scroll the element to get it visible if it's in a scrollable element
            this.scrollIfElementBeyondOtherElements();
            this.backDropService.draw(this.currentStep);
            this.drawStep(this.currentStep);
            this.scrollIfStepAndTargetAreNotVisible();
            this.notifyStepClicked(actionType);
        };
        JoyrideStepService.prototype.notifyStepClicked = function (actionType) {
            var stepInfo = {
                number: this.stepsContainerService.getStepNumber(this.currentStep.name),
                name: this.currentStep.name,
                route: this.currentStep.route,
                actionType: actionType
            };
            this.stepsObserver.next(stepInfo);
        };
        JoyrideStepService.prototype.notifyTourIsFinished = function () {
            if (this.currentStep)
                this.currentStep.tourDone.emit();
            this.stepsObserver.complete();
        };
        JoyrideStepService.prototype.removeCurrentStep = function () {
            if (this.currentStep)
                this.stepDrawerService.remove(this.currentStep);
        };
        JoyrideStepService.prototype.scrollIfStepAndTargetAreNotVisible = function () {
            this.scrollWhenTargetOrStepAreHiddenBottom();
            this.scrollWhenTargetOrStepAreHiddenTop();
        };
        JoyrideStepService.prototype.scrollWhenTargetOrStepAreHiddenBottom = function () {
            var totalTargetBottom = this.getMaxTargetAndStepBottomPosition();
            if (totalTargetBottom > this.winBottomPosition) {
                this.DOMService.getNativeWindow().scrollBy(0, totalTargetBottom - this.winBottomPosition);
            }
        };
        JoyrideStepService.prototype.scrollWhenTargetOrStepAreHiddenTop = function () {
            var totalTargetTop = this.getMaxTargetAndStepTopPosition();
            if (totalTargetTop < this.winTopPosition) {
                this.DOMService.getNativeWindow().scrollBy(0, totalTargetTop - this.winTopPosition);
            }
        };
        JoyrideStepService.prototype.getMaxTargetAndStepBottomPosition = function () {
            var targetAbsoluteTop = this.documentService.getElementAbsoluteTop(this.currentStep.targetViewContainer.element);
            if (this.currentStep.position === 'top') {
                return targetAbsoluteTop + this.currentStep.stepInstance.targetHeight;
            }
            else if (this.currentStep.position === 'bottom') {
                return (targetAbsoluteTop +
                    this.currentStep.stepInstance.targetHeight +
                    this.currentStep.stepInstance.stepHeight +
                    ARROW_SIZE +
                    DISTANCE_FROM_TARGET);
            }
            else if (this.currentStep.position === 'right' || this.currentStep.position === 'left') {
                return Math.max(targetAbsoluteTop + this.currentStep.stepInstance.targetHeight, targetAbsoluteTop + this.currentStep.stepInstance.targetHeight / 2 + this.currentStep.stepInstance.stepHeight / 2);
            }
        };
        JoyrideStepService.prototype.getMaxTargetAndStepTopPosition = function () {
            var targetAbsoluteTop = this.documentService.getElementAbsoluteTop(this.currentStep.targetViewContainer.element);
            if (this.currentStep.position === 'top') {
                return targetAbsoluteTop - (this.currentStep.stepInstance.stepHeight + ARROW_SIZE + DISTANCE_FROM_TARGET);
            }
            else if (this.currentStep.position === 'bottom') {
                return targetAbsoluteTop;
            }
            else if (this.currentStep.position === 'right' || this.currentStep.position === 'left') {
                return Math.min(targetAbsoluteTop, targetAbsoluteTop + this.currentStep.stepInstance.targetHeight / 2 - this.currentStep.stepInstance.stepHeight / 2);
            }
        };
        JoyrideStepService.prototype.scrollIfElementBeyondOtherElements = function () {
            if (this.isElementBeyondOthers() === 2) {
                this.documentService.scrollToTheTop(this.currentStep.targetViewContainer.element);
            }
            if (this.isElementBeyondOthers() === 2) {
                this.documentService.scrollToTheBottom(this.currentStep.targetViewContainer.element);
            }
            if (this.isElementBeyondOthers() === 1 && this.documentService.isParentScrollable(this.currentStep.targetViewContainer.element)) {
                this.documentService.scrollIntoView(this.currentStep.targetViewContainer.element, this.currentStep.isElementOrAncestorFixed);
            }
            if (this.isElementBeyondOthers() === 1 && this.documentService.isParentScrollable(this.currentStep.targetViewContainer.element)) {
                this.currentStep.targetViewContainer.element.nativeElement.scrollIntoView();
            }
        };
        JoyrideStepService.prototype.isElementBeyondOthers = function () {
            return this.documentService.isElementBeyondOthers(this.currentStep.targetViewContainer.element, this.currentStep.isElementOrAncestorFixed, 'backdrop');
        };
        return JoyrideStepService;
    }());
    JoyrideStepService.decorators = [
        { type: core.Injectable }
    ];
    JoyrideStepService.ctorParameters = function () { return [
        { type: JoyrideBackdropService },
        { type: EventListenerService },
        { type: JoyrideStepsContainerService },
        { type: DocumentService },
        { type: DomRefService },
        { type: StepDrawerService },
        { type: JoyrideOptionsService },
        { type: router.Router },
        { type: LoggerService }
    ]; };

    var JoyrideStepInfo = /** @class */ (function () {
        function JoyrideStepInfo() {
        }
        return JoyrideStepInfo;
    }());

    var JoyrideService = /** @class */ (function () {
        function JoyrideService(platformId, stepService, optionsService) {
            this.platformId = platformId;
            this.stepService = stepService;
            this.optionsService = optionsService;
            this.tourInProgress = false;
        }
        JoyrideService.prototype.startTour = function (options) {
            var _this = this;
            if (!common.isPlatformBrowser(this.platformId)) {
                return rxjs.of(new JoyrideStepInfo());
            }
            if (!this.tourInProgress) {
                this.tourInProgress = true;
                if (options) {
                    this.optionsService.setOptions(options);
                }
                this.tour$ = this.stepService.startTour().pipe(operators.finalize(function () { return (_this.tourInProgress = false); }));
                this.tour$.subscribe();
            }
            return this.tour$;
        };
        JoyrideService.prototype.closeTour = function () {
            if (this.isTourInProgress())
                this.stepService.close();
        };
        JoyrideService.prototype.isTourInProgress = function () {
            return this.tourInProgress;
        };
        return JoyrideService;
    }());
    JoyrideService.decorators = [
        { type: core.Injectable }
    ];
    JoyrideService.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] },
        { type: JoyrideStepService },
        { type: JoyrideOptionsService }
    ]; };

    var routerModuleForChild = router.RouterModule.forChild([]);
    var JoyrideModule = /** @class */ (function () {
        function JoyrideModule() {
        }
        JoyrideModule.forRoot = function () {
            return {
                ngModule: JoyrideModule,
                providers: [
                    JoyrideService,
                    JoyrideStepService,
                    JoyrideStepsContainerService,
                    JoyrideBackdropService,
                    EventListenerService,
                    DocumentService,
                    JoyrideOptionsService,
                    StepDrawerService,
                    DomRefService,
                    LoggerService,
                    TemplatesService,
                ],
            };
        };
        JoyrideModule.forChild = function () {
            return {
                ngModule: JoyrideModule,
                providers: [],
            };
        };
        return JoyrideModule;
    }());
    JoyrideModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule, routerModuleForChild],
                    declarations: [
                        JoyrideDirective,
                        JoyrideStepComponent,
                        JoyrideArrowComponent,
                        JoyrideButtonComponent,
                        JoyrideCloseButtonComponent,
                    ],
                    exports: [JoyrideDirective],
                },] }
    ];

    /*
     * Public API Surface of ngx-joyride
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ARROW_SIZE = ARROW_SIZE;
    exports.DEFAULT_DISTANCE_FROM_MARGIN_LEFT = DEFAULT_DISTANCE_FROM_MARGIN_LEFT;
    exports.DEFAULT_DISTANCE_FROM_MARGIN_TOP = DEFAULT_DISTANCE_FROM_MARGIN_TOP;
    exports.DEFAULT_TEXTS = DEFAULT_TEXTS;
    exports.DEFAULT_THEME_COLOR = DEFAULT_THEME_COLOR;
    exports.DEFAULT_TIMEOUT_BETWEEN_STEPS = DEFAULT_TIMEOUT_BETWEEN_STEPS;
    exports.DISTANCE_FROM_TARGET = DISTANCE_FROM_TARGET;
    exports.DocumentService = DocumentService;
    exports.DomRefService = DomRefService;
    exports.EventListenerService = EventListenerService;
    exports.JoyrideArrowComponent = JoyrideArrowComponent;
    exports.JoyrideBackdropService = JoyrideBackdropService;
    exports.JoyrideButtonComponent = JoyrideButtonComponent;
    exports.JoyrideCloseButtonComponent = JoyrideCloseButtonComponent;
    exports.JoyrideDirective = JoyrideDirective;
    exports.JoyrideModule = JoyrideModule;
    exports.JoyrideOptionsService = JoyrideOptionsService;
    exports.JoyrideService = JoyrideService;
    exports.JoyrideStepComponent = JoyrideStepComponent;
    exports.JoyrideStepService = JoyrideStepService;
    exports.JoyrideStepsContainerService = JoyrideStepsContainerService;
    exports.LoggerService = LoggerService;
    exports.NO_POSITION = NO_POSITION;
    exports.ObservableCustomTexts = ObservableCustomTexts;
    exports.STEP_DEFAULT_POSITION = STEP_DEFAULT_POSITION;
    exports.Scroll = Scroll;
    exports.StepDrawerService = StepDrawerService;
    exports.TemplatesService = TemplatesService;
    exports.routerModuleForChild = routerModuleForChild;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-joyride.umd.js.map
