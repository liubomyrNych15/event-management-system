import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Event } from '../events/entities/event.entity';

@Injectable()
export class RecommendationService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  async recommend(eventId: number): Promise<Event[]> {
    const event = await this.eventRepository.findOne({ where: { id: eventId } });

    if (!event) {
      throw new NotFoundException(`Event with id ${eventId} not found`);
    }
    
    return this.eventRepository.find({
      where: { category: event.category },
      order: { date: 'ASC' },
    });
  }
}