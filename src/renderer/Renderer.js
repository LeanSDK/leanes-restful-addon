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

import type { MediatorInterface } from '../interfaces/MediatorInterface';
import type { RendererInterface } from '../interfaces/RendererInterface';
import type { ContextInterface } from '../interfaces/ContextInterface';
import type { ResourceInterface } from '../interfaces/ResourceInterface';
import type { RouterRouteT } from '../types/RouterRouteT';
import type { RendererListResultT } from '../types/RendererListResultT';
import type { RendererItemResultT } from '../types/RendererItemResultT';

export default (Module) => {
  const {
    // APPLICATION_MEDIATOR,
    CoreObject,
    initialize, partOf, meta, method, nameBy, property, injectable, inject,
  } = Module.NS;

  @initialize
  @injectable()
  @partOf(Module)
  class Renderer extends CoreObject implements RendererInterface {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @inject('ApplicationModule')
    @property _ApplicationModule: Class<*>;

    @property get ApplicationModule(): Class<*> {
      return this._ApplicationModule;
    }

    // @inject(`Factory<${APPLICATION_MEDIATOR}>`)
    // @property _appMediatorFactory: () => MediatorInterface;
    //
    // @property get _appMediator(): MediatorInterface {
    //   return this._appMediatorFactory();
    // }

    @method async render<
      T = any, S = ResourceInterface, R = ?(RendererListResultT | RendererItemResultT | any)
    >(
      ctx: ContextInterface,
      aoData: T,
      resource: S,
      opts: ?RouterRouteT = {}
    ): Promise<R> {
      const {
        path,
        resource: resourceName,
        action,
        template: templatePath
      } = opts;
      if ((path != null) && (resourceName != null) && (action != null)) {
        // const service = this._appMediator.getViewComponent();
        // const { Templates } = service.Module.NS;
        const { Templates } = this.ApplicationModule.NS;
        return await Promise.resolve().then(() => {
          if (Templates == null) return aoData;
          if (Templates[templatePath] == null) return aoData;
          return (Templates[templatePath])
            .call(resource, resourceName, action, aoData) || aoData
        });
      } else {
        return aoData;
      }
    }
  }
}
