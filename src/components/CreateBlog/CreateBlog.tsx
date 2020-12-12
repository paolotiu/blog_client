import React, { useContext, useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { createBlog, getUser } from '../../functions/api';
import { useHistory } from 'react-router-dom';
import { BlogContext } from '../../context/BlogContext';

export const CreateBlog = () => {
    const { setBlogs } = useContext(BlogContext);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const history = useHistory();

    useEffect(() => {
        //Check if user is logged in
        getUser().then((res) => {
            if (res.error) {
                history.push('/blogs');
            }
        });
    }, [history]);
    return (
        <form action="" onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                value={title}
                onChange={handleChange}
            />
            <Editor
                apiKey="1eyhnd1ai3lt42bnqpcwia7y7lnlygy2395s0azirzbom22o"
                initialValue={text}
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image',
                        'charmap print preview anchor help',
                        'searchreplace visualblocks code',
                        'insertdatetime media table paste wordcount',
                    ],
                    toolbar: `undo redo | formatselect | bold italic | \
                        alignleft aligncenter alignright | \
                        bullist numlist outdent indent | help`,
                }}
                outputFormat="text"
                onChange={handleChange}
            />
            <button type="submit">Save</button>
        </form>
    );

    function handleChange(e: any) {
        if (e.target.name === 'title') {
            setTitle(e.target.value);
        } else {
            setText(e.target.getContent());
        }
    }

    function handleSubmit(e: React.MouseEvent<HTMLFormElement, MouseEvent>) {
        e.preventDefault();
        createBlog(title, text).then((res) => {
            if (res.error) {
                return;
            }
            if (setBlogs) {
                setBlogs((blogs) => {
                    if (blogs) {
                        const temp = [...blogs];
                        temp.push(res);
                        return temp;
                    } else {
                        return blogs;
                    }
                });
            }
            history.push('/blogs/' + res._id);
        });
    }
};
