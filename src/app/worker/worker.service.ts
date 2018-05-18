import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user.model';
import { config } from '../../config';
import 'rxjs/add/operator/map';

@Injectable()
export class WorkerService {

  constructor(private http: HttpClient) { }

  find(wwid: string): Observable<User> {
    const url = `${config.workerUrl}${wwid}`;
    return this.http
      .get<any>(url, { withCredentials: true })
      .map(response => {
          const worker = response.hits[0]._source;

          return {
              FirstNm: worker.FirstNm,
              LastNm: worker.LastNm,
              CorporateEmailTxt: worker.CorporateEmailTxt,
              JobTypeNm: worker.JobTypeNm,
              WorkPhoneNbr: worker.WorkPhoneNbr,
              WWID: worker.WWID,
          };
      });
  }
}
