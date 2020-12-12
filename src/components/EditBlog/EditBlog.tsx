import React, { useContext, useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { IUser } from '../../types';
import { updateBlog } from '../../functions/api';
import { Spinner } from '../Spinner/Spinner';
import { BlogContext } from '../../context/BlogContext';
import { StyledInputContainer, StyledButton } from '../CreateBlog/CreateBlog';
interface Props {
    user: IUser;
}

export const EditBlog: React.FC<Props> = ({ user }) => {
    const { id } = useParams<{ id: string }>();
    const history = useHistory();
    const [isAuthor, setIsAuthor] = useState(true);
    const { blogs, setBlogs } = useContext(BlogContext);
    const [saving, setSaving] = useState(false);
    useEffect(() => {
        if (blogs) {
            const blog = blogs.find((blog) => {
                if (blog._id === id) {
                    return true;
                } else {
                    return false;
                }
            });

            // Check if author and user are the same
            if (blog?.author.username === user.username) {
                setText(blog.text);
                setTitle(blog.title);
                return;
            } else {
                setIsAuthor(false);
            }
        } else {
            setIsAuthor(false);
        }
    }, [blogs, id, user.username]);
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');

    return (
        <>
            {isAuthor ? (
                <>
                    <form
                        action=""
                        onSubmit={handleSubmit}
                        style={{ textAlign: 'center' }}
                    >
                        <StyledInputContainer>
                            <label htmlFor="title"> Title: </label>
                            <input
                                type="text"
                                name="title"
                                value={title}
                                onChange={handleChange}
                            />
                        </StyledInputContainer>
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
                        <StyledButton type="submit">Save</StyledButton>
                    </form>
                    <Spinner
                        message="Saving..."
                        isModal={true}
                        marginTop="300px"
                        isOpen={saving}
                    />
                </>
            ) : (
                <Redirect to="/myblogs" />
            )}
        </>
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
        setSaving(true);

        updateBlog(id, title, text).then((res) => {
            setSaving(false);
            if (setBlogs) {
                setBlogs((blogs) => {
                    if (blogs) {
                        const temp = [...blogs];
                        const index = temp.findIndex((b) => {
                            return b._id === id;
                        });

                        temp[index].text = text;
                        temp[index].title = title;
                        return temp;
                    } else {
                        return blogs;
                    }
                });
            }
            history.push('/blogs/' + id);
        });
    }
};
