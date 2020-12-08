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

export default (Module) => {
  const {
    APPLICATION_MEDIATOR,
    initializeMixin, meta, method, property
  } = Module.NS;

  Module.defineMixin(__filename, (BaseClass) => {
    @initializeMixin
    class Mixin extends BaseClass {
      @meta static object = {};

      @property context: ?ContextInterface = null;

      @method async execute<
        T = any, R = Promise<{|result: T, resource: ResourceInterface|}>
      >(resourceName: string, data: {
        context: ContextInterface,
        reverse: string
      }, action: string): Promise<R> {
        this.context = data.context;
        const appMediator = this.facade.getMediator(APPLICATION_MEDIATOR);
        return await appMediator.execute(
          resourceName, data, action
        );
      }
    }
    return Mixin;
  });
}
