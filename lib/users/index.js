/**
 * Created by user_12 on 18/03/15.
 */


function Users() {
    this.arr = [];
}

Users.prototype.addUser = function(user) {
    if(this.arr.length>0){
        this.arr.push(user);
    }else{
        console.log("addUser ==> ");
    }

};

Users.prototype.readUser = function(){
    if(this.arr.length>0){
        console.log("array is empty");
        return "array is empty";
    }else{
        return this.arr;
    }
};

module.exports = Users;