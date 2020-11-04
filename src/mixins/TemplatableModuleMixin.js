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

import path from 'path';

export default (Module) => {
  const {
    initializeMixin, meta, property, method
  } = Module.NS;

  const cphTemplatesMap = Symbol.for('~templatesMap');
  const cphTemplatesList = Symbol.for('~templatesList');
  const cpoTemplates = Symbol.for('~templates');
  const cpmTemplatesHandler = Symbol.for('~templatesHandler');

  Module.defineMixin(__filename, (BaseClass) => {
    @initializeMixin
    class Mixin extends BaseClass {
      @meta static object = {};

      @property get Templates() {
        const MClass = this.constructor;
        return MClass[cpoTemplates] != null ? MClass[cpoTemplates] : MClass[cpoTemplates] = new Proxy(MClass, MClass[cpmTemplatesHandler]);
      }

      @method static get templates(): {[key: string]: Function} {
        return this.metaObject.getGroup('templates', false);
      }

      @method static defineTemplate(filename: string, vmFunction: Function): Function {
        const vsRoot = this.prototype.ROOT || '.';
        const vsTemplatesDir = `${vsRoot}/templates/`;
        const templateName = filename.replace(vsTemplatesDir, '').replace(/\.js/, '');
        this.metaObject.addMetaData('templates', templateName, vmFunction);
        return vmFunction;
      }

      @method static resolveTemplate(...args): Function {
        const vsRoot = this.prototype.ROOT || '.';
        const vsTemplatesDir = `${vsRoot}/templates/`;
        const templateName = path.resolve(...args).replace(vsTemplatesDir, '').replace(/\.js/, '');
        return this.prototype.Templates[templateName];
      }
    }

    Reflect.defineProperty(Mixin, cphTemplatesMap, {
      enumerable: true,
      writable: true,
      value: null
    });

    Reflect.defineProperty(Mixin, cpoTemplates, {
      enumerable: true,
      writable: true,
      value: null
    });

    Reflect.defineProperty(Mixin, cpmTemplatesHandler, {
      enumerable: true,
      value: {
        get: (aoTarget, asName) => {
          if (!Reflect.get(aoTarget.templates, asName)) {
            if (aoTarget[cphTemplatesMap] == null) {
              const templatesMap = {};
              const vsRoot = aoTarget.prototype.ROOT || '.';
              const vsTemplatesDir = `${vsRoot}/templates/`;
              for (const vsPath of aoTarget[cphTemplatesList]) {
                const vsName = vsPath.replace(vsTemplatesDir, '').replace(/\.js/, '');
                templatesMap[vsName] = vsPath;
              }
              aoTarget[cphTemplatesMap] = templatesMap;
            }
            const vsPath = aoTarget[cphTemplatesMap][asName];
            if (vsPath) {
              aoTarget.resolve(vsPath);
            }
          }
          return Reflect.get(aoTarget.templates, asName);
        }
      }
    });
    Reflect.defineProperty(Mixin, 'onMetalize', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function(...args) {
        Reflect.getPrototypeOf(Mixin).onMetalize.apply(this, args);
        this[cphTemplatesMap] = undefined;
        this[cpoTemplates] = undefined;
        return;
      }
    });
    return Mixin;
  });
}
