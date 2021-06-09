import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [GameService],
  imports: [UsersModule],
  controllers: [GameController],
})
export class GameModule {}
