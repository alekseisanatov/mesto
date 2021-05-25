export default class Section {
    constructor({renderer}, elementsContainer) {
        this._elementsContainer = elementsContainer;
        this._renderer = renderer;
    }

    renderItems(items)  {
        items.forEach(item => {
            this._renderer(item);
        });
    }

    addItem(card) {
        this._elementsContainer.prepend(card);
    }
}