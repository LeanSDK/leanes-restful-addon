// This file is part of leanes-restful-addon.
//
// leanes-restful-addon is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// leanes-restful-addon is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with leanes-restful-addon.  If not, see <https://www.gnu.org/licenses/>.

import type { CollectionInterface } from '../interfaces/CollectionInterface';
import type { RecordInterface } from '../interfaces/RecordInterface';

const slice = [].slice;

export default (Module) => {
  const {
    initializeMixin, meta, method, property, inject,
    Utils: { assert }
  } = Module.NS;

  Module.defineMixin(__filename, (BaseClass) => {
    @initializeMixin
    class Mixin< D = RecordInterface > extends BaseClass {
      @meta static object = {};

      @inject('CollectionFactory<*>')
      @property _collectionFactory: () => CollectionInterface<D>;

      @property get _migrations(): CollectionInterface {
        return this._collectionFactory(this.ApplicationModule.NS.MIGRATIONS);
      }

      @method async checkSchemaVersion(...args) {
        const migrationNames = this.ApplicationModule.NS.MIGRATION_NAMES;
        const [ lastMigration ] = slice.call(migrationNames, -1);
        if (lastMigration == null) {
          return args;
        }
        const includes = await this._migrations.includes(lastMigration);
        if (includes) {
          return args;
        } else {
          assert.fail('Code schema version is not equal current DB version');
        }
        return args;
      }
    }
    return Mixin;
  });
}
