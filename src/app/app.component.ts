import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'anime-client';

  constructor(private swUpdate: SwUpdate,
    private snackBar: MatSnackBar) {}

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe(version => {
        if (version.type == 'VERSION_DETECTED') {
          this.snackBar.open('New Version!', 'Download')
          .onAction()
          .subscribe(() => {
            this.update();
          })
        }
      })
    }
  }

  async update() {
    await this.swUpdate.activateUpdate();
    document.location.reload();
  }
}
