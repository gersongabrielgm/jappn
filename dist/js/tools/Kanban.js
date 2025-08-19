import React from '../libs/MiReact.js';
import JappN from '../libs/JappN.js';
export default class Kanban extends JappN {
    alCargar(props, cont) {
        return React.createElement("div", { class: "_kanban" }, cont.map(c => React.createElement("div", null,
            React.createElement("div", null, c.getAttribute('nombre')),
            React.createElement("div", { class: "_kcont" }, [...c.children].map(i => {
                i.classList.add('_kdrag');
                i.setAttribute("col", c.getAttribute("nombre"));
                return i;
            })))));
    }
    alCargado(el) {
        setTimeout(() => {
            const items = el.querySelectorAll('._kdrag');
            const contenedores = el.querySelectorAll('._kcont');
            let itemArrastrado = null;
            let ordenar = false;
            // Eventos para los items
            items.forEach((item) => {
                item.setAttribute('draggable', true);
                item.addEventListener('dragstart', (e) => {
                    itemArrastrado = item;
                    e.dataTransfer.effectAllowed = 'move';
                    e.dataTransfer.setData('text/html', item.innerHTML);
                    item.classList.add('arrastrando');
                });
                item.addEventListener('drop', (e) => ordenar = true);
                item.addEventListener('dragend', () => {
                    itemArrastrado = null;
                    item.classList.remove('arrastrando');
                });
            });
            // Eventos para los contenedores
            contenedores.forEach(contenedor => {
                contenedor.addEventListener('dragover', (e) => {
                    e.preventDefault();
                    e.dataTransfer.dropEffect = 'move';
                });
                contenedor.addEventListener('drop', (e) => {
                    e.preventDefault();
                    if (itemArrastrado) {
                        // Reordenar items dentro del mismo contenedor
                        const itemsEnContenedor = Array.from(contenedor.querySelectorAll('._kdrag'));
                        const itemArrastradoIndex = itemsEnContenedor.indexOf(itemArrastrado);
                        const itemSoltadoIndex = itemsEnContenedor.indexOf(e.target);
                        if (itemSoltadoIndex !== -1 && itemArrastradoIndex !== itemSoltadoIndex) {
                            if (itemArrastradoIndex < itemSoltadoIndex) {
                                contenedor.insertBefore(itemArrastrado, e.target.nextSibling);
                            }
                            else {
                                contenedor.insertBefore(itemArrastrado, e.target);
                            }
                        }
                        if (!ordenar) {
                            // Mover item a otro contenedor
                            contenedor.appendChild(itemArrastrado);
                            const nnombre = contenedor.parentNode.children[0].innerText;
                            itemArrastrado.setAttribute("col", nnombre);
                        }
                        ordenar = false;
                    }
                    //}
                });
            });
        }, 500);
    }
}
