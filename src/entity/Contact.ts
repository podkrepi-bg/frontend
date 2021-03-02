import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity('contacts')
export class Contact extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', length: 50 })
  firstName: string

  @Column({ type: 'varchar', length: 50 })
  lastName: string

  @Column({ type: 'text' })
  message: string
}
