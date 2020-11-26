const { expect, assert } = require('chai');
const addonPath = process.env.ENV === 'build' ? "../../lib/index.dev" : "../../src/index.js";
const RestfulAddon = require(addonPath).default;
const LeanES = require('@leansdk/leanes/src').default;
const {
  CoreObject,
  initialize, partOf, nameBy, meta, plugin
} = LeanES.NS;

describe('action', () => {
  describe('action(target, key, descriptor)', () => {
    it('should add actions in metaObject', () => {
      expect(() => {

        @initialize
        @plugin(RestfulAddon)
        class Test extends LeanES {
          @nameBy static __filename = 'Test';
          @meta static object = {};
        }

        @initialize
        @partOf(Test)
        class SubTest extends Test.NS.CoreObject {
          @nameBy static __filename = 'SubTest';
          @meta static object = {};
          @Test.NS.action test() {}
        }
        assert.equal(SubTest.metaObject.parent.data.instanceMethods.test, SubTest.new().test);
        assert.equal(SubTest.metaObject.parent.data.actions.test, SubTest.new().test)
      }).to.not.throw(Error);
    });
    it('Decorator `action` may be used with instance methods only(fail)', () => {
      expect(() => {

        @initialize
        class Test extends LeanES {
          @nameBy static __filename = 'Test';
          @meta static object = {};
        }

        @initialize
        @partOf(Test)
        class SubTest extends Test.NS.CoreObject {
          @nameBy static __filename = 'SubTest';
          @meta static object = {};
          @Test.NS.action static test() {}
        }
      }).to.throw(Error);
    });
  });
});
