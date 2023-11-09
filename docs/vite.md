# Migration to Vite

This document showcases the main differences between CRA and Vite.

## NPM scripts

You have to use `npm run dev` instead of `npm start` during development.

In case you want to preview a production-ready build:

1. `npm run build`
2. `npm run preview`

## Mandatory JSX extension

Vite requires us to use the conventional `.jsx` extension for components (or views) and contexts.

That means that `CourierPackages.js` becomes `CourierPackage.jsx`

## Asset Handling

The `assets` folder was moved to the repository's root to accomodate Vite's (IMO better) way of asset handling.
That means that when you want to reference an asset into your component or view you have to do the following:

```jsx
import DispatchSvg from "/assets/images/undraw_data_processing_yrrv.svg";
```

Instead of:

```jsx
import DispatchSvg from "../../../assets/images/undraw_data_processing_yrrv.svg";
```

### Use of assets with the src tag

Good news! You don't have to do a whole song and dance to reference an asset as value for your src tag:

```jsx
<img src="/assets/icons/box.svg" alt={`${size} Package`} className={`img-fluid ${size}`} />

```

Instead of:

```jsx
<img src={require("../../assets/icons/box.svg").default} alt={`${size} Package`} className={`img-fluid ${size}`} />
```

## Support for env vars

No more hardcoded values! Vite supports env vars out-of-the-box, so you can use them as follows:

1. Create a `.env` file based on the up-to-date `.env.example` file and fill it out
2. Use the env vars value inside your code:

```jsx
baseURL: import.meta.env.PACKX_BACKEND_API_BASE_URL;
```
