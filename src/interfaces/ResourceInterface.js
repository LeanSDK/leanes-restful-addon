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
import type { ResourceListResultT } from '../types/ResourceListResultT';

export interface ResourceInterface {
  list(): Promise<ResourceListResultT>;

  detail(): Promise<object>;

  create(): Promise<object>;

  update(): Promise<object>;

  'delete'(): Promise<void>;

  destroy(): Promise<void>;

  doAction(asAction: string, context: ContextInterface): Promise<?any>;

  saveDelayeds(): Promise<void>;
}
