import {JSONRPCClient} from "json-rpc-2.0";

class apiClass {
    constructor() {
        this.client = new JSONRPCClient((jsonRPCRequest) =>
            fetch("https://extralogic.herokuapp.com/api", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(jsonRPCRequest),
            }).then((response) => {
                if (response.status === 200) {
                    return response
                        .json()
                        .then((jsonRPCResponse) => this.client.receive(jsonRPCResponse));
                } else if (jsonRPCRequest.id !== undefined) {
                    return Promise.reject(new Error(response.statusText));
                }
            })

        )
    }

    async request(method = '', data = {}) {
        return await this.client.request(method, data)
    }


}

export default new apiClass();