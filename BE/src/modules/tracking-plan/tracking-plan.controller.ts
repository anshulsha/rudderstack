import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { TrackingPlanService } from './tracking-plan.service';
import { CreateTrackingPlanRequestDto } from './dto/request/create-tracking-plan.dto';
import { stringify } from 'querystring';

@Controller('/api/v1/tracking-plans')
export class TrackingPlanController {
  constructor(private readonly trackingPlanService: TrackingPlanService) {}

  @Get()
  getAllTrackingPlans() {
    return this.trackingPlanService.getAllTrackingPlans();
  }

  @Get(':id')
  getTrackingPlan(@Param('id') id: string) {
    return this.trackingPlanService.getTrackingPlanById(id);
  }

  @Post('create')
  createTrackingPlanWithEvent(@Body() data: CreateTrackingPlanRequestDto) {
    let trackingPlanData = { ...data };
    let eventData = JSON.parse(JSON.stringify(trackingPlanData.rules.events));

    trackingPlanData['rules']['events'].length = 0;

    console.log(trackingPlanData, eventData);
    return this.trackingPlanService.createTrackingPlanWithEvent(
      trackingPlanData,
      eventData,
    );
  }

  @Put(':id')
  updateTrackingPlan(@Param('id') id: string, @Body() data: any) {
    return this.trackingPlanService.updateTrackingPlan(id, data);
  }
}
