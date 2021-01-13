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

import type { CollectionInterface } from '../interfaces/CollectionInterface';
import type { RecordInterface } from '../interfaces/RecordInterface';

import type { ContextInterface } from '../interfaces/ContextInterface';
import type { ResourceInterface } from '../interfaces/ResourceInterface';

import type { ResourceListResultT } from '../types/ResourceListResultT';

const slice = [].slice;

export default (Module) => {
  const {
    RESOURCE_RESULT, NON_OVERRIDDEN,
    Command,
    initialize, partOf, meta, property, method, nameBy, action, chains, inject,
    Utils: { _, inflect, assign, assert, statuses }
  } = Module.NS;

  const HTTP_NOT_FOUND = statuses('not found');

  @initialize
  @chains([
    'list', 'detail', 'create', 'update', 'delete', 'destroy'
  ], function () {
    this.initialHook('beforeActionHook');
    this.beforeHook('getRecordId', {
      only: ['detail', 'update', 'delete', 'destroy']
    });
    this.beforeHook('checkExistence', {
      only: ['detail', 'update', 'delete', 'destroy']
    });
    this.beforeHook('getRecordBody', {
      only: ['create', 'update']
    });
    this.beforeHook('omitBody', {
      only: ['create', 'update']
    });
    this.beforeHook('beforeUpdate', {
      only: ['update']
    });
  })
  @partOf(Module)
  class Resource<
    D = RecordInterface
  > extends Command implements ResourceInterface {
  // > extends SimpleCommand implements ResourceInterface {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property get entityName(): string {
      // return assert.fail('Not implemented specific property');
      return NON_OVERRIDDEN;
    }

    @method async checkExistence(...args) {
      if (this.recordId == null) {
        this.context.throw(HTTP_NOT_FOUND);
      }
      if (this.collection != null && !await this.collection.includes(this.recordId)) {
        this.context.throw(HTTP_NOT_FOUND);
      }
      return args;
    }

    @property get keyName(): string {
      return this.entityName == NON_OVERRIDDEN
        ? 'id'
        : inflect.singularize(inflect.underscore(this.entityName));
    }

    @property get itemEntityName(): string {
      return this.entityName == NON_OVERRIDDEN
        ? 'entity'
        : inflect.singularize(inflect.underscore(this.entityName));
    }

    @property get listEntityName(): string {
      return this.entityName == NON_OVERRIDDEN
        ? 'entities'
        : inflect.pluralize(inflect.underscore(this.entityName));
    }

    @property get collectionName(): string {
      return this.entityName == NON_OVERRIDDEN
        ? null
        : `${inflect.pluralize(inflect.camelize(this.entityName))}Collection`;
    }

    @inject('CollectionFactory<*>')
    @property _collectionFactory: () => CollectionInterface<D>;

    @property get collection(): CollectionInterface<D> {
      return this.entityName == NON_OVERRIDDEN
        ? null
        : this._collectionFactory(this.collectionName);
    }

    @property context: ?ContextInterface = null;

    @property recordId: ?string = null;

    @property recordBody: ?object = null;

    @property actionResult: ?any = null;

    @property static get actions(): {[key: string]: object} {
      return this.metaObject.getGroup('actions', false);
    }

    @action async list(): Promise<ResourceListResultT> {
      const vlItems = this.collection != null
        ? await (
          await this.collection.takeAll()
        ).toArray()
        : [];
      return {
        meta: {
          pagination: {
            limit: 'not defined',
            offset: 'not defined'
          }
        },
        items: vlItems
      };
    }

    @action async detail(): Promise<object> {
      return this.collection != null
        ? await this.collection.find(this.recordId)
        : {};
    }

    @action async create(): Promise<object> {
      return this.collection != null
        ? await this.collection.create(this.recordBody)
        : {};
    }

    @action async update(): Promise<object> {
      return this.collection != null
        ? await this.collection.update(this.recordId, this.recordBody)
        : {};
    }

    @action async 'delete'(): Promise<void> {
      this.collection != null
        ? await this.collection.delete(this.recordId)
        : null;
      this.context.status = 204;
    }

    @action async destroy(): Promise<void> {
      this.collection != null
        ? await this.collection.destroy(this.recordId)
        : null;
      this.context.status = 204;
    }

    @method beforeActionHook(...args) {
      [this.context] = args;
      return args;
    }

    @method getRecordId(...args) {
      this.recordId = this.context.pathParams[this.keyName];
      return args;
    }

    @method getRecordBody(...args) {
      const body = this.context.request.body;
      this.recordBody = body && body[this.itemEntityName] || undefined;
      return args;
    }

    @method omitBody(...args) {
      this.recordBody = _.omit(this.recordBody, ['_id', '_rev', 'rev', 'type', '_type', '_owner', '_space', '_from', '_to']);
      if (this.collection != null) {
        const moduleName = this.collection.delegate.moduleName();
        const name = this.collection.delegate.name;
        this.recordBody.type = `${moduleName}::${name}`;
      }
      return args;
    }

    @method beforeUpdate(...args) {
      this.recordBody = assign({}, this.recordBody, {
        id: this.recordId
      });
      return args;
    }

    @method async doAction(asAction: string, context: ContextInterface): Promise<?any> {
      const voResult = await (typeof this[asAction] === "function" ? this[asAction](context) : undefined);
      this.actionResult = voResult;
      await this.saveDelayeds();
      return voResult;
    }

    // NOTE: It's abstract method. It might be replaced from SaveDelayedJobsMixin in specific custom class
    @method async saveDelayeds(): Promise<void> {}

    @method async execute(aoNotification: NotificationInterface): Promise<void> {
      let voResult;
      const { ERROR, DEBUG, LEVELS, SEND_TO_LOG } = Module.NS.Pipes.NS.LogMessage;
      const resourceName = aoNotification.getName();
      const voBody = aoNotification.getBody();
      const vsAction = aoNotification.getType();
      try {
        this.send(SEND_TO_LOG, '>>>>>>>>>>>>>> EXECUTION START', LEVELS[DEBUG]);
        voResult = {
          result: await this.doAction(vsAction, voBody.context),
          resource: this
        };
        this.send(SEND_TO_LOG, '>>>>>>>>>>>>>> EXECUTION END', LEVELS[DEBUG]);
      } catch (error) {
        voResult = { error, resource: this };
      }
      this.send(RESOURCE_RESULT, voResult, voBody.reverse);
    }
  }
}
