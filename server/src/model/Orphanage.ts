import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from 'typeorm';
import Images from './Images';

@Entity('orphanage')
class Orphanage {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  about: string;

  @Column()
  instructions: string;

  @Column()
  open_on_weekends: boolean;

  @Column()
  opening_hours: string;

  @OneToMany(() => Images, image => image.orphanage, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({name: 'id_orphanage'})
  images: Images[];
}

export default Orphanage