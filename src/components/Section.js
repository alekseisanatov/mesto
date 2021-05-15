export default class Section {
    constructor({items, renderer}, elementsContainer) {
        this._elementsContainer = elementsContainer;
        this._renderer = renderer;
        this._items = items;

    }

    renderItems()  {
        this._items.forEach(item => {
            this._renderer(item);
        });
    }

    addItem(card) {
        this._elementsContainer.prepend(card);
    }
}