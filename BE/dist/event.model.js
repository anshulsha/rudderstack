"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventModel = void 0;
class EventModel {
    constructor(data) {
        Object.assign(this, data);
    }
    static create(data) {
        return new EventModel(data);
    }
}
exports.EventModel = EventModel;
//# sourceMappingURL=event.model.js.map