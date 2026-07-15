import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('store_closure')
export class StoreClosure {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    day: string;

    @Column({ type: 'date', nullable: true })
    date: string;

    @Column({ default: false })
    all_day: boolean;

    @Column({ default: false })
    recurring_day: boolean;

    @Column({ default: true })
    active: boolean;

    @Column({ type: 'time', nullable: true })
    start_time: string | null;

    @Column({ type: 'time', nullable: true })
    end_time: string | null;
}