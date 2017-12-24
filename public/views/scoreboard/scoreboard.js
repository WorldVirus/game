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
       const score = wrape.appendChild(document.createElement('div'));
        score.setAttribute('class','score')
        document.querySelector('div.score').appendChild(document.createElement('table'));
        document.querySelector('table').setAttribute('class','table');


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
                        let size = 0;
                        if (data.length > 5) {
                            size = 5
                        }
                        else {
                            size = data.length
                        }
                        for (let i = 0; i < size +1; ++i) {
                            document.querySelector('table').appendChild(document.createElement('tr'))
                        }
                        const array = document.getElementsByTagName('tr');
                        let value = array[0];
                        for (let i = 0; i < 3; ++i) {
                            array[i].setAttribute('class','data')
                            value.appendChild(document.createElement('th'));
                            document.querySelector('tr.data').childNodes[i].innerHTML = `${rowValues[i]}`;
                        }

                        for (let i = 1; i < size + 1; ++i) {
                            for (let j = 0; j < 3; ++j) {
                                array[i].appendChild(document.createElement('td'));
                                if (j === 1) {
                                    array[i].childNodes[j].innerHTML = `${data[i-1].gold}`;
                                    continue;
                                }
                                else if (j === 2) {
                                    array[i].childNodes[j].innerHTML = `${data[i-1].frags}`;
                                    continue;
                                }
                                array[i].childNodes[j].innerHTML = `${data[i-1].username}`;

                            }
                        }
                    });
                });

            }

    }

}

export default Scoreboard;

