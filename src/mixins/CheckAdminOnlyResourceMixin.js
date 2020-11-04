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

export default (Module) => {
  const {
    Resource,
    initializeMixin, meta, method,
    Utils: { statuses }
  } = Module.NS;

  const UNAUTHORIZED = statuses('unauthorized');
  const FORBIDDEN = statuses('forbidden');

  Module.defineMixin(__filename, (BaseClass: Class<Resource>) => {
    @initializeMixin
    class Mixin extends BaseClass {
      @meta static object = {};

      @method async adminOnly(...args) {
        if (this.session.uid == null) {
          this.context.throw(UNAUTHORIZED);
          return;
        }
        if (!this.session.userIsAdmin) {
          this.context.throw(FORBIDDEN);
          return;
        }
        return args;
      }
    }
    return Mixin;
  });
}
