import {TaskStatus} from "../task.model";
import {IsEnum, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class GetTasksFilterDto {
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus

    @IsOptional()
    @IsNotEmpty()
    search?: string
}
