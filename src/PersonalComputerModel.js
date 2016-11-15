import fetch from 'node-fetch';

const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

export default class PersonalComputer {
  data = {};

  constructor() {
    this.fetch()
      .then(json => this.data = json)
      .catch(err => this.data = err);
  }

  async fetch() {
    try {
      let response = await fetch(pcUrl);
      return await response.json();
    } catch (err) {
      return null
    }
  }

  get attributes() {
    return this.data;
  }

  isEmpty() {
    return Object.keys(this.data).length === 0;
  }
}
