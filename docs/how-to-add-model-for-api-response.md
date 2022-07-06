# React SSR - Add Model/Interface for API Response
For every API response we must create a model. In Typescript, We create a interface for model.We divided this doc into two parts:
  1. [Benefits of using typescript](#benefits-of-using-typescript)
  2. [How to add model/interface](#how-to-add-model)
  
## Benefits of using typescript
Let's talk about what are benefits to create a model:
  1. Compile time error checking by typescript compiler.
    If you will create interface with required and optional then typescript compiler will check errors when you will use in component.
    Let's take example:
```
export interface Address {
  street: string;
  pincode: string;
}

export interface Employee {
  name: string;
  salary: number;
  address?: Address
}
```
    
We declared a employee interface and address can be undefined for few employess.
Let's see employee detail in Action:
    
    
```
export const EmployeeDetail = (props: EmployeeDetailProps) => {
  const { employee } = props;
  return (
    <div>
      <p>{employee.name}</p>
      <p>{employee.salary}</p>
      <p>{employee.address.pincode}</p>
      <p>{employee.address.street}</p>
      <p></p>
    </div>
  )
}

export interface EmployeeDetailProps {
  employee: Employee;
}
```

In Javascript environment above component will work fine.
But in typescript environment above component will throw error
    
  2. Better intellisense for props in component. So you don't need to check again and again for key.
  3. Better code documentation. Any new developer can easily know what's coming in employee.
  4. Can add jsdoc for interface for code documentation. Check documentation for [typescript jsdoc](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.htm)

## How to add model
In [How to add page/route](how-to-add-page-route.md) we added a page/route for about page. Let's take same example and add a model for api response.
Add a model interface file with name `about.model.ts` in folder `src/pages/about`.
Let's support api returning following json response for about page api:
```
{
  "seo": {
    "title": "About Us - Dew Solutions Pvt. Ltd."
  },
  "team": [
    {
      "name": "Dhiraj Chauhan",
      "position": "CEO, Founder",
      "description": "Dhiraj has vast industry experience of more than 18 years in BFSI, E-commerce and Retail domains. He is very passionate about Technology and believes in solving complex problems using technology. He is a B.Tech in Computer Science from IIT Delhi.",
      "image": "https://www.dewsolutions.in/wp-content/uploads/2020/09/dhiraj-chauhan.png"
    },
    {
      "name": "Gaurav Jain",
      "position": "COO, Co-Founder",
      "description": "Gaurav is a B.Tech from IIT Kanpur and has more than 18 years of rich experience in BFSI, Retail & Internet of things. He has a great inclination towards connecting with people and believes technology can break barriers and can bring about radical changes in the society.",
      "image": "https://www.dewsolutions.in/wp-content/uploads/2020/09/Gaurav-Jain-copy.png"
    }
  ],
  "clients": [
    {
      "name": "Tata Cliq",
      "image": "https://www.dewsolutions.in/wp-content/uploads/2020/09/TataCliq-1.png"
    },
    {
      "name": "Decathlon",
      "image": "https://www.dewsolutions.in/wp-content/uploads/2021/09/Decathlon_1row_4.png"
    }
  ]
}
```
For above json interface will be: 
```
export interface Seo {
    title: string;
}

export interface Team {
    name: string;
    position: string;
    description: string;
    image: string;
}

export interface Client {
    name: string;
    image: string;
}

export interface AboutPage {
    seo: Seo;
    team: Team[];
    clients: Client[];
}

```
You can create interface for any json from [this link](http://json2ts.com/).<br />
[HttpClient](https://github.com/sandip12081992/react-ssr/blob/main/src/core/services/http-client.ts) will convert api response into [ApiResponse](https://github.com/sandip12081992/react-ssr/blob/main/src/core/models/api-response.ts).
So your data will come in ApiResponse.data. It means your component prop should look like this:<br />
```
// we extending here AboutPage or null because in case when api will fail then HttpClient will return null in ApiResponse.data
export interface AboutProps extends ApiResponse<AboutPage|null> {
  // rest of props will go here
}

// Now your component will get actual data in props.data
```

