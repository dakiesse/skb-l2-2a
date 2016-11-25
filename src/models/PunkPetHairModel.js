import BaseFetchModel from "./BaseFetchModel";

const url = 'https://gist.githubusercontent.com/isuvorov/55f38b82ce263836dadc0503845db4da/raw/pets.json';

export default class PunkPetHairModel extends BaseFetchModel {
  constructor() {
    super(url);
  }
}
