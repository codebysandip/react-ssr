import React from "react";
import { PageData } from "src/core/models/page-data";

export default class Home extends React.Component<HomeProps> {
    public static async getInitialProps() {
        return Promise.resolve({ 
            seo: {
                title: "Home Page"
            },
            data: {count: 5}
        });
    }

    public render() {
        return (
            <h1>Home Page Count: {this.props.data.count}</h1>
        )
    }
}

export interface HomeProps extends PageData {
    data: { count: number };
}
