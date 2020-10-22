

export default (Module) => {
  const {
    initialize, module: moduleD, nameBy, meta, method
  } = Module.NS;

  @initialize
  @moduleD(Module)
  class FirstMigration extends Module.NS.TestMigration {
    @nameBy static __filename = 'FirstMigration';
    @meta static object = {};
    @method static change() {}
  }
}
