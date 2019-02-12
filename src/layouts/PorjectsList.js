import React, { Component } from 'react';
import Project from '../components/Project'

class ProjectsList extends Component {
    state = {
        projects: [
            {
                id: 1,
                title: "Dom w nowoczesnym stylu z bawialnią dla dzieci",
                description: "Minimalizm form, maksimum koloru - to najlepszy opis tego konceptu. Wymagania były jasno określone: chcemy koloru i to dużo! W tym duchu zaprojektowałyśmy salon - czerń ściany okiennej przełamują limonkowe akcenty, a jasne, dębowe drewno łagodzi całość. Takie wnętrze zapewnia przytulność, nie tracąc przy tym na nowoczesności. Minimalistyczna w formie kuchnia idealnie wpisuje się w klimat całego wnętrza i nie stanowi głównego punktu salonu, o to chodziło! Zabawa kolorem nie omija pozostałych pomieszczeń, w tym bawialni, gdzie połączyłyśmy ze sobą ciepły, wygaszony granat ze sklejką. Ścianka wspinaczkowa we własnym M, to dopiero frajda dla małych mieszkańców! W tym wnętrzu wyobraźnia najmłodszych pozostaje nieograniczona.",
                gallery: [
                    {
                        img: 'http://dorisdesignservices.pl/img/projects/dom_w_nowoczesnym_stylu/kuchnia-salon-2.jpg',
                        title: 'Tutuł 1'
                    },
                    {
                        img: 'http://dorisdesignservices.pl/img/projects/dom_w_nowoczesnym_stylu/kuchnia-salon-3.jpg',
                        title: 'Tytuł 2'
                    }
                ]
            },
            {
                id: 2,
                title: "Dom w nowoczesnym stylu z bawialnią dla dzieci",
                description: "Minimalizm form, maksimum koloru - to najlepszy opis tego konceptu. Wymagania były jasno określone: chcemy koloru i to dużo! W tym duchu zaprojektowałyśmy salon - czerń ściany okiennej przełamują limonkowe akcenty, a jasne, dębowe drewno łagodzi całość. Takie wnętrze zapewnia przytulność, nie tracąc przy tym na nowoczesności. Minimalistyczna w formie kuchnia idealnie wpisuje się w klimat całego wnętrza i nie stanowi głównego punktu salonu, o to chodziło! Zabawa kolorem nie omija pozostałych pomieszczeń, w tym bawialni, gdzie połączyłyśmy ze sobą ciepły, wygaszony granat ze sklejką. Ścianka wspinaczkowa we własnym M, to dopiero frajda dla małych mieszkańców! W tym wnętrzu wyobraźnia najmłodszych pozostaje nieograniczona.",
                gallery: [
                    {
                        img: 'http://dorisdesignservices.pl/img/projects/dom_w_nowoczesnym_stylu/kuchnia-salon-2.jpg',
                        title: 'Tutuł 1'
                    },
                    {
                        img: 'http://dorisdesignservices.pl/img/projects/dom_w_nowoczesnym_stylu/kuchnia-salon-3.jpg',
                        title: 'Tytuł 2'
                    }
                ]
            },
            {
                id: 3,
                title: "Dom w nowoczesnym stylu z bawialnią dla dzieci",
                description: "Minimalizm form, maksimum koloru - to najlepszy opis tego konceptu. Wymagania były jasno określone: chcemy koloru i to dużo! W tym duchu zaprojektowałyśmy salon - czerń ściany okiennej przełamują limonkowe akcenty, a jasne, dębowe drewno łagodzi całość. Takie wnętrze zapewnia przytulność, nie tracąc przy tym na nowoczesności. Minimalistyczna w formie kuchnia idealnie wpisuje się w klimat całego wnętrza i nie stanowi głównego punktu salonu, o to chodziło! Zabawa kolorem nie omija pozostałych pomieszczeń, w tym bawialni, gdzie połączyłyśmy ze sobą ciepły, wygaszony granat ze sklejką. Ścianka wspinaczkowa we własnym M, to dopiero frajda dla małych mieszkańców! W tym wnętrzu wyobraźnia najmłodszych pozostaje nieograniczona.",
                gallery: [
                    {
                        img: 'http://dorisdesignservices.pl/img/projects/dom_w_nowoczesnym_stylu/kuchnia-salon-2.jpg',
                        title: 'Tutuł 1'
                    },
                    {
                        img: 'http://dorisdesignservices.pl/img/projects/dom_w_nowoczesnym_stylu/kuchnia-salon-3.jpg',
                        title: 'Tytuł 2'
                    }
                ]
            },

        ]
    }
    render() {
        const projects = this.state.projects.map(project => <Project key={project.id} title={project.title} description={project.description} gallery={project.gallery} />)
        return (
            <div>
                <h1>ProjectList</h1>
                {projects}
            </div>
        );
    }
}

export default ProjectsList;
