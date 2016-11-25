import BaseFetchModel from "./BaseFetchModel";

const url = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

export default class PersonalComputer extends BaseFetchModel {
  constructor() {
    super(url);
  }
}
