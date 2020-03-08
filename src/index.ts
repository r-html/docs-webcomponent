import { DocsComponent } from './docs.component';

declare global {
  // eslint-disable-next-line @typescript-eslint/interface-name-prefix
  interface HTMLElementTagNameMap {
    'rx-docs': DocsComponent;
  }
}

export * from './docs.component';
