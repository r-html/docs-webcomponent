import { Component, html, LitElement } from '@rxdi/lit-html';

@Component({
  selector: 'pesho-component',
  template(this: PeshoComponent) {
    return html`
      Pesho
    `;
  }
})
export class PeshoComponent extends LitElement {}
