const { expect, assert } = require('chai');
const sinon = require('sinon');
const _ = require('lodash');
const EventEmitter = require('events');
const httpErrors = require('http-errors');
const addonPath = process.env.ENV === 'build' ? "../../lib/index.dev" : "../../src/index.js";
const RestfulAddon = require(addonPath).default;
const MapperAddon = require('@leansdk/leanes-mapper-addon/src').default;
const LeanES = require('@leansdk/leanes/src').default;
const {
  Resource,
  initialize, partOf, nameBy, meta, constant, mixin, property, method, plugin
} = LeanES.NS;

const hasProp = {}.hasOwnProperty;

describe('Resource', () => {
  describe('.new', () => {
    it('should create new command', () => {
      expect(() => {

        @initialize
        @plugin(RestfulAddon)
        class Test extends LeanES {
          @nameBy static __filename = 'Test';
          @meta static object = {};
          @constant ROOT = __dirname;
        }
        const resource = Test.NS.Resource.new();
      }).to.not.throw(Error);
    });
  });
  describe('.keyName', () => {
    it('should get key name using entity name', () => {

      @initialize
      @plugin(RestfulAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = __dirname;
      }

      @initialize
      @partOf(Test)
      class TestResource extends Test.NS.Resource {
        @nameBy static __filename = 'TestResource';
        @meta static object = {};
        @property entityName = 'TestEntity';
      }
      const resource = TestResource.new();
      const { keyName } = resource;
      assert.equal(keyName, 'test_entity');
    });
  });
  describe('.itemEntityName', () => {
    it('should get item name using entity name', () => {

      @initialize
      @plugin(RestfulAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = __dirname;
      }

      @initialize
      @partOf(Test)
      class TestResource extends Test.NS.Resource {
        @nameBy static __filename = 'TestResource';
        @meta static object = {};
        @property entityName = 'TestEntity';
      }
      const resource = TestResource.new();
      const { itemEntityName } = resource;
      assert.equal(itemEntityName, 'test_entity');
    });
  });
  describe('.listEntityName', () => {
    it('should get list name using entity name', () => {

      @initialize
      @plugin(RestfulAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = __dirname;
      }

      @initialize
      @partOf(Test)
      class TestResource extends Test.NS.Resource {
        @nameBy static __filename = 'TestResource';
        @meta static object = {};
        @property entityName = 'TestEntity';
      }
      const resource = TestResource.new();
      const { listEntityName } = resource;
      assert.equal(listEntityName, 'test_entities');
    });
  });
  describe('.collectionName', () => {
    it('should get collection name using entity name', () => {

      @initialize
      @plugin(RestfulAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = __dirname;
      }

      @initialize
      @partOf(Test)
      class TestResource extends Test.NS.Resource {
        @nameBy static __filename = 'TestResource';
        @meta static object = {};
        @property entityName = 'TestEntity';
      }
      const resource = TestResource.new();
      const { collectionName } = resource;
      assert.equal(collectionName, 'TestEntitiesCollection');
    });
  });
  describe('.collection', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get collection', () => {
      const TEST_FACADE = 'TEST_FACADE_001';
      const collectionName = 'TestEntitiesCollection';

      @initialize
      @plugin(RestfulAddon)
      @plugin(MapperAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = __dirname;
      }

      @initialize
      @partOf(Test)
      class ApplicationFacade extends Test.NS.Facade {
        @nameBy static __filename = 'ApplicationFacade';
        @meta static object = {};
      }
      facade = ApplicationFacade.getInstance(TEST_FACADE);

      @initialize
      @partOf(Test)
      class TestResource extends Test.NS.Resource {
        @nameBy static __filename = 'TestResource';
        @meta static object = {};
        @property entityName = 'TestEntity';
      }
      facade.addCommand('TestResource');
      const resource = facade.getCommand('TestResource');
      resource.initializeNotifier(TEST_FACADE);

      @initialize
      @partOf(Test)
      class TestsCollection extends Test.NS.Collection {
        @nameBy static __filename = 'TestsCollection';
        @meta static object = {};
        @property entityName = 'TestEntity';
      }

      @initialize
      @partOf(Test)
      @mixin(Test.NS.MemoryAdapterMixin)
      class TestAdapter extends LeanES.NS.Adapter {
        @nameBy static __filename = 'TestAdapter';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestEntityRecord extends Test.NS.Record {
        @nameBy static __filename = 'TestEntityRecord';
        @meta static object = {};
        @property entityName = 'TestEntity';
        @Test.NS.attribute({ type: 'string' }) test;
        @method static findRecordByName() {
          return TestEntityRecord;
        }
        constructor() {
          super(...arguments);
          this.type = 'Test::TestEntityRecord';
        }
      }
      facade.addProxy(collectionName, 'TestsCollection', {
        delegate: 'TestEntityRecord',
        adapter: 'TestAdapter'
      });
      const boundCollection = facade.getProxy(collectionName);
      const { collection } = resource;
      assert.equal(collection, boundCollection);
    });
  });
  describe('.action', () => {
    it('should create actions', () => {

      @initialize
      @plugin(RestfulAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = __dirname;
      }
      const { action } = Test.NS;

      @initialize
      @partOf(Test)
      class TestResource extends Test.NS.Resource {
        @nameBy static __filename = 'TestResource';
        @meta static object = {};
        @property entityName = 'TestEntity';
        @action test1() {
          return 'test1';
        }
        @action test2() {
          return 'test2';
        }
        @action test3() {
          return 'test3';
        }
      }
      const { test1, test2, test3 } = TestResource.metaObject.parent.data.actions;
      assert.isFunction(test1, 'action `test1` is not function');
      assert.isFunction(test2, 'action `test2` is not function');
      assert.isFunction(test3, 'action `test3` is not function');
      assert.equal(test1(), 'test1');
      assert.equal(test2(), 'test2');
      assert.equal(test3(), 'test3');
    });
  });
  describe('.actions', () => {
    it('should get resource actions', async () => {

      @initialize
      @plugin(RestfulAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = __dirname;
      }
      const { action } = Test.NS;

      @initialize
      @partOf(Test)
      class TestResource extends Test.NS.Resource {
        @nameBy static __filename = 'TestResource';
        @meta static object = {};
        @property entityName = 'TestEntity';
        @action test1() {
          return 'test1';
        }
        @action test2() {
          return 'test2';
        }
        @action test3() {
          return 'test3';
        }
      }
      const { test1, test2, test3 } = TestResource.actions;
      assert.isFunction(test1, 'action `test1` is not function');
      assert.isFunction(test2, 'action `test2` is not function');
      assert.isFunction(test3, 'action `test3` is not function');
      assert.equal(test1(), 'test1');
      assert.equal(test2(), 'test2');
      assert.equal(test3(), 'test3');
      const { actions } = TestResource;
      assert.isFunction(actions.list, 'action `list` is not function');
      assert.isFunction(actions.detail, 'action `detail` is not function');
      assert.isFunction(actions.create, 'action `create` is not function');
      assert.isFunction(actions.update, 'action `update` is not function');
      assert.isFunction(actions.delete, 'action `delete` is not function');
    });
  });
  describe('.beforeActionHook', () => {
    it('should parse action params as arguments', () => {

      @initialize
      @plugin(RestfulAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = __dirname;
      }

      @initialize
      @partOf(Test)
      class TestResource extends Test.NS.Resource {
        @nameBy static __filename = 'TestResource';
        @meta static object = {};
        @property entityName = 'TestEntity';
      }
      const resource = TestResource.new();
      Reflect.defineProperty(resource, 'context', {
        writable: true,
        value: void 0
      });
      const ctx = Symbol('ctx');
      resource.beforeActionHook(ctx);
      assert.strictEqual(resource.context, ctx, 'beforeActionHook called with context and set it in resource.context');
    });
  });
  describe('.getRecordId', () => {
    it('should get resource record ID', () => {

      @initialize
      @plugin(RestfulAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = __dirname;
      }

      @initialize
      @partOf(Test)
      class TestResource extends Test.NS.Resource {
        @nameBy static __filename = 'TestResource';
        @meta static object = {};
        @property entityName = 'TestEntity';
      }
      const resource = TestResource.new();
      Reflect.defineProperty(resource, 'recordId', {
        writable: true,
        value: void 0
      });
      Reflect.defineProperty(resource, 'context', {
        writable: true,
        value: {
          pathParams: {
            test_entity: 'ID123456'
          }
        }
      });
      resource.getRecordId();
      assert.deepEqual(resource.recordId, 'ID123456');
    });
  });
  describe('.getRecordBody', () => {
    it('should get body', () => {

      @initialize
      @plugin(RestfulAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = __dirname;
      }

      @initialize
      @partOf(Test)
      class TestResource extends Test.NS.Resource {
        @nameBy static __filename = 'TestResource';
        @meta static object = {};
        @property entityName = 'TestEntity';
      }
      const resource = TestResource.new();
      Reflect.defineProperty(resource, 'recordBody', {
        writable: true,
        value: void 0
      });
      Reflect.defineProperty(resource, 'context', {
        writable: true,
        value: {
          request: {
            body: {
              test_entity: {
                test: 'test9'
              }
            }
          }
        }
      });
      resource.getRecordBody();
      assert.deepEqual(resource.recordBody, {
        test: 'test9'
      });
    });
  });
  describe('.omitBody', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should clean body from unneeded properties', () => {
      const TEST_FACADE = 'TEST_FACADE_002';
      const collectionName = 'TestEntitiesCollection';

      @initialize
      @plugin(RestfulAddon)
      @plugin(MapperAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = __dirname;
      }

      @initialize
      @partOf(Test)
      class ApplicationFacade extends Test.NS.Facade {
        @nameBy static __filename = 'ApplicationFacade';
        @meta static object = {};
      }
      facade = ApplicationFacade.getInstance(TEST_FACADE);

      @initialize
      @partOf(Test)
      class TestResource extends Test.NS.Resource {
        @nameBy static __filename = 'TestResource';
        @meta static object = {};
        @property entityName = 'TestEntity';
      }

      @initialize
      @partOf(Test)
      class TestsCollection extends Test.NS.Collection {
        @nameBy static __filename = 'TestsCollection';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestEntityRecord extends Test.NS.Record {
        @nameBy static __filename = 'TestEntityRecord';
        @meta static object = {};
        @Test.NS.attribute({ type: 'string' }) test;
        @method static findRecordByName() {
          return TestEntityRecord;
        }
      }

      @initialize
      @partOf(Test)
      @mixin(Test.NS.MemoryAdapterMixin)
      class TestAdapter extends LeanES.NS.Adapter {
        @nameBy static __filename = 'TestAdapter';
        @meta static object = {};
      }
      facade.addCommand('TestResource');
      const resource = facade.getCommand('TestResource');
      resource.initializeNotifier(TEST_FACADE);
      facade.addProxy(collectionName, 'TestsCollection', {
        delegate: 'TestEntityRecord',
        adapter: 'TestAdapter'
      });
      const boundCollection = facade.getProxy(collectionName);
      Reflect.defineProperty(resource, 'recordBody', {
        writable: true,
        value: void 0
      });
      Reflect.defineProperty(resource, 'context', {
        writable: true,
        value: {
          request: {
            body: {
              test_entity: {
                _id: '123',
                test: 'test9',
                _space: 'test',
                type: 'TestEntityRecord'
              }
            }
          }
        }
      });
      resource.getRecordBody();
      resource.omitBody();
      assert.deepEqual(resource.recordBody, {
        test: 'test9',
        type: 'Test::TestEntityRecord'
      });
    });
  });
  describe('.beforeUpdate', () => {
    it('should get body with ID', () => {

      @initialize
      @plugin(RestfulAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = __dirname;
      }

      @initialize
      @partOf(Test)
      class TestResource extends Test.NS.Resource {
        @nameBy static __filename = 'TestResource';
        @meta static object = {};
        @property entityName = 'TestEntity';
      }
      const resource = TestResource.new();
      Reflect.defineProperty(resource, 'recordId', {
        writable: true,
        value: void 0
      });
      Reflect.defineProperty(resource, 'recordBody', {
        writable: true,
        value: void 0
      });
      Reflect.defineProperty(resource, 'context', {
        writable: true,
        value: {
          pathParams: {
            test_entity: 'ID123456'
          },
          request: {
            body: {
              test_entity: {
                test: 'test9'
              }
            }
          }
        }
      });
      resource.getRecordId();
      resource.getRecordBody();
      resource.beforeUpdate();
      assert.deepEqual(resource.recordBody, {
        id: 'ID123456',
        test: 'test9'
      });
    });
  });
  describe('.list', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should list of resource items', async () => {
      const KEY = 'TEST_RESOURCE_001';

      @initialize
      @plugin(RestfulAddon)
      @plugin(MapperAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config/`;
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
      class TestRecord extends Test.NS.Record {
        @nameBy static __filename = 'TestRecord';
        @meta static object = {};
        @Test.NS.attribute({ type: 'string' }) test;
        @method static findRecordByName() {
          return TestRecord
        }
      }

      @initialize
      @partOf(Test)
      class TestResource extends Test.NS.Resource {
        @nameBy static __filename = 'TestResource';
        @meta static object = {};
        @property entityName = 'TestEntity';
      }

      @initialize
      @partOf(Test)
      class TestsCollection extends Test.NS.Collection {
        @nameBy static __filename = 'TestsCollection';
        @meta static object = {};
        @method generateId() {
          return  LeanES.NS.Utils.uuid.v4();
        }
        @method async takeAll() {
          const cursor = Test.NS.Cursor.new();
          cursor.setCollection(this);
          cursor.setIterable(this.getData().data);
          return cursor
        }
        @method push(aoRecord) {
          const i = aoRecord.toJSON();
          this.getData().data.push(i);
          return aoRecord;
        }
        @method async includes() {
          return await (_.find(this.getData().data, { id })) != null;
        }
      }

      @initialize
      @partOf(Test)
      class TestRouter extends Test.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }

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

      const req = {
        method: 'GET',
        url: 'http://localhost:8888/space/SPACE123/test_entitis',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const res = new MyResponse();
      facade.addProxy('TEST_SWITCH_ROUTER', 'TestRouter');
      const router = facade.getProxy('TEST_SWITCH_ROUTER');

      @initialize
      @partOf(Test)
      class TestSwitch extends Test.NS.HttpMediator {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      facade.addMediator('TEST_SWITCH_MEDIATOR', 'TestSwitch');
      const switchM = facade.getMediator('TEST_SWITCH_MEDIATOR');

      const COLLECTION_NAME = 'TestEntitiesCollection';
      facade.addProxy(COLLECTION_NAME, 'TestsCollection', {
        delegate: 'TestRecord',
        data: []
      });
      const collection = facade.getProxy(COLLECTION_NAME);
      await collection.create({
        test: 'test1'
      });
      await collection.create({
        test: 'test2'
      });
      facade.addCommand('TestResource');
      const resource = facade.getCommand('TestResource');
      resource.initializeNotifier(KEY);
      const context = Test.NS.Context.new();
      context.request = Test.NS.HttpRequest.new();
      context.response = Test.NS.HttpResponse.new();
      context.cookies = Test.NS.HttpCookies.new();
      context.setReqResPair(req, res);
      const { items, meta: metaResult } = await resource.list(context);
      assert.deepEqual(metaResult, {
        pagination: {
          limit: 'not defined',
          offset: 'not defined'
        }
      });

      assert.propertyVal(items[0], 'test', 'test1');
      assert.propertyVal(items[1], 'test', 'test2');
    });
  });
  describe('.detail', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get resource single item', async () => {
      const KEY = 'TEST_RESOURCE_002';

      @initialize
      @plugin(RestfulAddon)
      @plugin(MapperAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config`;
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
      class TestRecord extends Test.NS.Record {
        @nameBy static __filename = 'TestRecord';
        @meta static object = {};
        @Test.NS.attribute({ type: 'string' }) test;
        @method static findRecordByName() {
          return TestRecord;
        }
      }

      @initialize
      @partOf(Test)
      class TestResource extends Test.NS.Resource {
        @nameBy static __filename = 'TestResource';
        @meta static object = {};
        @property entityName = 'TestEntity';
      }

      @initialize
      @partOf(Test)
      class TestsCollection extends Test.NS.Collection {
        @nameBy static __filename = 'TestsCollection';
        @meta static object = {};
        @method generateId() {
          return  LeanES.NS.Utils.uuid.v4();
        }
        @method push(aoRecord) {
          const i = aoRecord.toJSON();
          this.getData().data.push(i);
          return aoRecord;
        }
        @method async take(id) {
          const result = [];
          const data = _.find(this.getData().data, { id });
          if (data != null) {
            result.push(data);
          }
          const cursor = Test.NS.Cursor.new();
          cursor.setCollection(this);
          cursor.setIterable(result);
          return await cursor.first();
        }
        @method async includes(id) {
          return await (_.find(this.getData().data, { id })) != null;
        }
      }

      @initialize
      @partOf(Test)
      class TestRouter extends Test.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }

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
      const req = {
        method: 'GET',
        url: 'http://localhost:8888/space/SPACE123/test_entitis',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const res = new MyResponse();
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);

      @initialize
      @partOf(Test)
      class TestSwitch extends Test.NS.HttpMediator {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      facade.addMediator('TEST_SWITCH_MEDIATOR', 'TestSwitch');
      const switchM = facade.getMediator('TEST_SWITCH_MEDIATOR');

      const COLLECTION_NAME = 'TestEntitiesCollection';
      facade.addProxy(COLLECTION_NAME, 'TestsCollection', {
        delegate: 'TestRecord',
        data: []
      });
      const collection = facade.getProxy(COLLECTION_NAME);

      await collection.create({
        test: 'test1'
      });
      const record = await collection.create({
        test: 'test2'
      });
      facade.addCommand('TestResource');
      const resource = facade.getCommand('TestResource');
      resource.initializeNotifier(KEY);
      const context = Test.NS.Context.new();
      context.request = Test.NS.HttpRequest.new();
      context.response = Test.NS.HttpResponse.new();
      context.cookies = Test.NS.HttpCookies.new();
      context.setReqResPair(req, res);
      context.pathParams = {
        [`${resource.keyName}`]: record.id
      };
      const result = await resource.detail(context);
      assert.propertyVal(result, 'id', record.id);
      assert.propertyVal(result, 'test', 'test2');
    });
  });
  describe('.create', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should create resource single item', async () => {
      const KEY = 'TEST_RESOURCE_003';

      @initialize
      @plugin(RestfulAddon)
      @plugin(MapperAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config`;
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
      class TestRecord extends Test.NS.Record {
        @nameBy static __filename = 'TestRecord';
        @meta static object = {};
        @Test.NS.attribute({ type: 'string' }) test;
        @method static findRecordByName() {
          return TestRecord;
        }
      }

      @initialize
      @partOf(Test)
      class TestResource extends Test.NS.Resource {
        @nameBy static __filename = 'TestResource';
        @meta static object = {};
        @property entityName = 'TestEntity';
      }

      @initialize
      @partOf(Test)
      class TestsCollection extends Test.NS.Collection {
        @nameBy static __filename = 'TestsCollection';
        @meta static object = {};
        @method generateId() {
          return  LeanES.NS.Utils.uuid.v4();
        }
        @method push(aoRecord) {
          const i = aoRecord.toJSON();
          this.getData().data.push(i);
          return aoRecord;
        }
        @method async take(id) {
          const result = [];
          const data = _.find(this.getData().data, { id });
          if (data != null) {
            result.push(data);
          }
          const cursor = Test.NS.Cursor.new();
          cursor.setCollection(this);
          cursor.setIterable(result);
          return await cursor.first();
        }
        @method async includes(id) {
          return await (_.find(this.getData().data, { id })) != null;
        }
      }
      const COLLECTION_NAME = 'TestEntitiesCollection';
      facade.addProxy(COLLECTION_NAME, 'TestsCollection', {
        delegate: 'TestRecord',
        data: []
      });
      const collection = facade.getProxy(COLLECTION_NAME);

      facade.addCommand('TestResource');
      const resource = facade.getCommand('TestResource');
      resource.initializeNotifier(KEY);
      Reflect.defineProperty(resource, 'recordBody', {
        writable: true,
        value: void 0
      });
      Reflect.defineProperty(resource, 'context', {
        writable: true,
        value: void 0
      });
      const ctx = {
        request: {
          body: {
            test_entity: {
              test: 'test3'
            }
          }
        }
      };
      const result = await resource.create(ctx);
      assert.propertyVal(result, 'test', 'test3');
    });
  });
  describe('.update', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should update resource single item', async () => {
      const KEY = 'TEST_RESOURCE_005';

      @initialize
      @plugin(RestfulAddon)
      @plugin(MapperAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config`;
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
      class TestRecord extends Test.NS.Record {
        @nameBy static __filename = 'TestRecord';
        @meta static object = {};
        @Test.NS.attribute({ type: 'string' }) test;
        @method static findRecordByName() {
          return TestRecord;
        }
      }

      @initialize
      @partOf(Test)
      class TestResource extends Test.NS.Resource {
        @nameBy static __filename = 'TestResource';
        @meta static object = {};
        @property entityName = 'TestEntity';
      }

      @initialize
      @partOf(Test)
      class TestCollection extends Test.NS.Collection {
        @nameBy static __filename = 'TestCollection';
        @meta static object = {};
        @method generateId() {
          return  LeanES.NS.Utils.uuid.v4();
        }
        @method async push(aoRecord) {
          const i = aoRecord.toJSON();
          this.getData().data.push(i);
          return aoRecord;
        }
        @method override(id, aoRecord) {
          const item = _.find(this.getData().data, { id });
          if (item != null) {
            const FORBIDDEN = ['_key', '_id', '_type', '_rev'];
            const snapshot = _.omit(((typeof aoRecord.toJSON === "function" ? aoRecord.toJSON() : void 0) != null ? aoRecord.toJSON() : aoRecord) != null ? aoRecord : {}, FORBIDDEN);
            for (let key in snapshot) {
              if (!hasProp.call(snapshot, key)) continue;
              const value = snapshot[key];
              item[key] = value;
            }
          }
          return aoRecord;
        }
        @method async take(id) {
          const result = [];
          const data = _.find(this.getData().data, { id });
          if (data != null) {
            result.push(data);
          }
          const cursor = Test.NS.Cursor.new();
          cursor.setCollection(this);
          cursor.setIterable(result);
          return await cursor.first();
        }
        @method async includes(id) {
          return await (_.find(this.getData().data, { id })) != null;
        }
      }
      const COLLECTION_NAME = 'TestEntitiesCollection';
      facade.addProxy(COLLECTION_NAME, 'TestCollection', {
        delegate: 'TestRecord',
        data: []
      });
      const collection = facade.getProxy(COLLECTION_NAME);

      facade.addCommand('TestResource');
      const resource = facade.getCommand('TestResource');
      resource.initializeNotifier(KEY);
      Reflect.defineProperty(resource, 'recordId', {
        writable: true,
        value: void 0
      });
      Reflect.defineProperty(resource, 'recordBody', {
        writable: true,
        value: void 0
      });
      Reflect.defineProperty(resource, 'context', {
        writable: true,
        value: void 0
      });
      const record = await collection.create({
        test: 'test3'
      });
      const ctx = {
        type: 'Test::TestRecord',
        pathParams: {
          test_entity: record.id
        },
        request: {
          body: {
            test_entity: {
              test: 'test8'
            }
          }
        }
      };
      const result = await resource.update(ctx);

      assert.propertyVal(result, 'test', 'test8');
    });
  });
  describe('.delete', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should remove resource single item', async () => {
      const KEY = 'TEST_RESOURCE_006';

      @initialize
      @plugin(RestfulAddon)
      @plugin(MapperAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config`;
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
      class TestRecord extends Test.NS.Record {
        @nameBy static __filename = 'TestRecord';
        @meta static object = {};
        @Test.NS.attribute({ type: 'string' }) test;
        @method static findRecordByName() {
          return TestRecord;
        }
      }

      @initialize
      @partOf(Test)
      class TestResource extends Test.NS.Resource {
        @nameBy static __filename = 'TestResource';
        @meta static object = {};
        @property entityName = 'TestEntity';
      }

      @initialize
      @partOf(Test)
      class TestsCollection extends Test.NS.Collection {
        @nameBy static __filename = 'TestsCollection';
        @meta static object = {};
        @method generateId() {
          return  LeanES.NS.Utils.uuid.v4();
        }
        @method async push(aoRecord) {
          const i = aoRecord.toJSON();
          this.getData().data.push(i);
          return aoRecord;
        }
        @method async remove(id) {
          delete this[id];
        }
        @method async take(id) {
          const result = [];
          const data = _.find(this.getData().data, { id });
          if (data != null) {
            result.push(data);
          }
          const cursor = Test.NS.Cursor.new();
          cursor.setCollection(this);
          cursor.setIterable(result);
          return await cursor.first();
        }
        @method async includes(id) {
          return await (_.find(this.getData().data, { id })) != null;
        }
      }

      @initialize
      @partOf(Test)
      class TestRouter extends Test.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }

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
      }

      const req = {
        method: 'GET',
        url: 'http://localhost:8888/space/SPACE123/test_entity',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const res = new MyResponse();
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);

      @initialize
      @partOf(Test)
      class TestSwitch extends Test.NS.HttpMediator {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      facade.addMediator('TEST_SWITCH_MEDIATOR', 'TestSwitch');
      const switchM = facade.getMediator('TEST_SWITCH_MEDIATOR');

      const COLLECTION_NAME = 'TestEntitiesCollection';
      facade.addProxy(COLLECTION_NAME, 'TestsCollection', {
        delegate: 'TestRecord',
        data: []
      });
      const collection = facade.getProxy(COLLECTION_NAME);

      facade.addCommand('TestResource');
      const resource = facade.getCommand('TestResource');
      resource.initializeNotifier(KEY);
      const context = Test.NS.Context.new();
      context.request = Test.NS.HttpRequest.new();
      context.response = Test.NS.HttpResponse.new();
      context.cookies = Test.NS.HttpCookies.new();
      context.setReqResPair(req, res);
      const record = await collection.create({
        test: 'test3'
      });
      context.pathParams = {
        test_entity: record.id
      };
      const result = await resource.delete(context);
      assert.isUndefined(result);
    });
  });
  describe('.execute', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should call execution', async () => {
      const KEY = 'TEST_RESOURCE_008';

      @initialize
      @plugin(RestfulAddon)
      @plugin(MapperAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config`;
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
      class TestRecord extends Test.NS.Record {
        @nameBy static __filename = 'TestRecord';
        @meta static object = {};
        @Test.NS.attribute({ type: 'string' }) test;
        @method static findRecordByName() {
          return TestRecord;
        }
      }

      @initialize
      @partOf(Test)
      class TestResource extends Test.NS.Resource {
        @nameBy static __filename = 'TestResource';
        @meta static object = {};
        @property entityName = 'TestEntity';
      }

      @initialize
      @partOf(Test)
      class TestsCollection extends Test.NS.Collection {
        @nameBy static __filename = 'TestsCollection';
        @meta static object = {};
        @property jobs = {};
        @method generateId() {
          return  LeanES.NS.Utils.uuid.v4();
        }
        @method async takeAll() {
          const cursor = Test.NS.Cursor.new();
          cursor.setCollection(this);
          cursor.setIterable(this.getData().data);
          return cursor;
        }

        @method push(aoRecord) {
          aoRecord.id = LeanES.NS.Utils.uuid.v4();
          const i = aoRecord.toJSON();
          this.getData().data.push(i);
          return aoRecord;
        }

        @method remove(id) {
          _.remove(this.getData().data, { id });
        }
        @method async take(id) {
          const result = [];
          const data = _.find(this.getData().data, { id })
          if (data != null) {
            result.push(data);
          }
          const cursor = Test.NS.Cursor.new();
          cursor.setCollection(this);
          cursor.setIterable(result);
          await cursor.first();
        }

        @method includes(id) {
          return (_.find(this.getData().data, { id })) != null;
        }
      }

      @initialize
      @partOf(Test)
      class TestRouter extends Test.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }

      class MyResponse extends EventEmitter {
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
      }
      const req = {
        method: 'GET',
        url: 'http://localhost:8888/space/SPACE123/test_entitis',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const res = new MyResponse();
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);

      @initialize
      @partOf(Test)
      class TestSwitch extends Test.NS.HttpMediator {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      facade.addMediator('TEST_SWITCH_MEDIATOR', 'TestSwitch');
      const switchMediator = facade.getMediator('TEST_SWITCH_MEDIATOR');

      const COLLECTION_NAME = 'TestEntitiesCollection';
      facade.addProxy(COLLECTION_NAME, 'TestsCollection', {
        delegate: 'TestRecord',
        data: []
      });
      const collection = facade.getProxy(COLLECTION_NAME);

      const mediatorM = LeanES.NS.Mediator.new();
      mediatorM.setName(LeanES.NS.APPLICATION_MEDIATOR);
      mediatorM.setViewComponent({
        context: {}
      });
      facade.registerMediator(mediatorM);

      facade.addCommand('TestResource');
      const resource = facade.getCommand('TestResource');
      resource.initializeNotifier(KEY);

      const context = Test.NS.Context.new();
      context.request = Test.NS.HttpRequest.new();
      context.response = Test.NS.HttpResponse.new();
      context.cookies = Test.NS.HttpCookies.new();
      context.setReqResPair(req, res);
      context.query = {
        query: '{"test":{"$eq":"test2"}}'
      };
      await collection.create({
        test: 'test1'
      });
      await collection.create({
        test: 'test2'
      });
      await collection.create({
        test: 'test2'
      });
      const spySendNotitfication = sinon.spy(resource, 'sendNotification');
      const testBody = {
        context: context,
        reverse: 'TEST_REVERSE'
      };
      const notification = Test.NS.Notification.new('TEST_NAME', testBody, 'list');
      await resource.execute(notification);
      const [name, body, type] = spySendNotitfication.lastCall.args;
      assert.equal(name, Test.NS.RESOURCE_RESULT);
      assert.isUndefined(body.error, body.error);
      const {
        result,
        resource: voResource
      } = body;
      const { meta:resultMeta, items } = result;
      assert.deepEqual(resultMeta, {
        pagination: {
          limit: 'not defined',
          offset: 'not defined'
        }
      });
      assert.deepEqual(voResource, resource);
      assert.lengthOf(items, 3);
      assert.equal(type, 'TEST_REVERSE');
    });
  });
  describe('.checkExistence', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should check if entity exists', async () => {
      const KEY = 'TEST_RESOURCE_102';

      @initialize
      @plugin(RestfulAddon)
      @plugin(MapperAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config`;
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
      }

      const req = {
        method: 'GET',
        url: 'http://localhost:8888/space/SPACE123/test_entity/ID123456',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const res = new MyResponse();
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);

      @initialize
      @partOf(Test)
      class TestSwitch extends Test.NS.HttpMediator {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER'
      }

      @initialize
      @partOf(Test)
      class TestEntityRecord extends Test.NS.Record {
        @nameBy static __filename = 'TestEntityRecord';
        @meta static object = {};
        @Test.NS.attribute({ type: 'string' }) test;
        @Test.NS.attribute({ type: 'string' }) ownerId;
        @method static findRecordByName() {
          return TestEntityRecord;
        }
      }

      @initialize
      @partOf(Test)
      @mixin(Test.NS.GenerateUuidIdMixin)
      class TestCollection extends Test.NS.Collection {
        @nameBy static __filename = 'TestCollection';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      @mixin(Test.NS.MemoryAdapterMixin)
      class TestAdapter extends Test.NS.Adapter {
        @nameBy static __filename = 'TestAdapter';
        @meta static object = {};
      }

      facade.addCommand('TestResource');
      let resource = facade.getCommand('TestResource');
      resource.initializeNotifier(KEY);

      const collectionName = 'TestEntitiesCollection';
      facade.addAdapter('TestAdapter');
      facade.addProxy(collectionName, 'TestCollection', {
        delegate: 'TestEntityRecord',
        adapter: 'TestAdapter'
      });
      const boundCollection = facade.getProxy(collectionName);
      await boundCollection.create({
        id: 'ID123456',
        test: 'test',
        ownerId: 'ID124'
      });
      await boundCollection.create({
        id: 'ID123457',
        test: 'test',
        ownerId: 'ID123'
      });
      facade.addMediator('TEST_SWITCH_MEDIATOR', 'TestSwitch');
      const switchMediator = facade.getMediator('TEST_SWITCH_MEDIATOR');

      facade.addCommand('TestResource');
      resource = facade.getCommand('TestResource');
      resource.initializeNotifier(KEY);

      const context = Test.NS.Context.new();
      context.request = Test.NS.HttpRequest.new();
      context.response = Test.NS.HttpResponse.new();
      context.cookies = Test.NS.HttpCookies.new();
      context.setReqResPair(req, res);

      resource.context = context;
      resource.context.pathParams = {
        test_entity: 'ID123455',
        space: 'SPACE123'
      };
      resource.context.request.body = {
        test_entity: {
          test: 'test9'
        }
      };
      resource.getRecordId();
      resource.session = {
        uid: 'ID123',
        userIsAdmin: false
      };
      let e;
      try {
        await resource.checkExistence();
      } catch (error) {
        e = error;
      }
      assert.instanceOf(e, httpErrors.NotFound);
      resource.context.pathParams.test_entity = 'ID123457';
      resource.getRecordId();
      await resource.checkExistence();
    });
  });
  describe('.doAction', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should run specified action', async () => {
      const KEY = 'TEST_RESOURCE_104';
      const testAction = sinon.spy(function () {
        return true;
      });

      @initialize
      @plugin(RestfulAddon)
      @plugin(MapperAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config`;
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
      class TestResource extends Test.NS.Resource {
        @nameBy static __filename = 'TestResource';
        @meta static object = {};
        @Test.NS.action test(context) {
          testAction(context);
        }
      }

      @initialize
      @partOf(Test)
      class TestRouter extends Test.NS.Router {
        @nameBy static __filename = 'TestRouter';
        @meta static object = {};
      }

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
      }
      const req = {
        method: 'GET',
        url: 'http://localhost:8888/space/SPACE123/test_entity/ID123456',
        headers: {
          'x-forwarded-for': '192.168.0.1'
        }
      };
      const res = new MyResponse();
      const router = TestRouter.new();
      router.setName('TEST_SWITCH_ROUTER');
      facade.registerProxy(router);

      @initialize
      @partOf(Test)
      class TestSwitch extends Test.NS.HttpMediator {
        @nameBy static __filename = 'TestSwitch';
        @meta static object = {};
        @property routerName = 'TEST_SWITCH_ROUTER';
      }

      facade.addCommand('TestResource');
      let resource = facade.getCommand('TestResource');
      resource.initializeNotifier(KEY);

      facade.addMediator('TEST_SWITCH_MEDIATOR', 'TestSwitch');
      const switchMediator = facade.getMediator('TEST_SWITCH_MEDIATOR');

      facade.addCommand('TestResource');
       resource = facade.getCommand('TestResource');
      resource.initializeNotifier(KEY);

      const context = Test.NS.Context.new();
      context.request = Test.NS.HttpRequest.new();
      context.response = Test.NS.HttpResponse.new();
      context.cookies = Test.NS.HttpCookies.new();
      context.setReqResPair(req, res);
      await resource.doAction('test', context);
      assert.isTrue(testAction.called);
      assert.isTrue(testAction.calledWith(context));
    });
  });
});
