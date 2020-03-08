import {
  Component,
  LitElement,
  html,
  css,
  classMap,
  property
} from '@rxdi/lit-html';
import '@rxdi/router/slot';
import { IRoute } from '@rxdi/router/slot/index';
import '@rhtml/operators';
import '@rhtml/components';

export interface DocItem {
  title: string;
  active?: boolean;
  path?: string;
  children?: DocItem[];
  disabled?: boolean;
}

interface ISubmenuState {
  item: DocItem;
  submenuHidden: boolean;
}
type ISubmenuSetState = (s: ISubmenuState) => void;
/**
 * @customElement r-docs
 */
@Component({
  selector: 'r-docs',
  style: css`
    .menu {
      padding: 20px 17px 40px 24px;
      width: 265px;
      background: #f5f5f5;
      bottom: 0;
      top: 0;
      z-index: 1000;
      overflow: hidden;
    }

    .main {
      margin: 0px;
      padding: 0px;
      color: #f8f8f8;
      font-family: 'Roboto', sans-serif;
      background-color: #23272c;
      overflow: visible;
      display: flex
    }

    .main::-webkit-scrollbar {
      width: 4px;
    }

    /* Track */
    .main::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    /* Handle */
    .main::-webkit-scrollbar-thumb {
      background: #26292b;
    }

    /* Handle on hover */
    .main::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  `,
  template(this: DocsComponent) {
    return html`
      <div class="main">
        <div>
          <div class="menu">
            <r-for .of=${this.items}>
              <r-let
                .item=${(i: DocItem) => html`
                  <r-part>
                    <r-state
                      .value=${{ item: i, submenuHidden: i.active }}
                    ></r-state>
                    <r-render
                      .state=${(
                        { item, submenuHidden }: ISubmenuState,
                        setState: ISubmenuSetState
                      ) => html`
                        <div
                          style="cursor: pointer;margin: 0 -10px;padding: 0 10px;"
                        >
                          <style>
                            h3 {
                              text-transform: uppercase;
                              text-decoration: none;
                              user-select: none;
                              font-weight: bold;
                              color: black;
                              font-size: 15px;
                              margin: 10px 0;
                              transition: all 200ms cubic-bezier(0.7, 0, 0.3, 1);
                            }
                            .active,
                            :hover {
                              color: #37a5bc;
                            }
                            ul {
                              margin: 10px 0 15px -20px;
                            }
                          </style>
                          <h3
                            @click=${() =>
                              setState({
                                item,
                                submenuHidden: !item.disabled
                                  ? !submenuHidden
                                  : false
                              })}
                            class=${classMap({ active: submenuHidden })}
                          >
                            ${i.title}
                          </h3>
                          ${submenuHidden && !item.disabled
                            ? html`
                                <ul class=${classMap({ submenuHidden })}>
                                  <rx-animation
                                    overflow="hidden"
                                    .options=${this.options}
                                  >
                                    <r-for .of=${item.children || []}>
                                      <r-let
                                        .item=${children => html`
                                          <style>
                                            * {
                                              outline: none;
                                            }
                                            a {
                                              color: #151515;
                                              font-size: 14px;
                                              text-decoration: none;
                                              cursor: pointer;
                                              border: 0;
                                            }
                                            a:hover {
                                              color: #37a5bc;
                                            }
                                            a:active,
                                            a:focus {
                                              user-select: none;
                                            }
                                          </style>
                                          <div
                                            style="transform: translateX(0%) ;"
                                          >
                                            <li>
                                              <router-link
                                                path=${children.path}
                                              >
                                                <a>${children.title}</a>
                                              </router-link>
                                            </li>
                                          </div>
                                        `}
                                      ></r-let>
                                    </r-for>
                                  </rx-animation>
                                </ul>
                              `
                            : ''}
                        </div>
                      `}
                    ></r-render>
                  </r-part>
                `}
              ></r-let>
            </r-for>
          </div>
        </div>
        <div>
          <div>
            <router-slots .slots=${this.slots}></router-slots>
          </div>
        </div>
      </div>
    `;
  }
})
export class DocsComponent extends LitElement {
  @property({ type: Array })
  slots: IRoute[] = [];

  @property({ type: Array })
  items: DocItem[] = [];
  private options = () => ({
    duration: 200,
    translateX: 0,
    easing: 'easeInOutSine'
  });
}
