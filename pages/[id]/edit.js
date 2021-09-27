import Link from 'next/link';
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Form, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import cors from 'cors';
cors()

const threatHunting = ['Establishing threat hunting goals', 'Current coverage of threat hunting goals', 'Hiring personnel dedicated to threat hunting', 'Formulating a threat hunting hypothesis', 'Acquiring specialized datasets and tools', 'Threat hunting training', 'SOC members who can develop needed cybersecurity scripts', 'Ability to scale threat hunting program', 'Utilizing full packet capture', 'Utilizing windows registry keys', 'Utilizing system memory'];

const vulnerabilityManagement = ['Well Defined and maintained assets and their risk tolerance', 'Well Defined and maintained Application and their risk tolerance', 'Effective collaboration between IT & security teams', 'Sharing, communicating vulnerability with other teams', 'Completion of scanning all software', 'Completion of scanning all hardware', 'Completion of scanning all web applications', 'Identifying and prioritizing risk relative to the environment', 'Action tasks on devices to eliminate security risks',  'Deploying os & third-party patches', 'Deploying windows 10 feature updates', 'Remediating vulnerability']

const EditRaForm = ({ raForm }) => {
    const [form, setForm] = useState({
        title: raForm.title,
        th0: raForm.th0,
        th1: raForm.th1,
        th2: raForm.th2,
        th3: raForm.th3,
        th4: raForm.th4,
        th5: raForm.th5,
        th6: raForm.th6,
        th7: raForm.th7,
        th8: raForm.th8,
        th9: raForm.th9,
        th10: raForm.th10,
        vm0: raForm.vm0,
        vm1: raForm.vm1,
        vm2: raForm.vm2,
        vm3: raForm.vm3,
        vm4: raForm.vm4,
        vm5: raForm.vm5,
        vm6: raForm.vm6,
        vm7: raForm.vm7,
        vm8: raForm.vm8,
        vm9: raForm.vm9,
        vm10: raForm.vm10,
        vm11: raForm.vm11,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    useEffect(() => {
        const updateRaForm = async () => {
            try {
                const res = await fetch(`https://master.dqm5wpyyz0969.amplifyapp.com/api/raForms/${router.query.id}`, {
                    method: 'PUT',
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
                updateRaForm();
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

    return (
        <div className="form-container">
            <h1>Update Form</h1>
            <div>
                {
                    isSubmitting
                        ? <Loader active inline='centered' />
                        : <Form onSubmit={handleSubmit}>
                            <Form.Input
                                fluid
                                error={errors.title ? { content: 'Please enter a title', pointing: 'below' } : null}
                                label='Title'
                                placeholder={raForm.title}
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
                                let defaultValKey = `th${index}`
                                const defaultValue = raForm[defaultValKey];
                                return (
                                  <div className='question' key={`th ${index}`}>
                                    <p>
                                    {question}: <output className='index' id={`thPercent ${index}`}>{`${defaultValue}%`}</output>
                                    </p>
                              <Form.Input
                                id={`th ${index}`}
                                type='range'
                                defaultValue={defaultValue}
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
                                let defaultValKey = `vm${index}`
                                const defaultValue = raForm[defaultValKey];
                                return (
                                  <div className='question' key={`vm ${index}`} >
                                    <p>
                                    {question}
                                    </p>
                              <Form.Input
                                id={`vm ${index}`}
                                type='range'
                                defaultValue={defaultValue}
                                min='0'
                                max='100'
                                label='Percent of Completion'
                                name={`vm${index}`}
                                onInput={handleOnInput}
                                onChange={handleChange}
                                />
                                <output className='index' id={`vmPercent ${index}`}>{`${defaultValue}%`}</output>
                            </div>
                                )
                            })}
                            <Button id='update' type='submit'>Update</Button>
                        </Form>
                }
            </div>
        </div>
    )
}

EditRaForm.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`https://master.dqm5wpyyz0969.amplifyapp.com/api/raForms/${id}`);
    const { data } = await res.json();

    return { raForm: data }
}

export default EditRaForm;