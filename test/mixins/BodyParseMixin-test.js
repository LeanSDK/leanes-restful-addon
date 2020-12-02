const { IncomingMessage, ServerResponse } = require('http');
const { expect, assert } = require('chai');
const sinon = require('sinon');
const _ = require('lodash');
const addonPath = process.env.ENV === 'build' ? "../../lib/index.dev" : "../../src/index.js";
const RestfulAddon = require(addonPath).default;
const LeanES = require('@leansdk/leanes/src').default;
const {
  initialize, partOf, nameBy, meta, constant, mixin, plugin, property
} = LeanES.NS;

describe('BodyParseMixin', () => {
  describe('.new', () => {
    it('should create new resource', () => {
      expect(() => {

        @initialize
        @plugin(RestfulAddon)
        class Test extends LeanES {
          @nameBy static __filename = 'Test';
          @meta static object = {};
          @constant ROOT = __dirname;
        }

        @initialize
        @partOf(Test)
        @mixin(Test.NS.BodyParseMixin)
        class TestResource extends Test.NS.Resource {
          @nameBy static __filename = 'TestResource';
          @meta static object = {};

          @property entityName = 'TestEntity';
        }
        const resource = TestResource.new();
      }).to.not.throw(Error);
    });
  });
  describe('.parseBody', () => {
    it('should parse request body', async () => {
      const KEY = 'TEST_BODY_PARSE_MIXIN_001';

      @initialize
      @plugin(RestfulAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config/root`;
      }

      @initialize
      @partOf(Test)
      class ApplicationFacade extends Test.NS.Facade {
        @nameBy static __filename = 'ApplicationFacade';
        @meta static object = {};
      }
      const facade = ApplicationFacade.getInstance(KEY);

      @initialize
      @partOf(Test)
      @mixin(Test.NS.BodyParseMixin)
      class TestResource extends Test.NS.Resource {
        @nameBy static __filename = 'TestResource';
        @meta static object = {};

        @property entityName = 'TestEntity';
      }

      @initialize
      @partOf(Test)
      class TestRouter extends Test.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }
      facade.addProxy('TEST_SWITCH_ROUTER', 'TestRouter');

      @initialize
      @partOf(Test)
      class TestSwitch extends Test.NS.HttpMediator {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};

        @property routerName = 'TEST_SWITCH_ROUTER';
      }
      const body = '{"test": "test"}';

      class MyRequest extends IncomingMessage {
        constructor(socket) {
          super(socket);
          this.method = 'POST';
          this.url = 'http://localhost:8888/space/SPACE123/test_entity';
          this.headers = {
            'x-forwarded-for': '192.168.0.1',
            'content-type': 'application/json',
            'content-length': `${body.length}`
          }
          this.push(body);
          this.push(null);
        }
      }

      class MyResponse extends ServerResponse { }
      const req = new MyRequest();
      const res = new MyResponse(req);
      console.log('...............', req.body);

      facade.addMediator('TEST_SWITCH_MEDIATOR', 'TestSwitch');
      const switchMediator = facade.getMediator('TEST_SWITCH_MEDIATOR');
      const resource = TestResource.new()
      const context = Test.NS.Context.new();
      context.request = Test.NS.HttpRequest.new();
      context.response = Test.NS.HttpResponse.new();
      context.cookies = Test.NS.HttpCookies.new();
      context.setReqResPair(req, res);
      resource.context = context;
      await resource.parseBody();
      console.log('??????????????', resource.context.request);

      assert.deepEqual(resource.context.req.body, { test: 'test' });
      facade.remove();
    });
  });
});