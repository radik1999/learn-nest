import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Profile } from "./profile.model";
import { ProfileService } from "./profile.service";


@Module({
    imports: [TypeOrmModule.forFeature([Profile])],
    providers: [ProfileService],
    exports: [ProfileService]
})
export class ProfileModule {}
