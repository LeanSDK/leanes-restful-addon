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

import type { HttpCookiesInterface } from '../interfaces/HttpCookiesInterface';

import Keygrip from 'keygrip';
import NodeCookies from 'cookies';

export default (Module) => {
  const {
    CoreObject,
    assert,
    initialize, partOf, meta, property, method, nameBy, injectable,
    Utils: { _ }
  } = Module.NS;

  @initialize
  @injectable()
  @partOf(Module)
  class HttpCookies extends CoreObject implements HttpCookiesInterface {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    // ipoCookies = PointerT(Cookies.protected({
    @property _cookies: ?object = null;

    @property req: ?object = null;

    @property res: ?object = null;

    @property key: ?string = null;

    @method 'get'(name: string, opts: ?object): ?string {
      return this._cookies.get(name, opts);
    }

    @method 'set'(name: string, value: any, opts: ?object): HttpCookiesInterface {
      this._cookies.set(name, value, opts);
      return this;
    }

    @method static async restoreObject() {
      assert.fail(`restoreObject method not supported for ${this.name}`);
    }

    @method static async replicateObject() {
      assert.fail(`replicateObject method not supported for ${this.name}`);
    }

    @method setReqResOpts(
      req: object, res: object, opts: ?{|
        key: ?string, secure: ?boolean
      |} = {}
    ): void {
      const key = opts.key || 'secret';
      const secure = opts.secure || false;
      this.req = req;
      this.res = res;
      this.key = key;
      const keys = new Keygrip([key], 'sha256', 'hex');
      this._cookies = new NodeCookies(req, res, { keys, secure });
    }
  }
}
