import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { EventService } from './event.service';

@Controller('/api/v1/events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  getAllEvents() {
    return this.eventService.getAllEvents();
  }

  @Get(':id')
  getEvent(@Param('id') id: string) {
    return this.eventService.getEventById(id);
  }

  @Post('create')
  createEvent(@Body() data: any) {
    return this.eventService.createEvent(data);
  }

  @Put(':id')
  updateEvent(@Param('id') id: string, @Body() data: any) {
    return this.eventService.updateEvent(id, data);
  }
}
