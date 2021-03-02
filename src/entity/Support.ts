import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Support {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  isActive: boolean
}
