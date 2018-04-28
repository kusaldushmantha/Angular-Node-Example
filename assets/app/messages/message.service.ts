import {Message} from "./message.model";
import {Http, Response, Response, Headers} from "@angular/http";
import {Injectable, EventEmitter} from "@angular/core";
import {Observable} from "rxjs";

@Injectable()
export class MessageService {

    constructor(private http: Http){}

    messages: Message[] = [];
    messageIsEdit = new EventEmitter<Message>();

    addMessage(message: Message){
        const body = JSON.stringify(message);
        const headers = new Headers({
            'Content-Type': 'application/json'
        });
        return this.http.post('http://localhost:3000/message', body, {headers: headers})    //Only sets up an observable
            .map((response: Response) => {
                const result = response.json();
                const message = new Message(result.obj.content, 'Dummy', result.obj._id, null);
                this.messages.push(message);
                return message;
            })
            .catch((err: Response) => Observable.throw(err.json()));
    }

    getMessage(){
        return this.http.get('http://localhost:3000/message')
            .map((response: Response) => {
                const messages = response.json().obj;
                let transformedMessages: Message[] = [];
                for(let message of messages){
                    transformedMessages.push(new Message(message.content,'Dummy', message._id,null));
                }
                this.messages = transformedMessages;
                return transformedMessages;
            })
            .catch((err: Response) => Observable.throw(err.json()));
    }

    deleteMessage(message: Message){
        this.messages.splice(this.messages.indexOf(message), 1);
    }

    editMessage(message: Message){
        this.messageIsEdit.emit(message);
    }

    updateMessage(message: Message){
        const body = JSON.stringify(message);
        const headers = new Headers({
            'Content-Type': 'application/json'
        });
        return this.http.patch('http://localhost:3000/message/' + message.messageId,
                                body, {headers: headers})    //Only sets up an observable
            .map((response: Response) => response.json())
            .catch((err: Response) => Observable.throw(err.json()));
    }

}