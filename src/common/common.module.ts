import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({
    secret: 'guguilovu',
    signOptions: { expiresIn: '6000s' },
  })],
  exports: [JwtModule]
})
export class CommonModule {}
