# ng-tdd-demo

## Setup

1. show mocks.data.ts
1. show config.ts
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
        <section>
            <input type="text" placeholder="search by wwid" [(ngModel)]="wwid">
            <button (click)="lookup()" type="button">Lookup</button>
        </section>

        <section class="panel" *ngIf="user">
            <p>{{ user.FirstNm }} {{ user.LastNm}}</p>
            <dl>
                <dt>IDSID:</dt>
                <dd>{{ user.Idsid}}</dd>
                <dt>WWID:</dt>
                <dd>{{ user.WWID }}</dd>
            </dl>
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

        .panel {
            width: 50%;
            margin-bottom: 22px;
            background-color: #fff;
            border: 1px solid transparent;
            border-radius: 2px;
            -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
            box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
            border-color: #b1babf;
            padding: 15px;
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
    1. add `FormBuilder` to imports
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
1. worker-picker.component.ts
    1. add `wwid` string variable
        ```script
        wwid: string = null;
        ```

1. worker-picker.component.spec.ts
    1. lookup should call WorkerService with 'wwid' value
        ```script
        describe('lookup', () => {
            it('should call WorkerService', () => {
                component.lookup();
                fixture.detectChanges();

                expect(workerService.find).toHaveBeenCalled();
            });
        });
        ```
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
1. worker.service.ts
    1. create `find()` method
        ```script
        find() {}
        ```
1. worker-picker.component.ts
    1. create `lookup()` method
        ```script
        lookup(): void {

        }
        ```
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
            const wwid = worker.clean.WWID;
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
1. worker.service.ts
    1. add `wwid` as required argument to `find()`
        `find(wwid: string) {}`
1. worker-picker.component.spec.ts
    1. add `Initializations` block test for initializing `user` variable
        ```script
        it('should initialize user as null', () => {
            expect(component.user).toBeNull();
        });
        ```
    1. add `user` variable of type `User` initialized as `null`
    1. add `lookup` block test for returned service result being set to user variable
        ```script
        it('should transform the result returned from WorkerService.find and set to user', () => {
            const wwid = worker.clean.WWID;
            component.wwid = wwid;

            component.lookup();
            fixture.detectChanges();

            expect(component.user).toEqual(worker.clean);
        });
        ```
        1. this is when you will break out your expected results into multiple asserts
        ```script
        expect(component.user.FirstNm).toEqual(worker.clean.FirstNm);
        expect(component.user.FullNm).toEqual(worker.clean.FullNm);
        expect(component.user.Idsid).toEqual(worker.clean.Idsid);
        expect(component.user.LastNm).toEqual(worker.clean.LastNm);
        expect(component.user.WWID).toEqual(worker.clean.WWID);
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

WIP