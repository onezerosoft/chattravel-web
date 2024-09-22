import { REGION_MAP } from "../constants";
import { Region } from "../types/domain";

export const isRegionType = (x: string): x is Region =>
  Object.keys(REGION_MAP).includes(x);
