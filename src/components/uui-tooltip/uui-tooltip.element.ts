import { property, state, query } from 'lit/decorators';
import { LitElement, html, css } from 'lit';
import { OverlayPosition } from '../uui-overlay/uui-overlay.element';
import { UUIOverlayEvent } from '../uui-overlay/UUIOverlayEvent';

/**
 *  @element uui-tooltip
 */

export class UUITooltipElement extends LitElement {
  static styles = [
    css`
      :host {
      }
    `,
  ];

  @property({ type: String }) position: OverlayPosition = 'topRight';
  @property({ type: Boolean, attribute: 'use-click' }) useClick = false;
  @property({ type: Boolean }) open = false;

  openTooltip(value: boolean) {
    this.open = value;
  }

  // TODO: Fix the key input event and blur and focus
  render() {
    return html`
      <div>
        <uui-overlay
          .margin=${10}
          .open=${this.open}
          .overlayPos=${this.position}
          @change=${(e: UUIOverlayEvent) => (this.open = e.target.open)}>
          <slot
            name="parent"
            slot="parent"
            @keypress=${() => 'this is needed for a11y'}
            @click=${() => (this.useClick ? this.openTooltip(!this.open) : '')}
            @mouseover=${() => (this.useClick ? '' : this.openTooltip(true))}
            @mouseout=${() => (this.useClick ? '' : this.openTooltip(false))}
            @focus=${() => 'this is needed for a11y'}
            @blur=${() => 'this is needed for a11y'}></slot>
          <slot name="overlay" slot="overlay"></slot>
        </uui-overlay>
      </div>
    `;
  }
}
