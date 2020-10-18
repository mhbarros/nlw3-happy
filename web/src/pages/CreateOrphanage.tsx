import React, {ChangeEvent, FormEvent, useState} from "react";
import {useHistory} from 'react-router-dom';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { FiPlus } from "react-icons/fi";
import {LeafletMouseEvent} from 'leaflet';

import '../css/create-orphanage.css';

import SideBar from "../components/SideBar";
import MapMarker from "../utils/MapMarker";
import Api from "../services/api";

export default function CreateOrphanage() {

  const history = useHistory();

  const [currentLatLong, setCurrentLatLong] = useState({lat: 0, long: 0})

  const [name, setName]                 = useState('');
  const [about, setAbout]               = useState('');
  const [instructions, setInstructions] = useState('');
  const [openingHours, setOpeningHours] = useState('');
  const [images, setImages]             = useState<File[]>([]);

  const [openOnWeekends, setOpenOnWeekends] = useState(true);

  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleMapClick = (click: LeafletMouseEvent) => {
    const {lat, lng} = click.latlng;

    setCurrentLatLong({lat,  long: lng});
  }

  const doRegister = async (e: FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', name);
    data.append('about', about);
    data.append('instructions', instructions);
    data.append('opening_hours', openingHours);
    data.append('open_on_weekends', String(openOnWeekends));
    data.append('latitude', String(currentLatLong.lat));
    data.append('longitude', String(currentLatLong.long));
    data.append('images', name);

    images.forEach(image => {
      data.append('images', image);
    })

    await Api.post('/orphanage', data);

    alert('Cadastro realizado');

    history.push('/home');


  }

  const handleSelectImages = (e: ChangeEvent<HTMLInputElement>) => {
    if(!e.target.files) return;

    const selectedImages = Array.from(e.target.files);

    setImages(selectedImages);

    const imagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    })

    setPreviewImages(imagesPreview);
  }

  return (
    <div id="page-create-orphanage">
      <SideBar />
      <main>
        <form onSubmit={doRegister} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-27.2092052,-49.6401092]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {
                currentLatLong.lat !== 0 && currentLatLong.long !== 0 ? (
                  <Marker interactive={false} icon={MapMarker} position={[currentLatLong.lat, currentLatLong.long]} />
                ) : null
              }
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={name} onChange={e => {setName(e.target.value)}} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="about" maxLength={300} value={about} onChange={e => {setAbout(e.target.value)}}/>
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">

                {
                  previewImages.map(preview => (
                    <img key={preview} src={preview} alt={name} />
                  ))
                }

                <label htmlFor={'images[]'} className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input multiple type={'file'} id={'images[]'} onChange={handleSelectImages} />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" value={instructions} onChange={e => {setInstructions(e.target.value)}} />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input id="opening_hours" value={openingHours} onChange={e => {setOpeningHours(e.target.value)}}/>
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button type="button" className={openOnWeekends ? 'active' : ''} onClick={() => {setOpenOnWeekends(true)}}>Sim</button>
                <button type="button" className={!openOnWeekends ? 'active' : ''} onClick={() => {setOpenOnWeekends(false)}}>Não</button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}
