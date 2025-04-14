import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { RecommendationService } from 'src/recommendation/recommendation.service';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly recommendationService: RecommendationService,
  ) {}

  @Post()
  async create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  async findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @Get(':id/recommendations')
  async recommend(@Param('id') id: string) {
    return this.recommendationService.recommend(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(+id, updateEventDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }
}