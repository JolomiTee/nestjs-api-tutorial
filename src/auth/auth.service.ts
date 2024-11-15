import { Injectable } from "@nestjs/common";

@Injectable({})
	// service is where the business logic is offloaded
export class AuthService {
	signup() {
		return "I wanna sign up"
	}
	signin() {
		return 'I wanna sign in'
	}
}