import { FASTElement, css, customElement, html } from '@microsoft/fast-element';

const template = html`<h1>Hello, FAST!</h1>
  <br /><a href="https://fast.design" target="_blank">FAST design</a>`;

const styles = css`
  :host {
    display: block;
    margin: 24px;
  }
`;

@customElement({
  name: 'app-root',
  template,
  styles,
})
export class AppRoot extends FASTElement {}
