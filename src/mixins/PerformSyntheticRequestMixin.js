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

import type {
  LegacyResponseInterface, AxiosResponse, Config
} from '../types/RequestT';

import type { HttpMediatorInterface } from '../interfaces/HttpMediatorInterface';

export default (Module) => {
  const {
    HTTP_MEDIATOR,
    initializeMixin, meta, method, property,
  } = Module.NS;

  Module.defineMixin(__filename, (BaseClass) => {
    @initializeMixin
    class Mixin extends BaseClass {
      @meta static object = {};

      @property _httpMediator: HttpMediatorInterface = null;

      @method async perform<
        T = any, R = T, L = LegacyResponseInterface<AxiosResponse<T, R>>
      >(methodName: string, url: string, options: Config<T, R>): Promise<?L> {
        if (this._httpMediator != null) {
          return await this._httpMediator.perform<T, R, L>(methodName, url, options);
        }
      }

      constructor({
        @inject(`Factory<${HTTP_MEDIATOR}>`) httpMediatorFactory: () => HttpMediatorInterface
      }) {
        super(... arguments)
        this._httpMediator = httpMediatorFactory()
      }
    }
    return Mixin;
  });
}
