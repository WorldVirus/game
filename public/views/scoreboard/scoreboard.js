import Block from '../baseview';
import './scoreboard.scss';
//import UserService from '../../servises/user-service'
//import u from '../../modules/http'
//const score= new UserService();


const rowValues = [`Username`,`Frags`,`Gold`]
//  const buttons = [`first`,`second`,`third`,`four`];
// const data  = [{username:'gamer',gold:0,frags:0},{username:'lammer',gold:110,frags:8989},{username:'lammer96',gold:1680,frags:1560}]

class Scoreboard extends Block {
    constructor() {
        super('div', ['score'], {});
    }

    creation() {
        const wrape = document.querySelector('div.wrapper');

        if (document.querySelector('div.menu') !== undefined) {
            document.querySelector('div.menu').remove();
        }
        wrape.appendChild(this._element);
        const arrows = document.createElement('div');
        arrows.style.width = '25%';
        arrows.style.margin = 'auto';
        const img1 = document.createElement('img');
        const img2 = document.createElement('img');
        img1.src = '../images/arrow.png';
        img2.src = '../images/arrow.png';
        img1.className = 'arrow';
        img2.className = 'arrow';
        img2.style.float = 'left';
        img2.style.transform = 'scale(-1, 1)';
        arrows.appendChild(img1);
        arrows.appendChild(img2);
        wrape.appendChild(arrows);
        this.appendChildBlock('table', new Block('table', ['table']));

        const table = new Block(document.querySelector('table.table'));


        const url = ('https://kvvartet2017.herokuapp.com' || `${window.location.protocol}//${window.location.host}`) + '/scoreboard';
        if (typeof window.fetch !== 'undefined') {

            fetch(url, {
                method: 'GET',
                mode: 'cors',
                credentials: 'include'
            })
                .then(function (response) {

                    let json = response.json();
                    console.log(json);
                    if (response.status >= 400) {

                        return json.then(response => {
                            throw response;
                        });
                    }
                    json.then(function (data) {
                        console.log(data);
                        for (let i = 0; i < data.length +1; ++i) {
                            table.appendChildBlock('data', new Block('tr', ['data']))
                        }
                        const array = document.getElementsByTagName('tr');
                        let value = array[0];
                        for (let i = 0; i < 3; ++i) {
                            value.appendChild(document.createElement('th'));
                            document.querySelector('tr.data').childNodes[i].innerHTML = `${rowValues[i]}`;
                        }

                        for (let k = 0; k < Math.ceil(data.length/5); k++) {
                            for (let i = 1 + k*5; i < data.length && i < 1 + (k + 1)*5; ++i) {
                                for (let j = 0; j < 3; ++j) {
                                    let el = document.createElement('td');
                                    if (i < 6) {
                                        el.style.display = 'none';
                                    }
                                    array[i].appendChild(el);
                                    if (j === 1) {
                                        array[i].childNodes[j].innerHTML = `${data[i - 1].gold}`;
                                        continue;
                                    }
                                    else if (j === 2) {
                                        array[i].childNodes[j].innerHTML = `${data[i - 1].frags}`;
                                        continue;
                                    }
                                    array[i].childNodes[j].innerHTML = `${data[i - 1].username}`;
                                }
                            }
                        }
                    });
                });

        }

    }

}
export default Scoreboard;
