import {Message} from "./message.model";
import {Http, Response, Response, Headers} from "@angular/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable()
export class MessageService {

    constructor(private http: Http){}

    messages: Message[] = [];

    addMessage(message: Message){
        this.messages.push(message);
        const body = JSON.stringify(message);
        const headers = new Headers({
            'Content-Type': 'application/json'
        });
        return this.http.post('http://localhost:3000/message', body, {headers: headers})    //Only sets up an observable
            .map((response: Response) => response.json())
            .catch((err: Response) => Observable.throw(err.json()));
    }

    getMessage(){
        return this.messages;
    }

    deleteMessage(message: Message){
        this.messages.splice(this.messages.indexOf(message), 1);
    }
}