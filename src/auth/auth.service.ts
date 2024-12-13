
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/api/user/user.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {}

  async signIn(userId: number, pass: string) {
    const user = await this.userService.findUserById(userId);
    if (!user) throw new NotFoundException("User not found");
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const { password, ...result } = user;
    
    return {
      access_token: await this.jwtService.signAsync(result),
    };
  }
}
