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

import semver from 'semver';

export default (Module) => {
  const {
    initializeMixin, meta, method,
    Utils: { assert, statuses }
  } = Module.NS;

  const UPGRADE_REQUIRED = statuses('upgrade required');

  Module.defineMixin(__filename, (BaseClass) => {
    @initializeMixin
    class Mixin extends BaseClass {
      @meta static object = {};

      @method async checkApiVersion(...args) {
        const vVersion = this.context.pathParams.v;
        assert(this.configs != null, `Needs to add '@mixin(ConfigurableMixin)' decorator to ${this.constructor.name}`);
        const vCurrentVersion = this.configs.version;
        assert(vCurrentVersion != null, 'No `version` specified in the configuration');
        const [ vNeedVersion ] = vCurrentVersion.match(/^\d{1,}[.]\d{1,}/) || [];
        assert(vNeedVersion != null, 'Incorrect `version` specified in the configuration');
        if (!semver.satisfies(vCurrentVersion, vVersion)) {
          this.context.throw(UPGRADE_REQUIRED, `Upgrade: v${vCurrentVersion}`);
        }
        return args;
      }
    }
    return Mixin;
  });
}
