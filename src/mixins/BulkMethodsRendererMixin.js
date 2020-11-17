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

import type { ContextInterface } from '../interfaces/ContextInterface';
import type { ResourceInterface } from '../interfaces/ResourceInterface';
import type { RouterRouteT } from '../types/RouterRouteT';
import type { RendererListResultT } from '../types/RendererListResultT';
import type { RendererItemResultT } from '../types/RendererItemResultT';

export default (Module) => {
  const {
    initializeMixin, meta, method,
  } = Module.NS;

  Module.defineMixin(__filename, (BaseClass) => {
    @initializeMixin
    class Mixin extends BaseClass {
      @meta static object = {};

      @method async bulkDelete<T = ?object, R = void>(
        resource: string, action: string, aoData: T, templatePath: ?string
      ): Promise<R> { return; }

      @method async bulkDestroy<T = ?object, R = void>(
        resource: string, action: string, aoData: T, templatePath: ?string
      ): Promise<R> { return; }

      @method async render<
        T = any, R = ?(RendererListResultT| RendererItemResultT | any)
      >(
        ctx: ContextInterface,
        aoData: T,
        resource: ResourceInterface,
        opts: ?RouterRouteT = {}
      ): Promise<R> {
        const args = arguments;
        const {
          path,
          resource: resourceName,
          action,
          template: templatePath
        } = opts;
        if ((path != null) && (resourceName != null) && (action != null)) {
          const { Templates } = this.Module.NS;
          return await Promise.resolve().then(() => {
            const template = Templates != null ? Templates[templatePath] : undefined;
            if (_.isFunction(template)){
              return template.call(resource, resourceName, action, aoData);
            } else if (_.includes([
              'bulkDelete', 'bulkDestroy'
            ], action)) {
              return this[action].call(
                resource, resourceName, action, aoData, templatePath
              );
            } else {
              return super.render(...args);
            }
          });
        } else {
          return aoData;
        }
      }
    }
    return Mixin;
  });
}
