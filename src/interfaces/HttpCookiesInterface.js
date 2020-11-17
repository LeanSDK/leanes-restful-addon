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

export interface HttpCookiesInterface {
  req: object;

  res: object;

  key: string;

  'get'(name: string, opts: ?object): ?string;

  'set'(name: string, value: any, opts: ?object): HttpCookiesInterface;

  setReqResOpts(
    req: object, res: object, opts: ?{|
      key: ?string, secure: ?boolean
    |}
  ): void;
}
