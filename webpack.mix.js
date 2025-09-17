import mix from "laravel-mix";

mix.js("./src/web/assets/src/js/index.js", "./src/web/assets/dist");
mix.sass("./src/web/assets/src/scss/index.scss", "./src/web/assets/dist");
