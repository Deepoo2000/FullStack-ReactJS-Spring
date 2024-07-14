class AdminMessageRequest {
    id: number;
    response: String;

    constructor(id: number, response: String){
        this.id = id;
        this.response = response;
    }
}

export default AdminMessageRequest;