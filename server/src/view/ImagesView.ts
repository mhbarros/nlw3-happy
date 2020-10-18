import Images from "../model/Images";

export default {
  render(image: Images){
    const {id, path} = image;
    return {
      id,
      src: `http://localhost:3333/upload/${path}`
    }
  },
  renderMany(images: Images[]){
    return images.map(image => this.render(image));
  }
}