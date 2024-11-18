import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
@Injectable({})
	// service is where the business logic is offloaded
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwt: JwtService
	) { }

	async signup(dto: AuthDto) {
		// generate password hash
		const hash = await argon.hash(dto.password)
		try {
			// save new user in the db
			const user = await this.prisma.user.create({
				data: {
					email: dto.email,
					hash
				},
				// select: {
				// 	id: true,
				// 	email: true,
				// 	createdAt: true
				// }
			})
			delete user.hash

			// return the saved user
			return user

		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					throw new ForbiddenException ('Credentials taken', 'User with your credentials already exists, try again with something else')
				}
			}
		}

	}

	async signin(dto: AuthDto) {
		// find user by mail
		const user = await this.prisma.user.findUnique({
			where: {
				email: dto.email
			}
		})

		// if no user throw exception
		if (!user) {
			throw new ForbiddenException("Incorrect credentials", 'your details do not seem to be correct, please try again')
		}

		// compare password
		const matchedPwd = await argon.verify(user.hash, dto.password)

		// if incorrect, exception
		if (!matchedPwd) {
			throw new ForbiddenException("Incorrect credentials", 'your details do not seem to be correct, please try again')
		}

		delete user.hash

		// all correct? send back user
		return user
	}
}