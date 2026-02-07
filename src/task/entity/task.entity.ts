import { TaskStatus } from 'src/enum/tast.status.enum';
import {
  Entity,
  ObjectId,
  ObjectIdColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  BeforeInsert,
} from 'typeorm';

@Entity()
export class Task {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.ONGOING })
  status: TaskStatus = TaskStatus.ONGOING;

  // @BeforeInsert()
  // beforeInsertActions() {
  //   this.completed = false;
  // }

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  deletedAt: Date;
}
