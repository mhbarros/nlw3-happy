import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import Orphanage from "./Orphanage";

@Entity('images')
class Images {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  path: string;

  @ManyToOne(() => Orphanage, orp => orp.images)
  @JoinColumn({name: 'id_orphanage'})
  orphanage: Orphanage;
}

export default Images