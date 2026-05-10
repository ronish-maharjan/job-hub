class BaseError extends Error{
    constructor(message:string){
        const lowerCaseMessage = message.toLowerCase();
        const formattedMessage = lowerCaseMessage.charAt(0).toUpperCase() + lowerCaseMessage.slice(1);
        super(formattedMessage);
        this.name = new.target.name;
        Object.setPrototypeOf(this,new.target.prototype)
    }
};

export {BaseError};
