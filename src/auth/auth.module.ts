import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.contoller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'TT3$+`uS9R7rk9b@FerM[pB)t`}$(yy{t',
    }),
    UserModule,
    PrismaModule,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
