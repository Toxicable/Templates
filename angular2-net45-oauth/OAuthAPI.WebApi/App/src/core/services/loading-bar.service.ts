import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";

@Injectable()
export class LoadingBarService{
    // Observable string sources

    private loadingStatus = new Subject<boolean>();
    // Observable string streams

    loadingStatus$ = this.loadingStatus.asObservable();

    load(){
        this.updateStatus(true);
    }

    done(){
        this.updateStatus(false);
    }

    doWithLoader<T>(task: Observable<T>): Observable<T>{
        return Observable
            .of(true)
            .do(() => this.load())
            .flatMap(() => task)
            .finally( () => this.done());
    }

    private updateStatus(newStatus: boolean){
        this.loadingStatus.next(newStatus);
    }
}