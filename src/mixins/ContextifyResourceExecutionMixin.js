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

import type { NotificationInterface } from '../interfaces/NotificationInterface';
import type { MediatorInterface } from '../interfaces/MediatorInterface';

export default (Module) => {
  const {
    APPLICATION_MEDIATOR, LIGHTWEIGHT,
    initializeMixin, meta, method, property,
  } = Module.NS;

  Module.defineMixin(__filename, (BaseClass) => {
    @initializeMixin
    class Mixin extends BaseClass {
      @meta static object = {};

      @property _appMediator: MediatorInterface = null;

      @method async execute(aoNotification: NotificationInterface): Promise<void> {
        let voResult;
        const { ERROR, DEBUG, LEVELS, SEND_TO_LOG } = Module.NS.Pipes.NS.LogMessage;
        const resourceName = aoNotification.getName();
        const voBody = aoNotification.getBody();
        const vsAction = aoNotification.getType();
        const service = this._appMediator.getViewComponent();
        try {
          if (service.context != null) {
            return await super.execute(aoNotification);
          } else {
            this.send(SEND_TO_LOG, '>>>>>>>>>> LIGHTWEIGHT CREATE', LEVELS[DEBUG]);
            const t1 = Date.now();
            const app = this.Module.NS.MainApplication.new(LIGHTWEIGHT);
            app.start();
            this.send(SEND_TO_LOG, `>>>>>>>>>> LIGHTWEIGHT START after ${Date.now() - t1}`, LEVELS[DEBUG]);
            voResult = await app.execute(resourceName, voBody, vsAction);
            this.send(SEND_TO_LOG, '>>>>>>>>>> LIGHTWEIGHT END', LEVELS[DEBUG]);
            const t2 = Date.now()
            await app.finish()
            this.send(SEND_TO_LOG, `>>>>>>>>>> LIGHTWEIGHT DESTROYED after ${Date.now() - t2}`, LEVELS[DEBUG]);
          }
        } catch (error) {
          voResult = { error, resource: this };
        }
        this.send(RESOURCE_RESULT, voResult, voBody.reverse);
      }

      constructor({
        @inject(`Factory<${APPLICATION_MEDIATOR}>`) appMediatorFactory: () => MediatorInterface
      }) {
        super(... arguments)
        this._appMediator = appMediatorFactory()
      }
    }
    return Mixin;
  });
}
