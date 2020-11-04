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
    initializeMixin, meta, method, property,
    Utils: { _, statuses }
  } = Module.NS;

  const HTTP_NOT_FOUND = statuses('not found');
  const UNAUTHORIZED = statuses('unauthorized');
  const FORBIDDEN = statuses('forbidden');

  Module.defineMixin(__filename, (BaseClass: Class<Resource>) => {
    @initializeMixin
    class Mixin extends BaseClass {
      @meta static object = {};

      @property listQuery: object = {};

      @method async setOwnerId(...args) {
        this.recordBody.ownerId = this.session.uid || null;
        return args;
      }

      @method async protectOwnerId(...args) {
        this.recordBody = _.omit(this.recordBody, ['ownerId']);
        return args;
      }

      @method async filterOwnerByCurrentUser(...args) {
        if (this.listQuery.$filter != null) {
          this.listQuery.$filter = {
            $and: [
              this.listQuery.$filter,
              {
                '@doc.ownerId': {
                  $eq: this.session.uid
                }
              }
            ]
          };
        } else {
          this.listQuery.$filter = {
            '@doc.ownerId': {
              $eq: this.session.uid
            }
          };
        }
        return args;
      }

      @method async checkOwner(...args) {
        if (this.session.uid == null) {
          this.context.throw(UNAUTHORIZED);
          return;
        }
        if (this.session.userIsAdmin) {
          return args;
        }
        const key = this.context.pathParams[this.keyName];
        if (key == null) {
          return args;
        }
        const doc = await this.collection.find(key);
        if (doc == null) {
          this.context.throw(HTTP_NOT_FOUND);
        }
        if (!doc.ownerId) {
          return args;
        }
        if (this.session.uid !== doc.ownerId) {
          this.context.throw(FORBIDDEN);
          return;
        }
        return args;
      }
    }
    return Mixin;
  });
}
