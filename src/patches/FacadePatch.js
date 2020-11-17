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
    initializePatch, meta, method,
  } = Module.NS;

  Module.definePatch(__filename, (BaseClass) => {
    @initializePatch
    class Patch extends BaseClass {
      @meta static object = {};

      @method initializeFacade(): void {
        super.initializeFacade(... arguments)
        if (!this.container.isBound('Context')) {
          this.container.bind('Context').to(this.Module.NS.Context);
        }
        if (!this.container.isBound('Factory<Context>')) {
          this.container.bind('Factory<Context>').toFactory((context) => {
            return () => {
              return this.container.get('Context')
            }
          });
        }
        if (!this.container.isBound('HttpRequest')) {
          this.container.bind('HttpRequest').to(this.Module.NS.HttpRequest);
        }
        if (!this.container.isBound('HttpResponse')) {
          this.container.bind('HttpResponse').to(this.Module.NS.HttpResponse);
        }
        if (!this.container.isBound('HttpCookies')) {
          this.container.bind('HttpCookies').to(this.Module.NS.HttpCookies);
        }
        if (!this.container.isBound(JSON_RENDERER)) {
          this.container.bind(JSON_RENDERER).to(this.Module.NS.Renderer).inSingletonScope();
        }
        if (!this.container.isBound('RendererFactory<*>')) {
          this.container.bind('RendererFactory<*>').toFactory((context) => {
            return (rendererName: string) => {
              return this.container.get(rendererName)
            }
          });
        }
        if (!this.container.isBound('RouterFactory<*>')) {
          this.container.bind('RouterFactory<*>').toFactory((context) => {
            return (routerName: string) => {
              return this.container.get(`Factory<${routerName}>`)()
            }
          });
        }
        if (!this.container.isBound('ResourceChecker<*>')) {
          this.container.bind('ResourceChecker<*>').toFactory((context) => {
            return (resourceName: string) => {
              return this.container.isBound(`Factory<${resourceName}>`)
            }
          });
        }
      }
    }
    return Patch;
  });
}
