import { Component, OnInit } from '@angular/core';
import { WorkerService } from '../worker/worker.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-worker-picker',
  templateUrl: './worker-picker.component.html',
  styleUrls: ['./worker-picker.component.css']
})
export class WorkerPickerComponent implements OnInit {

  wwid: string = null;
  user: User = null;

  constructor(private workerService: WorkerService) { }

  ngOnInit() {
  }

  lookup(): void {
    this.workerService.find(this.wwid).subscribe(worker => this.user = worker);
  }
}
