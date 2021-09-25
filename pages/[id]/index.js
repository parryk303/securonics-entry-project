import fetch from 'isomorphic-unfetch';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Confirm, Button, Loader, Card } from 'semantic-ui-react';

const threatHunting = ['Establishing threat hunting goals', 'Current coverage of threat hunting goals', 'Hiring personnel dedicated to threat hunting', 'Formulating a threat hunting hypothesis', 'Acquiring specialized datasets and tools', 'Threat hunting training', 'SOC members who can develop needed cybersecurity scripts', 'Ability to scale threat hunting program', 'Utilizing full packet capture', 'Utilizing windows registry keys', 'Utilizing system memory'];

const vulnerabilityManagement = ['Well Defined and maintained assets and their risk tolerance', 'Well Defined and maintained Application and their risk tolerance', 'Effective collaboration between IT & security teams', 'Sharing, communicating vulnerability with other teams', 'Completion of scanning all software', 'Completion of scanning all hardware', 'Completion of scanning all web applications', 'Identifying and prioritizing risk relative to the environment', 'Action tasks on devices to eliminate security risks', 'Deploying os & third-party patches', 'Deploying windows 10 feature updates', 'Remediating vulnerability']

const RaForm = ({ raForm }) => {
    const [confirm, setConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const deleteRaForm = async () => {
            const raFormId = router.query.id;
            try {
                const deleted = await fetch(`http://localhost:3000/api/raForms/${raFormId}`, {
                    method: "Delete"
                });

                router.push("/");
            } catch (error) {
                console.log(error)
            }
        }
        if (isDeleting) {
            deleteRaForm();
        }
    }, [isDeleting, router])

    const open = () => setConfirm(true);

    const close = () => setConfirm(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        close();
    }

    const colorId = (question) => {
        const val = Number(question);
        if (val >= 0 && val <= 33) {
            return 'red';
        }
        if (val >= 34 && val <= 66) {
            return 'yellow';
        }
        else return 'green';
    }

    return (
        <div className="raForm-container">
            {isDeleting
                ? <Loader active />
                :
                <>
                    <h1>{raForm.title}</h1>
                    <h3>Threat Hunting</h3>
                    <div className='ui centered grid' id='formView'>
                        <div className='row'>
                            <div className='fourteen wide column' id={colorId(raForm.th0)}> {`${threatHunting[0]}: ${raForm.th0}%`}</div>
                            <div className='two wide two wide column' id='define'> Define </div>
                        </div>
                        <div className='row'>
                            <div className='fourteen wide column' id={colorId(raForm.th1)}>{`${threatHunting[1]}: ${raForm.th1}%`}</div>
                            <div className='two wide column' id='manage'> Manage </div>
                        </div>
                        <div className='row'>
                            <div className='fourteen wide column' id={colorId(raForm.th2)}>{`${threatHunting[2]}: ${raForm.th2}%`}</div>
                            <div className='two wide column' id='manage'> Manage </div>
                        </div>
                        <div className='row'>
                            <div className='fourteen wide column' id={colorId(raForm.th3)}>{`${threatHunting[3]}: ${raForm.th3}%`}</div>
                            <div className='two wide column' id='manage'> Manage </div>
                        </div>
                        <div className='row'>
                            <div className='fourteen wide column' id={colorId(raForm.th4)}>{`${threatHunting[4]}: ${raForm.th4}%`}</div>
                            <div className='two wide column' id='manage'> Manage </div>
                        </div>
                        <div className='row'>
                            <div className='fourteen wide column' id={colorId(raForm.th5)}>{`${threatHunting[5]}: ${raForm.th5}%`}</div>
                            <div className='two wide column' id='manage'> Manage </div>
                        </div>
                        <div className='row'>
                            <div className='fourteen wide column' id={colorId(raForm.th6)}>{`${threatHunting[6]}: ${raForm.th6}%`}</div>
                            <div className='two wide column' id='manage'> Manage </div>
                        </div>
                        <div className='row'>
                            <div className='fourteen wide column' id={colorId(raForm.th7)}>{`${threatHunting[7]}: ${raForm.th7}%`}</div>
                            <div className='two wide column' id='manage'> Manage </div>
                        </div>
                        <div className='row'>
                            <div className='fourteen wide column' id={colorId(raForm.th8)}>{`${threatHunting[8]}: ${raForm.th8}%`}</div>
                            <div className='two wide column' id='use'> Use </div>
                        </div>
                        <div className='row'>
                            <div className='fourteen wide column' id={colorId(raForm.th9)}>{`${threatHunting[9]}: ${raForm.th9}%`}</div>
                            <div className='two wide column' id='use'> Use </div>
                        </div>
                        <div className='row'>
                            <div className='fourteen wide column' id={colorId(raForm.th10)}>{`${threatHunting[10]}: ${raForm.th10}%`}</div>
                            <div className='two wide column' id='use'> Use </div>
                        </div>
                    </div>
                    <h3>Vulnerability Management</h3>
                    <div className='ui centered grid' id='formView'>
                        <div className='row'>
                            <div className='fourteen wide column' id={colorId(raForm.vm0)}> {`${vulnerabilityManagement[0]}: ${raForm.vm0}%`}</div>
                            <div className='two wide column' id='define'> Define </div>
                        </div>
                        <div className='row'>
                            <div className='fourteen wide column' id={colorId(raForm.vm1)}>{`${vulnerabilityManagement[1]}: ${raForm.vm1}%`}</div>
                            <div className='two wide column' id='define'> Define </div>
                        </div>
                        <div className='row'>
                            <div className='fourteen wide column' id={colorId(raForm.vm2)}>{`${vulnerabilityManagement[2]}: ${raForm.vm2}%`}</div>
                            <div className='two wide column' id='manage'> Manage </div>
                        </div>
                        <div className='row'>
                            <div className='fourteen wide column' id={colorId(raForm.vm3)}>{`${vulnerabilityManagement[3]}: ${raForm.vm3}%`}</div>
                            <div className='two wide column' id='manage'> Manage </div>
                        </div>
                        <div className='row'>
                            <div className='fourteen wide column' id={colorId(raForm.vm4)}>{`${vulnerabilityManagement[4]}: ${raForm.vm4}%`}</div>
                            <div className='two wide column' id='use'> Use </div>
                        </div>
                        <div className='row'>
                            <div className='fourteen wide column' id={colorId(raForm.vm5)}>{`${vulnerabilityManagement[5]}: ${raForm.vm5}%`}</div>
                            <div className='two wide column' id='use'> Use </div>
                        </div>
                        <div className='row'>
                            <div className='fourteen wide column' id={colorId(raForm.vm6)}>{`${vulnerabilityManagement[6]}: ${raForm.vm6}%`}</div>
                            <div className='two wide column' id='use'> Use </div>
                        </div>
                        <div className='row'>
                            <div className='fourteen wide column' id={colorId(raForm.vm7)}>{`${vulnerabilityManagement[7]}: ${raForm.vm7}%`}</div>
                            <div className='two wide column' id='use'> Use </div>
                        </div>
                        <div className='row'>
                            <div className='fourteen wide column' id={colorId(raForm.vm8)}>{`${vulnerabilityManagement[8]}: ${raForm.vm8}%`}</div>
                            <div className='two wide column' id='use'> Use </div>
                        </div>
                        <div className='row'>
                            <div className='fourteen wide column' id={colorId(raForm.vm9)}>{`${vulnerabilityManagement[9]}: ${raForm.vm9}%`}</div>
                            <div className='two wide column' id='use'> Use </div>
                        </div>
                        <div className='row'>
                            <div className='fourteen wide column' id={colorId(raForm.vm10)}>{`${vulnerabilityManagement[10]}: ${raForm.vm10}%`}</div>
                            <div className='two wide column' id='use'> Use </div>
                        </div>
                        <div className='row'>
                            <div className='fourteen wide column' id={colorId(raForm.vm11)}>{`${vulnerabilityManagement[11]}: ${raForm.vm11}%`}</div>
                            <div className='two wide column' id='use'> Use </div>
                        </div>
                    </div>
                    <Button id='delete' color='red' onClick={open}>Delete</Button>
                </>
            }
            <Confirm
                open={confirm}
                onCancel={close}
                onConfirm={handleDelete}
            />
        </div>
    )
}

RaForm.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`http://localhost:3000/api/raForms/${id}`);
    const { data } = await res.json();

    return { raForm: data }
}

export default RaForm;