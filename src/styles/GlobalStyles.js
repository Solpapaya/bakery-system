import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {

     /* Indigo */
  /* --color-brand-50: #edf2ff;
  --color-brand-100: #dbe4ff;
  --color-brand-200: #bac8ff;
  --color-brand-300: #91a7ff;
  --color-brand-400: #748ffc;
  --color-brand-500: #5c7cfa;
  --color-brand-600: #4c6ef5;
  --color-brand-700: #4263eb;
  --color-brand-800: #3b5bdb;
  --color-brand-900: #364fc7; */
  --color-brand-50: #edf2ff;
  --color-brand-100: #d6dbff;
  --color-brand-200: #bfc4ff;
  --color-brand-300: #a9acff;
  --color-brand-400: #9295ff;
  --color-brand-500: #7b7eff;
  --color-brand-600: #6467fe;
  --color-brand-700: #4d50fe;
  --color-brand-800: #3738fe;
  --color-brand-900: #2021fe;
  --color-brand-1000: #090afe;

  /* Gray */
  --color-gray-0: #fff;
  --color-gray-50: #f8f9fa;
  --color-gray-100: #f1f3f5;
  --color-gray-200: #e9ecef;
  --color-gray-300: #dee2e6;
  --color-gray-400: #ced4da;
  --color-gray-500: #adb5bd;
  --color-gray-600: #868e96;
  --color-gray-700: #495057;
  --color-gray-800: #343a40;
  --color-gray-900: #212529;
  --color-gray-brand:  #4a4453;

  /* Teal */
  --color-teal-100: #c3fae8;
  --color-teal-900: #00cc99;
  /* --color-teal-900: #087f5b; */

  /* Yello */
  --color-yellow-100: #fff3bf;
  --color-yellow-900: #e67700;

  /* Red */
  --color-red-1000: #A30000;

  /* Green */
  --color-green-1000: #61d345;

  --image-grayscale: 0;
  --image-opacity: 100%;

  --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-md: 7px;
  --border-radius-lg: 9px;

  --flex-gap-tiny: 0.6rem;
  --flex-gap-sm: 1rem;
  --flex-gap-md: 1.5rem;
}

  *,
*::before,
*::after {
    box-sizing: border-box; // Now, width includes padding + border, so width: 100px means exactly 100px wide — no surprises.
  
    // Resets default browser spacing (which varies between browsers) to start with a clean slate. No extra space around <body>, <h1>, <p>, etc.
  padding: 0; 
  margin: 0;

  /* Creating animations for dark mode */
  transition: background-color 0.3s, border 0.3s;
}

html {
    // It’s 62.5% of 16px, which equals: 16px × 0.625 = 10px
    // Now 1rem = 10px instead of 16px.
  font-size: 62.5%;
}

body {
  font-family: "Montserrat", sans-serif;
  color: var(--color-grey-700);
  background-color: var(--color-gray-50);
  // Add this background-color when it's an iPhone
  /* background-color: var(--color-brand-1000); */

  transition: color 0.3s, background-color 0.3s;
  /* min-height: 100vh; */
  /* height: 100dvh; */
  line-height: 1.5;
  font-size: 1.6rem;

  padding-bottom: 6rem;

  /* overflow: hidden; // 💥 disables global scroll */
  width: 100vw;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  /* outline: 2px solid var(--color-brand-600); */
  /* outline: 1px solid var(--color-brand-600); */
  /* outline-offset: -1px; */
}

/* Parent selector, finally 😃 */
button:has(svg) {
  /* line-height: 0; */
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;

  /* For dark mode */
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}

`;

export default GlobalStyles;
