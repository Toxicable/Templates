import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
/**
 * Created by Fabian on 8/10/2016.
 */
@Injectable()
export class LoadingBarService{
    // Observable string sources

    private loadingStatus = new Subject<boolean>();
    // Observable string streams

    loadingStatus$ = this.loadingStatus.asObservable();

    isLoading(){
        this.updateStatus(true);
    }

    doneLoading(){
        this.updateStatus(false);
    }

    private updateStatus(newStatus: boolean){
        this.loadingStatus.next(newStatus);
    }
}