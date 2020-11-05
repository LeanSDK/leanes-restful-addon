const { IncomingMessage, ServerResponse } = require('http');
const { expect, assert } = require('chai');
const sinon = require('sinon');
const _ = require('lodash');
const RestfulAddon = require('../../src/index.js');
const LeanES = require('leanes/src/leanes').default;
const {
  initialize, partOf, nameBy, meta, constant, mixin, plugin
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
        @mixin(Test.NS.BodyParseMixin)
        @partOf(Test)
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
      const facade = Test.NS.Facade.getInstance(KEY);
      const configs = Test.NS.Configuration.new(Test.NS.CONFIGURATION, Test.NS.ROOT);
      facade.registerProxy(configs);

      @initialize
      @mixin(Test.NS.BodyParseMixin)
      @partOf(Test)
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
      facade.registerProxy(TestRouter.new('TEST_SWITCH_ROUTER'));

      @initialize
      @partOf(Test)
      class TestSwitch extends Test.NS.Switch {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};

        @property routerName = 'TEST_SWITCH_ROUTER';
      }
      const body = '{"test":"test"}';

      class MyRequest extends IncomingMessage {
        constructor(socket) {
          super(socket);
          this.method = 'POST';
          this.url = 'http://localhost:8888/space/SPACE123/test_entity';
          this.headers = {
            'x-forwarded-for': '192.168.0.1',
            'content-type': 'application/json',
            'content-length': "#{body.length}"
          }
          this.push(body);
          this.push(null);
        }
      }

      class MyResponse extends ServerResponse { }
      const req = new MyRequest();
      const res = new MyResponse(req);
      facade.registerMediator(TestSwitch.new('TEST_SWITCH_MEDIATOR'));
      const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');
      const resource = TestResource.new()
      resource.context = Test.NS.Context.new(req, res, switchMediator);
      await resource.parseBody();
      assert.deepEqual(resource.context.request.body, { test: 'test' });
      facade.remove();
    });
  });
});