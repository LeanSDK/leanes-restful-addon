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
import type { ResourceInterface } from './ResourceInterface';
import type { RouterRouteT } from '../types/RouterRouteT';
import type { RendererListResultT } from '../types/RendererListResultT';
import type { RendererItemResultT } from '../types/RendererItemResultT';

export interface RendererInterface {
  render<
    T = any, R = ?(RendererListResultT| RendererItemResultT | any)
  >(
    ctx: ContextInterface,
    aoData: T,
    resource: ResourceInterface,
    opts: ?RouterRouteT
  ): Promise<R>
}
