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

import parse from 'co-body';

export default (Module) => {
  const {
    initializeMixin, meta, method, property
  } = Module.NS;

  Module.defineMixin(__filename, (BaseClass) => {
    @initializeMixin
    class Mixin extends BaseClass {
      @meta static object = {};

      @property withRawBody = false;

      @method async parseBody(...args) {
        const { parsed, raw } = await parse(this.context.req, {returnRawBody: this.withRawBody});
        this.context.request.body = parsed;
        this.context.request.raw = raw;
        return args;
      }
    }
    return Mixin;
  });
}
