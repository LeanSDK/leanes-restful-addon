const EventEmitter = require('events');
const { expect, assert } = require('chai');
const addonPath = process.env.ENV === 'build' ? "../../lib/index.dev" : "../../src/index.js";
const RestfulAddon = require(addonPath).default;
const LeanES = require('@leansdk/leanes/src').default;
const {
  initialize, partOf, nameBy, meta, constant, property, plugin
} = LeanES.NS;

describe('HttpRequest', () => {
  describe('.new', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should create HttpRequest instance', () => {
      const KEY = 'TEST_REQUEST_001';

      @initialize
      @plugin(RestfulAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }

      @initialize
      @partOf(Test)
      class ApplicationFacade extends Test.NS.Facade {
        @nameBy static __filename = 'ApplicationFacade';
        @meta static object = {};
      }
      facade = ApplicationFacade.getInstance(KEY);

      @initialize
      @partOf(Test)
      class TestRequest extends Test.NS.HttpRequest {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends Test.NS.HttpMediator {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @partOf(Test)
      class TestRouter extends Test.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.addProxy('TEST_SWITCH_ROUTER', 'TestRouter');
      const router = facade.getProxy('TEST_SWITCH_ROUTER');

      facade.addMediator('TEST_SWITCH_MEDIATOR', 'TestSwitch');
      const switchMediator = facade.getMediator('TEST_SWITCH_MEDIATOR');
      // mediator._routerFactory = () => router;

      class MyResponse extends EventEmitter {
        _headers = {}
        getHeaders() {
          return LeanES.NS.Utils.copy(this._headers);
        }

        getHeader(field) {
          return this._headers[field.toLowerCase()];
        }

        setHeader(field, value) {
          this._headers[field.toLowerCase()] = value;
        }

        removeHeader(field) {
          delete this._headers[field.toLowerCase()];
        }

        end(data, encoding = 'utf-8', callback = () => { }) {
          this.finished = true;
          this.emit('finish', data != null ? typeof data.toString === "function" ? data.toString(encoding) : void 0 : void 0);
          callback();
        }

        constructor(...args) {
          super(...args);
          this.finished = false;
          this._headers = {};
        }
      };
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        },
        socket: {}
      };
      const context = Test.NS.Context.new();
      const request = TestRequest.new();
      request.setContext(context);
      request.setReq(req);
      assert.instanceOf(request, TestRequest, 'The `request` is not an instance of TestRequest');
      assert.equal(request.ctx, context);
      assert.equal(request.ip, '192.168.0.1');
    });
  });
  describe('.req', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get request native value', () => {
      const KEY = 'TEST_REQUEST_002';

      @initialize
      @plugin(RestfulAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }

      @initialize
      @partOf(Test)
      class ApplicationFacade extends Test.NS.Facade {
        @nameBy static __filename = 'ApplicationFacade';
        @meta static object = {};
      }
      facade = ApplicationFacade.getInstance(KEY);

      @initialize
      @partOf(Test)
      class TestRequest extends Test.NS.HttpRequest {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends Test.NS.HttpMediator {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @partOf(Test)
      class TestRouter extends Test.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.addProxy('TEST_SWITCH_ROUTER', 'TestRouter');
      const router = facade.getProxy('TEST_SWITCH_ROUTER');

      facade.addMediator('TEST_SWITCH_MEDIATOR', 'TestSwitch');
      const switchMediator = facade.getMediator('TEST_SWITCH_MEDIATOR');

      class MyResponse extends EventEmitter {
        _headers = {};
        getHeaders() {
          return LeanES.NS.Utils.copy(this._headers);
        }

        getHeader(field) {
          return this._headers[field.toLowerCase()];
        }

        setHeader(field, value) {
          this._headers[field.toLowerCase()] = value;
        }

        removeHeader(field) {
          delete this._headers[field.toLowerCase()];
        }

        end(data, encoding = 'utf-8', callback = () => { }) {
          this.finished = true;
          this.emit('finish', data != null ? typeof data.toString === "function" ? data.toString(encoding) : void 0 : void 0);
          callback();
        }

        constructor(...args) {
          super(...args);
          this.finished = false;
          this._headers = {};
        }
      };
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const context = Test.NS.Context.new();
      const request = TestRequest.new();
      request.setContext(context);
      request.setReq(req);
      context.request = request;
      context.response = Test.NS.HttpResponse.new();
      context.cookies = Test.NS.HttpCookies.new();
      context.setReqResPair(req, res);
      assert.equal(request.req, context.req);
    });
  });
  describe('.switch', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get switch internal value', () => {
      const KEY = 'TEST_REQUEST_003';

      @initialize
      @plugin(RestfulAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }

      @initialize
      @partOf(Test)
      class ApplicationFacade extends Test.NS.Facade {
        @nameBy static __filename = 'ApplicationFacade';
        @meta static object = {};
      }
      facade = ApplicationFacade.getInstance(KEY);

      @initialize
      @partOf(Test)
      class TestRequest extends Test.NS.HttpRequest {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends Test.NS.HttpMediator {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @partOf(Test)
      class TestRouter extends Test.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.addProxy('TEST_SWITCH_ROUTER', 'TestRouter');
      const router = facade.getProxy('TEST_SWITCH_ROUTER');

      facade.addMediator('TEST_SWITCH_MEDIATOR', 'TestSwitch');
      const switchMediator = facade.getMediator('TEST_SWITCH_MEDIATOR');

      class MyResponse extends EventEmitter {
        _headers = {};
        getHeaders() {
          return LeanES.NS.Utils.copy(this._headers);
        }

        getHeader(field) {
          return this._headers[field.toLowerCase()];
        }

        setHeader(field, value) {
          this._headers[field.toLowerCase()] = value;
        }

        removeHeader(field) {
          delete this._headers[field.toLowerCase()];
        }

        end(data, encoding = 'utf-8', callback = () => { }) {
          this.finished = true;
          this.emit('finish', data != null ? typeof data.toString === "function" ? data.toString(encoding) : void 0 : void 0);
          callback();
        }

        constructor(...args) {
          super(...args);
          this.finished = false;
          this._headers = {};
        }
      };
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const context = Test.NS.Context.new();
      const request = TestRequest.new();
      request.setContext(context);
      request.setReq(req);
      assert.equal(request.switch, context.switch);
    });
  });
  describe('.headers', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get headers value', () => {
      const KEY = 'TEST_REQUEST_004';

      @initialize
      @plugin(RestfulAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }

      @initialize
      @partOf(Test)
      class ApplicationFacade extends Test.NS.Facade {
        @nameBy static __filename = 'ApplicationFacade';
        @meta static object = {};
      }
      facade = ApplicationFacade.getInstance(KEY);

      @initialize
      @partOf(Test)
      class TestRequest extends Test.NS.HttpRequest {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends Test.NS.HttpMediator {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @partOf(Test)
      class TestRouter extends Test.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.addProxy('TEST_SWITCH_ROUTER', 'TestRouter');
      const router = facade.getProxy('TEST_SWITCH_ROUTER');

      facade.addMediator('TEST_SWITCH_MEDIATOR', 'TestSwitch');
      const switchMediator = facade.getMediator('TEST_SWITCH_MEDIATOR');

      class MyResponse extends EventEmitter {
        _headers = {};
        getHeaders() {
          return LeanES.NS.Utils.copy(this._headers);
        }

        getHeader(field) {
          return this._headers[field.toLowerCase()];
        }

        setHeader(field, value) {
          this._headers[field.toLowerCase()] = value;
        }

        removeHeader(field) {
          delete this._headers[field.toLowerCase()];
        }

        end(data, encoding = 'utf-8', callback = () => { }) {
          this.finished = true;
          this.emit('finish', data != null ? typeof data.toString === "function" ? data.toString(encoding) : void 0 : void 0);
          callback();
        }

        constructor(...args) {
          super(...args);
          this.finished = false;
          this._headers = {};
        }
      };
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const context = Test.NS.Context.new();
      const request = TestRequest.new();
      request.setContext(context);
      request.setReq(req);
      context.request = request;
      context.response = Test.NS.HttpResponse.new();
      context.cookies = Test.NS.HttpCookies.new();
      context.setReqResPair(req, res);
      assert.equal(request.headers, context.req.headers);
    });
  });
  describe('.header', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get header value', () => {
      const KEY = 'TEST_REQUEST_005';

      @initialize
      @plugin(RestfulAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }

      @initialize
      @partOf(Test)
      class ApplicationFacade extends Test.NS.Facade {
        @nameBy static __filename = 'ApplicationFacade';
        @meta static object = {};
      }
      facade = ApplicationFacade.getInstance(KEY);

      @initialize
      @partOf(Test)
      class TestRequest extends Test.NS.HttpRequest {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends Test.NS.HttpMediator {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @partOf(Test)
      class TestRouter extends Test.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.addProxy('TEST_SWITCH_ROUTER', 'TestRouter');
      const router = facade.getProxy('TEST_SWITCH_ROUTER');

      facade.addMediator('TEST_SWITCH_MEDIATOR', 'TestSwitch');
      const switchMediator = facade.getMediator('TEST_SWITCH_MEDIATOR');

      class MyResponse extends EventEmitter {
        _headers = {};
        getHeaders() {
          return LeanES.NS.Utils.copy(this._headers);
        }

        getHeader(field) {
          return this._headers[field.toLowerCase()];
        }

        setHeader(field, value) {
          this._headers[field.toLowerCase()] = value;
        }

        removeHeader(field) {
          delete this._headers[field.toLowerCase()];
        }

        end(data, encoding = 'utf-8', callback = () => { }) {
          this.finished = true;
          this.emit('finish', data != null ? typeof data.toString === "function" ? data.toString(encoding) : void 0 : void 0);
          callback();
        }

        constructor(...args) {
          super(...args);
          this.finished = false;
          this._headers = {};
        }
      };
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const context = Test.NS.Context.new();
      const request = TestRequest.new();
      request.setContext(context);
      request.setReq(req);
      context.request = request;
      context.response = Test.NS.HttpResponse.new();
      context.cookies = Test.NS.HttpCookies.new();
      context.setReqResPair(req, res);
      assert.equal(request.header, context.req.headers);
    });
  });
  describe('.originalUrl', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get original URL', () => {
      const KEY = 'TEST_REQUEST_006';

      @initialize
      @plugin(RestfulAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }

      @initialize
      @partOf(Test)
      class ApplicationFacade extends Test.NS.Facade {
        @nameBy static __filename = 'ApplicationFacade';
        @meta static object = {};
      }
      facade = ApplicationFacade.getInstance(KEY);

      @initialize
      @partOf(Test)
      class TestRequest extends Test.NS.HttpRequest {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends Test.NS.HttpMediator {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @partOf(Test)
      class TestRouter extends Test.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.addProxy('TEST_SWITCH_ROUTER', 'TestRouter');
      const router = facade.getProxy('TEST_SWITCH_ROUTER');

      facade.addMediator('TEST_SWITCH_MEDIATOR', 'TestSwitch');
      const switchMediator = facade.getMediator('TEST_SWITCH_MEDIATOR');

      class MyResponse extends EventEmitter {
        _headers = {};
        getHeaders() {
          return LeanES.NS.Utils.copy(this._headers);
        }

        getHeader(field) {
          return this._headers[field.toLowerCase()];
        }

        setHeader(field, value) {
          this._headers[field.toLowerCase()] = value;
        }

        removeHeader(field) {
          delete this._headers[field.toLowerCase()];
        }

        end(data, encoding = 'utf-8', callback = () => { }) {
          this.finished = true;
          this.emit('finish', data != null ? typeof data.toString === "function" ? data.toString(encoding) : void 0 : void 0);
          callback();
        }

        constructor(...args) {
          super(...args);
          this.finished = false;
          this._headers = {};
        }
      };
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const context = Test.NS.Context.new();
      const request = TestRequest.new();
      request.setContext(context);
      request.setReq(req);
      context.request = request;
      context.response = Test.NS.HttpResponse.new();
      context.cookies = Test.NS.HttpCookies.new();
      context.setReqResPair(req, res);
      assert.equal(request.originalUrl, context.originalUrl);
    });
  });
  describe('.url', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should set and get native request URL', () => {
      const KEY = 'TEST_REQUEST_007';

      @initialize
      @plugin(RestfulAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }

      @initialize
      @partOf(Test)
      class ApplicationFacade extends Test.NS.Facade {
        @nameBy static __filename = 'ApplicationFacade';
        @meta static object = {};
      }
      facade = ApplicationFacade.getInstance(KEY);

      @initialize
      @partOf(Test)
      class TestRequest extends Test.NS.HttpRequest {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends Test.NS.HttpMediator {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @partOf(Test)
      class TestRouter extends Test.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.addProxy('TEST_SWITCH_ROUTER', 'TestRouter');
      const router = facade.getProxy('TEST_SWITCH_ROUTER');

      facade.addMediator('TEST_SWITCH_MEDIATOR', 'TestSwitch');
      const switchMediator = facade.getMediator('TEST_SWITCH_MEDIATOR');

      class MyResponse extends EventEmitter {
        _headers = {};
        getHeaders() {
          return LeanES.NS.Utils.copy(this._headers);
        }

        getHeader(field) {
          return this._headers[field.toLowerCase()];
        }

        setHeader(field, value) {
          this._headers[field.toLowerCase()] = value;
        }

        removeHeader(field) {
          delete this._headers[field.toLowerCase()];
        }

        end(data, encoding = 'utf-8', callback = () => { }) {
          this.finished = true;
          this.emit('finish', data != null ? typeof data.toString === "function" ? data.toString(encoding) : void 0 : void 0);
          callback();
        }

        constructor(...args) {
          super(...args);
          this.finished = false;
          this._headers = {};
        }
      };
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const context = Test.NS.Context.new();
      const request = TestRequest.new();
      request.setContext(context);
      request.setReq(req);
      context.request = request;
      context.response = Test.NS.HttpResponse.new();
      context.cookies = Test.NS.HttpCookies.new();
      context.setReqResPair(req, res);
      assert.equal(request.url, 'http://localhost:8888');
      request.url = 'http://localhost:9999';
      assert.equal(request.url, 'http://localhost:9999');
      assert.equal(context.req.url, 'http://localhost:9999');
    });
  });
  describe('.socket', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get request socket', () => {
      const KEY = 'TEST_REQUEST_008';

      @initialize
      @plugin(RestfulAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }

      @initialize
      @partOf(Test)
      class ApplicationFacade extends Test.NS.Facade {
        @nameBy static __filename = 'ApplicationFacade';
        @meta static object = {};
      }
      facade = ApplicationFacade.getInstance(KEY);

      @initialize
      @partOf(Test)
      class TestRequest extends Test.NS.HttpRequest {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends Test.NS.HttpMediator {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @partOf(Test)
      class TestRouter extends Test.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.addProxy('TEST_SWITCH_ROUTER', 'TestRouter');
      const router = facade.getProxy('TEST_SWITCH_ROUTER');

      facade.addMediator('TEST_SWITCH_MEDIATOR', 'TestSwitch');
      const switchMediator = facade.getMediator('TEST_SWITCH_MEDIATOR');

      class MyResponse extends EventEmitter {
        _headers = {};
        getHeaders() {
          return LeanES.NS.Utils.copy(this._headers);
        }

        getHeader(field) {
          return this._headers[field.toLowerCase()];
        }

        setHeader(field, value) {
          this._headers[field.toLowerCase()] = value;
        }

        removeHeader(field) {
          delete this._headers[field.toLowerCase()];
        }

        end(data, encoding = 'utf-8', callback = () => { }) {
          this.finished = true;
          this.emit('finish', data != null ? typeof data.toString === "function" ? data.toString(encoding) : void 0 : void 0);
          callback();
        }

        constructor(...args) {
          super(...args);
          this.finished = false;
          this._headers = {};
        }
      };
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        },
        socket: {}
      };
      const context = Test.NS.Context.new();
      const request = TestRequest.new();
      request.setContext(context);
      request.setReq(req);
      context.request = request;
      context.response = Test.NS.HttpResponse.new();
      context.cookies = Test.NS.HttpCookies.new();
      context.setReqResPair(req, res);
      assert.equal(request.socket, context.req.socket);
    });
  });
  describe('.protocol', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get request protocol name', () => {
      const KEY = 'TEST_REQUEST_009';

      @initialize
      @plugin(RestfulAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }

      @initialize
      @partOf(Test)
      class ApplicationFacade extends Test.NS.Facade {
        @nameBy static __filename = 'ApplicationFacade';
        @meta static object = {};
      }
      facade = ApplicationFacade.getInstance(KEY);

      @initialize
      @partOf(Test)
      class TestRequest extends Test.NS.HttpRequest {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends Test.NS.HttpMediator {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @partOf(Test)
      class TestRouter extends Test.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.addProxy('TEST_SWITCH_ROUTER', 'TestRouter');
      const router = facade.getProxy('TEST_SWITCH_ROUTER');

      facade.addMediator('TEST_SWITCH_MEDIATOR', 'TestSwitch');
      const switchMediator = facade.getMediator('TEST_SWITCH_MEDIATOR');

      class MyResponse extends EventEmitter {
        _headers = {};
        getHeaders() {
          return LeanES.NS.Utils.copy(this._headers);
        }

        getHeader(field) {
          return this._headers[field.toLowerCase()];
        }

        setHeader(field, value) {
          this._headers[field.toLowerCase()] = value;
        }

        removeHeader(field) {
          delete this._headers[field.toLowerCase()];
        }

        end(data, encoding = 'utf-8', callback = () => { }) {
          this.finished = true;
          this.emit('finish', data != null ? typeof data.toString === "function" ? data.toString(encoding) : void 0 : void 0);
          callback();
        }

        constructor(...args) {
          super(...args);
          this.finished = false;
          this._headers = {};
        }
      };
      let res = new MyResponse();
      let req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      let context = Test.NS.Context.new();
      let request = TestRequest.new();
      request.setContext(context);
      request.setReq(req);
      assert.equal(request.protocol, 'http');

      req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        },
        socket: {
          encrypted: true
        }
      };
      context = Test.NS.Context.new();
      request = TestRequest.new();
      request.setContext(context);
      request.setReq(req);
      assert.equal(request.protocol, 'https');

      req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        },
        secure: true
      };
      context = Test.NS.Context.new();
      request = TestRequest.new();
      request.setContext(context);
      request.setReq(req);
      assert.equal(request.protocol, 'https');

      req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1',
          'x-forwarded-proto': 'https'
        }
      };
      context = Test.NS.Context.new();
      request = TestRequest.new();
      request.setContext(context);
      request.setReq(req);
      request.configs = {
        trustProxy: true
      };
      assert.equal(request.protocol, 'https');
    });
  });
  describe('.get', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get single header', () => {
      const KEY = 'TEST_REQUEST_010';

      @initialize
      @plugin(RestfulAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }

      @initialize
      @partOf(Test)
      class ApplicationFacade extends Test.NS.Facade {
        @nameBy static __filename = 'ApplicationFacade';
        @meta static object = {};
      }
      facade = ApplicationFacade.getInstance(KEY);

      @initialize
      @partOf(Test)
      class TestRequest extends Test.NS.HttpRequest {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends Test.NS.HttpMediator {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @partOf(Test)
      class TestRouter extends Test.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.addProxy('TEST_SWITCH_ROUTER', 'TestRouter');
      const router = facade.getProxy('TEST_SWITCH_ROUTER');

      facade.addMediator('TEST_SWITCH_MEDIATOR', 'TestSwitch');
      const switchMediator = facade.getMediator('TEST_SWITCH_MEDIATOR');

      class MyResponse extends EventEmitter {
        _headers = {};
        getHeaders() {
          return LeanES.NS.Utils.copy(this._headers);
        }

        getHeader(field) {
          return this._headers[field.toLowerCase()];
        }

        setHeader(field, value) {
          this._headers[field.toLowerCase()] = value;
        }

        removeHeader(field) {
          delete this._headers[field.toLowerCase()];
        }

        end(data, encoding = 'utf-8', callback = () => { }) {
          this.finished = true;
          this.emit('finish', data != null ? typeof data.toString === "function" ? data.toString(encoding) : void 0 : void 0);
          callback();
        }

        constructor(...args) {
          super(...args);
          this.finished = false;
          this._headers = {};
        }
      };
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'referrer': 'localhost',
          'x-forwarded-for': '192.168.0.1',
          'x-forwarded-proto': 'https',
          'abc': 'def'
        }
      };
      const context = Test.NS.Context.new();
      const request = TestRequest.new();
      request.setContext(context);
      request.setReq(req);
      assert.equal(request.get('Referrer'), 'localhost');
      assert.equal(request.get('X-Forwarded-For'), '192.168.0.1');
      assert.equal(request.get('X-Forwarded-Proto'), 'https');
      assert.equal(request.get('Abc'), 'def');
      assert.equal(request.get('123'), '');
    });
  });
  describe('.host', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get full host name with port', () => {
      const KEY = 'TEST_REQUEST_011';

      @initialize
      @plugin(RestfulAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }

      @initialize
      @partOf(Test)
      class ApplicationFacade extends Test.NS.Facade {
        @nameBy static __filename = 'ApplicationFacade';
        @meta static object = {};
      }
      facade = ApplicationFacade.getInstance(KEY);

      @initialize
      @partOf(Test)
      class TestRequest extends Test.NS.HttpRequest {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends Test.NS.HttpMediator {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @partOf(Test)
      class TestRouter extends Test.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.addProxy('TEST_SWITCH_ROUTER', 'TestRouter');
      const router = facade.getProxy('TEST_SWITCH_ROUTER');

      facade.addMediator('TEST_SWITCH_MEDIATOR', 'TestSwitch');
      const switchMediator = facade.getMediator('TEST_SWITCH_MEDIATOR');

      class MyResponse extends EventEmitter {
        _headers = {};
        getHeaders() {
          return LeanES.NS.Utils.copy(this._headers);
        }

        getHeader(field) {
          return this._headers[field.toLowerCase()];
        }

        setHeader(field, value) {
          this._headers[field.toLowerCase()] = value;
        }

        removeHeader(field) {
          delete this._headers[field.toLowerCase()];
        }

        end(data, encoding = 'utf-8', callback = () => { }) {
          this.finished = true;
          this.emit('finish', data != null ? typeof data.toString === "function" ? data.toString(encoding) : void 0 : void 0);
          callback();
        }

        constructor(...args) {
          super(...args);
          this.finished = false;
          this._headers = {};
        }
      };
      let res = new MyResponse();
      let req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1',
          'host': 'localhost:9999'
        }
      };
      let context = Test.NS.Context.new();
      let request = TestRequest.new();
      request.setContext(context);
      request.setReq(req);
      assert.equal(request.host, 'localhost:9999');

      req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1',
          'x-forwarded-host': 'localhost:8888, localhost:9999'
        }
      };
      context = Test.NS.Context.new();
      request = TestRequest.new();
      request.setContext(context);
      request.setReq(req);
      request.configs = {
        trustProxy: true
      };
      assert.equal(request.host, 'localhost:8888');

      req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      context = Test.NS.Context.new();
      request = TestRequest.new();
      request.setContext(context);
      request.setReq(req);
      assert.equal(request.host, '');
    });
  });
  describe('.origin', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get request origin', () => {
      const KEY = 'TEST_REQUEST_012';

      @initialize
      @plugin(RestfulAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }

      @initialize
      @partOf(Test)
      class ApplicationFacade extends Test.NS.Facade {
        @nameBy static __filename = 'ApplicationFacade';
        @meta static object = {};
      }
      facade = ApplicationFacade.getInstance(KEY);

      @initialize
      @partOf(Test)
      class TestRequest extends Test.NS.HttpRequest {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends Test.NS.HttpMediator {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @partOf(Test)
      class TestRouter extends Test.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.addProxy('TEST_SWITCH_ROUTER', 'TestRouter');
      const router = facade.getProxy('TEST_SWITCH_ROUTER');

      facade.addMediator('TEST_SWITCH_MEDIATOR', 'TestSwitch');
      const switchMediator = facade.getMediator('TEST_SWITCH_MEDIATOR');

      class MyResponse extends EventEmitter {
        _headers = {};
        getHeaders() {
          return LeanES.NS.Utils.copy(this._headers);
        }

        getHeader(field) {
          return this._headers[field.toLowerCase()];
        }

        setHeader(field, value) {
          this._headers[field.toLowerCase()] = value;
        }

        removeHeader(field) {
          delete this._headers[field.toLowerCase()];
        }

        end(data, encoding = 'utf-8', callback = () => { }) {
          this.finished = true;
          this.emit('finish', data != null ? typeof data.toString === "function" ? data.toString(encoding) : void 0 : void 0);
          callback();
        }

        constructor(...args) {
          super(...args);
          this.finished = false;
          this._headers = {};
        }
      };
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1',
          'x-forwarded-proto': 'https',
          'x-forwarded-host': 'localhost:9999'
        }
      };
      const context = Test.NS.Context.new();
      const request = TestRequest.new();
      request.setContext(context);
      request.setReq(req);
      request.configs = {
        trustProxy: true
      };
      assert.equal(request.origin, 'https://localhost:9999');
    });
  });
  describe('.href', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get request hyper reference', () => {
      const KEY = 'TEST_REQUEST_013';

      @initialize
      @plugin(RestfulAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }

      @initialize
      @partOf(Test)
      class ApplicationFacade extends Test.NS.Facade {
        @nameBy static __filename = 'ApplicationFacade';
        @meta static object = {};
      }
      facade = ApplicationFacade.getInstance(KEY);

      @initialize
      @partOf(Test)
      class TestRequest extends Test.NS.HttpRequest {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends Test.NS.HttpMediator {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @partOf(Test)
      class TestRouter extends Test.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.addProxy('TEST_SWITCH_ROUTER', 'TestRouter');
      const router = facade.getProxy('TEST_SWITCH_ROUTER');

      facade.addMediator('TEST_SWITCH_MEDIATOR', 'TestSwitch');
      const switchMediator = facade.getMediator('TEST_SWITCH_MEDIATOR');

      class MyResponse extends EventEmitter {
        _headers = {};
        getHeaders() {
          return LeanES.NS.Utils.copy(this._headers);
        }

        getHeader(field) {
          return this._headers[field.toLowerCase()];
        }

        setHeader(field, value) {
          this._headers[field.toLowerCase()] = value;
        }

        removeHeader(field) {
          delete this._headers[field.toLowerCase()];
        }

        end(data, encoding = 'utf-8', callback = () => { }) {
          this.finished = true;
          this.emit('finish', data != null ? typeof data.toString === "function" ? data.toString(encoding) : void 0 : void 0);
          callback();
        }

        constructor(...args) {
          super(...args);
          this.finished = false;
          this._headers = {};
        }
      };
      let res = new MyResponse();
      let req = {
        url: 'http://localhost:8888/test',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      let context = Test.NS.Context.new();
      let request = TestRequest.new();
      request.setContext(context);
      request.setReq(req);
      request.configs = {
        trustProxy: true
      };
      context.request = request;
      context.response = Test.NS.HttpResponse.new();
      context.cookies = Test.NS.HttpCookies.new();
      context.setReqResPair(req, res);
      assert.equal(request.href, 'http://localhost:8888/test');

      req = {
        url: '/test',
        headers: {
          'x-forwarded-for': '192.168.0.1',
          'x-forwarded-proto': 'https',
          'x-forwarded-host': 'localhost:9999'
        }
      };
      context = Test.NS.Context.new();
      request = TestRequest.new();
      request.setContext(context);
      request.setReq(req);
      request.configs = {
        trustProxy: true
      };
      context.request = request;
      context.response = Test.NS.HttpResponse.new();
      context.cookies = Test.NS.HttpCookies.new();
      context.setReqResPair(req, res);
      assert.equal(request.href, 'https://localhost:9999/test');
    });
  });
  describe('.method', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get and set request method', () => {
      const KEY = 'TEST_REQUEST_014';

      @initialize
      @plugin(RestfulAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }

      @initialize
      @partOf(Test)
      class ApplicationFacade extends Test.NS.Facade {
        @nameBy static __filename = 'ApplicationFacade';
        @meta static object = {};
      }
      facade = ApplicationFacade.getInstance(KEY);

      @initialize
      @partOf(Test)
      class TestRequest extends Test.NS.HttpRequest {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends Test.NS.HttpMediator {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @partOf(Test)
      class TestRouter extends Test.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.addProxy('TEST_SWITCH_ROUTER', 'TestRouter');
      const router = facade.getProxy('TEST_SWITCH_ROUTER');

      facade.addMediator('TEST_SWITCH_MEDIATOR', 'TestSwitch');
      const switchMediator = facade.getMediator('TEST_SWITCH_MEDIATOR');

      class MyResponse extends EventEmitter {
        _headers = {};
        getHeaders() {
          return LeanES.NS.Utils.copy(this._headers);
        }

        getHeader(field) {
          return this._headers[field.toLowerCase()];
        }

        setHeader(field, value) {
          this._headers[field.toLowerCase()] = value;
        }

        removeHeader(field) {
          delete this._headers[field.toLowerCase()];
        }

        end(data, encoding = 'utf-8', callback = () => { }) {
          this.finished = true;
          this.emit('finish', data != null ? typeof data.toString === "function" ? data.toString(encoding) : void 0 : void 0);
          callback();
        }

        constructor(...args) {
          super(...args);
          this.finished = false;
          this._headers = {};
        }
      };
      const res = new MyResponse();
      const req = {
        url: '/test',
        method: 'POST',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const context = Test.NS.Context.new();
      const request = TestRequest.new();
      request.setContext(context);
      request.setReq(req);
      assert.equal(request.method, 'POST');
      request.method = 'PUT';
      assert.equal(request.method, 'PUT');
      assert.equal(req.method, 'PUT');
    });
  });
  describe('.path', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get and set request path', () => {
      const KEY = 'TEST_REQUEST_015';
      @initialize
      @plugin(RestfulAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }

      @initialize
      @partOf(Test)
      class ApplicationFacade extends Test.NS.Facade {
        @nameBy static __filename = 'ApplicationFacade';
        @meta static object = {};
      }
      facade = ApplicationFacade.getInstance(KEY);

      @initialize
      @partOf(Test)
      class TestRequest extends Test.NS.HttpRequest {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends Test.NS.HttpMediator {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @partOf(Test)
      class TestRouter extends Test.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.addProxy('TEST_SWITCH_ROUTER', 'TestRouter');
      const router = facade.getProxy('TEST_SWITCH_ROUTER');

      facade.addMediator('TEST_SWITCH_MEDIATOR', 'TestSwitch');
      const switchMediator = facade.getMediator('TEST_SWITCH_MEDIATOR');

      class MyResponse extends EventEmitter {
        _headers = {};
        getHeaders() {
          return LeanES.NS.Utils.copy(this._headers);
        }

        getHeader(field) {
          return this._headers[field.toLowerCase()];
        }

        setHeader(field, value) {
          this._headers[field.toLowerCase()] = value;
        }

        removeHeader(field) {
          delete this._headers[field.toLowerCase()];
        }

        end(data, encoding = 'utf-8', callback = () => { }) {
          this.finished = true;
          this.emit('finish', data != null ? typeof data.toString === "function" ? data.toString(encoding) : void 0 : void 0);
          callback();
        }

        constructor(...args) {
          super(...args);
          this.finished = false;
          this._headers = {};
        }
      };
      const res = new MyResponse();
      const req = {
        url: 'https://localhost:8888/test?t=ttt',
        method: 'POST',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const context = Test.NS.Context.new();
      const request = TestRequest.new();
      request.setContext(context);
      request.setReq(req);
      assert.equal(request.path, '/test');
      request.path = '/test1';
      assert.equal(request.path, '/test1');
      assert.equal(request.url, 'https://localhost:8888/test1?t=ttt');
    });
  });
  describe('.querystring', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get and set query string', () => {
      const KEY = 'TEST_REQUEST_016';

      @initialize
      @plugin(RestfulAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }

      @initialize
      @partOf(Test)
      class ApplicationFacade extends Test.NS.Facade {
        @nameBy static __filename = 'ApplicationFacade';
        @meta static object = {};
      }
      facade = ApplicationFacade.getInstance(KEY);

      @initialize
      @partOf(Test)
      class TestRequest extends Test.NS.HttpRequest {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends Test.NS.HttpMediator {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @partOf(Test)
      class TestRouter extends Test.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.addProxy('TEST_SWITCH_ROUTER', 'TestRouter');
      const router = facade.getProxy('TEST_SWITCH_ROUTER');

      facade.addMediator('TEST_SWITCH_MEDIATOR', 'TestSwitch');
      const switchMediator = facade.getMediator('TEST_SWITCH_MEDIATOR');

      class MyResponse extends EventEmitter {
        _headers = {};
        getHeaders() {
          return LeanES.NS.Utils.copy(this._headers);
        }

        getHeader(field) {
          return this._headers[field.toLowerCase()];
        }

        setHeader(field, value) {
          this._headers[field.toLowerCase()] = value;
        }

        removeHeader(field) {
          delete this._headers[field.toLowerCase()];
        }

        end(data, encoding = 'utf-8', callback = () => { }) {
          this.finished = true;
          this.emit('finish', data != null ? typeof data.toString === "function" ? data.toString(encoding) : void 0 : void 0);
          callback();
        }

        constructor(...args) {
          super(...args);
          this.finished = false;
          this._headers = {};
        }
      };
      const res = new MyResponse();
      const req = {
        url: 'https://localhost:8888/test?t=ttt',
        method: 'POST',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const context = Test.NS.Context.new();
      const request = TestRequest.new();
      request.setContext(context);
      request.setReq(req);
      assert.equal(request.querystring, 't=ttt');
      request.querystring = 'a=aaa';
      assert.equal(request.querystring, 'a=aaa');
      assert.equal(req.url, 'https://localhost:8888/test?a=aaa');
    });
  });
  describe('.search', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get and set search string', () => {
      const KEY = 'TEST_REQUEST_017';

      @initialize
      @plugin(RestfulAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }

      @initialize
      @partOf(Test)
      class ApplicationFacade extends Test.NS.Facade {
        @nameBy static __filename = 'ApplicationFacade';
        @meta static object = {};
      }
      facade = ApplicationFacade.getInstance(KEY);

      @initialize
      @partOf(Test)
      class TestRequest extends Test.NS.HttpRequest {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends Test.NS.HttpMediator {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @partOf(Test)
      class TestRouter extends Test.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.addProxy('TEST_SWITCH_ROUTER', 'TestRouter');
      const router = facade.getProxy('TEST_SWITCH_ROUTER');

      facade.addMediator('TEST_SWITCH_MEDIATOR', 'TestSwitch');
      const switchMediator = facade.getMediator('TEST_SWITCH_MEDIATOR');

      class MyResponse extends EventEmitter {
        _headers = {};
        getHeaders() {
          return LeanES.NS.Utils.copy(this._headers);
        }

        getHeader(field) {
          return this._headers[field.toLowerCase()];
        }

        setHeader(field, value) {
          this._headers[field.toLowerCase()] = value;
        }

        removeHeader(field) {
          delete this._headers[field.toLowerCase()];
        }

        end(data, encoding = 'utf-8', callback = () => { }) {
          this.finished = true;
          this.emit('finish', data != null ? typeof data.toString === "function" ? data.toString(encoding) : void 0 : void 0);
          callback();
        }

        constructor(...args) {
          super(...args);
          this.finished = false;
          this._headers = {};
        }
      };
      const res = new MyResponse();
      const req = {
        url: 'https://localhost:8888/test?t=ttt',
        method: 'POST',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const context = Test.NS.Context.new();
      const request = TestRequest.new();
      request.setContext(context);
      request.setReq(req);
      assert.equal(request.search, '?t=ttt');
      request.search = 'a=aaa';
      assert.equal(request.search, '?a=aaa');
      assert.equal(req.url, 'https://localhost:8888/test?a=aaa');
    });
  });
  describe('.query', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get and set query params', () => {
      const KEY = 'TEST_REQUEST_018';

      @initialize
      @plugin(RestfulAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }

      @initialize
      @partOf(Test)
      class ApplicationFacade extends Test.NS.Facade {
        @nameBy static __filename = 'ApplicationFacade';
        @meta static object = {};
      }
      facade = ApplicationFacade.getInstance(KEY);

      @initialize
      @partOf(Test)
      class TestRequest extends Test.NS.HttpRequest {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends Test.NS.HttpMediator {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @partOf(Test)
      class TestRouter extends Test.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.addProxy('TEST_SWITCH_ROUTER', 'TestRouter');
      const router = facade.getProxy('TEST_SWITCH_ROUTER');

      facade.addMediator('TEST_SWITCH_MEDIATOR', 'TestSwitch');
      const switchMediator = facade.getMediator('TEST_SWITCH_MEDIATOR');

      class MyResponse extends EventEmitter {
        _headers = {};
        getHeaders() {
          return LeanES.NS.Utils.copy(this._headers);
        }

        getHeader(field) {
          return this._headers[field.toLowerCase()];
        }

        setHeader(field, value) {
          this._headers[field.toLowerCase()] = value;
        }

        removeHeader(field) {
          delete this._headers[field.toLowerCase()];
        }

        end(data, encoding = 'utf-8', callback = () => { }) {
          this.finished = true;
          this.emit('finish', data != null ? typeof data.toString === "function" ? data.toString(encoding) : void 0 : void 0);
          callback();
        }

        constructor(...args) {
          super(...args);
          this.finished = false;
          this._headers = {};
        }
      };
      const res = new MyResponse();
      const req = {
        url: 'https://localhost:8888/test?t=ttt',
        method: 'POST',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const context = Test.NS.Context.new();
      const request = TestRequest.new();
      request.setContext(context);
      request.setReq(req);
      assert.deepEqual(request.query, {
        t: 'ttt'
      });
      request.query = {
        a: 'aaa'
      };
      assert.deepEqual(request.query, {
        a: 'aaa'
      });
      assert.equal(req.url, 'https://localhost:8888/test?a=aaa');
    });
  });
  describe('.hostname', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get host name without port', () => {
      const KEY = 'TEST_REQUEST_019';

      @initialize
      @plugin(RestfulAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }

      @initialize
      @partOf(Test)
      class ApplicationFacade extends Test.NS.Facade {
        @nameBy static __filename = 'ApplicationFacade';
        @meta static object = {};
      }
      facade = ApplicationFacade.getInstance(KEY);

      @initialize
      @partOf(Test)
      class TestRequest extends Test.NS.HttpRequest {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends Test.NS.HttpMediator {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @partOf(Test)
      class TestRouter extends Test.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.addProxy('TEST_SWITCH_ROUTER', 'TestRouter');
      const router = facade.getProxy('TEST_SWITCH_ROUTER');

      facade.addMediator('TEST_SWITCH_MEDIATOR', 'TestSwitch');
      const switchMediator = facade.getMediator('TEST_SWITCH_MEDIATOR');

      class MyResponse extends EventEmitter {
        _headers = {};
        getHeaders() {
          return LeanES.NS.Utils.copy(this._headers);
        }

        getHeader(field) {
          return this._headers[field.toLowerCase()];
        }

        setHeader(field, value) {
          this._headers[field.toLowerCase()] = value;
        }

        removeHeader(field) {
          delete this._headers[field.toLowerCase()];
        }

        end(data, encoding = 'utf-8', callback = () => { }) {
          this.finished = true;
          this.emit('finish', data != null ? typeof data.toString === "function" ? data.toString(encoding) : void 0 : void 0);
          callback();
        }

        constructor(...args) {
          super(...args);
          this.finished = false;
          this._headers = {};
        }
      };
      const res = new MyResponse();
      let req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1',
          'host': 'localhost:9999'
        }
      };
      let context = Test.NS.Context.new();
      let request = TestRequest.new();
      request.setContext(context);
      request.setReq(req);
      assert.equal(request.hostname, 'localhost');

      req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1',
          'x-forwarded-host': 'localhost1:8888, localhost2:9999'
        }
      };
      context = Test.NS.Context.new();
      request = TestRequest.new();
      request.setContext(context);
      request.setReq(req);
      request.configs = {
        trustProxy: true
      };
      assert.equal(request.hostname, 'localhost1');

      req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      context = Test.NS.Context.new();
      request = TestRequest.new();
      request.setContext(context);
      request.setReq(req);
      assert.equal(request.hostname, '');
    });
  });
  describe('.fresh', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should test request freshness', () => {
      const KEY = 'TEST_REQUEST_020';

      @initialize
      @plugin(RestfulAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }

      @initialize
      @partOf(Test)
      class ApplicationFacade extends Test.NS.Facade {
        @nameBy static __filename = 'ApplicationFacade';
        @meta static object = {};
      }
      facade = ApplicationFacade.getInstance(KEY);

      @initialize
      @partOf(Test)
      class TestRequest extends Test.NS.HttpRequest {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends Test.NS.HttpMediator {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @partOf(Test)
      class TestRouter extends Test.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.addProxy('TEST_SWITCH_ROUTER', 'TestRouter');
      const router = facade.getProxy('TEST_SWITCH_ROUTER');

      facade.addMediator('TEST_SWITCH_MEDIATOR', 'TestSwitch');
      const switchMediator = facade.getMediator('TEST_SWITCH_MEDIATOR');

      class MyResponse extends EventEmitter {
        _headers = {};
        getHeaders() {
          return LeanES.NS.Utils.copy(this._headers);
        }

        getHeader(field) {
          return this._headers[field.toLowerCase()];
        }

        setHeader(field, value) {
          this._headers[field.toLowerCase()] = value;
        }

        removeHeader(field) {
          delete this._headers[field.toLowerCase()];
        }

        end(data, encoding = 'utf-8', callback = () => { }) {
          this.finished = true;
          this.emit('finish', data != null ? typeof data.toString === "function" ? data.toString(encoding) : void 0 : void 0);
          callback();
        }

        constructor(...args) {
          super(...args);
          this.finished = false;
          this._headers = {};
        }
      };
      const res = new MyResponse();
      Reflect.defineProperty(res, '_headers', {
        writable: true,
        value: {
          'etag': '"bar"'
        }
      });
      let req = {
        url: 'http://localhost:8888',
        method: 'GET',
        headers: {
          'x-forwarded-for': '192.168.0.1',
          'if-none-match': '"foo"'
        }
      };
      let request = TestRequest.new();
      let context = Test.NS.Context.new();
      context.request = request;
      context.response = Test.NS.HttpResponse.new();
      context.cookies = Test.NS.HttpCookies.new();
      context.setReqResPair(req, res);
      Reflect.defineProperty(context, 'status', {
        writable: true,
        value: 200
      });
      request.setContext(context);
      request.setReq(req);
      assert.isFalse(request.fresh);

      Reflect.defineProperty(res, '_headers', {
        writable: true,
        value: {
          'etag': '"foo"'
        }
      });
      req = {
        url: 'http://localhost:8888',
        method: 'GET',
        headers: {
          'x-forwarded-for': '192.168.0.1',
          'if-none-match': '"foo"'
        }
      };
      request = TestRequest.new();
      context = Test.NS.Context.new();
      context.request = request;
      context.response = Test.NS.HttpResponse.new();
      context.cookies = Test.NS.HttpCookies.new();
      context.setReqResPair(req, res);
      Reflect.defineProperty(context, 'status', {
        writable: true,
        value: 200
      });
      request.setContext(context);
      request.setReq(req);
      assert.isTrue(request.fresh);
    });
  });
  describe('.stale', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should test inverted request freshness', () => {
      const KEY = 'TEST_REQUEST_021';

      @initialize
      @plugin(RestfulAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }

      @initialize
      @partOf(Test)
      class ApplicationFacade extends Test.NS.Facade {
        @nameBy static __filename = 'ApplicationFacade';
        @meta static object = {};
      }
      facade = ApplicationFacade.getInstance(KEY);

      @initialize
      @partOf(Test)
      class TestRequest extends Test.NS.HttpRequest {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends Test.NS.HttpMediator {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @partOf(Test)
      class TestRouter extends Test.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.addProxy('TEST_SWITCH_ROUTER', 'TestRouter');
      const router = facade.getProxy('TEST_SWITCH_ROUTER');

      facade.addMediator('TEST_SWITCH_MEDIATOR', 'TestSwitch');
      const switchMediator = facade.getMediator('TEST_SWITCH_MEDIATOR');

      class MyResponse extends EventEmitter {
        _headers = {};
        getHeaders() {
          return LeanES.NS.Utils.copy(this._headers);
        }

        getHeader(field) {
          return this._headers[field.toLowerCase()];
        }

        setHeader(field, value) {
          this._headers[field.toLowerCase()] = value;
        }

        removeHeader(field) {
          delete this._headers[field.toLowerCase()];
        }

        end(data, encoding = 'utf-8', callback = () => { }) {
          this.finished = true;
          this.emit('finish', data != null ? typeof data.toString === "function" ? data.toString(encoding) : void 0 : void 0);
          callback();
        }

        constructor(...args) {
          super(...args);
          this.finished = false;
          this._headers = {};
        }
      };
      const res = new MyResponse();
      Reflect.defineProperty(res, '_headers', {
        writable: true,
        value: {
          'etag': '"bar"'
        }
      });
      let req = {
        url: 'http://localhost:8888',
        method: 'GET',
        headers: {
          'x-forwarded-for': '192.168.0.1',
          'if-none-match': '"foo"'
        }
      };
      let request = TestRequest.new();
      let context = Test.NS.Context.new();
      Reflect.defineProperty(context, 'status', {
        writable: true,
        value: 200
      });
      context.request = request;
      context.response = Test.NS.HttpResponse.new();
      context.cookies = Test.NS.HttpCookies.new();
      context.setReqResPair(req, res);
      request.setContext(context);
      request.setReq(req);
      assert.isTrue(request.stale);

      Reflect.defineProperty(res, '_headers', {
        writable: true,
        value: {
          'etag': '"foo"'
        }
      });
      req = {
        url: 'http://localhost:8888',
        method: 'GET',
        headers: {
          'x-forwarded-for': '192.168.0.1',
          'if-none-match': '"foo"'
        }
      };

      request = TestRequest.new();
      context = Test.NS.Context.new();
      Reflect.defineProperty(context, 'status', {
        writable: true,
        value: 200
      });
      context.request = request;
      context.response = Test.NS.HttpResponse.new();
      context.cookies = Test.NS.HttpCookies.new();
      context.setReqResPair(req, res);
      request.setContext(context);
      request.setReq(req);
      assert.isFalse(request.stale);
    });
  });
  describe('.idempotent', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should test if method is idempotent', () => {
      const KEY = 'TEST_REQUEST_022';

      @initialize
      @plugin(RestfulAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }

      @initialize
      @partOf(Test)
      class ApplicationFacade extends Test.NS.Facade {
        @nameBy static __filename = 'ApplicationFacade';
        @meta static object = {};
      }
      facade = ApplicationFacade.getInstance(KEY);

      @initialize
      @partOf(Test)
      class TestRequest extends Test.NS.HttpRequest {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends Test.NS.HttpMediator {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @partOf(Test)
      class TestRouter extends Test.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.addProxy('TEST_SWITCH_ROUTER', 'TestRouter');
      const router = facade.getProxy('TEST_SWITCH_ROUTER');

      facade.addMediator('TEST_SWITCH_MEDIATOR', 'TestSwitch');
      const switchMediator = facade.getMediator('TEST_SWITCH_MEDIATOR');

      class MyResponse extends EventEmitter {
        _headers = {};
        getHeaders() {
          return LeanES.NS.Utils.copy(this._headers);
        }

        getHeader(field) {
          return this._headers[field.toLowerCase()];
        }

        setHeader(field, value) {
          this._headers[field.toLowerCase()] = value;
        }

        removeHeader(field) {
          delete this._headers[field.toLowerCase()];
        }

        end(data, encoding = 'utf-8', callback = () => { }) {
          this.finished = true;
          this.emit('finish', data != null ? typeof data.toString === "function" ? data.toString(encoding) : void 0 : void 0);
          callback();
        }

        constructor(...args) {
          super(...args);
          this.finished = false;
          this._headers = {};
        }
      };
      const res = new MyResponse();
      let req = {
        url: 'http://localhost:8888',
        method: 'GET',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      let context = Test.NS.Context.new();
      let request = TestRequest.new();
      request.setContext(context);
      request.setReq(req);
      assert.isTrue(request.idempotent);

      req = {
        url: 'http://localhost:8888',
        method: 'POST',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      context = Test.NS.Context.new();
      request = TestRequest.new();
      request.setContext(context);
      request.setReq(req);
      assert.isFalse(request.idempotent);
    });
  });
  describe('.charset', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get charset of request', () => {
      const KEY = 'TEST_REQUEST_023';

      @initialize
      @plugin(RestfulAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }

      @initialize
      @partOf(Test)
      class ApplicationFacade extends Test.NS.Facade {
        @nameBy static __filename = 'ApplicationFacade';
        @meta static object = {};
      }
      facade = ApplicationFacade.getInstance(KEY);

      @initialize
      @partOf(Test)
      class TestRequest extends Test.NS.HttpRequest {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends Test.NS.HttpMediator {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @partOf(Test)
      class TestRouter extends Test.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.addProxy('TEST_SWITCH_ROUTER', 'TestRouter');
      const router = facade.getProxy('TEST_SWITCH_ROUTER');

      facade.addMediator('TEST_SWITCH_MEDIATOR', 'TestSwitch');
      const switchMediator = facade.getMediator('TEST_SWITCH_MEDIATOR');

      class MyResponse extends EventEmitter {
        _headers = {};
        getHeaders() {
          return LeanES.NS.Utils.copy(this._headers);
        }

        getHeader(field) {
          return this._headers[field.toLowerCase()];
        }

        setHeader(field, value) {
          this._headers[field.toLowerCase()] = value;
        }

        removeHeader(field) {
          delete this._headers[field.toLowerCase()];
        }

        end(data, encoding = 'utf-8', callback = () => { }) {
          this.finished = true;
          this.emit('finish', data != null ? typeof data.toString === "function" ? data.toString(encoding) : void 0 : void 0);
          callback();
        }

        constructor(...args) {
          super(...args);
          this.finished = false;
          this._headers = {};
        }
      };
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        method: 'GET',
        headers: {
          'x-forwarded-for': '192.168.0.1',
          'content-type': 'image/svg+xml; charset=utf-8'
        }
      };
      const context = Test.NS.Context.new();
      const request = TestRequest.new();
      request.setContext(context);
      request.setReq(req);
      assert.equal(request.charset, 'utf-8');
    });
  });
  describe('.length', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get content length of request', () => {
      const KEY = 'TEST_REQUEST_024';

      @initialize
      @plugin(RestfulAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }

      @initialize
      @partOf(Test)
      class ApplicationFacade extends Test.NS.Facade {
        @nameBy static __filename = 'ApplicationFacade';
        @meta static object = {};
      }
      facade = ApplicationFacade.getInstance(KEY);

      @initialize
      @partOf(Test)
      class TestRequest extends Test.NS.HttpRequest {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends Test.NS.HttpMediator {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @partOf(Test)
      class TestRouter extends Test.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.addProxy('TEST_SWITCH_ROUTER', 'TestRouter');
      const router = facade.getProxy('TEST_SWITCH_ROUTER');

      facade.addMediator('TEST_SWITCH_MEDIATOR', 'TestSwitch');
      const switchMediator = facade.getMediator('TEST_SWITCH_MEDIATOR');

      class MyResponse extends EventEmitter {
        _headers = {};
        getHeaders() {
          return LeanES.NS.Utils.copy(this._headers);
        }

        getHeader(field) {
          return this._headers[field.toLowerCase()];
        }

        setHeader(field, value) {
          this._headers[field.toLowerCase()] = value;
        }

        removeHeader(field) {
          delete this._headers[field.toLowerCase()];
        }

        end(data, encoding = 'utf-8', callback = () => { }) {
          this.finished = true;
          this.emit('finish', data != null ? typeof data.toString === "function" ? data.toString(encoding) : void 0 : void 0);
          callback();
        }

        constructor(...args) {
          super(...args);
          this.finished = false;
          this._headers = {};
        }
      };
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        method: 'GET',
        headers: {
          'x-forwarded-for': '192.168.0.1',
          'content-length': '123456'
        }
      };
      const context = Test.NS.Context.new();
      const request = TestRequest.new();
      request.setContext(context);
      request.setReq(req);
      assert.equal(request.length, 123456);
    });
  });
  describe('.secure', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should if request protocol is secure', () => {
      const KEY = 'TEST_REQUEST_025';

      @initialize
      @plugin(RestfulAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }

      @initialize
      @partOf(Test)
      class ApplicationFacade extends Test.NS.Facade {
        @nameBy static __filename = 'ApplicationFacade';
        @meta static object = {};
      }
      facade = ApplicationFacade.getInstance(KEY);

      @initialize
      @partOf(Test)
      class TestRequest extends Test.NS.HttpRequest {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends Test.NS.HttpMediator {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @partOf(Test)
      class TestRouter extends Test.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.addProxy('TEST_SWITCH_ROUTER', 'TestRouter');
      const router = facade.getProxy('TEST_SWITCH_ROUTER');

      facade.addMediator('TEST_SWITCH_MEDIATOR', 'TestSwitch');
      const switchMediator = facade.getMediator('TEST_SWITCH_MEDIATOR');

      class MyResponse extends EventEmitter {
        _headers = {};
        getHeaders() {
          return LeanES.NS.Utils.copy(this._headers);
        }

        getHeader(field) {
          return this._headers[field.toLowerCase()];
        }

        setHeader(field, value) {
          this._headers[field.toLowerCase()] = value;
        }

        removeHeader(field) {
          delete this._headers[field.toLowerCase()];
        }

        end(data, encoding = 'utf-8', callback = () => { }) {
          this.finished = true;
          this.emit('finish', data != null ? typeof data.toString === "function" ? data.toString(encoding) : void 0 : void 0);
          callback();
        }

        constructor(...args) {
          super(...args);
          this.finished = false;
          this._headers = {};
        }
      };
      const res = new MyResponse();
      let req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1',
        }
      };
      let context = Test.NS.Context.new();
      let request = TestRequest.new();
      request.setContext(context);
      request.setReq(req);
      assert.isFalse(request.secure);

      req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1',
          'x-forwarded-proto': 'https'
        }
      };
      context = Test.NS.Context.new();
      request = TestRequest.new();
      request.setContext(context);
      request.setReq(req);
      request.configs = {
        trustProxy: true
      };
      assert.isTrue(request.secure);
    });
  });
  describe('.ips', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get request IPs', () => {
      const KEY = 'TEST_REQUEST_026';

      @initialize
      @plugin(RestfulAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }

      @initialize
      @partOf(Test)
      class ApplicationFacade extends Test.NS.Facade {
        @nameBy static __filename = 'ApplicationFacade';
        @meta static object = {};
      }
      facade = ApplicationFacade.getInstance(KEY);

      @initialize
      @partOf(Test)
      class TestRequest extends Test.NS.HttpRequest {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends Test.NS.HttpMediator {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @partOf(Test)
      class TestRouter extends Test.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.addProxy('TEST_SWITCH_ROUTER', 'TestRouter');
      const router = facade.getProxy('TEST_SWITCH_ROUTER');

      facade.addMediator('TEST_SWITCH_MEDIATOR', 'TestSwitch');
      const switchMediator = facade.getMediator('TEST_SWITCH_MEDIATOR');

      class MyResponse extends EventEmitter {
        _headers = {};
        getHeaders() {
          return LeanES.NS.Utils.copy(this._headers);
        }

        getHeader(field) {
          return this._headers[field.toLowerCase()];
        }

        setHeader(field, value) {
          this._headers[field.toLowerCase()] = value;
        }

        removeHeader(field) {
          delete this._headers[field.toLowerCase()];
        }

        end(data, encoding = 'utf-8', callback = () => { }) {
          this.finished = true;
          this.emit('finish', data != null ? typeof data.toString === "function" ? data.toString(encoding) : void 0 : void 0);
          callback();
        }

        constructor(...args) {
          super(...args);
          this.finished = false;
          this._headers = {};
        }
      };
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1, 192.168.1.1, 123.222.12.21',
        }
      };
      const context = Test.NS.Context.new();
      const request = TestRequest.new();
      request.setContext(context);
      request.setReq(req);
      assert.deepEqual(request.ips, ['192.168.0.1', '192.168.1.1', '123.222.12.21']);
    });
  });
  describe('.subdomains', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get request URL subdomains', () => {
      const KEY = 'TEST_REQUEST_027';

      @initialize
      @plugin(RestfulAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }

      @initialize
      @partOf(Test)
      class ApplicationFacade extends Test.NS.Facade {
        @nameBy static __filename = 'ApplicationFacade';
        @meta static object = {};
      }
      facade = ApplicationFacade.getInstance(KEY);

      @initialize
      @partOf(Test)
      class TestRequest extends Test.NS.HttpRequest {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends Test.NS.HttpMediator {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @partOf(Test)
      class TestRouter extends Test.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.addProxy('TEST_SWITCH_ROUTER', 'TestRouter');
      const router = facade.getProxy('TEST_SWITCH_ROUTER');

      facade.addMediator('TEST_SWITCH_MEDIATOR', 'TestSwitch');
      const switchMediator = facade.getMediator('TEST_SWITCH_MEDIATOR');

      class MyResponse extends EventEmitter {
        _headers = {};
        getHeaders() {
          return LeanES.NS.Utils.copy(this._headers);
        }

        getHeader(field) {
          return this._headers[field.toLowerCase()];
        }

        setHeader(field, value) {
          this._headers[field.toLowerCase()] = value;
        }

        removeHeader(field) {
          delete this._headers[field.toLowerCase()];
        }

        end(data, encoding = 'utf-8', callback = () => { }) {
          this.finished = true;
          this.emit('finish', data != null ? typeof data.toString === "function" ? data.toString(encoding) : void 0 : void 0);
          callback();
        }

        constructor(...args) {
          super(...args);
          this.finished = false;
          this._headers = {};
        }
      };
      let res = new MyResponse();
      let req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1',
          'host': 'www.test.localhost:9999'
        }
      };
      let context = Test.NS.Context.new();
      let request = TestRequest.new();
      request.setContext(context);
      request.setReq(req);
      request.configs = {
        subdomainOffset: 1
      };
      assert.deepEqual(request.subdomains, ['test', 'www']);
      req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1',
          'host': '192.168.0.2:9999'
        }
      };
      context = Test.NS.Context.new();
      request = TestRequest.new();
      request.setContext(context);
      request.setReq(req);
      assert.deepEqual(request.subdomains, []);
    });
  });
  describe('.accepts', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get acceptable types from request', () => {
      const KEY = 'TEST_REQUEST_028';

      @initialize
      @plugin(RestfulAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }

      @initialize
      @partOf(Test)
      class ApplicationFacade extends Test.NS.Facade {
        @nameBy static __filename = 'ApplicationFacade';
        @meta static object = {};
      }
      facade = ApplicationFacade.getInstance(KEY);

      @initialize
      @partOf(Test)
      class TestRequest extends Test.NS.HttpRequest {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends Test.NS.HttpMediator {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @partOf(Test)
      class TestRouter extends Test.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.addProxy('TEST_SWITCH_ROUTER', 'TestRouter');
      const router = facade.getProxy('TEST_SWITCH_ROUTER');

      facade.addMediator('TEST_SWITCH_MEDIATOR', 'TestSwitch');
      const switchMediator = facade.getMediator('TEST_SWITCH_MEDIATOR');

      class MyResponse extends EventEmitter {
        _headers = {};
        getHeaders() {
          return LeanES.NS.Utils.copy(this._headers);
        }

        getHeader(field) {
          return this._headers[field.toLowerCase()];
        }

        setHeader(field, value) {
          this._headers[field.toLowerCase()] = value;
        }

        removeHeader(field) {
          delete this._headers[field.toLowerCase()];
        }

        end(data, encoding = 'utf-8', callback = () => { }) {
          this.finished = true;
          this.emit('finish', data != null ? typeof data.toString === "function" ? data.toString(encoding) : void 0 : void 0);
          callback();
        }

        constructor(...args) {
          super(...args);
          this.finished = false;
          this._headers = {};
        }
      };
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1',
          'accept': 'application/json, text/plain, image/png'
        }
      };
      const request = TestRequest.new();
      const context = Test.NS.Context.new();
      context.request = request;
      context.response = Test.NS.HttpResponse.new();
      context.cookies = Test.NS.HttpCookies.new();
      context.setReqResPair(req, res);
      request.setContext(context);
      request.setReq(req);
      assert.deepEqual(request.accepts(), ['application/json', 'text/plain', 'image/png']);
    });
  });
  describe('.acceptsCharsets', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get acceptable charsets from request', () => {
      const KEY = 'TEST_REQUEST_029';

      @initialize
      @plugin(RestfulAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }

      @initialize
      @partOf(Test)
      class ApplicationFacade extends Test.NS.Facade {
        @nameBy static __filename = 'ApplicationFacade';
        @meta static object = {};
      }
      facade = ApplicationFacade.getInstance(KEY);

      @initialize
      @partOf(Test)
      class TestRequest extends Test.NS.HttpRequest {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends Test.NS.HttpMediator {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @partOf(Test)
      class TestRouter extends Test.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.addProxy('TEST_SWITCH_ROUTER', 'TestRouter');
      const router = facade.getProxy('TEST_SWITCH_ROUTER');

      facade.addMediator('TEST_SWITCH_MEDIATOR', 'TestSwitch');
      const switchMediator = facade.getMediator('TEST_SWITCH_MEDIATOR');

      class MyResponse extends EventEmitter {
        _headers = {};
        getHeaders() {
          return LeanES.NS.Utils.copy(this._headers);
        }

        getHeader(field) {
          return this._headers[field.toLowerCase()];
        }

        setHeader(field, value) {
          this._headers[field.toLowerCase()] = value;
        }

        removeHeader(field) {
          delete this._headers[field.toLowerCase()];
        }

        end(data, encoding = 'utf-8', callback = () => { }) {
          this.finished = true;
          this.emit('finish', data != null ? typeof data.toString === "function" ? data.toString(encoding) : void 0 : void 0);
          callback();
        }

        constructor(...args) {
          super(...args);
          this.finished = false;
          this._headers = {};
        }
      };
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1',
          'accept-charset': 'utf-8, iso-8859-1;q=0.5, *;q=0.1'
        }
      };
      const context = Test.NS.Context.new();
      const request = TestRequest.new();
      context.request = request;
      context.response = Test.NS.HttpResponse.new();
      context.cookies = Test.NS.HttpCookies.new();
      context.setReqResPair(req, res);
      request.setContext(context);
      request.setReq(req);
      request.configs = {
        trustProxy: true
      };
      assert.deepEqual(request.acceptsCharsets(), [ 'utf-8', 'iso-8859-1', '*' ]);
    });
  });
  describe('.acceptsEncodings', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get acceptable charsets from request', () => {
      const KEY = 'TEST_REQUEST_030';

      @initialize
      @plugin(RestfulAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }

      @initialize
      @partOf(Test)
      class ApplicationFacade extends Test.NS.Facade {
        @nameBy static __filename = 'ApplicationFacade';
        @meta static object = {};
      }
      facade = ApplicationFacade.getInstance(KEY);

      @initialize
      @partOf(Test)
      class TestRequest extends Test.NS.HttpRequest {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends Test.NS.HttpMediator {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @partOf(Test)
      class TestRouter extends Test.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.addProxy('TEST_SWITCH_ROUTER', 'TestRouter');
      const router = facade.getProxy('TEST_SWITCH_ROUTER');

      facade.addMediator('TEST_SWITCH_MEDIATOR', 'TestSwitch');
      const switchMediator = facade.getMediator('TEST_SWITCH_MEDIATOR');

      class MyResponse extends EventEmitter {
        _headers = {};
        getHeaders() {
          return LeanES.NS.Utils.copy(this._headers);
        }

        getHeader(field) {
          return this._headers[field.toLowerCase()];
        }

        setHeader(field, value) {
          this._headers[field.toLowerCase()] = value;
        }

        removeHeader(field) {
          delete this._headers[field.toLowerCase()];
        }

        end(data, encoding = 'utf-8', callback = () => { }) {
          this.finished = true;
          this.emit('finish', data != null ? typeof data.toString === "function" ? data.toString(encoding) : void 0 : void 0);
          callback();
        }

        constructor(...args) {
          super(...args);
          this.finished = false;
          this._headers = {};
        }
      };
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1',
          'accept-encoding': 'compress, gzip, deflate, sdch, identity'
        }
      };
      const request = TestRequest.new();
      const context = Test.NS.Context.new();
      context.request = request;
      context.response = Test.NS.HttpResponse.new();
      context.cookies = Test.NS.HttpCookies.new();
      context.setReqResPair(req, res);
      request.setContext(context);
      request.setReq(req);
      assert.deepEqual(request.acceptsEncodings(), [ 'compress', 'gzip', 'deflate', 'sdch', 'identity' ]);
    });
  });
  describe('.acceptsLanguages', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get acceptable languages from request', () => {
      const KEY = 'TEST_REQUEST_031';

      @initialize
      @plugin(RestfulAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }

      @initialize
      @partOf(Test)
      class ApplicationFacade extends Test.NS.Facade {
        @nameBy static __filename = 'ApplicationFacade';
        @meta static object = {};
      }
      facade = ApplicationFacade.getInstance(KEY);

      @initialize
      @partOf(Test)
      class TestRequest extends Test.NS.HttpRequest {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends Test.NS.HttpMediator {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @partOf(Test)
      class TestRouter extends Test.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.addProxy('TEST_SWITCH_ROUTER', 'TestRouter');
      const router = facade.getProxy('TEST_SWITCH_ROUTER');

      facade.addMediator('TEST_SWITCH_MEDIATOR', 'TestSwitch');
      const switchMediator = facade.getMediator('TEST_SWITCH_MEDIATOR');

      class MyResponse extends EventEmitter {
        _headers = {};
        getHeaders() {
          return LeanES.NS.Utils.copy(this._headers);
        }

        getHeader(field) {
          return this._headers[field.toLowerCase()];
        }

        setHeader(field, value) {
          this._headers[field.toLowerCase()] = value;
        }

        removeHeader(field) {
          delete this._headers[field.toLowerCase()];
        }

        end(data, encoding = 'utf-8', callback = () => { }) {
          this.finished = true;
          this.emit('finish', data != null ? typeof data.toString === "function" ? data.toString(encoding) : void 0 : void 0);
          callback();
        }

        constructor(...args) {
          super(...args);
          this.finished = false;
          this._headers = {};
        }
      };
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1',
          'accept-language': 'en, ru, cn, fr'
        }
      };
      const request = TestRequest.new();
      const context = Test.NS.Context.new();
      request.setContext(context);
      request.setReq(req);
      context.request = request;
      context.response = Test.NS.HttpResponse.new();
      context.cookies = Test.NS.HttpCookies.new();
      context.setReqResPair(req, res);
      assert.deepEqual(request.acceptsLanguages(), [ 'en', 'ru', 'cn', 'fr' ]);
    });
  });
  describe('.test', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get types from request', () => {
      const KEY = 'TEST_REQUEST_032';

      @initialize
      @plugin(RestfulAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }

      @initialize
      @partOf(Test)
      class ApplicationFacade extends Test.NS.Facade {
        @nameBy static __filename = 'ApplicationFacade';
        @meta static object = {};
      }
      facade = ApplicationFacade.getInstance(KEY);

      @initialize
      @partOf(Test)
      class TestRequest extends Test.NS.HttpRequest {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends Test.NS.HttpMediator {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @partOf(Test)
      class TestRouter extends Test.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.addProxy('TEST_SWITCH_ROUTER', 'TestRouter');
      const router = facade.getProxy('TEST_SWITCH_ROUTER');

      facade.addMediator('TEST_SWITCH_MEDIATOR', 'TestSwitch');
      const switchMediator = facade.getMediator('TEST_SWITCH_MEDIATOR');

      class MyResponse extends EventEmitter {
        _headers = {};
        getHeaders() {
          return LeanES.NS.Utils.copy(this._headers);
        }

        getHeader(field) {
          return this._headers[field.toLowerCase()];
        }

        setHeader(field, value) {
          this._headers[field.toLowerCase()] = value;
        }

        removeHeader(field) {
          delete this._headers[field.toLowerCase()];
        }

        end(data, encoding = 'utf-8', callback = () => { }) {
          this.finished = true;
          this.emit('finish', data != null ? typeof data.toString === "function" ? data.toString(encoding) : void 0 : void 0);
          callback();
        }

        constructor(...args) {
          super(...args);
          this.finished = false;
          this._headers = {};
        }
      };
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1',
          'content-type': 'application/json'
        }
      };
      const request = TestRequest.new();
      const context = Test.NS.Context.new();
      request.setContext(context);
      request.setReq(req);
      context.request = request;
      context.response = Test.NS.HttpResponse.new();
      context.cookies = Test.NS.HttpCookies.new();
      context.setReqResPair(req, res);
      assert.deepEqual(request.type, 'application/json');
    });
  });
  describe('.is', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get types from request', () => {
      const KEY = 'TEST_REQUEST_033';

      @initialize
      @plugin(RestfulAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }

      @initialize
      @partOf(Test)
      class ApplicationFacade extends Test.NS.Facade {
        @nameBy static __filename = 'ApplicationFacade';
        @meta static object = {};
      }
      facade = ApplicationFacade.getInstance(KEY);

      @initialize
      @partOf(Test)
      class TestRequest extends Test.NS.HttpRequest {
        @nameBy static __filename = 'TestRequest';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestSwitch extends Test.NS.HttpMediator {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      @initialize
      @partOf(Test)
      class TestRouter extends Test.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.addProxy('TEST_SWITCH_ROUTER', 'TestRouter');
      const router = facade.getProxy('TEST_SWITCH_ROUTER');

      facade.addMediator('TEST_SWITCH_MEDIATOR', 'TestSwitch');
      const switchMediator = facade.getMediator('TEST_SWITCH_MEDIATOR');

      class MyResponse extends EventEmitter {
        _headers = {};
        getHeaders() {
          return LeanES.NS.Utils.copy(this._headers);
        }

        getHeader(field) {
          return this._headers[field.toLowerCase()];
        }

        setHeader(field, value) {
          this._headers[field.toLowerCase()] = value;
        }

        removeHeader(field) {
          delete this._headers[field.toLowerCase()];
        }

        end(data, encoding = 'utf-8', callback = () => { }) {
          this.finished = true;
          this.emit('finish', data != null ? typeof data.toString === "function" ? data.toString(encoding) : void 0 : void 0);
          callback();
        }

        constructor(...args) {
          super(...args);
          this.finished = false;
          this._headers = {};
        }
      };
      const res = new MyResponse();
      const req = {
        url: 'http://localhost:8888',
        headers: {
          'x-forwarded-for': '192.168.0.1',
          'content-type': 'application/json',
          'content-length': '0'
        }
      };
      const request = TestRequest.new();
      const context = Test.NS.Context.new();
      request.setContext(context);
      request.setReq(req);
      context.request = request;
      context.response = Test.NS.HttpResponse.new();
      context.cookies = Test.NS.HttpCookies.new();
      context.setReqResPair(req, res);
      assert.deepEqual(request.is('html', 'application/*'), 'application/json');
    });
  });
});
