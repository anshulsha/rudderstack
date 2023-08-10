import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';
import { TrackingPlanService } from './modules/tracking-plan/tracking-plan.service';
import { DatabaseService } from './database/database.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TrackingPlan,
  TrackingPlanSchema,
} from './database/schemas/tracking-plan.schema';
import { EventSchema } from './database/schemas/event.schema';

describe('TrackingPlanService', () => {
  let trackingPlanService: TrackingPlanService;
  let databaseService: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost/rudderstack'),
        MongooseModule.forFeature([
          { name: Event.name, schema: EventSchema },
          { name: TrackingPlan.name, schema: TrackingPlanSchema },
        ]),
      ],
      providers: [TrackingPlanService, DatabaseService],
    }).compile();

    trackingPlanService = module.get<TrackingPlanService>(TrackingPlanService);
    databaseService = module.get<DatabaseService>(DatabaseService);
  });

  describe('getAllTrackingPlans', () => {
    it('should return an array of tracking plans', async () => {
      const mockTrackingPlans = [
        /* mock data here */
      ];
      jest.spyOn(databaseService, 'find').mockResolvedValue(mockTrackingPlans);

      const result = await trackingPlanService.getAllTrackingPlans();

      expect(result).toEqual(mockTrackingPlans);
    });
  });

  describe('getTrackingPlanById', () => {
    it('should return a tracking plan by ID', async () => {
      const mockId = 'mock-id';
      const mockTrackingPlan = {
        /* mock data here */
      };
      jest
        .spyOn(databaseService, 'findById')
        .mockResolvedValue(mockTrackingPlan);

      const result = await trackingPlanService.getTrackingPlanById(mockId);
      console.log({ result });
      expect(result).toEqual(mockTrackingPlan);
    });
  });

  describe('createTrackingPlan', () => {
    it('should create a tracking plan', async () => {
      const mockData = {
        /* mock data here */
      };
      const mockNewTrackingPlan = {
        /* mock data here */
      };
      jest
        .spyOn(databaseService, 'create')
        .mockResolvedValue(mockNewTrackingPlan);

      const result = await trackingPlanService.createTrackingPlan(mockData);

      expect(result).toEqual(mockNewTrackingPlan);
    });
  });

  describe('createTrackingPlanWithEvent', () => {
    it('should create a tracking plan with associated events', async () => {
      // Implement this test case by mocking the DatabaseService and asserting the behavior
      // and expected interactions of the service methods.
    });

    it('should throw ConflictException if tracking plan or event slug already exists', async () => {
      // Implement this test case to ensure that a ConflictException is thrown when a slug already exists.
    });
  });
});
