import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, ManyToOne, OneToMany, CreateDateColumn } from "typeorm";
import { User } from "./User";
import { DeniedArchive } from "./DeniedArchive";
import { Development } from "./Development";

@Entity({name:"call"})
export class Call {
    // define a chave primária como auto incremento
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 20})
    callType: string;

    @Column({nullable: false, length: 80})
    callTitle: string;

    @Column({nullable: false, length: 250})
    callDescription: string;

    @Column({nullable: true})
    callAttachments: number;

    @CreateDateColumn({ name: 'callDateCreate'})
    callDateCreate: Date;

    @ManyToOne(() => User, (user) => user.id)
    user: User;

    @OneToMany(() => DeniedArchive, (deniedArchive) => deniedArchive.id)
    deniedArchive: DeniedArchive[];

    @OneToMany(() => Development, (development) => development.id)
    development: Development[];

}
