import { Component, Input, OnInit, ViewChild } from '@angular/core';

// import { IAgilityModuleComponent } from "./agility-component.icomponent"
import { AgilityComponentDirective } from "./components.directive"
import { AgilityComponentService } from './components.service';


@Component({
	selector: 'agility-component',
	standalone: true,
	imports: [AgilityComponentDirective],
	providers: [AgilityComponentService],
	template: `
	<ng-template agilityComponent></ng-template>
  `,
})


export class AgilityComponent implements OnInit {
	@Input() moduleObj: any;
	@Input() page: any;
	@Input() dynamicPageItem: any;
	@ViewChild(AgilityComponentDirective, { static: true }) agilityComponentHost!: AgilityComponentDirective;

	public loaded: boolean

	constructor(
		private agilityComponentService: AgilityComponentService
	) {
		this.loaded = false
	}

	ngOnInit(): void {
		this.loadComponent()
	}

	loadComponent() {

		//get the module name
		let moduleName = this.moduleObj?.value.module;


		let moduleType = this.agilityComponentService.getComponent(moduleName) as any;
		if (!moduleType) {
			console.warn(`No module found for ${moduleName}`);
			return;
		}
		// Resolve the component for our module
		const viewContainerRef = this.agilityComponentHost.viewContainerRef;
		viewContainerRef.clear();

		// Instantiate the module in the container
		const componentRef = viewContainerRef.createComponent(moduleType);
		(componentRef.instance as any).moduleObj = this.moduleObj;
		(componentRef.instance as any).page = this.page;
		(componentRef.instance as any).dynamicPageItem = this.dynamicPageItem;

		// Ensure the item property is set
		if (componentRef.instance?.hasOwnProperty('item')) {
			(componentRef.instance as any).item = this.moduleObj?.value.item;
		}

		// Ensure the data property is set
		if (componentRef.instance?.hasOwnProperty('data')) {
			(componentRef.instance as any).data = {
				item: this.moduleObj?.value.item,
				image: this.moduleObj?.value.image,
				page: this.page,
				dynamicPageItem: this.dynamicPageItem
			};
		}

		this.loaded = true
	}

}
