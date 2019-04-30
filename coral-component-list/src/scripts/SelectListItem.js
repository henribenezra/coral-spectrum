import {ComponentMixin} from '../../../coral-mixin-component';
import {transform} from '../../../coral-utils';
import {Icon} from '../../../coral-component-icon';
import checkIcon from '../templates/checkIcon';

const CLASSNAME = '_coral-Menu-item';

/**
 @class Coral.SelectList.Item
 @classdesc A SelectList item component
 @htmltag coral-selectlist-item
 @extends {HTMLElement}
 @extends {ComponentMixin}
 */
class SelectListItem extends ComponentMixin(HTMLElement) {
  /** @ignore */
  constructor() {
    super();
  
    // Templates
    this._elements = {
      // Fetch or create the content zone element
      content: this.querySelector('coral-selectlist-item-content') || document.createElement('coral-selectlist-item-content')
    };
    checkIcon.call(this._elements, {Icon});
  }
  /**
   Value of the item. If not explicitly set, the value of <code>Node.textContent</code> is returned.
   
   @type {String}
   @default ""
   @htmlattribute value
   @htmlattributereflected
   */
  get value() {
    return typeof this._value === 'string' ? this._value : this.textContent.replace(/\s{2,}/g, ' ').trim();
  }
  set value(value) {
    this._value = transform.string(value);
    this._reflectAttribute('value', this._value);
  }
  
  /**
   The content element for the item.
   
   @type {HTMLElement}
   @contentzone
   */
  get content() {
    return this._getContentZone(this._elements.content);
  }
  set content(value) {
    this._setContentZone('content', value, {
      handle: 'content',
      tagName: 'coral-selectlist-item-content',
      insert: function(content) {
        this.insertBefore(content, this._elements.icon);
      }
    });
  }
  
  /**
   Whether the item is selected.
   
   @type {Boolean}
   @default false
   @htmlattribute selected
   @htmlattributereflected
   */
  get selected() {
    return this._selected || false;
  }
  set selected(value) {
    this._selected = transform.booleanAttr(value);
    this._reflectAttribute('selected', this.disabled ? false : this._selected);
    
    this.classList.toggle('is-selected', this._selected);
    this.setAttribute('aria-selected', this._selected);
    
    // Toggle check icon
    this._elements.icon.hidden = !this._selected;
    
    this.trigger('coral-selectlist-item:_selectedchanged');
  }
  
  /**
   Whether this item is disabled.
   
   @type {Boolean}
   @default false
   @htmlattribute disabled
   @htmlattributereflected
   */
  get disabled() {
    return this._disabled || false;
  }
  set disabled(value) {
    this._disabled = transform.booleanAttr(value);
    this._reflectAttribute('disabled', this._disabled);
    
    this.classList.toggle('is-disabled', this._disabled);
    this.setAttribute('aria-disabled', this._disabled);
    
    this.selected = this.selected;
  }
  
  get _contentZones() { return {'coral-selectlist-item-content': 'content'}; }
  
  /** @ignore */
  static get observedAttributes() {
    return super.observedAttributes.concat(['selected', 'disabled', 'value']);
  }
  
  /** @ignore */
  connectedCallback() {
    super.connectedCallback();
    
    this.classList.add(CLASSNAME, '_coral-BasicList-item');
    
    this.setAttribute('role', 'option');
  
    // Support cloneNode
    const template = this.querySelector('._coral-SelectList-icon');
    if (template) {
      template.remove();
    }
    
    // Fetch or create the content content zone element
    const content = this._elements.content;
  
    // Move any remaining elements into the content sub-component
    if (!content.parentNode) {
      while (this.firstChild) {
        content.appendChild(this.firstChild);
      }
    }
  
    // Add template
    this.appendChild(this._elements.icon);
  
    // Assign the content zones, moving them into place in the process
    this.content = content;
  }
}

export default SelectListItem;
