
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/operator/map'
import { Http , Response} from '@angular/http';  
import { Observable } from 'rxjs/Observable';
import { GameHistory } from "../models/history.model";
@Injectable()
export class historiesService{

    constructor(private httpClient: HttpClient){}

    public getHistoryAsync(): Observable<GameHistory[]> {
        return this.httpClient.get("https://memoryga.herokuapp.com/game")
            .map((messages: Object) => <GameHistory[]>messages);
    }
    public addGameAsync(history): Observable<GameHistory[]>{

        return this.httpClient.post("https://memoryga.herokuapp.com/game",history).map((history:GameHistory[])=>history);

    }

  
}