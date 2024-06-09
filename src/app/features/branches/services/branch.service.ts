import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/responseModel';
import { Branch } from '../models/branch';
import { HttpClient,HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private httpClient:HttpClient) { }
   apiUrl="http://localhost:60805/api/Branches"

  getBranches(pageIndex:number,pageSize:number):Observable<ResponseModel<Branch>>
  {    let params = new HttpParams()
    .set('PageIndex', pageIndex.toString())
    .set('PageSize', pageSize.toString());


    return this.httpClient.get<ResponseModel<Branch>>(this.apiUrl,{params});
  }
}
