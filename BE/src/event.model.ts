// __mocks__/event.model.ts

export class EventModel {
    constructor(data: any) {
      Object.assign(this, data);
    }
  
    static create(data: any) {
      return new EventModel(data);
    }
  
    // Add any other methods you need to mock
  }
  