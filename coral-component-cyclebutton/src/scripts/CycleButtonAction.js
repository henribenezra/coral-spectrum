import {ComponentMixin} from '../../../coral-mixin-component';
import {transform} from '../../../coral-utils';

/**
 @class Coral.CycleButton.Action
 @classdesc A CycleButton Action component
 @htmltag coral-cyclebutton-action
 @extends {HTMLElement}
 @extends {ComponentMixin}
 */
class CycleButtonAction extends ComponentMixin(HTMLElement) {
  /**
   The Action's icon. See {@link Coral.Icon} for valid icon names.
   
   @type {String}
   @default ""
   @htmlattribute icon
   @htmlattributereflected
   */
  get icon() {
    return this._icon || '';
  }
  set icon(value) {
    this._icon = transform.string(value);
    this._reflectAttribute('icon', this._icon);
  }
  
  /**
   Action content element.
   
   @type {HTMLElement}
   @contentzone
   */
  get content() {
    return this;
  }
  set content(value) {
    // Support configs
    if (typeof value === 'object') {
      for (const prop in value) {
        /** @ignore */
        this[prop] = value[prop];
      }
    }
  }
  
  /**
   Inherited from {@link ComponentMixin#trackingElement}.
   */
  get trackingElement() {
    return typeof this._trackingElement === 'undefined' ?
      // keep spaces to only 1 max and trim. this mimics native html behaviors
      (this.content || this).textContent.replace(/\s{2,}/g, ' ').trim() || this.icon :
      this._trackingElement;
  }
  set trackingElement(value) {
    super.trackingElement = value;
  }
}

export default CycleButtonAction;
