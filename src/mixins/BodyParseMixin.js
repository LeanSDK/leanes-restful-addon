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

// import parse from 'co-body';
import rawBody from 'raw-body';
import inflate from 'inflation';

export default (Module) => {
  const {
    initializeMixin, meta, method, property
  } = Module.NS;

  Module.defineMixin(__filename, (BaseClass) => {
    @initializeMixin
    class Mixin extends BaseClass {
      @meta static object = {};

      @property withRawBody = false;

      @method _parse(str, {strict}) {
        // Allowed whitespace is defined in RFC 7159
        // http://www.rfc-editor.org/rfc/rfc7159.txt
        const strictJSONReg = /^[\x20\x09\x0a\x0d]*(\[|\{)/;
        if (!strict) return str ? JSON.parse(str) : str;
        // strict mode always return object
        if (!str) return {};
        // strict JSON test
        if (!strictJSONReg.test(str)) {
          throw new SyntaxError('invalid JSON, only supports object and array');
        }
        return JSON.parse(str);
      }

      @method async parseBody(...args) {
        const opts = {};
        const len = this.context.req.headers['content-length'];
        const encoding = this.context.req.headers['content-encoding'] || 'identity';
        if (len && encoding === 'identity') opts.length = ~~len;
        opts.encoding = 'utf8';
        opts.limit = '1mb';
        const strict = true;
        const str = await rawBody(inflate(req), opts);
        try {
          const parsed = this._parse(str, {strict});
          this.context.request.body = parsed;
          if (this.withRawBody) this.context.request.raw = str;
          return args;
        } catch (err) {
          err.status = 400;
          err.body = str;
          throw err;
        }
      }
    }
    return Mixin;
  });
}
