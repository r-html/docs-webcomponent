import { IRoute } from '@rxdi/router/slot';
import { Component, html, LitElement } from '@rxdi/lit-html';
import { render } from '@rxdi/lit-html';

import { DocItem } from '../src/index';
import '../src/index';

@Component({
  selector: 'home-component',
  template(this: HomeComponent) {
    return html`
      Home
    `;
  }
})
export class HomeComponent extends LitElement {}

@Component({
  selector: 'about-component',
  template(this: AboutComponent) {
    return html`
      About
    `;
  }
})
export class AboutComponent extends LitElement {}

const slots = [
  {
    path: '/docs-webcomponent/home',
    component: HomeComponent
  },
  {
    path: '/docs-webcomponent/about',
    component: async () => AboutComponent
  },
  // {
  //   path: '/my-component',
  //   component: async () => (await import('./my-component.ts')).MyComponent
  // },
  {
    path: '**',
    redirectTo: '/docs-webcomponent/home'
  }
] as IRoute[];
const items: DocItem[] = [
  {
    title: 'Introduction',
    active: false,
    disabled: true,
    path: '/docs-webcomponent/home'
  },
  {
    title: 'Overview',
    active: false,
    children: [{ title: 'History', path: '/docs-webcomponent/home' }]
  },
  {
    title: 'Fundamentals',
    active: true,
    children: [{ title: 'First steps', path: '/docs-webcomponent/about' }]
  },
  {
    title: 'Techniques',
    active: false,
    children: [{ title: `Dont's and do's`, path: '/docs-webcomponent/about' }]
  },
  {
    title: 'Websockets',
    active: false,
    children: [{ title: 'Using Subscriptions', path: '/docs-webcomponent/about' }]
  },
  {
    title: 'Microservices',
    active: false,
    children: [{ title: 'Setup Microservice', path: '/docs-webcomponent/about' }]
  },
  {
    title: 'Application Context',
    active: false,
    children: [{ title: 'First steps', path: '/docs-webcomponent/about' }]
  },
  {
    title: 'Recipes',
    active: false,
    children: [{ title: 'Neo4J + Graphql', path: '/docs-webcomponent/about' }]
  },
  {
    title: 'CLI',
    active: false,
    children: [{ title: 'Bootstrap application', path: '/docs-webcomponent/about' }]
  },
  {
    title: 'FAQ',
    active: false,
    children: [{ title: 'And so on', path: '/docs-webcomponent/about' }]
  }
];

render(
  html`
    <r-docs .items=${items} .slots=${slots}></r-docs>
  `,
  document.body
);
