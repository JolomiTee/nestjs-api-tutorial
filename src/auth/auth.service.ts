import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2'
@Injectable({})
	// service is where the business logic is offloaded
export class AuthService {
	constructor(private prisma: PrismaService) { }

	async signup(dto: AuthDto) {
		// generate password hash
		const hash = await argon.hash(dto.password)

		// save new user in the db
		const user = await this.prisma.user.create({
			data: {
				email: dto.email,
				hash
			}
		})

		// return the saved user
		return user
	}

	signin() {
		return 'I wanna sign in'
	}
}