import _ from "lodash";
import PersonalComputerModel from "./PersonalComputerModel";
import PunkPetHairModel from "./PunkPetHairModel";

// Loading models
let models = {};
models.personalComputerModel = new PersonalComputerModel;
models.punkPetHairModel = new PunkPetHairModel;

export function personalComputerModel() {
  return _.cloneDeep(models.personalComputerModel);
};

export function punkPetHairModel() {
  return _.cloneDeep(models.punkPetHairModel);
};
