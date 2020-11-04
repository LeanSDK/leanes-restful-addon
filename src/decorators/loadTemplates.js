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

import assert from 'assert';

const cpoMetaObject = Symbol.for('~metaObject');
const cphTemplatesList = Symbol.for('~templatesList');

export default function loadTemplates({ filesTreeSync }) {
  (filesTreeSync: (string, ?object) => string[]);
  return target => {
    assert(target[cpoMetaObject] != null, 'Target for `loadTemplates` decorator must be a Class');
    const vsRoot = target.prototype.ROOT != null ? target.prototype.ROOT : '.';
    const vsTemplatesDir = `${vsRoot}/templates`;
    const files = filesTreeSync(vsTemplatesDir, {
      filesOnly: true
    });
    const templatesList = (files != null ? files : []).map((i) => {
      const templateName = i.replace(/\.js/, '');
      const vsTemplatePath = `${vsTemplatesDir}/${templateName}`;
      return vsTemplatePath;
    });
    Reflect.defineProperty(target, cphTemplatesList, {
      enumerable: true,
      writable: true,
      value: templatesList
    });
    return target;
  }
};
