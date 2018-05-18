import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { WorkerPickerComponent } from './worker-picker.component';
import { WorkerService } from '../worker/worker.service';
import { Worker } from '../../mocks.data';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

describe('WorkerPickerComponent', () => {
  let component: WorkerPickerComponent;
  let fixture: ComponentFixture<WorkerPickerComponent>;
  let workerService: WorkerService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkerPickerComponent ],
      imports: [
        FormsModule,
      ],
      providers: [
        {
          provide: WorkerService,
          useClass: class {
            find = jasmine.createSpy('find').and.returnValue(Observable.of(Worker.clean));
          }
        }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // tslint:disable-next-line:no-shadowed-variable
  beforeEach(inject([WorkerService], (WorkerService) => {
    workerService = WorkerService;
  }));

  describe('Initializations', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize wwid as null', () => {
      expect(component.wwid).toBeNull();
    });

    it('should initialize user as null', () => {
      expect(component.user).toBeNull();
    });
  });

  describe('lookup', () => {
    let wwid;

    beforeEach(() => {
      wwid = Worker.clean.WWID;
      component.wwid = wwid;

      component.lookup();
      fixture.detectChanges();
    });

    it('should call WorkerService and pass in the value of wwid', () => {
      expect(workerService.find).toHaveBeenCalledWith(wwid);
    });

    it('should set the result returned from WorkerService.find to user', () => {
      expect(component.user.CorporateEmailTxt).toEqual(Worker.clean.CorporateEmailTxt);
      expect(component.user.FirstNm).toEqual(Worker.clean.FirstNm);
      expect(component.user.JobTypeNm).toEqual(Worker.clean.JobTypeNm);
      expect(component.user.LastNm).toEqual(Worker.clean.LastNm);
      expect(component.user.WorkPhoneNbr).toEqual(Worker.clean.WorkPhoneNbr);
      expect(component.user.WWID).toEqual(Worker.clean.WWID);
    });
  });
});
