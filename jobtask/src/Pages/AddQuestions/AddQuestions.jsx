import React, { useState } from 'react';  
import { useForm } from "react-hook-form";
import Papa from 'papaparse'; 
import { toast } from 'react-hot-toast';


const AddQuestions = () => {
    const [allQuestion, setAllQuestion] = useState([]);
    const [loading, setLoading] = useState(false)
    const [fileInput, setFileInput] = useState(null);
    const [insertBtn, setInsertBtn] = useState(false)
    const { register, formState: { errors }, handleSubmit } = useForm();


    const onSubmit = data =>{

            


        Papa.parse(data.file[0],{
            header: true,
            skipEmptyLines: true,
            complete: function(result){
                const QuestionsArray = []
                result.data.map(d=>{


                    const obj ={}
                    // const options = {}

                    //remove spaces in the object key
                    for(let key in d){obj[key.replace(/\s/g, '')] = d[key];}

                    //convert string to object
                    const option = JSON.parse(obj?.options)
                  
                    const question = {
                        difficultyLevel: obj?.Difficultylevel? obj?.Difficultylevel : '',
                        optionObject:{
                            answer: option?.answers? option?.answers : '',
                            choices:[
                                    {a:option?.choices.a? option?.choices.a: ''},
                                    {b:option?.choices.b? option?.choices.b : ''},
                                    {c:option?.choices.c? option?.choices.c : ''},
                                    {d:option?.choices.d? option?.choices.d : ''}
                                ]
                        },
                        questionName: obj?.question? obj?.question : '',
                        subTopic: obj?.subTopic? obj?.subTopic : '',
                        topicName: obj?.topic? obj?.topic : ''
                    }

                    QuestionsArray.push(question);

                    setAllQuestion(QuestionsArray);
                    setInsertBtn(true);

                    
                })
            }
        })
        
        console.log(allQuestion)
    }

    const handelInput= e =>{
        setFileInput(e.target.files[0].name)
    }


    const handelToSaveInDatabase = e =>{
        setLoading(true)
        fetch(`https://jobtask-server-bice.vercel.app/questions`,{
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(allQuestion)
        })
            .then(res => res.json())
            .then(data => {
                toast.success('YOur inserted data successfully added');
                setLoading(false)
                setInsertBtn(false)
            })
            .catch(error => {
                toast.error(error.message)
                setLoading(false)
            })
    }
    

    return (
        <div className='h-screen w-screen flex justify-center'>
            
                <form className="max-w-xl" onSubmit={handleSubmit(onSubmit)}>
                    <label
                        className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                        <span className="flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            {
                                fileInput? 
                                 <span className="font-medium text-gray-600">
                                    {fileInput}
                                 </span>
                                :<span className="font-medium text-gray-600">
                                    Drop files to Attach, or
                                    <span className="text-blue-600 underline">browse</span>
                                </span>
                            
                            }
                        </span>
                        <input type="file" name="file" className="hidden" aria-required accept='.csv' {...register("file", {
                                required: "this field is required"

                            })}  onInput={handelInput} />
                    </label>
                    <button type='submit' className='mx-auto mt-5 py-2 px-3 border rounded text-xl border-accent bg-accent text-white hover:bg-white hover:text-accent'>
                        Add
                    </button>
                    {insertBtn && <button  type='submit' onClick={handelToSaveInDatabase} disabled={loading? true : false} className='mx-auto mt-5 py-2 px-3 border rounded text-xl border-accent hover:bg-accent hover:text-white bg-white text-accent'>
                        {
                            loading? 'Loading...' : 'insert in database'
                        }
                    </button>}
                </form>
        </div>
    );
};

export default AddQuestions;