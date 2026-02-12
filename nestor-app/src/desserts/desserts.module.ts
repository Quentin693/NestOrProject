import { Module } from '@nestjs/common';
import { DessertsService } from './desserts.service';
import { DessertsController } from './desserts.controller';

@Module({
  providers: [DessertsService],
  controllers: [DessertsController],
  exports: [DessertsService]
})
export class DessertsModule {}
