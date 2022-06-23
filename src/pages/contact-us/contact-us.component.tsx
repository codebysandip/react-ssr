import React from "react"

export default class ContactUs extends React.Component<ContactUsProps> {
    public static async getInitialProps(): Promise<{ data: { count: number; }; }> {
        return Promise.resolve({
            seo: {
                title: "Contact Us"
            },
            data: {count: 10}
        });
    }

    render() {
        return (<h1>Contact Us Page. Count: {this.props.data.count}</h1>)
    }
}

export interface ContactUsProps {
    data: { count: number };
}