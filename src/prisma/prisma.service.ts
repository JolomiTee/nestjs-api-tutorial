import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';


@Injectable()
export class PrismaService extends PrismaClient {
	constructor() {
		super({
			datasources: {
				db: {
					url: "postgresql://postgres:ICELAKE1029@localhost:5434/bird?schema=public"
				}
			}
		})
	}
}
