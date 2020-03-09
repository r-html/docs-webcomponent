import '../src/index';

import { Component, html, LitElement } from '@rxdi/lit-html';
import { render } from '@rxdi/lit-html';

import { IDocItem } from '../src/index';

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

render(
  html`
    <r-docs
      .items=${[
        {
          title: 'Introduction',
          disabled: true,
          path: '/docs-webcomponent/home',
          component: HomeComponent
        },
        {
          title: 'Overview',
          active: true,
          path: '/docs-webcomponent/about',
          component: async () => AboutComponent,
          children: [
            {
              title: 'Pesho',
              path: '/docs-webcomponent/pesho',
              component: async () =>
                (await import('./pesho.component')).PeshoComponent
            }
          ]
        },
        {
          title: 'Fundamentals',
          children: [
            {
              title: 'First steps',
              path: '/docs-webcomponent/about2',
              component: () => {
                const el = document.createElement('div');
                render(
                  html`
                    My documentation page
                  `,
                  el
                );
                return el;
              }
            }
          ]
        },
        {
          title: 'Techniques',
          children: [
            { title: `Dont's and do's`, path: '/docs-webcomponent/about' }
          ]
        },
        {
          title: 'Websockets',
          children: [
            { title: 'Using Subscriptions', path: '/docs-webcomponent/about' }
          ]
        },
        {
          title: 'Microservices',
          children: [
            { title: 'Setup Microservice', path: '/docs-webcomponent/about' }
          ]
        },
        {
          title: 'Application Context',
          children: [{ title: 'First steps', path: '/docs-webcomponent/about' }]
        },
        {
          title: 'Recipes',
          children: [
            { title: 'Neo4J + Graphql', path: '/docs-webcomponent/about' }
          ]
        },
        {
          title: 'CLI',
          children: [
            { title: 'Bootstrap application', path: '/docs-webcomponent/about' }
          ]
        },
        {
          title: 'FAQ',
          children: [{ title: 'And so on', path: '/docs-webcomponent/about' }]
        }
      ] as IDocItem[]}
    ></r-docs>
  `,
  document.body
);
