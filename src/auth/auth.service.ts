import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
@Injectable({})
	// service is where the business logic is offloaded
export class AuthService {
	constructor(private prisma: PrismaService) { }

	signup() {
		return "I wanna sign up"
	}

	signin() {
		return 'I wanna sign in'
	}
}