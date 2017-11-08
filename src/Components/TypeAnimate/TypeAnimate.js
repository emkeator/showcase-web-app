import React, {Component} from 'react';
import Typed from 'typed.js';



export default class TypeAnimate extends Component{
    constructor() {
        super();
        this.state = {
            strings: [
                'London', 
                'Paris', 
                'Shanghai', 
                'Rome',
                'Hong Kong',
                'Sydney',
                'Dubai',
                'Berlin',
                'Buenos Aires',
                'São Paolo',
                'Auckland',
                'Cairo',
                'Marrakech',
                'Granada',
                'Lisbon',
                'Oslo',
                'Melbourne',
                'Mumbai',
                'New Delhi',
                'Kathmandu',
                'Bali',
                'Bangkok',
                'Hanoi',
                'Phnom Penh',
                'Seoul',
                'Tokyo',
                'Beijing',
                'Goa',
                'Bombay',
                'Riyadh',
                'Johannesburg',
                'Alexandria',
                'Athens',
                'Naples',
                'Venice',
                'Milan',
                'Florence',
                'Munich',
                'Copenhagen',
                'Göteborg',
                'Las Vegas',
                'New York City',
                'Los Angeles',
                'San Francisco',
                'Denver',
                'Seattle',
                'Washington, D.C.',
                'Lima',
                'Boston',
                'Chicago',
                'Honolulu',
                'Atlanta',
                'Bogotá',
                'Rio di Janeiro',
                'Barcelona',
                'Nice',
                'Lyons',
                'Amsterdam',
                'Moscow',
                'St. Petersburg',
                'Vienna',
                'Santiago',
                'Mexico City',
                'Cancún',
                'Nassau',
                'Havana',
                'Edinburgh',
                'Dublin',
                'Istanbul',
                'San Diego',
                'Vancouver',
                'Banff',
                'Montreal',
                'Quebec',
                'Perth',
                'Wellington',
                'Santorini',
                'Geneva',
                'Zurich',
                'Warsaw',
                'Budapest'
            ],
        }
    }

    componentDidMount(){
        const options = {
            strings: this.state.strings,
            typeSpeed: 50,
            startDelay: 50,
            backSpeed: 50,
            smartBackspace: true,
            shuffle: true,
            backDelay: 1000,
            loop: true,
            loopCount: Infinity,
            showCursor: true
        };

        this.typed = new Typed(this.el, options);
    }

    componentWillUnmount(){
        this.typed.destroy();
    }

    render(){
        return(
            <div className="type-wrap">
                <span
                    style={{ whiteSpace: 'pre' }}
                    ref={(el) => { this.el = el; }}
                />
            </div>
        )
    }
}
