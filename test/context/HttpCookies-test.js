const http = require('http');
const EventEmitter = require('events');
const { expect, assert } = require('chai');
const sinon = require('sinon');
const _ = require('lodash');
const NodeCookies = require('cookies');
const Keygrip = require('keygrip');
const addonPath = process.env.ENV === 'build' ? "../../lib/index.dev" : "../../src/index.js";
const RestfulAddon = require(addonPath).default;
const LeanES = require('@leansdk/leanes/src').default;
const {
  initialize, partOf, nameBy, meta, constant, property, plugin
} = LeanES.NS;

const trigger = new EventEmitter();
const server = http.createServer((req, res) => {
  trigger.emit('REQUEST', { req, res });
});

describe('Cookies', () => {
  describe('.new', () => {
    it('should create Cookies instance', () => {

      @initialize
      @plugin(RestfulAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config/root`;
      }

      @initialize
      @partOf(Test)
      class Cookies extends Test.NS.HttpCookies {
        @nameBy static __filename = 'Cookies';
        @meta static object = {};
      }

      const request = {};
      const response = {};
      const options = {
        key: 'KEY',
        secure: true
      };
      const cookies = Cookies.new();
      cookies.setReqResOpts(request, response, options);
      assert.instanceOf(cookies, Cookies);
      assert.equal(cookies.req, request);
      assert.equal(cookies.res, response);
      assert.equal(cookies.key, 'KEY');
      assert.instanceOf(cookies._cookies, NodeCookies);
    });
  });
  describe('.set', () => {
    before(() => {
      server.listen(8888);
    });
    after(() => {
      server.close();
    });
    it('should set to cookie value', async () => {
      const COOKIE_KEY = 'KEY';
      const COOKIE_NAME = 'TEST_COOKIE';
      const COOKIE_VALUE = 'TEST_COOKIE_VALUE';
      const MAX_AGE = 100000;
      const DOMAIN = 'example.com';

      @initialize
      @plugin(RestfulAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config/root`;
      }

      @initialize
      @partOf(Test)
      class Cookies extends Test.NS.HttpCookies {
        @nameBy static __filename = 'Cookies';
        @meta static object = {};
      }
      const promise = new Promise((resolve) => {
        trigger.once('REQUEST', resolve);
      });
      Test.NS.Utils.request.get('http://localhost:8888/');
      const {
        res: response,
        req: request
      } = await promise;
      const options = {
        key: COOKIE_KEY,
        secure: false
      };
      const cookies = Cookies.new();
      cookies.setReqResOpts(request, response, options);
      const startDate = Date.now();
      cookies.set(COOKIE_NAME, COOKIE_VALUE, {
        maxAge: MAX_AGE,
        httpOnly: true,
        path: '/',
        domain: DOMAIN,
        secure: false
      });
      const cookieHeader = response.getHeader('Set-Cookie');
      const expires = new Date(startDate + MAX_AGE);
      const keys = new Keygrip([COOKIE_KEY], 'sha256', 'hex');
      assert.deepEqual(cookieHeader, [
        `${COOKIE_NAME}=${COOKIE_VALUE}; path=/; expires=${expires.toUTCString()}; domain=${DOMAIN}; httponly`,
        `${COOKIE_NAME}.sig=${keys.sign(`${COOKIE_NAME}=${COOKIE_VALUE}`)}; path=/; expires=${expires.toUTCString()}; domain=${DOMAIN}; httponly`
      ]);
    });
  });
  describe('.get', () => {
    before(() => {
      server.listen(8888);
    });
    after(() => {
      server.close();
    });
    it('should set to cookie value', async () => {
      const COOKIE_KEY = 'KEY';
      const COOKIE_NAME = 'TEST_COOKIE';
      const COOKIE_VALUE = 'TEST_COOKIE_VALUE';
      const MAX_AGE = 100000;
      const DOMAIN = 'example.com';

      @initialize
      @plugin(RestfulAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config/root`;
      }

      @initialize
      @partOf(Test)
      class Cookies extends Test.NS.HttpCookies {
        @nameBy static __filename = 'Cookies';
        @meta static object = {};
      }
      const promise = new Promise((resolve) => {
        trigger.once('REQUEST', resolve);
      });
      const keys = new Keygrip([COOKIE_KEY], 'shsa256', 'hex');
      Test.NS.Utils.request.get('http://localhost:8888/', {
        headers: {
          'Cookie': `${COOKIE_NAME}=${COOKIE_VALUE}; ${COOKIE_NAME}.sig=${keys.sign(`${COOKIE_NAME}=${COOKIE_VALUE}`)}`
        }
      });
      const {
        res: response,
        req: request
      } = await promise;
      const options = {
        key: COOKIE_KEY,
        secure: false
      };
      const cookies = Cookies.new();
      cookies.setReqResOpts(request, response, options);
      const cookieValue = cookies.get(COOKIE_NAME);
      assert.equal(cookieValue, COOKIE_VALUE);
      const encriptedCookieValue = cookies.get(`${COOKIE_NAME}.sig`);
      assert.equal(encriptedCookieValue, keys.sign, `${COOKIE_NAME}=${COOKIE_VALUE}`);
    });
  });
});

