# TailwindCSS usage documentation

This page shows how to use TailwindCSS with NodeJS package manager (npm).

## Packages

1. NodeJS

Install NodeJS via this [link](https://nodejs.org/en/)

2. TailwindCSS

```
npm i
```

## TailwindCSS usage

Include user-defined classes under `src/build/css/style.css`.
Link only `public/css/style.css` within the html.

Run the command `npm run build` in your terminal to complie the classes.

For documentation of the various Tailwind classes can be found [here](https://tailwindcss.com/docs).

## TailwindCSS example

```
<p class="font-bold text-lg">Hello World</p>
```

This means that the text will be Bolded and have a font-size of 1.125rem and line-height of 1.75rem (according to the TailwindCSS documentation).