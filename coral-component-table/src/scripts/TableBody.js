import {ComponentMixin} from '../../../coral-mixin-component';
import TableSectionMixin from './TableSectionMixin';
import {getRows} from './TableUtil';

const CLASSNAME = '_coral-Table-body';

/**
 @class Coral.Table.Body
 @classdesc A Table body component
 @htmltag coral-table-body
 @htmlbasetag tbody
 @extends {HTMLTableSectionElement}
 @extends {ComponentMixin}
 @extends {TableSectionMixin}
 */
class TableBody extends TableSectionMixin(ComponentMixin(HTMLTableSectionElement)) {
  /** @ignore */
  constructor() {
    super();
  
    // Init content MO
    this._observer = new MutationObserver(this._handleMutations.bind(this));
  
    this._observer.observe(this, {
      childList: true,
      subtree: true
    });
  }
  
  /** @private */
  _handleMutations(mutations) {
    mutations.forEach((mutation) => {
      this.trigger('coral-table-body:_contentchanged', {
        addedNodes: mutation.addedNodes,
        removedNodes: mutation.removedNodes
      });
    });
  }
  
  /** @ignore */
  connectedCallback() {
    super.connectedCallback();
    
    this.classList.add(CLASSNAME);
  
    if (getRows([this]).length === 0) {
      this.trigger('coral-table-body:_empty');
    }
  }
  
  /**
   Triggered when the {@link TableBody} content changed.
   
   @typedef {CustomEvent} coral-table-body:_contentchanged
   
   @private
   */
  
  /**
   Triggered when the {@link TableBody} is initialized without rows.
   
   @typedef {CustomEvent} coral-table-body:_empty
   
   @private
   */
}

export default TableBody;
