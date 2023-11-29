import {useEffect, useState} from "react";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";
import Add from '../img/add.svg'
import Update from '../img/update.svg'
import Delete from '../img/delete.svg'
import Modal from "react-modal";
import './CourseList.css'
import CreateCourseForm from "./CreateCourseForm";
Modal.setAppElement('#root');
function CourseList() {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [speedDialOpen, setSpeedDialOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = () => {
        axios.get('http://localhost:8080/api/Course')
            .then((response) => {
                setCourses(response.data);
            })
            .catch((error) => {
                console.error('Eroare la obținerea datelor: ', error);
            });
    };

    const addCourse = (newCourse) => {
        axios.post('http://localhost:8080/api/Course', newCourse)
            .then((response) => {
                console.log('Curs adăugat cu succes!', response.data);
                closeModal();
                fetchCourses();
            })
            .catch((error) => {
                console.error('Eroare la adăugarea cursului: ', error);
            });
    };

    const updateExistingCourse = (updatedCourse) => {
        axios.put(`http://localhost:8080/api/Course`, updatedCourse)
            .then((response) => {
                console.log('Curs actualizat cu succes!', response.data);
                fetchCourses();
                setSelectedCourse(null);
            })
            .catch((error) => {
                console.error('Eroare la actualizarea cursului: ', error);
            });
    };

    const deleteCourse = (id) => {
        axios.delete(`http://localhost:8080/api/Course/${id}`)
            .then((response) => {
                console.log('Curs șters cu succes!', response.data);
                fetchCourses();
            })
            .catch((error) => {
                console.error('Eroare la ștergerea cursului: ', error);
            });
    };

    const openModal = (course) => {
        setSelectedCourse(course);
        setSpeedDialOpen(true);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedCourse(null);
        setSpeedDialOpen(false);
        setIsModalOpen(false);
    };

    return (
        <div>
            <h2 className="course-header" style={{ paddingRight: '1000px' }}>
                Listă de cursuri
            </h2>
            <Tooltip title="Adaugă curs" placement="right">
                <img
                    src={Add}
                    alt="Adaugă curs"
                    onMouseEnter={() => setSpeedDialOpen(true)}
                    onMouseLeave={() => setSpeedDialOpen(false)}
                    onClick={() => openModal(null)}
                />
            </Tooltip>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={{
                    overlay: {
                        zIndex: 1000,
                    },
                    content: {
                        width: '70%',
                        margin: 'auto',
                    },
                }}
            >
                <CreateCourseForm
                    closeModal={closeModal}
                    fetchCourses={fetchCourses}
                    selectedCourse={selectedCourse}
                    addCourse={addCourse}
                    updateExistingCourse={updateExistingCourse}
                />
            </Modal>
            <ul className="course-list">
                {courses.map((course) => (
                    <li key={course.id} className="course-item">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ flex: 1 }}>
                                <strong>{course.title}</strong>
                                <br />
                                <i className="author">{course.author}</i>
                                <br />
                                <strong className="category">Categorie: </strong>
                                <Tooltip title={course.categories[0].description} placement="top" arrow >
                                    <span>{course.categories[0].title}</span>
                                </Tooltip>
                                <br />
                                <strong>Descriere:</strong>
                                <br />
                                <span className="description">{course.description}</span>
                            </div>
                            <Tooltip title="Modifică Cursul">
                                <img
                                    src={Update}
                                    alt="Modifică Cursul"
                                    style={{
                                        width: '45px',
                                        height: '45px',
                                        marginRight: '45px',
                                        marginTop: '-80px',
                                    }}
                                    onClick={() => openModal(course)}
                                />
                            </Tooltip>
                            <Tooltip title="Șterge Cursul">
                                <img
                                    src={Delete}
                                    alt="Șterge Cursul"
                                    style={{
                                        width: '45px',
                                        height: '45px',
                                        marginRight: '50px',
                                        marginTop: '-80px',
                                    }}
                                    onClick={() => {
                                        if (window.confirm('Sunteți sigur că doriți să ștergeți cursul?')) {
                                            deleteCourse(course.id);
                                        }
                                    }}
                                />
                            </Tooltip>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CourseList;