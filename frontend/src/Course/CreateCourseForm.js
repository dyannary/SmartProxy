import React, { useEffect, useState } from 'react';
import Tooltip from "@mui/material/Tooltip";

const CreateCourseForm = ({ closeModal, fetchCourses, selectedCourse, addCourse, updateExistingCourse }) => {
    const [newCourse, setNewCourse] = useState({
        title: '',
        description: '',
        author: '',
        categoryTitle: '',
        categoryDescription: '',
    });


    const [errors, setErrors] = useState({

        title: '',

        description: '',

        author: '',

        categoryTitle: '',

        categoryDescription: '',

    });



    useEffect(() => {

        if (selectedCourse && selectedCourse.categories) {

            setNewCourse({

                title: selectedCourse.title || '',

                description: selectedCourse.description || '',

                author: selectedCourse.author || '',

                categoryTitle: selectedCourse.categories[0]?.title || '',

                categoryDescription: selectedCourse.categories[0]?.description || '',

            });

        } else {

            setNewCourse({

                title: '',

                description: '',

                author: '',

                categoryTitle: '',

                categoryDescription: '',

            });

        }

    }, [selectedCourse]);



    const handleSubmit = (e) => {

        e.preventDefault();



        const requiredFields = [

            { name: 'title', label: 'titlul' },

            { name: 'description', label: 'descrierea' },

            { name: 'author', label: 'autorul' },

            { name: 'categoryTitle', label: 'titlul categoriei' },

            { name: 'categoryDescription', label: 'descrierea categoriei' },

        ];



        const newErrors = {};

        requiredFields.forEach((field) => {

            if (!newCourse[field.name]) {

                newErrors[field.name] = `Introduceti, va rog, ${field.label}`;

            } else {

                newErrors[field.name] = '';

            }

        });



        if (Object.values(newErrors).some((error) => error !== '')) {

            setErrors(newErrors);

            return;

        }



        if (selectedCourse) {

            updateExistingCourse({

                id: selectedCourse.id,

                title: newCourse.title,

                description: newCourse.description,

                categories: [

                    {

                        title: newCourse.categoryTitle,

                        description: newCourse.categoryDescription,

                    },

                ],

                author: newCourse.author,

            });

        } else {

            addCourse({

                title: newCourse.title,

                description: newCourse.description,

                categories: [

                    {

                        title: newCourse.categoryTitle,

                        description: newCourse.categoryDescription,

                    },

                ],

                author: newCourse.author,

            });

        }



        // Clear the input values and reset error messages

        setNewCourse({

            title: '',

            description: '',

            author: '',

            categoryTitle: '',

            categoryDescription: '',

        });

        setErrors({

            title: '',

            description: '',

            author: '',

            categoryTitle: '',

            categoryDescription: '',

        });



        closeModal();

        fetchCourses();

    };



    return (

        <div className="add-course">

            <h3 className="course-header">

                {selectedCourse ? 'Modifică Cursul' : 'Adaugă Curs Nou'}

            </h3>



            <div style={{ color: 'red' }}>{errors.title}</div>

            <textarea

                placeholder="Titlu"

                value={newCourse.title}

                onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}

                required

            />

            <div style={{ color: 'red' }}>{errors.description}</div>

            <textarea

                placeholder="Descriere"

                value={newCourse.description}

                onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}

                required

            />

            <div style={{ color: 'red' }}>{errors.author}</div>

            <textarea

                placeholder="Autor"

                value={newCourse.author}

                onChange={(e) => setNewCourse({ ...newCourse, author: e.target.value })}

            />

            <div style={{ color: 'red' }}>{errors.categoryTitle}</div>
            <Tooltip title={newCourse.categoryDescription} arrow>
        <textarea
            placeholder="Titlu categorie"
            name="category-title"
            value={newCourse.categoryTitle}
            onChange={(e) => setNewCourse({ ...newCourse, categoryTitle: e.target.value })}
        />
            </Tooltip>




            <div style={{ color: 'red' }}>{errors.categoryDescription}</div>

            <textarea

                placeholder="Descriere categorie"

                name="category-description"

                value={newCourse.categoryDescription}

                onChange={(e) => setNewCourse({ ...newCourse, categoryDescription: e.target.value })}

            />



            <button className="add-button" onClick={handleSubmit}>

                {selectedCourse ? 'Actualizează Curs' : 'Adaugă Curs'}

            </button>

        </div>

    );

};



export default CreateCourseForm;