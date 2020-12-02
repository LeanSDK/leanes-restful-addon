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

import BodyParseMixin from './mixins/BodyParseMixin';
import BulkMethodsRendererMixin from './mixins/BulkMethodsRendererMixin';
import CheckAdminOnlyResourceMixin from './mixins/CheckAdminOnlyResourceMixin';
import CheckApiVersionResourceMixin from './mixins/CheckApiVersionResourceMixin';
import CheckSchemaVersionResourceMixin from './mixins/CheckSchemaVersionResourceMixin';
import ContextifyApplicationMediatorMixin from './mixins/ContextifyApplicationMediatorMixin';
import ContextifyApplicationMixin from './mixins/ContextifyApplicationMixin';
import ContextifyResourceExecutionMixin from './mixins/ContextifyResourceExecutionMixin';
import CountMethodsRendererMixin from './mixins/CountMethodsRendererMixin';
import CrudRendererMixin from './mixins/CrudRendererMixin';
import EditableResourceMixin from './mixins/EditableResourceMixin';
import OwnerableResourceMixin from './mixins/OwnerableResourceMixin';
import PerformSyntheticRequestApplicationMixin from './mixins/PerformSyntheticRequestApplicationMixin';
import PerformSyntheticRequestMixin from './mixins/PerformSyntheticRequestMixin';
import RestfulFacadeMixin from './mixins/RestfulFacadeMixin';

import HttpRequest from './context/HttpRequest';
import HttpResponse from './context/HttpResponse';
import HttpCookies from './context/HttpCookies';
import Context from './context/Context';
import Renderer from './renderer/Renderer';

import Router from './proxies/Router';
import HttpMediator from './mediators/HttpMediator';
import Resource from './commands/Resource';

import TemplatableModule from './TemplatableModule';

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

export { TemplatableModule };

export default (Module) => {
  const {
    initializeMixin, meta, constant, method, extend, decorator, util
  } = Module.NS;

  return ['RestfulAddon', (BaseClass) => {
    @extend('RestfulFacadeMixin', 'Facade')

    @RestfulFacadeMixin

    @BodyParseMixin
    @BulkMethodsRendererMixin
    @CheckAdminOnlyResourceMixin
    @CheckApiVersionResourceMixin
    @CheckSchemaVersionResourceMixin
    @ContextifyApplicationMediatorMixin
    @ContextifyApplicationMixin
    @ContextifyResourceExecutionMixin
    @CountMethodsRendererMixin
    @CrudRendererMixin
    @EditableResourceMixin
    @OwnerableResourceMixin
    @PerformSyntheticRequestApplicationMixin
    @PerformSyntheticRequestMixin

    @Resource
    @HttpMediator
    @Router

    @Renderer
    @Context
    @HttpCookies
    @HttpResponse
    @HttpRequest

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
    }
    return Mixin;
  }]
}
