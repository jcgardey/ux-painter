import XPathInterpreter from '../../utils/XPathInterpreter';

//TODO: somehow, the file is realoded and that makes it impossible to remove listeners :(
console.log("\n\n\n********* LOADING THE 'PAGE SELECTOR' FILE *********\n\n\n");

var scrappers = {
  // Because we can not use window instead
  XpathScrapper: function () {
    this.getElements = function (selector) {
      return new XPathInterpreter().getElementsByXpath(selector, document);
    };
    this.getElement = function (selector) {
      if (selector == undefined) return;

      var elems = new XPathInterpreter().getElementsByXpath(selector, document);
      return elems && elems.length > 0 ? elems[0] : undefined; //(new XPathInterpreter()).getElementByXPath(selector, document);
    };
  },
  QuerySelectorScrapper: function () {
    this.getElements = function (selector) {
      return document.querySelectorAll(selector);
    };
    this.getElement = function (selector) {
      if (selector == undefined) return;
      return document.querySelector(selector);
    };
  },
};

function PageSelector() {
  //this.createEventListeners();
  this.selectableElemClass = 'andes-selectable';
  this.onHoverHighlightClass = 'ux-painter-highlighted-on-hover';
  this.clearBackgroundClass = 'andes-clear-background';
  this.obfuscatedClass = 'andes-blurred';
  this.onElementSelectionMessage = null;
  this.loadListeners();
  this.selectedElem = null;

  this.selectionClass = 'ux-painter-selected';
  this.secondarySelectionClass = 'ux-painter-secondary-selected';
  this.requiredFieldClass = 'ux-painter-required-field';
  this.borderBottomSelectionClass = 'ux-painter-border-bottom-highlighted';
}
PageSelector.prototype.getSetOfXPathsByOccurrences = function (
  element,
  relativeElem,
  generateRelativeSelector,
  relativeElements
) {
  var xpi = new XPathInterpreter(),
    labeledXpaths = {},
    xpaths;

  if (this.justFullPaths) {
    //Input y trigger
    xpaths = xpi.getMultipleFullPaths(element, relativeElem);
  } else {
    if (generateRelativeSelector) {
      // properties
      var matchingRelativeElem;
      for (var i = relativeElements.length - 1; i >= 0; i--) {
        if (relativeElements[i].contains(element)) {
          matchingRelativeElem = relativeElements[i];
          break;
        }
      }

      if (matchingRelativeElem)
        xpaths = xpi.getMultipleRelativeXPaths(
          element,
          matchingRelativeElem,
          this.generatesSingleElemSelectors
        );
      else xpaths = [];
    } else {
      console.log('getMultipleXPaths');
      xpaths = xpi.getMultipleXPaths(
        element,
        element.ownerDocument,
        this.generatesSingleElemSelectors
      );
    }
  }

  if (xpaths && xpaths.length) {
    for (var i = xpaths.length - 1; i >= 0; i--) {
      if (!xpaths[i].includes('andes-')) {
        var elemsBySelector = xpi.getElementsByXpath(
          xpaths[i],
          element.ownerDocument
        ).length;
        if (elemsBySelector > 0) {
          if (labeledXpaths[elemsBySelector])
            this.addToExistingLabeledXpath(
              elemsBySelector,
              xpaths[i],
              labeledXpaths
            );
          else
            this.createNewLabeledXpath(
              elemsBySelector,
              xpaths[i],
              labeledXpaths
            );
        }
      }
    }
  }

  return labeledXpaths;
};
PageSelector.prototype.addToExistingLabeledXpath = function (
  ocurrences,
  xpath,
  labeledXpaths
) {
  var xpaths = labeledXpaths[ocurrences];
  //console.log("existing", xpaths, " with ", xpath);
  xpaths.push(xpath);

  labeledXpaths[ocurrences] = xpaths;
};
PageSelector.prototype.createNewLabeledXpath = function (
  ocurrences,
  xpath,
  labeledXpaths
) {
  labeledXpaths[ocurrences] = [xpath];
};
PageSelector.prototype.loadListeners = function () {
  var me = this;

  this.selectionListener = function (evt) {
    var matchingElements = me.withParentElements(me.selectedElem);
    me.removeHighlightingOnHover(me.selectedElem);
    evt.params.onElementSelection(me.selectedElem);
  };
  this.mouseEnterSelection = function (evt) {
    evt.preventDefault();
    evt.stopImmediatePropagation();

    let parent = this.parentNode;
    while (parent.parentNode != document) {
      me.removeStyleClass(parent, me.onHoverHighlightClass);
      parent = parent.parentNode;
    }
    me.addStyleClass(this, me.onHoverHighlightClass);
  };
  this.withParentElements = function (element) {
    var nodes = [];
    nodes.push(element);
    while (element.parentNode) {
      nodes.unshift(element.parentNode);
      element = element.parentNode;
    }
    return nodes;
  };
  this.mouseLeaveSelection = function (evt) {
    me.removeStyleClass(this, me.onHoverHighlightClass);
    evt.preventDefault();
    evt.stopImmediatePropagation();
  };
  this.preventAnyAction = function (evt) {
    evt.preventDefault();
    evt.stopImmediatePropagation();
    return false; //This is for preventing anchors
  };
  this.preventActionsListener = function (evt) {
    evt.preventDefault();
    evt.stopImmediatePropagation();
    me.selectedElem = this; //evt.target;

    if (me.selectedElem) {
      if (me.hasAugmentedAction(me.selectedElem)) {
        console.log('preventActionsListener');
        me.executeAugmentedActions({ target: me.selectedElem, type: evt.type });
      }
    }

    return false;
  };
};

PageSelector.prototype.getAllVisibleDomElementsSelector = function () {
  return 'div, input, a, img, span, label, ul, li, p, pre, cite, em, form, select, h1, h2, h3, h4, h5, h6, nav, section, header, aside, footer, tr, button';
};

PageSelector.prototype.getAllVisibleDomElements = function () {
  return document.querySelectorAll(
    'body, input, div, a, img, span, label, ul, li, p, pre, cite, em'
  ); //:not(.first)
};
PageSelector.prototype.getAllVisibleDomElementsButBody = function () {
  return document.querySelectorAll(
    'div, input, a, img, span, label, ul, li, p, pre, cite, em, form, select, h1, h2, h3, h4, h5, h6, nav, section, header, aside, footer, tr, button'
  ); //:not(.first)
};
PageSelector.prototype.getCurrentSidebarElements = function () {
  return document.querySelector('#ux-painter-root').querySelectorAll('*');
};
PageSelector.prototype.highlightMatchingElements = function (data) {
  /*var elems = (new XPathInterpreter()).getElementsByXpath(data.xpath, document);
	for (var i = elems.length - 1; i >= 0; i--) {
		this.addSelectionClass(elems[i]);
	}*/
};
PageSelector.prototype.selectMatchingElements = function (data) {
  if (data.removeFullSelectionStyle) this.removeFullSelectionStyle();

  var refElem =
    data.scrapper && data.refElemSelector
      ? new scrappers[data.scrapper]().getElement(data.refElemSelector)
      : document;

  var elems = new XPathInterpreter().getElementsByXpath(data.selector, refElem);
  for (var i = elems.length - 1; i >= 0; i--) {
    this.addSelectionClass(elems[i]);
  }
};
PageSelector.prototype.preventDomElementsBehaviour = function () {
  var me = this;
  this.preventFormsOnSubmit();
  this.getAllVisibleDomElementsButBody().forEach(function (elem) {
    elem.addEventListener('click', me.preventActionsListener, false);
    me.getEventsNamesToPrevent().forEach(function (eventToPrevent) {
      elem.addEventListener(eventToPrevent, me.preventAnyAction, false);
    });
  });
};
PageSelector.prototype.preventFormsOnSubmit = function () {
  //TODO: it is not working with "addEventListener". This is a problem because maybe we can not resore the original behaviour after this
  const me = this;
  document.querySelectorAll('form').forEach(function (form) {
    /**
		form.onsubmit = function(evt){
    		return false;
		}; */
    form.addEventListener('submit', me.preventActionsListener, false);
  });
};
PageSelector.prototype.restoreDomElementsBehaviour = function () {
  this.removeAllAugmentedActions();

  var me = this; ///////THIS MAY BE A PROBLEM FOR THE SIDEBAR IF THIS METHOD IS CALLED IN THE MIDDLE OF THE PROCESS
  this.getAllVisibleDomElementsButBody().forEach(function (elem) {
    elem.removeEventListener('click', me.preventActionsListener, false);
    me.getEventsNamesToPrevent().forEach(function (eventToPrevent) {
      elem.removeEventListener(eventToPrevent, me.preventAnyAction, false);
    });
    me.removeHighlightingOnHover(elem);
  });

  this.removeFullSelectionStyle();
  this.restoreFormsSubmission();
};

PageSelector.prototype.restoreFormsSubmission = function () {
  const me = this;
  document.querySelectorAll('form').forEach(function (form) {
    form.removeEventListener('submit', me.preventActionsListener);
  });
};
PageSelector.prototype.removeAugmentedActions = function (elem) {
  elem.removeAttribute('andes-actions');
};
PageSelector.prototype.removeAllAugmentedActions = function (elem) {
  document
    .querySelectorAll('*[andes-actions]')
    .forEach((e) => e.removeAttribute('andes-actions'));
};
PageSelector.prototype.getEventsNamesToPrevent = function () {
  return ['click', 'mouseup', 'mousedown']; //, "keydown", "keyup", "keypress",
};
PageSelector.prototype.getTargetElements = function (selector) {
  return document.querySelectorAll(selector);
};
PageSelector.prototype.enableFullPathElementSelection = function (data) {
  this.darkifyAllDomElements();
  this.preventFormsOnSubmit();

  this.lastUsedExtractor = new scrappers[data.scrapperClass]();
  this.generatesSingleElemSelectors = data.generatesSingleElemSelectors;
  var elements = this.lastUsedExtractor.getElements(data.targetElementSelector);
  this.refElem = this.lastUsedExtractor.getElement(data.refElemSelector);

  this.onElementSelectionMessage = data.onElementSelection;

  this.addSelectionListener(
    elements,
    data.onElementSelection,
    'click',
    data.scoped,
    data.removeStyleOnSelection,
    data.generateRelativeSelector,
    data /*este solo es laposta*/
  );
  this.undarkifySidebarElements();
  this.darkify(document.body);
};
PageSelector.prototype.enableElementSelection = function (data) {
  this.darkifyAllDomElements();
  this.preventFormsOnSubmit();

  this.lastUsedExtractor = new scrappers['QuerySelectorScrapper']();
  this.generatesSingleElemSelectors = data.generatesSingleElemSelectors;
  var elements = this.lastUsedExtractor.getElements(data.targetElementSelector);
  this.refElem = this.lastUsedExtractor.getElement(data.refElemSelector);
  this.refElems = this.lastUsedExtractor.getElements(data.refElemSelector);
  this.onElementSelectionMessage = data.onElementSelection;
  this.justFullPaths = data.justFullPaths;

  this.addSelectionListener(
    elements,
    data.onElementSelection,
    'click',
    data.scoped,
    data.removeStyleOnSelection,
    data.generateRelativeSelector,
    data /*este solo es laposta*/
  );
  this.undarkifySidebarElements();
  this.darkify(document.body);
};
PageSelector.prototype.disableElementSelection = function (data) {
  this.undarkifyAllDomElements();
  this.removeElemsHighlightingClass(data.selector);
  this.removeHighlightingOnHoverFrom(data.selector);
  this.removeAllAugmentedActions(); //TODO: do not just remove. add a default action (prevent)
};
PageSelector.prototype.darkifyAllDomElements = function () {
  var me = this,
    elems = this.getAllVisibleDomElements();
  elems.forEach(function (elem) {
    me.darkify(elem);
  });
};
PageSelector.prototype.undarkifyAllDomElements = function () {
  var me = this,
    elems = this.getAllVisibleDomElements();
  elems.forEach(function (elem) {
    me.undarkify(elem);
  });
};
PageSelector.prototype.removeElemsHighlightingClass = function (selector) {
  var me = this,
    elems = this.lastUsedExtractor.getElements(selector);
  elems.forEach(function (elem) {
    me.removeSelectableElemStyle(elem);
  });
};
PageSelector.prototype.hasAugmentedAction = function (target) {
  return this.getAugmentedActions(target).length > 0;
};
PageSelector.prototype.executeAugmentedActions = function (evt) {
  var actions = this.getAugmentedActions(evt.target);

  for (var i = actions.length - 1; i >= 0; i--) {
    if (evt.type.toUpperCase() == actions[i].event.toUpperCase()) {
      evt.params = actions[i].params;
      this[actions[i].listener](evt); //e.g.
    }
  }
};
PageSelector.prototype.getAugmentedActions = function (elem) {
  if (elem.augmentedActions === undefined) {
    elem.augmentedActions = [];
  }
  return elem.augmentedActions;
  /*
  if (elem) {
    var actions = elem.getAttribute('andes-actions');
    if (actions && actions.length) return (actions = JSON.parse(actions));
  }
  return [];*/
};
PageSelector.prototype.isActionIncluded = function (existingAction, actions) {
  for (var i = actions.length - 1; i >= 0; i--) {
    if (
      actions[i].listener == existingAction.listener &&
      actions[i].listener == existingAction.listener
    ) {
      return true;
    }
  }
  return false;
};
PageSelector.prototype.addAugmentedAction = function (elem, action, params) {
  var actions = this.getAugmentedActions(elem);
  if (!this.isActionIncluded(action, actions)) {
    actions.push(action);
    elem.setAttribute('andes-actions', JSON.stringify(actions));
  }
};
PageSelector.prototype.addSelectionListener = function (
  elements,
  onElementSelection,
  onEvent,
  scoped,
  removeStyleOnSelection,
  generateRelativeSelector,
  data
) {
  var me = this;

  this.removeStyleOnSelection = removeStyleOnSelection;
  this.scoped = scoped;
  this.generateRelativeSelector = generateRelativeSelector;

  elements.forEach(function (elem) {
    me.undarkify(elem);
    me.addHighlightingOnHover(elem);
    me.addSelectableElemStyle(elem);
    me.addAugmentedAction(elem, {
      listener: 'selectionListener',
      event: onEvent,
      params: data,
    });
  });
};

PageSelector.prototype.addHighlightingOnHover = function (elem) {
  elem.addEventListener('mouseover', this.mouseEnterSelection, false);
  elem.addEventListener('mouseleave', this.mouseLeaveSelection, false);
};
PageSelector.prototype.removeHighlightingOnHover = function (elem) {
  elem.removeEventListener('mouseover', this.mouseEnterSelection, false);
  elem.removeEventListener('mouseleave', this.mouseLeaveSelection, false);
  this.removeStyleClass(elem, this.onHoverHighlightClass);
};
PageSelector.prototype.addSelectableElemStyle = function (elem) {
  this.addStyleClass(elem, this.selectableElemClass);
};
PageSelector.prototype.addSelectionClass = function (elem, className) {
  if (!className) {
    className = this.selectionClass;
  }
  this.addStyleClass(elem, className);
  this.setElementID(elem);
  if (elem.type == 'checkbox') {
    elem.checked = true;
  }
};

PageSelector.prototype.addRequiredField = function (element) {
  this.addStyleClass(element, this.requiredFieldClass);
};

PageSelector.prototype.removeRequiredField = function (elem) {
  this.removeStyleClass(elem, this.requiredFieldClass);
};

PageSelector.prototype.removeFullSelectionStyle = function () {
  this.removeClassFromMatchingElements(this.obfuscatedClass);
  this.removeClassFromMatchingElements(this.selectableElemClass);
  this.removeClassFromMatchingElements(this.onHoverHighlightClass);
  this.removeClassFromMatchingElements(this.clearBackgroundClass);
  //this.removeClassFromMatchingElements(this.selectionClass);
  //this.restoreDomElementsBehaviour();

  return Promise.resolve();
};
PageSelector.prototype.removeHighlightingOnHoverFrom = function (selector) {
  this.selectedElem = undefined;

  var me = this;
  this.lastUsedExtractor.getElements(selector).forEach(function (elem) {
    me.removeHighlightingOnHover(elem);
  });
};
PageSelector.prototype.removeEventBlockers = function () {
  console.log('Removing event blockers');
};
PageSelector.prototype.removeClassFromMatchingElements = function (className) {
  var hElems = document.querySelectorAll('.' + className);
  hElems.forEach((e) => e.classList.remove(className));
  return hElems;
};
PageSelector.prototype.addClassToMatchingElements = function (
  elems,
  className
) {
  for (var i = 0; i < elems.length; i++) {
    this.addStyleClass(elems[i], className);
  }
  return elems;
};
PageSelector.prototype.undarkifySidebarElements = function () {
  var me = this;
  this.getCurrentSidebarElements().forEach(function (elem) {
    me.undarkify(elem);
  });
};
PageSelector.prototype.isAVisibleElement = function (elem) {
  return elem.style.display != 'none' && elem.getBoundingClientRect().width != 0
    ? true
    : false;
};
PageSelector.prototype.darkify = function (elem) {
  this.addStyleClass(elem, this.obfuscatedClass);
};
PageSelector.prototype.addClearBackground = function (elem) {
  this.addStyleClass(elem, this.clearBackgroundClass);
};
PageSelector.prototype.addStyleClass = function (elem, className) {
  if (elem.classList && !elem.classList.contains(className)) {
    elem.classList.add(className);
  }
};
PageSelector.prototype.removeStyleClass = function (elem, className) {
  if (elem && elem.classList && elem.classList.contains(className)) {
    elem.classList.remove(className);
  }
};
PageSelector.prototype.undarkify = function (elem) {
  this.removeStyleClass(elem, this.obfuscatedClass);
};
PageSelector.prototype.removeSelectableElemStyle = function (elem) {
  this.removeStyleClass(elem, this.selectableElemClass);
};
PageSelector.prototype.removeClearBackground = function (elem) {
  this.removeStyleClass(elem, this.clearBackgroundClass);
};

PageSelector.prototype.removeSelectionClass = function (elem, className) {
  if (!className) {
    className = this.selectionClass;
  }
  if (elem.type == 'checkbox') {
    elem.checked = false;
  }
  this.removeStyleClass(elem, className);
};

PageSelector.prototype.removeSelectedElementsHighlighting = function () {
  var matchingElements = document.querySelectorAll(
    '.' +
      this.selectionClass +
      ', .' +
      this.secondarySelectionClass +
      ', .' +
      this.borderBottomSelectionClass
  );
  for (let i = 0; i < matchingElements.length; i++) {
    this.removeSelectionClass(matchingElements[i], this.selectionClass);
    this.removeSelectionClass(
      matchingElements[i],
      this.secondarySelectionClass
    );
    this.removeSelectionClass(
      matchingElements[i],
      this.borderBottomSelectionClass
    );
  }
};

PageSelector.prototype.setElementID = function (element) {
  if (!element.getAttribute(this.elementIDAttribute)) {
    element.setAttribute(
      this.elementIDAttribute,
      Math.random().toString(36).substring(2, 15)
    );
  }
};

PageSelector.prototype.findSimilarElements = function (container, element) {
  var elementsFound = [];
  var candidateElements = container.querySelectorAll('*');
  for (let i = 0; i < candidateElements.length; i++) {
    if (this.compareElements(element, candidateElements[i])) {
      elementsFound.push(candidateElements[i]);
    }
  }
  return elementsFound;
};

PageSelector.prototype.compareElements = function (element, anotherElement) {
  var exlucedAttributes = ['id', this.elementIDAttribute];
  for (let i = 0; i < element.getAttributeNames().length; i++) {
    if (
      exlucedAttributes.indexOf(element.getAttributeNames()[i]) == -1 &&
      element.getAttribute(element.getAttributeNames()[i]) !=
        anotherElement.getAttribute(element.getAttributeNames()[i])
    ) {
      return false;
    }
  }
  return true;
};

export default PageSelector;
