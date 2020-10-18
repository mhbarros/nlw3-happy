import Orphanage from "../model/Orphanage";
import ImagesView from "./ImagesView";

const render = (orphanage: Orphanage) => {
  const {id, name, latitude, longitude, about, instructions, opening_hours, open_on_weekends, images} = orphanage;
  return {
    id,
    name,
    latitude,
    longitude,
    about,
    instructions,
    opening_hours,
    open_on_weekends,
    images: ImagesView.renderMany(images)
  }
}

const renderMany = (orphanages: Orphanage[]) => {
  return orphanages.map(orph => render(orph))
}

export default {
  render,
  renderMany
}