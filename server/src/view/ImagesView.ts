import Images from "../model/Images";

const render = (image: Images) => {
  const {id, path} = image;
  return {
    id,
    src: `http://localhost:3333/upload/${path}`
  }
}

const renderMany = (images: Images[]) => {
  return images.map(image => render(image));
}

export default {
  render,
  renderMany
}