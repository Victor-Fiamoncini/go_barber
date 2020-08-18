import {
	Entity,
	Column,
	ObjectID,
	ObjectIdColumn,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm'

@Entity('notifications')
class Notification {
	@ObjectIdColumn()
	public id: ObjectID

	@Column()
	public content: string

	@Column('uuid')
	public recipient_id: string

	@Column({ default: false })
	public read: boolean

	@CreateDateColumn()
	public created_at: Date

	@UpdateDateColumn()
	public updated_at: Date
}

export default Notification
