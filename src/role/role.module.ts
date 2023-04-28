import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Role } from "./role.model";
import { RoleService } from "./role.service";
import { RoleResolver } from "./role.resolver";


@Module({
    imports: [TypeOrmModule.forFeature([Role])],
    providers: [RoleService, RoleResolver],
    exports: [RoleService]
})
export class RoleModule {}
