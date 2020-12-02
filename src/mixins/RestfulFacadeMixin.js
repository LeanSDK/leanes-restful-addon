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
    JSON_RENDERER,
    initializeMixin, meta, method,
  } = Module.NS;

  Module.defineMixin(__filename, (BaseClass) => {
    @initializeMixin
    class Mixin extends BaseClass {
      @meta static object = {};

      @method initializeFacade(): void {
        super.initializeFacade(... arguments)
        if (!this.isBound('Context')) {
          this.bind('Context').to(this.Module.NS.Context);
        }
        if (!this.isBound('Factory<Context>')) {
          this.bind('Factory<Context>').toFactory((context) => {
            return () => {
              return this.get('Context')
            }
          });
        }
        if (!this.isBound('HttpRequest')) {
          this.bind('HttpRequest').to(this.Module.NS.HttpRequest);
        }
        if (!this.isBound('HttpResponse')) {
          this.bind('HttpResponse').to(this.Module.NS.HttpResponse);
        }
        if (!this.isBound('HttpCookies')) {
          this.bind('HttpCookies').to(this.Module.NS.HttpCookies);
        }
        if (!this.isBound(JSON_RENDERER)) {
          this.bind(JSON_RENDERER).to(this.Module.NS.Renderer).inSingletonScope();
        }
        if (!this.isBound('RendererFactory<*>')) {
          this.bind('RendererFactory<*>').toFactory((context) => {
            return (rendererName: string) => {
              return this.get(rendererName)
            }
          });
        }
        if (!this.isBound('RouterFactory<*>')) {
          this.bind('RouterFactory<*>').toFactory((context) => {
            return (routerName: string) => {
              return this.get(`Factory<${routerName}>`)()
            }
          });
        }
        if (!this.isBound('ResourceChecker<*>')) {
          this.bind('ResourceChecker<*>').toFactory((context) => {
            return (resourceName: string) => {
              return this.isBound(`Factory<${resourceName}>`)
            }
          });
        }
      }
    }
    return Mixin;
  });
}
