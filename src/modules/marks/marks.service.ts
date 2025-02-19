import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { from, Observable } from "rxjs";
import { Mark } from "src/Entities/Marks";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { CreateMarkDTO, MarkDTO, UpdateMarkDTO } from "./dto";

@Injectable()
export class MarksService {
  constructor(
    @InjectRepository(Mark)
    private readonly marksRepository: Repository<Mark>
  ) {}

  createMark(body: CreateMarkDTO): Observable<MarkDTO> {
    const mark = this.marksRepository.create({
      mark: body.mark,
      student: { id: body.studentId },
      subject: { id: body.subjectId },
    });

    return from(this.marksRepository.save(mark));
  }

  getAll(): Observable<MarkDTO[]> {
    return from(
      this.marksRepository
        .createQueryBuilder("mark")
        .leftJoinAndSelect("mark.student", "student")
        .leftJoinAndSelect("mark.subject", "subject")
        .getMany()
    );
  }

  getOne(id: number): Observable<MarkDTO> {
    return from(
      this.marksRepository
        .createQueryBuilder("mark")
        .leftJoinAndSelect("mark.student", "student")
        .leftJoinAndSelect("mark.subject", "subject")
        .where("mark.id = :id", { id: id })
        .getOne()
    );
  }

  update(id: number, body: UpdateMarkDTO): Observable<UpdateResult> {
    return from(this.marksRepository.update(id, body));
  }

  delete(id: number): Observable<DeleteResult> {
    return from(this.marksRepository.delete(id));
  }
}
