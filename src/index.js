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

import statuses from 'statuses';

import action from './decorators/action';
import loadTemplates from './decorators/loadTemplates';

import BodyParseMixinTF from './mixins/BodyParseMixin';
import BulkMethodsRendererMixinTF from './mixins/BulkMethodsRendererMixin';
import CheckAdminOnlyResourceMixinTF from './mixins/CheckAdminOnlyResourceMixin';
import CheckApiVersionResourceMixinTF from './mixins/CheckApiVersionResourceMixin';
import CheckSchemaVersionResourceMixinTF from './mixins/CheckSchemaVersionResourceMixin';
import ContextifyApplicationMediatorMixinTF from './mixins/ContextifyApplicationMediatorMixin';
import ContextifyApplicationMixinTF from './mixins/ContextifyApplicationMixin';
import ContextifyResourceExecutionMixinTF from './mixins/ContextifyResourceExecutionMixin';
import CountMethodsRendererMixinTF from './mixins/CountMethodsRendererMixin';
import CrudRendererMixinTF from './mixins/CrudRendererMixin';
import EditableResourceMixinTF from './mixins/EditableResourceMixin';
import OwnerableResourceMixinTF from './mixins/OwnerableResourceMixin';
import PerformSyntheticRequestApplicationMixinTF from './mixins/PerformSyntheticRequestApplicationMixin';
import PerformSyntheticRequestMixinTF from './mixins/PerformSyntheticRequestMixin';
import TemplatableModuleMixinTF from './mixins/TemplatableModuleMixin';

import FacadePatchTF from './patches/FacadePatch';

import RequestTF from './context/HttpRequest';
import ResponseTF from './context/HttpResponse';
import CookiesTF from './context/HttpCookies';
import ContextTF from './context/Context';
import RendererTF from './renderer/Renderer';

import RouterTF from './proxies/Router';
import HttpMediatorTF from './mediators/HttpMediator';
import ResourceTF from './commands/Resource';

export type { ResourceListResultT } from './types/ResourceListResultT';
export type { RendererItemResultT } from './types/RendererItemResultT';
export type { RendererListResultT } from './types/RendererListResultT';
export type { RouteOptionsT } from './types/RouteOptionsT';
export type { RouterRouteT } from './types/RouterRouteT';

export type { ContextInterface } from './interfaces/ContextInterface';
export type { HttpCookiesInterface } from './interfaces/HttpCookiesInterface';
export type { HttpRequestInterface } from './interfaces/HttpRequestInterface';
export type { HttpResponseInterface } from './interfaces/HttpResponseInterface';
export type { ResourceInterface } from './interfaces/ResourceInterface';
export type { RendererInterface } from './interfaces/RendererInterface';
export type { RouterInterface } from './interfaces/RouterInterface';
export type { HttpMediatorInterface } from './interfaces/HttpMediatorInterface';

export default (Module) => {
  const {
    initializeMixin, meta, constant, method, patch, decorator, util
  } = Module.NS;

  return ['RestfulAddon', (BaseClass) => {

    @FacadePatchTF

    @BodyParseMixinTF
    @BulkMethodsRendererMixinTF
    @CheckAdminOnlyResourceMixinTF
    @CheckApiVersionResourceMixinTF
    @CheckSchemaVersionResourceMixinTF
    @ContextifyApplicationMediatorMixinTF
    @ContextifyApplicationMixinTF
    @ContextifyResourceExecutionMixinTF
    @CountMethodsRendererMixinTF
    @CrudRendererMixinTF
    @EditableResourceMixinTF
    @OwnerableResourceMixinTF
    @PerformSyntheticRequestApplicationMixinTF
    @PerformSyntheticRequestMixinTF
    @TemplatableModuleMixinTF

    @ResourceTF
    @HttpMediatorTF
    @RouterTF

    @RendererTF
    @ContextTF
    @CookiesTF
    @ResponseTF
    @RequestTF
    @initializeMixin
    class Mixin extends BaseClass {
      @meta static object = {};

      @constant NON_OVERRIDDEN = Symbol.for('NON_OVERRIDDEN');
      @constant RESOURCE_RESULT =  'RESOURCE_RESULT';
      @constant APPLICATION_ROUTER =  'ApplicationRouter';
      @constant JSON_RENDERER =  'JsonRenderer';
      @constant HTTP_MEDIATOR =  'HttpMediator';
      @constant METHODS = [
        'get',
        'post',
        'put',
        'head',
        'delete',
        'options',
        'trace',
        'copy',
        'lock',
        'mkcol',
        'move',
        'purge',
        'propfind',
        'proppatch',
        'unlock',
        'report',
        'mkactivity',
        'checkout',
        'merge',
        'm-search',
        'notify',
        'subscribe',
        'unsubscribe',
        'patch',
        'search',
        'connect'
      ];

      @decorator action = action;
      @decorator loadTemplates = loadTemplates;

      @util statuses = statuses;

      @method static including() {
        patch(this.NS.FacadePatch)(this.NS.Facade);
      }
    }
    return Mixin;
  }]
}
