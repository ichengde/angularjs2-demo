import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from './hero';

import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';



@Component({
	selector: 'my-heroes',
	templateUrl: 'app/heroes.component.html',
	styleUrls: ['app/heroes.component.css'],
	directives: [HeroDetailComponent]
})


export class HeroesComponent implements OnInit {

	selectedHero: Hero;
	heroes: Hero[];
	addingHero: boolean;
	error: any;

	constructor(private router: Router, private heroService: HeroService) {

	}

	// title = 'Tour of Heroes';
	ngOnInit() {
		this.getHeroes();
	}
	getHeroes() {
		// this.heroes = this.heroService.getHeroes();

		this.heroService.getHeroes().then(heroes => this.heroes = heroes);
	}

	onSelect(hero: Hero) { this.selectedHero = hero; }
	gotoDetail() {
		this.router.navigate(['/detail', this.selectedHero.id]);
	}

	addHero() {
		this.addingHero = true;
		this.selectedHero = null;
	}

	close(savedHero: Hero) {
		this.addingHero = false;
		if (savedHero) { this.getHeroes(); }
	}

	deleteHero(hero:Hero,event:any) {
		event.stopPropagation();
		this.heroService
		.delete(hero)
		.then(res => {
			this.heroes = this.heroes.filter(h => h !== hero);
			if (this.selectedHero === hero) {this.selectedHero = null;}
		})
		.catch(error => this.error = error);
	}

}

