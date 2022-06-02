import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss']
})
export class ActionButtonComponent implements OnInit {
  @Input() matIcon: string = ""
  @Output() onclick: EventEmitter<PointerEvent> = new EventEmitter()
  constructor() { }

  ngOnInit() {
  }
  clicked() {
    this.onclick.emit()
  }
}
