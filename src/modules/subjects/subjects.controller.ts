import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { Observable } from "rxjs";
import { UpdateResult } from "typeorm";
import { CreateSubjectDTO, SubjectDTO, UpdateSubjectDTO } from "./dto";
import { SubjectsService } from "./subjects.service";

@Controller("subjects")
export class SubjectsController {
  constructor(private readonly subjectService: SubjectsService) {}

  @Post()
  createSubject(@Body() body: CreateSubjectDTO): Observable<SubjectDTO> {
    return this.subjectService.createSubject(body);
  }

  @Get()
  getSubjects(): Observable<SubjectDTO[]> {
    return this.subjectService.getAll();
  }

  @Put("/:id")
  updateSubject(
    @Param() id: number,
    @Body() body: UpdateSubjectDTO
  ): Observable<UpdateResult> {
    return this.subjectService.updateSubject(id, body);
  }
}
