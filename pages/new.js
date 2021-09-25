import Link from 'next/link';
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Form, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';

const threatHunting = ['Establishing threat hunting goals', 'Current coverage of threat hunting goals', 'Hiring personnel dedicated to threat hunting', 'Formulating a threat hunting hypothesis', 'Acquiring specialized datasets and tools', 'Threat hunting training', 'SOC members who can develop needed cybersecurity scripts', 'Ability to scale threat hunting program', 'Utilizing full packet capture', 'Utilizing windows registry keys', 'Utilizing system memory'];

const vulnerabilityManagement = ['Well Defined and maintained assets and their risk tolerance', 'Well Defined and maintained Application and their risk tolerance', 'Effective collaboration between IT & security teams', 'Sharing, communicating vulnerability with other teams', 'Completion of scanning all software', 'Completion of scanning all hardware', 'Completion of scanning all web applications', 'Identifying and prioritizing risk relative to the environment', 'Action tasks on devices to eliminate security risks',  'Deploying os & third-party patches', 'Deploying windows 10 feature updates', 'Remediating vulnerability']

const NewRaForm = () => {
    const [form, setForm] = useState({
        title: '',
        description: '',
        th0: '0',
        th1: '0',
        th2: '0',
        th3: '0',
        th4: '0',
        th5: '0',
        th6: '0',
        th7: '0',
        th8: '0',
        th9: '0',
        th10: '0',
        vm0: '0',
        vm1: '0',
        vm2: '0',
        vm3: '0',
        vm4: '0',
        vm5: '0',
        vm6: '0',
        vm7: '0',
        vm8: '0',
        vm9: '0',
        vm10: '0',
        vm11: '0',
        });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    useEffect(() => {
        const createRaForm = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/raForms', {
                    method: 'POST',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(form)
                })
                router.push("/");
            } catch (error) {
                console.log(error);
            }
        }
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                createRaForm();
            }
            else {
                setIsSubmitting(false);
            }
        }
    }, [errors, isSubmitting, form, router])



    const handleSubmit = (e) => {
        e.preventDefault();
        let errs = validate();
        setErrors(errs);
        setIsSubmitting(true);
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const validate = () => {
        let err = {};

        if (!form.title) {
            err.title = 'Title is required';
        }

        return err;
    }

    // const colorId = (name) => {

    //     const val = Number(name);
    //     if (val >= 0 && val <= 33) {
    //         return 'red';
    //     }
    //     if (val >= 34 && val <= 66) {
    //         return 'yellow';
    //     }
    //     else return 'green';
    // }

    return (
        <div className="form-container">
            <h1>Risk Assessment Form</h1>
            <div>
                {
                    isSubmitting
                        ? <Loader active inline='centered' />
                        : <Form id='formCont' onSubmit={handleSubmit}>
                            <Form.Input
                                fluid
                                error={errors.title ? { content: 'Please enter a title', pointing: 'below' } : null}
                                label='Title'
                                placeholder='Title'
                                name='title'
                                onChange={handleChange}
                            />
                            <h2> Threat Hunting </h2>
                            {
                            threatHunting.map((question, index) => {
                                const handleOnInput = () => {
                                    let percent = document.getElementById(`th ${index}`).value;
                                    document.getElementById(`thPercent ${index}`).innerHTML = `${percent}%`
                                }
                                return (
                                  <div className='question' key={`th ${index}`}>
                                    <p>
                                    {question}: <output className='index' id={`thPercent ${index}`}>0%</output>
                                    </p>
                              <Form.Input
                                id={`th ${index}`}
                                type='range'
                                defaultValue='0'
                                min='0'
                                max='100'
                                label='Percent of Completion'
                                name={`th${index}`}
                                onInput={handleOnInput}
                                onChange={handleChange}
                                />

                            </div>
                                )
                            })}
                            <h2> Vulnerability Management </h2>
                            {
                            vulnerabilityManagement.map((question, index) => {
                                const handleOnInput = () => {
                                    let percent = document.getElementById(`vm ${index}`).value;
                                    document.getElementById(`vmPercent ${index}`).innerHTML = `${percent}%`
                                }
                                return (
                                  <div className='question' key={`vm ${index}`} >
                                    <p>
                                    {question}
                                    </p>
                              <Form.Input

                                id={`vm ${index}`}
                                type='range'
                                defaultValue='0'
                                min='0'
                                max='100'
                                label='Percent of Completion'
                                name={`vm${index}`}
                                onInput={handleOnInput}
                                onChange={handleChange}
                                />
                                <output className='index' id={`vmPercent ${index}`}>0%</output>
                            </div>
                                )
                            })}

                            <Button id='create' type='submit'>Create</Button>
                        </Form>
                }
            </div>
        </div>
    )
}

export default NewRaForm;