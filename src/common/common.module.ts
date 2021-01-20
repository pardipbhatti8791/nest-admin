import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({
    secret: 'guguilovu',
    signOptions: { expiresIn: '60s' },
  })],
  exports: [JwtModule]
})
export class CommonModule {}
