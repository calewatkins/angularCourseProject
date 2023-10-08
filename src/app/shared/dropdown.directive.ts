import { Directive, ElementRef, HostListener, Renderer2, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }
  constructor(private elRef: ElementRef) {}

  //constructor(private el: ElementRef, private renderer: Renderer2) { }

  // @HostListener('click') onClick() {
  //   const nativeElement = this.el.nativeElement;

  //   if(!Array.from(nativeElement.classList).includes('open')) {
  //     this.renderer.addClass(nativeElement, 'open');
  //   } else {
  //     this.renderer.removeClass(nativeElement, 'open');
  //   }

  //}
}
