#### Installation

```bash
npm i @rxdi/docs-webcomponent
```

#### Usage

```typescript
import { DocsComponent } from '@rxdi';

@Module({
  components: [DocsComponent]
})
export class AppModule {}
```

Without module encapsulation

```typescript
import '@rxdi';
```

```html
<rx-docs .items=${items}></rx-docs>
```

```ts
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
          path: '/home',
          component: HomeComponent
        },
        {
          title: 'Overview',
          active: true,
          path: '/about',
          component: async () => AboutComponent,
          children: [
            {
              title: 'Pesho',
              path: '/pesho',
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
              path: '/about2',
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
            { title: `Dont's and do's`, path: '/about' }
          ]
        },
        {
          title: 'Websockets',
          children: [
            { title: 'Using Subscriptions', path: '/about' }
          ]
        },
        {
          title: 'Microservices',
          children: [
            { title: 'Setup Microservice', path: '/about' }
          ]
        },
        {
          title: 'Application Context',
          children: [{ title: 'First steps', path: '/about' }]
        },
        {
          title: 'Recipes',
          children: [
            { title: 'Neo4J + Graphql', path: '/about' }
          ]
        },
        {
          title: 'CLI',
          children: [
            { title: 'Bootstrap application', path: '/about' }
          ]
        },
        {
          title: 'FAQ',
          children: [{ title: 'And so on', path: '/about' }]
        }
      ] as IDocItem[]}
    ></r-docs>
  `,
  document.body
);
```
