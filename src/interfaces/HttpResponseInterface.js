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

export interface HttpResponseInterface {
  +res: object; // native response object

  // +socket: ?object;

  // +header: object;

  // +headers: object;

  // status: ?number;

  // message: string;

  body: any;

  // length: number;

  // +headerSent: ?boolean;

  // type: ?string;

  is(...args: [string | Array]): ?(string | boolean);

  'get'(field: string): string | string[];

  'set'(...args: [string | object]): ?any;

  append(field: string, val: string | string[]): void;

  remove(field: string): void;

  // +writable: boolean;

  flushHeaders(): void;

  setContext(context: ContextInterface): void;

  setRes(res: object): void;
}
