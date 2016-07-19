import { Component } from '@angular/core';
import { Hero } from './hero';
import { Router } from '@angular/router';
import { HeroService } from './hero.service'

@Component({
	selector: 'my-dashboard',
	//  template: '<h3>My Dashboard</h3>',
	templateUrl: 'app/dashboard.component.html',
	styleUrls: ['app/dashboard.component.css']

})
export class DashboardComponent {
	heroes: Hero[];

	constructor(
		private router: Router,
		private heroService: HeroService) {
		heroService.getHeroes().then(heroes => this.heroes = heroes);
	}

	gotoDetail(hero: Hero) {
		let link = ['/detail', hero.id];
		this.router.navigate(link);
	}
}
