import { TaskStatus } from 'src/enum/tast.status.enum';
import { User } from 'src/user/entity/user.entity';
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

  @Column({ type: 'date', default: new Date() })
  expectedFinish: Date = new Date();

  @Column({ type: 'date' })
  finishedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  deletedAt: Date;

  @Column((type) => User)
  author: User;
}
