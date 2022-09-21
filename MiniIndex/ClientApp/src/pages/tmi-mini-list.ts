import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { getMinis, Mini } from "../utils/minis.js";
import { miniListStyles } from "../styles/layout-styles.js";
import "../components/tmi-mini-card.js";

//TODO: Refactor this to take in an array of Minis as a property.
@customElement("tmi-mini-list")
export class TMIMiniList extends LitElement {
  static override styles = [miniListStyles, css``];

  @state() _data: Mini[] = null;
  @state() _loading: boolean = true;

  constructor() {
    super();
  }

  async firstUpdated() {
    this._data = await getMinis();
    console.log(this._data);
    this._loading = false;
  }

  override render() {
    return html`<div>
      ${this._loading
        ? html`<span>Loading</span>`
        : this._data && this._data.length > 0
        ? html`<ul class="grid" id="gallery">
            ${this._data.map((item) => {
              return html`<li>
                <tmi-mini-card
                  name=${item.Name}
                  status=${item.Status}
                  miniId=${item.ID}
                  thumbnail=${item.Thumbnail}
                  creatorId=${item.Creator.id}
                  creatorName=${item.Creator.name}
                  approvedTime=${item.LinuxTime}
                ></tmi-mini-card>
              </li>`;
            })}
          </ul>`
        : html`<span>No Results</span>`}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "tmi-mini-list": TMIMiniList;
  }
}
