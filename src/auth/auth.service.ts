import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { RegisterUserDTO, LoginUserDTO } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
        private readonly jwtService: JwtService,
    ) { }

    async signup({ password, ...payload }: RegisterUserDTO) {
        try {
            await this.userModel.create({
                ...payload,
                password: bcrypt.hashSync(password, 10),
            });
            return 'user added!';
        } catch (err) {
            this.handleDatabaseErrors(err);
        }
    }

    async login({ email, password }: LoginUserDTO) {
        const user = await this.userModel.findOne({ email: email });
        if (!user) throw new UnauthorizedException('email or password incorrect.');
        if (!bcrypt.compareSync(password, user.password)) throw new UnauthorizedException('email or password incorrect.');
        const token = this.getJwtToken(user.id);
        return {
            username: user.username,
            email: user.email,
            roles: user.roles,
            token
        };
    }

    private getJwtToken(userId: string) {
        return this.jwtService.sign({ id: userId });
    }

    private handleDatabaseErrors(err: any): never {
        if (err.code === 11000) throw new BadRequestException('username already exist in database.');
        throw new InternalServerErrorException('internal error, please contact backend support.');
    }
}
