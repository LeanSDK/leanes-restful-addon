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
import type { ResourceListResultT } from '../types/ResourceListResultT';
import type { RendererListResultT } from '../types/RendererListResultT';
import type { RendererItemResultT } from '../types/RendererItemResultT';

export default (Module) => {
  const {
    Renderer,
    initializeMixin, meta, method,
    Utils: { _ }
  } = Module.NS;

  Module.defineMixin(__filename, (BaseClass: Class<Renderer>) => {
    @initializeMixin
    class Mixin extends BaseClass {
      @meta static object = {};

      @method async create<
        T = object, R = RendererItemResultT
      >(resource: string, action: string, aoData: T, templatePath: ?string): Promise<R> {
        const templateName = templatePath.replace(new RegExp(`/${action}$`), '/itemDecorator');
        const itemDecorator = (
          this.Module.NS.Templates[templateName]
        ||
          Mixin.prototype.itemDecorator
        );
        return {
          [this.itemEntityName]: await itemDecorator.call(this, aoData)
        };
      }

      @method async 'delete'<T = ?object, R = void>(
        resource: string, action: string, aoData: T, templatePath: ?string
      ): Promise<R> { return; }

      @method async destroy<T = ?object, R = void>(
        resource: string, action: string, aoData: T, templatePath: ?string
      ): Promise<R> { return; }

      @method async detail<
        T = object, R = RendererItemResultT
      >(resource: string, action: string, aoData: T, templatePath: ?string): Promise<R> {
        const templateName = templatePath.replace(new RegExp(`/${action}$`), '/itemDecorator');
        const itemDecorator = (
          this.Module.NS.Templates[templateName]
        ||
          Mixin.prototype.itemDecorator
        );
        return {
          [this.itemEntityName]: await itemDecorator.call(this, aoData)
        };
      }

      @method async itemDecorator(aoData: ?object): Promise<?object> {
        if (aoData != null) {
          result = JSON.parse(JSON.stringify(aoData));
          let { createdAt, updatedAt, deletedAt } = aoData;
          createdAt = createdAt && createdAt.toISOString() || null;
          updatedAt = updatedAt && updatedAt.toISOString() || null;
          deletedAt = deletedAt && deletedAt.toISOString() || null;
          result.createdAt = createdAt;
          result.updatedAt = updatedAt;
          result.deletedAt = deletedAt;
        } else {
          result = null;
        }
        return result;
      }

      @method async list<
        T = ResourceListResultT, R = RendererListResultT
      >(resource: string, action: string, aoData: T, templatePath: ?string): Promise<R> {
        const templateName = templatePath.replace(new RegExp(`/${action}$`), '/itemDecorator');
        const itemDecorator = (
          this.Module.NS.Templates[templateName]
        ||
          Mixin.prototype.itemDecorator
        );
        return {
          meta: aoData.meta,
          [this.listEntityName]: await Promise.all(
            aoData.items.map(itemDecorator.bind(this))
          )
        };
      }

      @method async query<T = any, R = any>(
        resource: string, action: string, aoData: T, templatePath: ?string
      ): Promise<R> {
        return aoData;
      }

      @method async update<
        T = object, R = RendererItemResultT
      >(resource: string, action: string, aoData: T, templatePath: ?string): Promise<R> {
        const templateName = templatePath.replace(new RegExp(`/${action}$`), '/itemDecorator');
        const itemDecorator = (
          this.Module.NS.Templates[templateName]
        ||
          Mixin.prototype.itemDecorator
        );
        return {
          [this.itemEntityName]: await itemDecorator.call(this, aoData)
        };
      }

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
              'create', 'delete', 'destroy', 'detail', 'list', 'update'
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
