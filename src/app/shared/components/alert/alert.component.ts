import { Component, ElementRef, input, OnInit, output, signal, viewChild } from '@angular/core';
import { AlertTypes } from './alert.model';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent implements OnInit {
  element = viewChild.required<ElementRef>('toast')
  message = input.required<string>()
  color = input.required<AlertTypes>()
  duration = input.required<number>()
  closed = output()
  opacity = signal(1)

  ngOnInit(): void {
    setTimeout(() =>this.opacity.set(0) , this.duration())
    this.element().nativeElement.addEventListener('transitionend', () =>{})
  }
  get classes() {
    return ['alert', 'alert-soft', this.color()]
  }
}
