import { DoublyLinkedList } from "./collections.js";

export class GameCore {

    constructor () {
        this.settings = new GameSettings();
        this.sceneTree = null;
    }

}

/**
 * @class
 * @name GameSettings
 */
export class GameSettings {

    constructor() {
        /** @type {String} */
        this.mainScene = "";
        /** @type {{width: number, height: number}} */
        this.resolution = { width: 480, height: 360 };
        /** @type {string} */
        this.backgroundColor = "#ccc";
        /** @type {string} */
        this.description = "";
    }

}


/**
 * @class
 * @name SceneTree
 * @classdesc SceneTree for loading a game scene
 */
export class SceneTree {

    constructor() {
        /** @type {SceneNode} */
        this.root = null;
        /** @type {DoublyLinkedList<CanvasItem>} */
        this.drawables = new DoublyLinkedList();
        /** @type {int} */
        this.loopIntervalId = null;
    }

    static fromJSON(string) {
        const sceneTree = new SceneTree();
        const json = JSON.parse(string);
        for (const p of sceneTree) {
            sceneTree[p] = json[p];
        }
        return sceneTree;
    }

    initialize() {
        this.loopIntervalId = setInterval(loop, 1000/60);
        this.loop();
    }

    loop() {
        this.#treeEach(node => {
            node.process();
        });
    }

    input(event) {
        this.#treeEach(node => {
            node.input(event);
        })
    }

    /**
     * @method
     * @name addNode
     * @param {SceneNode} sceneNode
     * @param {SceneNode} parent
     * @returns {void}
     * @description Adds a node to the tree
     */
    addNode(sceneNode, parent = null) {
        if (parent === null) {
            this.root = sceneNode;
        } else {
            parent.children.push(sceneNode);
        }
        if (sceneNode instanceof CanvasItem) this.drawables.push(sceneNode);
    }

    /**
     * @method
     * @name #treeEach
     * @param {(SceneNode) -> void} predicate
     * @returns {void}
     * @description Traverses the tree in depth-first order
     */
    #treeEach(predicate) {
        if (this.root === null) return;
        predicate(this.root);

        /**
         * @constant
         * @type {DoublyLinkedList<{node: SceneNode, index: number}>}
         */
        const stack = new DoublyLinkedList();
        stack.push({ node: this.root, index: 0 });

        while (stack.tail.index < stack.tail.node.children.length) {
            const node = stack.tail.node.children[stack.tail.index];
            predicate(node);
            if (node.children.length > 0) {
                stack.push({ node: node, index: 0 });
            }
            stack.tail.index++;
        }
    }
}


/**
 * @class
 * @name SceneNode
 */
export class SceneNode {

    constructor() {
        /** @type {SceneNode[]} */
        this.children = [];
    }

    /**
     * @method
     * @name process
     * @param {number} delta
     */
    process(delta) { }

    /**
     * @method
     * @name input
     * @param {InputEvent} event
     */
    input(event) { }

}

export class CanvasItem extends SceneNode {

    constructor() {
        super();
    }

    draw(ctx) { }
}

export class SceneNode2D extends CanvasItem {



}