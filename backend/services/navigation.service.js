import { log } from "crawlee";
import Navigation from "../models/Navigation.js";

export const getNavigationService = async () => {
  const navigation = await Navigation.find();
  console.log(navigation);
  

  return navigation;
};