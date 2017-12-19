# Game of life

Inspired in: https://www.youtube.com/watch?v=CgOcEZinQ2I

### Install

> git clone https://github.com/alsanchez86/gol.git
> npm install
> bower install

### Compile SASS

> gulp

### Start

- Init simple HTTP Server
    > http-server

### Roadmap

- ~~Limitar número de celdas al crear la cuadrícula~~
- Usar redux para tener control sobre el estado del store (http://es.redux.js.org/).
- Memoria de celdas ya checkeadas en cada iteración, para no chequearla más de una vez.
- Usar CANVAS para la representación del layout. Usar librería KONVA (https://konvajs.github.io/).
- Checking for not valid cell's status
- Save plateau status in localstorage for load
- Implement Jasmine tests
- Implement webpack (in another branch)
- New branch Typescript
- Ver distintas posibilidades con d3: https://d3js.org/ [Descartado. Usaremos KONVA].
- Soporte a multiidioma en función del lenguage del navegador.
- Implementar patrón observable para tracking de usuario (http://www.dofactory.com/javascript/observer-design-pattern, http://reactivex.io/rxjs/).

### Issues

- ~~file:// not supported: https://jaketrent.com/post/cross-domain-requirejs-text/~~. Launch http-server.