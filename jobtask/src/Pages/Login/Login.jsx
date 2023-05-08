import React from 'react';
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel} from "@material-tailwind/react"; 
import LoginForm from './LoginForm';
import Register from './../Register/Register';


const Login = () => {

    const data = [
        {
          label: "LOGIN",
          value: "login",
          desc: <LoginForm />,
        },
        {
          label: "REGISTER",
          value: "register",
          desc: <Register />
        }
    ];

    return (
        <div className="h-[120vh] w-screen flex items-center justify-center" >

            <div className="hero mt-10">
                <div className="card flex-shrink-0 w-full max-w-[600px] shadow-2xl bg-base-100">
                    <div className="card-body">
                    <div className="w-11/12 mx-auto">
                    {/* tabs */}
                    <Tabs id="custom-animation" className='mt-10' value="login">
                        <TabsHeader className='bg-transparent' indicatorProps={{ className: "bg-blue-500/10 shadow-none text-blue-500", }}>
                            {data.map(({ label, value }) => (
                            <Tab key={value} value={value} className="text-accent">
                                {label}
                            </Tab>
                            ))}
                        </TabsHeader>
                        <TabsBody
                            animate={{
                            initial: { y: 250 },
                            mount: { y: 0 },
                            unmount: { y: 250 },
                            }}
                        >
                            {data.map(({ value, desc }) => (
                            <TabPanel key={value} value={value}>
                                {desc}
                            </TabPanel>
                            ))}
                        </TabsBody>
                    </Tabs>

                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;