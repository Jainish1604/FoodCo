import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
})
export class DialogComponent implements OnInit {
  closeModal() {
    
    this.activeModal.close('Modal Closed');

  }

  constructor(private activeModal: NgbActiveModal) {}
  ngOnInit(): void {}
}
