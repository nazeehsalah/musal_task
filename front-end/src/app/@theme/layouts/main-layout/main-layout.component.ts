import { Component, OnDestroy, OnInit } from '@angular/core';
import { UtilsService } from '@core/services/utils.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  spinner: boolean = false
  $subs: Subscription[] = []
  constructor(private utils: UtilsService) { }
  ngOnInit() {
    this.utils.spinner.subscribe(res => {
      this.spinner = res
    })
  }
  ngOnDestroy(): void {
    this.$subs.forEach(sub => sub.unsubscribe())
  }
}
