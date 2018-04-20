export class User {
    constructor(public email: string,
                public password: string,
                public firstName?: string,                // ? makes Optional arguments for constructor
                public lastName?: string){
    }
}