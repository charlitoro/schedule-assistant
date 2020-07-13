// @ts-ignore
import { withData } from "next-apollo";
import { HttpLink } from "apollo-boost";

const config = {
    link: new HttpLink({
        uri: process.env.API_URL,
        credentials: "same-origin",
        headers: {
            Authorization: `client_id ${process.env.CLIENT_ID}`
        }
    })
};

export default withData(config);
