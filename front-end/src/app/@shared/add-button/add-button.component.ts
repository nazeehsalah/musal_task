import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.scss']
})
export class AddButtonComponent implements OnInit {
  @Input() text: string = ""
  @Output() onclick: EventEmitter<PointerEvent> = new EventEmitter()
  constructor() { }
  ngOnInit() {
  }
  addClicked(event: any) {
    this.onclick.emit()
  }
}
