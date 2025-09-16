import {
  WIDTH_BREAKPOINTS,
  HEIGHT_BREAKPOINTS,
} from "../constants/breakpoints";

export const mqWidth = {
  mobile: `(min-width: ${WIDTH_BREAKPOINTS.mobile}px)`,
  tablet: `(min-width: ${WIDTH_BREAKPOINTS.tablet}px)`,
  desktop: `(min-width: ${WIDTH_BREAKPOINTS.desktop}px)`,
};

export const mqHeight = {
  iphone15Pro: `(min-height: ${HEIGHT_BREAKPOINTS.iphone15Pro}px)`,
  iphone15ProMax: `(min-height: ${HEIGHT_BREAKPOINTS.iphone15ProMax}px)`,
};

export const mqHasTouchInputs = "(pointer: coarse)";
