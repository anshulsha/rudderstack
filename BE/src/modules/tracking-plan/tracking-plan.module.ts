import { Module } from '@nestjs/common';
import { TrackingPlanController } from './tracking-plan.controller';
import { TrackingPlanService } from './tracking-plan.service';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TrackingPlanController],
  providers: [TrackingPlanService],
})
export class TrackingPlanModule {}
