import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WorkerService } from './worker.service';
import { Worker } from '../../mocks.data';
import { config } from '../../config';
import { User } from '../../models/user.model';

describe('WorkerService', () => {
  let workerService: WorkerService;
  let backend: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkerService],
      imports: [
        HttpClientTestingModule,
      ],
    });
  });

  // tslint:disable-next-line:no-shadowed-variable
  beforeEach(inject([WorkerService, HttpTestingController], (WorkerService, HttpTestingController) => {
    workerService = WorkerService;
    backend = HttpTestingController;
  }));

  afterEach(() => {
    backend.verify();
  });

  it('should be created', () => {
    expect(workerService).toBeTruthy();
  });

  describe('find', () => {
    it('should call the Workers API with the WWID that was passed in', () => {
      const WWID = Worker.clean.WWID;

      workerService.find(WWID).subscribe();

      backend.expectOne({url: `${config.workerUrl}${WWID}`, method: 'GET'});
    });

    it('should return a worker as type of User', () => {
      const WWID = Worker.clean.WWID;

      workerService.find(WWID).subscribe(worker => {
          expect(worker).toEqual(<User>Worker.clean);
      });

      backend.expectOne({url: `${config.workerUrl}${WWID}`, method: 'GET'}).flush(Worker.raw);
    });
  });
});
