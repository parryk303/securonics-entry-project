import fetch from 'isomorphic-unfetch';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Confirm, Button, Loader, Card } from 'semantic-ui-react';
import cors from 'cors';
import { jsPDF } from "jspdf";
cors()

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
                const deleted = await fetch(`/api/raForms/${raFormId}`, {
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

    const pdf = () => {
        const doc = new jsPDF();
        doc.addImage('https://i.imgur.com/dISO4s0.jpeg', "JPEG", 30, 0, 150, 50), doc.setFont('helvetica', 'bold')

        doc.text(`${raForm.title} Risk Assessment Report:`, 12, 50)
        doc.text(`Threat Hunting Average: thAve%`, 12, 70), doc.setFont('helvetica', 'normal')
        doc.text(`${threatHunting[0]}: ....................................................... `, 12, 76)
        doc.text(`${raForm.vm0}%`, 186, 76)
        doc.text(`${threatHunting[1]}: ........................................... `, 12, 82)
        doc.text(`${raForm.vm0}%`, 186, 82)
        doc.text(`${threatHunting[2]}: ..................................... `, 12, 88)
        doc.text(`${raForm.vm0}%`, 186, 88)
        doc.text(`${threatHunting[3]}: ............................................ `, 12, 94)
        doc.text(`${raForm.vm0}%`, 186, 94)
        doc.text(`${threatHunting[4]}: ........................................... `, 12, 100)
        doc.text(`${raForm.vm0}%`, 186, 100)
        doc.text(`${threatHunting[5]}: ....................................................................... `, 12, 106)
        doc.text(`${raForm.vm0}%`, 186, 106)
        doc.text(`${threatHunting[6]}: ......... `, 12, 112)
        doc.text(`${raForm.vm0}%`, 186, 112)
        doc.text(`${threatHunting[7]}: ............................................... `, 12, 118)
        doc.text(`${raForm.vm0}%`, 186, 118)
        doc.text(`${threatHunting[8]}: ................................................................. `, 12, 124)
        doc.text(`${raForm.vm0}%`, 186, 124)
        doc.text(`${threatHunting[9]}: ........................................................... `, 12, 130)
        doc.text(`${raForm.vm0}%`, 186, 130)
        doc.text(`${threatHunting[10]}: ..................................................................... `, 12, 136)
        doc.text(`${raForm.vm0}%`, 186, 136)

        doc.setFont('helvetica', 'bold')
        doc.text(`Vulnerability Managment Average: vmAve%`, 12, 156)
        doc.setFont('helvetica', 'normal')
        doc.text(`${vulnerabilityManagement[0]}: ............. `, 12, 162)
        doc.text(`${raForm.vm0}%`, 186, 162)
        doc.text(`${vulnerabilityManagement[1]}: ...... `, 12, 168)
        doc.text(`${raForm.vm1}%`, 186, 168)
        doc.text(`${vulnerabilityManagement[2]}: .......................... `, 12, 174)
        doc.text(`${raForm.vm2}%`, 186, 174)
        doc.text(`${vulnerabilityManagement[3]}: ...................... `, 12, 180)
        doc.text(`${raForm.vm3}%`, 186, 180)
        doc.text(`${vulnerabilityManagement[4]}: ................................................... `, 12, 186)
        doc.text(`${raForm.vm4}%`, 186, 186)
        doc.text(`${vulnerabilityManagement[5]}: .................................................. `, 12, 192)
        doc.text(`${raForm.vm5}%`, 186, 192)
        doc.text(`${vulnerabilityManagement[6]}: ...................................... `, 12, 198)
        doc.text(`${raForm.vm6}%`, 186, 198)
        doc.text(`${vulnerabilityManagement[7]}: ................. `, 12, 204)
        doc.text(`${raForm.vm7}%`, 186, 204)
        doc.text(`${vulnerabilityManagement[8]}: ............................. `, 12, 210)
        doc.text(`${raForm.vm8}%`, 186, 210)
        doc.text(`${vulnerabilityManagement[9]}: ..................................................... `, 12, 216)
        doc.text(`${raForm.vm9}%`, 186, 216)
        doc.text(`${vulnerabilityManagement[10]}: .............................................. `, 12, 222)
        doc.text(`${raForm.vm10}%`, 186, 222)
        doc.text(`${vulnerabilityManagement[11]}: ....................................................................`, 12, 228)
        doc.text(`${raForm.vm11}%`, 186, 228)
        doc.save(`${raForm.title} RA Report.pdf`);
      }

    return (
        <div className="raForm-container">
            {isDeleting
                ? <Loader active />
                :
                <>
                    <h1>{raForm.title}</h1>
                    <button onClick={pdf}>Generate PDF</button>
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
    const res = await fetch(`/api/raForms/${id}`);
    const { data } = await res.json();

    return { raForm: data }
}

export default RaForm;