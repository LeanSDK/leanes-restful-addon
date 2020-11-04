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

import type { NotificationInterface } from '@leansdk/leanes/src';

import type { ContextInterface } from '../interfaces/ContextInterface';
import type { ResourceInterface } from '../interfaces/ResourceInterface';

export default (Module) => {
  const {
    RESOURCE_RESULT,
    Mediator,
    initializeMixin, meta, method,
  } = Module.NS;

  Module.defineMixin(__filename, (BaseClass: Class<Mediator>) => {
    @initializeMixin
    class Mixin extends BaseClass {
      @meta static object = {};

      @method listNotificationInterests(...args): string[] {
        const interests = super.listNotificationInterests(...args);
        interests.push(RESOURCE_RESULT);
        return interests;
      }

      @method handleNotification(aoNotification: NotificationInterface): void {
        const vsName = aoNotification.getName();
        const voBody = aoNotification.getBody();
        const vsType = aoNotification.getType();
        switch (vsName) {
          case RESOURCE_RESULT:
            this.emitter.emit(vsType, voBody);
            break;
          default:
            super.handleNotification(aoNotification);
        }
      }

      @method async execute<
        T = any, R = Promise<{|result: T, resource: ResourceInterface|}>
      >(resourceName: string, opts: {
        context: ContextInterface,
        reverse: string
      }, action: string): Promise<R> {
        const { context, reverse } = opts;
        return await new Promise((resolve, reject) => {
          // resolve();
          try {
            this.emitter.once(reverse, ({ error, result, resource }) => {
              if (error != null) {
                reject(error);
                return;
              }
              resolve({ result, resource });
            });
            this.send(resourceName, { context, reverse }, action, null);
          } catch (err) {
            reject(err);
          }
        });
      }
    }
    return Mixin;
  });
}
