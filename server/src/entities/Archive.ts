import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, ManyToOne, OneToMany, CreateDateColumn } from "typeorm";


import { Call } from "./Call";
import { Development } from "./Development";

@Entity({name:"archive"})
export class Archive {
    // define a chave primária como auto incremento
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 4})
    archiveType: string;

    @Column({nullable: false, length: 15})
    featureState: string;

    @CreateDateColumn({ name: 'callFinishedDate'})
    callFinishedDate: Date;

    @ManyToOne(() => Development, (development) => development.id)
    development: Development;

}
