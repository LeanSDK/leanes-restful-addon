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

import { is as typeis } from 'type-is';
import contentType from 'content-type';
import qs from 'querystring';
import { format as stringify } from 'url';
import parse from 'parseurl';
import fresh from 'fresh';
import net from 'net';

import type { ContextInterface } from '../interfaces/ContextInterface';
import type { HttpRequestInterface } from '../interfaces/HttpRequestInterface';

/*
Идеи взяты из https://github.com/koajs/koa/blob/master/lib/request.js
*/

export default (Module) => {
  const {
    CoreObject,
    // ConfigurableMixin,
    assert,
    initialize, partOf, meta, property, method, nameBy, mixin, injectable,
    Utils: { _ }
  } = Module.NS;

  @initialize
  @injectable()
  @partOf(Module)
  // @mixin(ConfigurableMixin)
  class HttpRequest extends CoreObject implements HttpRequestInterface {
    @nameBy static __filename = __filename;
    @meta static object = {};

    @property _req: object = null; // native request object

    @property get req(): object { // native request object
      return this._req;
    }

    @property ctx: ContextInterface; // = null;

    @property body: ?any = null;

    @property raw: ?any = null;

    @property get header(): object {
      return this.headers;
    }

    @property get headers(): object {
      return this.req.headers;
    }

    @property get originalUrl(): string {
      return this.ctx.originalUrl;
    }

    @property get url(): string {
      return this.req.url;
    }

    @property set url(url: string): string {
      return this.req.url = url;
    }

    @property get origin(): string {
      return `${this.protocol}://${this.host}`;
    }

    @property get href(): string {
      if (/^https?:\/\//i.test(this.originalUrl))
        return this.originalUrl;
      return this.origin + this.originalUrl;
    }

    @property get method(): string {
      return this.req.method;
    }

    @property set method(method: string): string {
      return this.req.method = method;
    }

    @property get path(): string {
      return parse(this.req).pathname;
    }

    @property set path(path: string): string {
      const url = parse(this.req);
      if (url.pathname === path)
        return path;
      url.pathname = path;
      url.path = null;
      return this.url = stringify(url);
    }

    @property get query(): object {
      return qs.parse(this.querystring);
    }

    @property set query(obj: object): object {
      this.querystring = qs.stringify(obj);
      return obj;
    }

    @property get querystring(): string {
      if (this.req == null)
        return '';
      // return parse(this.req).query || '';
      const parsed = parse(this.req);
      return parsed != null ? (parsed.query || '') : '';
    }

    @property set querystring(str: string): string {
      const url = parse(this.req);
      if (url.search === `?${str}`)
        return str;
      url.search = str;
      url.path = null;
      return this.url = stringify(url);
    }

    @property get search(): string {
      if (!this.querystring)
        return '';
      return `?${this.querystring}`;
    }

    @property set search(str: string): string {
      return this.querystring = str;
    }

    @property get host(): string {
      const trustProxy = this.configs != null && this.configs.trustProxy != null
        ? this.configs.trustProxy
        : false;
      const host = trustProxy && this.get('X-Forwarded-Host') || this.get('Host');
      if (!host) return '';
      return host.split(/\s*,\s*/)[0];
    }

    @property get hostname(): string {
      if (!this.host) {
        return '';
      }
      return this.host.split(':')[0];
    }

    @property get fresh(): boolean {
      const method = this.method;
      const s = this.ctx.status;
      // GET or HEAD for weak freshness validation only
      if ('GET' !== method && 'HEAD' !== method)
        return false;
      // 2xx or 304 as per rfc2616 14.26
      if ((s >= 200 && s < 300) || 304 == s)
        return fresh(this.headers, this.ctx.response.headers);
      return false;
    }

    @property get stale(): boolean {
      return !this.fresh;
    }

    @property get idempotent(): boolean {
      const methods = ['GET', 'HEAD', 'PUT', 'DELETE', 'OPTIONS', 'TRACE'];
      return _.includes(methods, this.method);
    }

    @property get socket(): ?object {
      return this.req.socket;
    }

    @property get charset(): string {
      let type = this.get('Content-Type');
      if (type == null)
        return '';
      try {
        type = contentType.parse(type);
      } catch (error) {
        return '';
      }
      return type.parameters.charset || '';
    }

    @property get length(): number {
      const contentLength = this.get('Content-Length');
      if (contentLength != null) {
        if (contentLength === '')
          return 0;
        return ~~Number(contentLength);
      } else {
        return 0;
      }
    }

    @property get protocol(): 'http' | 'https' {
      const trustProxy = this.configs != null && this.configs.trustProxy != null
        ? this.configs.trustProxy
        : false;
      if (this.socket != null ? this.socket.encrypted : undefined)
        return 'https';
      if (this.req.secure)
        return 'https';
      if (!trustProxy)
        return 'http';
      const proto = this.get('X-Forwarded-Proto') || 'http';
      return proto.split(/\s*,\s*/)[0];
    }

    @property get secure(): boolean {
      return this.protocol === 'https';
    }

    @property get ip(): ?string {
      const socRemoteAddress = this.req.socket && this.req.socket.remoteAddress;
      const reqRemoteAddress = this.req.remoteAddress;
      return this.ips[0] || socRemoteAddress || reqRemoteAddress || '';
    }

    @property get ips(): string[] {
      // return [];
      const trustProxy = this.configs != null && this.configs.trustProxy != null
        ? this.configs.trustProxy
        : false;
      const value = this.get('X-Forwarded-For');
      if (trustProxy != null && value != null) {
        return value.split(/\s*,\s*/);
      } else {
        return [];
      }
    }

    @property get subdomains(): string[] {
      // return [];
      const offset = this.configs != null && this.configs.subdomainOffset != null
        ? this.configs.subdomainOffset
        : 2;
      const hostname = this.hostname;
      if (net.isIP(hostname) != 0) return [];
      return hostname
        .split('.')
        .reverse()
        .slice(offset)
    }

    @method accepts(...args: [?(string | Array)]): string | Array | boolean {
      return this.ctx.accept.types(...args);
    }

    @method acceptsCharsets(...args: [?(string | Array)]): string | Array {
      return this.ctx.accept.charsets(...args);
    }

    @method acceptsEncodings(...args: [?(string | Array)]): string | Array {
      return this.ctx.accept.encodings(...args);
    }

    @method acceptsLanguages(...args: [?(string | Array)]): string | Array {
      return this.ctx.accept.languages(...args);
    }

    @method is(...args: [string | Array]): ?(string | boolean) {
      let [types] = args;
      if (!types)
        return typeis(this.req);
      if (!_.isArray(types))
        types = args;
      return typeis(this.req, types);
    }

    @property get type(): string {
      const type = this.get('Content-Type');
      if (type == null)
        return '';
      return type.split(';')[0];
    }

    @method 'get'(field: string): string {
      switch (field = field.toLowerCase()) {
        case 'referer':
        case 'referrer':
          return this.req.headers.referrer || this.req.headers.referer || '';
        default:
          return this.req.headers[field] || '';
      }
    }

    @method setContext(context: ContextInterface): void {
      this.ctx = context;
    }

    @method setReq(req: object): void {
      this._req = req;
    }

    @method static async restoreObject() {
      assert.fail(`restoreObject method not supported for ${this.name}`);
    }

    @method static async replicateObject() {
      assert.fail(`replicateObject method not supported for ${this.name}`);
    }
  }
}
