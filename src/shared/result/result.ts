type Ok<T> = {success:true,data:T};
type Fail<E> = {success:false,error:E};
type Result <T,E>= Ok<T>|Fail<E>;


function ok<T>(data:T):Ok<T>{
    return{success:true,data:data}
};

function fail<E>(error:E):Fail<E>{
    return{success:false,error:error}
};


export {type Result, ok, fail};



