export class Message {
    content: string;
    username: string;
    messageId?: string;          // ? makes arguments optional constructor
    userId?: string;

    constructor(content: string, username: string, messageId?: string, userId?: string){
        this.userId = userId;
        this.username = username;
        this.messageId = messageId;
        this.content = content;
    }
}