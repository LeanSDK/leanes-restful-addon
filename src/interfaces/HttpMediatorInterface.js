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

import type { ContextInterface } from './ContextInterface';
import type { RendererInterface } from './RendererInterface';
import type { ResourceInterface } from './ResourceInterface';

import type { RouterRouteT } from '../types/RouterRouteT';
import type {
  LegacyResponseInterface, AxiosResponse, Config
} from '../types/RequestT';

export interface HttpMediatorInterface {
  +responseFormats: string[];

  routerName: string;

  use(index: number | Function, middleware: ?Function): HttpMediatorInterface;

  callback(): (req: object, res: object) => Promise<void>;

  handleStatistics(reqLength: number, resLength: number, time: number, aoContext: ContextInterface): Promise<void>;

  onerror(err: Error): void;

  respond(ctx: ContextInterface): void;

  perform<
    T = any, R = T, L = LegacyResponseInterface<AxiosResponse<T, R>>
  >(method: string, url: string, options: Config<T, R>): Promise<L>;

  rendererFor(asFormat: string): RendererInterface;

  sendHttpResponse(
    ctx: ContextInterface,
    aoData: ?any,
    resource: ResourceInterface,
    opts: RouterRouteT
  ): Promise<void>;

  defineRoutes(): void;

  sender(
    resourceName: string,
    aoMessage: {|context: ContextInterface, reverse: string|},
    params: RouterRouteT
  ): void;

  createNativeRoute(opts: RouterRouteT): void;
}
