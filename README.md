# ng-tdd-demo

## Setup

1. show `mocks.data.ts`
1. show `config.ts`
1. show `models/user.model.ts`
1. generate worker component
    1. ng generate component worker-picker
1. generate worker service
    1. ng generate service worker --flat=false
1. run `ng serve`
1. run `ng test -sm=false`

## Build Component & Tests

1. app.component.html
    1. add `<app-worker-picker></app-worker-picker>`
1. worker-picker.component.html
    1. copy/paste html
        ```html
        <section class="lookup">
          <input type="text" placeholder="search by wwid" [(ngModel)]="wwid">
          <button (click)="lookup()" type="button">Lookup</button>
        </section>

        <section class="contact-card panel" *ngIf="user">
          <div class="image">
            <img src="https://photos.intel.com/images/{{ user.WWID }}.jpg">
          </div>
          <div class="contacts">
            <p>{{ user.FirstNm }} {{ user.LastNm}}</p>
            <p>{{ user. JobTypeNm }}</p>
            <p>{{ user.DepartmentNm }}</p>
            <p>Email: <a href="mailto:{{ user.CorporateEmailTxt}}">{{ user.CorporateEmailTxt}}</a>
            </p>
            <p>Phone: {{ user.WorkPhoneNbr }}</p>
            <p>Office: {{ user.OfficeLocation }}</p>
          </div>
        </section>
        ```
1. worker-picker.component.css
    1. copy/paste css
        ```css
        section {
          width: 1170px;
          margin-right: auto;
          margin-left: auto;
          margin-bottom: 1em;
          padding-left: 15px;
          padding-right: 15px;
        }

        .lookup {
          text-align: center;
        }

        input {
          width: 50%;
          height: 36px;
          padding: 6px 12px;
          font-size: 15px;
          line-height: 1.5;
          color: #333;
          background-color: #fff;
          background-image: none;
          border: 1px solid #b1babf;
          border-radius: 2px;
          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
        }

        button {
          color: #fff;
          background: #0071c5;
          border-color: #0071c5;
          display: inline-block;
          margin-bottom: 0;
          font-weight: normal;
          text-align: center;
          vertical-align: middle;
          touch-action: manipulation;
          cursor: pointer;
          background-image: none;
          border: 1px solid transparent;
          white-space: nowrap;
          padding: 6px 12px;
          font-size: 15px;
          line-height: 1.5;
          border-radius: 2px;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        .contact-card.panel {
          width: 30%;
          margin-bottom: 22px;
          background-color: #fff;
          border: 1px solid transparent;
          border-radius: 2px;
          -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
          box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
          border-color: #b1babf;
          padding: 15px;
        }

        .contact-card dt,dd {
          display: inline-block;
        }

        .contact-card .image {
          display: inline-block;
        }

        .contact-card .contacts {
          display: inline-block;
          position: relative;
          top: -22px;
        }

        .contacts p {
          margin: 0 0 5px 15px;
          font-family: Arial;
        }
        ```
1. app.module.ts
    1. add `FormsModule`

    ```script
        import { FormsModule } from '@angular/forms';
        imports: [
            BrowserModule,
            FormsModule,
        ],
    ```
1. worker-picker.component.spec.ts
    1. add `fdescribe` to line 5
    1. add `FormsModule` to imports
        ```script
        imports: [
            FormsModule,
        ],
        ```
    1. should initialize `wwid` as null
        ```script
        it('should initialize wwid as null', () => {
            expect(component.wwid).toBeNull();
        });
        ```
1. worker-picker.component.ts
    1. add `wwid` string variable
        ```script
        wwid: string = null;
        ```

1. worker-picker.component.spec.ts
    1. group initial asserts into `describe` block
        ```script
        describe('Initializations', () => {
            it('should create', () => {
                expect(component).toBeTruthy();
            });

            it('should initialize wwid as null', () => {
                expect(component.wwid).toBeNull();
            });
        });
        ```
    1. lookup should call WorkerService with 'wwid' value
        ```script
        describe('lookup', () => {
            it('should call WorkerService', () => {
                component.lookup();
                fixture.detectChanges();

                expect(WorkerService.find).toHaveBeenCalled();
            });
        });
        ```
1. worker-picker.component.ts
    1. create `lookup()` method
        ```script
        lookup(): void {

        }
        ```
1. worker-picker.component.spec.ts
    1. add providers stub for WorkerService
        ```script
            providers: [
                {
                    provide: WorkerService,
                    useClass: class {

                    }
                }
            ]
        ```
    1. add local variable
        ```script
        let workerService: WorkerService;
        ```
    1. add inject to local variable assignment
        ```script
        beforeEach(inject([WorkerService], (WorkerService) => {
            workerService = WorkerService;
        }));
        ```
    1. rename WorkerService in test assert
        ```script
        expect(workerService.find).toHaveBeenCalled();
        ```
    1. add `find` method to WorkerService mock
        ```script
        useClass: class {
            find = jasmine.createSpy('find');
        }
        ```
1. worker-picker.component.ts
    1. add private service variable to constructor
        ```script
        constructor(private workerService: WorkerService) { }
        ```
    1. add `workerService.find` call in `lookup()` method
        ```script
        lookup(): void {
            this.workerService.find();
        }
        ```
1. worker-picker.component.spec.ts
    1. modify workerService test to check for `wwid` being passed in
        ```script
        it('should call WorkerService and pass in the value of wwid', () => {
            const wwid = Worker.clean.WWID;
            component.wwid = wwid;

            component.lookup();
            fixture.detectChanges();

            expect(workerService.find).toHaveBeenCalledWith(wwid);
        });
        ```
1. worker-picker.component.ts
    1. modify `lookup()` to pass `wwid` in to service call
        ```script
        lookup() {
            this.workerService.find(this.wwid);
        }
        ```
1. worker-picker.component.spec.ts
    1. add `Initializations` block test for initializing `user` variable
        ```script
        it('should initialize user as null', () => {
            expect(component.user).toBeNull();
        });
        ```
    1. add `user` variable of type `User` initialized as `null`
        ```script
        user: User = null;
        ```
    1. add `lookup` block test for returned service result being set to user variable
        ```script
        it('should transform the result returned from WorkerService.find and set to user', () => {
            const wwid = Worker.clean.WWID;
            component.wwid = wwid;

            component.lookup();
            fixture.detectChanges();

            expect(component.user).toEqual(Worker.clean);
        });
        ```
        1. this is when you will break out your expected results into multiple asserts
        ```script
        expect(component.user.CorporateEmailTxt).toEqual(Worker.clean.CorporateEmailTxt);
        expect(component.user.DepartmentNm).toEqual(Worker.clean.DepartmentNm);
        expect(component.user.FirstNm).toEqual(Worker.clean.FirstNm);
        expect(component.user.JobTypeNm).toEqual(Worker.clean.JobTypeNm);
        expect(component.user.LastNm).toEqual(Worker.clean.LastNm);
        expect(component.user.OfficeLocation).toEqual(Worker.clean.OfficeLocation);
        expect(component.user.WorkPhoneNbr).toEqual(Worker.clean.WorkPhoneNbr);
        expect(component.user.WWID).toEqual(Worker.clean.WWID);
        ```
    1. add `returnValue` to `WorkerService.find` spy
        ```script
        find = jasmine.createSpy('find').and.returnValue(Observable.of(Worker.raw[0]));
        ````
    1. import Observable.of
        ```script
        import 'rxjs/add/observable/of';
        ````
    1. modify workerService.find call
        ```script
        this.workerService.find(this.wwid).subscribe(worker => this.user = worker);
        ```
    1. **optional** group arrange and act into single setup
        ```script
        let wwid;
        beforeEach(() => {
            wwid = Worker.clean.WWID;
            component.wwid = wwid;

            component.lookup();
            fixture.detectChanges();
        });
        ```

## Service

1. worker.service.spec.ts
    1. add `fdescribe` to line 5
    1. add local variables
        ```script
        let workerService: WorkerService;
        let backend: HttpTestingController;
        ```
    1. import Http dependencies
        ```script
        import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

        imports: [
            HttpClientTestingModule
        ],
        ```
    1. add inject to local variable assignment
        ```script
        beforeEach(inject([WorkerService, HttpTestingController], (WorkerService, HttpTestingController) => {
            workerService = WorkerService;
            backend = HttpTestingController;
        }));
        ```
    1. add `afterEach` for the backend
        ```script
        afterEach(() => {
            backend.verify();
        });
        ```
    1. remove `inject` function from default test
        ```script
        it('should be created', () => {
            expect(workerService).toBeTruthy();
        }));
        ```
1. worker.service.spec.ts
    1. add http call test
        ```script
        it('should call the Workers API with the WWID that was passed in', () => {
            const WWID = Worker.clean.WWID;

            workerService.find(WWID).subscribe();

            backend.expectOne({url: `${config.workerUrl}/${WWID}`, method: 'GET'}).flush(Worker.raw);
        });
        ```
1. worker.service.ts
    1. modify `constructor`
        ```script
        constructor(private http: HttpClient) { }
        ```
    1. modify `find` method
        ```script
        find(wwid: string): Observable<User> {
            const url = `${config.workerUrl}/${wwid}`;
            return this.http.get<any>(url, { withCredentials: true });
        }
        ```
1. worker.service.spec.ts
    1. add test for `Worker.clean` being returned
        ```script
        it('should return a worker as type of User', () => {
            const WWID = Worker.clean.WWID;

            workerService.find(WWID).subscribe(worker => {
                expect(worker).toEqual(<User>Worker.clean);
            });

            backend.expectOne({url: `${config.workerUrl}/${WWID}`, method: 'GET'}).flush(Worker.raw);
        });
        ```
1. worker.service.ts
    1. modify `find` return
        ```script
        find(wwid: string): Observable<User> {
            const url = `${config.workerUrl}/${wwid}`;
            return this.http
                .get<any>(url, { withCredentials: true })
                .map(worker => {
                    return {
                    FirstNm: worker[0].FirstNm,
                    LastNm: worker[0].LastNm,
                    CorporateEmailTxt: worker[0].CorporateEmailTxt,
                    JobTypeNm: worker[0].JobTypeNm,
                    WorkPhoneNbr: worker[0].WorkPhoneNbr,
                    OfficeLocation: worker[0].OfficeLocation,
                    DepartmentNm: worker[0].DepartmentNm,
                    WWID: worker[0].WWID,
                    };
                });
        }
        ```
    1. import `rxjs/map`
        ```script
        import 'rxjs/add/operator/map';
        ```